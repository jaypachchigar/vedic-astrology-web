/**
 * Vedic Astrology Calculations
 * Using OPEN SOURCE calculation engine (no API key needed!)
 * Falls back to Prokerala API if configured
 */

import { DateTime } from 'luxon';
import { getCompleteBirthChart as getOpenSourceChart } from './vedic-astrology';

const API_BASE_URL = 'https://api.prokerala.com/v2';
const API_KEY = process.env.NEXT_PUBLIC_PROKERALA_API_KEY;
const CLIENT_ID = process.env.NEXT_PUBLIC_PROKERALA_CLIENT_ID;

// Use open source calculations by default!
const USE_OPEN_SOURCE = true;

interface BirthDetails {
  datetime: string; // Format: "1990-01-15T14:30:00"
  latitude: number;
  longitude: number;
}

interface ProkeralaResponse<T> {
  status: string;
  data: T;
}

/**
 * Get Birth Details (validates and processes birth data)
 * Endpoint: /v2/astrology/birth-details
 */
export async function getBirthDetails(details: BirthDetails) {
  if (!API_KEY || !CLIENT_ID) {
    console.warn('⚠️ Prokerala API not configured. Using mock data.');
    return getMockBirthDetails();
  }

  try {
    const params = new URLSearchParams({
      ayanamsa: '1', // Lahiri ayanamsa
      datetime: details.datetime,
      coordinates: `${details.latitude},${details.longitude}`,
      la: 'en',
    });

    const response = await fetch(
      `${API_BASE_URL}/astrology/birth-details?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'x-client-id': CLIENT_ID || '',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Birth Details API Error:', error);
      return getMockBirthDetails();
    }

    const data: ProkeralaResponse<any> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching birth details:', error);
    return getMockBirthDetails();
  }
}

/**
 * Get Basic Kundli (Birth Chart)
 * Endpoint: /v2/astrology/kundli
 */
export async function getKundli(details: BirthDetails) {
  if (!API_KEY || !CLIENT_ID) {
    console.warn('⚠️ Prokerala API not configured. Using mock data.');
    return getMockKundli();
  }

  try {
    const params = new URLSearchParams({
      ayanamsa: '1',
      datetime: details.datetime,
      coordinates: `${details.latitude},${details.longitude}`,
      la: 'en',
    });

    const response = await fetch(
      `${API_BASE_URL}/astrology/kundli?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'x-client-id': CLIENT_ID || '',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Kundli API Error:', error);
      return getMockKundli();
    }

    const data: ProkeralaResponse<any> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching kundli:', error);
    return getMockKundli();
  }
}

/**
 * Get Advanced Kundli (with divisional charts, dashas, yogas)
 * Endpoint: /v2/astrology/kundli/advanced
 */
export async function getAdvancedKundli(details: BirthDetails) {
  if (!API_KEY || !CLIENT_ID) {
    console.warn('⚠️ Prokerala API not configured. Using mock data.');
    return getMockAdvancedKundli();
  }

  try {
    const params = new URLSearchParams({
      ayanamsa: '1',
      datetime: details.datetime,
      coordinates: `${details.latitude},${details.longitude}`,
      la: 'en',
      chart_style: 'north-indian', // north-indian, south-indian, east-indian
    });

    const response = await fetch(
      `${API_BASE_URL}/astrology/kundli/advanced?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'x-client-id': CLIENT_ID || '',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Advanced Kundli API Error:', error);
      return getMockAdvancedKundli();
    }

    const data: ProkeralaResponse<any> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching advanced kundli:', error);
    return getMockAdvancedKundli();
  }
}

/**
 * Get Chart Image/Data
 * Endpoint: /v2/astrology/chart
 */
export async function getChart(details: BirthDetails, chartType: string = 'd1') {
  if (!API_KEY || !CLIENT_ID) {
    console.warn('⚠️ Prokerala API not configured.');
    return null;
  }

  try {
    const params = new URLSearchParams({
      ayanamsa: '1',
      datetime: details.datetime,
      coordinates: `${details.latitude},${details.longitude}`,
      chart_type: chartType, // d1, d2, d3, d4, d7, d9, d10, d12, d16, d20, d24, d27, d30, d40, d45, d60
      chart_style: 'north-indian',
      format: 'json', // or 'svg', 'png'
      la: 'en',
    });

    const response = await fetch(
      `${API_BASE_URL}/astrology/chart?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'x-client-id': CLIENT_ID || '',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Chart API Error:', error);
      return null;
    }

    const data: ProkeralaResponse<any> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching chart:', error);
    return null;
  }
}

