/**
 * Open Source Vedic Astrology Calculation Engine
 * Uses astronomy-engine for accurate astronomical calculations
 * Applies Vedic astrology principles (Lahiri Ayanamsa, Nakshatras, etc.)
 */

import * as Astronomy from 'astronomy-engine';

// Lahiri Ayanamsa value (precession correction for sidereal zodiac)
// Uses accurate Lahiri formula based on Julian Day Number
// Reference: IAU standards and Astronomical Society of India
function getLahiriAyanamsa(date: Date): number {
  // Calculate Julian Day Number
  const jd = getJulianDay(date);

  // Accurate Lahiri Ayanamsa formula
  // Ayanamsa at J2000.0 (JD 2451545.0, Jan 1, 2000 12:00 UT) = 23° 51' 11" = 23.8531°
  // Rate = 50.2881" per year = 0.01396894° per year
  const t = (jd - 2451545.0) / 36525.0; // Julian centuries since J2000

  // Formula with higher order terms for accuracy
  // Using the standard precession formula
  const ayanamsa = 23.8531 +
                   (0.01396894 * t * 36525.0 / 365.25) +
                   (0.0001266 * t * t);

  return ayanamsa;
}

// Calculate Julian Day Number
function getJulianDay(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  const dayFraction = (hour + minute / 60 + second / 3600) / 24;

  let jy = y;
  let jm = m;

  if (m <= 2) {
    jy -= 1;
    jm += 12;
  }

  const a = Math.floor(jy / 100);
  const b = 2 - a + Math.floor(a / 4);

  const jd = Math.floor(365.25 * (jy + 4716)) +
             Math.floor(30.6001 * (jm + 1)) +
             d + b - 1524.5 + dayFraction;

  return jd;
}

// Convert tropical longitude to sidereal (Vedic)
function tropicalToSidereal(tropicalLongitude: number, ayanamsa: number): number {
  let sidereal = tropicalLongitude - ayanamsa;
  while (sidereal < 0) sidereal += 360;
  while (sidereal >= 360) sidereal -= 360;
  return sidereal;
}

// Zodiac signs (sidereal)
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

