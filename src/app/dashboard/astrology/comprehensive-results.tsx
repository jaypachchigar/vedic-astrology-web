"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/ui/glass-card";
import { Star, AlertCircle, Sparkles, Info, Loader2 } from "lucide-react";
import { getCompleteBirthChart, convertToAPIFormat } from "@/lib/astrology-api";
import { NorthIndianChart } from "@/components/astrology/NorthIndianChart";
import { saveBirthChart } from "@/lib/supabase/birth-charts";
import { getPlanetPositionsInDivisionalChart, DIVISIONAL_CHARTS } from "@/lib/vedic-astrology/divisional-charts";
import { DivisionalChartDisplay } from "@/components/astrology/DivisionalChartDisplay";
import DashaPredictions from "@/components/astrology/DashaPredictions";
import GemstoneRecommendations from "@/components/astrology/GemstoneRecommendations";
import { YearlyPredictions } from "@/components/astrology/YearlyPredictions";
import { MonthlyPredictions } from "@/components/astrology/MonthlyPredictions";

interface BirthData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  timezone?: string; // Optional for backwards compatibility
  placeOfBirth: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface ComprehensiveResultsProps {
  birthData: BirthData;
  onEdit: () => void;
}

export function ComprehensiveResults({ birthData, onEdit }: ComprehensiveResultsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setIsLoading(true);
        setError(null);

        console.log('🔍 Birth Data from Form:', birthData);

        // Ensure timezone is set (fallback to IST if missing)
        const birthDataWithTimezone = {
          ...birthData,
          timezone: birthData.timezone || 'Asia/Kolkata'
        };

        // Convert form data to API format
        const apiDetails = convertToAPIFormat(birthDataWithTimezone);
        console.log('🔍 API Details:', apiDetails);

        // Fetch complete birth chart from Prokerala API
        const data = await getCompleteBirthChart(apiDetails);

        console.log('📊 Chart Data Received:', {
          ascendant: data.kundli?.ascendant,
          planetCount: data.planetPositions?.planets?.length,
          firstPlanet: data.planetPositions?.planets?.[0]
        });

        setChartData(data);

        // Save birth chart to database
        try {
          await saveBirthChart({
            name: birthDataWithTimezone.name,
            date_of_birth: birthDataWithTimezone.dateOfBirth,
            time_of_birth: birthDataWithTimezone.timeOfBirth,
            place_of_birth: birthDataWithTimezone.placeOfBirth,
            latitude: birthDataWithTimezone.latitude,
            longitude: birthDataWithTimezone.longitude,
            timezone: birthDataWithTimezone.timezone,
            chart_data: data,
          });
          console.log('✅ Birth chart saved to database');
        } catch (saveError) {
          console.error('⚠️ Could not save birth chart:', saveError);
          // Don't block the UI if save fails
        }

        setIsLoading(false);
      } catch (err) {
        console.error('❌ Error fetching chart:', err);
        setError('Failed to fetch birth chart data. Please try again.');
        setIsLoading(false);
      }
    }

    fetchChartData();
  }, [birthData]);

  // Extract data from API response (must be before conditional returns to satisfy hooks rules)
  const planets = chartData?.planetPositions?.planets || [];
  const kundli = chartData?.kundli || {};
  const advancedKundli = chartData?.advancedKundli || {};
  const birthDetails = chartData?.birthDetails || {};
  const isUsingMockData = chartData?.isUsingMockData || false;

  // Calculate all divisional charts (must be before conditional returns to satisfy hooks rules)
  const divisionalCharts = useMemo(() => {
    if (planets.length === 0) return {};

    const divisions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 20, 24, 27, 30, 40, 45, 60];
    const charts: Record<number, any> = {};

    divisions.forEach(div => {
      const divisionalPlanets = getPlanetPositionsInDivisionalChart(
        planets.map((p: any) => ({
          name: p.name,
          siderealLongitude: p.global_degree || 0,
        })),
        div
      );

      // Calculate ascendant for this divisional chart
      let divisionalAscendant = undefined;
      if (kundli.ascendant?.degree !== undefined) {
        const ascendantAbsoluteDegree =
          ((kundli.ascendant.sign.id - 1) * 30) + kundli.ascendant.degree;
        const divAsc = getPlanetPositionsInDivisionalChart(
          [{ name: 'Ascendant', siderealLongitude: ascendantAbsoluteDegree }],
          div
        )[0];
        divisionalAscendant = divAsc;
      }

      charts[div] = {
        planets: divisionalPlanets,
        ascendant: divisionalAscendant,
      };
    });

    return charts;
  }, [planets, kundli.ascendant]);

  // Conditional returns AFTER all hooks
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <div>
            <p className="text-lg font-semibold">Calculating Your Birth Chart...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Fetching planetary positions and analyzing your chart
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
          <div>
            <p className="text-lg font-semibold">Error Loading Chart</p>
            <p className="text-sm text-muted-foreground mt-2">{error}</p>
          </div>
          <Button onClick={onEdit} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-gold to-purple-light bg-clip-text text-transparent">
            Complete Vedic Astrology Report
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis for {birthData.name}
          </p>
        </div>
        <Button variant="outline" onClick={onEdit}>
          Edit Details
        </Button>
      </div>

      {/* Mock Data Warning */}
      {isUsingMockData && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-yellow-600 dark:text-yellow-400">Using Demo Data</p>
            <p className="text-sm text-muted-foreground mt-1">
              Prokerala API is not configured. The data shown is for demonstration purposes only.
              To get your actual birth chart, please configure your API keys in <code className="text-xs bg-muted px-1 py-0.5 rounded">.env.local</code>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              See <code className="bg-muted px-1 py-0.5 rounded">ASTROLOGY_API_SETUP.md</code> for setup instructions.
            </p>
          </div>
        </div>
      )}

      {/* Birth Details Card */}
      <GlassCard variant="primary" className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Date of Birth</p>
            <p className="font-semibold">{new Date(birthData.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Time of Birth</p>
            <p className="font-semibold">{birthData.timeOfBirth}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Timezone</p>
            <p className="font-semibold text-xs">{birthData.timezone || 'Asia/Kolkata (IST)'}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Location</p>
            <p className="font-semibold">{birthData.city}, {birthData.country}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Coordinates</p>
            <p className="font-semibold font-mono text-xs">
              {birthData.latitude.toFixed(4)}°{birthData.latitude >= 0 ? 'N' : 'S'}, {Math.abs(birthData.longitude).toFixed(4)}°{birthData.longitude >= 0 ? 'E' : 'W'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Main Tabs */}
      <Tabs defaultValue="chart" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-2">
          <TabsTrigger value="chart">Birth Chart</TabsTrigger>
          <TabsTrigger value="planets">Planets</TabsTrigger>
          <TabsTrigger value="divisional">Divisional Charts</TabsTrigger>
          <TabsTrigger value="dashas">Dashas</TabsTrigger>
          <TabsTrigger value="doshas">Doshas & Yogas</TabsTrigger>
          <TabsTrigger value="gemstones">Gemstones</TabsTrigger>
          <TabsTrigger value="yearly">Year {new Date().getFullYear()}</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        {/* Birth Chart Tab */}
        <TabsContent value="chart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>D1 Chart (Rasi/Lagna Chart)</CardTitle>
              <CardDescription>Your primary birth chart showing planetary positions</CardDescription>
            </CardHeader>
            <CardContent>
              {planets.length > 0 && kundli.ascendant ? (
                <NorthIndianChart
                  planets={planets.map((p: any) => ({
                    name: p.name,
                    house: p.house
                  }))}
                  ascendant={kundli.ascendant.sign.id}
                />
              ) : (
                <div className="aspect-square max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-purple-light/5 rounded-lg flex items-center justify-center border-2 border-primary/20">
                  <div className="text-center">
                    <Star className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Birth chart visualization (D1 - Rasi Chart)
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ascendant (Lagna)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-primary/10 rounded-lg">
                  {kundli.ascendant ? (
                    <>
                      <p className="text-2xl font-bold text-primary">
                        {kundli.ascendant.sign?.name || 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {kundli.ascendant.degree?.toFixed(2)}° - First House
                      </p>
                      {kundli.ascendant.nakshatra && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Nakshatra: {kundli.ascendant.nakshatra.name} (Pada {kundli.ascendant.nakshatra.pada})
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Rising sign indicates personality, appearance, and approach to life
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Ascendant data not available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moon Sign (Rashi)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gold/10 rounded-lg">
                  {planets.find((p: any) => p.name === 'Moon') ? (
                    <>
                      <p className="text-2xl font-bold text-gold">
                        {planets.find((p: any) => p.name === 'Moon')?.sign?.name || 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {planets.find((p: any) => p.name === 'Moon')?.local_degree?.toFixed(2)}° -
                        {' '}{planets.find((p: any) => p.name === 'Moon')?.house}
                        {planets.find((p: any) => p.name === 'Moon')?.house === 1 ? 'st' :
                         planets.find((p: any) => p.name === 'Moon')?.house === 2 ? 'nd' :
                         planets.find((p: any) => p.name === 'Moon')?.house === 3 ? 'rd' : 'th'} House
                      </p>
                      {planets.find((p: any) => p.name === 'Moon')?.nakshatra && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Nakshatra: {planets.find((p: any) => p.name === 'Moon')?.nakshatra?.name}
                          {' '}(Pada {planets.find((p: any) => p.name === 'Moon')?.nakshatra?.pada})
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        Moon sign represents emotions, mind, and inner self
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">Moon data not available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Planets Tab */}
        <TabsContent value="planets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Planetary Positions</CardTitle>
              <CardDescription>All planets (Grahas) in your birth chart with precise degrees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {planets.length > 0 ? (
                  planets.map((planet: any) => {
                    const getNature = (name: string) => {
                      if (['Sun', 'Mars', 'Saturn'].includes(name)) return 'Natural malefic';
                      if (['Jupiter', 'Venus', 'Moon'].includes(name)) return 'Natural benefic';
                      if (['Mercury'].includes(name)) return 'Neutral';
                      return 'Shadow planet';
                    };

                    return (
                      <div key={planet.id} className="p-5 rounded-xl border border-border bg-gradient-to-br from-card to-accent/5 hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center flex-wrap gap-2">
                              <h3 className="font-bold text-lg">
                                {planet.name}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                ({planet.full_name})
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {getNature(planet.name)}
                              </span>
                              {planet.is_retrograde && (
                                <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-600 font-semibold">
                                  ℞ Retrograde
                                </span>
                              )}
                              {planet.is_combust && (
                                <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-600 font-semibold">
                                  🔥 Combust
                                </span>
                              )}
                              {planet.is_vargottama && (
                                <span className="text-xs px-2 py-1 rounded-full bg-gold/20 text-gold-foreground font-semibold animate-pulse">
                                  ⭐ Vargottama
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4 flex flex-col items-end">
                            <p className="font-mono text-xl font-bold bg-gradient-to-r from-primary to-purple bg-clip-text text-transparent">
                              {planet.local_degree?.toFixed(2)}°
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              in {planet.sign?.name}
                            </p>
                            <p className="font-mono text-xs text-muted-foreground mt-1">
                              Speed: {planet.speed?.toFixed(2)}°/day
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          {/* Rasi (D1) Information */}
                          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-xs font-semibold text-primary mb-2">D1 - Rasi (Birth Chart)</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Sign:</span>
                                <span className="font-semibold">{planet.sign?.name || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">House:</span>
                                <span className="font-semibold">{planet.house}
                                  {planet.house === 1 ? 'st' : planet.house === 2 ? 'nd' : planet.house === 3 ? 'rd' : 'th'}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Sign Lord:</span>
                                <span className="font-semibold">{planet.sign?.lord || 'N/A'}</span>
                              </div>
                            </div>
                          </div>

                          {/* Navamsa (D9) Information */}
                          {planet.navamsa_sign && (
                            <div className="p-3 bg-gold/5 rounded-lg border border-gold/20">
                              <p className="text-xs font-semibold text-gold-foreground mb-2">D9 - Navamsa Chart</p>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Navamsa Sign:</span>
                                  <span className="font-semibold">{planet.navamsa_sign?.name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Navamsa Lord:</span>
                                  <span className="font-semibold">{planet.navamsa_sign?.lord || 'N/A'}</span>
                                </div>
                                {planet.is_vargottama && (
                                  <div className="mt-2 p-1.5 bg-gold/10 rounded text-center">
                                    <span className="text-xs font-semibold text-gold-foreground">
                                      Same sign in D1 & D9 - Very Strong!
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Nakshatra Details */}
                        {planet.nakshatra && (
                          <div className="p-3 bg-purple/5 rounded-lg border border-purple/20">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-sm font-semibold text-purple-dark">
                                  {planet.nakshatra.name} Nakshatra
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Pada {planet.nakshatra.pada || '-'} of 4
                                </p>
                              </div>
                              <span className="text-xs px-2 py-1 bg-purple/20 text-purple-dark rounded-full">
                                Lord: {planet.nakshatra_lord || planet.nakshatra.lord}
                              </span>
                            </div>
                            {planet.nakshatra.deity && (
                              <p className="text-xs text-muted-foreground mb-1">
                                <span className="font-medium">Deity:</span> {planet.nakshatra.deity}
                              </p>
                            )}
                            {planet.nakshatra.description && (
                              <p className="text-xs text-muted-foreground italic leading-relaxed">
                                {planet.nakshatra.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No planetary data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Planetary Friendship Table */}
          <Card>
            <CardHeader>
              <CardTitle>Planetary Friendship Table</CardTitle>
              <CardDescription>Natural relationships between planets in your chart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Planet</th>
                      <th className="text-left p-2">Friends</th>
                      <th className="text-left p-2">Neutral</th>
                      <th className="text-left p-2">Enemies</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { planet: "Sun", friends: "Moon, Mars, Jupiter", neutral: "Mercury", enemies: "Venus, Saturn" },
                      { planet: "Moon", friends: "Sun, Mercury", neutral: "Mars, Jupiter, Venus, Saturn", enemies: "None" },
                      { planet: "Mars", friends: "Sun, Moon, Jupiter", neutral: "Venus, Saturn", enemies: "Mercury" },
                      { planet: "Mercury", friends: "Sun, Venus", neutral: "Mars, Jupiter, Saturn", enemies: "Moon" },
                      { planet: "Jupiter", friends: "Sun, Moon, Mars", neutral: "Saturn", enemies: "Mercury, Venus" },
                      { planet: "Venus", friends: "Mercury, Saturn", neutral: "Mars, Jupiter", enemies: "Sun, Moon" },
                      { planet: "Saturn", friends: "Mercury, Venus", neutral: "Jupiter", enemies: "Sun, Moon, Mars" },
                    ].map((row) => (
                      <tr key={row.planet} className="border-b hover:bg-muted/30">
                        <td className="p-2 font-medium">{row.planet}</td>
                        <td className="p-2 text-green-600 dark:text-green-400">{row.friends}</td>
                        <td className="p-2 text-yellow-600 dark:text-yellow-400">{row.neutral}</td>
                        <td className="p-2 text-red-600 dark:text-red-400">{row.enemies}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Divisional Charts Tab */}
        <TabsContent value="divisional" className="space-y-6">
          <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
            <Info className="w-5 h-5 text-primary" />
            <p className="text-sm">Divisional charts (Vargas) provide detailed insights into specific life areas</p>
          </div>

          <Tabs defaultValue="d1" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-1 h-auto py-2">
              <TabsTrigger value="d1" className="text-xs">D1</TabsTrigger>
              <TabsTrigger value="d2" className="text-xs">D2</TabsTrigger>
              <TabsTrigger value="d3" className="text-xs">D3</TabsTrigger>
              <TabsTrigger value="d4" className="text-xs">D4</TabsTrigger>
              <TabsTrigger value="d5" className="text-xs">D5</TabsTrigger>
              <TabsTrigger value="d6" className="text-xs">D6</TabsTrigger>
              <TabsTrigger value="d7" className="text-xs">D7</TabsTrigger>
              <TabsTrigger value="d8" className="text-xs">D8</TabsTrigger>
              <TabsTrigger value="d9" className="text-xs bg-gold/10">D9</TabsTrigger>
              <TabsTrigger value="d10" className="text-xs">D10</TabsTrigger>
              <TabsTrigger value="d11" className="text-xs">D11</TabsTrigger>
              <TabsTrigger value="d12" className="text-xs">D12</TabsTrigger>
              <TabsTrigger value="d16" className="text-xs">D16</TabsTrigger>
              <TabsTrigger value="d20" className="text-xs">D20</TabsTrigger>
              <TabsTrigger value="d24" className="text-xs">D24</TabsTrigger>
              <TabsTrigger value="d27" className="text-xs">D27</TabsTrigger>
              <TabsTrigger value="d30" className="text-xs">D30</TabsTrigger>
              <TabsTrigger value="d40" className="text-xs">D40</TabsTrigger>
              <TabsTrigger value="d45" className="text-xs">D45</TabsTrigger>
              <TabsTrigger value="d60" className="text-xs bg-primary/10">D60</TabsTrigger>
            </TabsList>

            {/* Render all divisional charts */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 20, 24, 27, 30, 40, 45, 60].map((div) => {
              const divChart = divisionalCharts[div];
              if (!divChart) return null;

              return (
                <TabsContent key={`d${div}`} value={`d${div}`}>
                  <DivisionalChartDisplay
                    division={div}
                    planets={divChart.planets}
                    ascendant={divChart.ascendant}
                  />
                </TabsContent>
              );
            })}
          </Tabs>
        </TabsContent>

        {/* Dashas Tab */}
        <TabsContent value="dashas" className="space-y-6">
          <Tabs defaultValue="vimshottari">
            <TabsList className="grid w-full grid-cols-3 gap-2">
              <TabsTrigger value="vimshottari">Vimshottari Dasha</TabsTrigger>
              <TabsTrigger value="yogini">Yogini Dasha</TabsTrigger>
              <TabsTrigger value="char">Char Dasha</TabsTrigger>
            </TabsList>

            {/* Vimshottari Dasha */}
            <TabsContent value="vimshottari" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vimshottari Dasha System</CardTitle>
                  <CardDescription>120-year planetary period system - most widely used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {advancedKundli.vimshottari_dasha ? (
                    <>
                      <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/30">
                        <p className="text-xs text-muted-foreground mb-1">Current Maha Dasha</p>
                        <p className="text-2xl font-bold text-primary">
                          {advancedKundli.vimshottari_dasha.maha_dasha?.planet || 'N/A'}
                        </p>
                        <p className="text-sm mt-1">
                          {advancedKundli.vimshottari_dasha.maha_dasha?.start || ''} -
                          {' '}{advancedKundli.vimshottari_dasha.maha_dasha?.end || ''}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-gold/10 border border-gold/30">
                          <p className="text-xs text-muted-foreground mb-1">Current Antar Dasha</p>
                          <p className="text-lg font-bold text-gold">
                            {advancedKundli.vimshottari_dasha.antar_dasha?.planet || 'N/A'}
                          </p>
                          <p className="text-xs mt-1">
                            {advancedKundli.vimshottari_dasha.antar_dasha?.start || ''} -
                            {' '}{advancedKundli.vimshottari_dasha.antar_dasha?.end || ''}
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-muted">
                          <p className="text-xs text-muted-foreground mb-1">Current Pratyantar Dasha</p>
                          <p className="text-lg font-semibold">
                            {advancedKundli.vimshottari_dasha.pratyantar_dasha?.planet || 'N/A'}
                          </p>
                          <p className="text-xs mt-1">
                            {advancedKundli.vimshottari_dasha.pratyantar_dasha?.start || ''} -
                            {' '}{advancedKundli.vimshottari_dasha.pratyantar_dasha?.end || ''}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Dasha information not available</p>
                      <p className="text-xs mt-2">This data requires advanced kundli API access</p>
                    </div>
                  )}

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Complete Maha Dasha Sequence (Lifetime)</h4>
                    <div className="space-y-2">
                      {advancedKundli.vimshottari_dasha?.all_maha_dashas?.map((dasha: any) => {
                        const today = new Date();
                        const startDate = new Date(dasha.start);
                        const endDate = new Date(dasha.end);
                        const isCurrent = today >= startDate && today < endDate;
                        const isPast = today >= endDate;
                        const isFuture = today < startDate;

                        const status = isCurrent ? "Current" : isPast ? "Past" : "Future";

                        return (
                          <div key={dasha.planet} className={`p-3 rounded-lg flex items-center justify-between ${
                            status === "Current" ? "bg-primary/10 border-2 border-primary" : "bg-muted"
                          }`}>
                            <div>
                              <p className="font-medium">{dasha.planet} Dasha</p>
                              <p className="text-xs text-muted-foreground">
                                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()} ({Math.round(dasha.years * 10) / 10} years)
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              status === "Current" ? "bg-primary text-primary-foreground" :
                              status === "Past" ? "bg-muted-foreground/20" : "bg-blue-500/20 text-blue-600"
                            }`}>
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Dasha Predictions */}
              {advancedKundli.vimshottari_dasha && (
                <DashaPredictions
                  mahaDasha={advancedKundli.vimshottari_dasha.maha_dasha?.planet || ''}
                  antarDasha={advancedKundli.vimshottari_dasha.antar_dasha?.planet || ''}
                  mahaDashaStart={advancedKundli.vimshottari_dasha.maha_dasha?.start || ''}
                  mahaDashaEnd={advancedKundli.vimshottari_dasha.maha_dasha?.end || ''}
                  antarDashaStart={advancedKundli.vimshottari_dasha.antar_dasha?.start || ''}
                  antarDashaEnd={advancedKundli.vimshottari_dasha.antar_dasha?.end || ''}
                />
              )}
            </TabsContent>

            {/* Yogini Dasha */}
            <TabsContent value="yogini">
              <Card>
                <CardHeader>
                  <CardTitle>Yogini Dasha System</CardTitle>
                  <CardDescription>36-year cycle based on Moon's nakshatra</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { yogini: "Mangala", duration: "1 year", from: "2024", to: "2025", status: "Current" },
                      { yogini: "Pingala", duration: "2 years", from: "2025", to: "2027", status: "Upcoming" },
                      { yogini: "Dhanya", duration: "3 years", from: "2027", to: "2030", status: "Future" },
                      { yogini: "Bhramari", duration: "4 years", from: "2030", to: "2034", status: "Future" },
                      { yogini: "Bhadrika", duration: "5 years", from: "2034", to: "2039", status: "Future" },
                      { yogini: "Ulka", duration: "6 years", from: "2039", to: "2045", status: "Future" },
                      { yogini: "Siddha", duration: "7 years", from: "2045", to: "2052", status: "Future" },
                      { yogini: "Sankata", duration: "8 years", from: "2052", to: "2060", status: "Future" },
                    ].map((yogini) => (
                      <div key={yogini.yogini} className={`p-3 rounded-lg flex items-center justify-between ${
                        yogini.status === "Current" ? "bg-gold/10 border border-gold" : "bg-muted"
                      }`}>
                        <div>
                          <p className="font-medium">{yogini.yogini} Dasha</p>
                          <p className="text-xs text-muted-foreground">{yogini.from} - {yogini.to} ({yogini.duration})</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          yogini.status === "Current" ? "bg-gold text-gold-foreground" : "bg-muted-foreground/20"
                        }`}>
                          {yogini.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Char Dasha */}
            <TabsContent value="char">
              <Card>
                <CardHeader>
                  <CardTitle>Char Dasha (Jaimini System)</CardTitle>
                  <CardDescription>Sign-based dasha system from Jaimini astrology</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { sign: "Aries", years: 12, from: "2018", to: "2030", status: "Current" },
                      { sign: "Taurus", years: 8, from: "2030", to: "2038", status: "Future" },
                      { sign: "Gemini", years: 11, from: "2038", to: "2049", status: "Future" },
                      { sign: "Cancer", years: 3, from: "2049", to: "2052", status: "Future" },
                      { sign: "Leo", years: 7, from: "2052", to: "2059", status: "Future" },
                      { sign: "Virgo", years: 10, from: "2059", to: "2069", status: "Future" },
                    ].map((dasha) => (
                      <div key={dasha.sign} className={`p-3 rounded-lg flex items-center justify-between ${
                        dasha.status === "Current" ? "bg-purple-light/10 border border-purple-light" : "bg-muted"
                      }`}>
                        <div>
                          <p className="font-medium">{dasha.sign} Dasha</p>
                          <p className="text-xs text-muted-foreground">{dasha.from} - {dasha.to} ({dasha.years} years)</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          dasha.status === "Current" ? "bg-purple-dark text-white" : "bg-muted-foreground/20"
                        }`}>
                          {dasha.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Doshas & Yogas Tab */}
        <TabsContent value="doshas" className="space-y-6">
          {/* Doshas */}
          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>Dosha Analysis</span>
              </CardTitle>
              <CardDescription>Planetary afflictions and their remedies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {advancedKundli.doshas ? (
                <>
                  {/* Kalsarp Dosha */}
                  <div className={`p-4 rounded-lg border ${
                    advancedKundli.doshas.kalsarp_dosha?.has_dosha
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-green-500/30 bg-green-500/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          advancedKundli.doshas.kalsarp_dosha?.has_dosha
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          Kalsarp Dosha
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {advancedKundli.doshas.kalsarp_dosha?.description ||
                           'Status not available'}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        advancedKundli.doshas.kalsarp_dosha?.has_dosha
                          ? 'bg-red-500/20 text-red-600'
                          : 'bg-green-500/20 text-green-600'
                      }`}>
                        {advancedKundli.doshas.kalsarp_dosha?.has_dosha ? 'Present' : 'Clear'}
                      </span>
                    </div>
                  </div>

                  {/* Mangal Dosha */}
                  <div className={`p-4 rounded-lg border ${
                    advancedKundli.doshas.mangal_dosha?.has_dosha
                      ? 'border-orange-500/30 bg-orange-500/5'
                      : 'border-green-500/30 bg-green-500/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          advancedKundli.doshas.mangal_dosha?.has_dosha
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          Mangal Dosha (Manglik)
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {advancedKundli.doshas.mangal_dosha?.description ||
                           'Status not available'}
                        </p>
                        {advancedKundli.doshas.mangal_dosha?.severity && (
                          <p className="text-xs mt-2">
                            <span className="font-medium">Severity:</span>{' '}
                            {advancedKundli.doshas.mangal_dosha.severity}
                          </p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        advancedKundli.doshas.mangal_dosha?.has_dosha
                          ? advancedKundli.doshas.mangal_dosha?.severity === 'Low'
                            ? 'bg-yellow-500/20 text-yellow-600'
                            : 'bg-orange-500/20 text-orange-600'
                          : 'bg-green-500/20 text-green-600'
                      }`}>
                        {advancedKundli.doshas.mangal_dosha?.has_dosha
                          ? advancedKundli.doshas.mangal_dosha?.severity || 'Present'
                          : 'Clear'}
                      </span>
                    </div>
                  </div>

                  {/* Pitra Dosha */}
                  <div className={`p-4 rounded-lg border ${
                    advancedKundli.doshas.pitra_dosha?.has_dosha
                      ? 'border-yellow-500/30 bg-yellow-500/5'
                      : 'border-green-500/30 bg-green-500/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          advancedKundli.doshas.pitra_dosha?.has_dosha
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          Pitra Dosha
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {advancedKundli.doshas.pitra_dosha?.description ||
                           'Status not available'}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        advancedKundli.doshas.pitra_dosha?.has_dosha
                          ? 'bg-yellow-500/20 text-yellow-600'
                          : 'bg-green-500/20 text-green-600'
                      }`}>
                        {advancedKundli.doshas.pitra_dosha?.has_dosha ? 'Present' : 'Clear'}
                      </span>
                    </div>
                  </div>

                  {/* Sade Sati */}
                  <div className={`p-4 rounded-lg border ${
                    advancedKundli.doshas.sade_sati?.is_active
                      ? 'border-blue-500/30 bg-blue-500/5'
                      : 'border-green-500/30 bg-green-500/5'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          advancedKundli.doshas.sade_sati?.is_active
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          Sade Sati (7.5 Years of Saturn)
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {advancedKundli.doshas.sade_sati?.description ||
                           'Status not available'}
                        </p>
                        {advancedKundli.doshas.sade_sati?.next_period && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Next Sade Sati period: {advancedKundli.doshas.sade_sati.next_period}
                          </p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        advancedKundli.doshas.sade_sati?.is_active
                          ? 'bg-blue-500/20 text-blue-600'
                          : 'bg-green-500/20 text-green-600'
                      }`}>
                        {advancedKundli.doshas.sade_sati?.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Dosha analysis not available</p>
                  <p className="text-xs mt-2">This data requires advanced kundli API access</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Gemstone Recommendations */}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Gemstone Recommendations</span>
              </CardTitle>
              <CardDescription>Precious stones for planetary strength</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-600 dark:text-yellow-400">Life Stone (Ascendant Lord)</h4>
                <p className="text-lg font-bold mt-1">Red Coral (Moonga)</p>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p><strong>For:</strong> Mars (Ascendant lord Aries)</p>
                  <p><strong>Weight:</strong> 5-7 carats minimum</p>
                  <p><strong>Metal:</strong> Gold or Copper ring</p>
                  <p><strong>Finger:</strong> Ring finger (right hand)</p>
                  <p><strong>Day to wear:</strong> Tuesday morning during Mars hora</p>
                  <p><strong>Benefits:</strong> Vitality, courage, leadership, confidence</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400">Lucky Stone (9th Lord)</h4>
                <p className="text-lg font-bold mt-1">Yellow Sapphire (Pukhraj)</p>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p><strong>For:</strong> Jupiter (9th lord - fortune & wisdom)</p>
                  <p><strong>Weight:</strong> 3-5 carats minimum</p>
                  <p><strong>Metal:</strong> Gold ring</p>
                  <p><strong>Finger:</strong> Index finger (right hand)</p>
                  <p><strong>Day to wear:</strong> Thursday morning during Jupiter hora</p>
                  <p><strong>Benefits:</strong> Prosperity, wisdom, spiritual growth, good fortune</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <h4 className="font-semibold text-green-600 dark:text-green-400">Benefic Stone (Current Dasha Lord)</h4>
                <p className="text-lg font-bold mt-1">Pearl (Moti)</p>
                <div className="text-sm text-muted-foreground mt-2 space-y-1">
                  <p><strong>For:</strong> Moon (Current dasha period)</p>
                  <p><strong>Weight:</strong> 4-6 carats minimum</p>
                  <p><strong>Metal:</strong> Silver ring</p>
                  <p><strong>Finger:</strong> Little finger (right hand)</p>
                  <p><strong>Day to wear:</strong> Monday morning during Moon hora</p>
                  <p><strong>Benefits:</strong> Mental peace, emotional balance, intuition</p>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg text-sm">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                  <li>Consult with a qualified astrologer before wearing any gemstone</li>
                  <li>Ensure gemstones are natural, untreated, and certified</li>
                  <li>Perform proper purification rituals before wearing</li>
                  <li>Gemstones should touch the skin for maximum effect</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Favorable Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Favorable Elements for You</CardTitle>
              <CardDescription>Lucky colors, numbers, days, and directions based on your chart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">Lucky Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Red", "Orange", "Yellow", "Gold"].map((color) => (
                      <span key={color} className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                        {color}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Wear these colors for important events</p>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">Lucky Numbers</h4>
                  <div className="flex flex-wrap gap-2">
                    {[1, 3, 9, 18, 27, 36, 45].map((num) => (
                      <span key={num} className="w-8 h-8 flex items-center justify-center rounded-full text-sm bg-gold/10 text-gold font-semibold">
                        {num}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Use these for important decisions</p>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">Favorable Days</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Best:</span> Tuesday, Thursday, Sunday</p>
                    <p><span className="font-medium">Good:</span> Monday, Wednesday</p>
                    <p><span className="font-medium">Avoid:</span> Saturday for new beginnings</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">Lucky Directions</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Most Favorable:</span> East, South</p>
                    <p><span className="font-medium">Good:</span> North, Northeast</p>
                    <p><span className="font-medium">Neutral:</span> West, Northwest</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Face these directions during meditation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gemstones Tab */}
        <TabsContent value="gemstones" className="space-y-6">
          {planets && planets.length > 0 && (
            <GemstoneRecommendations
              planets={planets}
              ascendant={kundli.ascendant?.sign?.name}
            />
          )}
        </TabsContent>

        {/* Yearly Predictions Tab */}
        <TabsContent value="yearly" className="space-y-6">
          {planets.find((p: any) => p.name === 'Moon')?.sign?.name && (
            <YearlyPredictions
              moonSign={planets.find((p: any) => p.name === 'Moon')?.sign?.name || ''}
              ascendant={kundli.ascendant?.sign?.name || ''}
              mahaDasha={advancedKundli?.vimshottari_dasha?.maha_dasha?.planet || ''}
              year={new Date().getFullYear()}
            />
          )}
        </TabsContent>

        {/* Monthly Predictions Tab */}
        <TabsContent value="monthly" className="space-y-6">
          {planets.find((p: any) => p.name === 'Moon')?.sign?.name && (
            <MonthlyPredictions
              moonSign={planets.find((p: any) => p.name === 'Moon')?.sign?.name || ''}
              ascendant={kundli.ascendant?.sign?.name || ''}
              year={new Date().getFullYear()}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
