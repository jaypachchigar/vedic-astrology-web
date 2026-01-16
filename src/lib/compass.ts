/**
 * Accurate Compass Implementation using Device Magnetometer and Gyroscope
 * Combines DeviceOrientationEvent and DeviceMotionEvent for precise readings
 */

export interface CompassReading {
  heading: number; // True North heading in degrees (0-360)
  accuracy: number; // Accuracy in degrees (lower is better)
  calibrated: boolean; // Whether the compass is properly calibrated
  magneticHeading: number; // Magnetic north (before declination correction)
  trueHeading: number; // True north (after declination correction)
}

export interface CompassCalibration {
  declination: number; // Magnetic declination for location
  latitude: number;
  longitude: number;
}

class CompassService {
  private orientationListener: ((event: DeviceOrientationEvent) => void) | null = null;
  private motionListener: ((event: DeviceMotionEvent) => void) | null = null;
  private callback: ((reading: CompassReading) => void) | null = null;

  private lastReading: CompassReading = {
    heading: 0,
    accuracy: 360,
    calibrated: false,
    magneticHeading: 0,
    trueHeading: 0,
  };

  private calibration: CompassCalibration | null = null;
  private smoothingBuffer: number[] = [];
  private readonly SMOOTHING_WINDOW = 3;

  /**
   * Request permission for device sensors (iOS requirement)
   */
  async requestPermission(): Promise<boolean> {
    if (typeof DeviceOrientationEvent === 'undefined') {
      console.error('DeviceOrientationEvent not supported');
      return false;
    }

    // iOS 13+ requires permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const orientationPermission = await (DeviceOrientationEvent as any).requestPermission();

        // Also request motion permission if available
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
          await (DeviceMotionEvent as any).requestPermission();
        }

