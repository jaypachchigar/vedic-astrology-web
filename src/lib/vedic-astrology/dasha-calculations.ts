/**
 * Dasha Calculations for Vedic Astrology
 * Vimshottari Dasha: 120-year planetary period system
 */

// Vimshottari Dasha periods (in years)
const VIMSHOTTARI_PERIODS = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

// Sequence of dashas
const DASHA_SEQUENCE = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

// Nakshatra lords for determining starting dasha
const NAKSHATRA_LORDS = [
  'Ketu',    // Ashwini (1)
  'Venus',   // Bharani (2)
  'Sun',     // Krittika (3)
  'Moon',    // Rohini (4)
  'Mars',    // Mrigashira (5)
  'Rahu',    // Ardra (6)
  'Jupiter', // Punarvasu (7)
  'Saturn',  // Pushya (8)
  'Mercury', // Ashlesha (9)
  'Ketu',    // Magha (10)
  'Venus',   // Purva Phalguni (11)
  'Sun',     // Uttara Phalguni (12)
  'Moon',    // Hasta (13)
  'Mars',    // Chitra (14)
  'Rahu',    // Swati (15)
  'Jupiter', // Vishakha (16)
  'Saturn',  // Anuradha (17)
  'Mercury', // Jyeshtha (18)
  'Ketu',    // Mula (19)
  'Venus',   // Purva Ashadha (20)
  'Sun',     // Uttara Ashadha (21)
  'Moon',    // Shravana (22)
  'Mars',    // Dhanishta (23)
  'Rahu',    // Shatabhisha (24)
  'Jupiter', // Purva Bhadrapada (25)
  'Saturn',  // Uttara Bhadrapada (26)
  'Mercury', // Revati (27)
];

export interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  years: number;
}

export interface VimshottariDasha {
  birthMoonNakshatra: number; // 1-27
  birthMoonNakshatraLord: string;
  birthMoonDegreeInNakshatra: number; // 0-13.33
  balanceAtBirth: number; // Years of first dasha remaining at birth
  mahaDasha: DashaPeriod;
  antarDasha: DashaPeriod;
  pratyantarDasha: DashaPeriod;
  allMahaDashas: DashaPeriod[];
}

// Helper function to add years to date accurately
function addYearsToDate(date: Date, years: number): Date {
  const result = new Date(date);
  const fullYears = Math.floor(years);
  const remainingDays = (years - fullYears) * 365.25;

  result.setFullYear(result.getFullYear() + fullYears);
  result.setDate(result.getDate() + Math.round(remainingDays));

  return result;
}

// Get nakshatra from moon's longitude
function getMoonNakshatra(moonLongitude: number): { nakshatra: number; degreeInNakshatra: number; lord: string } {
  const nakshatraSize = 360 / 27; // 13.333... degrees each
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraSize);
  const degreeInNakshatra = moonLongitude % nakshatraSize;

  return {
    nakshatra: nakshatraIndex + 1,
    degreeInNakshatra,
    lord: NAKSHATRA_LORDS[nakshatraIndex],
  };
}

// Calculate balance of dasha at birth
function calculateBalanceAtBirth(degreeInNakshatra: number, totalPeriod: number): number {
  const nakshatraSize = 360 / 27;
  const fraction = degreeInNakshatra / nakshatraSize;
  const elapsed = fraction * totalPeriod;
  return totalPeriod - elapsed;
}

// Get dasha sequence starting from a specific planet
function getDashaSequenceFrom(startingPlanet: string): string[] {
  const startIndex = DASHA_SEQUENCE.indexOf(startingPlanet);
  const sequence: string[] = [];

  for (let i = 0; i < DASHA_SEQUENCE.length; i++) {
    const index = (startIndex + i) % DASHA_SEQUENCE.length;
    sequence.push(DASHA_SEQUENCE[index]);
  }

  return sequence;
}

