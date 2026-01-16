/**
 * Test the full calculation pipeline
 * This will help us identify where the issue is
 */

// Test data: Use a known chart that we can verify
// Example: Mahatma Gandhi's birth chart (well-documented)
// Born: October 2, 1869, 07:12 AM LMT, Porbandar, India
// Coordinates: 21.6417°N, 69.6293°E

// For testing, let's use a simpler test case:
// January 1, 2000, 12:00 PM UTC, at 0°N, 0°E (Prime Meridian, Equator)
// At this time and location, we can verify calculations easily

const testCases = [
  {
    name: "Test 1: Equator at Noon",
    datetime: "2000-01-01T12:00:00", // UTC
    latitude: 0,
    longitude: 0,
    expectedNotes: "At equator and prime meridian, calculations should be straightforward"
  },
  {
    name: "Test 2: New York",
    datetime: "1990-01-15T19:30:00", // UTC (14:30 EST)
    latitude: 40.7128,
    longitude: -74.0060,
    expectedNotes: "Common test case for Western longitude"
  },
  {
    name: "Test 3: Mumbai (IST)",
    datetime: "1990-01-15T09:00:00", // UTC (14:30 IST)
    latitude: 19.0760,
    longitude: 72.8777,
    expectedNotes: "Common test case for Eastern longitude"
  }
];

console.log("=".repeat(70));
console.log("VEDIC ASTROLOGY CALCULATION TEST");
console.log("=".repeat(70));
console.log("");

testCases.forEach((test, index) => {
  console.log(`\nTest Case ${index + 1}: ${test.name}`);
  console.log("-".repeat(70));
  console.log("Input:");
  console.log("  DateTime (UTC):", test.datetime);
  console.log("  Latitude:", test.latitude);
  console.log("  Longitude:", test.longitude);
  console.log("  Expected:", test.expectedNotes);

  const date = new Date(test.datetime);
  console.log("\nParsed Date:");
  console.log("  ISO:", date.toISOString());
  console.log("  UTC:", date.toUTCString());
  console.log("  UTC Hours:", date.getUTCHours());
  console.log("  UTC Minutes:", date.getUTCMinutes());

  // Calculate Julian Day
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

  console.log("\nJulian Day:", jd.toFixed(6));

  // Calculate Ayanamsa
  const t = (jd - 2451545.0) / 36525.0;
  const ayanamsa = 23.8626 + (0.013978 * t * 36525.0 / 365.25) + (0.0001266 * t * t);
  console.log("Ayanamsa (Lahiri):", ayanamsa.toFixed(4), "°");

  console.log("\nNOTE: To verify ascendant, we need:");
  console.log("  1. GMST (Greenwich Mean Sidereal Time)");
  console.log("  2. LST = GMST + longitude/15");
  console.log("  3. Ascendant from LST, latitude, and obliquity");
  console.log("  4. Convert tropical to sidereal using ayanamsa");
});

console.log("\n" + "=".repeat(70));
console.log("DIAGNOSIS POINTS:");
console.log("=".repeat(70));
console.log("1. Check if Astronomy.SiderealTime() gives correct GMST");
console.log("2. Check if LST calculation is correct");
console.log("3. Check if ascendant formula is using correct astronomical formula");
console.log("4. Check if ayanamsa is being applied correctly");
console.log("");
console.log("TO RUN ACTUAL CALCULATION:");
console.log("  - Start the dev server: npm run dev");
console.log("  - Generate a chart and check browser console for debug logs");
console.log("  - Compare calculated values with professional software");
console.log("");
