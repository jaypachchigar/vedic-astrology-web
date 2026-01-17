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
  const ascTraits = getAscendantCareerTraits(asc);
  const dashaEnergy = getDashaCareerEnergy(dasha);

  const monthlyCareer: Record<string, string> = {
    'January': `New year momentum favors ${asc} Ascendant professionals. ${ascTraits.strength} combined with fresh energy creates openings. ${dashaEnergy.january} Priority: Set clear quarterly objectives and initiate key projects. Network with senior colleagues who can mentor your growth. Best sectors: ${ascTraits.sectors}.`,
    'February': `Building on January's foundation, ${asc} rising gains recognition for consistent effort. ${ascTraits.communication} skills matter now. ${dashaEnergy.february} Focus on completing pending tasks before Holi. Creative presentations and proposals get noticed. Collaborate rather than compete this month.`,
    'March': `Financial year-end intensity for ${asc} Ascendant. ${ascTraits.strength} helps navigate deadlines and evaluations. ${dashaEnergy.march} Performance reviews likely - showcase your achievements confidently. Tax planning may affect salary decisions. Avoid job changes until April.`,
    'April': `Fresh fiscal year energy empowers ${asc} rising. New budgets mean new opportunities for ambitious projects. ${dashaEnergy.april} ${ascTraits.leadership} can secure better roles now. Ideal for salary negotiations, role expansions, or starting new ventures. Take initiative boldly.`,
    'May': `MAJOR SHIFT: Jupiter transit changes career dynamics. ${asc} Ascendant should adapt strategies to new planetary energy. ${dashaEnergy.may} Some instability possible as workplace dynamics shift. Stay flexible and avoid burning bridges. Professional learning opportunities emerge mid-month.`,
    'June': `Adjustment period for ${asc} rising as Jupiter settles into new position. ${ascTraits.adaptability} serves you well. ${dashaEnergy.june} Focus on building alliances and understanding shifted power dynamics. Mid-year reviews benefit from prepared documentation of achievements.`,
    'July': `Health-conscious work approach benefits ${asc} Ascendant now. ${ascTraits.discipline} helps establish sustainable routines. ${dashaEnergy.july} Guru Purnima energy supports learning from workplace mentors. Technical skill upgrades highly beneficial. Avoid overcommitting to new projects.`,
    'August': `Leadership energy peaks for ${asc} rising during Independence Day period. ${ascTraits.authority} gains recognition. ${dashaEnergy.august} Team management skills showcased. Family business matters may need attention. Sibling partnerships in business favored. Balance ambition with family obligations.`,
    'September': `Problem-solving skills of ${asc} Ascendant shine during Ganesh Chaturthi energy. ${ascTraits.analytical} approach removes obstacles. ${dashaEnergy.september} Good month for clearing backlogs and resolving pending issues. Ancestral blessings support career if you honor Pitru Paksha appropriately.`,
    'October': `Victory energy of Navratri empowers ${asc} rising for major career moves. ${ascTraits.confidence} attracts success. ${dashaEnergy.october} Excellent for promotions, new job offers, or business expansion. Competition results favor the prepared. Take bold but calculated risks now.`,
    'November': `Diwali prosperity extends to career for ${asc} Ascendant. ${ascTraits.networking} brings valuable connections. ${dashaEnergy.november} Bonus announcements and recognition likely. Business dealings particularly auspicious around Dhanteras. Maintain momentum despite holiday distractions.`,
    'December': `Reflective period for ${asc} rising to assess year's growth and plan ahead. ${ascTraits.strategy} guides next year's vision. ${dashaEnergy.december} Complete pending projects before year-end. Set up systems for successful 2027. Network at year-end gatherings strategically.`
  };

  return monthlyCareer[month] || `Career focus month for ${asc} Ascendant with ${dasha} Dasha energy supporting professional growth.`;
}

function getDetailedFinance(moon: string, jupiter: number, saturn: number, month: string): string {
  const moonTraits = getMoonFinanceTraits(moon);

  const monthlyFinance: Record<string, string> = {
    'January': `New financial beginnings for ${moon} Moon. ${moonTraits.approach} helps set realistic budgets. Focus on clearing holiday debt and establishing savings goals. Best investments: ${moonTraits.investments}. Avoid major purchases until after Makar Sankranti analysis.`,
    'February': `${moon} Moon benefits from reviewing January spending patterns. ${moonTraits.discipline} matters for long-term wealth. Spiritual investments (donations, charity) create positive karma. Relationship expenses may increase - budget accordingly. Short-term FDs mature favorably.`,
    'March': `Financial year-end critical for ${moon} Moon. ${moonTraits.planning} guides tax-saving investments. File returns promptly. Review insurance policies and increment expectations. Avoid speculative investments until April. Close unnecessary subscriptions and memberships.`,
    'April': `Fresh fiscal energy for ${moon} Moon natives. ${moonTraits.optimism} about new opportunities justified. Salary increments process now. New SIPs and investment plans highly auspicious to begin. ${moonTraits.sectors} show particular promise. Update financial goals with realistic targets.`,
    'May': `MAJOR: Akshaya Tritiya (early May) exceptionally auspicious for ${moon} Moon investments. ${moonTraits.intuition} guides golden opportunities. Gold, property, and long-term assets favored. Jupiter shift may create short-term market volatility - hold steady. Avoid emotional financial decisions.`,
    'June': `Mid-year financial review essential for ${moon} Moon. ${moonTraits.analysis} reveals what's working. Adjust portfolios based on first-half performance. Summer expenses (travel, AC bills) need budgeting. Consider monsoon-proof investments and insurance reviews.`,
    'July': `${moon} Moon should prioritize financial health over aggressive growth now. ${moonTraits.caution} serves well during monsoon uncertainties. Emergency funds particularly important. Avoid lending money to friends. Good month for financial literacy - take that investing course.`,
    'August': `Family financial matters prominent for ${moon} Moon. ${moonTraits.generosity} balanced with practicality. Rakhi and festival advance expenses need planning. Sibling financial discussions may arise. Property matters with family show progress. Insurance for family members worth considering.`,
    'September': `${moon} Moon should address ancestral property or inheritance matters during Pitru Paksha. ${moonTraits.karma} related to money may surface. Clear old debts where possible. Donations to worthy causes create positive financial karma. Avoid new loans this month.`,
    'October': `Excellent wealth month for ${moon} Moon during Navratri-Dussehra energy. ${moonTraits.prosperity} peaks. Major purchases (vehicles, electronics, property) highly auspicious. Business expansion well-starred. Victory over financial obstacles through persistent effort.`,
    'November': `Peak financial auspiciousness for ${moon} Moon during Dhanteras-Diwali. ${moonTraits.abundance} manifests. Gold, silver, and asset purchases most favorable. Business turnover increases. Lakshmi puja investments blessed. Year-end bonus utilization important - invest before spending.`,
    'December': `Financial year review for ${moon} Moon. ${moonTraits.reflection} guides next year's strategy. Tax-saving investments need completion by mid-month. Set financial goals for 2027. Create budget for January expenses and new year celebrations. Portfolio rebalancing favorable.`
  };

  return monthlyFinance[month] || `Financial focus for ${moon} Moon with attention to ${moonTraits.focus}.`;
}

