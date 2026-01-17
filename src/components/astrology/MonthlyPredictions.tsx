"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, DollarSign, Heart, Activity, Sparkles, Star, TrendingUp } from "lucide-react";
import { generateYearlyPrediction } from "@/lib/astrology/dynamic-predictions";

interface MonthlyPredictionsProps {
  moonSign: string;
  ascendant: string;
  mahaDasha?: string;
  antarDasha?: string;
  year?: number;
}

export function MonthlyPredictions({ moonSign, ascendant, mahaDasha = "Jupiter", antarDasha, year = 2026 }: MonthlyPredictionsProps) {
  // Get the detailed monthly highlights from the yearly prediction
  const yearlyPrediction = generateYearlyPrediction(
    moonSign,
    ascendant,
    mahaDasha,
    antarDasha || mahaDasha,
    year
  );

  const monthlyHighlights = yearlyPrediction.monthlyHighlights || [];

  // Generate additional detailed monthly data
  const detailedMonths = generateDetailedMonthlyData(moonSign, ascendant, mahaDasha, year);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary via-gold to-purple bg-clip-text text-transparent">
          Detailed Month-by-Month Forecast for {year}
        </h3>
        <p className="text-sm text-muted-foreground">
          Personalized for {moonSign} Moon • {ascendant} Ascendant • {mahaDasha} Dasha
        </p>
      </div>

      <div className="grid gap-4">
        {detailedMonths.map((monthData, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{monthData.month} {year}</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {monthData.moonPhase}
                  </Badge>
                  <Badge className={`text-xs ${monthData.rating >= 4 ? 'bg-green-500' : monthData.rating >= 3 ? 'bg-yellow-500' : 'bg-orange-500'}`}>
                    {monthData.rating >= 4 ? 'Excellent' : monthData.rating >= 3 ? 'Good' : 'Moderate'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              {/* Main Overview from detailed highlights */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm leading-relaxed">
                  {monthlyHighlights[index] || monthData.overview}
                </p>
              </div>

              {/* Key Areas Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-xs text-blue-500">Career</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{monthData.career}</p>
                </div>

                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-gold" />
                    <span className="font-semibold text-xs text-gold">Finance</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{monthData.finance}</p>
                </div>

                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold text-xs text-rose-500">Relationships</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{monthData.relationships}</p>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-xs text-green-500">Health</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{monthData.health}</p>
                </div>
              </div>

              {/* Key Dates and Tips */}
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="font-semibold text-xs">Auspicious Dates</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{monthData.auspiciousDates}</p>
                </div>

                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-xs">Focus Areas</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{monthData.focusAreas}</p>
                </div>
              </div>

              {/* Monthly Tip */}
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-xs text-purple-500">Monthly Tip for {moonSign} Moon</span>
                </div>
                <p className="text-xs text-muted-foreground italic">{monthData.tip}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20 mt-6">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground italic text-center">
            Monthly predictions integrate your {moonSign} Moon (emotions/mind), {ascendant} Ascendant (body/career),
            and {mahaDasha} Dasha period with current planetary transits.
            Each month's guidance is unique to your birth chart configuration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface DetailedMonthData {
  month: string;
  overview: string;
  career: string;
  finance: string;
  relationships: string;
  health: string;
  auspiciousDates: string;
  focusAreas: string;
  tip: string;
  moonPhase: string;
  rating: number;
}

function generateDetailedMonthlyData(moonSign: string, ascendant: string, mahaDasha: string, year: number): DetailedMonthData[] {
  const moonIndex = getSignIndex(moonSign);
  const ascIndex = getSignIndex(ascendant);

  const jupiterFromMoon1 = calculateHouse(2, moonIndex);
  const jupiterFromMoon2 = calculateHouse(3, moonIndex);
  const jupiterFromAsc1 = calculateHouse(2, ascIndex);
  const jupiterFromAsc2 = calculateHouse(3, ascIndex);
  const saturnFromMoon = calculateHouse(12, moonIndex);
  const saturnFromAsc = calculateHouse(12, ascIndex);

  const months: DetailedMonthData[] = [
    {
      month: 'January',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'January', jupiterFromMoon1, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc1, saturnFromAsc, 'January'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon1, saturnFromMoon, 'January'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon1, 'January'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'January'),
      auspiciousDates: 'Makar Sankranti (14th), Pongal period (14-17th), Republic Day (26th)',
      focusAreas: `${mahaDasha} Dasha themes, New year planning, Goal setting`,
      tip: getMoonSignMonthlyTip(moonSign, 'January'),
      moonPhase: 'New Beginnings',
      rating: calculateMonthRating(jupiterFromMoon1, saturnFromMoon, 1)
    },
    {
      month: 'February',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'February', jupiterFromMoon1, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc1, saturnFromAsc, 'February'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon1, saturnFromMoon, 'February'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon1, 'February'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'February'),
      auspiciousDates: 'Vasant Panchami (early Feb), Maha Shivaratri (late Feb), Valentine\'s Day (14th)',
      focusAreas: 'Spiritual practices, Relationship nurturing, Spring preparation',
      tip: getMoonSignMonthlyTip(moonSign, 'February'),
      moonPhase: 'Spiritual',
      rating: calculateMonthRating(jupiterFromMoon1, saturnFromMoon, 2)
    },
    {
      month: 'March',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'March', jupiterFromMoon1, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc1, saturnFromAsc, 'March'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon1, saturnFromMoon, 'March'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon1, 'March'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'March'),
      auspiciousDates: 'Holi (mid-March), Financial year-end planning (last week)',
      focusAreas: 'Tax planning, Social celebrations, Project completion',
      tip: getMoonSignMonthlyTip(moonSign, 'March'),
      moonPhase: 'Festive',
      rating: calculateMonthRating(jupiterFromMoon1, saturnFromMoon, 3)
    },
    {
      month: 'April',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'April', jupiterFromMoon1, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc1, saturnFromAsc, 'April'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon1, saturnFromMoon, 'April'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon1, 'April'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'April'),
      auspiciousDates: 'Ram Navami, Hanuman Jayanti, New financial year begins (1st)',
      focusAreas: 'New financial year planning, Dharmic practices, Career initiatives',
      tip: getMoonSignMonthlyTip(moonSign, 'April'),
      moonPhase: 'Action',
      rating: calculateMonthRating(jupiterFromMoon1, saturnFromMoon, 4)
    },
    {
      month: 'May',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'May', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'May'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'May'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'May'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'May'),
      auspiciousDates: 'Akshaya Tritiya (early May - excellent for investments), Buddha Purnima',
      focusAreas: 'MAJOR: Jupiter transit shift, Adaptation to new energies, Gold/property purchases',
      tip: getMoonSignMonthlyTip(moonSign, 'May'),
      moonPhase: 'Transition',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 5)
    },
    {
      month: 'June',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'June', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'June'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'June'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'June'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'June'),
      auspiciousDates: 'Summer solstice (21st), Mid-year review period',
      focusAreas: 'New Jupiter cycle integration, Mid-year goal review, Summer wellness',
      tip: getMoonSignMonthlyTip(moonSign, 'June'),
      moonPhase: 'Growth',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 6)
    },
    {
      month: 'July',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'July', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'July'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'July'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'July'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'July'),
      auspiciousDates: 'Guru Purnima (honor teachers), Monsoon season begins',
      focusAreas: 'Health routines, Mentor connection, Monsoon immunity',
      tip: getMoonSignMonthlyTip(moonSign, 'July'),
      moonPhase: 'Steady',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 7)
    },
    {
      month: 'August',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'August', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'August'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'August'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'August'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'August'),
      auspiciousDates: 'Raksha Bandhan, Krishna Janmashtami, Independence Day (15th)',
      focusAreas: 'Family bonds, Sibling relationships, Patriotic/leadership energy',
      tip: getMoonSignMonthlyTip(moonSign, 'August'),
      moonPhase: 'Devotional',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 8)
    },
    {
      month: 'September',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'September', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'September'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'September'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'September'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'September'),
      auspiciousDates: 'Ganesh Chaturthi (obstacle removal), Pitru Paksha (ancestor honoring)',
      focusAreas: 'Removing obstacles, Ancestral karma clearing, Spiritual growth',
      tip: getMoonSignMonthlyTip(moonSign, 'September'),
      moonPhase: 'Powerful',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 9)
    },
    {
      month: 'October',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'October', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'October'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'October'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'October'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'October'),
      auspiciousDates: 'Navratri (9 nights of Goddess), Dussehra/Vijayadashami (victory)',
      focusAreas: 'Victory over obstacles, Major purchases, New beginnings',
      tip: getMoonSignMonthlyTip(moonSign, 'October'),
      moonPhase: 'Victory',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 10) + 1
    },
    {
      month: 'November',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'November', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'November'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'November'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'November'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'November'),
      auspiciousDates: 'Diwali (wealth & new beginnings), Govardhan Puja, Bhai Dooj',
      focusAreas: 'Wealth manifestation, Lakshmi blessings, Family celebrations',
      tip: getMoonSignMonthlyTip(moonSign, 'November'),
      moonPhase: 'Prosperous',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 11) + 1
    },
    {
      month: 'December',
      overview: getMonthOverview(moonSign, ascendant, mahaDasha, 'December', jupiterFromMoon2, saturnFromMoon),
      career: getDetailedCareer(ascendant, mahaDasha, jupiterFromAsc2, saturnFromAsc, 'December'),
      finance: getDetailedFinance(moonSign, jupiterFromMoon2, saturnFromMoon, 'December'),
      relationships: getDetailedRelationships(moonSign, jupiterFromMoon2, 'December'),
      health: getDetailedHealth(ascendant, moonSign, saturnFromAsc, 'December'),
      auspiciousDates: 'Winter solstice (21st), Christmas (25th), New Year\'s Eve (31st)',
      focusAreas: `Year reflection, ${year + 1} planning, Family bonding`,
      tip: getMoonSignMonthlyTip(moonSign, 'December'),
      moonPhase: 'Reflective',
      rating: calculateMonthRating(jupiterFromMoon2, saturnFromMoon, 12)
    }
  ];

  return months;
}

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

