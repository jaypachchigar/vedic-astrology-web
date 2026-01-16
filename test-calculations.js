/**
 * Test script for Vedic Astrology calculations
 * Run with: node test-calculations.js
 */

const { getCompleteBirthChart } = require('./src/lib/vedic-astrology/index.ts');

// Test birth data - Example: January 15, 1990, 14:30 UTC, New York City
const testData = {
  datetime: '1990-01-15T14:30:00',
  latitude: 40.7128,  // New York City
  longitude: -74.0060,
};

console.log('🔮 Testing Vedic Astrology Calculations\n');
console.log('Birth Data:');
console.log(`  Date/Time: ${testData.datetime}`);
console.log(`  Location: ${testData.latitude}°N, ${testData.longitude}°W`);
console.log('\n' + '='.repeat(60) + '\n');

async function runTest() {
  try {
    const chart = await getCompleteBirthChart(testData);

    console.log('✅ Calculation Complete!\n');

    // Display Ascendant
    console.log('📍 ASCENDANT (Lagna):');
    console.log(`  Sign: ${chart.kundli.ascendant.sign.name} (${chart.kundli.ascendant.sign.sanskrit})`);
    console.log(`  Degree: ${chart.kundli.ascendant.degree.toFixed(2)}°`);
    console.log(`  Nakshatra: ${chart.kundli.ascendant.nakshatra.name} (Pada ${chart.kundli.ascendant.pada})`);
    console.log(`  Lord: ${chart.kundli.ascendant.sign.lord}`);
    console.log('');

    // Display planetary positions
    console.log('🪐 PLANETARY POSITIONS:\n');
    chart.planetPositions.planets.forEach(planet => {
      console.log(`  ${planet.name} (${planet.full_name}):`);
      console.log(`    Sign: ${planet.sign.name} at ${planet.local_degree.toFixed(2)}°`);
      console.log(`    House: ${planet.house}`);
      console.log(`    Nakshatra: ${planet.nakshatra.name} (Pada ${planet.nakshatra.pada})`);
      console.log(`    Retrograde: ${planet.is_retrograde ? 'Yes ♎' : 'No'}`);
      console.log('');
    });

    // Display current dasha
    console.log('⏰ VIMSHOTTARI DASHA:\n');
    console.log(`  Maha Dasha: ${chart.advancedKundli.vimshottari_dasha.maha_dasha.planet}`);
    console.log(`    Period: ${chart.advancedKundli.vimshottari_dasha.maha_dasha.start} to ${chart.advancedKundli.vimshottari_dasha.maha_dasha.end}`);
    console.log('');
    console.log(`  Antar Dasha: ${chart.advancedKundli.vimshottari_dasha.antar_dasha.planet}`);
    console.log(`    Period: ${chart.advancedKundli.vimshottari_dasha.antar_dasha.start} to ${chart.advancedKundli.vimshottari_dasha.antar_dasha.end}`);
    console.log('');

    // Display doshas
    console.log('🔱 DOSHAS:\n');
    const doshas = chart.advancedKundli.doshas;
    console.log(`  Mangal Dosha: ${doshas.mangal_dosha.has_dosha ? 'Present ⚠️' : 'Not present ✅'}`);
    if (doshas.mangal_dosha.has_dosha) {
      console.log(`    ${doshas.mangal_dosha.description}`);
    }
    console.log('');
    console.log(`  Kalsarp Dosha: ${doshas.kalsarp_dosha.has_dosha ? 'Present ⚠️' : 'Not present ✅'}`);
    if (doshas.kalsarp_dosha.has_dosha) {
      console.log(`    ${doshas.kalsarp_dosha.description}`);
    }
    console.log('');
    console.log(`  Sade Sati: ${doshas.sade_sati.is_active ? 'Active ⚠️' : 'Not active ✅'}`);
    console.log(`    ${doshas.sade_sati.description}`);
    console.log('');

    console.log('='.repeat(60));
    console.log('✨ Test completed successfully!');

  } catch (error) {
    console.error('❌ Error during calculation:');
    console.error(error);
  }
}

runTest();