function getDetailedRelationships(moon: string, jupiter: number, month: string): string {
  const moonTraits = getMoonRelationshipTraits(moon);

  const monthlyRelationships: Record<string, string> = {
    'January': `Fresh start energy benefits ${moon} Moon relationships. ${moonTraits.expression} sets positive tone for the year. Communicate your needs clearly to partner. Singles may meet interesting people at new year gatherings. Family relationships benefit from quality time over quantity.`,
    'February': `Peak romance month for ${moon} Moon! Valentine's energy amplifies ${moonTraits.love}. Express affection generously. Existing relationships deepen through meaningful gestures. Singles should actively socialize - destiny meets effort. Vasant Panchami energy enhances creative date ideas.`,
    'March': `${moon} Moon relationships tested by end-of-year stress. ${moonTraits.patience} prevents unnecessary conflicts. Holi celebrations unite families - participate wholeheartedly. Forgive old hurts during this festival of colors. Work-life balance affects relationship quality.`,
    'April': `New energy for ${moon} Moon partnerships. ${moonTraits.initiative} attracts positive attention. Spring weddings in social circle may inspire commitment thoughts. Family gatherings during Ram Navami strengthen bonds. Be open to unexpected romantic connections.`,
    'May': `Relationship dynamics shift with Jupiter transit for ${moon} Moon. ${moonTraits.adaptability} helps navigate changes. Some relationships may feel unstable temporarily. Akshaya Tritiya auspicious for engagements or marriage decisions. Communicate openly about changing needs.`,
    'June': `${moon} Moon should focus on relationship stability now. ${moonTraits.nurturing} creates safe emotional space. Partner may need extra support during transitions. Family planning discussions favored. Long-distance relationships require extra effort. Quality conversation over quantity.`,
    'July': `Guru Purnima honors relationship teachers for ${moon} Moon - mentors, elders, and wise partners. ${moonTraits.respect} shown to such figures brings blessings. Monsoon romance has special charm. Family relationships benefit from indoor quality time. Address communication patterns needing improvement.`,
    'August': `Family bonds central for ${moon} Moon during Raksha Bandhan. ${moonTraits.protection} extends to loved ones. Sibling relationships highlighted. Partner's family connections strengthen. Express gratitude to those who support you. Romance infused with devotional energy during Janmashtami.`,
    'September': `Ancestor blessings affect ${moon} Moon relationships during Pitru Paksha. ${moonTraits.heritage} influences partner choice. Family patterns may need healing. Honor relationship wisdom from elders. Ganesha energy removes obstacles in love. Address lingering relationship issues before Navratri.`,
    'October': `Victory in love for ${moon} Moon during Navratri energy. ${moonTraits.power} attracts compatible partners. Excellent for engagements, marriages, and commitment ceremonies. Goddess energy empowers feminine expression in relationships. Dussehra marks triumph over relationship obstacles.`,
    'November': `Diwali brings relationship light for ${moon} Moon. ${moonTraits.celebration} shared with loved ones creates lasting memories. Partner appreciation especially meaningful now. Family harmony peaks during festivities. Bhai Dooj strengthens sibling bonds. Singles may meet partners through family introductions.`,
    'December': `Year-end relationship reflection for ${moon} Moon. ${moonTraits.gratitude} expressed to partner and family. Evaluate relationship growth and set intentions for next year. Holiday gatherings strengthen extended family ties. Plan meaningful New Year celebration with loved ones.`
  };

  return monthlyRelationships[month] || `Relationship focus for ${moon} Moon emphasizing ${moonTraits.strength}.`;
}