function calculateMonthRating(jupiter: number, saturn: number, month: number): number {
  let rating = 3;
  if ([1, 2, 5, 7, 9, 10, 11].includes(jupiter)) rating += 1;
  if ([3, 6, 11].includes(saturn)) rating += 0.5;
  if ([1, 4, 8, 12].includes(saturn)) rating -= 0.5;
  if ([10, 11].includes(month)) rating += 0.5; // Festival season bonus
  return Math.min(5, Math.max(2, Math.round(rating)));
}

function getMonthOverview(moon: string, asc: string, dasha: string, month: string, jupiter: number, saturn: number): string {
  const jupiterEffect = jupiter <= 4 || jupiter >= 10 ? 'favorable Jupiter influence enhances' : 'Jupiter supports steady';
  const saturnEffect = saturn === 12 ? 'Saturn encourages spiritual reflection' : 'Saturn provides structure';
  return `${month} brings ${jupiterEffect} opportunities for ${moon} Moon natives. ${saturnEffect} for ${asc} Ascendant. ${dasha} Dasha themes continue to unfold.`;
}

function getDetailedCareer(asc: string, dasha: string, jupiter: number, saturn: number, month: string): string {
  if (jupiter === 10 || jupiter === 11) {
    return `Excellent career month for ${asc} rising. ${dasha} Dasha supports recognition and advancement. Leadership opportunities emerge.`;
  } else if (jupiter === 6) {
    return `Focus on overcoming workplace challenges. ${asc} Ascendant benefits from systematic problem-solving. Competition favors the prepared.`;
  } else if (saturn === 10) {
    return `Hard work and discipline required for ${asc} rising. ${dasha} Dasha rewards persistence. Long-term career building emphasized.`;
  }
  return `Steady professional progress for ${asc} Ascendant. ${dasha} Dasha supports consistent effort. Focus on skill development.`;
}

