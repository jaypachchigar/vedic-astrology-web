/**
 * Test calculation for Jay's birth chart
 * Birth: April 12, 1996, 00:15 AM IST, Kolkata
 */

import { DateTime } from 'luxon';

// Birth data
const birthData = {
  dateOfBirth: '1996-04-12',
  timeOfBirth: '00:15:00',
  timezone: 'Asia/Kolkata',
  latitude: 22.5726,  // Kolkata
  longitude: 88.3639
};

console.log('='.repeat(70));
console.log('TESTING JAY\'S BIRTH CHART');
console.log('='.repeat(70));
console.log('Birth Data:');
console.log('  Date:', birthData.dateOfBirth);
console.log('  Time:', birthData.timeOfBirth, '(IST)');
console.log('  Location: Kolkata');
console.log('  Coordinates:', birthData.latitude, 'N,', birthData.longitude, 'E');
console.log('');

// Convert to UTC
const localDateTime = `${birthData.dateOfBirth}T${birthData.timeOfBirth}`;
const localTime = DateTime.fromISO(localDateTime, { zone: birthData.timezone });
const utcTime = localTime.toUTC();

console.log('Time Conversion:');
console.log('  Local:', localTime.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'));
console.log('  UTC:', utcTime.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'));
console.log('  Offset:', localTime.offset / 60, 'hours');
console.log('');

// Calculate Julian Day
const date = new Date(utcTime.toISO());
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

console.log('Julian Day:', jd.toFixed(6));

// Calculate Ayanamsa
const t = (jd - 2451545.0) / 36525.0;
const ayanamsa = 23.8531 + (0.01396894 * t * 36525.0 / 365.25) + (0.0001266 * t * t);
console.log('Ayanamsa (Lahiri):', ayanamsa.toFixed(4), '°');
console.log('');

console.log('='.repeat(70));
console.log('WHAT TO CHECK:');
console.log('='.repeat(70));
console.log('1. Go to professional software (JHora or AstroSage)');
console.log('2. Enter these EXACT details:');
console.log('   Date: April 12, 1996');
console.log('   Time: 00:15 AM (12:15 AM)');
console.log('   Place: Kolkata, India');
console.log('3. Check what ascendant it shows');
console.log('4. Compare with what our app shows');
console.log('');
console.log('Expected for this date/time/location:');
console.log('  - Should be calculated using the UTC time:', utcTime.toISO());
console.log('  - Ayanamsa for 1996 should be ~23.72°');
console.log('');
console.log('Please share:');
console.log('  - What ascendant does professional software show?');
console.log('  - What ascendant does our app show?');
console.log('  - Check the browser console for detailed calculation logs');
console.log('');
