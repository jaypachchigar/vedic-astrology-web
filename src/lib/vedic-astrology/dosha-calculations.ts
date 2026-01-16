/**
 * Dosha Detection for Vedic Astrology
 * Detects Mangal Dosha, Kalsarp Dosha, Pitra Dosha, and Sade Sati
 */

import { PlanetPosition } from './planetary-calculations';

export interface DoshaResult {
  hasDosha: boolean;
  description: string;
  severity?: 'Low' | 'Medium' | 'High';
  remedies?: string[];
}

export interface DoshaAnalysis {
  mangalDosha: DoshaResult;
  kalsarpDosha: DoshaResult;
  pitraDosha: DoshaResult;
  sadeSati: {
    isActive: boolean;
    description: string;
    phase?: 'Rising' | 'Peak' | 'Setting';
    nextPeriod?: string;
  };
}

// Check for Mangal Dosha (Mars affliction for marriage)
export function checkMangalDosha(
  marsPlanet: PlanetPosition,
  ascendantDegree: number
): DoshaResult {
  // Calculate which house Mars is in
  let diff = marsPlanet.siderealLongitude - ascendantDegree;
  while (diff < 0) diff += 360;
  while (diff >= 360) diff -= 360;
  const marsHouse = Math.floor(diff / 30) + 1;

  // Mangal Dosha is present if Mars is in houses 1, 2, 4, 7, 8, or 12
  const doshaHouses = [1, 2, 4, 7, 8, 12];
  const hasDosha = doshaHouses.includes(marsHouse);

  if (!hasDosha) {
    return {
      hasDosha: false,
      description: 'No Mangal Dosha present - Mars is well placed',
    };
  }

  // Determine severity based on house
  let severity: 'Low' | 'Medium' | 'High' = 'Medium';
  if (marsHouse === 1 || marsHouse === 4) {
    severity = 'High';
  } else if (marsHouse === 2 || marsHouse === 12) {
    severity = 'Medium';
  } else {
    severity = 'Low';
  }

  const houseDescriptions: { [key: number]: string } = {
    1: 'First house - affects personality and health',
    2: 'Second house - affects family and wealth',
    4: 'Fourth house - affects domestic happiness',
    7: 'Seventh house - directly affects marriage partner',
    8: 'Eighth house - affects longevity and sudden events',
    12: 'Twelfth house - affects expenses and losses',
  };

  return {
    hasDosha: true,
    description: `Mangal Dosha present - Mars in ${marsHouse}${
      marsHouse === 1 ? 'st' : marsHouse === 2 ? 'nd' : marsHouse === 3 ? 'rd' : 'th'
    } house. ${houseDescriptions[marsHouse]}`,
    severity,
    remedies: [
      'Recite Hanuman Chalisa daily',
      'Visit Hanuman temple on Tuesdays',
      'Donate red items on Tuesdays',
      'Wear red coral (after astrological consultation)',
      'Perform Mars remedial measures',
      'Marriage compatibility: Partner should also have Mangal Dosha (cancels out)',
    ],
  };
}

// Check for Kalsarp Dosha (all planets between Rahu and Ketu)
export function checkKalsarpDosha(planets: PlanetPosition[]): DoshaResult {
  const rahu = planets.find((p) => p.name === 'Rahu');
  const ketu = planets.find((p) => p.name === 'Ketu');

  if (!rahu || !ketu) {
    return {
      hasDosha: false,
      description: 'Cannot determine - Rahu/Ketu positions not available',
    };
  }

  // Get all planets except Rahu and Ketu
  const otherPlanets = planets.filter(
    (p) => p.name !== 'Rahu' && p.name !== 'Ketu'
  );

  // Check if all planets are on one side of the Rahu-Ketu axis
  const rahuLong = rahu.siderealLongitude;
  const ketuLong = ketu.siderealLongitude;

  // Normalize to check if planets are between Rahu and Ketu
  const allBetween = otherPlanets.every((planet) => {
    const pLong = planet.siderealLongitude;

    // Check if planet is in the arc from Rahu to Ketu (going clockwise)
    if (rahuLong < ketuLong) {
      return pLong >= rahuLong && pLong <= ketuLong;
    } else {
      return pLong >= rahuLong || pLong <= ketuLong;
    }
  });

  if (allBetween) {
    return {
      hasDosha: true,
      description: 'Kalsarp Dosha present - All planets are hemmed between Rahu and Ketu',
      severity: 'High',
      remedies: [
        'Visit Kalsarp Dosha temples (Trimbakeshwar, Ujjain)',
        'Perform Rahu-Ketu puja on eclipses',
        'Chant Maha Mrityunjaya Mantra',
        'Donate to serpent temples',
        'Wear Gomed (Hessonite) for Rahu and Cat\'s Eye for Ketu (after consultation)',
      ],
    };
  }

  return {
    hasDosha: false,
    description: 'No Kalsarp Dosha - Planets are distributed on both sides of Rahu-Ketu axis',
  };
}

