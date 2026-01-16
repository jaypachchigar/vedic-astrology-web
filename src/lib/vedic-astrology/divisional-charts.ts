/**
 * Divisional Charts (Vargas) Calculations
 * D1 to D60 - All divisional charts for comprehensive analysis
 */

// Zodiac signs
const ZODIAC_SIGNS = [
  { id: 1, name: 'Aries', sanskrit: 'Mesha', lord: 'Mars' },
  { id: 2, name: 'Taurus', sanskrit: 'Vrishabha', lord: 'Venus' },
  { id: 3, name: 'Gemini', sanskrit: 'Mithuna', lord: 'Mercury' },
  { id: 4, name: 'Cancer', sanskrit: 'Karka', lord: 'Moon' },
  { id: 5, name: 'Leo', sanskrit: 'Simha', lord: 'Sun' },
  { id: 6, name: 'Virgo', sanskrit: 'Kanya', lord: 'Mercury' },
  { id: 7, name: 'Libra', sanskrit: 'Tula', lord: 'Venus' },
  { id: 8, name: 'Scorpio', sanskrit: 'Vrishchika', lord: 'Mars' },
  { id: 9, name: 'Sagittarius', sanskrit: 'Dhanu', lord: 'Jupiter' },
  { id: 10, name: 'Capricorn', sanskrit: 'Makara', lord: 'Saturn' },
  { id: 11, name: 'Aquarius', sanskrit: 'Kumbha', lord: 'Saturn' },
  { id: 12, name: 'Pisces', sanskrit: 'Meena', lord: 'Jupiter' },
];

export interface DivisionalChartInfo {
  number: number;
  name: string;
  sanskrit: string;
  signifies: string;
  description: string;
}

export const DIVISIONAL_CHARTS: Record<number, DivisionalChartInfo> = {
  1: { number: 1, name: 'Rasi', sanskrit: 'Rasi', signifies: 'Body, Physical', description: 'Birth chart - Shows overall life, body, and personality' },
  2: { number: 2, name: 'Hora', sanskrit: 'Hora', signifies: 'Wealth', description: 'Wealth and financial matters' },
  3: { number: 3, name: 'Drekkana', sanskrit: 'Drekkana', signifies: 'Siblings', description: 'Siblings, courage, and skills' },
  4: { number: 4, name: 'Chaturthamsa', sanskrit: 'Chaturthamsa', signifies: 'Fortune', description: 'Fortune, property, and home' },
  5: { number: 5, name: 'Panchamsa', sanskrit: 'Panchamsa', signifies: 'Fame', description: 'Fame, authority, and power' },
  6: { number: 6, name: 'Shashthamsa', sanskrit: 'Shashthamsa', signifies: 'Health', description: 'Health, diseases, and enemies' },
  7: { number: 7, name: 'Saptamsa', sanskrit: 'Saptamsa', signifies: 'Children', description: 'Children and grandchildren' },
  8: { number: 8, name: 'Ashtamsa', sanskrit: 'Ashtamsa', signifies: 'Longevity', description: 'Longevity and sudden events' },
  9: { number: 9, name: 'Navamsa', sanskrit: 'Navamsa', signifies: 'Spouse/Dharma', description: 'Marriage, spouse, and dharma - Most important after D1' },
  10: { number: 10, name: 'Dasamsa', sanskrit: 'Dasamsa', signifies: 'Career', description: 'Career and profession' },
  11: { number: 11, name: 'Rudramsa', sanskrit: 'Rudramsa', signifies: 'Destruction', description: 'Destruction and obstacles' },
  12: { number: 12, name: 'Dwadasamsa', sanskrit: 'Dwadasamsa', signifies: 'Parents', description: 'Parents and ancestors' },
  16: { number: 16, name: 'Shodasamsa', sanskrit: 'Shodasamsa', signifies: 'Vehicles', description: 'Vehicles, luxuries, and comforts' },
  20: { number: 20, name: 'Vimsamsa', sanskrit: 'Vimsamsa', signifies: 'Spiritual', description: 'Spiritual progress and worship' },
  24: { number: 24, name: 'Chaturvimsamsa', sanskrit: 'Chaturvimsamsa', signifies: 'Education', description: 'Education and learning' },
  27: { number: 27, name: 'Bhamsa', sanskrit: 'Bhamsa', signifies: 'Strength', description: 'Strength and weakness' },
  30: { number: 30, name: 'Trimsamsa', sanskrit: 'Trimsamsa', signifies: 'Evils', description: 'Misfortunes and evils' },
  40: { number: 40, name: 'Khavedamsa', sanskrit: 'Khavedamsa', signifies: 'Auspicious', description: 'Auspicious and inauspicious effects' },
  45: { number: 45, name: 'Akshavedamsa', sanskrit: 'Akshavedamsa', signifies: 'General', description: 'General nature and behavior' },
  60: { number: 60, name: 'Shashtiamsa', sanskrit: 'Shashtiamsa', signifies: 'All Matters', description: 'All matters in life - most detailed' },
};