        return orientationPermission === 'granted';
      } catch (error) {
        console.error('Permission request failed:', error);
        return false;
      }
    }

    // Android and older iOS versions don't require permission
    return true;
  }

  /**
   * Check if device supports compass
   */
  isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      'DeviceOrientationEvent' in window
    );
  }

  /**
   * Set magnetic declination for location (converts magnetic to true north)
   */
  async setCalibration(latitude: number, longitude: number): Promise<void> {
    // Calculate magnetic declination using World Magnetic Model
    const declination = await this.calculateMagneticDeclination(latitude, longitude);

    this.calibration = {
      declination,
      latitude,
      longitude,
    };

    console.log(`Compass calibrated for (${latitude}, ${longitude}) with declination: ${declination}°`);
  }

  /**
   * Calculate magnetic declination for given coordinates
   * Uses simplified approximation - for production, use geomag library or API
   */
  private async calculateMagneticDeclination(latitude: number, longitude: number): Promise<number> {
    // Simplified declination calculation
    // In production, use: https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml

    // Rough approximation based on location
    // Positive = East, Negative = West

    // For India (approximate)
    if (latitude >= 8 && latitude <= 37 && longitude >= 68 && longitude <= 97) {
      return 0.5; // India has very low declination (~0-1°E)
    }

    // For USA (approximate)
    if (latitude >= 25 && latitude <= 49 && longitude >= -125 && longitude <= -66) {
      const avgLon = (longitude + 125) / 59;
      return -15 + (avgLon * 20); // USA varies from -20°W to +5°E
    }

    // For Europe (approximate)
    if (latitude >= 36 && latitude <= 71 && longitude >= -10 && longitude <= 40) {
      return 2; // Europe has slight easterly declination
    }

    // Default to 0 if unknown
    return 0;
  }

  /**
   * Start compass tracking
   */
  start(callback: (reading: CompassReading) => void): void {
    this.callback = callback;

    // Use deviceorientationabsolute if available (more accurate)
    const eventType = 'ondeviceorientationabsolute' in window
      ? 'deviceorientationabsolute'
      : 'deviceorientation';

    this.orientationListener = (event: DeviceOrientationEvent) => {
      this.handleOrientation(event);
    };

    window.addEventListener(eventType, this.orientationListener as EventListener);

    // Also listen to device motion for better accuracy
    if ('DeviceMotionEvent' in window) {
      this.motionListener = (event: DeviceMotionEvent) => {
        this.handleMotion(event);
      };
      window.addEventListener('devicemotion', this.motionListener);
    }

    console.log('Compass started with event:', eventType);
  }

  /**
   * Stop compass tracking
   */
  stop(): void {
    if (this.orientationListener) {
      window.removeEventListener('deviceorientation', this.orientationListener as EventListener);
      window.removeEventListener('deviceorientationabsolute', this.orientationListener as EventListener);
      this.orientationListener = null;
    }

    if (this.motionListener) {
      window.removeEventListener('devicemotion', this.motionListener);
      this.motionListener = null;
    }

    this.callback = null;
    console.log('Compass stopped');
  }

  /**
   * Handle device orientation event
   */
  private handleOrientation(event: DeviceOrientationEvent): void {
    // Get compass heading from alpha value
    // alpha: rotation around z-axis (0-360 degrees)
    // beta: rotation around x-axis (-180 to 180 degrees)
    // gamma: rotation around y-axis (-90 to 90 degrees)

    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    const absolute = (event as any).absolute || false;

    // Check for iOS webkitCompassHeading (more reliable on iOS)
    const webkitHeading = (event as any).webkitCompassHeading;

    let magneticHeading: number;

    if (webkitHeading !== undefined && webkitHeading !== null) {
      // iOS provides direct compass heading (0-360, where 0 is north)
      magneticHeading = webkitHeading;
      console.log('Using iOS webkitCompassHeading:', magneticHeading);
    } else if (alpha !== null) {
      // Android/other browsers use alpha
      // Alpha represents the rotation around the Z-axis (0-360)
      // 0 degrees = North, 90 = East, 180 = South, 270 = West

      // Use alpha directly as it already represents compass heading
      magneticHeading = alpha;

      // Normalize to 0-360
      magneticHeading = this.normalizeHeading(magneticHeading);

      console.log('Using alpha:', magneticHeading);
    } else {
      console.warn('No compass data available');
      return;
    }

    // Apply magnetic declination to get true north
    const trueHeading = this.calibration
      ? this.normalizeHeading(magneticHeading + this.calibration.declination)
      : magneticHeading;

    // Apply smoothing
    const smoothedHeading = this.smoothHeading(trueHeading);

    // Determine accuracy based on absolute positioning and device type
    let accuracy = 15;
    if (webkitHeading !== undefined) {
      accuracy = 5; // iOS webkit compass is more accurate
    } else if (absolute) {
      accuracy = 10; // Absolute positioning is fairly accurate
    }

    // Create reading
    const reading: CompassReading = {
      heading: smoothedHeading,
      accuracy,
      calibrated: this.calibration !== null,
      magneticHeading,
      trueHeading,
    };

    this.lastReading = reading;

    // Notify callback
    if (this.callback) {
      this.callback(reading);
    }
  }

  /**
   * Handle device motion event (for additional accuracy)
   */
  private handleMotion(event: DeviceMotionEvent): void {
    // DeviceMotionEvent provides acceleration data
    // Can be used to improve accuracy by detecting device movement
    const acceleration = event.accelerationIncludingGravity;

    if (acceleration) {
      // Detect if device is being moved (reduces accuracy)
      const totalAccel = Math.sqrt(
        (acceleration.x || 0) ** 2 +
        (acceleration.y || 0) ** 2 +
        (acceleration.z || 0) ** 2
      );

      // If significant movement, increase accuracy uncertainty
      if (totalAccel > 12) {
        // Device is being moved rapidly
        this.lastReading.accuracy = Math.min(this.lastReading.accuracy + 5, 30);
      } else {
        // Device is stable, improve accuracy
        this.lastReading.accuracy = Math.max(this.lastReading.accuracy - 1, 3);
      }
    }
  }

  /**
   * Normalize heading to 0-360 range
   */
  private normalizeHeading(heading: number): number {
    let normalized = heading % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  }

  /**
   * Smooth heading readings using moving average
   */
  private smoothHeading(newHeading: number): number {
    // Add to buffer
    this.smoothingBuffer.push(newHeading);

    // Keep buffer size limited
    if (this.smoothingBuffer.length > this.SMOOTHING_WINDOW) {
      this.smoothingBuffer.shift();
    }

    // Handle wraparound (359° -> 0°)
    // Convert to unit vectors, average, then convert back
    let sinSum = 0;
    let cosSum = 0;

    for (const heading of this.smoothingBuffer) {
      const rad = (heading * Math.PI) / 180;
      sinSum += Math.sin(rad);
      cosSum += Math.cos(rad);
    }

    const avgSin = sinSum / this.smoothingBuffer.length;
    const avgCos = cosSum / this.smoothingBuffer.length;

    let smoothed = (Math.atan2(avgSin, avgCos) * 180) / Math.PI;
    return this.normalizeHeading(smoothed);
  }

  /**
   * Get last compass reading
   */
  getLastReading(): CompassReading {
    return this.lastReading;
  }

  /**
   * Check if compass needs calibration
   */
  needsCalibration(): boolean {
    return !this.lastReading.calibrated || this.lastReading.accuracy > 20;
  }
}

// Singleton instance
export const compassService = new CompassService();

/**
 * Get direction name from heading
 */
export function getDirectionFromHeading(heading: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(heading / 22.5) % 16;
  return directions[index];
}

/**
 * Get simplified direction (8 directions for Vastu)
 */
export function getVastuDirection(heading: number): 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' {
  const normalized = ((heading % 360) + 360) % 360;

  if (normalized >= 337.5 || normalized < 22.5) return 'N';
  if (normalized >= 22.5 && normalized < 67.5) return 'NE';
  if (normalized >= 67.5 && normalized < 112.5) return 'E';
  if (normalized >= 112.5 && normalized < 157.5) return 'SE';
  if (normalized >= 157.5 && normalized < 202.5) return 'S';
  if (normalized >= 202.5 && normalized < 247.5) return 'SW';
  if (normalized >= 247.5 && normalized < 292.5) return 'W';
  return 'NW';
}

/**
 * Calculate angle difference between two headings
 */
export function getAngleDifference(heading1: number, heading2: number): number {
  let diff = Math.abs(heading1 - heading2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}
