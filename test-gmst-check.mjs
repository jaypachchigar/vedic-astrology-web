/**
 * Check GMST from astronomy-engine vs manual calculation
 */

import * as Astronomy from 'astronomy-engine';

const date = new Date('1996-04-11T18:45:00Z');
const latitude = 22.5726;
const longitude = 88.3639;

console.log('Date:', date.toISOString());
console.log('Kolkata:', latitude, 'N,', longitude, 'E');
console.log('');

// Get GMST from astronomy-engine
const gmstFromLib = Astronomy.SiderealTime(date);
console.log('GMST from astronomy-engine:', gmstFromLib.toFixed(6), 'hours');

// Calculate LST
const lst = gmstFromLib + longitude / 15.0;
console.log('LST:', lst.toFixed(6), 'hours');
console.log('LST:', (lst * 15).toFixed(6), '°');
console.log('');

// Try using astronomy-engine's equatorial to horizon conversion
// Maybe we should use their built-in coordinate transformations

console.log('Let me check if astronomy-engine has ascendant calculation...');
console.log('(It likely doesn\'t, but worth checking)');
console.log('');

// Alternative: Calculate using the formula from Swiss Ephemeris documentation
// The correct formula for ascendant is:
// 1. Get LST in degrees
// 2. Convert to ecliptic longitude of the eastern point

const obliquity = 23.4397;
const lstDeg = lst * 15;

// Try the formula: Asc = atan(cos(LST) / (-sin(LST) * cos(ε)))
// This is for latitude = 0
// For other latitudes, need adjustment

console.log('Testing simplified formula (for debugging):');
const tanAsc = Math.cos(lstDeg * Math.PI / 180) / (-Math.sin(lstDeg * Math.PI / 180) * Math.cos(obliquity * Math.PI / 180));
let asc = Math.atan(tanAsc) * 180 / Math.PI;
if (asc < 0) asc += 180;
if (lstDeg > 180) asc += 180;
console.log('Asc (simplified):', asc.toFixed(4), '°');

// The issue is that the standard formulas assume certain conventions
// Let me try the COMPLETE formula from Meeus Chapter 14

// RAMC (Right Ascension of MC) = LST
const RAMC = lstDeg;
const latRad = latitude * Math.PI / 180;
const oblRad = obliquity * Math.PI / 180;

// Calculate MC (Medium Coeli) first
const MC = RAMC;

// Then calculate Ascendant using the relationship:
// tan(Asc) = (cos(LST) - sin(MC) * tan(ε) * sin(φ)) / (cos(MC) * cos(φ))

// Actually, let's use a known working formula
// From "Astronomy on the Personal Computer" by Montenbruck & Pfleger

const sin_epsilon = Math.sin(oblRad);
const cos_epsilon = Math.cos(oblRad);
const tan_latitude = Math.tan(latRad);

// Method 1: Standard formula
const numerator = Math.cos(lstDeg * Math.PI / 180);
const denominator = -(sin_epsilon * tan_latitude + cos_epsilon * Math.sin(lstDeg * Math.PI / 180));

let asc2 = Math.atan2(numerator, denominator) * 180 / Math.PI;
while (asc2 < 0) asc2 += 360;

console.log('');
console.log('Formula from Montenbruck:');
console.log('  Tropical:', asc2.toFixed(4), '°');
console.log('  Sidereal:', (asc2 - 23.8011).toFixed(4), '°');

// Let me try one more formula that's commonly used
const x = Math.sin(lstDeg * Math.PI / 180);
const y = Math.cos(lstDeg * Math.PI / 180) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);
let asc3 = Math.atan2(x, y) * 180 / Math.PI;
while (asc3 < 0) asc3 += 360;

console.log('');
console.log('Another variation:');
console.log('  Tropical:', asc3.toFixed(4), '°');
console.log('  Sidereal:', (asc3 - 23.8011).toFixed(4), '°');

console.log('');
console.log('NEED: Aquarius 3° sidereal = ~303° = 327° tropical (303 + 24)');