/**
 * Calculate divisional chart position for any division
 * @param rasiLongitude - Position in Rasi chart (0-360 degrees)
 * @param division - Division number (2 for D2, 3 for D3, etc.)
 */
export function calculateDivisionalPosition(rasiLongitude: number, division: number): {
  sign: typeof ZODIAC_SIGNS[0];
  degree: number;
  absoluteDegree: number;
} {
  const signNumber = Math.floor(rasiLongitude / 30); // 0-11
  const degreeInSign = rasiLongitude % 30;
  const isOddSign = signNumber % 2 === 0; // Aries, Gemini, Leo, etc. are odd signs (0, 2, 4...)

  let divisionalSign = 0;

  // Special case for D1 (Rasi)
  if (division === 1) {
    return {
      sign: ZODIAC_SIGNS[signNumber],
      degree: degreeInSign,
      absoluteDegree: rasiLongitude,
    };
  }

  // Special case for D2 (Hora)
  if (division === 2) {
    const halfSign = degreeInSign < 15 ? 0 : 1;
    if (isOddSign) {
      divisionalSign = halfSign === 0 ? 4 : 3; // Leo or Cancer
    } else {
      divisionalSign = halfSign === 0 ? 3 : 4; // Cancer or Leo
    }
  }
  // Special case for D3 (Drekkana)
  else if (division === 3) {
    const part = Math.floor(degreeInSign / 10); // 0, 1, or 2
    divisionalSign = (signNumber + part * 4) % 12;
  }
  // Special case for D4 (Chaturthamsa)
  else if (division === 4) {
    const part = Math.floor(degreeInSign / 7.5); // 0, 1, 2, or 3
    divisionalSign = (signNumber + part * 3) % 12;
  }
  // Special case for D7 (Saptamsa)
  else if (division === 7) {
    const part = Math.floor(degreeInSign * 7 / 30); // 0-6
    if (isOddSign) {
      divisionalSign = (signNumber + part) % 12;
    } else {
      divisionalSign = (signNumber + 6 + part) % 12;
    }
  }
  // Special case for D9 (Navamsa)
  else if (division === 9) {
    const part = Math.floor(degreeInSign * 9 / 30); // 0-8
    if (isOddSign) {
      divisionalSign = (signNumber + part) % 12;
    } else {
      divisionalSign = (signNumber + 8 + part) % 12;
    }
  }
  // Special case for D10 (Dasamsa)
  else if (division === 10) {
    const part = Math.floor(degreeInSign / 3); // 0-9
    if (isOddSign) {
      divisionalSign = (signNumber + part) % 12;
    } else {
      divisionalSign = (signNumber + 8 + part) % 12;
    }
  }
  // Special case for D12 (Dwadasamsa)
  else if (division === 12) {
    const part = Math.floor(degreeInSign * 12 / 30); // 0-11
    divisionalSign = (signNumber + part) % 12;
  }
  // Special case for D16 (Shodasamsa)
  else if (division === 16) {
    const part = Math.floor(degreeInSign * 16 / 30); // 0-15
    if (isOddSign) {
      divisionalSign = (part) % 12;
    } else {
      divisionalSign = (8 + part) % 12;
    }
  }
  // Special case for D20 (Vimsamsa)
  else if (division === 20) {
    const part = Math.floor(degreeInSign * 20 / 30); // 0-19
    if (isOddSign) {
      divisionalSign = (part) % 12;
    } else {
      divisionalSign = (8 + part) % 12;
    }
  }
  // Special case for D24 (Chaturvimsamsa)
  else if (division === 24) {
    const part = Math.floor(degreeInSign * 24 / 30); // 0-23
    if (isOddSign) {
      divisionalSign = (4 + part) % 12; // Start from Leo
    } else {
      divisionalSign = (3 + part) % 12; // Start from Cancer
    }
  }
  // Special case for D27 (Bhamsa)
  else if (division === 27) {
    const part = Math.floor(degreeInSign * 27 / 30); // 0-26
    if (isOddSign) {
      divisionalSign = (part) % 12;
    } else {
      divisionalSign = (8 + part) % 12;
    }
  }
  // Special case for D30 (Trimsamsa)
  else if (division === 30) {
    // Special formula for Trimsamsa
    let trimsamsaLord: number;
    if (isOddSign) {
      if (degreeInSign < 5) trimsamsaLord = 1; // Mars - 5°
      else if (degreeInSign < 10) trimsamsaLord = 2; // Saturn - 5°
      else if (degreeInSign < 18) trimsamsaLord = 4; // Jupiter - 8°
      else if (degreeInSign < 25) trimsamsaLord = 3; // Mercury - 7°
      else trimsamsaLord = 5; // Venus - 5°
    } else {
      if (degreeInSign < 5) trimsamsaLord = 5; // Venus - 5°
      else if (degreeInSign < 12) trimsamsaLord = 3; // Mercury - 7°
      else if (degreeInSign < 20) trimsamsaLord = 4; // Jupiter - 8°
      else if (degreeInSign < 25) trimsamsaLord = 2; // Saturn - 5°
      else trimsamsaLord = 1; // Mars - 5°
    }
    // Map to signs (Mars=0,7; Saturn=9,10; Jupiter=8,11; Mercury=2,5; Venus=1,6)
    const trimsamsaMap: Record<number, number> = { 1: 0, 2: 9, 3: 2, 4: 8, 5: 1 };
    divisionalSign = trimsamsaMap[trimsamsaLord];
  }
  // Special case for D40 (Khavedamsa)
  else if (division === 40) {
    const part = Math.floor(degreeInSign * 40 / 30); // 0-39
    if (isOddSign) {
      divisionalSign = (part) % 12;
    } else {
      divisionalSign = (8 + part) % 12;
    }
  }
  // Special case for D45 (Akshavedamsa)
  else if (division === 45) {
    const part = Math.floor(degreeInSign * 45 / 30); // 0-44
    if (isOddSign) {
      divisionalSign = (part) % 12;
    } else {
      divisionalSign = (8 + part) % 12;
    }
  }
  // Special case for D60 (Shashtiamsa)
  else if (division === 60) {
    const part = Math.floor(degreeInSign * 60 / 30); // 0-59
    divisionalSign = (part) % 12;
  }
  // Generic formula for other divisions (D5, D6, D8, D11, etc.)
  else {
    const partSize = 30 / division;
    const part = Math.floor(degreeInSign / partSize);
    if (isOddSign) {
      divisionalSign = (signNumber + part) % 12;
    } else {
      divisionalSign = (signNumber + (division - 1) + part) % 12;
    }
  }

  // Calculate degree within divisional sign
  const partSize = 30 / division;
  const partIndex = Math.floor(degreeInSign / partSize);
  const degreeWithinPart = degreeInSign - (partIndex * partSize);
  const divisionalDegree = (degreeWithinPart * division) % 30;

  const absoluteDegree = divisionalSign * 30 + divisionalDegree;

  return {
    sign: ZODIAC_SIGNS[divisionalSign],
    degree: divisionalDegree,
    absoluteDegree,
  };
}

/**
 * Calculate all divisional charts for a planet
 */
export function calculateAllDivisionalCharts(rasiLongitude: number) {
  const divisions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 20, 24, 27, 30, 40, 45, 60];

  const charts: Record<number, ReturnType<typeof calculateDivisionalPosition>> = {};

  divisions.forEach(div => {
    charts[div] = calculateDivisionalPosition(rasiLongitude, div);
  });

  return charts;
}

/**
 * Get planet positions for a specific divisional chart
 */
export function getPlanetPositionsInDivisionalChart(
  planets: Array<{ name: string; siderealLongitude: number }>,
  division: number
) {
  return planets.map(planet => ({
    name: planet.name,
    originalLongitude: planet.siderealLongitude,
    ...calculateDivisionalPosition(planet.siderealLongitude, division),
  }));
}