// Check for Pitra Dosha (affliction from ancestors)
export function checkPitraDosha(planets: PlanetPosition[]): DoshaResult {
  const sun = planets.find((p) => p.name === 'Sun');
  const saturn = planets.find((p) => p.name === 'Saturn');
  const rahu = planets.find((p) => p.name === 'Rahu');
  const ketu = planets.find((p) => p.name === 'Ketu');

  if (!sun || !saturn) {
    return {
      hasDosha: false,
      description: 'Cannot determine - planetary positions not available',
    };
  }

  // Pitra Dosha indicators:
  // 1. Sun afflicted by Saturn, Rahu, or Ketu (within 10 degrees)
  // 2. 9th house afflicted
  let hasDosha = false;
  let reasons: string[] = [];

  // Check Sun-Saturn conjunction
  const sunSaturnDiff = Math.abs(sun.siderealLongitude - saturn.siderealLongitude);
  if (sunSaturnDiff < 10 || sunSaturnDiff > 350) {
    hasDosha = true;
    reasons.push('Sun conjunct with Saturn');
  }

  // Check Sun-Rahu conjunction
  if (rahu) {
    const sunRahuDiff = Math.abs(sun.siderealLongitude - rahu.siderealLongitude);
    if (sunRahuDiff < 10 || sunRahuDiff > 350) {
      hasDosha = true;
      reasons.push('Sun conjunct with Rahu');
    }
  }

  // Check Sun-Ketu conjunction
  if (ketu) {
    const sunKetuDiff = Math.abs(sun.siderealLongitude - ketu.siderealLongitude);
    if (sunKetuDiff < 10 || sunKetuDiff > 350) {
      hasDosha = true;
      reasons.push('Sun conjunct with Ketu');
    }
  }

  if (hasDosha) {
    return {
      hasDosha: true,
      description: `Pitra Dosha present - ${reasons.join(', ')}. Indicates ancestral karma to be resolved.`,
      severity: 'Medium',
      remedies: [
        'Perform Shraddha and Tarpan rituals for ancestors',
        'Feed Brahmins on Amavasya (new moon)',
        'Donate to charitable causes in ancestors\' names',
        'Plant Peepal tree and water it regularly',
        'Recite Gayatri Mantra',
        'Help elderly people and orphans',
      ],
    };
  }

  return {
    hasDosha: false,
    description: 'No Pitra Dosha detected - Sun is well placed',
  };
}

// Check for Sade Sati (7.5 years of Saturn transit)
export function checkSadeSati(
  moonSign: number, // 1-12
  saturnSign: number, // 1-12
  currentDate: Date
): {
  isActive: boolean;
  description: string;
  phase?: 'Rising' | 'Peak' | 'Setting';
  nextPeriod?: string;
} {
  // Sade Sati occurs when Saturn transits:
  // - 12th house from Moon sign (Rising phase)
  // - Same house as Moon sign (Peak phase)
  // - 2nd house from Moon sign (Setting phase)

  // Normalize signs to 1-12
  while (moonSign > 12) moonSign -= 12;
  while (moonSign < 1) moonSign += 12;
  while (saturnSign > 12) saturnSign -= 12;
  while (saturnSign < 1) saturnSign += 12;

  const diff = saturnSign - moonSign;
  const normalizedDiff = ((diff % 12) + 12) % 12;

  if (normalizedDiff === 11) {
    // Saturn in 12th from Moon (Rising phase)
    return {
      isActive: true,
      description: 'Sade Sati is active - Rising phase (Saturn in 12th from Moon sign)',
      phase: 'Rising',
    };
  } else if (normalizedDiff === 0) {
    // Saturn in same sign as Moon (Peak phase - most intense)
    return {
      isActive: true,
      description: 'Sade Sati is active - Peak phase (Saturn over Moon sign). This is the most challenging period.',
      phase: 'Peak',
    };
  } else if (normalizedDiff === 1) {
    // Saturn in 2nd from Moon (Setting phase)
    return {
      isActive: true,
      description: 'Sade Sati is active - Setting phase (Saturn in 2nd from Moon sign)',
      phase: 'Setting',
    };
  }

  // Not in Sade Sati - calculate when next one starts
  // Saturn takes ~2.5 years per sign, so ~30 years for full cycle
  // Next Sade Sati starts when Saturn enters 12th from Moon
  const yearsToNext = ((11 - normalizedDiff + 12) % 12) * 2.5;
  const nextYear = currentDate.getFullYear() + Math.floor(yearsToNext);
  const endYear = nextYear + 7.5;

  return {
    isActive: false,
    description: 'Sade Sati is not currently active',
    nextPeriod: `${nextYear}-${Math.floor(endYear)}`,
  };
}

// Comprehensive dosha analysis
export function analyzeAllDoshas(
  planets: PlanetPosition[],
  ascendantDegree: number,
  moonSign: number,
  currentDate: Date = new Date()
): DoshaAnalysis {
  const mars = planets.find((p) => p.name === 'Mars');
  const saturn = planets.find((p) => p.name === 'Saturn');

  const mangalDosha = mars
    ? checkMangalDosha(mars, ascendantDegree)
    : { hasDosha: false, description: 'Mars position not available' };

  const kalsarpDosha = checkKalsarpDosha(planets);
  const pitraDosha = checkPitraDosha(planets);

  const saturnSignNumber = saturn ? Math.floor(saturn.siderealLongitude / 30) + 1 : 1;
  const sadeSati = checkSadeSati(moonSign, saturnSignNumber, currentDate);

  return {
    mangalDosha,
    kalsarpDosha,
    pitraDosha,
    sadeSati,
  };
}
