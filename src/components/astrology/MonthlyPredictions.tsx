"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface MonthlyPredictionsProps {
  moonSign: string;
  ascendant: string;
  year?: number;
}

interface MonthData {
  month: string;
  overview: string;
  career: string;
  finance: string;
  relationships: string;
}

export function MonthlyPredictions({ moonSign, ascendant, year = 2026 }: MonthlyPredictionsProps) {
  const months = generateMonthlyForecasts(moonSign, ascendant, year);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Month-by-Month Forecast for {year}</h3>
        <p className="text-sm text-muted-foreground">
          Based on your {moonSign} Moon Sign and {ascendant} Ascendant
        </p>
      </div>

      <div className="grid gap-4">
        {months.map((monthData, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{monthData.month} {year}</span>
                </CardTitle>
                <Badge variant="outline" className="text-xs">
                  {getMoonTransit(moonSign, index)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-primary mb-1">Overview:</p>
                <p className="text-sm text-muted-foreground">{monthData.overview}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="font-semibold text-primary mb-1">Career:</p>
                  <p className="text-muted-foreground">{monthData.career}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="font-semibold text-gold mb-1">Finance:</p>
                  <p className="text-muted-foreground">{monthData.finance}</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="font-semibold text-rose-500 mb-1">Relationships:</p>
                  <p className="text-muted-foreground">{monthData.relationships}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20 mt-6">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground italic text-center">
            Monthly predictions are personalized based on your {moonSign} Moon (emotions/mind) and {ascendant} Ascendant (career/body).
            Different chart combinations receive completely different monthly forecasts.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Generate truly personalized monthly forecasts based on Moon + Ascendant
 */
function generateMonthlyForecasts(moonSign: string, ascendant: string, year: number): MonthData[] {
  const moonIndex = getSignIndex(moonSign);
  const ascIndex = getSignIndex(ascendant);

  // Calculate Jupiter transits
  const jupiterFromMoon1 = calculateHouse(2, moonIndex); // Taurus until May
  const jupiterFromMoon2 = calculateHouse(3, moonIndex); // Gemini from June
  const jupiterFromAsc1 = calculateHouse(2, ascIndex);
  const jupiterFromAsc2 = calculateHouse(3, ascIndex);

  // Calculate Saturn transit
  const saturnFromMoon = calculateHouse(12, moonIndex); // Pisces
  const saturnFromAsc = calculateHouse(12, ascIndex);

  const months: MonthData[] = [
    {
      month: 'January',
      overview: `Start of ${year} brings ${getMonthTheme(moonSign, ascendant, jupiterFromMoon1, saturnFromMoon, 'winter')}. ${getJupiterMonthEffect(jupiterFromMoon1, 'continues')}`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc1, saturnFromAsc, 'January'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon1, saturnFromMoon, 'conservative'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon1, 'January')
    },
    {
      month: 'February',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon1, saturnFromMoon, 'spiritual')}. Maha Shivaratri brings transformation. ${getJupiterMonthEffect(jupiterFromMoon1, 'strengthens')}`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc1, saturnFromAsc, 'February'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon1, saturnFromMoon, 'growth'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon1, 'February')
    },
    {
      month: 'March',
      overview: `Spring brings renewal energy. ${getMonthTheme(moonSign, ascendant, jupiterFromMoon1, saturnFromMoon, 'festive')}. Holi celebrations add joy.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc1, saturnFromAsc, 'March'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon1, saturnFromMoon, 'moderate'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon1, 'March')
    },
    {
      month: 'April',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon1, saturnFromMoon, 'action')}. Last full month of Jupiter in current position. Ram Navami brings dharmic focus.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc1, saturnFromAsc, 'April'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon1, saturnFromMoon, 'planning'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon1, 'April')
    },
    {
      month: 'May',
      overview: `Major transition as Jupiter enters new sign! ${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'transition')}. ${getJupiterMonthEffect(jupiterFromMoon2, 'begins')}`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'May'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'shift'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'May')
    },
    {
      month: 'June',
      overview: `New Jupiter cycle begins. ${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'summer')}. ${getJupiterMonthEffect(jupiterFromMoon2, 'stabilizes')}`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'June'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'growth'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'June')
    },
    {
      month: 'July',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'steady')}. Monsoon season brings emotional depth.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'July'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'moderate'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'July')
    },
    {
      month: 'August',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'devotional')}. Janmashtami and Raksha Bandhan bring family focus.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'August'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'conservative'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'August')
    },
    {
      month: 'September',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'powerful')}. Ganesh Chaturthi removes obstacles. Pitru Paksha honors ancestors.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'September'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'growth'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'September')
    },
    {
      month: 'October',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'victory')}. Navratri and Dussehra bring triumph over obstacles.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'October'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'excellent'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'October')
    },
    {
      month: 'November',
      overview: `${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'prosperity')}. Diwali brings wealth and new beginnings.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'November'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'excellent'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'November')
    },
    {
      month: 'December',
      overview: `Year closes with ${getMonthTheme(moonSign, ascendant, jupiterFromMoon2, saturnFromMoon, 'reflection')}. Time to review growth and plan ahead.`,
      career: getCareerMonthForecast(ascendant, jupiterFromAsc2, saturnFromAsc, 'December'),
      finance: getFinanceMonthForecast(moonSign, jupiterFromMoon2, saturnFromMoon, 'planning'),
      relationships: getRelationshipMonthForecast(moonSign, jupiterFromMoon2, 'December')
    }
  ];

  return months;
}

// Helper functions for personalization
function getSignIndex(sign: string): number {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs.indexOf(sign);
}

function calculateHouse(transitSign: number, natalSignIndex: number): number {
  let house = transitSign - natalSignIndex;
  while (house <= 0) house += 12;
  while (house > 12) house -= 12;
  return house;
}

function getMonthTheme(moonSign: string, ascendant: string, jupiter: number, saturn: number, season: string): string {
  if (jupiter <= 4 || jupiter >= 10) {
    return `favorable energy for ${moonSign} Moon with ${ascendant} Ascendant`;
  }
  if (saturn === 12) {
    return `spiritual introspection suits ${moonSign} Moon nature`;
  }
  return `steady progress for ${moonSign}-${ascendant} combination`;
}

function getJupiterMonthEffect(house: number, phase: string): string {
  if (house === 2) return `Jupiter in 2nd house ${phase} wealth and family blessings`;
  if (house === 3) return `Jupiter in 3rd house ${phase} courage and communication`;
  if (house === 11) return `Jupiter in 11th house ${phase} gains and fulfillment`;
  if (house === 10) return `Jupiter in 10th house ${phase} career success`;
  if (house === 7) return `Jupiter in 7th house ${phase} partnership blessings`;
  return `Jupiter ${phase} its beneficial influence`;
}

function getCareerMonthForecast(ascendant: string, jupiter: number, saturn: number, month: string): string {
  let forecast = `As ${ascendant} Ascendant, `;

  if (jupiter === 10 || jupiter === 11) {
    forecast += `excellent professional month. Recognition likely.`;
  } else if (jupiter === 6) {
    forecast += `overcome workplace challenges systematically.`;
  } else if (saturn === 10) {
    forecast += `disciplined effort brings results. Patience required.`;
  } else {
    forecast += `steady progress through consistent work.`;
  }

  return forecast;
}

function getFinanceMonthForecast(moonSign: string, jupiter: number, saturn: number, tone: string): string {
  let forecast = `With ${moonSign} Moon, `;

  if (tone === 'excellent' || (jupiter === 2 || jupiter === 11)) {
    forecast += `strong income month. Investment opportunities arise.`;
  } else if (tone === 'growth') {
    forecast += `income increases. Save systematically.`;
  } else if (saturn === 12 && tone === 'conservative') {
    forecast += `control expenses. Build emergency fund.`;
  } else {
    forecast += `moderate financial flow. Budget wisely.`;
  }

  return forecast;
}

function getRelationshipMonthForecast(moonSign: string, jupiter: number, month: string): string {
  let forecast = `${moonSign} Moon brings `;

  if (jupiter === 7) {
    forecast += `excellent partnership energy. Commitments favored.`;
  } else if (jupiter === 5) {
    forecast += `romantic opportunities. Express feelings openly.`;
  } else if (jupiter === 11) {
    forecast += `fulfillment in friendships. Social connections thrive.`;
  } else {
    forecast += `steady emotional connections. Focus on clear communication.`;
  }

  return forecast;
}

function getMoonTransit(moonSign: string, monthIndex: number): string {
  const transits = ['Steady', 'Spiritual', 'Festive', 'Active', 'Transition', 'Growth', 'Stable', 'Devotional', 'Powerful', 'Victory', 'Prosperous', 'Reflective'];
  return transits[monthIndex] || 'Balanced';
}