function getDetailedHealth(asc: string, moon: string, saturn: number, month: string): string {
  const ascHealth = getAscendantHealthFocus(asc);
  const moonHealth = getMoonHealthFocus(moon);

  const monthlyHealth: Record<string, string> = {
    'January': `New health resolutions for ${asc} Ascendant. ${ascHealth.focus} deserves primary attention. Cold weather requires ${moonHealth.winterCare}. Begin the exercise routine you've been planning. Immunity building important during season change. Annual health checkup ideal now.`,
    'February': `${asc} rising should maintain January health momentum. ${ascHealth.cardiovascular} attention during cooler weather. ${moonHealth.emotional} wellness through Shivaratri fasting. Skin care routine for changing weather. Sleep patterns may need adjustment as days lengthen.`,
    'March': `Spring allergies may affect ${asc} Ascendant. ${ascHealth.respiratory} care important. Holi colors require skin and eye protection. ${moonHealth.detox} beneficial during season change. Increase hydration as temperatures rise. Work stress may affect ${ascHealth.stress} areas.`,
    'April': `Heat beginning for ${asc} rising - adjust routines accordingly. ${ascHealth.cooling} measures important. ${moonHealth.hydration} critical as summer approaches. Morning exercise before heat peaks. Digestive care with seasonal diet adjustments. Eye strain from increased work may need attention.`,
    'May': `Summer intensity begins for ${asc} Ascendant. ${ascHealth.heat} precautions essential. ${moonHealth.emotional} stability may fluctuate with planetary transitions. Stay cool, hydrated, and avoid afternoon sun exposure. Light, cooling foods recommended. Sleep quality may need attention.`,
    'June': `Mid-year health review for ${asc} rising. ${ascHealth.systems} may need professional assessment. Pre-monsoon health preparations important. ${moonHealth.immunity} focus as season changes. Dental checkups before monsoon. Digestive system preparation for heavier monsoon foods.`,
    'July': `Monsoon health challenges for ${asc} Ascendant. ${ascHealth.monsoon} issues common now. ${moonHealth.waterborne} prevention critical. Indoor exercise alternatives needed. Fungal infections require vigilance. Mental health support through indoor activities. Fresh, home-cooked food preferred.`,
    'August': `${asc} rising continues monsoon health vigilance. ${ascHealth.joints} may feel weather effects. ${moonHealth.seasonal} adjustments maintain wellbeing. Family health matters during festival preparations. Sibling health may need your attention. Balance festive indulgence with wellness.`,
    'September': `Transition period for ${asc} Ascendant health. ${ascHealth.digestion} tested during festival season. Ganesh Chaturthi modak consumption needs moderation. ${moonHealth.spiritual} fasting during Pitru Paksha beneficial if done mindfully. Weather stabilization helps outdoor activities resume.`,
    'October': `Post-monsoon health optimization for ${asc} rising. ${ascHealth.recovery} from seasonal stresses. Navratri fasting can be ${moonHealth.fasting} - approach wisely. Increased physical activity as weather improves. Prepare body for winter with immunity building. Festive late nights need recovery time.`,
    'November': `Festival health balance for ${asc} Ascendant. ${ascHealth.festive} challenges include sweets, late nights, and pollution. Diwali pollution precautions for ${moonHealth.respiratory}. Maintain exercise despite celebrations. Post-Diwali detox beneficial. Winter preparation begins now.`,
    'December': `Winter wellness focus for ${asc} rising. ${ascHealth.cold} weather adaptations needed. ${moonHealth.immunity} support through seasonal foods and supplements. Year-end reflection on health goals achieved and pending. Set realistic 2027 health intentions. Holiday stress management important.`
  };

  return monthlyHealth[month] || `Health focus for ${asc} Ascendant with attention to ${ascHealth.priority} and ${moonHealth.priority}.`;
}

// Helper functions for traits
function getAscendantCareerTraits(asc: string): Record<string, string> {
  const traits: Record<string, Record<string, string>> = {
    Aries: { strength: 'Pioneering initiative', communication: 'Direct and assertive', leadership: 'Natural command', adaptability: 'Quick pivoting', discipline: 'Action-oriented focus', authority: 'Bold decision-making', analytical: 'Fast problem assessment', confidence: 'Courageous presence', networking: 'Energetic connections', strategy: 'Competitive positioning', sectors: 'Sports, military, entrepreneurship, surgery' },
    Taurus: { strength: 'Persistent reliability', communication: 'Steady and thoughtful', leadership: 'Stable guidance', adaptability: 'Gradual adjustment', discipline: 'Consistent routines', authority: 'Dependable presence', analytical: 'Thorough evaluation', confidence: 'Grounded assurance', networking: 'Long-term relationship building', strategy: 'Resource accumulation', sectors: 'Finance, agriculture, luxury goods, real estate' },
    Gemini: { strength: 'Versatile communication', communication: 'Articulate and engaging', leadership: 'Idea generation', adaptability: 'Multi-tasking agility', discipline: 'Information management', authority: 'Intellectual influence', analytical: 'Quick data processing', confidence: 'Witty charm', networking: 'Social butterfly skills', strategy: 'Information leverage', sectors: 'Media, writing, trading, education, technology' },
    Cancer: { strength: 'Intuitive management', communication: 'Empathetic listening', leadership: 'Nurturing guidance', adaptability: 'Emotional intelligence', discipline: 'Protective consistency', authority: 'Caring influence', analytical: 'Intuitive assessment', confidence: 'Supportive presence', networking: 'Relationship depth', strategy: 'Team loyalty building', sectors: 'Healthcare, hospitality, food, real estate, childcare' },
    Leo: { strength: 'Charismatic leadership', communication: 'Commanding presence', leadership: 'Natural authority', adaptability: 'Dignified pivoting', discipline: 'Performance excellence', authority: 'Regal command', analytical: 'Big-picture vision', confidence: 'Magnetic self-assurance', networking: 'High-profile connections', strategy: 'Reputation building', sectors: 'Entertainment, politics, luxury brands, senior management' },
    Virgo: { strength: 'Analytical precision', communication: 'Detail-oriented clarity', leadership: 'Service-oriented guidance', adaptability: 'Systematic adjustment', discipline: 'Methodical routines', authority: 'Expert credibility', analytical: 'Critical evaluation', confidence: 'Competence-based assurance', networking: 'Professional expertise sharing', strategy: 'Process optimization', sectors: 'Healthcare, accounting, quality control, editing, analytics' },
    Libra: { strength: 'Diplomatic negotiation', communication: 'Balanced articulation', leadership: 'Consensus building', adaptability: 'Harmonious adjustment', discipline: 'Aesthetic standards', authority: 'Fair mediation', analytical: 'Balanced assessment', confidence: 'Graceful charm', networking: 'Partnership cultivation', strategy: 'Alliance formation', sectors: 'Law, design, HR, diplomacy, fashion, arts' },
    Scorpio: { strength: 'Intense focus and research', communication: 'Probing and perceptive', leadership: 'Transformative guidance', adaptability: 'Strategic regeneration', discipline: 'Unwavering determination', authority: 'Psychological insight', analytical: 'Deep investigation', confidence: 'Powerful presence', networking: 'Strategic alliances', strategy: 'Resource control', sectors: 'Research, psychology, surgery, investigation, occult sciences' },
    Sagittarius: { strength: 'Visionary expansion', communication: 'Inspiring and philosophical', leadership: 'Guiding toward higher goals', adaptability: 'Optimistic pivoting', discipline: 'Freedom with purpose', authority: 'Wisdom-based influence', analytical: 'Pattern recognition', confidence: 'Enthusiastic optimism', networking: 'Global connections', strategy: 'Growth orientation', sectors: 'Education, travel, publishing, law, philosophy, sports' },
    Capricorn: { strength: 'Disciplined achievement', communication: 'Professional and measured', leadership: 'Structural authority', adaptability: 'Calculated adjustment', discipline: 'Systematic persistence', authority: 'Established credibility', analytical: 'Pragmatic evaluation', confidence: 'Earned respect', networking: 'Status-based connections', strategy: 'Long-term positioning', sectors: 'Government, corporate leadership, construction, banking' },
    Aquarius: { strength: 'Innovative problem-solving', communication: 'Progressive and unique', leadership: 'Humanitarian guidance', adaptability: 'Revolutionary thinking', discipline: 'Unconventional consistency', authority: 'Thought leadership', analytical: 'Systems thinking', confidence: 'Independent assurance', networking: 'Community building', strategy: 'Disruption planning', sectors: 'Technology, social causes, innovation, space, electronics' },
    Pisces: { strength: 'Intuitive creativity', communication: 'Empathetic and artistic', leadership: 'Compassionate guidance', adaptability: 'Flowing adjustment', discipline: 'Inspired dedication', authority: 'Spiritual influence', analytical: 'Intuitive understanding', confidence: 'Gentle presence', networking: 'Soul connections', strategy: 'Creative visioning', sectors: 'Arts, healing, spirituality, film, charity, marine industries' }
  };
  return traits[asc] || traits.Aries;
}

