/**
 * Direct test of the corrected calculations
 * Tests ascendant calculation with the fixed formula
 */

// Simulate the corrected Lahiri ayanamsa calculation
function getLahiriAyanamsa(date) {
  const jd = getJulianDay(date);
  const t = (jd - 2451545.0) / 36525.0;
  const ayanamsa = 23.8531 + (0.01396894 * t * 36525.0 / 365.25) + (0.0001266 * t * t);
  return ayanamsa;
}

function getJulianDay(date) {
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

// Simplified GMST calculation (approximation)
// In the real code, this uses astronomy-engine library
function approximateGMST(date) {
  const jd = getJulianDay(date);
  const t = (jd - 2451545.0) / 36525.0;

  // GMST at 0h UT
  let gmst0 = 6.697374558 + 2400.051336 * t + 0.000025862 * t * t;

  // Add time of day
  const ut = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  gmst0 += ut * 1.002737909;

  // Normalize to 0-24 hours
  while (gmst0 < 0) gmst0 += 24;
  while (gmst0 >= 24) gmst0 -= 24;

  return gmst0;
}

// Calculate ascendant with the CORRECTED formula
function calculateAscendant(date, latitude, longitude) {
  const ayanamsa = getLahiriAyanamsa(date);

  // Calculate LST
  const gmst = approximateGMST(date);
  const lst = gmst + longitude / 15.0;
  const lstDegrees = (lst * 15.0) % 360;

  console.log('Calculation details:');
  console.log('  Ayanamsa:', ayanamsa.toFixed(4), '°');
  console.log('  GMST:', gmst.toFixed(4), 'hours');
  console.log('  LST:', lst.toFixed(4), 'hours');
  console.log('  LST:', lstDegrees.toFixed(4), '°');

  // CORRECTED FORMULA (as per Jean Meeus)
  const latRad = latitude * Math.PI / 180;
  const obliquity = 23.4397;
  const oblRad = obliquity * Math.PI / 180;
  const lstRad = lstDegrees * Math.PI / 180;

  const y = Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);

  let ascendantTropical = Math.atan2(y, x) * 180 / Math.PI;

  while (ascendantTropical < 0) ascendantTropical += 360;
  while (ascendantTropical >= 360) ascendantTropical -= 360;

  const ascendantSidereal = ascendantTropical - ayanamsa;
  const finalAsc = ascendantSidereal < 0 ? ascendantSidereal + 360 : ascendantSidereal;

  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const signIndex = Math.floor(finalAsc / 30);
  const degreeInSign = finalAsc % 30;

  console.log('  Tropical Asc:', ascendantTropical.toFixed(4), '°');
  console.log('  Sidereal Asc:', finalAsc.toFixed(4), '°');
  console.log('  Sign:', signs[signIndex], `(${degreeInSign.toFixed(2)}°)`);

  return {
    tropical: ascendantTropical,
    sidereal: finalAsc,
    sign: signs[signIndex],
    degree: degreeInSign
  };
}

console.log('='.repeat(70));
console.log('VERIFICATION OF CORRECTED ASCENDANT CALCULATION');
console.log('='.repeat(70));
console.log('');

// Test case 1: January 1, 2000, 12:00 UTC at Equator
console.log('TEST 1: New Year 2000, Noon UTC, Equator (0°, 0°)');
console.log('-'.repeat(70));
const test1 = new Date('2000-01-01T12:00:00Z');
calculateAscendant(test1, 0, 0);
console.log('');

// Test case 2: Common birth chart example
console.log('TEST 2: Jan 15, 1990, 19:30 UTC, New York (40.71°N, 74.01°W)');
console.log('-'.repeat(70));
const test2 = new Date('1990-01-15T19:30:00Z');
calculateAscendant(test2, 40.7128, -74.0060);
console.log('');

// Test case 3: India
console.log('TEST 3: Jan 15, 1990, 09:00 UTC, Mumbai (19.08°N, 72.88°E)');
console.log('-'.repeat(70));
const test3 = new Date('1990-01-15T09:00:00Z');
calculateAscendant(test3, 19.0760, 72.8777);
console.log('');

console.log('='.repeat(70));
console.log('FIXES APPLIED:');
console.log('='.repeat(70));
console.log('1. ✅ Fixed Lahiri ayanamsa value (23.8531° at J2000 instead of 23.8626°)');
console.log('2. ✅ Fixed ascendant formula signs (was using wrong formula)');
console.log('   OLD: atan2(sin(LST), cos(LST)*cos(ε) - tan(φ)*sin(ε))');
console.log('   NEW: atan2(cos(LST), sin(LST)*cos(ε) + tan(φ)*sin(ε))');
console.log('');
console.log('NEXT STEP:');
console.log('- Test with the actual application once Node.js 18+ is available');
console.log('- Compare results with professional Vedic astrology software');
console.log('- Verify all planets, houses, and chart structure');
console.log('');
