import { NextRequest, NextResponse } from 'next/server';
import { getCompleteBirthChart } from '@/lib/vedic-astrology';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing chart calculation...');

    // Test with sample birth data
    const testData = {
      datetime: "1990-01-15T14:30:00",
      latitude: 40.7128,
      longitude: -74.0060
    };

    console.log('📊 Input:', testData);

    const result = await getCompleteBirthChart(testData);

    console.log('✅ Calculation successful!');
    console.log('📈 Result sample:', {
      ascendant: result.kundli.ascendant.sign.name,
      planetCount: result.planetPositions.planets.length,
      mahaDasha: result.advancedKundli.vimshottari_dasha.maha_dasha.planet
    });

    return NextResponse.json({
      success: true,
      message: 'Chart calculation working!',
      data: result
    });
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
