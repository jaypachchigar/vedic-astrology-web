"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass, MapPin, Home, Sparkles, AlertCircle, Target } from "lucide-react";
import { compassService, getVastuDirection, type CompassReading } from "@/lib/compass";
import { supabase } from "@/lib/supabase/client";

type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

const getDirectionFromDegrees = (degrees: number): Direction => {
  const normalized = ((degrees % 360) + 360) % 360;
  if (normalized >= 337.5 || normalized < 22.5) return "N";
  if (normalized >= 22.5 && normalized < 67.5) return "NE";
  if (normalized >= 67.5 && normalized < 112.5) return "E";
  if (normalized >= 112.5 && normalized < 157.5) return "SE";
  if (normalized >= 157.5 && normalized < 202.5) return "S";
  if (normalized >= 202.5 && normalized < 247.5) return "SW";
  if (normalized >= 247.5 && normalized < 292.5) return "W";
  return "NW";
};

const vasturecommendations: { [key in Direction]: {
  element: string;
  planet: string;
  colors: string[];
  goodFor: string[];
  avoid: string[];
  remedies: string[];
}} = {
  N: {
    element: "Water",
    planet: "Mercury",
    colors: ["Blue", "Green", "White"],
    goodFor: ["Water features", "Bathrooms", "Money safe", "Study area"],
    avoid: ["Fire elements", "Kitchen", "Heavy furniture", "Red color"],
    remedies: ["Place a small water fountain", "Use blue or green decor", "Keep the area clean and clutter-free"],
  },
  NE: {
    element: "Water + Air",
    planet: "Jupiter",
    colors: ["White", "Light Blue", "Yellow"],
    goodFor: ["Puja room", "Study", "Meditation space", "Water storage"],
    avoid: ["Toilets", "Heavy storage", "Dark colors", "Clutter"],
    remedies: ["Place religious items", "Use crystals", "Keep bright and airy", "Place indoor plants"],
  },
  E: {
    element: "Air",
    planet: "Sun",
    colors: ["White", "Light colors", "Green"],
    goodFor: ["Main entrance", "Windows", "Living room", "Balcony"],
    avoid: ["Toilets", "Storerooms", "Dark colors"],
    remedies: ["Ensure maximum sunlight", "Use light curtains", "Place fresh flowers"],
  },
  SE: {
    element: "Fire",
    planet: "Venus",
    colors: ["Red", "Orange", "Pink"],
    goodFor: ["Kitchen", "Electrical appliances", "Heaters"],
    avoid: ["Water features", "Bathrooms", "Blue colors"],
    remedies: ["Place electrical items here", "Use warm colors", "Keep fire safety items"],
  },
  S: {
    element: "Fire",
    planet: "Mars",
    colors: ["Red", "Orange", "Brown"],
    goodFor: ["Master bedroom", "Heavy furniture", "Safe"],
    avoid: ["Main entrance", "Puja room", "Water features"],
    remedies: ["Use heavy furniture", "Install lights", "Use warm earthy tones"],
  },
  SW: {
    element: "Earth",
    planet: "Rahu",
    colors: ["Yellow", "Brown", "Earthy tones"],
    goodFor: ["Master bedroom", "Heavy storage", "Safe", "Study"],
    avoid: ["Toilets", "Water storage", "Empty spaces"],
    remedies: ["Keep heavy items", "Use earthy colors", "Avoid mirrors on south wall"],
  },
  W: {
    element: "Space",
    planet: "Saturn",
    colors: ["White", "Grey", "Blue"],
    goodFor: ["Dining room", "Study", "Children's room"],
    avoid: ["Main entrance", "Heavy storage"],
    remedies: ["Use light colors", "Ensure proper ventilation", "Place water elements"],
  },
  NW: {
    element: "Air",
    planet: "Moon",
    colors: ["White", "Silver", "Grey"],
    goodFor: ["Guest room", "Storage", "Garage", "Bathrooms"],
    avoid: ["Master bedroom", "Puja room"],
    remedies: ["Use silver items", "Keep mobile items here", "Ensure good air flow"],
  },
};