// 27 Nakshatras
const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras' },
  { id: 2, name: 'Bharani', lord: 'Venus', deity: 'Yama' },
  { id: 3, name: 'Krittika', lord: 'Sun', deity: 'Agni' },
  { id: 4, name: 'Rohini', lord: 'Moon', deity: 'Brahma' },
  { id: 5, name: 'Mrigashira', lord: 'Mars', deity: 'Soma' },
  { id: 6, name: 'Ardra', lord: 'Rahu', deity: 'Rudra' },
  { id: 7, name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi' },
  { id: 8, name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati' },
  { id: 9, name: 'Ashlesha', lord: 'Mercury', deity: 'Serpents' },
  { id: 10, name: 'Magha', lord: 'Ketu', deity: 'Pitris' },
  { id: 11, name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga' },
  { id: 12, name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman' },
  { id: 13, name: 'Hasta', lord: 'Moon', deity: 'Savitar' },
  { id: 14, name: 'Chitra', lord: 'Mars', deity: 'Tvashtar' },
  { id: 15, name: 'Swati', lord: 'Rahu', deity: 'Vayu' },
  { id: 16, name: 'Vishakha', lord: 'Jupiter', deity: 'Indra-Agni' },
  { id: 17, name: 'Anuradha', lord: 'Saturn', deity: 'Mitra' },
  { id: 18, name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra' },
  { id: 19, name: 'Mula', lord: 'Ketu', deity: 'Nirriti' },
  { id: 20, name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas' },
  { id: 21, name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishvadevas' },
  { id: 22, name: 'Shravana', lord: 'Moon', deity: 'Vishnu' },
  { id: 23, name: 'Dhanishta', lord: 'Mars', deity: 'Vasus' },
  { id: 24, name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna' },
  { id: 25, name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada' },
  { id: 26, name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahir Budhnya' },
  { id: 27, name: 'Revati', lord: 'Mercury', deity: 'Pushan' },
];

// Get zodiac sign from sidereal longitude
function getZodiacSign(longitude: number) {
  const signIndex = Math.floor(longitude / 30);
  const localDegree = longitude % 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    localDegree,
  };
}

// Get nakshatra from sidereal longitude
function getNakshatra(longitude: number) {
  const nakshatraSize = 360 / 27; // 13.333... degrees each
  const nakshatraIndex = Math.floor(longitude / nakshatraSize);
  const localDegree = longitude % nakshatraSize;
  const pada = Math.floor(localDegree / (nakshatraSize / 4)) + 1; // 4 padas per nakshatra

  return {
    nakshatra: NAKSHATRAS[nakshatraIndex],
    pada,
    localDegree,
  };
}

// Calculate planetary positions
export interface PlanetPosition {
  id: number;
  name: string;
  fullName: string;
  tropicalLongitude: number;
  siderealLongitude: number;
  latitude: number;
  distance: number; // AU
  speed: number; // degrees per day
  isRetrograde: boolean;
  sign: typeof ZODIAC_SIGNS[0];
  localDegree: number;
  nakshatra: typeof NAKSHATRAS[0];
  nakshatraPada: number;
  nakshatraLord: string;
}

export function calculatePlanetaryPositions(date: Date): PlanetPosition[] {
  const ayanamsa = getLahiriAyanamsa(date);
  const planets: PlanetPosition[] = [];

  // Bodies to calculate
  const bodies = [
    { body: Astronomy.Body.Sun, name: 'Sun', fullName: 'Surya', id: 0 },
    { body: Astronomy.Body.Moon, name: 'Moon', fullName: 'Chandra', id: 1 },
    { body: Astronomy.Body.Mars, name: 'Mars', fullName: 'Mangal', id: 2 },
    { body: Astronomy.Body.Mercury, name: 'Mercury', fullName: 'Budha', id: 3 },
    { body: Astronomy.Body.Jupiter, name: 'Jupiter', fullName: 'Guru', id: 4 },
    { body: Astronomy.Body.Venus, name: 'Venus', fullName: 'Shukra', id: 5 },
    { body: Astronomy.Body.Saturn, name: 'Saturn', fullName: 'Shani', id: 6 },
  ];

  bodies.forEach(({ body, name, fullName, id }) => {
    const geoVector = Astronomy.GeoVector(body, date, false);
    const ecliptic = Astronomy.Ecliptic(geoVector);

    // Calculate speed (position change over 1 day)
    const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    const nextGeoVector = Astronomy.GeoVector(body, nextDay, false);
    const nextEcliptic = Astronomy.Ecliptic(nextGeoVector);
    let speed = nextEcliptic.elon - ecliptic.elon;

    // Handle wraparound
    if (speed > 180) speed -= 360;
    if (speed < -180) speed += 360;

    const isRetrograde = speed < 0;

    const siderealLongitude = tropicalToSidereal(ecliptic.elon, ayanamsa);
    const { sign, localDegree } = getZodiacSign(siderealLongitude);
    const { nakshatra, pada, localDegree: nakLocalDegree } = getNakshatra(siderealLongitude);

    planets.push({
      id,
      name,
      fullName,
      tropicalLongitude: ecliptic.elon,
      siderealLongitude,
      latitude: ecliptic.elat,
      distance: Astronomy.HelioDistance(body, date),
      speed,
      isRetrograde,
      sign,
      localDegree,
      nakshatra,
      nakshatraPada: pada,
      nakshatraLord: nakshatra.lord,
    });
  });

  return planets;
}

// Calculate Rahu and Ketu (North and South lunar nodes)
export function calculateLunarNodes(date: Date): { rahu: PlanetPosition; ketu: PlanetPosition } {
  const ayanamsa = getLahiriAyanamsa(date);

  // Calculate Julian Day Number for more accurate calculation
  const jd = getJulianDay(date);
  const t = (jd - 2451545.0) / 36525.0; // Julian centuries since J2000

  // More accurate mean lunar node calculation (Brown's lunar theory)
  // Longitude of ascending node (Rahu) - tropical
  // Formula from astronomical algorithms
  const omega = 125.04452 - 1934.136261 * t + 0.0020708 * t * t + t * t * t / 450000.0;

  // Normalize to 0-360
  let rahuTropical = omega % 360;
  while (rahuTropical < 0) rahuTropical += 360;
  while (rahuTropical >= 360) rahuTropical -= 360;

  // Ketu is always 180 degrees opposite to Rahu
  const ketuTropical = (rahuTropical + 180) % 360;

  // Convert to sidereal
  const rahuSidereal = tropicalToSidereal(rahuTropical, ayanamsa);
  const ketuSidereal = tropicalToSidereal(ketuTropical, ayanamsa);

  // Rahu
  const rahuZodiac = getZodiacSign(rahuSidereal);
  const rahuNak = getNakshatra(rahuSidereal);

  const rahu: PlanetPosition = {
    id: 7,
    name: 'Rahu',
    fullName: 'Rahu (North Node)',
    tropicalLongitude: rahuTropical,
    siderealLongitude: rahuSidereal,
    latitude: 0,
    distance: 0,
    speed: -0.053, // Rahu moves backwards (retrograde)
    isRetrograde: true,
    sign: rahuZodiac.sign,
    localDegree: rahuZodiac.localDegree,
    nakshatra: rahuNak.nakshatra,
    nakshatraPada: rahuNak.pada,
    nakshatraLord: rahuNak.nakshatra.lord,
  };

  // Ketu
  const ketuZodiac = getZodiacSign(ketuSidereal);
  const ketuNak = getNakshatra(ketuSidereal);

  const ketu: PlanetPosition = {
    id: 8,
    name: 'Ketu',
    fullName: 'Ketu (South Node)',
    tropicalLongitude: ketuTropical,
    siderealLongitude: ketuSidereal,
    latitude: 0,
    distance: 0,
    speed: -0.053, // Ketu also moves backwards
    isRetrograde: true,
    sign: ketuZodiac.sign,
    localDegree: ketuZodiac.localDegree,
    nakshatra: ketuNak.nakshatra,
    nakshatraPada: ketuNak.pada,
    nakshatraLord: ketuNak.nakshatra.lord,
  };

  return { rahu, ketu };
}

// Calculate ascendant (rising sign) based on time and location
export function calculateAscendant(
  date: Date,
  latitude: number,
  longitude: number
): { sign: typeof ZODIAC_SIGNS[0]; degree: number; absoluteDegree: number; nakshatra: typeof NAKSHATRAS[0]; pada: number } {
  console.log('🔍 ASCENDANT DEBUG:');
  console.log('  Input date:', date.toISOString());
  console.log('  UTC time:', date.toUTCString());
  console.log('  Latitude:', latitude, 'Longitude:', longitude);

  const ayanamsa = getLahiriAyanamsa(date);
  console.log('  Ayanamsa:', ayanamsa.toFixed(4), '°');

  // Get GMST and calculate LST
  const gmst = Astronomy.SiderealTime(date);
  const lst = gmst + longitude / 15.0;
  const lstDegrees = (lst * 15.0) % 360;

  console.log('  GMST:', gmst.toFixed(4), 'hours');
  console.log('  LST:', lst.toFixed(4), 'hours =', lstDegrees.toFixed(4), '°');

  // Calculate ascendant using the corrected formula
  // Reference: Multiple verified astrology software implementations
  const obliquity = 23.4397;
  const latRad = latitude * Math.PI / 180;
  const oblRad = obliquity * Math.PI / 180;
  const lstRad = lstDegrees * Math.PI / 180;

  // This formula works for all latitudes
  // tan(Asc) = cos(LST) / (-sin(LST) * cos(obliquity) - tan(latitude) * sin(obliquity))
  let ascendantTropical = Math.atan2(
    Math.cos(lstRad),
    -(Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad))
  ) * 180 / Math.PI;

  // Normalize
  while (ascendantTropical < 0) ascendantTropical += 360;
  while (ascendantTropical >= 360) ascendantTropical -= 360;

  // Convert to sidereal
  const ascendantSidereal = tropicalToSidereal(ascendantTropical, ayanamsa);

  console.log('  Tropical Asc:', ascendantTropical.toFixed(4), '°');
  console.log('  Sidereal Asc:', ascendantSidereal.toFixed(4), '°');

  const zodiac = getZodiacSign(ascendantSidereal);
  console.log('  ✅ ASCENDANT:', zodiac.sign.name, '(' + zodiac.sign.id + ')', zodiac.localDegree.toFixed(2) + '° in sign,', ascendantSidereal.toFixed(2) + '° absolute');

  const nak = getNakshatra(ascendantSidereal);

  return {
    sign: zodiac.sign,
    degree: zodiac.localDegree,
    absoluteDegree: ascendantSidereal,
    nakshatra: nak.nakshatra,
    pada: nak.pada,
  };
}

// Get all planetary positions including nodes
export function getAllPlanetaryPositions(date: Date) {
  const planets = calculatePlanetaryPositions(date);
  const { rahu, ketu } = calculateLunarNodes(date);

  return [...planets, rahu, ketu];
}

// Calculate Navamsa (D9) position from Rasi (D1) position
export function calculateNavamsaPosition(rasi: number): {
  navamsaSign: typeof ZODIAC_SIGNS[0];
  navamsaDegree: number;
} {
  // Navamsa (D9) calculation
  // Each sign is divided into 9 parts of 3°20' each
  // Formula: Navamsa = ((sign_number - 1) * 9 + pada) mod 12
  
  const signNumber = Math.floor(rasi / 30); // 0-11
  const degreeInSign = rasi % 30;
  const pada = Math.floor(degreeInSign / (30 / 9)); // 0-8
  
  // Calculate navamsa sign number
  let navamsaSignNumber = (signNumber * 9 + pada) % 12;
  
  // If the rasi sign is odd (0, 2, 4, 6, 8, 10), navamsa starts from the same sign
  // If even (1, 3, 5, 7, 9, 11), navamsa starts from the 9th sign
  const isOddSign = signNumber % 2 === 0;
  if (!isOddSign) {
    navamsaSignNumber = (navamsaSignNumber + 8) % 12;
  }
  
  // Calculate degree within navamsa sign
  const degreeWithinPada = degreeInSign % (30 / 9);
  const navamsaDegree = degreeWithinPada * 9; // Scale up to full sign (30°)
  
  return {
    navamsaSign: ZODIAC_SIGNS[navamsaSignNumber],
    navamsaDegree: navamsaSignNumber * 30 + navamsaDegree,
  };
}

// Check if planet is Vargottama (same sign in D1 and D9)
export function isVargottama(rasiLongitude: number): boolean {
  const rasiSign = Math.floor(rasiLongitude / 30);
  const navamsa = calculateNavamsaPosition(rasiLongitude);
  const navamsaSign = navamsa.navamsaSign.id - 1; // Convert to 0-based
  
  return rasiSign === navamsaSign;
}

// Combustion distances (degrees from Sun)
const COMBUSTION_DISTANCES: Record<string, number> = {
  'Moon': 12,
  'Mars': 17,
  'Mercury': 14,
  'Jupiter': 11,
  'Venus': 10,
  'Saturn': 15,
};

// Check if planet is combust (too close to Sun)
export function isCombust(planetName: string, planetLongitude: number, sunLongitude: number): boolean {
  // Sun cannot be combust, and Rahu/Ketu are not affected by combustion
  if (planetName === 'Sun' || planetName === 'Rahu' || planetName === 'Ketu') {
    return false;
  }

  const combustionDegree = COMBUSTION_DISTANCES[planetName];
  if (!combustionDegree) return false;

  // Calculate angular distance between planet and Sun
  let distance = Math.abs(planetLongitude - sunLongitude);

  // Handle wraparound (shortest distance)
  if (distance > 180) {
    distance = 360 - distance;
  }

  return distance <= combustionDegree;
}

// Enhanced planet position with Navamsa and Vargottama
export interface EnhancedPlanetPosition extends PlanetPosition {
  navamsaSign: typeof ZODIAC_SIGNS[0];
  navamsaDegree: number;
  isVargottama: boolean;
  isCombust: boolean;
  nakshatraDetails: {
    name: string;
    lord: string;
    deity: string;
    pada: number;
    description?: string;
  };
}

// Get enhanced planetary positions with D9 and Vargottama
export function getEnhancedPlanetaryPositions(date: Date): EnhancedPlanetPosition[] {
  const planets = getAllPlanetaryPositions(date);

  // Find Sun's position for combustion calculation
  const sun = planets.find(p => p.name === 'Sun');
  const sunLongitude = sun?.siderealLongitude || 0;

  return planets.map(planet => {
    const navamsa = calculateNavamsaPosition(planet.siderealLongitude);
    const vargottama = isVargottama(planet.siderealLongitude);
    const combust = isCombust(planet.name, planet.siderealLongitude, sunLongitude);

    return {
      ...planet,
      navamsaSign: navamsa.navamsaSign,
      navamsaDegree: navamsa.navamsaDegree,
      isVargottama: vargottama,
      isCombust: combust,
      nakshatraDetails: {
        name: planet.nakshatra.name,
        lord: planet.nakshatra.lord,
        deity: planet.nakshatra.deity,
        pada: planet.nakshatraPada,
        description: getNakshatraDescription(planet.nakshatra.name),
      },
    };
  });
}

// Get detailed nakshatra description
function getNakshatraDescription(nakshatraName: string): string {
  const descriptions: Record<string, string> = {
    'Ashwini': 'Swift, healing energy. Associated with vitality and spontaneous action.',
    'Bharani': 'Creative transformation. Rules over birth, death, and nurturing.',
    'Krittika': 'Sharp intellect and cutting through illusion. Purification and clarity.',
    'Rohini': 'Growth, beauty, and material abundance. Creative and nurturing.',
    'Mrigashira': 'Seeking and searching. Curious, gentle, and explorative nature.',
    'Ardra': 'Storm and transformation. Brings change through destruction and renewal.',
    'Punarvasu': 'Return to light. Renewal, restoration, and spiritual wisdom.',
    'Pushya': 'Nourishment and growth. Most auspicious for new beginnings.',
    'Ashlesha': 'Mystical and secretive. Deep wisdom and serpent energy.',
    'Magha': 'Royal authority and ancestral power. Leadership and legacy.',
    'Purva Phalguni': 'Enjoyment and creativity. Love, beauty, and artistic expression.',
    'Uttara Phalguni': 'Service and partnership. Generous and helpful nature.',
    'Hasta': 'Skillful hands. Dexterity, craftsmanship, and manifesting ability.',
    'Chitra': 'Beauty and design. Creative visualization and artistic brilliance.',
    'Swati': 'Independence and flexibility. Freedom-loving and diplomatic.',
    'Vishakha': 'Goal-oriented and determined. Focused ambition and achievement.',
    'Anuradha': 'Friendship and devotion. Loyal, organized, and spiritual.',
    'Jyeshtha': 'Chief star. Seniority, protection, and powerful energy.',
    'Mula': 'Root and foundation. Deep investigation and transformation.',
    'Purva Ashadha': 'Invincible energy. Optimism and purification.',
    'Uttara Ashadha': 'Final victory. Permanent success and righteous leadership.',
    'Shravana': 'Listening and learning. Knowledge, wisdom, and communication.',
    'Dhanishta': 'Wealth and prosperity. Musical and rhythmic nature.',
    'Shatabhisha': 'Hundred healers. Healing power and mystical knowledge.',
    'Purva Bhadrapada': 'Spiritual fire. Transformation through intensity.',
    'Uttara Bhadrapada': 'Deep wisdom. Compassion and spiritual depth.',
    'Revati': 'Wealth and journey completion. Nourishment and protection.',
  };
  
  return descriptions[nakshatraName] || 'Ancient lunar mansion with unique qualities.';
}
