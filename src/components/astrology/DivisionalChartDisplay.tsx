"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NorthIndianChart } from "./NorthIndianChart";
import { DIVISIONAL_CHARTS } from "@/lib/vedic-astrology/divisional-charts";

interface Planet {
  name: string;
  sign: { id?: number; name: string };
  absoluteDegree?: number;
}

interface DivisionalChartDisplayProps {
  division: number;
  planets: Planet[];
  ascendant?: { absoluteDegree: number; sign?: { id: number } };
}

export function DivisionalChartDisplay({ division, planets, ascendant }: DivisionalChartDisplayProps) {
  const chartInfo = DIVISIONAL_CHARTS[division];

  if (!chartInfo) {
    return null;
  }

  // Calculate house for each planet based on ascendant
  const getPlanetHouse = (planetDegree: number, ascDegree: number): number => {
    const ascSign = Math.floor(ascDegree / 30);
    const planetSign = Math.floor(planetDegree / 30);
    let house = planetSign - ascSign + 1;
    while (house <= 0) house += 12;
    while (house > 12) house -= 12;
    return house;
  };

  // Prepare planets for NorthIndianChart component
  const chartPlanets = planets.map(p => ({
    name: p.name,
    house: ascendant?.absoluteDegree
      ? getPlanetHouse(p.absoluteDegree || 0, ascendant.absoluteDegree)
      : 1,
  }));

  // Get ascendant sign (1-12)
  const ascendantSign = ascendant?.sign?.id || (ascendant?.absoluteDegree ? Math.floor(ascendant.absoluteDegree / 30) + 1 : 1);

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-lg md:text-xl">D{division} - {chartInfo.name}</span>
          <span className="text-xs md:text-sm font-normal text-muted-foreground">
            {chartInfo.sanskrit}
          </span>
        </CardTitle>
        <CardDescription>
          <div className="space-y-1">
            <div className="text-sm"><span className="font-semibold text-primary">Signifies:</span> {chartInfo.signifies}</div>
            <div className="text-xs text-muted-foreground">{chartInfo.description}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <NorthIndianChart
          planets={chartPlanets}
          ascendant={ascendantSign}
        />

        {/* Planet List */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold border-b border-border pb-1">Planetary Positions</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {planets.map((planet) => (
              <div key={planet.name} className="flex justify-between p-2 rounded-lg bg-muted/50 border border-border/50">
                <span className="font-medium">{planet.name}</span>
                <span className="text-muted-foreground">{planet.sign?.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