export default function VastuPage() {
  const [compassReading, setCompassReading] = useState<CompassReading | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("bedroom");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationError, setCalibrationError] = useState<string | null>(null);

  useEffect(() => {
    initializeCompass();
    return () => {
      compassService.stop();
    };
  }, []);

  const initializeCompass = async () => {
    console.log('🔧 Initializing compass...');

    // Check if compass is supported
    if (!compassService.isSupported()) {
      console.log('❌ Compass not supported on this device');
      setHasPermission(false);
      setCalibrationError('Compass not supported on this device');
      return;
    }

    // Load user profile for location-based calibration
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log('👤 User authenticated, loading profile...');
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('latitude, longitude')
          .eq('id', user.id)
          .maybeSingle() as { data: { latitude: number; longitude: number } | null; error: any };

        if (profileError) {
          console.error('❌ Error loading profile:', profileError);
          setCalibrationError('Could not load location from profile');
        } else if (profile && profile.latitude && profile.longitude) {
          console.log(`📍 Profile location found: (${profile.latitude}, ${profile.longitude})`);
          setIsCalibrating(true);
          setCalibrationError(null);

          try {
            await compassService.setCalibration(profile.latitude, profile.longitude);
            console.log('✅ Calibration complete');
          } catch (calibError) {
            console.error('❌ Calibration failed:', calibError);
            setCalibrationError('Calibration failed - using magnetic north');
          }

          setIsCalibrating(false);
        } else {
          console.warn('⚠️ No location data in profile');
          setCalibrationError('Location not set in profile - please update your birth location');
        }
      } else {
        console.warn('⚠️ No authenticated user');
        setCalibrationError('Please login to enable location-based calibration');
      }
    } catch (error) {
      console.error('❌ Error during calibration:', error);
      setCalibrationError('Calibration error - compass will show magnetic north');
      setIsCalibrating(false);
    }

    // Check if permission is needed (iOS 13+)
    const needsPermission = typeof (DeviceOrientationEvent as any).requestPermission === 'function';

    if (needsPermission) {
      console.log('📱 iOS device - permission required');
      setHasPermission(false);
    } else {
      // Android or older iOS - start compass directly
      console.log('📱 Android/Desktop - starting compass directly');
      setHasPermission(true);
      startCompass();
    }
  };

  const requestPermission = async () => {
    const granted = await compassService.requestPermission();
    if (granted) {
      setHasPermission(true);
      startCompass();
    }
  };

  const startCompass = () => {
    compassService.start((reading: CompassReading) => {
      setCompassReading(reading);
      const vastuDir = getVastuDirection(reading.heading);
      setDirection(vastuDir);
    });
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1000);
  };

  // For desktop/devices without compass, use simulated direction
  const simulateDirection = (dir: Direction) => {
    const degrees = getDegreesFromDirection(dir);
    setDirection(dir);
    setCompassReading({
      heading: degrees,
      accuracy: 45,
      calibrated: false,
      magneticHeading: degrees,
      trueHeading: degrees,
    });
  };

  const getDegreesFromDirection = (dir: Direction): number => {
    const map: { [key in Direction]: number } = {
      N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315
    };
    return map[dir];
  };

  const currentRecommendations = direction ? vasturecommendations[direction] : null;

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
          Vastu Compass
        </h1>
        <p className="text-muted-foreground mt-2">
          AI-powered directional analysis for optimal space arrangement
        </p>
      </div>

      {/* Compass Display */}
      <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader>
          <CardTitle>Real-Time Compass</CardTitle>
          <CardDescription>
            Point your device in the direction you want to analyze
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            {/* Calibration Status */}
            {isCalibrating && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 w-full max-w-md">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-primary animate-pulse" />
                  <p className="text-sm">Calibrating compass for your location...</p>
                </div>
              </div>
            )}

            {/* Calibration Error/Warning */}
            {!isCalibrating && calibrationError && (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 w-full max-w-md">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-400">Calibration Notice</p>
                    <p className="text-xs text-muted-foreground mt-1">{calibrationError}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Compass showing magnetic north. For true north, update your location in Profile settings.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compass Visualization */}
            <div className="relative w-64 h-64 rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              {/* Direction markers */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-primary">N</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">E</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">S</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">W</div>
              </div>

              {/* Rotating needle */}
              <div
                className="absolute w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${compassReading?.heading || 0}deg)` }}
              >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-red-500 to-primary origin-bottom rounded-full"></div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2">
                  <Compass className="w-8 h-8 text-red-500" />
                </div>
              </div>

              {/* Center display */}
              <div className="absolute text-center z-10">
                <div className="text-6xl font-bold text-primary">{direction || "--"}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {compassReading ? `${Math.round(compassReading.heading)}°` : "Detecting..."}
                </div>
                {compassReading && (
                  <div className="text-xs text-muted-foreground mt-1">
                    ±{Math.round(compassReading.accuracy)}° accuracy
                  </div>
                )}
              </div>
            </div>

            {/* Compass Status Indicators */}
            {compassReading && (
              <div className="grid grid-cols-3 gap-3 w-full max-w-md text-center text-xs">
                <div className="p-2 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Magnetic</p>
                  <p className="font-bold">{Math.round(compassReading.magneticHeading)}°</p>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <p className="text-muted-foreground">True North</p>
                  <p className="font-bold">{Math.round(compassReading.trueHeading)}°</p>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                  <p className="text-muted-foreground">Status</p>
                  <p className={`font-bold ${compassReading.calibrated ? 'text-green-500' : 'text-orange-500'}`}>
                    {compassReading.calibrated ? 'Calibrated' : 'Uncalibrated'}
                  </p>
                </div>
              </div>
            )}

            {hasPermission === false && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 w-full max-w-md">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Compass Feature</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {compassService.isSupported()
                        ? "Allow access to device orientation to use the compass feature. This works best on mobile devices."
                        : "Compass is not supported on this device or browser. Please use the manual direction selector below or try on a mobile device."}
                    </p>
                    {compassService.isSupported() && (
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={requestPermission}
                      >
                        Enable Compass
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Direction Selector for Desktop */}
            <div className="w-full max-w-md">
              <Label className="text-sm text-muted-foreground mb-2 block">
                Or select direction manually:
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {(["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as Direction[]).map((dir) => (
                  <Button
                    key={dir}
                    variant={direction === dir ? "default" : "outline"}
                    size="sm"
                    onClick={() => simulateDirection(dir)}
                  >
                    {dir}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room Details */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle>Room Details</CardTitle>
          <CardDescription>Tell us about the space you want to analyze</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <div className="relative">
                <Home className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="roomName"
                  placeholder="Master Bedroom"
                  className="pl-9"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <select
                id="roomType"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="bedroom">Bedroom</option>
                <option value="kitchen">Kitchen</option>
                <option value="living">Living Room</option>
                <option value="bathroom">Bathroom</option>
                <option value="study">Study Room</option>
                <option value="puja">Puja Room</option>
                <option value="entrance">Entrance</option>
              </select>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={handleAnalyze}
            disabled={!direction || isAnalyzing}
          >
            {isAnalyzing ? (
              "Analyzing..."
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {currentRecommendations && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Element & Planet */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Direction Properties</CardTitle>
                <CardDescription>Elemental and planetary influences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Element</p>
                  <p className="text-2xl font-bold text-primary">{currentRecommendations.element}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Ruling Planet</p>
                  <p className="text-xl font-semibold">{currentRecommendations.planet}</p>
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Recommended Colors</CardTitle>
                <CardDescription>Best colors for this direction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentRecommendations.colors.map((color: string) => (
                    <div key={color} className="flex items-center space-x-3 p-3 rounded-lg bg-muted">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-border"
                        style={{
                          backgroundColor: color.toLowerCase() === "white" ? "#ffffff" :
                                         color.toLowerCase() === "blue" ? "#3b82f6" :
                                         color.toLowerCase() === "green" ? "#10b981" :
                                         color.toLowerCase() === "yellow" ? "#f59e0b" :
                                         color.toLowerCase() === "orange" ? "#f97316" :
                                         color.toLowerCase() === "red" ? "#ef4444" :
                                         color.toLowerCase() === "brown" ? "#92400e" :
                                         color.toLowerCase() === "grey" ? "#6b7280" :
                                         color.toLowerCase() === "silver" ? "#cbd5e1" :
                                         color.toLowerCase() === "pink" ? "#ec4899" :
                                         "#f3f4f6"
                        }}
                      ></div>
                      <span className="font-medium">{color}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Good For */}
          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">Recommended Items</CardTitle>
              <CardDescription>What works well in this direction</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {currentRecommendations.goodFor.map((item: string) => (
                  <li key={item} className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Avoid */}
          <Card className="border-red-500/50 bg-red-500/5">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">Items to Avoid</CardTitle>
              <CardDescription>What should not be placed in this direction</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-3">
                {currentRecommendations.avoid.map((item: string) => (
                  <li key={item} className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Remedies */}
          <Card className="border-primary/50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <CardTitle>Vastu Remedies</CardTitle>
              </div>
              <CardDescription>Simple solutions to enhance positive energy</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {currentRecommendations.remedies.map((remedy: string, index: number) => (
                  <li key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-muted">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <span className="text-sm">{remedy}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Card */}
      {!currentRecommendations && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">How to Use Vastu Compass</h3>
                <ol className="text-sm text-muted-foreground space-y-2">
                  <li>1. Stand in the center of your room</li>
                  <li>2. Point your device toward the direction you want to analyze</li>
                  <li>3. Enter room details and get AI-powered recommendations</li>
                  <li>4. Follow the suggestions to optimize your space energy</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
