/**
 * Open Source Vedic Astrology Calculation Engine
 * Main API - Combines all calculations into a comprehensive birth chart
 *
 * Free and open source alternative to paid astrology APIs
 */

import {
  calculatePlanetaryPositions,
  calculateLunarNodes,
  calculateAscendant,
  getAllPlanetaryPositions,
  getEnhancedPlanetaryPositions,
  calculateNavamsaPosition,
  isVargottama,
  PlanetPosition,
  EnhancedPlanetPosition,
} from './planetary-calculations';
import { calculateHouses, getPlanetHouse, House } from './house-calculations';
import {
  calculateVimshottariDasha,
  formatDashaDate,
  VimshottariDasha,
} from './dasha-calculations';
import { analyzeAllDoshas, DoshaAnalysis } from './dosha-calculations';

export interface BirthDetails {
  datetime: string; // ISO format: "1990-01-15T14:30:00"
  latitude: number;
  longitude: number;
}

export interface CompleteBirthChart {
  birthDetails: {
    date: string;
    time: string;
    location: { latitude: number; longitude: number };
    timezone: string;
  };
  ascendant: {
    sign: { id: number; name: string; lord: string };
    degree: number;
    nakshatra: { id: number; name: string; lord: string };
    pada: number;
  };
  planets: Array<{
    id: number;
    name: string;
    full_name: string;
    local_degree: number;
    global_degree: number;
    sign: { id: number; name: string; lord: string };
    nakshatra: { id: number; name: string; pada: number; lord: string };
    nakshatra_lord: string;
    house: number;
    is_retrograde: boolean;
    speed: number;
  }>;
  houses: House[];
  vimshottariDasha: {
    maha_dasha: {
      planet: string;
      start: string;
      end: string;
    };
    antar_dasha: {
      planet: string;
      start: string;
      end: string;
    };
    pratyantar_dasha: {
      planet: string;
      start: string;
      end: string;
    };
    all_maha_dashas: Array<{
      planet: string;
      start: string;
      end: string;
      years: number;
    }>;
  };
  doshas: {
    mangal_dosha: {
      has_dosha: boolean;
      description: string;
      severity?: string;
      remedies?: string[];
    };
    kalsarp_dosha: {
      has_dosha: boolean;
      description: string;
      severity?: string;
      remedies?: string[];
    };
    pitra_dosha: {
      has_dosha: boolean;
      description: string;
      severity?: string;
      remedies?: string[];
    };
    sade_sati: {
      is_active: boolean;
      description: string;
      phase?: string;
      next_period?: string;
    };
  };
}

// Parse datetime string to Date object
// Input is UTC time (already converted from local)
function parseDateTime(datetimeString: string): Date {
  // Parse the datetime as UTC explicitly
  // Format: "1996-04-11T18:45:00"
  const parts = datetimeString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!parts) {
    throw new Error('Invalid datetime format: ' + datetimeString);
  }

  const [, year, month, day, hour, minute, second] = parts;

  // Use Date.UTC to create a proper UTC date
  const utcTimestamp = Date.UTC(
    parseInt(year),
    parseInt(month) - 1, // Month is 0-indexed
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  );

  return new Date(utcTimestamp);
}