function getDashaCareerEnergy(dasha: string): Record<string, string> {
  const energies: Record<string, Record<string, string>> = {
    Sun: { january: 'Authority and recognition themes emerge.', february: 'Government or leadership opportunities.', march: 'Performance evaluation favors confidence.', april: 'New leadership roles possible.', may: 'Transition in authority dynamics.', june: 'Ego adjustments in workplace.', july: 'Health impacts career energy.', august: 'Father/authority figure influences career.', september: 'Recognition for past efforts.', october: 'Victory in competitive situations.', november: 'Prosperity through leadership.', december: 'Strategic positioning for next year.' },
    Moon: { january: 'Emotional intelligence valued.', february: 'Intuition guides career decisions.', march: 'Public-facing roles highlighted.', april: 'Nurturing leadership appreciated.', may: 'Mood fluctuations affect focus.', june: 'Work-life balance critical.', july: 'Mother/women influence career.', august: 'Emotional connections at work.', september: 'Past patterns affect present.', october: 'Public recognition possible.', november: 'Home-work harmony needed.', december: 'Reflective career planning.' },
    Mars: { january: 'Action-oriented initiatives succeed.', february: 'Competition intensifies.', march: 'Aggressive goal pursuit.', april: 'New ventures highly favored.', may: 'Energy shifts require channeling.', june: 'Conflict resolution skills tested.', july: 'Physical energy affects work.', august: 'Leadership through courage.', september: 'Obstacles overcome through effort.', october: 'Victory through determination.', november: 'Achievement recognition.', december: 'Strategic planning for battles ahead.' },
    Mercury: { january: 'Communication skills shine.', february: 'Networking brings opportunities.', march: 'Documentation and analysis.', april: 'Business deals favorable.', may: 'Learning new skills essential.', june: 'Information management critical.', july: 'Technical skills development.', august: 'Writing/speaking opportunities.', september: 'Problem-solving showcased.', october: 'Intellectual victories.', november: 'Business prosperity.', december: 'Planning and strategizing.' },
    Jupiter: { january: 'Wisdom guides career moves.', february: 'Teaching/mentoring roles.', march: 'Growth and expansion.', april: 'Fortune favors career.', may: 'Major opportunities emerge.', june: 'Guidance from seniors.', july: 'Guru/mentor connections.', august: 'Dharmic career alignment.', september: 'Higher purpose work.', october: 'Luck in competitive situations.', november: 'Prosperity and abundance.', december: 'Vision for growth.' },
    Venus: { january: 'Diplomacy and charm effective.', february: 'Creative projects succeed.', march: 'Aesthetic work valued.', april: 'Partnerships and collaborations.', may: 'Luxury sector opportunities.', june: 'Relationship-based career moves.', july: 'Beauty/arts fields favored.', august: 'Harmonious work environment.', september: 'Creative problem-solving.', october: 'Artistic recognition.', november: 'Wealth through beauty.', december: 'Relationship planning.' },
    Saturn: { january: 'Discipline brings results.', february: 'Hard work required.', march: 'Slow but steady progress.', april: 'Structure and systems.', may: 'Challenges build character.', june: 'Persistence pays off.', july: 'Health/routine balance.', august: 'Karmic work lessons.', september: 'Ancestral career patterns.', october: 'Delayed but certain success.', november: 'Earned prosperity.', december: 'Long-term strategic planning.' },
    Rahu: { january: 'Unconventional opportunities.', february: 'Foreign/technology connections.', march: 'Ambitious pursuits.', april: 'Risk-taking favored.', may: 'Major transitions possible.', june: 'Unusual career paths.', july: 'Research and innovation.', august: 'Breaking career barriers.', september: 'Obsessive focus.', october: 'Bold moves succeed.', november: 'Material gains.', december: 'Future visioning.' },
    Ketu: { january: 'Spiritual career aspects.', february: 'Past life skills emerge.', march: 'Letting go of attachments.', april: 'Research and investigation.', may: 'Disconnection and reconnection.', june: 'Inner career calling.', july: 'Healing professions.', august: 'Subtle influences at work.', september: 'Ancestral career wisdom.', october: 'Unexpected breakthroughs.', november: 'Moksha in work.', december: 'Reflective detachment.' }
  };
  return energies[dasha] || energies.Jupiter;
}