/**
 * Get Planet Positions
 * Endpoint: /v2/astrology/planet-position
 */
export async function getPlanetPositions(details: BirthDetails) {
  if (!API_KEY || !CLIENT_ID) {
    console.warn('⚠️ Prokerala API not configured. Using mock data.');
    return getMockPlanetPositions();
  }

  try {
    const params = new URLSearchParams({
      ayanamsa: '1',
      datetime: details.datetime,
      coordinates: `${details.latitude},${details.longitude}`,
      la: 'en',
    });

    const response = await fetch(
      `${API_BASE_URL}/astrology/planet-position?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'x-client-id': CLIENT_ID || '',
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Planet Position API Error:', error);
      return getMockPlanetPositions();
    }

    const data: ProkeralaResponse<any> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching planet positions:', error);
    return getMockPlanetPositions();
  }
}

/**
 * Get Complete Birth Chart Analysis
 * Uses OPEN SOURCE calculations (astronomy-engine based)
 * Falls back to Prokerala API only if USE_OPEN_SOURCE = false
 */
export async function getCompleteBirthChart(details: BirthDetails) {
  console.log('📊 Fetching complete birth chart for:', details);

  // Use open source calculations!
  if (USE_OPEN_SOURCE) {
    console.log('✨ Using OPEN SOURCE Vedic Astrology Engine (Free!)');
    try {
      const result = await getOpenSourceChart(details);
      console.log('✅ Open source calculations complete!');
      return result;
    } catch (error) {
      console.error('❌ Error in open source calculations:', error);
      if (error instanceof Error) {
        console.error('   Error message:', error.message);
        console.error('   Error stack:', error.stack);
      }
      console.log('⚠️ Falling back to mock data...');
      // Fall through to mock data below
    }
  }

  // Fallback: Use Prokerala API if configured
  if (!USE_OPEN_SOURCE && API_KEY && CLIENT_ID) {
    console.log('🔌 Using Prokerala API...');
    const [birthDetails, kundli, advancedKundli, planetPositions] = await Promise.all([
      getBirthDetails(details),
      getKundli(details),
      getAdvancedKundli(details),
      getPlanetPositions(details),
    ]);

    return {
      birthDetails,
      kundli,
      advancedKundli,
      planetPositions,
      isUsingMockData: false,
    };
  }

  // Last resort: Mock data
  console.log('⚠️ Using mock data (for demo only)');
  const [birthDetails, kundli, advancedKundli, planetPositions] = await Promise.all([
    getBirthDetails(details),
    getKundli(details),
    getAdvancedKundli(details),
    getPlanetPositions(details),
  ]);

  return {
    birthDetails,
    kundli,
    advancedKundli,
    planetPositions,
    isUsingMockData: true,
  };
}

/**
 * Format date/time for API
 */
export function formatDateTimeForAPI(date: string, time: string): string {
  // Expected format: "1990-01-15T14:30:00"
  // If time already has seconds (HH:MM:SS), don't add :00
  // If time is just HH:MM, add :00
  const timeWithSeconds = time.includes(':') && time.split(':').length === 3
    ? time
    : `${time}:00`;

  return `${date}T${timeWithSeconds}`;
}

/**
 * Convert birth data to API format
 * IMPORTANT: Converts LOCAL time to UTC using proper timezone (Luxon)
 */
export function convertToAPIFormat(birthData: {
  dateOfBirth: string;
  timeOfBirth: string;
  timezone?: string;
  latitude: number;
  longitude: number;
}): BirthDetails {
  const localDateTime = formatDateTimeForAPI(birthData.dateOfBirth, birthData.timeOfBirth);

  // Default to IST if timezone not provided (for backwards compatibility)
  const timezone = birthData.timezone || 'Asia/Kolkata';

  console.log('🌍 Converting time using timezone:', timezone);
  console.log('📅 Local datetime:', localDateTime);

  try {
    // Use Luxon to properly convert local time to UTC
    const localTime = DateTime.fromISO(localDateTime, { zone: timezone });

    if (!localTime.isValid) {
      console.error('❌ Invalid datetime:', localTime.invalidReason);
      console.error('   Input was:', localDateTime, 'Timezone:', timezone);
      throw new Error(`Invalid datetime: ${localTime.invalidReason}`);
    }

    // Convert to UTC
    const utcTime = localTime.toUTC();
    const utcDateTime = utcTime.toISO({ suppressMilliseconds: true, includeOffset: false }) || '';

    console.log(`⏰ ${localDateTime} (${timezone}) → ${utcDateTime} (UTC)`);
    console.log(`   Offset: ${localTime.offset / 60} hours`);

    return {
      datetime: utcDateTime,
      latitude: birthData.latitude,
      longitude: birthData.longitude,
    };
  } catch (error) {
    console.error('❌ Error converting timezone:', error);
    console.error('   Birth data:', birthData);
    throw error;
  }
}

// ==================== MOCK DATA ====================

function getMockBirthDetails() {
  return {
    timezone: 'UTC',
    sunrise: '06:42:00',
    sunset: '18:18:00',
    moonrise: '08:23:00',
    moonset: '20:45:00',
  };
}

function getMockKundli() {
  return {
    ascendant: {
      sign: {
        id: 1,
        name: 'Aries',
        lord: 'Mars',
      },
      degree: 15.53,
      nakshatra: {
        id: 2,
        name: 'Bharani',
        pada: 2,
        lord: 'Venus',
      },
    },
    planets: getMockPlanetPositions().planets,
  };
}

function getMockAdvancedKundli() {
  return {
    ...getMockKundli(),
    vimshottari_dasha: {
      maha_dasha: {
        planet: 'Jupiter',
        start: '2020-05-15',
        end: '2036-05-15',
      },
      antar_dasha: {
        planet: 'Saturn',
        start: '2024-01-10',
        end: '2027-07-18',
      },
      pratyantar_dasha: {
        planet: 'Mercury',
        start: '2025-12-15',
        end: '2026-04-22',
      },
    },
    yogas: [
      { name: 'Gaja Kesari Yoga', description: 'Jupiter and Moon in kendras' },
      { name: 'Pancha Mahapurusha Yoga', description: 'Strong planet in kendra' },
    ],
    doshas: {
      mangal_dosha: {
        has_dosha: true,
        description: 'Partial Mangal Dosha - Mars in 5th house',
        severity: 'Low',
      },
      kalsarp_dosha: {
        has_dosha: false,
        description: 'No Kalsarp Dosha present',
      },
      pitra_dosha: {
        has_dosha: false,
        description: 'No Pitra Dosha present',
      },
      sade_sati: {
        is_active: false,
        description: 'Not in Sade Sati period',
        next_period: '2030-2037',
      },
    },
  };
}

function getMockPlanetPositions() {
  return {
    planets: [
      {
        id: 0,
        name: 'Sun',
        full_name: 'Surya',
        local_degree: 15.53,
        global_degree: 15.53,
        sign: { id: 1, name: 'Aries', lord: 'Mars' },
        nakshatra: { id: 2, name: 'Bharani', pada: 2, lord: 'Venus' },
        nakshatra_lord: 'Venus',
        house: 1,
        is_retrograde: false,
        speed: 1.01,
      },
      {
        id: 1,
        name: 'Moon',
        full_name: 'Chandra',
        local_degree: 22.31,
        global_degree: 52.31,
        sign: { id: 2, name: 'Taurus', lord: 'Venus' },
        nakshatra: { id: 4, name: 'Rohini', pada: 3, lord: 'Moon' },
        nakshatra_lord: 'Moon',
        house: 2,
        is_retrograde: false,
        speed: 13.18,
      },
      {
        id: 2,
        name: 'Mars',
        full_name: 'Mangal',
        local_degree: 8.75,
        global_degree: 128.75,
        sign: { id: 5, name: 'Leo', lord: 'Sun' },
        nakshatra: { id: 10, name: 'Magha', pada: 1, lord: 'Ketu' },
        nakshatra_lord: 'Ketu',
        house: 5,
        is_retrograde: false,
        speed: 0.68,
      },
      {
        id: 3,
        name: 'Mercury',
        full_name: 'Budha',
        local_degree: 28.21,
        global_degree: 358.21,
        sign: { id: 12, name: 'Pisces', lord: 'Jupiter' },
        nakshatra: { id: 27, name: 'Revati', pada: 4, lord: 'Mercury' },
        nakshatra_lord: 'Mercury',
        house: 12,
        is_retrograde: true,
        speed: -0.45,
      },
      {
        id: 4,
        name: 'Jupiter',
        full_name: 'Guru',
        local_degree: 12.50,
        global_degree: 252.50,
        sign: { id: 9, name: 'Sagittarius', lord: 'Jupiter' },
        nakshatra: { id: 19, name: 'Mula', pada: 2, lord: 'Ketu' },
        nakshatra_lord: 'Ketu',
        house: 9,
        is_retrograde: false,
        speed: 0.12,
      },
      {
        id: 5,
        name: 'Venus',
        full_name: 'Shukra',
        local_degree: 19.38,
        global_degree: 79.38,
        sign: { id: 3, name: 'Gemini', lord: 'Mercury' },
        nakshatra: { id: 6, name: 'Ardra', pada: 3, lord: 'Rahu' },
        nakshatra_lord: 'Rahu',
        house: 3,
        is_retrograde: false,
        speed: 1.23,
      },
      {
        id: 6,
        name: 'Saturn',
        full_name: 'Shani',
        local_degree: 5.81,
        global_degree: 275.81,
        sign: { id: 10, name: 'Capricorn', lord: 'Saturn' },
        nakshatra: { id: 21, name: 'Uttara Ashadha', pada: 1, lord: 'Sun' },
        nakshatra_lord: 'Sun',
        house: 10,
        is_retrograde: false,
        speed: 0.07,
      },
      {
        id: 7,
        name: 'Rahu',
        full_name: 'Rahu (North Node)',
        local_degree: 14.93,
        global_degree: 74.93,
        sign: { id: 3, name: 'Gemini', lord: 'Mercury' },
        nakshatra: { id: 6, name: 'Ardra', pada: 2, lord: 'Rahu' },
        nakshatra_lord: 'Rahu',
        house: 3,
        is_retrograde: true,
        speed: -0.05,
      },
      {
        id: 8,
        name: 'Ketu',
        full_name: 'Ketu (South Node)',
        local_degree: 14.93,
        global_degree: 254.93,
        sign: { id: 9, name: 'Sagittarius', lord: 'Jupiter' },
        nakshatra: { id: 20, name: 'Poorva Ashadha', pada: 4, lord: 'Venus' },
        nakshatra_lord: 'Venus',
        house: 9,
        is_retrograde: true,
        speed: -0.05,
      },
    ],
  };
}

/**
 * Check if API is configured
 */
export function isAPIConfigured(): boolean {
  return !!(API_KEY && CLIENT_ID);
}

/**
 * Get API status
 */
export function getAPIStatus() {
  if (USE_OPEN_SOURCE) {
    return {
      configured: true,
      message: '✨ Using OPEN SOURCE Vedic Astrology Engine - No API key needed! Completely free and accurate calculations using astronomy-engine.',
      isOpenSource: true,
    };
  }

  if (!API_KEY || !CLIENT_ID) {
    return {
      configured: false,
      message: 'Prokerala API not configured. Using mock data. See ASTROLOGY_API_SETUP.md',
      isOpenSource: false,
    };
  }
  return {
    configured: true,
    message: 'Prokerala API configured and ready',
    isOpenSource: false,
  };
}