// Calculate Vimshottari Dasha
export function calculateVimshottariDasha(
  birthDate: Date,
  moonLongitude: number,
  currentDate: Date = new Date()
): VimshottariDasha {
  const { nakshatra, degreeInNakshatra, lord } = getMoonNakshatra(moonLongitude);

  // Calculate balance of first dasha at birth
  const firstDashaPeriod = VIMSHOTTARI_PERIODS[lord as keyof typeof VIMSHOTTARI_PERIODS];
  const balance = calculateBalanceAtBirth(degreeInNakshatra, firstDashaPeriod);

  // Get dasha sequence starting from birth nakshatra lord
  const sequence = getDashaSequenceFrom(lord);

  // Calculate all maha dasha periods
  const allMahaDashas: DashaPeriod[] = [];
  let currentStartDate = new Date(birthDate);

  // First dasha (balance period)
  const firstDashaEnd = addYearsToDate(currentStartDate, balance);

  allMahaDashas.push({
    planet: sequence[0],
    startDate: new Date(currentStartDate),
    endDate: new Date(firstDashaEnd),
    years: balance,
  });

  currentStartDate = firstDashaEnd;

  // Remaining dashas (full periods)
  for (let i = 1; i < sequence.length; i++) {
    const planet = sequence[i];
    const period = VIMSHOTTARI_PERIODS[planet as keyof typeof VIMSHOTTARI_PERIODS];
    const endDate = addYearsToDate(currentStartDate, period);

    allMahaDashas.push({
      planet,
      startDate: new Date(currentStartDate),
      endDate: new Date(endDate),
      years: period,
    });

    currentStartDate = endDate;
  }

  // Find current maha dasha
  let currentMahaDasha = allMahaDashas[0];
  for (const dasha of allMahaDashas) {
    if (currentDate >= dasha.startDate && currentDate < dasha.endDate) {
      currentMahaDasha = dasha;
      break;
    }
  }

  // Calculate antar dasha (sub-period within maha dasha)
  const antarSequence = getDashaSequenceFrom(currentMahaDasha.planet);
  const mahaDashaYears = currentMahaDasha.years;
  const mahaDashaStart = currentMahaDasha.startDate;

  let antarStartDate = new Date(mahaDashaStart);
  let currentAntarDasha: DashaPeriod = {
    planet: antarSequence[0],
    startDate: new Date(antarStartDate),
    endDate: new Date(antarStartDate),
    years: 0,
  };

  for (const antarPlanet of antarSequence) {
    const antarPeriod = VIMSHOTTARI_PERIODS[antarPlanet as keyof typeof VIMSHOTTARI_PERIODS];
    // Antar dasha is proportional: (Maha years * Antar years) / 120
    const antarYears = (mahaDashaYears * antarPeriod) / 120;
    const antarEndDate = addYearsToDate(antarStartDate, antarYears);

    if (currentDate >= antarStartDate && currentDate < antarEndDate) {
      currentAntarDasha = {
        planet: antarPlanet,
        startDate: new Date(antarStartDate),
        endDate: new Date(antarEndDate),
        years: antarYears,
      };
      break;
    }

    antarStartDate = antarEndDate;
  }

  // Calculate pratyantar dasha (sub-sub-period within antar dasha)
  const pratyantarSequence = getDashaSequenceFrom(currentAntarDasha.planet);
  const antarDashaYears = currentAntarDasha.years;
  const antarDashaStart = currentAntarDasha.startDate;

  let pratyantarStartDate = new Date(antarDashaStart);
  let currentPratyantarDasha: DashaPeriod = {
    planet: pratyantarSequence[0],
    startDate: new Date(pratyantarStartDate),
    endDate: new Date(pratyantarStartDate),
    years: 0,
  };

  for (const pratyantarPlanet of pratyantarSequence) {
    const pratyantarPeriod = VIMSHOTTARI_PERIODS[pratyantarPlanet as keyof typeof VIMSHOTTARI_PERIODS];
    // Pratyantar dasha: (Antar years * Pratyantar years) / 120
    const pratyantarYears = (antarDashaYears * pratyantarPeriod) / 120;
    const pratyantarEndDate = addYearsToDate(pratyantarStartDate, pratyantarYears);

    if (currentDate >= pratyantarStartDate && currentDate < pratyantarEndDate) {
      currentPratyantarDasha = {
        planet: pratyantarPlanet,
        startDate: new Date(pratyantarStartDate),
        endDate: new Date(pratyantarEndDate),
        years: pratyantarYears,
      };
      break;
    }

    pratyantarStartDate = pratyantarEndDate;
  }

  return {
    birthMoonNakshatra: nakshatra,
    birthMoonNakshatraLord: lord,
    birthMoonDegreeInNakshatra: degreeInNakshatra,
    balanceAtBirth: balance,
    mahaDasha: currentMahaDasha,
    antarDasha: currentAntarDasha,
    pratyantarDasha: currentPratyantarDasha,
    allMahaDashas,
  };
}

// Format date for display
export function formatDashaDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