function getMoonFinanceTraits(moon: string): Record<string, string> {
  const traits: Record<string, Record<string, string>> = {
    Aries: { approach: 'Bold financial decision-making', discipline: 'Impulsive spending control', planning: 'Quick investment decisions', optimism: 'Confidence in financial risks', intuition: 'Instinctive money moves', analysis: 'Fast financial assessment', caution: 'Impatience with slow returns', generosity: 'Generous but expects returns', karma: 'Action-based wealth karma', prosperity: 'Entrepreneurial gains', abundance: 'Victory-based wealth', reflection: 'Competitive financial review', investments: 'startups, sports, adventure ventures', sectors: 'aggressive growth funds', focus: 'impulse control and strategic patience' },
    Taurus: { approach: 'Conservative wealth building', discipline: 'Natural financial stability', planning: 'Long-term investment focus', optimism: 'Material security confidence', intuition: 'Sensible money instincts', analysis: 'Thorough value assessment', caution: 'Resistance to necessary risks', generosity: 'Selective but loyal giving', karma: 'Material accumulation patterns', prosperity: 'Steady wealth growth', abundance: 'Comfort-based prosperity', reflection: 'Asset appreciation review', investments: 'real estate, gold, fixed deposits', sectors: 'stable dividend stocks', focus: 'flexibility while maintaining security' },
    Gemini: { approach: 'Diversified portfolio thinking', discipline: 'Variable savings patterns', planning: 'Multiple income streams', optimism: 'Curiosity about opportunities', intuition: 'Information-based decisions', analysis: 'Quick comparison shopping', caution: 'Scattered financial focus', generosity: 'Intellectually motivated giving', karma: 'Communication-based wealth', prosperity: 'Trading and exchange gains', abundance: 'Multiple revenue streams', reflection: 'Data-driven financial review', investments: 'tech stocks, media, education', sectors: 'dynamic trading opportunities', focus: 'concentration and follow-through' },
    Cancer: { approach: 'Security-focused saving', discipline: 'Emotional spending awareness', planning: 'Family financial security', optimism: 'Home investment confidence', intuition: 'Strong money instincts', analysis: 'Protective wealth assessment', caution: 'Fear-based hoarding tendency', generosity: 'Nurturing family giving', karma: 'Ancestral wealth patterns', prosperity: 'Real estate and home gains', abundance: 'Family-centered wealth', reflection: 'Emotional financial review', investments: 'property, food industry, healthcare', sectors: 'defensive stocks and bonds', focus: 'overcoming money fears' },
    Leo: { approach: 'Generous wealth expression', discipline: 'Pride prevents poor decisions', planning: 'Status-conscious investing', optimism: 'Confident abundance mindset', intuition: 'Heart-guided investments', analysis: 'Big-picture financial view', caution: 'Ego-driven overspending', generosity: 'Grand and visible giving', karma: 'Recognition-based wealth', prosperity: 'Entertainment and leadership gains', abundance: 'Regal wealth manifestation', reflection: 'Achievement-based review', investments: 'entertainment, luxury brands', sectors: 'prestigious opportunities', focus: 'sustainable vs. showy spending' },
    Virgo: { approach: 'Analytical wealth management', discipline: 'Detailed budget tracking', planning: 'Precise financial planning', optimism: 'Practical confidence', intuition: 'Calculated risk assessment', analysis: 'Thorough research before investing', caution: 'Over-analysis paralysis', generosity: 'Service-oriented giving', karma: 'Work-based wealth karma', prosperity: 'Systematic wealth building', abundance: 'Earned through service', reflection: 'Detailed account review', investments: 'healthcare, analytics, quality goods', sectors: 'value investments', focus: 'analysis paralysis prevention' },
    Libra: { approach: 'Balanced portfolio allocation', discipline: 'Partner-influenced spending', planning: 'Fair financial arrangements', optimism: 'Harmonious abundance belief', intuition: 'Aesthetic value sensing', analysis: 'Comparative assessment', caution: 'Indecision about investments', generosity: 'Relationship-motivated giving', karma: 'Partnership wealth patterns', prosperity: 'Beauty and harmony gains', abundance: 'Shared prosperity', reflection: 'Balanced review process', investments: 'fashion, design, partnerships', sectors: 'luxury and beauty sectors', focus: 'independent financial decisions' },
    Scorpio: { approach: 'Strategic wealth accumulation', discipline: 'Intense financial focus', planning: 'Deep financial research', optimism: 'Transformation confidence', intuition: 'Powerful money instincts', analysis: 'Investigative due diligence', caution: 'Suspicious of opportunities', generosity: 'Selective deep giving', karma: 'Transformative wealth lessons', prosperity: 'Research and inheritance gains', abundance: 'Hidden wealth revelation', reflection: 'Profound financial review', investments: 'research, psychology, insurance', sectors: 'undervalued opportunities', focus: 'releasing money fears and control' },
    Sagittarius: { approach: 'Optimistic wealth expansion', discipline: 'Philosophical spending view', planning: 'Growth-oriented investing', optimism: 'Faith in financial growth', intuition: 'Lucky money instincts', analysis: 'Big-picture assessment', caution: 'Overconfidence in risks', generosity: 'Generous philosophical giving', karma: 'Teaching and travel wealth', prosperity: 'Education and expansion gains', abundance: 'Global wealth vision', reflection: 'Wisdom-based review', investments: 'education, travel, publishing', sectors: 'international opportunities', focus: 'grounding optimism in reality' },
    Capricorn: { approach: 'Disciplined wealth building', discipline: 'Natural financial discipline', planning: 'Long-term strategic planning', optimism: 'Earned success confidence', intuition: 'Practical money sense', analysis: 'Thorough risk assessment', caution: 'Over-conservative tendencies', generosity: 'Status-conscious giving', karma: 'Hard work wealth karma', prosperity: 'Corporate and government gains', abundance: 'Structured prosperity', reflection: 'Achievement-based review', investments: 'government bonds, blue chips', sectors: 'established sectors', focus: 'appropriate risk-taking' },
    Aquarius: { approach: 'Innovative wealth creation', discipline: 'Unconventional saving methods', planning: 'Future-oriented investing', optimism: 'Humanitarian abundance belief', intuition: 'Unique money insights', analysis: 'Systems-based assessment', caution: 'Detachment from practical needs', generosity: 'Cause-driven giving', karma: 'Group wealth karma', prosperity: 'Technology and innovation gains', abundance: 'Community prosperity', reflection: 'Progressive financial review', investments: 'technology, space, social enterprises', sectors: 'disruptive opportunities', focus: 'practical application of ideas' },
    Pisces: { approach: 'Intuitive wealth flow', discipline: 'Escapist spending tendencies', planning: 'Faith-based financial approach', optimism: 'Spiritual abundance trust', intuition: 'Strong money intuition', analysis: 'Intuitive assessment', caution: 'Naive about money matters', generosity: 'Compassionate unlimited giving', karma: 'Spiritual wealth karma', prosperity: 'Arts and healing gains', abundance: 'Universal flow prosperity', reflection: 'Intuitive financial review', investments: 'arts, healing, spiritual ventures', sectors: 'creative and charitable', focus: 'practical grounding of intuition' }
  };
  return traits[moon] || traits.Cancer;
}

