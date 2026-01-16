"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Heart, Briefcase, DollarSign, Activity, Brain, Users, Star, AlertTriangle, Sparkles, Target } from "lucide-react";

interface YearlyPredictionsProps {
  moonSign: string;
  ascendant: string;
  mahaDasha: string;
  antarDasha?: string;
  year?: number;
}

interface YearlyForecast {
  overview: string;
  jupiterTransit: string;
  saturnTransit: string;
  rahuKetuTransit: string;
  career: {
    summary: string;
    periods: string[];
    opportunities: string[];
    challenges: string[];
  };
  finance: {
    summary: string;
    income: string;
    investments: string;
    expenses: string;
  };
  relationships: {
    summary: string;
    love: string;
    marriage: string;
    family: string;
    friendship: string;
  };
  health: {
    summary: string;
    physical: string;
    mental: string;
    prevention: string[];
  };
  education: {
    summary: string;
    students: string;
    competitive: string;
    research: string;
  };
  spiritual: {
    summary: string;
    practices: string[];
    growth: string;
  };
  remedies: string[];
  luckyMonths: string[];
  challengingMonths: string[];
  keyDates: Array<{ date: string; event: string }>;
}

export function YearlyPredictions({ moonSign, ascendant, mahaDasha, antarDasha, year = 2026 }: YearlyPredictionsProps) {
  const forecast = getYearlyForecast(moonSign, ascendant, mahaDasha, antarDasha || '', year);

  return (
    <div className="space-y-6">
      {/* Year Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-purple/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Calendar className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <div>
                <CardTitle className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary via-gold to-purple bg-clip-text text-transparent">
                  Your {year} Yearly Forecast
                </CardTitle>
                <CardDescription className="text-sm md:text-base mt-1">
                  Complete Year Ahead Analysis for {moonSign} Moon Sign
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-sm md:text-lg px-3 md:px-4 py-1.5 md:py-2">
              {year}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-base leading-relaxed">{forecast.overview}</p>
          </div>
        </CardContent>
      </Card>

      {/* Major Transits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-gold" />
            <span>Major Planetary Transits in {year}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Jupiter Transit */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <span className="text-gold">♃</span>
              <span>Jupiter Transit</span>
              <Badge variant="secondary">Growth & Expansion</Badge>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{forecast.jupiterTransit}</p>
          </div>

          {/* Saturn Transit */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <span className="text-primary">♄</span>
              <span>Saturn Transit</span>
              <Badge variant="secondary">Discipline & Karma</Badge>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{forecast.saturnTransit}</p>
          </div>

          {/* Rahu-Ketu Transit */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <span className="text-purple">☊☋</span>
              <span>Rahu-Ketu Axis</span>
              <Badge variant="secondary">Transformation</Badge>
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{forecast.rahuKetuTransit}</p>
          </div>
        </CardContent>
      </Card>

      {/* Career & Professional Life */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <span>Career & Professional Growth</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm leading-relaxed">{forecast.career.summary}</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-500" />
                <span>Best Periods</span>
              </h4>
              <ul className="space-y-1 text-xs">
                {forecast.career.periods.map((period, idx) => (
                  <li key={idx} className="text-muted-foreground">• {period}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Opportunities</span>
              </h4>
              <ul className="space-y-1 text-xs">
                {forecast.career.opportunities.map((opp, idx) => (
                  <li key={idx} className="text-muted-foreground">• {opp}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span>Challenges</span>
              </h4>
              <ul className="space-y-1 text-xs">
                {forecast.career.challenges.map((challenge, idx) => (
                  <li key={idx} className="text-muted-foreground">• {challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Finance & Wealth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span>Financial Outlook</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{forecast.finance.summary}</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-sm mb-2">Income Sources</h4>
              <p className="text-xs text-muted-foreground">{forecast.finance.income}</p>
            </div>

            <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
              <h4 className="font-semibold text-sm mb-2">Investments</h4>
              <p className="text-xs text-muted-foreground">{forecast.finance.investments}</p>
            </div>

            <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold text-sm mb-2">Expense Management</h4>
              <p className="text-xs text-muted-foreground">{forecast.finance.expenses}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relationships & Love */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span>Relationships & Love Life</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{forecast.relationships.summary}</p>

          <div className="space-y-4">
            <div className="p-4 bg-pink-500/5 rounded-lg border border-pink-500/20">
              <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Romance & Dating</span>
              </h4>
              <p className="text-xs text-muted-foreground">{forecast.relationships.love}</p>
            </div>

            <div className="p-4 bg-purple/5 rounded-lg border border-purple/20">
              <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple" />
                <span>Marriage & Partnership</span>
              </h4>
              <p className="text-xs text-muted-foreground">{forecast.relationships.marriage}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-sm mb-2">Family Relations</h4>
                <p className="text-xs text-muted-foreground">{forecast.relationships.family}</p>
              </div>

              <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
                <h4 className="font-semibold text-sm mb-2">Friendships</h4>
                <p className="text-xs text-muted-foreground">{forecast.relationships.friendship}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health & Wellness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-red-500" />
            <span>Health & Wellness</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{forecast.health.summary}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-sm mb-2">Physical Health</h4>
                <p className="text-xs text-muted-foreground">{forecast.health.physical}</p>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-sm mb-2">Mental & Emotional</h4>
                <p className="text-xs text-muted-foreground">{forecast.health.mental}</p>
              </div>
            </div>

            <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <h4 className="font-semibold text-sm mb-3">Prevention & Care</h4>
              <ul className="space-y-2 text-xs">
                {forecast.health.prevention.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education & Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>Education & Knowledge</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{forecast.education.summary}</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-sm mb-2">Students</h4>
              <p className="text-xs text-muted-foreground">{forecast.education.students}</p>
            </div>

            <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
              <h4 className="font-semibold text-sm mb-2">Competitive Exams</h4>
              <p className="text-xs text-muted-foreground">{forecast.education.competitive}</p>
            </div>

            <div className="p-4 bg-purple/5 rounded-lg border border-purple/20">
              <h4 className="font-semibold text-sm mb-2">Research & Higher Studies</h4>
              <p className="text-xs text-muted-foreground">{forecast.education.research}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spiritual Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple" />
            <span>Spiritual Development</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{forecast.spiritual.summary}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple/5 rounded-lg border border-purple/20">
              <h4 className="font-semibold text-sm mb-3">Recommended Practices</h4>
              <ul className="space-y-2 text-xs">
                {forecast.spiritual.practices.map((practice, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-purple">◆</span>
                    <span className="text-muted-foreground">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
              <h4 className="font-semibold text-sm mb-2">Growth Trajectory</h4>
              <p className="text-xs text-muted-foreground">{forecast.spiritual.growth}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month-by-Month Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-gold" />
            <span>Month-by-Month Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <Star className="w-4 h-4 text-gold" />
                <span>Favorable Months</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {forecast.luckyMonths.map((month, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
                    {month}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span>Challenging Months</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {forecast.challengingMonths.map((month, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-orange-500/10 text-orange-700 dark:text-orange-400">
                    {month}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Dates & Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Important Dates in {year}</span>
          </CardTitle>
          <CardDescription>Mark these dates for significant astrological influences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {forecast.keyDates.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <Badge variant="outline" className="shrink-0">{item.date}</Badge>
                <p className="text-sm text-muted-foreground">{item.event}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yearly Remedies */}
      <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span>Powerful Remedies for {year}</span>
          </CardTitle>
          <CardDescription>Practice these throughout the year for maximum benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {forecast.remedies.map((remedy, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-card rounded-lg border border-border">
                <span className="text-gold font-bold">{idx + 1}.</span>
                <p className="text-sm text-muted-foreground">{remedy}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getMahaDashaInfluence(mahaDasha: string): string {
  const dashaInfluences: Record<string, string> = {
    'Sun': 'Your Sun Maha Dasha brings focus on authority, government connections, and father figures. Leadership opportunities and recognition are prominent themes.',
    'Moon': 'Your Moon Maha Dasha emphasizes emotional fulfillment, mother\'s influence, and domestic happiness. Intuition and public connections strengthen.',
    'Mars': 'Your Mars Maha Dasha brings energy, courage, and competitive spirit. Property matters, siblings, and athletic pursuits are highlighted.',
    'Mercury': 'Your Mercury Maha Dasha enhances communication, business acumen, and intellectual pursuits. Education, writing, and commerce flourish.',
    'Jupiter': 'Your Jupiter Maha Dasha brings wisdom, spiritual growth, and financial expansion. Teaching, counseling, and dharmic pursuits are favored.',
    'Venus': 'Your Venus Maha Dasha emphasizes relationships, creativity, and material comforts. Arts, luxury, and partnerships are highlighted.',
    'Saturn': 'Your Saturn Maha Dasha teaches discipline, patience, and karmic lessons. Hard work brings lasting results, though challenges build character.',
    'Rahu': 'Your Rahu Maha Dasha brings unconventional opportunities, foreign connections, and sudden changes. Material ambitions and worldly success dominate.',
    'Ketu': 'Your Ketu Maha Dasha encourages spiritual detachment, past-life wisdom, and liberation. Worldly ambitions fade as spiritual seeking intensifies.'
  };
  return dashaInfluences[mahaDasha] || 'Your current Maha Dasha period shapes how all transits manifest in your life.';
}

function getAntarDashaInfluence(mahaDasha: string, antarDasha: string): string {
  if (!antarDasha) return '';

  const antarInfluences: Record<string, string> = {
    'Sun': 'Currently in Sun Antar Dasha, enhancing leadership, confidence, and paternal matters.',
    'Moon': 'Currently in Moon Antar Dasha, bringing emotional depth, domestic focus, and maternal influences.',
    'Mars': 'Currently in Mars Antar Dasha, increasing energy, courage, and competitive drive.',
    'Mercury': 'Currently in Mercury Antar Dasha, sharpening intellect, communication, and business skills.',
    'Jupiter': 'Currently in Jupiter Antar Dasha, expanding wisdom, fortune, and spiritual growth.',
    'Venus': 'Currently in Venus Antar Dasha, enhancing relationships, creativity, and material comforts.',
    'Saturn': 'Currently in Saturn Antar Dasha, teaching discipline, patience, and karmic responsibility.',
    'Rahu': 'Currently in Rahu Antar Dasha, bringing sudden opportunities, foreign connections, and ambitions.',
    'Ketu': 'Currently in Ketu Antar Dasha, encouraging spiritual detachment and introspection.'
  };

  return antarInfluences[antarDasha] || '';
}

function getAscendantCareerInsight(ascendant: string): string {
  const ascendantCareers: Record<string, string> = {
    'Aries': 'As Aries ascendant, you excel in leadership, entrepreneurship, sports, military, and pioneering ventures.',
    'Taurus': 'As Taurus ascendant, banking, agriculture, luxury goods, beauty, and food industries suit you best.',
    'Gemini': 'As Gemini ascendant, communication, teaching, writing, sales, and media work are natural strengths.',
    'Cancer': 'As Cancer ascendant, hospitality, real estate, nursing, childcare, and emotional counseling are ideal.',
    'Leo': 'As Leo ascendant, entertainment, government, management, and creative leadership bring success.',
    'Virgo': 'As Virgo ascendant, healthcare, analytics, quality control, editing, and service professions excel.',
    'Libra': 'As Libra ascendant, law, design, diplomacy, counseling, and partnership businesses are favored.',
    'Scorpio': 'As Scorpio ascendant, research, investigation, surgery, occult sciences, and transformation work suit you.',
    'Sagittarius': 'As Sagittarius ascendant, teaching, publishing, law, travel, and spiritual counseling are natural.',
    'Capricorn': 'As Capricorn ascendant, administration, engineering, construction, and long-term projects bring success.',
    'Aquarius': 'As Aquarius ascendant, technology, social work, innovation, and humanitarian causes are ideal.',
    'Pisces': 'As Pisces ascendant, spirituality, healing, arts, charity work, and creative expression flourish.'
  };
  return ascendantCareers[ascendant] || '';
}

function getAscendantHealthFocus(ascendant: string): string {
  const healthFocus: Record<string, string> = {
    'Aries': 'Focus on head, eyes, and managing stress-related issues.',
    'Taurus': 'Monitor throat, thyroid, and maintain healthy weight.',
    'Gemini': 'Care for lungs, nervous system, and avoid overthinking.',
    'Cancer': 'Watch digestive system, chest area, and emotional eating.',
    'Leo': 'Heart health, spine, and managing ego-related stress important.',
    'Virgo': 'Digestive health, intestines, and avoiding perfectionism stress.',
    'Libra': 'Kidney health, lower back, and hormonal balance crucial.',
    'Scorpio': 'Reproductive health, chronic issues, and emotional healing needed.',
    'Sagittarius': 'Liver health, hips/thighs, and avoiding overindulgence.',
    'Capricorn': 'Bones, joints, teeth, and managing pessimism.',
    'Aquarius': 'Circulation, ankles, and nervous system care.',
    'Pisces': 'Feet, lymphatic system, and avoiding escapist tendencies.'
  };
  return healthFocus[ascendant] || '';
}

function getYearlyForecast(moonSign: string, ascendant: string, mahaDasha: string, antarDasha: string, year: number): YearlyForecast {
  // Calculate house positions for transits based on moon sign
  const moonSignIndex = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].indexOf(moonSign);
  const ascendantIndex = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].indexOf(ascendant);

  // Jupiter in Taurus (until May) and Gemini (after May)
  const jupiterHouse1 = (2 - moonSignIndex + 12) % 12 || 12; // Taurus from Moon
  const jupiterHouse2 = (3 - moonSignIndex + 12) % 12 || 12; // Gemini from Moon

  // Calculate Jupiter houses from Ascendant for career insights
  const jupiterHouse1Asc = (2 - ascendantIndex + 12) % 12 || 12;
  const jupiterHouse2Asc = (3 - ascendantIndex + 12) % 12 || 12;

  // Saturn in Pisces
  const saturnHouse = (12 - moonSignIndex + 12) % 12 || 12;
  const saturnHouseAsc = (12 - ascendantIndex + 12) % 12 || 12;

  // Rahu in Pisces, Ketu in Virgo
  const rahuHouse = (12 - moonSignIndex + 12) % 12 || 12;
  const ketuHouse = (6 - moonSignIndex + 12) % 12 || 12;

  // Get personalized insights
  const dashaInfluence = getMahaDashaInfluence(mahaDasha);
  const antarInfluence = getAntarDashaInfluence(mahaDasha, antarDasha);
  const careerInsight = getAscendantCareerInsight(ascendant);
  const healthFocus = getAscendantHealthFocus(ascendant);

  const forecasts: Record<string, YearlyForecast> = {
    Aries: {
      overview: `${year} brings transformative energy for Aries Moon natives${ascendant !== moonSign ? ` with ${ascendant} Ascendant` : ''}. ${dashaInfluence} ${antarInfluence} Jupiter's transit through your 3rd and 4th houses (from Moon) ${jupiterHouse1Asc !== jupiterHouse1 ? `and ${jupiterHouse1Asc}th and ${jupiterHouse2Asc}th houses from Ascendant ` : ''}promises significant growth in communication, courage, and domestic harmony. Saturn's disciplined influence in your 12th house encourages spiritual introspection and foreign connections, while Rahu-Ketu axis activates your 2nd-8th house axis, bringing sudden changes in wealth and transformation. ${careerInsight} This year marks a period of balancing material aspirations with spiritual evolution. Your natural leadership qualities will be tested and refined, especially in the first half of the year. Overall, ${year} is a year of courage, communication breakthroughs, and building strong foundations for future success.`,

      jupiterTransit: `Jupiter moves through Taurus (your 2nd house) until May ${year}, blessing your speech, family wealth, and accumulated resources. This transit enhances your ability to attract money through wise counsel, teaching, or advisory roles. Your words carry weight and wisdom, making it an excellent time for public speaking, writing, or starting educational ventures. From May onwards, Jupiter enters Gemini (your 3rd house), amplifying courage, communication skills, and relationship with siblings. This transit is particularly favorable for short journeys, media work, content creation, and entrepreneurial ventures requiring initiative and bold action. Jupiter's aspect on your 7th, 9th, and 11th houses throughout the year promises growth in partnerships, spiritual wisdom, and fulfillment of long-cherished desires.`,

      saturnTransit: `Saturn continues its transit through Pisces (your 12th house) for the entire year, bringing a period of introspection, spiritual growth, and foreign connections. This placement encourages working behind the scenes, research work, hospital or charity involvement, and spiritual practices. While Saturn here can create some expenses related to health or foreign matters, it also provides opportunities for settlement abroad, success in isolated work environments, and deep meditation practices. Saturn's 3rd aspect on your 2nd house teaches financial discipline and careful speech. The 7th aspect on your 6th house helps overcome enemies and health issues through persistent effort. The 10th aspect on your 9th house brings serious approach to higher learning, dharma, and long-distance travel.`,

      rahuKetuTransit: `Rahu in Pisces (your 12th house) and Ketu in Virgo (your 6th house) create a powerful axis of transformation throughout ${year}. Rahu in the 12th house brings obsession with spirituality, foreign lands, and liberation from material bondage. This placement can manifest as sudden foreign opportunities, interest in occult sciences, or unexpected expenses that teach valuable lessons about detachment. Ketu in the 6th house helps dissolve chronic diseases, overcome hidden enemies, and develop a natural ability to defeat competition effortlessly. This axis teaches the lesson of service (6th house) versus surrender (12th house). You may experience sudden health improvements, victory over litigation, but also need to manage sleep patterns and subconscious fears.`,

      career: {
        summary: `Your professional life in ${year} experiences dynamic shifts, with Jupiter's influence creating opportunities for skill development, communication-based roles, and entrepreneurial ventures. ${careerInsight} The first half of the year focuses on building financial stability and reputation through your expertise. Post-May, your courage and initiative take center stage, making it ideal for launching new projects, taking calculated risks, or switching to more independent work. ${saturnHouseAsc === 10 ? 'Saturn in your 10th house from Ascendant brings career maturity and recognition through disciplined effort.' : saturnHouseAsc === 6 ? 'Saturn in your 6th house from Ascendant helps overcome workplace obstacles systematically.' : ''} Your leadership abilities shine, but patience and persistence are key themes.`,

        periods: [
          'January-March: Strong for finalizing contracts and financial negotiations',
          'April-June: Excellent for job changes, promotions, and new ventures',
          'July-September: Focus on team building and collaborative projects',
          'October-December: Recognition and rewards for past efforts'
        ],

        opportunities: [
          'Leadership roles in communication, media, or educational sectors',
          'International projects or foreign company collaborations',
          'Entrepreneurial ventures requiring courage and innovation',
          'Advisory or consultancy positions leveraging your expertise',
          'Technology, digital marketing, or content creation fields'
        ],

        challenges: [
          'Tendency to take on too many projects simultaneously',
          'Managing expenses related to professional development',
          'Balancing assertiveness with diplomatic communication',
          'Patience required for long-term career goals to materialize',
          'Avoiding impulsive career decisions during Rahu transits'
        ]
      },

      finance: {
        summary: `${year} presents a mixed but ultimately favorable financial picture. Jupiter's transit through your 2nd house until May significantly boosts earning potential through multiple income streams, wise investments, and family support. Your financial wisdom increases, attracting opportunities for growth in savings and assets. Post-May, income may come through courageous initiatives, commissions, or entrepreneurial ventures. However, Saturn's 12th house placement indicates controlled expenses on spiritual pursuits, foreign matters, or health. The key is balancing expansion (Jupiter) with discipline (Saturn) and managing sudden changes (Rahu-Ketu axis).`,

        income: `Primary income remains stable with potential 20-30% increase through skill-based work, consultancy, or teaching. Secondary income sources develop through investments, side projects, or family business. Post-May, commission-based work, sales, marketing, or entrepreneurial ventures can create additional revenue streams. Foreign connections or clients may contribute significantly to income.`,

        investments: `First half favors investments in gold, family property, or educational instruments. Mutual funds and SIP investments show steady growth. Post-May, consider investing in communication technology, automobiles, or short-term trading with proper research. Avoid impulsive investments during Rahu influence. Real estate investments, especially land or property near water bodies, show promise but require thorough verification.`,

        expenses: `Major expenses likely on: spiritual journeys or pilgrimage (Jan-April), home renovation or vehicle purchase (May-Aug), health or medical tests (Sept-Oct), and family functions or social obligations (Nov-Dec). Foreign travel or international education may require significant outlay. Focus on building emergency fund equivalent to 6 months of expenses to handle Saturn's 12th house surprises.`
      },

      relationships: {
        summary: `Your relationship sector undergoes significant evolution in ${year}, with Jupiter's aspect on your 7th house (partnerships) creating opportunities for deepening commitments, improving understanding, and attracting beneficial partnerships. Venus retrograde periods require careful handling of romantic matters. The year emphasizes balancing independence with partnership, courage with compromise, and passion with patience.`,

        love: `Single Aries natives experience exciting romantic opportunities, especially during February-April and June-August. Jupiter's aspect encourages meeting potential partners through educational settings, spiritual gatherings, or through siblings' connections. Post-May, short trips or social media interactions may spark connections. Existing relationships deepen with mature communication and shared financial planning. However, manage Aries impulsiveness to avoid unnecessary conflicts. Express love through actions and thoughtful gestures.`,

        marriage: `Married natives see improved harmony, especially when focusing on shared goals and open communication. January-March is excellent for planning family expansion or joint investments. May-August brings excitement through travel together or exploring new hobbies as a couple. Occasional tensions may arise due to financial decisions or in-law matters, but Jupiter's grace ensures resolution through dialogue. Plan a special celebration or renewal of vows during Jupiter's favorable transit (Feb-April) to strengthen bonds.`,

        family: `Family relationships gain importance with Jupiter's 2nd house transit blessing family gatherings and shared values. Your relationship with parents improves through understanding and support. Siblings play a significant supportive role, especially post-May when Jupiter enters your 3rd house. However, Saturn's influence may bring some responsibilities toward elderly family members or require managing family expectations around foreign settlement. Mother's health requires attention around March-April and September-October.`,

        friendship: `Your social circle expands significantly, especially with Jupiter's influence attracting wise, optimistic, and growth-oriented individuals. Friendships formed during ${year} have long-term potential and may evolve into business partnerships. Old friendships may be tested by changing priorities, but authentic connections strengthen. Be selective about whom you trust with personal matters during Rahu's 12th house influence. Group activities, clubs, or community service brings joy and meaningful connections.`
      },

      health: {
        summary: `Health sector shows overall improvement compared to previous years, with Ketu in your 6th house naturally dissolving chronic issues. However, attention is needed for stress management, sleep quality, and managing the fast-paced Aries energy. Preventive care and regular check-ups ensure the year passes smoothly. The key is balancing physical activity (Mars energy) with adequate rest (Saturn's 12th house lesson).`,

        physical: `Generally good physical health with strong immunity. Focus areas: head, eyes, and muscular system (Aries ruled areas). Minor issues possible with: digestive system due to fast eating habits (March-May), sleep disturbances or insomnia due to overthinking (July-Sept), and minor injuries from haste or sports (throughout year). Ketu's placement helps overcome any chronic sinus, migraine, or inflammatory conditions. Post-May, increased activity requires attention to muscle strains and proper warm-up before exercise.`,

        mental: `Mental health benefits from Saturn's spiritual influence, encouraging meditation and introspection. However, Rahu in 12th can create anxiety about future or excessive worry. Practice mindfulness, especially during March-April and August-September when mental stress peaks. Creative outlets like art, music, or writing help channel mental energy positively. Avoid over-commitment leading to burnout. Regular social interaction with positive people maintains emotional balance.`,

        prevention: [
          'Daily 15-minute meditation or pranayama, especially alternate nostril breathing (Nadi Shodhana)',
          'Regular sleep schedule of 7-8 hours; sleep before 11 PM to manage Saturn\'s 12th house influence',
          'Balanced diet with anti-inflammatory foods; reduce spicy and heating foods that aggravate Aries constitution',
          'Weekly oil massage (Abhyanga) with cooling oils like coconut or sandalwood to calm Pitta dosha',
          'Regular eye exercises and adequate hydration (3-4 liters water daily)',
          'Quarterly health check-ups, especially blood pressure and cholesterol monitoring',
          'Yoga asanas: Headstand (Sirsasana), Shoulder stand (Sarvangasana), and Child\'s pose (Balasana)',
          'Avoid screen time 1 hour before sleep; practice digital detox on weekends'
        ]
      },

      education: {
        summary: `${year} is exceptionally favorable for students and knowledge seekers. Jupiter's transit through your 3rd house (post-May) blesses all forms of learning, communication, and skill acquisition. Whether you're a student, professional seeking upskilling, or lifelong learner, this year offers abundant opportunities for intellectual growth and academic success.`,

        students: `School and undergraduate students experience strong focus, improved memory, and better relationships with teachers. January-May is excellent for board exams, competitive entrance tests, or important academic milestones. Post-May, extracurricular activities, debate competitions, and communication-based competitions bring recognition. Those considering studying abroad find favorable conditions, especially applications submitted during February-April. Concentration improves, but avoid over-confidence during exams.`,

        competitive: `Highly favorable year for competitive exam aspirants. Jupiter's wisdom and Saturn's discipline create the perfect combination for success. Best preparation periods: January-March (for exams in May-June) and June-August (for exams in October-December). Short-term courses, crash courses, or coaching programs yield excellent results. Focus subjects: mathematics, engineering, law, or management show particular promise. Ketu's 6th house placement gives edge over competition. Mock tests and previous year papers are especially beneficial.`,

        research: `Research scholars and postgraduate students make significant breakthroughs, especially in fields related to technology, communication, occult sciences, or spirituality. Thesis work progresses smoothly with potential publication opportunities during April-June and September-November. International collaborations or research grants become accessible. Original thinking and innovative approaches receive recognition. Saturn's aspect ensures thorough, well-researched work that stands the test of scrutiny.`
      },

      spiritual: {
        summary: `${year} marks a significant phase in your spiritual evolution. Saturn and Rahu's placement in your 12th house creates powerful conditions for transcendence, meditation, and connection with higher consciousness. This year, spirituality is not separate from daily life but becomes the foundation for all activities. Your understanding of karma, dharma, and moksha deepens significantly.`,

        practices: [
          'Daily Surya Namaskar (Sun Salutation) - minimum 12 rounds to honor your ruling planet Mars through solar energy',
          'Mars mantra chanting: "Om Kram Kreem Kroum Sah Mangalaye Namah" - 108 times on Tuesdays',
          'Hanuman Chalisa recitation for courage, strength, and protection - especially powerful on Tuesdays and Saturdays',
          'Meditation during Brahma Muhurta (4:00-6:00 AM) when spiritual energy is strongest',
          'Monthly visit to Hanuman temple or Mars-related shrine, offer red flowers and jaggery',
          'Serve food to poor or hungry people on Tuesdays to balance Mars energy',
          'Practice Karma Yoga - selfless service without expectation of results',
          'Study of Bhagavad Gita, especially chapters on Karma Yoga and Dhyana Yoga'
        ],

        growth: `Your spiritual journey this year moves from external rituals to internal transformation. First quarter focuses on establishing disciplined spiritual routines. Second quarter brings deeper understanding through study and contemplation. Third quarter may include pilgrimages or visits to spiritual masters that transform your perspective. Final quarter integrates spiritual wisdom into daily life, making you a more conscious, compassionate leader. By year end, you develop genuine detachment from results while maintaining full engagement with actions.`
      },

      remedies: [
        'Donate red clothes, red lentils, or copper items to poor on Tuesdays to strengthen Mars and reduce aggression',
        'Worship Lord Hanuman regularly; observe fast on Tuesdays and consume only fruits and milk',
        'Wear red coral (Moonga) of 3-6 carats in gold/copper ring on ring finger after proper Vedic purification',
        'Recite Hanuman Chalisa 11 times on Tuesdays to overcome obstacles and enemies',
        'Feed jaggery and gram to monkeys on Saturdays to appease Saturn and reduce 12th house expenses',
        'Light a ghee lamp in front of Lord Ganesha every evening to remove obstacles from all endeavors',
        'Donate to army welfare funds or support martial arts training for underprivileged children',
        'Practice headstand (Sirsasana) daily to channelize Mars energy properly and clear mind',
        'Place energized Mars Yantra in puja room; worship on Tuesdays with red flowers and incense',
        'Serve food at temples or community kitchens monthly to balance karmic debts'
      ],

      luckyMonths: ['February', 'March', 'April', 'June', 'July', 'November'],
      challengingMonths: ['January', 'May', 'August', 'October'],

      keyDates: [
        { date: 'Jan 14', event: 'Makar Sankranti - Auspicious for new beginnings and charity' },
        { date: 'Feb 26', event: 'Maha Shivaratri - Powerful day for Mars energy and overcoming obstacles' },
        { date: 'Mar 25', event: 'Holika Dahan - Release past karma; excellent for relationship healing' },
        { date: 'May 1', event: 'Jupiter enters Gemini - Major shift in energy; start new communication projects' },
        { date: 'May 23', event: 'Buddha Purnima - Excellent for meditation and spiritual practices' },
        { date: 'Jul 20', event: 'Guru Purnima - Honor teachers; excellent for education and knowledge' },
        { date: 'Aug 27', event: 'Janmashtami - Strategic thinking and overcoming enemies' },
        { date: 'Oct 2', event: 'Navratri begins - Nine days of spiritual power and divine grace' },
        { date: 'Nov 1', event: 'Diwali - Major financial decisions; new ventures highly favorable' },
        { date: 'Dec 22', event: 'Winter Solstice - Spiritual transformation completes; new cycle begins' }
      ]
    },

    Taurus: {
      overview: `${year} brings wisdom and expansion for Taurus natives. Jupiter transits through your own sign until May, bringing personal growth, optimism, and new opportunities. Post-May, Jupiter moves to your 2nd house, blessing wealth and family. Saturn in your 11th house brings mature friendships and steady income gains. Rahu-Ketu activates your 11th-5th house axis, creating sudden changes in social circles and creative pursuits. The ${mahaDasha} Maha Dasha influences how these transits manifest in your life.`,

      jupiterTransit: `Jupiter in Taurus (your 1st house) until May brings personal transformation, enhanced charisma, and favorable opportunities. This is your year to shine! From May, Jupiter enters your 2nd house, bringing financial growth, improved speech, and family harmony. Focus on savings and wise investments.`,

      saturnTransit: `Saturn in your 11th house throughout ${year} brings disciplined approach to achieving goals. Elder siblings and social networks require mature handling. Income from career grows steadily through persistent effort.`,

      rahuKetuTransit: `Rahu in 11th house brings unexpected gains and unusual friendships. Ketu in 5th house teaches detachment from past creative works and encourages spiritual education. Children or students may need special attention.`,

      career: {
        summary: `Career flourishes with Jupiter's blessings. First half excellent for image building and leadership roles. Post-May, financial negotiations and consulting work bring rewards.`,
        periods: ['Jan-March: Personal branding and visibility', 'April-June: Financial planning and negotiations', 'July-Sept: Team collaborations yield results', 'Oct-Dec: Recognition and bonuses'],
        opportunities: ['Finance, banking, luxury goods', 'Real estate and property development', 'Food, hospitality, beauty industry', 'Teaching and counseling', 'Agriculture and natural products'],
        challenges: ['Resistance to change', 'Over-commitment to social causes', 'Balancing work with creative pursuits']
      },

      finance: {
        summary: `Excellent financial year with Jupiter's direct blessings. Income increases significantly post-May. Saturn ensures steady growth through disciplined saving.`,
        income: `Salary increases of 25-35% possible. Multiple income streams develop. Post-May, family business or ancestral property brings financial gains.`,
        investments: `Invest in gold, real estate, and blue-chip stocks. SIPs started in February-April show excellent long-term returns. Avoid speculation during Rahu periods.`,
        expenses: `Major expenses on personal development (Jan-May), family functions and home improvements (June-Sept), and social obligations (Oct-Dec). Build emergency corpus.`
      },

      relationships: {
        summary: `Relationships deepen with Jupiter's influence. Marriage prospects excellent for singles. Married couples enjoy harmony and may plan family expansion.`,
        love: `Singles attract serious partners through friend circles or professional settings. May-August particularly auspicious for commitments. Existing relationships strengthen through shared values.`,
        marriage: `Married life harmonious. Excellent year for couples trying to conceive. Joint financial planning brings couples closer. Plan special celebrations during April-June.`,
        family: `Family gatherings bring joy. Relationship with mother especially blessed. May receive family property or inheritance. Support younger siblings during education.`,
        friendship: `Social circle expands but Saturn teaches quality over quantity. Long-lasting friendships form. Old friends may need support; be there for them.`
      },

      health: {
        summary: `Generally good health with Jupiter's protection. Focus on throat, neck, and thyroid care. Maintain healthy weight through balanced diet.`,
        physical: `Monitor thyroid function. Throat infections possible in winter months. Regular dental care important. Jupiter's aspect protects from major ailments.`,
        mental: `Positive mindset prevails. Occasional stubbornness creates stress. Practice flexibility. Meditation helps manage fixed opinions.`,
        prevention: ['Regular throat gargles with warm salt water', 'Thyroid screening every 6 months', 'Yoga for neck and shoulders', 'Balanced diet with green vegetables', 'Avoid excessive sweets despite Jupiter\'s influence']
      },

      education: {
        summary: `Excellent year for students. Jupiter's blessing enhances memory and understanding. Professional courses in finance or arts show great promise.`,
        students: `Academic performance improves dramatically. Arts, music, finance students excel. Study abroad opportunities materialize for deserving candidates.`,
        competitive: `Good preparation period. Best results if exams fall in February-April or September-November. Banking and administrative exams particularly favorable.`,
        research: `Research in traditional subjects, agriculture, or finance brings breakthroughs. Publications likely during Jupiter's direct motion periods.`
      },

      spiritual: {
        summary: `Spiritual wisdom deepens. Connection with Goddess Lakshmi and Lord Shiva brings prosperity and peace. Material and spiritual goals align beautifully.`,
        practices: ['Lakshmi puja on Fridays', 'Shukra (Venus) mantra: "Om Shum Shukraya Namah"', 'Visit Lakshmi temples monthly', 'Donate white items on Fridays', 'Practice gratitude meditation'],
        growth: `Understanding of dharma and artha (righteousness and wealth) integration deepens. Learn to balance material comforts with spiritual values.`
      },

      remedies: ['Wear diamond or white sapphire after consultation', 'Donate white rice and sugar on Fridays', 'Worship Goddess Lakshmi with lotus flowers', 'Feed cows regularly, especially white cows', 'Plant trees, especially fruit-bearing ones'],

      luckyMonths: ['January', 'February', 'March', 'April', 'June', 'November'],
      challengingMonths: ['May', 'August', 'September'],

      keyDates: [
        { date: 'Jan 14', event: 'Makar Sankranti - Excellent for donations' },
        { date: 'Apr 10', event: 'Ram Navami - Auspicious for new beginnings' },
        { date: 'May 1', event: 'Jupiter enters 2nd house - Financial blessings begin' },
        { date: 'Nov 1', event: 'Diwali - Lakshmi puja highly auspicious' }
      ]
    },

    Gemini: {
      overview: `${year} is transformative for Gemini natives. Jupiter blesses your 12th and 1st houses, bringing spiritual growth and personal renewal. Saturn in your 10th house demands career discipline and professional maturity. Rahu-Ketu axis in 10th-4th houses creates significant changes in career and home life. The ${mahaDasha} Maha Dasha period shapes your karmic direction.`,

      jupiterTransit: `Jupiter in your 12th house until May encourages foreign connections, spiritual practices, and behind-the-scenes success. Excellent for research and isolated work. From May, Jupiter enters Gemini (your 1st house), beginning a 12-year cycle of growth, expansion, and new opportunities!`,

      saturnTransit: `Saturn in your 10th house throughout ${year} brings career challenges that lead to mastery. Hard work receives recognition. Professional reputation solidifies through consistent effort and ethical conduct.`,

      rahuKetuTransit: `Rahu in 10th house creates ambitious career moves and unexpected opportunities. May bring sudden promotions or job changes. Ketu in 4th teaches detachment from property matters and encourages emotional maturity.`,

      career: {
        summary: `Challenging yet rewarding career year. Saturn demands excellence while Rahu brings unconventional opportunities. Post-May, Jupiter's entry to 1st house opens new professional doors.`,
        periods: ['Jan-April: Build foundation through hard work', 'May-July: New opportunities emerge', 'Aug-Oct: Recognition and advancement', 'Nov-Dec: Planning next phase'],
        opportunities: ['Communication and media roles', 'Technology and digital marketing', 'International business', 'Education and training', 'Writing and publishing'],
        challenges: ['Pressure from superiors', 'Work-life balance issues', 'Managing multiple responsibilities', 'Dealing with authority figures']
      },

      finance: {
        summary: `Mixed financial year. First half requires disciplined spending. Post-May, Jupiter's influence improves earning potential significantly. Focus on long-term financial planning.`,
        income: `Steady income from primary source. Post-May, new income streams develop. Freelancing or consulting brings 15-25% additional income.`,
        investments: `Conservative investments in first half. Post-May, moderate risk investments in technology or communication sectors. Emergency fund crucial.`,
        expenses: `Expenses on foreign travel or spiritual pursuits (Jan-May), property matters or home repairs (June-Aug), and professional development (Sept-Dec).`
      },

      relationships: {
        summary: `Relationships require balance between career and personal life. Saturn's influence may create distance, but Jupiter post-May brings renewed warmth.`,
        love: `Singles face delays in finding partners due to career focus. Post-May prospects improve through professional circles. Patience yields mature relationships.`,
        marriage: `Married couples need conscious effort to maintain connection. Quality time important. Career pressures shouldn't affect home harmony. Plan regular date nights.`,
        family: `Mother's health needs attention. Property matters or home renovations possible. Relationship with father influences career decisions. Support siblings emotionally.`,
        friendship: `Professional networking expands. Friendships with senior, experienced people benefit career. Maintain old friendships despite busy schedule.`
      },

      health: {
        summary: `Health requires attention, especially nervous system and respiratory areas. Stress management crucial. Jupiter's protection post-May improves vitality.`,
        physical: `Watch for stress-induced issues, respiratory problems, and nervous tension. Regular exercise important. Adequate rest non-negotiable.`,
        mental: `Mental stress from career pressures. Anxiety about performance. Meditation and breathing exercises essential. Avoid overthinking.`,
        prevention: ['Daily pranayama, especially Bhramari', 'Regular sleep schedule despite busy schedule', 'Adaptogenic herbs like Ashwagandha', 'Weekly digital detox', 'Nature walks for mental peace']
      },

      education: {
        summary: `Serious approach to education. Professional certifications and skill development crucial. Saturn rewards thorough, disciplined study.`,
        students: `Hard work required but results excellent. Competitive exam preparation favored. Technical and communication subjects show strength.`,
        competitive: `Determination and persistence key. Multiple attempts may be needed but success certain. Civil services and management exams favorable.`,
        research: `Original research in communication, technology, or social sciences brings recognition. International collaboration possible post-May.`
      },

      spiritual: {
        summary: `Spiritual inclinations strengthen, especially first half of year. Foreign spiritual teachers or practices attract you. Post-May, personal spiritual identity clarifies.`,
        practices: ['Mercury mantra: "Om Bum Budhaya Namah"', 'Daily scripture reading', 'Pranayama practice', 'Visit temples on Wednesdays', 'Learn Vedic astrology or other sacred sciences'],
        growth: `Journey from intellectual spirituality to experiential understanding. Jupiter in 12th house brings mystical experiences that transform worldview.`
      },

      remedies: ['Donate green items on Wednesdays', 'Wear emerald after proper consultation', 'Feed green grass to cows', 'Plant Tulsi in home', 'Recite Vishnu Sahasranama'],

      luckyMonths: ['March', 'May', 'June', 'July', 'November'],
      challengingMonths: ['January', 'April', 'August', 'October'],

      keyDates: [
        { date: 'May 1', event: 'Jupiter enters Gemini - Personal new year begins!' },
        { date: 'May 23', event: 'Buddha Purnima - Auspicious for Mercury ruled signs' },
        { date: 'Jul 20', event: 'Guru Purnima - Honor teachers and gurus' },
        { date: 'Nov 1', event: 'Diwali - New beginnings blessed' }
      ]
    },

    Cancer: {
      overview: `${year} brings emotional growth and career stability for Cancer natives. Jupiter transits your 11th and 12th houses, bringing gains and spiritual inclinations. Saturn in your 9th house strengthens dharma and higher learning. Rahu-Ketu activates 9th-3rd axis, creating transformations in beliefs and communication. The ${mahaDasha} Maha Dasha guides your journey.`,
      jupiterTransit: `Jupiter in 11th house until May brings gains, fulfilled desires, and beneficial friendships. Income increases through networking. From May, Jupiter enters 12th house, encouraging foreign opportunities, charity, and spiritual practices.`,
      saturnTransit: `Saturn in 9th house demands serious approach to higher education, spirituality, and long-distance matters. Father's health needs attention. Legal matters require patience.`,
      rahuKetuTransit: `Rahu in 9th brings unconventional spiritual beliefs and foreign connections. Ketu in 3rd teaches detached communication and reduces unnecessary travel.`,
      career: {
        summary: `Stable career year with networking bringing opportunities. First half shows gains. Post-May, behind-the-scenes work or foreign assignments possible.`,
        periods: ['Jan-May: Networking and collaborations', 'June-Aug: International projects', 'Sept-Nov: Consolidation', 'Dec: Planning ahead'],
        opportunities: ['Healthcare and caregiving', 'Real estate', 'Food and hospitality', 'Social work', 'International NGOs'],
        challenges: ['Emotional decision-making', 'Work-life balance', 'Managing team dynamics']
      },
      finance: {
        summary: `Good financial year. First half brings significant gains. Post-May, focus on savings and charitable giving. Expenses on spirituality and family.`,
        income: `20-30% income increase possible through networking and elder siblings' help. Multiple income sources develop.`,
        investments: `Invest in property, mutual funds. Charitable trusts show tax benefits. Avoid foreign currency speculation.`,
        expenses: `Expenses on pilgrimage (Jan-May), higher education (June-Sept), family health (Oct-Dec). Plan properly.`
      },
      relationships: {
        summary: `Emotional connections deepen. Family remains priority. Singles may find partners through spiritual or educational settings.`,
        love: `Emotional compatibility important. Singles attract partners with strong values. April-June favorable for commitments.`,
        marriage: `Nurturing phase. May face differences over belief systems but love prevails. Plan pilgrimage together.`,
        family: `Mother's health good. Father needs attention. Property matters from family side possible. Siblings supportive.`,
        friendship: `Elder friends guide you. Spiritual friendships form. Maintain boundaries in giving advice.`
      },
      health: {
        summary: `Emotional health impacts physical health. Digestive system needs care. Water retention possible. Regular exercise important.`,
        physical: `Watch digestive issues, water retention, and chest area. Seasonal allergies possible. Maintain healthy diet.`,
        mental: `Emotional sensitivity high. Mood swings possible. Meditation and journaling help. Avoid overthinking.`,
        prevention: ['Daily meditation', 'Light dinner before 8 PM', 'Moon-related remedies', 'Swimming or water activities', 'Avoid cold foods']
      },
      education: {
        summary: `Higher education favored. Philosophy, spirituality, law students excel. Foreign education opportunities arise.`,
        students: `Concentration improves. Arts, literature, history subjects favorable. Emotional intelligence helps in group projects.`,
        competitive: `Law, humanities, social service exams favorable. Preparation during Feb-May yields results.`,
        research: `Research in psychology, sociology, or spiritual sciences brings recognition. Publications likely post-May.`
      },
      spiritual: {
        summary: `Deep spiritual year. Connection with Divine Mother strengthens. Pilgrimage brings transformation.`,
        practices: ['Moon mantra: "Om Som Somaya Namah"', 'Goddess worship', 'Visit Shiva temples on Mondays', 'Fasting on Mondays', 'Charity to mothers and children'],
        growth: `Emotional maturity through spiritual practices. Understanding of bhakti yoga deepens.`
      },
      remedies: ['Wear pearl or moonstone', 'Donate milk and white rice on Mondays', 'Feed brahmins', 'Offer water to Moon', 'Plant white flowering plants'],
      luckyMonths: ['January', 'February', 'March', 'April', 'November', 'December'],
      challengingMonths: ['June', 'July', 'August'],
      keyDates: [
        { date: 'Feb 26', event: 'Maha Shivaratri - Powerful for Moon signs' },
        { date: 'May 1', event: 'Jupiter enters 12th - Spiritual phase begins' },
        { date: 'Jul 20', event: 'Guru Purnima - Honor spiritual teachers' }
      ]
    },

    Leo: {
      overview: `${year} brings professional success and personal transformation for Leo natives. Jupiter blesses 10th and 11th houses, bringing career achievements and fulfillment of desires. Saturn in 8th house brings transformation and occult interests. Rahu-Ketu on 8th-2nd axis transforms wealth and values. The ${mahaDasha} Maha Dasha influences manifestation.`,
      jupiterTransit: `Jupiter in 10th house until May brings career peak, recognition, and promotions. Excellent for leadership roles. From May, Jupiter enters 11th house, bringing gains, networking success, and elder siblings' support.`,
      saturnTransit: `Saturn in 8th house requires careful health management and research into mysteries. Inheritance matters take time. Deep transformation underway.`,
      rahuKetuTransit: `Rahu in 8th brings sudden changes, occult interests, and inheritance possibilities. Ketu in 2nd teaches detachment from wealth and improves intuitive speech.`,
      career: {
        summary: `Exceptional career year! First half brings peak recognition. Post-May, networking and collaborations expand opportunities. Leadership shines.`,
        periods: ['Jan-May: Recognition and promotions', 'June-Aug: Networking brings gains', 'Sept-Nov: Consolidation of position', 'Dec: Future planning'],
        opportunities: ['Leadership and management', 'Entertainment and creative fields', 'Government positions', 'Brand building', 'Public relations'],
        challenges: ['Managing ego', 'Delegation issues', 'Competition from peers']
      },
      finance: {
        summary: `Strong financial year. Career success brings monetary rewards. Post-May, networking and investments yield gains. Inheritance possible.`,
        income: `30-40% salary increase possible through promotions. Bonuses and incentives excellent. Multiple income streams develop.`,
        investments: `Invest in stocks, gold, and mutual funds. Real estate investments post-May favorable. Insurance and tax planning important.`,
        expenses: `Expenses on image building (Jan-May), social obligations (June-Sept), and health or research (Oct-Dec). Plan taxes well.`
      },
      relationships: {
        summary: `Relationships improve through maturity. Authority and respect in relationships balanced. Marriage prospects strong for singles.`,
        love: `Singles attract partners through professional settings. Status-conscious choices. May-Aug excellent for commitments.`,
        marriage: `Married life harmonious if pride managed. Joint financial planning important. Respect partner's independence.`,
        family: `Father's health or career influences you. Inheritance discussions possible. Support younger siblings' ambitions.`,
        friendship: `Social status elevates. Network with influential people. Old friends may feel neglected; maintain balance.`
      },
      health: {
        summary: `Generally good health but 8th house Saturn requires preventive care. Heart health important. Chronic issues need attention.`,
        physical: `Monitor heart health, spine, and chronic conditions. Regular check-ups mandatory. Emergency situations possible; stay prepared.`,
        mental: `Mental strength improves. Interest in psychology and mysteries. Avoid obsessive thinking about problems.`,
        prevention: ['Heart health screening', 'Daily cardiovascular exercise', 'Stress management', 'Adequate sleep', 'Avoid excessive heat and anger']
      },
      education: {
        summary: `Professional education and certifications bring career advantage. Management, leadership courses highly beneficial.`,
        students: `Leadership roles in student activities. Competition brings out best. Science and administrative subjects favored.`,
        competitive: `Administrative services, management exams excellent. Best preparation Jan-April. Results excellent.`,
        research: `Research in occult, psychology, or transformation sciences brings breakthroughs. Hidden knowledge revealed.`
      },
      spiritual: {
        summary: `Spiritual leadership develops. Connection with Sun God strengthens. Interest in tantric or transformational practices.`,
        practices: ['Surya mantra: "Om Hram Hreem Hraum Sah Suryaya Namah"', 'Surya Namaskar daily', 'Sunday fasting', 'Donate to spiritual causes', 'Study spiritual leadership texts'],
        growth: `Leadership in spiritual contexts. Learning to serve while leading. Ego dissolution through service.`
      },
      remedies: ['Wear ruby after consultation', 'Donate wheat and jaggery on Sundays', 'Offer water to Sun at sunrise', 'Feed hungry people', 'Support educational institutions'],
      luckyMonths: ['January', 'February', 'March', 'April', 'May', 'November'],
      challengingMonths: ['July', 'August', 'September'],
      keyDates: [
        { date: 'Jan 14', event: 'Makar Sankranti - Sun\'s northward journey begins' },
        { date: 'Apr 10', event: 'Ram Navami - Auspicious for Sun signs' },
        { date: 'May 1', event: 'Jupiter enters 11th - Gains begin' }
      ]
    },

    Virgo: {
      overview: `${year} brings spiritual wisdom and foreign opportunities for Virgo natives. Jupiter transits 9th and 10th houses, blessing higher learning and career. Saturn in 7th house matures partnerships. Rahu-Ketu on 7th-1st axis transforms relationships and self-identity. The ${mahaDasha} Maha Dasha shapes this journey.`,
      jupiterTransit: `Jupiter in 9th house until May brings spiritual growth, higher education, and long-distance travel. Father's support increases. From May, Jupiter enters 10th house, bringing career success and recognition!`,
      saturnTransit: `Saturn in 7th house throughout ${year} brings serious partnerships, delayed but stable marriages, and mature business relationships. Patience required.`,
      rahuKetuTransit: `Rahu in 7th creates unconventional partnerships and foreign spouse possibilities. Ketu in 1st (Virgo) brings spiritual self-awareness and health consciousness.`,
      career: {
        summary: `Progressive career year. First half focuses on skill development and networking. Post-May, career takes major leap forward with promotions possible.`,
        periods: ['Jan-May: Learning and preparation', 'June-Aug: Career advancement begins', 'Sept-Nov: Recognition and rewards', 'Dec: Leadership opportunities'],
        opportunities: ['Analytics and research', 'Healthcare and wellness', 'Teaching and consulting', 'Quality control and auditing', 'Service industry leadership'],
        challenges: ['Perfectionism causing delays', 'Over-analysis', 'Partnership conflicts at work']
      },
      finance: {
        summary: `Gradual financial improvement. First half moderate. Post-May, significant income increase through career advancement. Partnership business favorable.`,
        income: `15-25% income growth. Post-May, bonuses and incentives improve. Partnership ventures bring additional income.`,
        investments: `Healthcare, technology, and service sector stocks favorable. Start SIPs in February. Long-term approach wins.`,
        expenses: `Expenses on education or pilgrimage (Jan-May), professional development (June-Sept), and partnership or marriage matters (Oct-Dec).`
      },
      relationships: {
        summary: `Relationship year! Saturn's influence brings serious commitments. Singles likely to marry. Married couples deepen bonds through maturity.`,
        love: `Singles meet serious, mature partners. Foreign connections possible. Relationships require work but are stable. June-November excellent for marriage.`,
        marriage: `Married couples work through issues with patience. Business partnerships with spouse favorable. Renewal of commitment possible.`,
        family: `Father's guidance important. Spiritual discussions with family. Support parents' health needs. Siblings may need advice.`,
        friendship: `Quality over quantity. Few deep friendships better than many superficial ones. Business partnerships through friends.`
      },
      health: {
        summary: `Health improves with Ketu in 1st house dissolving chronic issues. Focus on digestive health and nervous system. Spiritual practices enhance vitality.`,
        physical: `Digestive system, intestines, and nervous system need care. Generally improving health. Chronic issues reduce significantly.`,
        mental: `Analytical mind can create anxiety. Meditation essential. Avoid overthinking health issues. Trust body's wisdom.`,
        prevention: ['Probiotic-rich foods for gut health', 'Regular yoga practice', 'Meditation to calm mind', 'Herbal teas for digestion', 'Avoid processed foods']
      },
      education: {
        summary: `Excellent education year. Higher studies, foreign education, and professional certifications highly favorable. Jupiter's blessing enhances learning.`,
        students: `Academic excellence. Science, mathematics, research subjects excel. Study abroad opportunities. Scholarships possible.`,
        competitive: `Technical and analytical exams highly favorable. Engineering, medicine, research positions. Jan-May preparation yields results.`,
        research: `Original research brings recognition. Publications and presentations successful. International collaborations possible.`
      },
      spiritual: {
        summary: `Deep spiritual year with Ketu in own sign. Interest in Vedic knowledge, astrology, and healing practices. Service becomes spiritual practice.`,
        practices: ['Mercury mantra on Wednesdays', 'Vishnu worship', 'Study of sacred texts', 'Service to sick and needy', 'Meditation on bodily awareness'],
        growth: `Journey from intellectual understanding to embodied wisdom. Perfection in imperfection realized. Service as spiritual path.`
      },
      remedies: ['Wear emerald after consultation', 'Donate green items on Wednesdays', 'Feed cows with green grass', 'Recite Vishnu Sahasranama', 'Serve in charitable hospitals'],
      luckyMonths: ['February', 'March', 'April', 'June', 'July', 'November'],
      challengingMonths: ['January', 'August', 'October'],
      keyDates: [
        { date: 'May 1', event: 'Jupiter enters 10th - Career boost begins!' },
        { date: 'May 23', event: 'Buddha Purnima - Auspicious for Mercury signs' },
        { date: 'Jul 20', event: 'Guru Purnima - Educational blessings' }
      ]
    },

    Libra: {
      overview: `${year} brings fortune and expansion for Libra natives. Jupiter blesses 8th and 9th houses, bringing transformation and higher wisdom. Saturn in 6th house helps overcome obstacles and enemies. Rahu-Ketu on 6th-12th axis transforms service and spirituality. The ${mahaDasha} Maha Dasha guides transformation.`,
      jupiterTransit: `Jupiter in 8th house until May brings research abilities, occult interests, and possible inheritance. Transformation through knowledge. From May, Jupiter enters 9th house, bringing luck, spiritual wisdom, and long-distance opportunities!`,
      saturnTransit: `Saturn in 6th house helps systematically overcome obstacles, health issues, and competition. Hard work defeats enemies. Service becomes dharma.`,
      rahuKetuTransit: `Rahu in 6th brings unconventional healing methods and victory over litigation. Ketu in 12th encourages foreign spirituality and charitable detachment.`,
      career: {
        summary: `Research and transformation phase first half. Post-May, career expands through higher qualifications, teaching, or international opportunities. Legal and advisory roles favorable.`,
        periods: ['Jan-May: Research and behind-scenes work', 'June-Aug: International opportunities', 'Sept-Nov: Teaching and advisory roles', 'Dec: Recognition'],
        opportunities: ['Law and justice', 'Diplomacy and counseling', 'Art and design', 'International business', 'Teaching and publishing'],
        challenges: ['Decision-making delays', 'Partnership disagreements', 'Perfectionism in work']
      },
      finance: {
        summary: `Mixed first half with expenses on research or health. Post-May, luck improves finances significantly. Inheritance or insurance gains possible.`,
        income: `Moderate first half. Post-May, 25-35% income increase through promotions or foreign assignments. Father's support financially.`,
        investments: `First half favors insurance and health investments. Post-May, international funds, gold, and mutual funds excellent. Avoid speculation.`,
        expenses: `Expenses on health or research (Jan-May), father's needs or legal matters (June-Sept), spiritual or foreign travel (Oct-Dec).`
      },
      relationships: {
        summary: `Partnership focus continues. Balance and harmony remain important. Post-May, relationship with father improves. Foreign connections in love possible.`,
        love: `Singles meet partners through educational or spiritual settings post-May. Foreign or different cultural background possible. Patience yields quality.`,
        marriage: `Legal formalizations favorable post-May. Married couples enjoy harmony through shared learning. Plan pilgrimage together.`,
        family: `Father's health and guidance important. Relationship deepens post-May. Inheritance discussions possible. Support family legal matters.`,
        friendship: `Friendships through spiritual or educational circles. Foreign friends influence positively. Quality connections deepen.`
      },
      health: {
        summary: `Health improves significantly with Saturn in 6th dissolving chronic issues. Focus on kidney health and hormonal balance. General vitality good.`,
        physical: `Kidney health, lower back, and hormonal system need monitoring. Chronic diseases reduce. Healing abilities develop.`,
        mental: `Mental balance improves. Interest in psychology and counseling. Meditation enhances peace. Avoid over-analyzing relationships.`,
        prevention: ['Kidney health check-ups', 'Balanced diet with less salt', 'Yoga for lower back', 'Relationship counseling if needed', 'Regular detoxification']
      },
      education: {
        summary: `Excellent education year, especially post-May. Higher education, law, philosophy highly favorable. Foreign education very auspicious.`,
        students: `Academic performance excellent post-May. Law, arts, languages excel. Study abroad dreams materialize. Scholarships possible.`,
        competitive: `Judicial services, foreign services, management exams favorable. Best preparation Feb-May. Results excellent post-May.`,
        research: `Research in law, social sciences, or occult brings recognition. International publications possible. Breakthroughs in understanding.`
      },
      spiritual: {
        summary: `Spiritual journey intensifies. Interest in foreign spiritual traditions. Father may become spiritual guide. Dharma understanding deepens.`,
        practices: ['Venus mantra: "Om Shum Shukraya Namah"', 'Lakshmi worship on Fridays', 'Study of spiritual texts', 'Pilgrimage post-May', 'Balance and harmony meditation'],
        growth: `Understanding of dharma through relationships. Learning to balance material and spiritual. Justice becomes spiritual practice.`
      },
      remedies: ['Wear diamond after consultation', 'Donate white items on Fridays', 'Feed cows and brahmins', 'Offer white flowers to Venus', 'Support women\'s education'],
      luckyMonths: ['February', 'March', 'June', 'July', 'August', 'November'],
      challengingMonths: ['January', 'April', 'October'],
      keyDates: [
        { date: 'May 1', event: 'Jupiter enters 9th - Fortune begins!' },
        { date: 'Jul 20', event: 'Guru Purnima - Excellent for higher learning' },
        { date: 'Nov 1', event: 'Diwali - Lakshmi blessings abundant' }
      ]
    },

    Scorpio: {
      overview: `${year} brings partnership focus and deep transformation for Scorpio natives. Jupiter in 7th and 8th houses blesses relationships and mysteries. Saturn in 5th brings discipline to creativity and children. Rahu-Ketu on 5th-11th axis transforms education and gains. The ${mahaDasha} Maha Dasha influences deep changes.`,
      jupiterTransit: `Jupiter in 7th house until May brings marriage opportunities, business partnerships, and travel. Relationships expand horizons. From May, Jupiter enters 8th house, deepening research, occult studies, and transformation.`,
      saturnTransit: `Saturn in 5th house requires patience with children, disciplined creative work, and serious approach to education. Romance faces tests but matures.`,
      rahuKetuTransit: `Rahu in 5th creates unconventional creative expression and sudden gains from speculation (be careful!). Ketu in 11th teaches detachment from social validation.`,
      career: {
        summary: `Partnership-oriented career first half. Collaborations bring success. Post-May, research, investigation, or transformational work favored. Depth over breadth.`,
        periods: ['Jan-May: Partnerships and collaborations', 'June-Aug: Research and transformation', 'Sept-Nov: Recognition for depth work', 'Dec: Strategic planning'],
        opportunities: ['Investigation and research', 'Psychology and healing', 'Occult sciences', 'Surgery and medical fields', 'Financial investigation and auditing'],
        challenges: ['Trust issues in partnerships', 'Intensity overwhelming others', 'Obsessive perfectionism']
      },
      finance: {
        summary: `Partnership income first half. Post-May, inheritance, insurance, or joint resources bring gains. Investments show good returns. Avoid speculation despite Rahu.`,
        income: `Partnership businesses increase income 20-30%. Post-May, spouse's income or joint resources improve finances. Research work pays well.`,
        investments: `Insurance, healthcare stocks, and transformation sector investments favorable. Real estate through partnerships. Avoid gambling.`,
        expenses: `Expenses on partnerships or marriage (Jan-May), children's education or creative projects (June-Sept), research or health (Oct-Dec).`
      },
      relationships: {
        summary: `Major relationship year! Marriage very likely for singles. Business partnerships flourish. Intensity and depth characterize all connections.`,
        love: `Singles likely to marry! Intense, transformative partnerships. Foreign connections possible. Feb-April excellent for commitments.`,
        marriage: `Married life deepens through shared transformation. Joint financial planning crucial. May need counseling for intensity management.`,
        family: `Children need special attention with Saturn's influence. Patience required. Creative projects with children bond you. Father's guidance helps.`,
        friendship: `Friendships intense and loyal. Quality over quantity. Ketu reduces interest in superficial networking. Deep bonds strengthen.`
      },
      health: {
        summary: `Reproductive health and chronic issues need attention. Emotional health impacts physical body. Deep healing through alternative therapies possible.`,
        physical: `Reproductive system, chronic diseases, and emotional-physical connection important. Regular check-ups mandatory. Healing abilities develop.`,
        mental: `Intense emotions need healthy outlets. Therapy or counseling beneficial. Obsessive tendencies managed through meditation. Transformation underway.`,
        prevention: ['Regular health screenings', 'Emotional release practices', 'Therapy or counseling', 'Alternative healing exploration', 'Avoid suppressing emotions']
      },
      education: {
        summary: `Research and deep subjects favored. Psychology, occult, medicine excellent. Children's education needs patient attention. Creative learning works.`,
        students: `Research subjects excel. Medical, psychology, detective work attract. Concentration excellent for depth subjects. Scholarships possible.`,
        competitive: `Medical, investigative services, research positions favorable. Persistence wins. Best preparation during Saturn's disciplined influence.`,
        research: `Breakthrough research in transformation sciences, psychology, or occult. Hidden knowledge revealed. Publications bring recognition.`
      },
      spiritual: {
        summary: `Deep spiritual transformation. Interest in tantra, mysticism, and hidden knowledge. Death and rebirth consciousness awakens. Power through surrender.`,
        practices: ['Mars mantra: "Om Kram Kreem Kroum Sah Mangalaye Namah"', 'Kali or Durga worship', 'Tantric practices under guidance', 'Transformation meditation', 'Service to dying or healing'],
        growth: `Understanding of transformation and regeneration. Death of ego. Rebirth into spiritual warrior. Power through vulnerability.`
      },
      remedies: ['Wear red coral after consultation', 'Donate red items on Tuesdays', 'Hanuman worship', 'Feed poor on Tuesdays', 'Practice forgiveness meditation'],
      luckyMonths: ['January', 'February', 'March', 'April', 'June', 'November'],
      challengingMonths: ['May', 'August', 'September'],
      keyDates: [
        { date: 'Feb 26', event: 'Maha Shivaratri - Powerful transformation day' },
        { date: 'Apr 10', event: 'Ram Navami - Auspicious for partnerships' },
        { date: 'May 1', event: 'Jupiter enters 8th - Deep transformation begins' }
      ]
    },

    Sagittarius: {
      overview: `${year} brings work focus and health consciousness for Sagittarius natives. Jupiter in 6th and 7th houses improves service and partnerships. Saturn in 4th brings home responsibilities and emotional maturity. Rahu-Ketu on 4th-10th axis transforms home and career. The ${mahaDasha} Maha Dasha guides priorities.`,
      jupiterTransit: `Jupiter in 6th house until May helps overcome obstacles, improves health, and brings success in service. Helpful in competitions. From May, Jupiter enters 7th house, bringing marriage, partnerships, and travel opportunities!`,
      saturnTransit: `Saturn in 4th house requires attention to mother's health, property matters, and emotional foundation. Home responsibilities increase. Patience with family needed.`,
      rahuKetuTransit: `Rahu in 4th brings unusual home situations or foreign property. Ketu in 10th creates detachment from career fame but success through selfless service.`,
      career: {
        summary: `Service-oriented first half. Post-May, partnerships and collaborations elevate career. Teaching, advisory, and consulting roles excellent. International opportunities.`,
        periods: ['Jan-May: Service and skill building', 'June-Aug: Partnerships form', 'Sept-Nov: International projects', 'Dec: Recognition for collaboration'],
        opportunities: ['Teaching and education', 'International business', 'Publishing and media', 'Sports and adventure', 'Spiritual counseling'],
        challenges: ['Home-work balance', 'Emotional stress affecting work', 'Over-commitment to service']
      },
      finance: {
        summary: `Steady first half through service. Post-May, partnership income increases significantly. Property investments favorable but require due diligence with Rahu.`,
        income: `15-25% increase first half through dedication. Post-May, business partnerships double potential income. International clients possible.`,
        investments: `Real estate investments require careful verification. Post-May, partnership businesses favorable. Foreign market investments show promise.`,
        expenses: `Expenses on home repairs or mother's health (Jan-May), service to others (June-Sept), partnership investments (Oct-Dec). Plan well.`
      },
      relationships: {
        summary: `Partnership year post-May! Marriage very auspicious. Family matters require patience. Balance between home and relationships needed.`,
        love: `Singles meet partners through work first half, through travel post-May. Foreign connections possible. June-October excellent for marriage.`,
        marriage: `Married couples enjoy renewed romance post-May. Travel together strengthens bonds. Work on emotional communication. Plan celebrations.`,
        family: `Mother's health needs attention. Property matters from family. Emotional foundation work necessary. Support mother actively.`,
        friendship: `Service-oriented friendships first half. Post-May, partners become friends. International friendships expand worldview.`
      },
      health: {
        summary: `Health improves first half with Jupiter's help. Focus on liver health and hips/thighs. Emotional stress impacts physical body. Exercise crucial.`,
        physical: `Liver health, hips, thighs, and sciatic nerve need care. Generally improving health. Exercise and outdoor activities essential.`,
        mental: `Optimistic nature helps. Emotional stress from home matters possible. Philosophy and spirituality maintain mental health. Avoid escapism.`,
        prevention: ['Liver detox periodically', 'Regular exercise, especially outdoor', 'Hip and thigh strengthening', 'Meditation for emotional health', 'Avoid excessive indulgence']
      },
      education: {
        summary: `Higher education continues favorably. Teaching others enhances own learning. International education or collaboration excellent post-May. Philosophy and law favored.`,
        students: `Service through education. Teaching others solidifies learning. International opportunities post-May. Higher studies very favorable.`,
        competitive: `Judicial, foreign services, teaching positions excellent. Best preparation Jan-May. Results excellent. International posts possible.`,
        research: `Research in philosophy, law, or international studies brings recognition. Collaborative research post-May successful. Publications likely.`
      },
      spiritual: {
        summary: `Service as spiritual practice first half. Post-May, relationships become spiritual teachers. Dharma and relationships integrate. Guru's grace strong.`,
        practices: ['Jupiter mantra: "Om Gram Greem Graum Sah Gurave Namah"', 'Vishnu worship', 'Study of Bhagavad Gita', 'Service to teachers', 'Thursday fasting and charity'],
        growth: `Understanding that service is worship. Relationships as mirrors for growth. Dharma through righteous action. Wisdom through experience.`
      },
      remedies: ['Wear yellow sapphire after consultation', 'Donate yellow items on Thursdays', 'Feed brahmins and teachers', 'Worship Lord Vishnu', 'Plant banana trees'],
      luckyMonths: ['January', 'March', 'June', 'July', 'August', 'November'],
      challengingMonths: ['February', 'April', 'October'],
      keyDates: [
        { date: 'May 1', event: 'Jupiter enters 7th - Partnership blessings begin!' },
        { date: 'Jul 20', event: 'Guru Purnima - Most auspicious for Jupiter signs' },
        { date: 'Nov 1', event: 'Diwali - New relationship beginnings' }
      ]
    },

    Capricorn: {
      overview: `${year} brings creativity and romance for Capricorn natives. Jupiter in 5th and 6th houses blesses children, creativity, and health. Saturn in 3rd strengthens communication and courage. Rahu-Ketu on 3rd-9th axis transforms beliefs and communication. The ${mahaDasha} Maha Dasha shapes creative expression.`,
      jupiterTransit: `Jupiter in 5th house until May brings children's blessings, creative success, and romantic opportunities. Speculation may favor (carefully!). From May, Jupiter enters 6th house, improving health and helping overcome obstacles.`,
      saturnTransit: `Saturn in 3rd house throughout ${year} brings serious approach to communication, media, and siblings. Writing and teaching mature. Courage develops through challenges.`,
      rahuKetuTransit: `Rahu in 3rd creates unconventional communication and sudden short travels. Ketu in 9th teaches questioning dogma and finding personal truth.`,
      career: {
        summary: `Creative and leadership roles first half. Post-May, service and problem-solving bring recognition. Communication skills advance career significantly.`,
        periods: ['Jan-May: Creative projects and leadership', 'June-Aug: Service excellence', 'Sept-Nov: Recognition for dedication', 'Dec: Strategic communication'],
        opportunities: ['Management and administration', 'Engineering and construction', 'Government positions', 'Media and communication', 'Teaching and training'],
        challenges: ['Rigidity in approach', 'Work-life balance', 'Communication can be too serious']
      },
      finance: {
        summary: `Good financial year. Creative work pays well first half. Post-May, steady income through dedicated service. Investment in communication or writing pays off.`,
        income: `20-30% income increase. Creative projects or children's ventures bring additional income. Post-May, bonuses for problem-solving.`,
        investments: `Media, communication technology stocks favorable. Real estate investments good with Saturn's discipline. SIPs show steady growth.`,
        expenses: `Expenses on children or creative projects (Jan-May), siblings or short travels (June-Sept), health check-ups (Oct-Dec). Planned expenses.`
      },
      relationships: {
        summary: `Romantic year! Singles may find love through creative or social settings. Family relationships mature. Communication key to all relationships.`,
        love: `Singles have excellent romantic prospects first half. Creative or social events bring connections. Feb-April very auspicious. Mature choices favored.`,
        marriage: `Married couples enjoy romantic renewal. Children may be born or bring joy. Communication about feelings important. Plan special moments.`,
        family: `Siblings need support. Communication with family members requires patience but improves. Father's guidance valuable. Mother's health stable.`,
        friendship: `Friendships through hobbies or creative pursuits. Communication-based connections. Mentoring younger friends brings joy.`
      },
      health: {
        summary: `Health good overall. Focus on bones, joints, and knees. Post-May, chronic issues resolve. Communication stress affects shoulders and arms.`,
        physical: `Bones, joints, knees, and skeletal system need care. Generally improving health. Dental check-ups important. Exercise builds strength.`,
        mental: `Mental discipline strong. Tendency toward pessimism needs management. Creative expression releases stress. Avoid overthinking.`,
        prevention: ['Calcium and vitamin D supplementation', 'Joint-friendly exercises', 'Shoulder and neck stretches', 'Regular dental care', 'Positive affirmations']
      },
      education: {
        summary: `Excellent education year. Creative subjects, management, engineering favored. Communication skills enhance all learning. Leadership in student activities.`,
        students: `Leadership roles. Engineering, management, administrative studies excel. Competitive success. Communication skills give edge.`,
        competitive: `Civil services, engineering services, management exams favorable. Disciplined preparation wins. Best period Jan-May and Sept-Nov.`,
        research: `Research in engineering, management, or communication brings recognition. Practical applications emphasized. Publication success likely.`
      },
      spiritual: {
        summary: `Spiritual discipline strengthens. Karma yoga (action without attachment) becomes natural. Spiritual truths communicated effectively. Service is worship.`,
        practices: ['Saturn mantra: "Om Sham Shanishcharaya Namah"', 'Shiva worship on Saturdays', 'Hanuman Chalisa for courage', 'Service to poor and disabled', 'Discipline in spiritual practice'],
        growth: `Understanding dharma through discipline. Spiritual communication develops. Leadership through service. Karma yoga mastery progressing.`
      },
      remedies: ['Wear blue sapphire after consultation', 'Donate black items on Saturdays', 'Feed crows and poor', 'Worship Lord Shani', 'Service to elderly and disabled'],
      luckyMonths: ['January', 'February', 'March', 'April', 'November', 'December'],
      challengingMonths: ['June', 'August', 'September'],
      keyDates: [
        { date: 'Jan 14', event: 'Makar Sankranti - Most auspicious for Capricorn!' },
        { date: 'Feb 26', event: 'Maha Shivaratri - Powerful for Saturn signs' },
        { date: 'May 1', event: 'Jupiter enters 6th - Health improvement begins' }
      ]
    },

    Aquarius: {
      overview: `${year} brings domestic harmony and creative expression for Aquarius natives. Jupiter in 4th and 5th houses blesses home and children. Saturn in 2nd requires financial discipline and mindful speech. Rahu-Ketu on 2nd-8th axis transforms wealth and values. The ${mahaDasha} Maha Dasha guides material transformation.`,
      jupiterTransit: `Jupiter in 4th house until May brings property gains, mother's blessings, and emotional peace. Home becomes sanctuary. From May, Jupiter enters 5th house, bringing children's joy, creative success, and romance!`,
      saturnTransit: `Saturn in 2nd house requires financial discipline, careful speech, and family responsibilities. Savings increase through methodical planning. Traditional values strengthen.`,
      rahuKetuTransit: `Rahu in 2nd creates unconventional income sources and unusual family dynamics. Ketu in 8th brings spiritual transformation and research abilities.`,
      career: {
        summary: `Work-from-home or property-related career first half. Post-May, creative and leadership roles expand. Innovation and humanitarian work favored.`,
        periods: ['Jan-May: Foundation building and property', 'June-Aug: Creative leadership emerges', 'Sept-Nov: Recognition for innovation', 'Dec: Strategic planning'],
        opportunities: ['Technology and innovation', 'Social work and NGOs', 'Property and real estate', 'Creative industries', 'Teaching and mentoring'],
        challenges: ['Financial pressure from Saturn', 'Balancing idealism with practicality', 'Communication issues']
      },
      finance: {
        summary: `Challenging but growth-oriented year. Saturn demands discipline but builds strong foundation. Property gains first half. Creative income post-May. Long-term planning crucial.`,
        income: `Moderate income requiring disciplined budgeting. Property or home-based business brings additional income. Post-May, creative projects pay well.`,
        investments: `Property investments excellent first half. Post-May, creative industry stocks. Emergency fund building essential with Saturn in 2nd.`,
        expenses: `Expenses on home renovation or mother (Jan-May), children or education (June-Sept), research or transformation (Oct-Dec). Budget carefully.`
      },
      relationships: {
        summary: `Family bonds strengthen. Romantic prospects improve post-May. Communication about values important. Humanitarian relationships enrich life.`,
        love: `Singles find partners through family connections first half or creative/social settings post-May. Shared values crucial. July-October favorable.`,
        marriage: `Married life peaceful. Home harmony excellent first half. Children bring joy post-May. Financial discussions need patience and clarity.`,
        family: `Mother's health excellent. Family gatherings bring joy. Property matters from family favorable. Siblings supportive. Traditional values appreciated.`,
        friendship: `Humanitarian and social cause friendships. Creative collaborations post-May. Quality friendships over quantity. Spiritual friends guide.`
      },
      health: {
        summary: `Good health overall. Focus on circulation, ankles, and nervous system. Emotional peace first half improves vitality. Creative expression heals post-May.`,
        physical: `Circulation, ankles, calves, and nervous system need care. Generally good health. Avoid cold exposure. Regular movement important.`,
        mental: `Mental peace excellent first half. Post-May, creative expression releases stress. Avoid future anxiety. Present moment awareness helps.`,
        prevention: ['Circulation-improving exercises', 'Ankle strengthening', 'Warm clothing in cold', 'Creative expression for mental health', 'Social connections']
      },
      education: {
        summary: `Property or home-based learning first half. Post-May, creative education, children's education, and leadership training excellent. Innovation favored.`,
        students: `Science, technology, social sciences excel. Creative subjects bring recognition post-May. Study environment at home productive first half.`,
        competitive: `Technical services, social services, innovative fields favorable. Unique approaches win. Best preparation during Saturn's disciplined influence.`,
        research: `Research in technology, social sciences, or occult brings breakthroughs post-May. Innovative methodologies. Recognition for unique approaches.`
      },
      spiritual: {
        summary: `Humanitarian spirituality. Service to collective. Understanding universal brotherhood. Transformation through research and hidden knowledge.`,
        practices: ['Saturn mantra for discipline', 'Service to humanitarian causes', 'Group meditation and spiritual practices', 'Study of progressive spiritual texts', 'Detachment meditation with Ketu\'s influence'],
        growth: `Understanding collective consciousness. Individual transformation for collective good. Spiritual innovation. Ancient wisdom, modern application.`
      },
      remedies: ['Wear blue sapphire after careful consultation', 'Donate to social causes on Saturdays', 'Feed poor and needy', 'Worship Lord Shani', 'Plant trees for environmental service'],
      luckyMonths: ['January', 'February', 'March', 'June', 'July', 'November'],
      challengingMonths: ['April', 'August', 'October'],
      keyDates: [
        { date: 'Feb 26', event: 'Maha Shivaratri - Powerful for Saturn-ruled signs' },
        { date: 'May 1', event: 'Jupiter enters 5th - Creative blessings begin!' },
        { date: 'Aug 27', event: 'Janmashtami - Innovation and strategic thinking' }
      ]
    },

    Pisces: {
      overview: `${year} is transformative for Pisces natives. Jupiter in 3rd and 4th houses blesses communication and home. Saturn in own sign (Pisces) in 1st house brings maturity and spiritual depth. Rahu-Ketu on 1st-7th axis transforms self and relationships. The ${mahaDasha} Maha Dasha guides profound changes.`,
      jupiterTransit: `Jupiter in 3rd house until May enhances courage, communication, and sibling relationships. Writing and teaching excel. From May, Jupiter enters 4th house, bringing property gains, mother's blessings, and emotional peace!`,
      saturnTransit: `Saturn in Pisces (1st house) throughout ${year} brings personal transformation, spiritual maturity, and life lessons. Patience, discipline, and surrender themes emerge. Authenticity develops.`,
      rahuKetuTransit: `Rahu in own sign brings intense self-transformation and spiritual seeking. Ketu in 7th teaches detachment in relationships and selfless partnership. Major identity evolution.`,
      career: {
        summary: `Communication and skill-based work first half. Post-May, work-from-home or property-related career favorable. Spiritual or creative work brings fulfillment.`,
        periods: ['Jan-May: Communication and skill building', 'June-Aug: Property or home-based work', 'Sept-Nov: Recognition for depth', 'Dec: Spiritual career integration'],
        opportunities: ['Spiritual counseling and healing', 'Creative arts and music', 'Healthcare and caregiving', 'Writing and teaching', 'Property and hospitality'],
        challenges: ['Self-doubt from Saturn', 'Confusion about direction', 'Balancing material and spiritual']
      },
      finance: {
        summary: `Moderate financial year requiring discipline. Communication work pays first half. Property or family support post-May. Saturn teaches financial responsibility.`,
        income: `Steady income through persistent effort. Writing, teaching, or communication brings 15-25% increase. Post-May, property or mother's support.`,
        investments: `Conservative investments. Property investments post-May favorable. Spiritual businesses show promise. Avoid speculation with Rahu in 1st.`,
        expenses: `Expenses on self-development and health (throughout year), siblings or short travel (Jan-May), home or mother (June-Dec). Careful budgeting needed.`
      },
      relationships: {
        summary: `Major relationship transformation. Ketu in 7th brings detachment teaching. Singles attract spiritual partners. Married couples deepen through trials. Selfless love emerges.`,
        love: `Singles attract spiritual or foreign partners. Unconventional connections possible. Relationship tests lead to authentic love. Patience crucial.`,
        marriage: `Married couples face tests but emerge stronger. Spiritual growth through relationship challenges. Selflessness learned. Counseling beneficial if needed.`,
        family: `Mother's health excellent post-May. Mother's support strong. Siblings need communication. Family becomes spiritual sangha. Ancestral healing possible.`,
        friendship: `Spiritual friendships deepen. Fair-weather friends fall away. Quality over quantity. Service-oriented friendships. Solitude also valued.`
      },
      health: {
        summary: `Health needs attention with Saturn in 1st. Feet, lymphatic system, and immune system focus. Spiritual practices heal. Discipline in health routine essential.`,
        physical: `Feet, lymphatic system, immune system, and overall vitality need care. Chronic issues may surface for healing. Regular check-ups important.`,
        mental: `Emotional sensitivity high. Spiritual practices essential for mental health. Avoid escapism through substances. Meditation and service heal.`,
        prevention: ['Daily spiritual practice non-negotiable', 'Foot care and comfortable footwear', 'Immune system support', 'Adequate rest and boundaries', 'Avoid alcohol and drugs']
      },
      education: {
        summary: `Communication skills develop first half. Post-May, emotional intelligence and psychology favored. Spiritual education transformative. Artistic subjects excel.`,
        students: `Arts, music, psychology, spirituality excel. Communication skills improve. Concentration requires discipline. Study environment important.`,
        competitive: `Creative services, healthcare, spiritual counseling fields favorable. Persistence needed. Multiple attempts possible but success certain.`,
        research: `Research in psychology, spirituality, arts, or healing brings profound insights. Original approaches. Publication requires persistence but succeeds.`
      },
      spiritual: {
        summary: `Most spiritual year! Saturn in Pisces brings moksha (liberation) consciousness. Rahu intensifies spiritual seeking. Surrender and service become way of life.`,
        practices: ['Jupiter mantra for wisdom', 'Meditation and contemplation daily', 'Service to suffering beings', 'Study of liberation texts', 'Surrender practices', 'Artistic spiritual expression'],
        growth: `Profound transformation. Death of old identity. Rebirth in spiritual awareness. Understanding suffering and compassion. Moksha path clarifies.`
      },
      remedies: ['Wear yellow sapphire for Jupiter support', 'Regular temple visits and service', 'Feed fish and aquatic animals', 'Donate to spiritual causes', 'Worship Lord Vishnu or Divine Mother'],
      luckyMonths: ['March', 'April', 'June', 'July', 'November', 'December'],
      challengingMonths: ['January', 'February', 'August', 'September'],
      keyDates: [
        { date: 'Feb 26', event: 'Maha Shivaratri - Most powerful for spiritual transformation' },
        { date: 'May 1', event: 'Jupiter enters 4th - Emotional peace begins' },
        { date: 'Nov 1', event: 'Diwali - Light emerging from darkness' }
      ]
    }
  };

  // Return the forecast for the specific moon sign, fallback to Aries if not found
  return forecasts[moonSign] || forecasts.Aries;
}
