"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, Minus, Star, Heart, Briefcase, DollarSign, Activity, AlertTriangle, Sparkles, CheckCircle2 } from "lucide-react";

interface MonthlyPredictionsProps {
  moonSign: string;
  ascendant: string;
  year?: number;
}

interface MonthForecast {
  month: string;
  rating: number; // 1-5 stars
  theme: string;
  overview: string;
  career: string;
  finance: string;
  relationships: string;
  health: string;
  opportunities: string[];
  challenges: string[];
  remedies: string[];
  luckyDates: string[];
  luckyColors: string[];
  luckyNumbers: number[];
  avoid: string[];
}

export function MonthlyPredictions({ moonSign, ascendant, year = 2026 }: MonthlyPredictionsProps) {
  const monthlyForecasts = getMonthlyForecasts(moonSign, year);

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, idx) => (
      <Star
        key={idx}
        className={`w-4 h-4 ${idx < rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
      />
    ));
  };

  const getTrendIcon = (rating: number) => {
    if (rating >= 4) return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (rating <= 2) return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-purple/5">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-gold to-purple bg-clip-text text-transparent">
            Month-by-Month Predictions for {year}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Detailed monthly guidance for {moonSign} Moon Sign
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Monthly Forecasts */}
      {monthlyForecasts.map((forecast, idx) => (
        <Card key={idx} className={`border-l-4 ${
          forecast.rating >= 4 ? 'border-l-green-500' :
          forecast.rating <= 2 ? 'border-l-red-500' :
          'border-l-orange-500'
        }`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-lg md:text-xl">{forecast.month} {year}</CardTitle>
                  {getTrendIcon(forecast.rating)}
                </div>
                <div className="flex items-center space-x-2">
                  {getRatingStars(forecast.rating)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {forecast.rating === 5 ? 'Excellent' :
                     forecast.rating === 4 ? 'Very Good' :
                     forecast.rating === 3 ? 'Moderate' :
                     forecast.rating === 2 ? 'Challenging' : 'Difficult'}
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {forecast.theme}
              </Badge>
            </div>
            <CardDescription className="text-base mt-3 leading-relaxed">
              {forecast.overview}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Life Areas */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Career */}
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>Career & Work</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{forecast.career}</p>
              </div>

              {/* Finance */}
              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>Finance & Wealth</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{forecast.finance}</p>
              </div>

              {/* Relationships */}
              <div className="p-4 bg-pink-500/5 rounded-lg border border-pink-500/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span>Love & Relationships</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{forecast.relationships}</p>
              </div>

              {/* Health */}
              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  <span>Health & Wellness</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{forecast.health}</p>
              </div>
            </div>

            {/* Opportunities & Challenges */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Key Opportunities</span>
                </h4>
                <ul className="space-y-2">
                  {forecast.opportunities.map((opp, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span>Potential Challenges</span>
                </h4>
                <ul className="space-y-2">
                  {forecast.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start space-x-2 text-xs">
                      <span className="text-orange-500 mt-0.5 shrink-0">⚠</span>
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lucky Elements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Lucky Dates</p>
                <div className="flex flex-wrap gap-1">
                  {forecast.luckyDates.map((date, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{date}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Lucky Colors</p>
                <div className="flex flex-wrap gap-1">
                  {forecast.luckyColors.map((color, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{color}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Lucky Numbers</p>
                <div className="flex flex-wrap gap-1">
                  {forecast.luckyNumbers.map((num, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{num}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Best Days</p>
                <div className="flex flex-wrap gap-1">
                  {forecast.avoid.map((day, i) => (
                    <Badge key={i} variant="outline" className="text-xs">Avoid: {day}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Remedies */}
            <div className="p-4 bg-gold/5 rounded-lg border border-gold/20">
              <h4 className="font-semibold text-sm mb-3 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Recommended Remedies for {forecast.month}</span>
              </h4>
              <ul className="space-y-2">
                {forecast.remedies.map((remedy, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs">
                    <span className="text-gold font-bold shrink-0">{i + 1}.</span>
                    <span className="text-muted-foreground">{remedy}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function generatePersonalizedMonthlyForecasts(moonSign: string, moonSignIndex: number, year: number): MonthForecast[] {
  // Calculate house positions for key transits
  const jupiterHouse1 = (2 - moonSignIndex + 12) % 12 || 12; // Taurus until May
  const jupiterHouse2 = (3 - moonSignIndex + 12) % 12 || 12; // Gemini after May
  const saturnHouse = (12 - moonSignIndex + 12) % 12 || 12; // Pisces all year

  // Month-specific templates - adjust based on transits
  const months: MonthForecast[] = [
    {
      month: 'January',
      rating: 3,
      theme: 'Foundation Building',
      overview: `January ${year} brings steady energy for ${moonSign}. ${jupiterHouse1 <= 6 ? 'Jupiter\'s favorable position supports growth and expansion.' : 'Jupiter encourages patience and long-term planning.'} Focus on building strong foundations for the year ahead.`,
      career: `${jupiterHouse1 === 10 || jupiterHouse1 === 6 ? 'Excellent month for career advancement. Recognition from superiors likely.' : jupiterHouse1 === 2 || jupiterHouse1 === 11 ? 'Financial negotiations and networking bring opportunities.' : 'Steady progress through consistent effort. Avoid impulsive career decisions.'}`,
      finance: `${jupiterHouse1 === 2 || jupiterHouse1 === 11 ? 'Good income month. Consider starting new investments.' : jupiterHouse1 === 5 ? 'Creative projects may bring additional income.' : 'Maintain disciplined budgeting. Avoid unnecessary expenses.'}`,
      relationships: `${jupiterHouse1 === 7 ? 'Excellent for partnerships. Singles may meet potential partners.' : jupiterHouse1 === 5 ? 'Romantic energy high. Good time for expressing feelings.' : 'Focus on clear communication. Family gatherings bring joy.'}`,
      health: `${saturnHouse === 6 ? 'Health improves. Good time to start fitness routines.' : 'Monitor stress levels. Adequate rest important. Winter care needed for seasonal ailments.'}`,
      opportunities: ['New Year resolutions supported by planetary energy', 'Makar Sankranti (Jan 14) auspicious for new beginnings', 'Winter spiritual practices strengthen foundation'],
      challenges: ['Cold weather may affect health', 'Holiday season expenses require budgeting'],
      remedies: ['Start morning meditation routine', 'Donate warm clothes on Sankranti', 'Set clear intentions for the year'],
      luckyDates: ['3', '12', '14', '21', '30'],
      luckyColors: ['White', 'Yellow', 'Orange'],
      luckyNumbers: [1, 3, 9],
      avoid: ['Impulsive decisions', 'Overspending']
    },
    {
      month: 'February',
      rating: 4,
      theme: 'Spiritual Growth',
      overview: `February brings spiritual depth for ${moonSign}. Maha Shivaratri (Feb 26) creates powerful transformation energy. ${jupiterHouse1 === 9 || jupiterHouse1 === 12 ? 'Your spiritual inclinations are strongly supported.' : 'Balance material pursuits with inner development.'}`,
      career: `${jupiterHouse1 === 10 ? 'Career peaks. Promotions or recognition likely.' : jupiterHouse1 === 3 ? 'Communication skills advance career. Good for presentations.' : 'Steady progress. Networking brings future opportunities.'}`,
      finance: `${jupiterHouse1 === 2 ? 'Excellent income month. Family support in finances.' : jupiterHouse1 === 11 ? 'Gains from investments. Elder siblings may help financially.' : 'Moderate income. Save for future expenses.'}`,
      relationships: `${jupiterHouse1 === 7 ? 'Partnership harmony. Good month for commitments.' : jupiterHouse1 === 4 ? 'Family bonds strengthen. Quality time with mother.' : 'Friendships deepen. Social connections beneficial.'}`,
      health: `${saturnHouse === 6 ? 'Excellent health month. Overcome chronic issues.' : 'Maintain immunity. Spiritual practices heal body and mind.'}`,
      opportunities: ['Maha Shivaratri spiritual practices very powerful', 'Partnerships and collaborations favored', 'Creative projects show promise'],
      challenges: ['Emotional sensitivity may create misunderstandings', 'Balance spiritual and material duties'],
      remedies: ['Maha Shivaratri fasting and worship', 'Om Namah Shivaya chanting', 'Night vigil on Shivaratri brings blessings'],
      luckyDates: ['3', '8', '12', '17', '21', '26'],
      luckyColors: ['White', 'Light Blue', 'Silver'],
      luckyNumbers: [2, 7, 9],
      avoid: ['Negative thinking', 'Hasty relationship decisions']
    },
    {
      month: 'March',
      rating: 4,
      theme: 'Celebration & Renewal',
      overview: `March brings festive energy with Holi (Mar 25). Spring renewal supports fresh starts for ${moonSign}. ${jupiterHouse1 === 5 ? 'Creativity and joy flourish.' : 'Embrace change and new beginnings.'}`,
      career: `${jupiterHouse1 === 10 || jupiterHouse1 === 6 ? 'Professional success. Hard work recognized.' : jupiterHouse1 === 3 ? 'Communication projects succeed. Media work favorable.' : 'Team collaborations bring results. Network actively.'}`,
      finance: `${jupiterHouse1 === 2 || jupiterHouse1 === 11 ? 'Strong income month. Investments show returns.' : 'Festival expenses planned. Save for future goals.'}`,
      relationships: `${jupiterHouse1 === 7 ? 'Romantic month. Singles attract partners. Married couples enjoy renewal.' : jupiterHouse1 === 5 ? 'Love and creativity combine. Express feelings freely.' : 'Social gatherings strengthen bonds. Forgive past hurts.'}`,
      health: `Spring energy revitalizes. ${saturnHouse === 6 ? 'Excellent vitality. Start new fitness goals.' : 'Seasonal changes require immune support. Stay hydrated.'}`,
      opportunities: ['Holi festival brings joy and healing', 'Spring projects and new beginnings', 'Travel opportunities arise'],
      challenges: ['Festival indulgence may affect health', 'Over-commitment to social events'],
      remedies: ['Holika Dahan ritual for releasing past karma', 'Play Holi with natural colors', 'Forgiveness meditation'],
      luckyDates: ['3', '7', '12', '18', '21', '25', '30'],
      luckyColors: ['Green', 'Pink', 'Yellow'],
      luckyNumbers: [3, 6, 9],
      avoid: ['Excessive celebration affecting responsibilities', 'Chemical colors']
    },
    {
      month: 'April',
      rating: 4,
      theme: 'Dharmic Action',
      overview: `April brings Ram Navami (Apr 10) and focus on righteous action for ${moonSign}. ${jupiterHouse1 === 9 ? 'Your dharmic path clarifies. Follow your principles.' : 'Align actions with values. Integrity brings success.'}`,
      career: `${jupiterHouse1 === 10 ? 'Leadership opportunities. Take initiative.' : jupiterHouse1 === 6 ? 'Service excellence recognized. Help colleagues.' : 'Ethical approach to work brings long-term rewards.'}`,
      finance: `${jupiterHouse1 === 2 ? 'Income increases. Family business favorable.' : jupiterHouse1 === 11 ? 'Gains from righteous work. Avoid shortcuts.' : 'Honest earnings blessed. Tax planning important.'}`,
      relationships: `${jupiterHouse1 === 7 ? 'Relationships based on shared values thrive.' : jupiterHouse1 === 4 ? 'Family harmony through clear communication.' : 'Friendships with ethical people benefit you.'}`,
      health: `${saturnHouse === 6 ? 'Health stable. Maintain discipline in diet and exercise.' : 'Summer heat begins. Stay hydrated and cool. Light foods beneficial.'}`,
      opportunities: ['Ram Navami prayers bring courage and clarity', 'New financial year planning', 'Ethical business ventures succeed'],
      challenges: ['Heat may cause fatigue', 'Balancing multiple responsibilities'],
      remedies: ['Ram Navami fasting and prayers', 'Recite Ram Raksha Stotra', 'Service to poor in Lord Rama\'s name'],
      luckyDates: ['3', '10', '12', '17', '21', '26'],
      luckyColors: ['Yellow', 'Orange', 'Red'],
      luckyNumbers: [1, 5, 9],
      avoid: ['Unethical shortcuts', 'Excessive heat exposure']
    },
    {
      month: 'May',
      rating: 5,
      theme: 'Major Transition',
      overview: `May is transformative for ${moonSign} as Jupiter enters Gemini on May 1! ${jupiterHouse2 === 1 ? 'Your personal new year begins! Expansion in all areas of life.' : jupiterHouse2 === 10 ? 'Career boom starts! Major opportunities arise.' : jupiterHouse2 === 7 ? 'Partnership blessings begin! Marriage prospects excellent.' : 'New chapter opens. Embrace change with optimism.'}`,
      career: `${jupiterHouse2 === 10 ? 'Career breakthrough! Promotions, new jobs, or recognition.' : jupiterHouse2 === 6 ? 'Service work expands. Overcome obstacles easily.' : jupiterHouse2 === 3 ? 'Communication-based work flourishes. Media opportunities.' : 'Positive shift in professional life. New opportunities emerge.'}`,
      finance: `${jupiterHouse2 === 2 ? 'Wealth expansion begins! Income increases significantly.' : jupiterHouse2 === 11 ? 'Gains multiply. Networking brings financial rewards.' : 'Financial improvement. New income sources develop.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Marriage prospects excellent! Partnerships blessed.' : jupiterHouse2 === 5 ? 'Romance blooms! Creative partnerships form.' : 'Relationships improve. Social circle expands positively.'}`,
      health: `Buddha Purnima (May 23) brings healing energy. ${saturnHouse === 6 ? 'Health excellence continues.' : 'Vitality improves with Jupiter\'s shift. Start wellness programs.'}`,
      opportunities: ['Jupiter transit brings 12-month blessing period', 'Buddha Purnima meditation powerful', 'New ventures launched now succeed'],
      challenges: ['Too many opportunities may cause confusion', 'Avoid overextension'],
      remedies: ['Jupiter prayers on May 1st', 'Buddha Purnima meditation', 'Donate to educational causes'],
      luckyDates: ['1', '8', '12', '17', '23', '28'],
      luckyColors: ['Yellow', 'Gold', 'White'],
      luckyNumbers: [3, 5, 7],
      avoid: ['Greed or over-expansion', 'Ignoring details']
    },
    {
      month: 'June',
      rating: 4,
      theme: 'Growth & Expansion',
      overview: `June continues Jupiter's blessings in Gemini for ${moonSign}. ${jupiterHouse2 === 10 ? 'Career soars. Make bold moves.' : jupiterHouse2 === 11 ? 'Gains multiply. Network actively.' : 'Growth in key life areas. Seize opportunities.'}`,
      career: `${jupiterHouse2 === 10 ? 'Peak career month. Leadership roles beckon.' : jupiterHouse2 === 6 ? 'Service brings recognition. Help others.' : jupiterHouse2 === 3 ? 'Writing, teaching, communication excel.' : 'Professional growth continues. Training beneficial.'}`,
      finance: `${jupiterHouse2 === 2 ? 'Excellent earning month. Multiple income streams.' : jupiterHouse2 === 11 ? 'Investment returns excellent. Elder siblings help.' : 'Good financial month. Budget for summer expenses.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Partnership month! Commitments favored.' : jupiterHouse2 === 5 ? 'Romantic and creative. Children bring joy.' : 'Social life active. Meaningful connections form.'}`,
      health: `${saturnHouse === 6 ? 'Health strong. Immunity excellent.' : 'Summer heat peaks. Stay cool and hydrated. Light exercise.'}`,
      opportunities: ['Jupiter\'s full influence in new sign', 'Summer projects and collaborations', 'Travel opportunities'],
      challenges: ['Heat-related stress', 'Overconfidence from success'],
      remedies: ['Thursday Jupiter worship', 'Donate yellow items', 'Study sacred texts'],
      luckyDates: ['3', '8', '12', '17', '21', '26'],
      luckyColors: ['Yellow', 'Green', 'White'],
      luckyNumbers: [3, 5, 8],
      avoid: ['Overextension', 'Arrogance']
    },
    {
      month: 'July',
      rating: 4,
      theme: 'Spiritual Wisdom',
      overview: `July features Guru Purnima (Jul 20), honoring teachers and wisdom for ${moonSign}. ${jupiterHouse2 === 9 ? 'Your spiritual and philosophical pursuits are especially blessed.' : 'Seek guidance from elders and mentors.'}`,
      career: `${jupiterHouse2 === 10 ? 'Leadership recognized. Mentor others.' : jupiterHouse2 === 9 ? 'Teaching, publishing, international work excel.' : 'Learn from seniors. Professional courses beneficial.'}`,
      finance: `${jupiterHouse2 === 2 || jupiterHouse2 === 11 ? 'Good income continues. Wise investments.' : 'Stable finances. Donate to educational causes for blessings.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Partnership wisdom deepens. Guru-shishya dynamic in relationships.' : jupiterHouse2 === 4 ? 'Learn from family elders. Ancestral wisdom valuable.' : 'Mentorship relationships beneficial.'}`,
      health: `${saturnHouse === 6 ? 'Health excellent. Share wellness knowledge.' : 'Monsoon health care needed. Avoid infection. Boost immunity.'}`,
      opportunities: ['Guru Purnima honoring teachers brings grace', 'Learning new skills', 'Spiritual retreats'],
      challenges: ['Monsoon-related health issues', 'Humidity affecting mood'],
      remedies: ['Guru Purnima puja to Jupiter', 'Honor teachers and parents', 'Study sacred texts'],
      luckyDates: ['3', '8', '12', '17', '20', '26'],
      luckyColors: ['Yellow', 'Saffron', 'White'],
      luckyNumbers: [3, 7, 9],
      avoid: ['Disrespect to elders', 'Ignoring guidance']
    },
    {
      month: 'August',
      rating: 3,
      theme: 'Strategic Action',
      overview: `August brings Janmashtami (Aug 27), celebrating Lord Krishna's wisdom for ${moonSign}. ${jupiterHouse2 === 3 ? 'Your communication and strategic thinking shine.' : 'Apply divine wisdom to practical challenges.'}`,
      career: `${jupiterHouse2 === 10 ? 'Strategic career moves pay off. Diplomacy wins.' : jupiterHouse2 === 6 ? 'Navigate workplace challenges skillfully.' : 'Political acumen helps navigate office dynamics.'}`,
      finance: `${jupiterHouse2 === 2 ? 'Financial strategies succeed. Wise planning.' : jupiterHouse2 === 11 ? 'Network strategically for gains.' : 'Careful financial planning. Avoid impulsive decisions.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Diplomacy in partnerships. Clear communication.' : jupiterHouse2 === 5 ? 'Playful romance. Children teach wisdom.' : 'Friendship through shared interests.'}`,
      health: `${saturnHouse === 6 ? 'Health stable. Preventive care works.' : 'Monsoon ailments possible. Stay dry and warm. Digestive care needed.'}`,
      opportunities: ['Janmashtami prayers for strategic clarity', 'Problem-solving abilities peak', 'Diplomatic success'],
      challenges: ['Workplace politics', 'Overthinking situations'],
      remedies: ['Janmashtami fasting', 'Bhagavad Gita study', 'Krishna mantra'],
      luckyDates: ['3', '8', '12', '17', '21', '27'],
      luckyColors: ['Yellow', 'Blue', 'Green'],
      luckyNumbers: [5, 8, 9],
      avoid: ['Manipulation', 'Overly complex strategies']
    },
    {
      month: 'September',
      rating: 3,
      theme: 'Preparation',
      overview: `September is preparatory month for ${moonSign}. Upcoming Navratri energy builds. ${jupiterHouse2 === 6 ? 'Focus on health and service excellence.' : 'Prepare for festival season. Organize and plan.'}`,
      career: `${jupiterHouse2 === 10 ? 'Consolidate gains. Prepare next quarter strategy.' : jupiterHouse2 === 6 ? 'Service work continues steadily.' : 'Skill development for upcoming opportunities.'}`,
      finance: `${jupiterHouse2 === 2 || jupiterHouse2 === 11 ? 'Plan festival expenses. Save wisely.' : 'Budget for festival season. Conservative approach.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Partnership planning. Future discussions.' : jupiterHouse2 === 4 ? 'Family planning for festivals.' : 'Social calendar organizing.'}`,
      health: `${saturnHouse === 6 ? 'Excellent health. Prepare for Navratri fasting.' : 'Transition from monsoon to autumn. Seasonal care. Build immunity.'}`,
      opportunities: ['Preparation brings success', 'Organizational skills shine', 'Planning for Q4 goals'],
      challenges: ['Post-monsoon ailments', 'Transitional period uncertainty'],
      remedies: ['Daily sadhana routine', 'Health check-ups', 'Prepare for Navratri'],
      luckyDates: ['3', '8', '12', '17', '21', '26'],
      luckyColors: ['Green', 'Brown', 'White'],
      luckyNumbers: [3, 6, 9],
      avoid: ['Procrastination', 'Ignoring health signals']
    },
    {
      month: 'October',
      rating: 5,
      theme: 'Divine Power',
      overview: `October brings Navratri (Oct 2-10) and Dussehra, powerful transformation time for ${moonSign}. ${jupiterHouse2 === 5 ? 'Creative and spiritual power peak together.' : 'Divine feminine energy supports all endeavors.'}`,
      career: `${jupiterHouse2 === 10 ? 'Victory in career challenges. Major breakthrough.' : jupiterHouse2 === 6 ? 'Overcome all obstacles. Enemies defeated.' : 'Professional challenges resolved. Success after struggle.'}`,
      finance: `${jupiterHouse2 === 2 ? 'Excellent earnings. Lakshmi blessings.' : jupiterHouse2 === 11 ? 'Gains from multiple sources. Wealth increases.' : 'Financial improvement through divine grace.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Partnership power. United you conquer.' : jupiterHouse2 === 4 ? 'Family celebrations. Mother\'s blessings.' : 'Social triumph. Recognition in circles.'}`,
      health: `${saturnHouse === 6 ? 'Excellent vitality through Navratri. Fasting purifies.' : 'Navratri fasting (if done) brings health benefits. Energy peaks.'}`,
      opportunities: ['Navratri shakti sadhana most powerful', 'Victory over long-standing obstacles', 'New beginnings after Dussehra'],
      challenges: ['Fasting may cause initial fatigue', 'Festival expenses'],
      remedies: ['9-day Durga puja', 'Navratri fasting', 'Devi mantra chanting'],
      luckyDates: ['2', '8', '10', '12', '17', '21', '26'],
      luckyColors: ['Red', 'Yellow', 'All Nine Colors'],
      luckyNumbers: [3, 6, 9],
      avoid: ['Negative energy', 'Non-vegetarian food during Navratri']
    },
    {
      month: 'November',
      rating: 5,
      theme: 'Prosperity & Light',
      overview: `November brings Diwali (Nov 1), the festival of lights and prosperity for ${moonSign}. ${jupiterHouse2 === 2 || jupiterHouse2 === 11 ? 'Your wealth house is especially blessed!' : 'Lakshmi\'s blessings illuminate all areas.'}`,
      career: `${jupiterHouse2 === 10 ? 'Career peak! Major recognition and rewards.' : jupiterHouse2 === 11 ? 'Networking brings career leaps.' : 'Professional success and new opportunities.'}`,
      finance: `${jupiterHouse2 === 2 ? 'Wealth multiplication! Diwali brings prosperity.' : jupiterHouse2 === 11 ? 'Maximum gains. Investments excel.' : 'Excellent financial month. Bonuses and rewards.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Partnership celebrations. Commitment blessings.' : jupiterHouse2 === 5 ? 'Romance sparkles. Children bring joy.' : 'Social celebrations. Meaningful connections.'}`,
      health: `${saturnHouse === 6 ? 'Health excellent. Enjoy celebrations moderately.' : 'Good vitality. Balance indulgence with moderation.'}`,
      opportunities: ['Diwali Lakshmi puja brings year-long prosperity', 'New ventures blessed', 'Property purchases auspicious'],
      challenges: ['Festival indulgence affecting health', 'Overspending temptation'],
      remedies: ['Diwali Lakshmi puja at midnight', 'Light 11+ diyas', 'Donate to poor'],
      luckyDates: ['1', '3', '8', '12', '17', '21', '26'],
      luckyColors: ['Red', 'Gold', 'Yellow'],
      luckyNumbers: [1, 3, 8],
      avoid: ['Gambling beyond tradition', 'Debt for celebrations']
    },
    {
      month: 'December',
      rating: 4,
      theme: 'Completion & Gratitude',
      overview: `December brings year-end reflection for ${moonSign}. Winter Solstice (Dec 21) marks spiritual renewal. ${jupiterHouse2 === 9 ? 'Your wisdom journey completes a cycle.' : 'Gratitude for year\'s blessings brings peace.'}`,
      career: `${jupiterHouse2 === 10 ? 'Year-end recognition. Bonuses and appraisals.' : jupiterHouse2 === 11 ? 'Networking closes deals. Targets achieved.' : 'Complete pending projects. Plan next year strategy.'}`,
      finance: `${jupiterHouse2 === 2 || jupiterHouse2 === 11 ? 'Excellent year-end finances. Tax planning.' : 'Financial review. Save year-end bonuses wisely.'}`,
      relationships: `${jupiterHouse2 === 7 ? 'Partnership reflection. Renewal of commitment.' : jupiterHouse2 === 4 ? 'Family time. Year-end togetherness.' : 'Gratitude strengthens all relationships.'}`,
      health: `${saturnHouse === 6 ? 'Health stable. Year-end check-ups beneficial.' : 'Winter care essential. Stay warm. Prevent seasonal ailments.'}`,
      opportunities: ['Winter Solstice spiritual practices', 'Year-end planning brings clarity', 'Tax saving investments'],
      challenges: ['Year-end stress and deadlines', 'Cold weather health issues'],
      remedies: ['Gratitude meditation daily', 'Donation for blessings', 'New Year intentions on Solstice'],
      luckyDates: ['3', '8', '12', '17', '21', '26', '31'],
      luckyColors: ['White', 'Blue', 'Silver'],
      luckyNumbers: [3, 6, 9],
      avoid: ['Neglecting health in year-end rush', 'Unfinished business carrying to new year']
    }
  ];

  return months;
}