function getMoonRelationshipTraits(moon: string): Record<string, string> {
  const traits: Record<string, Record<string, string>> = {
    Aries: { expression: 'Direct and passionate communication', love: 'Bold romantic gestures', patience: 'Patience with slower partners', initiative: 'Taking relationship initiative', adaptability: 'Quick adjustment to changes', nurturing: 'Action-based care', respect: 'Honoring courage in others', protection: 'Warrior-like defense of loved ones', heritage: 'Pioneer family values', power: 'Confident romantic pursuit', celebration: 'Energetic celebrations', gratitude: 'Action-oriented appreciation', strength: 'passionate directness' },
    Taurus: { expression: 'Steady and sensual affection', love: 'Physical expressions of love', patience: 'Natural patience in relationships', initiative: 'Slow but sure approach', adaptability: 'Gradual relationship adjustments', nurturing: 'Material comfort provision', respect: 'Appreciation of stability', protection: 'Reliable presence', heritage: 'Traditional family values', power: 'Enduring romantic commitment', celebration: 'Sensory-rich celebrations', gratitude: 'Tangible appreciation gifts', strength: 'loyal steadfastness' },
    Gemini: { expression: 'Verbal and intellectual connection', love: 'Witty romantic communication', patience: 'Impatience with emotional depth', initiative: 'Curious relationship exploration', adaptability: 'Easy adjustment to changes', nurturing: 'Mental stimulation care', respect: 'Honoring intelligence', protection: 'Information and communication', heritage: 'Intellectual family traditions', power: 'Charming romantic appeal', celebration: 'Socially dynamic celebrations', gratitude: 'Verbal appreciation', strength: 'communicative versatility' },
    Cancer: { expression: 'Deeply nurturing emotional care', love: 'Home and family-centered love', patience: 'Emotional patience', initiative: 'Protective relationship approach', adaptability: 'Emotional flexibility', nurturing: 'Natural caretaking', respect: 'Honoring emotional needs', protection: 'Fierce family protection', heritage: 'Strong ancestral connections', power: 'Emotional depth attraction', celebration: 'Family-centered celebrations', gratitude: 'Heartfelt appreciation', strength: 'nurturing emotional depth' },
    Leo: { expression: 'Grand romantic gestures', love: 'Dramatic love expressions', patience: 'Dignified patience', initiative: 'Confident romantic pursuit', adaptability: 'Proud adjustment to changes', nurturing: 'Generous care and attention', respect: 'Demanding and giving respect', protection: 'Noble defense of loved ones', heritage: 'Regal family traditions', power: 'Magnetic romantic attraction', celebration: 'Lavish celebrations', gratitude: 'Generous appreciation', strength: 'dramatic generosity' },
    Virgo: { expression: 'Practical acts of service', love: 'Helpful love expressions', patience: 'Critical but patient', initiative: 'Careful relationship approach', adaptability: 'Systematic adjustments', nurturing: 'Health and wellness care', respect: 'Appreciating competence', protection: 'Practical support', heritage: 'Service-oriented family values', power: 'Devoted detailed attention', celebration: 'Organized celebrations', gratitude: 'Thoughtful appreciation', strength: 'devoted service' },
    Libra: { expression: 'Harmonious diplomatic communication', love: 'Beautiful romantic expressions', patience: 'Patient mediation', initiative: 'Partnership-focused approach', adaptability: 'Harmonious adjustments', nurturing: 'Creating beautiful environments', respect: 'Fair mutual respect', protection: 'Diplomatic defense', heritage: 'Relationship-centered values', power: 'Charming grace', celebration: 'Elegant celebrations', gratitude: 'Graceful appreciation', strength: 'diplomatic harmony' },
    Scorpio: { expression: 'Deep emotional intensity', love: 'Passionate soul connection', patience: 'Patient intensity', initiative: 'Deep relationship exploration', adaptability: 'Transformative adjustments', nurturing: 'Profound emotional support', respect: 'Demanding loyalty', protection: 'Powerful defense of bonds', heritage: 'Deep family patterns', power: 'Magnetic intense attraction', celebration: 'Meaningful celebrations', gratitude: 'Deep appreciation', strength: 'transformative depth' },
    Sagittarius: { expression: 'Honest philosophical sharing', love: 'Adventurous love expressions', patience: 'Impatient with restrictions', initiative: 'Freedom-loving approach', adaptability: 'Optimistic adjustments', nurturing: 'Growth encouragement', respect: 'Honoring freedom', protection: 'Philosophical guidance', heritage: 'Wisdom traditions', power: 'Inspiring optimism', celebration: 'Adventurous celebrations', gratitude: 'Enthusiastic appreciation', strength: 'adventurous honesty' },
    Capricorn: { expression: 'Committed practical loyalty', love: 'Responsible love expressions', patience: 'Disciplined patience', initiative: 'Structured relationship approach', adaptability: 'Calculated adjustments', nurturing: 'Provider mentality', respect: 'Status and achievement respect', protection: 'Reliable stability', heritage: 'Traditional family structures', power: 'Earned trust attraction', celebration: 'Dignified celebrations', gratitude: 'Reserved but sincere appreciation', strength: 'reliable commitment' },
    Aquarius: { expression: 'Unique friendship-based love', love: 'Unconventional expressions', patience: 'Detached patience', initiative: 'Independent approach', adaptability: 'Progressive adjustments', nurturing: 'Intellectual friendship', respect: 'Honoring individuality', protection: 'Community support', heritage: 'Progressive family values', power: 'Unique magnetic appeal', celebration: 'Unconventional celebrations', gratitude: 'Friendship appreciation', strength: 'progressive friendship' },
    Pisces: { expression: 'Compassionate spiritual connection', love: 'Romantic artistic expressions', patience: 'Endless compassion', initiative: 'Intuitive relationship flow', adaptability: 'Flowing adjustments', nurturing: 'Spiritual emotional care', respect: 'Honoring sensitivity', protection: 'Subtle spiritual support', heritage: 'Spiritual family traditions', power: 'Dreamy romantic attraction', celebration: 'Artistic celebrations', gratitude: 'Heartfelt soulful appreciation', strength: 'compassionate intuition' }
  };
  return traits[moon] || traits.Cancer;
}

