// Test Dasha Calculation
// Run with: node test-dasha-calculation.js

// Vimshottari Dasha periods
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

// Nakshatra lords
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

function getMoonNakshatra(moonLongitude) {
  const nakshatraSize = 360 / 27; // 13.333... degrees each
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraSize);
  const degreeInNakshatra = moonLongitude % nakshatraSize;

  return {
    nakshatra: nakshatraIndex + 1,
    degreeInNakshatra,
    lord: NAKSHATRA_LORDS[nakshatraIndex],
  };
}

function calculateBalanceAtBirth(degreeInNakshatra, totalPeriod) {
  const nakshatraSize = 360 / 27;
  const fraction = degreeInNakshatra / nakshatraSize;
  const elapsed = fraction * totalPeriod;
  return totalPeriod - elapsed;
}

function addYearsToDate(date, years) {
  const result = new Date(date);
  const fullYears = Math.floor(years);
  const remainingDays = (years - fullYears) * 365.25;

  result.setFullYear(result.getFullYear() + fullYears);
  result.setDate(result.getDate() + Math.round(remainingDays));

  return result;
}

// Test case - provide your birth details here
console.log("=== VIMSHOTTARI DASHA CALCULATION TEST ===\n");

// EXAMPLE: Birth Date: April 12, 1996, Moon at 24.48° (Taurus/Rohini Nakshatra)
const birthDate = new Date('1996-04-12T00:15:00Z');
const moonLongitude = 24.48; // Your actual moon longitude from birth chart

console.log(`Birth Date: ${birthDate.toISOString()}`);
console.log(`Moon Longitude: ${moonLongitude}°\n`);

const { nakshatra, degreeInNakshatra, lord } = getMoonNakshatra(moonLongitude);
console.log(`Birth Nakshatra: ${NAKSHATRA_LORDS[nakshatra - 1]} (#${nakshatra})`);
console.log(`Degree in Nakshatra: ${degreeInNakshatra.toFixed(2)}°`);
console.log(`Nakshatra Lord at Birth: ${lord}\n`);

const firstDashaPeriod = VIMSHOTTARI_PERIODS[lord];
const balance = calculateBalanceAtBirth(degreeInNakshatra, firstDashaPeriod);
console.log(`First Dasha: ${lord}`);
console.log(`Total Period: ${firstDashaPeriod} years`);
console.log(`Balance at Birth: ${balance.toFixed(3)} years\n`);

// Calculate sequence starting from birth lord
const DASHA_SEQUENCE = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const startIndex = DASHA_SEQUENCE.indexOf(lord);
const sequence = [];
for (let i = 0; i < DASHA_SEQUENCE.length; i++) {
  const index = (startIndex + i) % DASHA_SEQUENCE.length;
  sequence.push(DASHA_SEQUENCE[index]);
}

console.log("=== COMPLETE MAHA DASHA SEQUENCE ===\n");

let currentStartDate = new Date(birthDate);

// First dasha (balance period)
const firstDashaEnd = addYearsToDate(currentStartDate, balance);
console.log(`1. ${sequence[0]} Dasha (Balance)`);
console.log(`   ${currentStartDate.toLocaleDateString()} to ${firstDashaEnd.toLocaleDateString()}`);
console.log(`   Duration: ${balance.toFixed(2)} years\n`);

currentStartDate = firstDashaEnd;

// Remaining dashas
for (let i = 1; i < sequence.length; i++) {
  const planet = sequence[i];
  const period = VIMSHOTTARI_PERIODS[planet];
  const endDate = addYearsToDate(currentStartDate, period);

  console.log(`${i + 1}. ${planet} Dasha (Full Period)`);
  console.log(`   ${currentStartDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
  console.log(`   Duration: ${period} years\n`);

  currentStartDate = endDate;
}

console.log("=== CURRENT DASHA (as of today) ===\n");
const today = new Date();
console.log(`Today: ${today.toLocaleDateString()}\n`);

// Recalculate to find current
currentStartDate = new Date(birthDate);
const firstEnd = addYearsToDate(currentStartDate, balance);

if (today >= currentStartDate && today < firstEnd) {
  console.log(`Current Maha Dasha: ${sequence[0]}`);
  console.log(`Period: ${currentStartDate.toLocaleDateString()} to ${firstEnd.toLocaleDateString()}`);
}

currentStartDate = firstEnd;
for (let i = 1; i < sequence.length; i++) {
  const planet = sequence[i];
  const period = VIMSHOTTARI_PERIODS[planet];
  const endDate = addYearsToDate(currentStartDate, period);

  if (today >= currentStartDate && today < endDate) {
    console.log(`Current Maha Dasha: ${planet}`);
    console.log(`Period: ${currentStartDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
    break;
  }

  currentStartDate = endDate;
}