function getDetailedFinance(moon: string, jupiter: number, saturn: number, month: string): string {
  if (jupiter === 2 || jupiter === 11) {
    return `Strong income potential for ${moon} Moon. Wealth accumulation favored. Investment opportunities arise - act after research.`;
  } else if (saturn === 12) {
    return `Control expenses carefully this month. ${moon} Moon tendency toward emotional spending - stay aware. Build emergency reserves.`;
  } else if (saturn === 2) {
    return `Financial discipline essential for ${moon} Moon. Income may feel restricted but savings grow. Delayed gratification pays off.`;
  }
  return `Moderate financial flow for ${moon} Moon. Budget wisely and avoid impulse purchases. Steady savings recommended.`;
}

function getDetailedRelationships(moon: string, jupiter: number, month: string): string {
  if (jupiter === 7) {
    return `Excellent for partnerships and ${moon} Moon emotional connections. Marriage proposals or improved harmony likely. Express feelings openly.`;
  } else if (jupiter === 5) {
    return `Romantic opportunities bloom for ${moon} Moon natives. Creative expression of love favored. Children matters positive.`;
  } else if (jupiter === 11) {
    return `Social expansion and friendships highlighted. ${moon} Moon benefits from networking. Support from friends and elder siblings.`;
  }
  return `Steady relationship energy for ${moon} Moon. Focus on clear communication and emotional honesty. Quality time matters.`;
}