function getAscendantHealthFocus(asc: string): Record<string, string> {
  const health: Record<string, Record<string, string>> = {
    Aries: { focus: 'Head, brain, and facial areas', cardiovascular: 'Blood pressure monitoring', respiratory: 'Sinus and headache prevention', cooling: 'Head cooling and hydration', heat: 'Avoiding head overheating', systems: 'Neurological', monsoon: 'Head colds and sinus', joints: 'Neck tension', digestion: 'Quick eating habits', festive: 'Injury prevention', cold: 'Head covering', priority: 'head and brain health', stress: 'tension headaches', winterCare: 'head protection from cold' },
    Taurus: { focus: 'Throat, neck, and thyroid', cardiovascular: 'Cholesterol awareness', respiratory: 'Throat infections', cooling: 'Cool beverages and throat care', heat: 'Throat dryness prevention', systems: 'Endocrine and throat', monsoon: 'Throat infections', joints: 'Neck stiffness', digestion: 'Slow metabolism', festive: 'Sweet overconsumption', cold: 'Throat warmth', priority: 'throat and thyroid', stress: 'throat tension', winterCare: 'thyroid and immunity support' },
    Gemini: { focus: 'Lungs, arms, and nervous system', cardiovascular: 'Circulation in extremities', respiratory: 'Lung and breathing care', cooling: 'Breathing exercises', heat: 'Hand and arm care', systems: 'Respiratory and nervous', monsoon: 'Lung infections', joints: 'Arm and shoulder', digestion: 'Nervous stomach', festive: 'Respiratory protection', cold: 'Chest protection', priority: 'respiratory and nervous system', stress: 'anxiety and restlessness', winterCare: 'lung protection and warmth' },
    Cancer: { focus: 'Chest, stomach, and breasts', cardiovascular: 'Emotional heart health', respiratory: 'Chest congestion', cooling: 'Stomach cooling foods', heat: 'Digestive cooling', systems: 'Digestive and lymphatic', monsoon: 'Digestive issues', joints: 'Chest tightness', digestion: 'Emotional eating', festive: 'Stomach overload', cold: 'Chest warmth', priority: 'digestive and emotional health', stress: 'stomach issues', winterCare: 'warm comforting foods' },
    Leo: { focus: 'Heart, spine, and upper back', cardiovascular: 'Heart health priority', respiratory: 'Maintaining vitality', cooling: 'Heart and spine cooling', heat: 'Avoiding overheating', systems: 'Cardiovascular', monsoon: 'Vitality maintenance', joints: 'Spine and back', digestion: 'Rich food moderation', festive: 'Heart strain from excess', cold: 'Core warmth', priority: 'heart and circulation', stress: 'heart and back tension', winterCare: 'cardiovascular exercise' },
    Virgo: { focus: 'Intestines, digestive system, and nerves', cardiovascular: 'Stress-heart connection', respiratory: 'Allergy management', cooling: 'Digestive cooling', heat: 'Intestinal care', systems: 'Digestive and nervous', monsoon: 'Intestinal infections', joints: 'Stress-related tension', digestion: 'Careful food selection', festive: 'Digestive overload', cold: 'Abdominal warmth', priority: 'intestinal and nervous health', stress: 'digestive disturbances', winterCare: 'warm, easily digestible foods' },
    Libra: { focus: 'Kidneys, lower back, and skin', cardiovascular: 'Blood sugar balance', respiratory: 'Skin and breathing', cooling: 'Kidney and skin care', heat: 'Lower back protection', systems: 'Renal and skin', monsoon: 'Skin issues', joints: 'Lower back and hips', digestion: 'Sugar balance', festive: 'Kidney care with sweets', cold: 'Lower back warmth', priority: 'kidney and skin health', stress: 'lower back pain', winterCare: 'skin hydration and kidney care' },
    Scorpio: { focus: 'Reproductive organs and elimination', cardiovascular: 'Deep cleansing circulation', respiratory: 'Deep breathing practices', cooling: 'Reproductive system care', heat: 'Urinary tract care', systems: 'Reproductive and excretory', monsoon: 'Urinary infections', joints: 'Pelvic region', digestion: 'Detoxification', festive: 'Elimination support', cold: 'Core warmth', priority: 'reproductive and elimination', stress: 'held tension in pelvis', winterCare: 'warming and cleansing practices' },
    Sagittarius: { focus: 'Hips, thighs, and liver', cardiovascular: 'Active circulation through exercise', respiratory: 'Outdoor breathing', cooling: 'Liver cooling diet', heat: 'Hip and thigh care', systems: 'Hepatic and muscular', monsoon: 'Liver care', joints: 'Hips and thighs', digestion: 'Liver detox', festive: 'Alcohol moderation', cold: 'Hip and thigh warmth', priority: 'liver and mobility', stress: 'hip tightness', winterCare: 'continued physical activity' },
    Capricorn: { focus: 'Knees, bones, joints, and teeth', cardiovascular: 'Circulatory support for joints', respiratory: 'Steady breathing', cooling: 'Joint and bone care', heat: 'Knee protection', systems: 'Skeletal and dental', monsoon: 'Joint stiffness', joints: 'Knees and all joints', digestion: 'Calcium absorption', festive: 'Joint stress from activity', cold: 'Joint warmth and flexibility', priority: 'bone and dental health', stress: 'knee and joint issues', winterCare: 'joint mobility exercises' },
    Aquarius: { focus: 'Ankles, calves, and circulation', cardiovascular: 'Circulation optimization', respiratory: 'Unconventional breathing', cooling: 'Circulation support', heat: 'Ankle care', systems: 'Circulatory and nervous', monsoon: 'Ankle and calf issues', joints: 'Ankles', digestion: 'Nervous digestion', festive: 'Circulation during festivities', cold: 'Lower leg warmth', priority: 'circulatory and ankle health', stress: 'nerve and circulation issues', winterCare: 'leg circulation exercises' },
    Pisces: { focus: 'Feet, lymphatic system, and immunity', cardiovascular: 'Gentle heart care', respiratory: 'Breath and immunity', cooling: 'Feet and lymph care', heat: 'Foot care', systems: 'Lymphatic and immune', monsoon: 'Foot infections', joints: 'Feet and ankles', digestion: 'Sensitive digestion', festive: 'Immune support', cold: 'Foot warmth', priority: 'feet and immune health', stress: 'escapist tendencies', winterCare: 'warm feet and immune support' }
  };
  return health[asc] || health.Aries;
}

