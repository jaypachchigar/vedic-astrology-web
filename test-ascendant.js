/**
 * Test script to verify ascendant calculations
 * Tests with known birth data to identify calculation issues
 */

const { DateTime } = require('luxon');

// Test case: Known birth data
const testData = {
  name: "Test Person",
  dateOfBirth: "1990-01-15",  // January 15, 1990
  timeOfBirth: "14:30",        // 2:30 PM local time
  timezone: "America/New_York", // EST/EDT
  latitude: 40.7128,           // New York City
  longitude: -74.0060,
};

console.log("====================================");
console.log("TESTING DATETIME CONVERSION");
console.log("====================================");
console.log("Input:");
console.log("  Date:", testData.dateOfBirth);
console.log("  Time:", testData.timeOfBirth);
console.log("  Timezone:", testData.timezone);
console.log("  Location:", testData.latitude, testData.longitude);
console.log("");

// Create local datetime string
const localDateTime = `${testData.dateOfBirth}T${testData.timeOfBirth}:00`;
console.log("Local DateTime String:", localDateTime);

// Parse as local time in given timezone
const localTime = DateTime.fromISO(localDateTime, { zone: testData.timezone });
console.log("Parsed Local Time:");
console.log("  ISO:", localTime.toISO());
console.log("  Readable:", localTime.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'));
console.log("  Offset:", localTime.offset / 60, "hours");
console.log("");

// Convert to UTC
const utcTime = localTime.toUTC();
console.log("Converted to UTC:");
console.log("  ISO:", utcTime.toISO());
console.log("  UTC String:", utcTime.toISO({ suppressMilliseconds: true, includeOffset: false }));
console.log("");

// Create JavaScript Date objects
const dateFromUTC = new Date(utcTime.toISO());
console.log("JavaScript Date object:");
console.log("  toString():", dateFromUTC.toString());
console.log("  toISOString():", dateFromUTC.toISOString());
console.log("  toUTCString():", dateFromUTC.toUTCString());
console.log("  getHours():", dateFromUTC.getHours(), "(local to system)");
console.log("  getUTCHours():", dateFromUTC.getUTCHours(), "(UTC)");
console.log("");

console.log("====================================");
console.log("EXPECTED RESULTS");
console.log("====================================");
console.log("For birth at 14:30 (2:30 PM) EST on Jan 15, 1990 in NYC:");
console.log("  - Local time: 1990-01-15 14:30:00 EST");
console.log("  - UTC time: 1990-01-15 19:30:00 UTC");
console.log("  - The ascendant should be calculated for 19:30 UTC");
console.log("  - But LST should be for the longitude -74.0060°W");
console.log("");

// Test another timezone
const testIndia = {
  dateOfBirth: "1990-01-15",
  timeOfBirth: "14:30",
  timezone: "Asia/Kolkata", // IST (UTC+5:30)
  latitude: 19.0760,
  longitude: 72.8777, // Mumbai
};

console.log("====================================");
console.log("TEST CASE 2: India (IST)");
console.log("====================================");
const localTimeIndia = DateTime.fromISO(`${testIndia.dateOfBirth}T${testIndia.timeOfBirth}:00`, { zone: testIndia.timezone });
const utcTimeIndia = localTimeIndia.toUTC();

console.log("Local Time:", localTimeIndia.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'));
console.log("UTC Time:", utcTimeIndia.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'));
console.log("Offset:", localTimeIndia.offset / 60, "hours");
console.log("");

console.log("====================================");
console.log("POTENTIAL ISSUES TO CHECK");
console.log("====================================");
console.log("1. Is the timezone conversion correct?");
console.log("2. Is the Date object being used correctly in calculations?");
console.log("3. Is the ascendant formula using UTC time correctly?");
console.log("4. Is LST being calculated from the correct longitude?");