function getDetailedHealth(asc: string, moon: string, saturn: number, month: string): string {
  if (saturn === 1 || saturn === 8) {
    return `Extra health attention needed for ${asc} Ascendant. Regular checkups recommended. ${moon} Moon benefits from stress management.`;
  } else if (saturn === 6) {
    return `Good month for establishing health routines. ${asc} rising can overcome chronic issues. Discipline brings results.`;
  }
  return `Maintain regular wellness habits for ${asc} Ascendant. ${moon} Moon benefits from consistent sleep and exercise routines.`;
}

function getMoonSignMonthlyTip(moonSign: string, month: string): string {
  const tips: Record<string, Record<string, string>> = {
    Aries: {
      January: 'Channel your new year energy into structured goals rather than scattered initiatives.',
      February: 'Patience in love matters - your directness serves you but timing is everything.',
      March: 'Celebrate freely but budget wisely for the financial year ahead.',
      April: 'Your leadership shines - take initiative on projects close to your heart.',
      May: 'Adapt to changing energies with flexibility. Avoid impulsive decisions.',
      June: 'Mid-year review time. Assess what\'s working and pivot where needed.',
      July: 'Honor your teachers and mentors. Their guidance accelerates your path.',
      August: 'Family bonds strengthen through your protective nature. Lead by example.',
      September: 'Ganesha removes obstacles - identify what needs releasing.',
      October: 'Victory energy peaks. Bold moves succeed now.',
      November: 'Manifest abundance through focused intention. Light your inner fire.',
      December: 'Reflect on victories and plan next year\'s conquests.'
    },
    Taurus: {
      January: 'Build slowly and steadily. Your patience is your superpower this month.',
      February: 'Sensuality and spirituality merge - honor both aspects of your nature.',
      March: 'Enjoy festivities but maintain financial boundaries.',
      April: 'Ground your new year intentions in practical action steps.',
      May: 'Major investments favored on Akshaya Tritiya. Trust your instincts.',
      June: 'Comfort-seeking is natural but push beyond your comfort zone for growth.',
      July: 'Your steady presence supports others through monsoon challenges.',
      August: 'Family traditions nourish your soul. Participate wholeheartedly.',
      September: 'Release attachment to outcomes. Trust the process.',
      October: 'Material abundance flows - receive graciously.',
      November: 'Lakshmi blesses your practical approach to wealth.',
      December: 'Create a cozy sanctuary for reflection and planning.'
    },
    Gemini: {
      January: 'Focus your scattered energy on one major goal.',
      February: 'Communicate your heart\'s desires clearly to loved ones.',
      March: 'Social butterfly energy peaks - network purposefully.',
      April: 'Your curiosity leads to valuable discoveries.',
      May: 'Jupiter enters your sign - major year of expansion begins!',
      June: 'New possibilities overwhelm - prioritize ruthlessly.',
      July: 'Learning accelerates. Take that course you\'ve been considering.',
      August: 'Express love through words and thoughtful gestures.',
      September: 'Write down your goals - Ganesha favors the prepared mind.',
      October: 'Variety in celebrations suits you. Attend multiple events.',
      November: 'Financial communication with family brings clarity.',
      December: 'Document your year\'s learnings. Share wisdom gained.'
    },
    Cancer: {
      January: 'Nurture your new year intentions like precious seeds.',
      February: 'Emotional depth in relationships brings fulfillment.',
      March: 'Home-based celebrations bring more joy than external ones.',
      April: 'Family traditions anchor you during change.',
      May: 'Emotional security may feel shaky during transitions. This passes.',
      June: 'Create sanctuary at home. Your space reflects your inner state.',
      July: 'Monsoon matches your emotional depth. Embrace introspection.',
      August: 'Family bonds are your greatest treasure. Invest time here.',
      September: 'Ancestor honoring during Pitru Paksha is especially powerful for you.',
      October: 'Goddess energy nurtures your protective instincts.',
      November: 'Diwali at home with family creates lasting memories.',
      December: 'Emotional closure on the year prepares you for fresh starts.'
    },
    Leo: {
      January: 'Set regal intentions worthy of your magnificent nature.',
      February: 'Romance flourishes when you balance giving and receiving.',
      March: 'You shine at celebrations - just don\'t overshadow others.',
      April: 'Lead dharmic initiatives. Your example inspires many.',
      May: 'Behind-the-scenes work prepares your next grand entrance.',
      June: 'Recalibrate your self-image for the second half of year.',
      July: 'Generosity to teachers returns manifold blessings.',
      August: 'Independence Day matches your noble spirit. Lead with pride.',
      September: 'Humility before Ganesha opens blocked paths.',
      October: 'Your natural command over situations brings victory.',
      November: 'Illuminate others\' lives - your light multiplies when shared.',
      December: 'Gracefully acknowledge those who supported your year\'s journey.'
    },
    Virgo: {
      January: 'Perfect your systems and routines for the year ahead.',
      February: 'Spiritual practices benefit from your attention to detail.',
      March: 'Analyze your finances before the new fiscal year.',
      April: 'Your practical approach yields tangible results.',
      May: 'Adaptation requires releasing perfectionism temporarily.',
      June: 'Health routines established now serve you all year.',
      July: 'Service to others brings unexpected rewards.',
      August: 'Express love through practical support and presence.',
      September: 'Your analytical skills help others remove obstacles.',
      October: 'Attention to ritual details enhances spiritual power.',
      November: 'Organize Diwali preparations - your skills shine here.',
      December: 'Review and improve systems for maximum efficiency next year.'
    },
    Libra: {
      January: 'Seek balance between ambition and partnership needs.',
      February: 'Valentine\'s energy particularly strong for you. Express love beautifully.',
      March: 'Social harmony at celebrations - you\'re the natural diplomat.',
      April: 'Fairness in all dealings brings karmic rewards.',
      May: 'Relationships shift as energies change. Communicate openly.',
      June: 'Partner support helps you integrate new opportunities.',
      July: 'Harmony at home supports all other areas of life.',
      August: 'Sibling relationships benefit from your diplomatic approach.',
      September: 'Balance inner and outer spiritual practices.',
      October: 'Goddess Durga energy empowers your graceful strength.',
      November: 'Beautiful celebrations create lasting positive impressions.',
      December: 'Reflect on relationship growth and set partnership goals.'
    },
    Scorpio: {
      January: 'Transform your approach to goals - depth over breadth.',
      February: 'Shivaratri resonates deeply with your transformative nature.',
      March: 'Celebrate authentically - superficiality doesn\'t serve you.',
      April: 'Intense focus yields breakthrough results.',
      May: 'Major transformation energy - embrace change courageously.',
      June: 'Research and investigation reveal hidden opportunities.',
      July: 'Emotional depth connects you with true mentors.',
      August: 'Protect family with your characteristic loyalty.',
      September: 'Ancestral healing particularly powerful for you.',
      October: 'Your regenerative power peaks during this victory period.',
      November: 'Wealth secrets reveal themselves to the patient observer.',
      December: 'Deep reflection transforms next year\'s potential.'
    },
    Sagittarius: {
      January: 'Aim your arrows at worthy long-term targets.',
      February: 'Philosophical depth enriches your spiritual practice.',
      March: 'Adventure calls - plan a meaningful journey.',
      April: 'Teaching and sharing wisdom multiplies your blessings.',
      May: 'Health and daily routines need optimization.',
      June: 'Relationships require more attention now.',
      July: 'Your natural teaching ability honors Guru Purnima.',
      August: 'Freedom and responsibility balance in family matters.',
      September: 'Higher learning opens new horizons.',
      October: 'Victory through optimism and faith.',
      November: 'Generous Diwali celebrations spread your natural joy.',
      December: 'Plan adventures and learning goals for next year.'
    },
    Capricorn: {
      January: 'Your annual power month - set ambitious yet realistic goals.',
      February: 'Discipline in spiritual practices yields lasting results.',
      March: 'Financial planning is your strength - use it wisely.',
      April: 'Career advancement through methodical effort.',
      May: 'Health routines need attention during energy shift.',
      June: 'Relationships and partnerships require balance.',
      July: 'Structure supports emotional expression this monsoon.',
      August: 'Duty and family obligations bring satisfaction when embraced.',
      September: 'Practical spirituality removes obstacles effectively.',
      October: 'Disciplined effort brings well-deserved victory.',
      November: 'Conservative financial approach serves Diwali celebrations well.',
      December: 'Strategic planning for next year is your gift to yourself.'
    },
    Aquarius: {
      January: 'Innovative approaches to old goals bring fresh energy.',
      February: 'Unconventional spiritual paths call to you.',
      March: 'Community celebrations match your social nature.',
      April: 'Humanitarian projects gain momentum.',
      May: 'Creative adaptation to change suits your nature.',
      June: 'Group activities and friendships flourish.',
      July: 'Alternative healing modalities benefit your health.',
      August: 'Freedom within family structures creates harmony.',
      September: 'Innovative solutions remove long-standing obstacles.',
      October: 'Victory through unique approaches others haven\'t tried.',
      November: 'Celebrate Diwali with your chosen family and community.',
      December: 'Visionary planning shapes an inspired new year.'
    },
    Pisces: {
      January: 'Dreams and intuition guide your goal-setting.',
      February: 'Spiritual depths open during Shivaratri.',
      March: 'Creative celebration expression brings joy.',
      April: 'Compassionate service aligns with dharmic energy.',
      May: 'Home and emotional security themes intensify.',
      June: 'Creativity and romance interweave beautifully.',
      July: 'Monsoon meditation brings profound insights.',
      August: 'Devotional practices strengthen family bonds.',
      September: 'Ancestor connections feel especially vivid.',
      October: 'Surrender leads to victory - trust the process.',
      November: 'Artistic and spiritual Diwali celebrations nourish your soul.',
      December: 'Dream big for next year - then ground those dreams in action.'
    }
  };

  return tips[moonSign]?.[month] || `Trust your ${moonSign} intuition this ${month}. Honor your emotional needs while pursuing practical goals.`;
}