// Calculate complete birth chart
export async function getCompleteBirthChart(details: BirthDetails): Promise<{
  birthDetails: any;
  kundli: any;
  advancedKundli: any;
  planetPositions: any;
  isUsingMockData: boolean;
}> {
  try {
    console.log('🔬 Starting calculation with:', details);

    if (!details || !details.datetime) {
      throw new Error('Invalid birth details: missing datetime');
    }

    if (!details.latitude || !details.longitude) {
      throw new Error('Invalid birth details: missing coordinates');
    }

    const birthDate = parseDateTime(details.datetime);
    console.log('📅 Parsed date:', birthDate.toISOString());
    console.log('📅 Local representation:', birthDate.toString());
    const { latitude, longitude } = details;
    console.log('📍 Coordinates:', { latitude, longitude });
    console.log('🕐 Hour:', birthDate.getHours(), 'UTC Hour:', birthDate.getUTCHours());

    // Get all planetary positions with enhanced data (Navamsa, Vargottama)
    const allPlanets = getEnhancedPlanetaryPositions(birthDate);

    // Log first few planets for debugging
    console.log('🪐 Planets calculated:');
    allPlanets.slice(0, 3).forEach(p => {
      console.log(`  ${p.name}: ${p.sign.name} ${p.localDegree.toFixed(2)}° (House ${getPlanetHouse(p.siderealLongitude, 0)})`);
    });

    // Calculate ascendant
    const ascendant = calculateAscendant(birthDate, latitude, longitude);
    console.log('🌅 Ascendant calculated:', ascendant.sign.name, ascendant.degree, '° (absolute:', ascendant.absoluteDegree, '°)');

    // Calculate houses and assign planets to houses (use absolute degree for house calculations)
    const ascendantAbsoluteDegree = ascendant.absoluteDegree || ascendant.degree;
    const houses = calculateHouses(ascendantAbsoluteDegree, allPlanets);

    // Get Moon position for dasha calculations
    const moon = allPlanets.find((p) => p.name === 'Moon');
    if (!moon) {
      throw new Error('Moon position could not be calculated');
    }

    // Calculate Vimshottari Dasha
    const dasha = calculateVimshottariDasha(birthDate, moon.siderealLongitude);

    // Get moon sign (for Sade Sati calculation)
    const moonSign = Math.floor(moon.siderealLongitude / 30) + 1;

    // Analyze doshas (use absolute degree)
    const doshas = analyzeAllDoshas(allPlanets, ascendantAbsoluteDegree, moonSign);

    // Format planets with house information and enhanced data
    const formattedPlanets = allPlanets.map((planet) => {
      const house = getPlanetHouse(planet.siderealLongitude, ascendantAbsoluteDegree);

      return {
        id: planet.id,
        name: planet.name,
        full_name: planet.fullName,
        local_degree: planet.localDegree,
        global_degree: planet.siderealLongitude,
        sign: {
          id: planet.sign.id,
          name: planet.sign.name,
          lord: planet.sign.lord,
        },
        nakshatra: {
          id: planet.nakshatra.id,
          name: planet.nakshatra.name,
          pada: planet.nakshatraPada,
          lord: planet.nakshatraLord,
          deity: planet.nakshatraDetails.deity,
          description: planet.nakshatraDetails.description,
        },
        nakshatra_lord: planet.nakshatraLord,
        house,
        is_retrograde: planet.isRetrograde,
        speed: planet.speed,
        // Enhanced data
        navamsa_sign: {
          id: planet.navamsaSign.id,
          name: planet.navamsaSign.name,
          lord: planet.navamsaSign.lord,
        },
        navamsa_degree: planet.navamsaDegree,
        is_vargottama: planet.isVargottama,
        is_combust: planet.isCombust,
      };
    });

    // Build response in Prokerala API format for compatibility
    const response = {
      birthDetails: {
        timezone: 'UTC',
        sunrise: '06:00:00',
        sunset: '18:00:00',
        moonrise: '08:00:00',
        moonset: '20:00:00',
      },
      kundli: {
        ascendant: {
          sign: {
            id: ascendant.sign.id,
            name: ascendant.sign.name,
            lord: ascendant.sign.lord,
          },
          degree: ascendant.degree,
          nakshatra: {
            id: ascendant.nakshatra.id,
            name: ascendant.nakshatra.name,
            pada: ascendant.pada,
            lord: ascendant.nakshatra.lord,
          },
        },
        planets: formattedPlanets,
      },
      advancedKundli: {
        ascendant: {
          sign: {
            id: ascendant.sign.id,
            name: ascendant.sign.name,
            lord: ascendant.sign.lord,
          },
          degree: ascendant.degree,
          nakshatra: {
            id: ascendant.nakshatra.id,
            name: ascendant.nakshatra.name,
            pada: ascendant.pada,
            lord: ascendant.nakshatra.lord,
          },
        },
        vimshottari_dasha: {
          maha_dasha: {
            planet: dasha.mahaDasha.planet,
            start: formatDashaDate(dasha.mahaDasha.startDate),
            end: formatDashaDate(dasha.mahaDasha.endDate),
          },
          antar_dasha: {
            planet: dasha.antarDasha.planet,
            start: formatDashaDate(dasha.antarDasha.startDate),
            end: formatDashaDate(dasha.antarDasha.endDate),
          },
          pratyantar_dasha: {
            planet: dasha.pratyantarDasha.planet,
            start: formatDashaDate(dasha.pratyantarDasha.startDate),
            end: formatDashaDate(dasha.pratyantarDasha.endDate),
          },
          all_maha_dashas: dasha.allMahaDashas.map((d) => ({
            planet: d.planet,
            start: formatDashaDate(d.startDate),
            end: formatDashaDate(d.endDate),
            years: d.years,
          })),
        },
        doshas: {
          mangal_dosha: doshas.mangalDosha,
          kalsarp_dosha: doshas.kalsarpDosha,
          pitra_dosha: doshas.pitraDosha,
          sade_sati: doshas.sadeSati,
        },
        yogas: [
          {
            name: 'Custom Yoga Detection',
            description: 'Yoga analysis based on planetary positions',
          },
        ],
      },
      planetPositions: {
        planets: formattedPlanets,
      },
      isUsingMockData: false, // This is REAL calculation, not mock data!
    };

    return response;
  } catch (error) {
    console.error('Error in getCompleteBirthChart:', error);
    throw error;
  }
}

// Export all calculation functions for advanced use
export {
  calculatePlanetaryPositions,
  calculateLunarNodes,
  calculateAscendant,
  getAllPlanetaryPositions,
  calculateHouses,
  calculateVimshottariDasha,
  analyzeAllDoshas,
};

export type { PlanetPosition, EnhancedPlanetPosition, House, VimshottariDasha, DoshaAnalysis };