function getMonthlyForecasts(moonSign: string, year: number): MonthForecast[] {
  // Get moon sign index for transit calculations
  const moonSignIndex = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].indexOf(moonSign);

  // If moon sign not found, default to Aries
  if (moonSignIndex === -1) {
    return getAriesMonthlyForecasts(year);
  }

  // Generate personalized forecasts based on moon sign
  return generatePersonalizedMonthlyForecasts(moonSign, moonSignIndex, year);
}

function getAriesMonthlyForecasts(year: number): MonthForecast[] {
  const ariesForecasts: MonthForecast[] = [
    {
      month: 'January',
      rating: 3,
      theme: 'Steady Progress',
      overview: 'January begins with Saturn\'s disciplined influence creating a serious, contemplative mood. The Sun in Capricorn (your 10th house) until January 14th brings professional focus and recognition opportunities. Post Makar Sankranti (Jan 14), energy shifts as Sun enters Aquarius, activating your 11th house of gains and friendships. This month requires balancing ambition with patience. Mars, your ruling planet, in steady earth signs keeps you grounded but may feel restrictive to your natural fire. The key is working systematically toward goals rather than expecting immediate results. Financial matters require conservative approach. Relationships benefit from mature communication.',

      career: 'Professional life shows steady progress with emphasis on long-term planning. First two weeks favor completing pending projects and gaining supervisor approval. Post-14th, networking and team collaborations increase. Government employees may see policy changes requiring adaptation. Entrepreneurs should focus on consolidation rather than expansion. Job seekers find moderate opportunities in established companies. Avoid impulsive career decisions; research thoroughly before committing.',

      finance: 'Conservative financial month requiring careful budgeting. Income remains stable but unexpected expenses possible related to health or home repairs. Avoid lending money or making large purchases before 14th. Post-Sankranti, small gains through friends or elder siblings. Investment opportunities arise but require thorough due diligence. Focus on clearing old debts. Emergency fund maintenance crucial. Real estate transactions face delays.',

      relationships: 'Relationships require patience and understanding. Married couples may face minor disagreements over financial priorities or family responsibilities. Communication is key to resolution. Singles meet potential partners through professional circles or social causes, but connections develop slowly. Family elders may need attention or care. Friendships deepen through shared goals. Avoid forcing romantic timelines; let relationships evolve naturally.',

      health: 'Health requires attention, especially joint pain, cold-related issues, or stress-induced problems. Saturn\'s influence may create fatigue or low energy levels. Prioritize adequate rest, warm foods, and gentle exercise. Avoid overexertion. Dental check-ups recommended. Mental health benefits from meditation and spiritual practices. Maintain regular sleep schedule. Vitamin D and calcium supplementation helpful.',

      opportunities: [
        'Professional recognition and appreciation from superiors (Jan 5-14)',
        'Networking opportunities leading to future collaborations (Jan 15-28)',
        'Spiritual growth through meditation and introspection',
        'Clearing old karmic debts through service and charity'
      ],

      challenges: [
        'Feeling restricted or impatient with slow progress',
        'Unexpected expenses straining budget',
        'Communication gaps in relationships requiring extra effort',
        'Low energy or health concerns needing rest and care'
      ],

      remedies: [
        'Recite Shani mantra "Om Sham Shanishcharaya Namah" 108 times on Saturdays',
        'Donate black sesame seeds, black cloth, or iron items to needy on Saturdays',
        'Light a mustard oil lamp under Peepal tree on Saturdays evening',
        'Practice gratitude journaling to maintain positive mindset during slow progress'
      ],

      luckyDates: ['3', '7', '14', '21', '25'],
      luckyColors: ['Blue', 'Black', 'Dark Green'],
      luckyNumbers: [8, 17, 26],
      avoid: ['Wednesdays', 'Fridays evenings']
    },

    {
      month: 'February',
      rating: 4,
      theme: 'Emotional Depth',
      overview: 'February brings transformative energy as Sun transits through Aquarius (your 11th house) until February 13, then enters Pisces (your 12th house). This creates a powerful shift from social gains to spiritual introspection. Maha Shivaratri (Feb 26) is exceptionally powerful for Aries natives, offering deep spiritual experiences and release from obstacles. Venus retrograde period may resurface old relationship patterns for healing. This month balances outer success with inner growth. Income increases through networks and friends in first half, while second half encourages charitable giving and foreign connections. Creative and artistic pursuits flourish. Intuition strengthens significantly.',

      career: 'Career sector experiences positive developments, especially through teamwork and collaborations. New projects launched in partnership with colleagues or organizations. First half excellent for presenting ideas, gaining approvals, and expanding professional network. Post-13th, behind-the-scenes work, research, or international projects take priority. Freelancers receive multiple project offers. IT, creative, and humanitarian fields show particular promise. Recognition comes through unique contributions.',

      finance: 'Financial situation improves significantly in first half through gains from elder siblings, friends, or large organizations. Unexpected bonuses or incentives possible. Investment in technology or innovative ventures shows promise. Post-13th, expenses increase on spiritual pursuits, foreign matters, or family health. However, these investments bring long-term peace. Avoid impulsive spending on luxury items. Focus on creating passive income streams.',

      relationships: 'Romance blossoms beautifully this month! Singles meet interesting prospects through social events, online platforms, or spiritual gatherings. Deep, meaningful connections form. Married couples experience renewed emotional intimacy, especially around Maha Shivaratri. Plan romantic getaway or special celebration. However, Venus retrograde may bring ex-partners or past issues to surface for closure. Handle with maturity. Family bonds strengthen through shared spiritual practices.',

      health: 'Health generally good with improving vitality. Focus on feet, sleep quality, and mental peace. Maha Shivaratri fasting and spiritual practices provide deep rejuvenation. Possible issues: water retention, sleep disturbances, or anxiety in last week. Meditation and yoga particularly beneficial. Consider Ayurvedic Panchakarma or detox programs. Mental clarity improves through spiritual practices. Cut down on alcohol and smoking.',

      opportunities: [
        'Fulfillment of long-cherished desires and wishes (Feb 1-12)',
        'Deep spiritual experiences during Maha Shivaratri (Feb 26)',
        'Romantic connections with soul-mate potential',
        'Foreign opportunities or international collaborations emerging',
        'Creative projects gaining recognition and appreciation'
      ],

      challenges: [
        'Old relationship patterns resurfacing requiring conscious healing',
        'Balancing social obligations with need for alone time',
        'Expenses on family or health matters',
        'Sleep disturbances requiring disciplined routine'
      ],

      remedies: [
        'Observe Maha Shivaratri fast and night vigil for maximum spiritual benefits and obstacle removal',
        'Donate white items, rice, or silver to temples on Mondays',
        'Recite Shiva Panchakshar mantra "Om Namah Shivaya" 108 times daily',
        'Float white flowers in flowing water on Mondays for relationship harmony'
      ],

      luckyDates: ['2', '8', '11', '17', '23', '26'],
      luckyColors: ['White', 'Silver', 'Sky Blue'],
      luckyNumbers: [2, 11, 20],
      avoid: ['Thursdays after sunset']
    },

    {
      month: 'March',
      rating: 5,
      theme: 'Peak Performance',
      overview: 'March is one of your best months of the year! Sun enters your own sign Aries on March 14, marking the astrological new year and charging you with tremendous vitality and confidence. Holi (March 25) brings joy and release of past negativity. This month you shine in all areas of life—personality, leadership, new beginnings, and personal projects. Mars, your ruler, in favorable position amplifies courage and initiative. This is THE month to launch important ventures, make bold moves, and assert yourself. Your magnetic personality attracts opportunities and people. Health improves dramatically. Only caution: channel abundant energy constructively rather than impulsively.',

      career: 'Outstanding professional month with leadership opportunities, promotions, or successful project launches. Your ideas receive immediate approval and implementation. Excellent for job interviews, client presentations, or starting new business ventures. Superiors recognize your potential and assign important responsibilities. Entrepreneurs see breakthrough growth. Marketing and branding efforts yield excellent results. Independent work or leadership positions suit you best. Post-14th, you are unstoppable!',

      finance: 'Financial surge through multiple sources: salary increment, new income streams, or successful ventures. This is month to ask for raise, negotiate better terms, or launch paid products/services. Investments in your personal brand, education, or health pay off immediately. Avoid overconfidence in speculation. Real estate transactions favorable. Pending payments received. Financial planning for year ahead highly recommended. Budget for success but maintain emergency reserve.',

      relationships: 'Magnetic attraction power at peak! Singles have excellent chances of meeting significant partners, especially around Holi celebrations. Your confidence and energy naturally draw people. Existing relationships revitalize with new excitement and shared adventures. However, avoid dominating or impulsive behavior. Married couples enjoy romantic phase; plan special experiences together. Family celebrates your achievements. Social life buzzing with invitations and recognition.',

      health: 'Physical vitality and immunity at yearly high. Energy levels excellent for starting new fitness routines, sports, or physical challenges. This is month to push physical limits safely. Possible minor issues: headaches from overexertion, acidity from spicy foods, or minor injuries from haste. Practice mindfulness despite high energy. Skin glows naturally. Mental clarity and decision-making sharp. Perfect time for preventive health check-ups.',

      opportunities: [
        'Personal milestone achievements and recognition (entire month)',
        'Successful launch of new ventures or projects with high success probability',
        'Leadership roles and increased responsibilities matching your ambitions',
        'Attracting ideal romantic partner or deepening existing bonds',
        'Physical transformation through dedicated fitness efforts'
      ],

      challenges: [
        'Overconfidence leading to impulsive decisions without adequate planning',
        'Tendency to dominate or override others in enthusiasm',
        'Scattered energy across too many simultaneous projects',
        'Impatience with slower-paced people or processes'
      ],

      remedies: [
        'Visit Lord Hanuman temple every Tuesday and offer red flowers and sindoor',
        'Donate red lentils, red clothes, and jaggery to needy on Tuesdays',
        'Recite "Hanuman Chalisa" daily for channeling Mars energy positively',
        'Perform Sun salutations (Surya Namaskar) 12 times at sunrise for sustained vitality'
      ],

      luckyDates: ['1', '9', '14', '18', '25', '27'],
      luckyColors: ['Red', 'Orange', 'Golden'],
      luckyNumbers: [1, 9, 18],
      avoid: ['Saturdays morning']
    },

    {
      month: 'April',
      rating: 4,
      theme: 'Financial Growth',
      overview: 'April continues positive momentum with Sun in Aries until April 13, then moving to Taurus (your 2nd house of wealth). This shift brings focus from personal achievements to financial consolidation and building resources. This month is excellent for all monetary matters: increasing income, wise investments, improving family wealth, and enhancing your value in market. Speech and communication gain persuasive quality, beneficial for negotiations, sales, and teaching. Family matters receive attention with generally positive outcomes. Accumulated assets grow. Food, beauty, and luxury sectors offer opportunities. Balance material pursuits with ethical values.',

      career: 'Career growth through demonstrating tangible value and results. Performance reviews favor you. Commission-based work, sales, teaching, or consultancy roles particularly successful. Your expertise commands premium pricing. Excellent month for monetizing skills through courses, workshops, or freelance projects. Corporate employees negotiate better packages. Job changes bring financial improvement. Avoid roles not aligned with values; seek purpose-driven work.',

      finance: 'Outstanding financial month with multiple income streams activating. Primary income stable with potential increment. Secondary income through side projects, investments, or teaching. Family may contribute to wealth through gifts, inheritance discussions, or joint ventures. Smart investments in gold, jewelry, or stable assets recommended. Real estate transactions favorable. Budget for quality over quantity. Build 3-6 month emergency fund. Financial planning and insurance review beneficial.',

      relationships: 'Relationships stabilize with focus on building shared resources and long-term security. Couples discuss financial planning, property purchase, or family expansion. Shared values become important. Singles attracted to stable, financially secure partners. However, avoid making money the only criterion. Family introduces potential matches. Speech plays crucial role; communicate thoughtfully. Express love through quality time and thoughtful gifts rather than expensive gestures.',

      health: 'Health good overall with focus on building stamina and immunity. Throat, neck, and thyroid require attention. Voice care important if profession involves speaking. Possible weight gain from good food; moderate intake. Dental check-up recommended. Start nutritional supplements after consultation. Diabetes or blood sugar monitoring for those predisposed. Outdoor activities in nature boost wellbeing. Practice throat chakra meditation for enhanced communication.',

      opportunities: [
        'Significant income increase through multiple channels',
        'Successful negotiations for salary, contracts, or business deals',
        'Building family wealth through joint investments or property',
        'Teaching, training, or knowledge-sharing opportunities with good compensation',
        'Improving personal appearance and self-worth attracting better opportunities'
      ],

      challenges: [
        'Tendency toward materialism overshadowing spiritual values',
        'Overindulgence in food or luxury causing health/financial strain',
        'Family disagreements over money or shared resources',
        'Harsh speech during conflicts; practice compassionate communication'
      ],

      remedies: [
        'Recite Lakshmi mantra "Om Shreem Mahalakshmiyei Namaha" 108 times daily for sustained wealth',
        'Donate food, especially rice and milk, to Brahmins or needy on Fridays',
        'Keep silver coin or small silver object in wallet for financial stability',
        'Water Tulsi plant daily in morning and light ghee lamp in evening'
      ],

      luckyDates: ['2', '6', '11', '15', '20', '29'],
      luckyColors: ['White', 'Green', 'Pink'],
      luckyNumbers: [6, 15, 24],
      avoid: ['Tuesdays evening']
    },

    {
      month: 'May',
      rating: 5,
      theme: 'Communication Mastery',
      overview: 'May is transformative as Jupiter enters Gemini (your 3rd house) on May 1st, beginning a 13-month transit bringing abundant opportunities through communication, courage, and initiative. This is major astrological event for Aries, activating your natural leadership through enhanced expression. Sun in Taurus until May 14, then enters Gemini alongside Jupiter, creating powerful combination for short travels, learning, and connecting with others. Writing, speaking, teaching, content creation, and entrepreneurship flourish. Sibling relationships improve. Courage increases for taking calculated risks. This month sets foundation for success in coming year. Buddha Purnima (May 23) offers spiritual wisdom.',

      career: 'Exceptional career month with major breakthroughs possible. Jupiter-Sun conjunction in 3rd house makes you unstoppable communicator and leader. Perfect timing for: launching media ventures, starting YouTube channel, publishing work, joining marketing/sales roles, or taking entrepreneurial leap. Your initiatives receive overwhelming support. Short-term projects and quick wins accumulate. Travel for work brings opportunities. Collaborations with younger colleagues or siblings fruitful. Multiple income streams develop.',

      finance: 'Financial growth through diverse channels. Commission-based work, affiliate marketing, content monetization, or sales-driven income surge. Investment in communication technology, vehicles, or educational tools justified and profitable. Gains through siblings or neighbors possible. However, expenses on travel, gadgets, or skill development also increase—view as investment. Start emergency fund if not already established. Freelance or gig economy work particularly lucrative.',

      relationships: 'Communication transforms relationships! Express feelings articulately, leading to deeper understanding. Singles meet prospects through social media, short trips, or educational settings. Intellectual connection becomes attraction foundation. Existing relationships benefit from open dialogue, shared learning, and mini-adventures. Plan weekend getaways or learning experiences together. Sibling relationships particularly strong; they may play cupid role. Keep phone communication balanced; quality over quantity.',

      health: 'High energy and enthusiasm enhance overall health. Focus on respiratory system, arms, shoulders, and nervous system. Possible issues: anxiety from mental overstimulation, shoulder tension from computer work, or sleep disturbance from overthinking. Balance mental activity with physical movement. Breathing exercises (pranayama) particularly beneficial. Moderate caffeine intake. Communication and social activities boost mental health. Regular breaks during intensive mental work prevent burnout.',

      opportunities: [
        'Major Jupiter transit activating communication, courage, and initiative for 13 months',
        'Launching successful media, content, or educational ventures with strong foundation',
        'Developing multiple income streams through diverse skills and initiatives',
        'Building influential network through authentic communication and value provision',
        'Mastering new skills rapidly and monetizing them quickly'
      ],

      challenges: [
        'Mental restlessness and scattered energy across many projects',
        'Over-committing to opportunities without adequate time management',
        'Excessive phone/screen time affecting eye health and sleep',
        'Impulsive communication or promises made in enthusiasm'
      ],

      remedies: [
        'Recite Budha (Mercury) mantra "Om Bram Breem Broum Sah Budhaya Namah" 108 times on Wednesdays',
        'Donate green vegetables, green cloth, or books to students on Wednesdays',
        'Feed green grass to cows on Wednesdays for clear communication and mental peace',
        'Wear natural emerald (Panna) 3-5 carats in gold ring on little finger after proper ritual'
      ],

      luckyDates: ['1', '5', '10', '14', '19', '23', '28'],
      luckyColors: ['Green', 'Yellow', 'White'],
      luckyNumbers: [5, 14, 23],
      avoid: ['Saturdays afternoon']
    },

    {
      month: 'June',
      rating: 4,
      theme: 'Domestic Harmony',
      overview: 'June brings focus to home, family, and emotional foundations as Sun transits through Gemini (3rd house) until June 15, then enters Cancer (your 4th house). This creates shift from external communication to internal peace. Mother\'s blessings and comfort become priorities. Property matters, home renovation, vehicle purchase, or family expansion plans activate. Jupiter continues blessing your initiatives and courage. Emotional intelligence develops. This month balances outer achievements with inner peace. Real estate investments favorable. Family relationships deepen. Ancestral property matters may surface. Focus on creating nurturing environment—both at home and within yourself.',

      career: 'Career progresses steadily with emphasis on creating stable foundation. Those in real estate, interior design, agriculture, hospitality, or counseling fields experience particular success. Work-from-home opportunities expand. Team building and creating positive workplace culture gain importance. Some may consider career change toward more meaningful work. Government job aspirants see favorable developments. Focus on long-term security rather than quick gains. Emotional intelligence becomes professional asset.',

      finance: 'Financial situation stable with possible expenditure on home, property, or vehicle. These are investments in comfort and security. Real estate transactions highly favorable—buying, selling, or renovating property. Family may contribute financially. Income through agricultural land, rental property, or home-based business. Create estate planning and will if not already done. Insurance review important. Savings accumulate steadily. Avoid emotional spending on nostalgia items.',

      relationships: 'Emotional depth and nurturing quality enhance relationships. Married couples enjoy domestic bliss and may plan family expansion. Singles attracted to emotionally mature, family-oriented partners. Mother\'s role prominent in relationship decisions; seek blessings. Family gatherings bring joy. However, avoid excessive emotional dependency or moodiness. Relationships require both giving and receiving care. Quality time at home with loved ones strengthens bonds. Cook or share meals together.',

      health: 'Health focus on digestive system, chest area, and emotional wellbeing. Possible issues: acidity, chest congestion, emotional eating, or mood swings. Maintain balanced diet avoiding extreme cold or spicy foods. Mother\'s traditional remedies particularly effective. Hydrotherapy and water-based exercises beneficial. Mental peace through family time and home environment optimization. Decluttering home creates mental clarity. Practice self-care without guilt.',

      opportunities: [
        'Favorable property transactions with good returns potential',
        'Strengthening family bonds and receiving elder blessings',
        'Work-from-home or home-based business opportunities expanding',
        'Emotional healing and developing nurturing relationships',
        'Creating comfortable, peaceful living environment enhancing all life areas'
      ],

      challenges: [
        'Excessive emotional sensitivity leading to mood fluctuations',
        'Family expectations or obligations feeling burdensome',
        'Nostalgia or past attachment preventing forward movement',
        'Overindulgence in comfort foods affecting health'
      ],

      remedies: [
        'Offer white flowers and rice to Mother Goddess on Mondays',
        'Respect and serve mother and maternal figures with devotion',
        'Keep silver Moon yantra in home for emotional stability and domestic peace',
        'Practice gratitude for home and family blessings daily before sleep'
      ],

      luckyDates: ['2', '4', '11', '15', '20', '29'],
      luckyColors: ['White', 'Cream', 'Light Blue'],
      luckyNumbers: [2, 4, 11],
      avoid: ['Saturdays']
    },

    {
      month: 'July',
      rating: 4,
      theme: 'Creative Expression',
      overview: 'July brings vibrant creative energy as Sun transits Leo (your 5th house) from July 17 onwards. This activates romance, creativity, children, speculation, and self-expression. Before that, Cancer Sun (4th house) until July 16 completes domestic focus. Guru Purnima (July 20) is exceptionally auspicious for learning and honoring teachers. This month balances emotional security with playful creativity. Creative projects flourish. Romance blossoms. Children bring joy. Speculation requires caution despite lucky feelings. Education advances well. Your inner child seeks expression—allow it! This is month for joy, play, and creative risks within reasonable limits.',

      career: 'Career benefits from creative approach and innovative thinking. Those in creative fields, entertainment, education, or children-related sectors experience exceptional success. Leadership roles feel natural and enjoyable. Present creative ideas confidently; they receive enthusiastic reception. Speculation in stock market requires research despite intuitive hunches. Business related to luxury, entertainment, or sports flourishes. Teaching and mentoring others brings satisfaction and recognition. Avoid office politics; maintain authentic self-expression.',

      finance: 'Financial situation shows improvement through creative ventures, consultancy, or teaching. Investment in creative skills, courses, or certifications pays off. Speculation tempting but requires extreme caution—risk only surplus funds after thorough research. Gains possible through lottery or unexpected sources, but don\'t depend on luck. Focus on building sustainable income through talent monetization. Children\'s education may require budget allocation. Entertainment expenses increase; maintain balance.',

      relationships: 'Romance at yearly high! Singles have excellent chances of meeting creative, fun-loving partners through hobbies, classes, or entertainment venues. Dating exciting and full of adventure. Married couples rekindle romance through shared creative activities, date nights, or mini-vacations. Plan pregnancy if desired; planetary positions favorable. However, ensure emotional readiness. Children (if any) bring great joy but may require extra attention. Express love playfully and authentically.',

      health: 'Generally good health with focus on heart, upper back, and spine. Practice cardiovascular exercises and yoga for spinal health. Possible issues: back pain from poor posture, heart palpitations from excitement, or digestive issues from rich foods. Moderate indulgences. Mental health excellent due to creative expression and joyful activities. However, avoid excessive partying or alcohol. Maintain consistent routine despite social calendar. Vitamin D through sunlight beneficial.',

      opportunities: [
        'Creative projects and artistic expressions gaining recognition and monetization',
        'Romantic relationships deepening or new soulmate connections forming',
        'Success in competitive exams or educational milestones (students)',
        'Guru Purnima blessings accelerating learning and spiritual progress',
        'Children bringing joy, pride, and new perspectives to life'
      ],

      challenges: [
        'Overconfidence in speculation leading to financial risks',
        'Ego clashes in romantic or creative partnerships',
        'Excessive indulgence in pleasures affecting health or budget',
        'Children-related stress or excessive worrying about their wellbeing'
      ],

      remedies: [
        'Recite Gayatri mantra 108 times daily for Sun\'s blessings and creative vitality',
        'Donate to educational institutions or sponsor underprivileged children\'s education',
        'Wear ruby (Manik) 3-5 carats in gold ring on ring finger after proper ritual',
        'Honor teachers and gurus on Guru Purnima with offerings and gratitude'
      ],

      luckyDates: ['1', '5', '10', '14', '19', '23', '28'],
      luckyColors: ['Gold', 'Orange', 'Red'],
      luckyNumbers: [1, 10, 19],
      avoid: ['Saturdays evening']
    },

    {
      month: 'August',
      rating: 3,
      theme: 'Health & Service',
      overview: 'August brings grounding energy as Sun transits Virgo (your 6th house) from August 17 onwards. This activates health, daily routines, service, and overcoming obstacles. Rakshabandhan and Janmashtami add protective and strategic dimensions. This month requires practical focus on perfecting systems, maintaining health, and serving others. Overcome competitors and obstacles through persistent effort and attention to detail. Work environment may present challenges requiring diplomacy. This is month for building healthy habits, improving skills, and managing responsibilities effectively. Less glamorous than previous months but crucial for long-term success.',

      career: 'Professional life requires handling increased workload and responsibilities. Challenges from colleagues or competitors possible; respond with excellence rather than confrontation. Your problem-solving abilities shine. Service-oriented professions, healthcare, legal matters, or analytical work show promise. Attention to detail prevents errors. Take on projects others avoid to demonstrate capability. Job switches may face delays; use time to upgrade skills. Overcome workplace obstacles through persistent quality work.',

      finance: 'Financial situation stable but requires careful management. Unexpected expenses possible related to health, vehicle repairs, or legal matters. Avoid lending money; recovery difficult. Focus on clearing debts and organizing finances. Investment requires thorough research; avoid tips from unreliable sources. Secondary income through providing services, consulting, or solving others\' problems. Budget for healthcare and vehicle maintenance. Start systematic investment plan (SIP) for long-term wealth.',

      relationships: 'Relationships require practical approach and mutual support. Focus shifts from romance to daily life management together. Married couples coordinate responsibilities and support each other\'s health. Singles may feel less social; use time for self-improvement. Avoid critical or perfectionist tendencies toward partner. Service and care deepen bonds more than grand gestures. Family members may need health support. Pet adoption brings joy and companionship.',

      health: 'Health demands priority attention this month. Digestive system, intestines, and general immunity need care. Possible issues: digestive disorders, allergies, stress-related ailments, or chronic condition flare-ups. However, this is excellent month to address health concerns and establish healing routines. Start proper diet plan, exercise routine, and sleep schedule. Consult healthcare professionals for preventive check-ups. Mental health benefits from meditation and stress management. Avoid self-diagnosis; seek expert guidance.',

      opportunities: [
        'Overcoming long-standing obstacles, enemies, or health issues permanently',
        'Establishing healthy daily routines creating foundation for sustained success',
        'Developing expertise through focused skill development and practice',
        'Victory in legal matters, competitions, or challenging situations',
        'Building resilience and problem-solving capabilities'
      ],

      challenges: [
        'Increased workload and responsibilities causing stress',
        'Health issues requiring immediate attention and lifestyle changes',
        'Conflicts with colleagues or subordinates requiring careful handling',
        'Criticism or perfectionism affecting self-esteem and relationships'
      ],

      remedies: [
        'Recite Hanuman Chalisa daily for overcoming obstacles and protecting health',
        'Serve poor and needy on Saturdays by offering food or essential items',
        'Keep Hanuman photo or idol in workplace for protection from enemies',
        'Practice Surya Namaskar and Pranayama daily for health optimization'
      ],

      luckyDates: ['3', '5', '12', '17', '21', '27', '30'],
      luckyColors: ['Green', 'Brown', 'Navy Blue'],
      luckyNumbers: [5, 14, 23],
      avoid: ['Tuesdays', 'Thursdays evening']
    },

    {
      month: 'September',
      rating: 4,
      theme: 'Partnership Power',
      overview: 'September transitions from service focus to partnership emphasis as Sun enters Libra (your 7th house) on September 17. This activates business partnerships, marriage, contracts, and public dealings. First half continues Virgo Sun focus on perfecting systems. Post-17th, relationships move to forefront. This month balances personal goals with others\' needs. Collaboration brings better results than solo efforts. Marriage prospects for singles brighten significantly. Business partnerships form or existing ones strengthen. Legal matters favor you. Public image enhances. Diplomacy and balance become key skills. Compromise without losing authenticity.',

      career: 'Career advances significantly through partnerships and collaborations. Solo entrepreneurs benefit from finding business partners or collaborators. Corporate employees shine in team leadership and client-facing roles. Contracts, agreements, and legal paperwork move forward smoothly. Negotiation skills bring favorable outcomes. Public relations, law, counseling, or partnership-based businesses flourish. International business opportunities emerge. Recognition comes through others\' appreciation. Network strategically; right connections open doors.',

      finance: 'Financial growth through partnerships, joint ventures, or spousal income contribution. Business contracts and agreements financially favorable. Gains through opposite sex or partnership businesses. Investment in partnership ventures shows promise with proper documentation. Legal recovery of money possible. Expenses on marriage, partnership events, or relationship enhancement. Balance personal and shared financial goals. Prenuptial or financial agreements require careful consideration. Consult financial advisor for joint investments.',

      relationships: 'Exceptional month for relationships! Singles have highest probability of meeting life partners this year. Marriage proposals likely for those in committed relationships. Social events, family introductions, or professional settings become meeting grounds. Married couples experience renewed harmony and mutual understanding. This is excellent month for wedding anniversaries or relationship celebrations. However, avoid losing personal identity in partnership. Maintain healthy boundaries while deepening intimacy. Compromise intelligently.',

      health: 'Health focus on kidneys, lower back, and hormonal balance. Possible issues: kidney stones, urinary infections, lower back pain, or hormonal imbalances. Adequate hydration crucial—drink 3-4 liters water daily. Reduce salt and sugar intake. Cranberry juice beneficial for urinary health. Practice yoga poses for lower back like Cat-Cow and Child\'s Pose. Mental peace through balanced relationships and conflict resolution. Couples massage or spa treatments enhance wellbeing. Avoid sitting for prolonged periods.',

      opportunities: [
        'Marriage prospects for singles and deepened commitment for couples',
        'Successful business partnerships and collaborative ventures launching',
        'Favorable contracts, agreements, and legal settlements',
        'Enhanced public image and social standing',
        'Diplomatic skills development opening new professional avenues'
      ],

      challenges: [
        'Over-compromise leading to loss of personal goals or identity',
        'Partnership conflicts requiring mature handling and clear communication',
        'Legal complications if proper documentation not maintained',
        'Dependency on others affecting decision-making independence'
      ],

      remedies: [
        'Recite Venus mantra "Om Shukraya Namah" 108 times on Fridays',
        'Donate white items, sugar, or rice to temples on Fridays',
        'Wear diamond or white sapphire (if suitable) in platinum/silver ring on middle finger',
        'Offer white flowers to Goddess Lakshmi on Fridays for relationship harmony'
      ],

      luckyDates: ['6', '9', '15', '17', '24', '27'],
      luckyColors: ['White', 'Pink', 'Pastel shades'],
      luckyNumbers: [6, 15, 24],
      avoid: ['Sundays morning']
    },

    {
      month: 'October',
      rating: 2,
      theme: 'Transformation',
      overview: 'October brings intense transformative energy as Sun enters Scorpio (your 8th house) on October 17. Navratri and Diwali add spiritual power to navigate transformation. This month involves deep psychological work, facing hidden fears, and releasing what no longer serves. Unexpected events teach valuable lessons. Research, occult sciences, and psychology interest you. Joint finances, inheritance, or insurance matters activate. This challenging month ultimately brings profound growth. Embrace change rather than resist. Hidden opportunities emerge through crises. Spiritual practices provide strength. By month end, emerge stronger and wiser.',

      career: 'Professional life faces unexpected changes or challenges requiring adaptability. Power struggles or politics possible; stay away from controversies. Those in research, investigation, psychology, occult, or crisis management excel. Transformation of job role or responsibilities likely. Some face job insecurity; use time to explore alternate career paths. Uncover hidden information giving competitive advantage. Audit and quality control work important. Handle confidential matters with integrity. Focus on transformation rather than stability.',

      finance: 'Financial unpredictability requires emergency fund buffer. Unexpected expenses on health, vehicle, or family matters. Joint finances or partnership money matters need careful handling. Insurance claims or settlements possible. Inheritance discussions may arise. Avoid lending money or standing guarantee. Investment in research or transformational learning justified. Tax matters require attention and proper documentation. Hidden income sources may emerge. Focus on financial independence rather than depending on others.',

      relationships: 'Relationships undergo testing and transformation. Hidden issues surface requiring honest confrontation. This can make or break relationships depending on how handled. Married couples experience intense emotional phases; therapy or counseling beneficial. Singles attracted to mysterious or complex personalities; proceed cautiously. Trust issues may arise; verify before committing. However, relationships surviving this phase become unbreakable. Physical intimacy deepens emotional bonds. Avoid jealousy or controlling behavior.',

      health: 'Health requires utmost attention this month. Focus on reproductive organs, chronic diseases, and psychological wellbeing. Possible issues: infections, chronic pain flare-ups, anxiety, depression, or surgical needs. Don\'t ignore symptoms; immediate medical attention crucial. This is excellent month to address chronic conditions permanently through proper treatment. Mental health through therapy, counseling, or spiritual practices. Avoid negative people and environments. Detox programs beneficial. Practice deep relaxation and Yoga Nidra.',

      opportunities: [
        'Profound personal transformation releasing old patterns permanently',
        'Developing occult knowledge, research skills, or psychological understanding',
        'Inheritance, insurance claims, or joint financial gains materializing',
        'Navratri and Diwali spiritual practices multiplying manifold power',
        'Overcoming fears and developing genuine courage through challenges'
      ],

      challenges: [
        'Unexpected crises or emergencies requiring immediate response',
        'Hidden enemies or betrayals from unexpected quarters',
        'Psychological challenges like anxiety, fear, or depression needing support',
        'Financial strain from unexpected obligations or expenses',
        'Relationship trust issues requiring honest communication and healing'
      ],

      remedies: [
        'Perform Navratri fasting and worship Goddess Durga for nine days for protection and power',
        'Recite Mahamrityunjaya mantra "Om Tryambakam..." 108 times daily for health and longevity',
        'Light Diya (lamp) at Diwali in all directions for removing negativity',
        'Donate black items, sesame oil, or iron to needy on Saturdays to mitigate challenges'
      ],

      luckyDates: ['1', '8', '10', '17', '24', '27'],
      luckyColors: ['Maroon', 'Black', 'Dark Red'],
      luckyNumbers: [8, 9, 18],
      avoid: ['Tuesdays and Saturdays combined']
    },

    {
      month: 'November',
      rating: 5,
      theme: 'Divine Grace',
      overview: 'November transforms energy completely as Sun enters Sagittarius (your 9th house) on November 16, bringing Jupiter\'s expansion into luck, higher learning, and spirituality. Diwali (November 1) marks financial fresh start. This month blesses with divine grace, fortune, and wisdom. Long-distance travel opportunities arise. Higher education or certification programs begin. Spiritual teachers or mentors enter life. Father\'s blessings amplify. Legal matters resolve favorably. This is one of best months for Aries—luck flows naturally. Your faith strengthens. Philosophical understanding deepens. International opportunities materialize. Generosity brings abundance. Trust universal support.',

      career: 'Exceptional professional month with recognition, promotion, or expanded responsibilities. Teaching, international business, law, publishing, or spiritual counseling fields particularly successful. Ethical leadership brings rewards. Long-distance travel for work opens new markets. Higher qualifications or certifications enhance marketability. Mentors or guides provide crucial advice. Your philosophical approach attracts followers. Marketing and branding efforts reach wider audience. Start ventures on auspicious dates for long-term success. Luck favors bold action aligned with dharma.',

      finance: 'Outstanding financial month beginning with Diwali Lakshmi Puja. Multiple income sources activate simultaneously. Promotion or increment likely. Foreign income or international projects boost earnings. Investment in education, certification, or spiritual learning pays dividends. Property or long-term assets appreciate. Gains through father, teachers, or mentors. Lucky breaks in financial matters—lottery, unexpected gifts, or opportunities. However, donate 10% income for continued blessings. Start new financial year on Diwali with proper planning.',

      relationships: 'Relationships blessed with understanding, growth, and shared philosophy. Singles meet partners through spiritual gatherings, educational institutions, or while traveling. These connections have soulmate quality. Married couples bond over shared beliefs and life philosophy. Plan international honeymoon or pilgrimage together. Father or father figure plays positive role in relationships. Cultural or religious celebrations bring families together. However, avoid preaching or imposing beliefs on partner. Respect individual spiritual paths.',

      health: 'Health robust with optimism boosting immunity. Focus on liver, thighs, and sciatic nerve. Possible issues: liver problems from overindulgence, sciatica pain, or weight gain from good food. Practice moderation despite abundance. Outdoor activities and adventure sports enhance vitality. Yoga and stretching prevent stiffness. Mental health excellent due to optimistic outlook and spiritual connection. However, avoid overconfidence regarding health. Maintain preventive measures. Diwali sweets in moderation.',

      opportunities: [
        'Divine grace and good fortune flowing naturally in all endeavors',
        'International opportunities for travel, business, or education',
        'Meeting spiritual teachers or mentors transforming life perspective',
        'Higher education or certifications opening new career avenues',
        'Father\'s blessings and support amplifying success manifold',
        'Diwali Lakshmi Puja blessings multiplying wealth and prosperity'
      ],

      challenges: [
        'Overconfidence or overcommitment due to abundant opportunities',
        'Excessive philosophy or preaching alienating practical people',
        'Overindulgence in celebrations affecting health or budget',
        'Scattered focus across multiple opportunities reducing effectiveness'
      ],

      remedies: [
        'Perform elaborate Diwali Lakshmi Puja on November 1 for year-long prosperity',
        'Donate to educational institutions, temples, or spiritual organizations',
        'Recite Jupiter mantra "Om Gram Greem Groum Sah Gurave Namah" 108 times on Thursdays',
        'Wear yellow sapphire (Pukhraj) 3-5 carats in gold ring on index finger after proper ritual',
        'Honor father and father figures with gifts and respect'
      ],

      luckyDates: ['1', '5', '10', '16', '19', '25', '28'],
      luckyColors: ['Yellow', 'Gold', 'Orange'],
      luckyNumbers: [3, 12, 21],
      avoid: ['None—entire month highly favorable']
    },

    {
      month: 'December',
      rating: 4,
      theme: 'Professional Peak',
      overview: 'December concludes year with professional achievements as Sun enters Capricorn (your 10th house) on December 21, marking Winter Solstice and new solar cycle. This month focuses on career, public image, and ambitious goals. November\'s wisdom now manifests as tangible success. Recognition and rewards arrive. Authority figures appreciate your work. Leadership opportunities expand. Year-end appraisals favor you. Set ambitious goals for coming year. Discipline and persistent effort bring results. Balance professional ambition with family time during holidays. This month demonstrates how spiritual growth (November) manifests as material success (December).',

      career: 'Peak professional month with promotions, awards, or major project completions. Your hard work throughout year receives recognition. Excellent for: finalizing important deals, securing contracts, or launching prestigious ventures. Authority positions suit you. Government sector opportunities arise. Public speaking or thought leadership enhances reputation. Year-end performance reviews exceed expectations. Network with influential people at holiday gatherings. Start new year with clear professional vision and strategic plan.',

      finance: 'Strong financial conclusion to year. Year-end bonuses, incentives, or performance rewards boost savings. Professional growth translates to income increase. Investment in professional development or business infrastructure justified. Tax-saving investments deadline approaching—consult chartered accountant. Review year\'s financial performance and plan next year budget. Charitable giving before year-end provides tax benefits and karmic credits. Clear all pending debts to start fresh year. Build or increase emergency fund to 6-12 months expenses.',

      relationships: 'Professional focus may reduce personal time; balance carefully. Married couples celebrate year-end and plan next year together. Single Aries meet career-oriented, ambitious partners. Relationships require maturity and long-term vision. Family proud of your achievements. However, avoid letting success create ego or distance from loved ones. Plan quality holiday time with family. Express gratitude for loved ones\' support throughout year. New Year celebrations deepen bonds.',

      health: 'Health generally good but stress from professional demands requires management. Focus on bones, knees, teeth, and joints. Possible issues: knee pain, dental problems, stress-related ailments, or fatigue. Winter season requires warmth and proper nutrition. Joint care and calcium intake important. Balance work stress with relaxation and family time. Year-end health check-up recommended. Set health goals for new year. Meditation and yoga maintain mental peace despite busy schedule.',

      opportunities: [
        'Career pinnacle moments with recognition, promotion, or prestigious opportunities',
        'Establishing authority and leadership in professional domain',
        'Year-end financial gains through bonuses and professional rewards',
        'Winter Solstice spiritual power for setting powerful intentions for new year',
        'Networking with influential people opening doors for future'
      ],

      challenges: [
        'Work-life balance challenging due to professional demands',
        'Stress and pressure from increased responsibilities',
        'Ego inflation from success affecting relationships',
        'Family time sacrifice for professional obligations'
      ],

      remedies: [
        'Worship Lord Shani (Saturn) on Saturdays for sustained professional success',
        'Donate warm clothes, blankets, or food to poor during winter',
        'Recite Shani mantra "Om Sham Shanishcharaya Namah" 108 times on Saturdays',
        'Practice gratitude meditation reflecting on year\'s blessings and lessons',
        'Set clear intentions on Winter Solstice (Dec 21) for new solar year'
      ],

      luckyDates: ['3', '8', '12', '17', '21', '26', '30'],
      luckyColors: ['Black', 'Navy Blue', 'Brown'],
      luckyNumbers: [8, 17, 26],
      avoid: ['Sundays evening']
    }
  ];

  return ariesForecasts;
}