function getMoonHealthFocus(moon: string): Record<string, string> {
  const health: Record<string, Record<string, string>> = {
    Aries: { emotional: 'Managing anger and impatience', winterCare: 'physical activity despite cold', detox: 'quick intense cleanses', hydration: 'staying hydrated despite activity', immunity: 'active immune support', waterborne: 'adventurous eating caution', seasonal: 'maintaining activity levels', spiritual: 'physically engaging fasting', fasting: 'challenging but transformative', respiratory: 'active outdoor precautions', priority: 'emotional regulation' },
    Taurus: { emotional: 'Avoiding emotional eating patterns', winterCare: 'comfort without overindulgence', detox: 'gentle gradual cleanses', hydration: 'regular water intake', immunity: 'steady immune building', waterborne: 'careful food selection', seasonal: 'adapting comfort routines', spiritual: 'sensory fasting challenges', fasting: 'difficult without preparation', respiratory: 'throat and sinus care', priority: 'eating pattern awareness' },
    Gemini: { emotional: 'Calming mental restlessness', winterCare: 'mental stimulation indoors', detox: 'varied detox approaches', hydration: 'remembering to drink water', immunity: 'consistent immune routines', waterborne: 'varied diet caution', seasonal: 'mental weather adaptation', spiritual: 'mentally engaging fasting', fasting: 'challenging focus required', respiratory: 'lung and breathing care', priority: 'mental calm and focus' },
    Cancer: { emotional: 'Processing emotions without suppression', winterCare: 'emotional warmth and comfort', detox: 'gentle emotional releases', hydration: 'warm soothing liquids', immunity: 'emotionally-linked immune care', waterborne: 'home food preference', seasonal: 'emotional weather sensitivity', spiritual: 'emotionally meaningful fasting', fasting: 'intuitive and beneficial', respiratory: 'chest and emotional release', priority: 'emotional processing' },
    Leo: { emotional: 'Managing pride-related stress', winterCare: 'maintaining vitality', detox: 'dramatic transformative cleanses', hydration: 'generous hydration', immunity: 'vital immune maintenance', waterborne: 'quality food standards', seasonal: 'maintaining energy levels', spiritual: 'heartfelt devoted fasting', fasting: 'powerful but ego challenges', respiratory: 'heart-lung connection', priority: 'heart and ego health' },
    Virgo: { emotional: 'Releasing anxiety and perfectionism', winterCare: 'systematic health routines', detox: 'carefully planned cleanses', hydration: 'measured water intake', immunity: 'detailed immune protocols', waterborne: 'very careful food selection', seasonal: 'analyzed adaptations', spiritual: 'health-conscious fasting', fasting: 'beneficial with proper planning', respiratory: 'anxiety-breath connection', priority: 'anxiety and worry management' },
    Libra: { emotional: 'Maintaining emotional balance', winterCare: 'balanced wellness approach', detox: 'harmonious gentle cleanses', hydration: 'balanced fluid intake', immunity: 'relationship-supported immunity', waterborne: 'partner-influenced eating', seasonal: 'aesthetic wellness focus', spiritual: 'partner-supported fasting', fasting: 'easier with company', respiratory: 'skin and breathing care', priority: 'emotional equilibrium' },
    Scorpio: { emotional: 'Releasing suppressed emotions', winterCare: 'deep transformative practices', detox: 'intense thorough cleanses', hydration: 'deep cellular hydration', immunity: 'powerful regenerative immunity', waterborne: 'intuitive food selection', seasonal: 'transformative adaptations', spiritual: 'deeply meaningful fasting', fasting: 'powerful transformation tool', respiratory: 'deep breathing practices', priority: 'emotional release and transformation' },
    Sagittarius: { emotional: 'Grounding excessive optimism', winterCare: 'indoor exercise alternatives', detox: 'adventurous cleanse approaches', hydration: 'active hydration needs', immunity: 'optimistic immune attitude', waterborne: 'adventurous eating caution', seasonal: 'maintaining movement', spiritual: 'philosophical fasting', fasting: 'freedom-challenging but growth-oriented', respiratory: 'outdoor breathing love', priority: 'liver and optimism balance' },
    Capricorn: { emotional: 'Releasing rigidity and worry', winterCare: 'structured but flexible routines', detox: 'disciplined methodical cleanses', hydration: 'disciplined water intake', immunity: 'structured immune protocols', waterborne: 'conservative food choices', seasonal: 'practical adaptations', spiritual: 'disciplined structured fasting', fasting: 'well-suited with proper planning', respiratory: 'breath and structure', priority: 'releasing control and worry' },
    Aquarius: { emotional: 'Connecting body to emotions', winterCare: 'unconventional wellness approaches', detox: 'innovative cleanse methods', hydration: 'sometimes forgotten - set reminders', immunity: 'alternative immune approaches', waterborne: 'unconventional food choices', seasonal: 'unique adaptations', spiritual: 'group or cause-based fasting', fasting: 'intellectually approached', respiratory: 'breathwork innovations', priority: 'mind-body-emotion integration' },
    Pisces: { emotional: 'Avoiding escapism in health', winterCare: 'creative indoor activities', detox: 'intuitive gentle cleanses', hydration: 'adequate hydration often forgotten', immunity: 'spiritually-supported immunity', waterborne: 'sensitive system care', seasonal: 'flowing intuitive adaptations', spiritual: 'deeply spiritual fasting', fasting: 'naturally suited and beneficial', respiratory: 'breath and intuition', priority: 'grounding and practical wellness' }
  };
  return health[moon] || health.Cancer;
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
