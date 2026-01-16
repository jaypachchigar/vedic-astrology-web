/**
 * Debug the ascendant calculation formula
 * Compare different formulas to find the correct one
 */

// Birth data: April 12, 1996, 00:15 IST, Kolkata
// UTC time: April 11, 1996, 18:45:00 UTC
const latitude = 22.5726;  // Kolkata
const longitude = 88.3639;

// Calculate for UTC time 1996-04-11 18:45:00
const date = new Date('1996-04-11T18:45:00Z');

// Julian Day
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

// Approximate GMST
function approximateGMST(date) {
  const jd = getJulianDay(date);
  const t = (jd - 2451545.0) / 36525.0;

  let gmst0 = 6.697374558 + 2400.051336 * t + 0.000025862 * t * t;
  const ut = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  gmst0 += ut * 1.002737909;

  while (gmst0 < 0) gmst0 += 24;
  while (gmst0 >= 24) gmst0 -= 24;

  return gmst0;
}

const jd = getJulianDay(date);
const t = (jd - 2451545.0) / 36525.0;
const ayanamsa = 23.8531 + (0.01396894 * t * 36525.0 / 365.25) + (0.0001266 * t * t);

const gmst = approximateGMST(date);
const lst = gmst + longitude / 15.0;
const lstDegrees = (lst * 15.0) % 360;

console.log('='.repeat(70));
console.log('ASCENDANT CALCULATION DEBUG');
console.log('='.repeat(70));
console.log('Date:', date.toISOString());
console.log('Location:', latitude, 'N,', longitude, 'E');
console.log('');
console.log('Ayanamsa:', ayanamsa.toFixed(4), '°');
console.log('GMST:', gmst.toFixed(4), 'hours');
console.log('LST:', lst.toFixed(4), 'hours =', lstDegrees.toFixed(4), '°');
console.log('');

const obliquity = 23.4397;
const latRad = latitude * Math.PI / 180;
const oblRad = obliquity * Math.PI / 180;
const lstRad = lstDegrees * Math.PI / 180;

console.log('Testing Different Formulas:');
console.log('-'.repeat(70));

// Formula 1: Current formula (what we have now)
const y1 = Math.cos(lstRad);
const x1 = Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);
let asc1 = Math.atan2(y1, x1) * 180 / Math.PI;
while (asc1 < 0) asc1 += 360;
const asc1_sidereal = asc1 - ayanamsa;
const asc1_final = asc1_sidereal < 0 ? asc1_sidereal + 360 : asc1_sidereal;

console.log('Formula 1 (Current):');
console.log('  atan2(cos(LST), sin(LST)*cos(ε) + tan(φ)*sin(ε))');
console.log('  Tropical:', asc1.toFixed(4), '°');
console.log('  Sidereal:', asc1_final.toFixed(4), '°');
console.log('  Sign:', getSign(asc1_final));

// Formula 2: Alternative formula from Duffett-Smith
const y2 = Math.sin(lstRad);
const x2 = Math.cos(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);
let asc2 = Math.atan2(y2, x2) * 180 / Math.PI;
while (asc2 < 0) asc2 += 360;
const asc2_sidereal = asc2 - ayanamsa;
const asc2_final = asc2_sidereal < 0 ? asc2_sidereal + 360 : asc2_sidereal;

console.log('');
console.log('Formula 2 (Duffett-Smith):');
console.log('  atan2(sin(LST), cos(LST)*cos(ε) + tan(φ)*sin(ε))');
console.log('  Tropical:', asc2.toFixed(4), '°');
console.log('  Sidereal:', asc2_final.toFixed(4), '°');
console.log('  Sign:', getSign(asc2_final));

// Formula 3: Yet another variation
const y3 = Math.sin(lstRad);
const x3 = Math.cos(lstRad) * Math.cos(oblRad) - Math.tan(latRad) * Math.sin(oblRad);
let asc3 = Math.atan2(y3, x3) * 180 / Math.PI;
while (asc3 < 0) asc3 += 360;
const asc3_sidereal = asc3 - ayanamsa;
const asc3_final = asc3_sidereal < 0 ? asc3_sidereal + 360 : asc3_sidereal;

console.log('');
console.log('Formula 3 (Alternative sign):');
console.log('  atan2(sin(LST), cos(LST)*cos(ε) - tan(φ)*sin(ε))');
console.log('  Tropical:', asc3.toFixed(4), '°');
console.log('  Sidereal:', asc3_final.toFixed(4), '°');
console.log('  Sign:', getSign(asc3_final));

console.log('');
console.log('='.repeat(70));
console.log('EXPECTED RESULT:');
console.log('  Aquarius 3° (which is ~303° in the zodiac)');
console.log('  (10 signs × 30° + 3° = 303°)');
console.log('');
console.log('ACTUAL FROM APP:');
console.log('  Capricorn 15° (which is ~285° in the zodiac)');
console.log('  (9 signs × 30° + 15° = 285°)');
console.log('');
console.log('Which formula gives ~303°?');

function getSign(degree) {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const signIndex = Math.floor(degree / 30);
  const degreeInSign = degree % 30;
  return `${signs[signIndex]} ${degreeInSign.toFixed(2)}°`;
}
