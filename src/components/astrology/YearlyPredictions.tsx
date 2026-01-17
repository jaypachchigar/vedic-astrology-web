"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar, Briefcase, DollarSign, Heart, Activity, Sparkles, AlertTriangle, Star,
  TrendingUp, TrendingDown, BookOpen, Users, Home, Wallet, PiggyBank, GraduationCap,
  Lightbulb, Target, Clock, Shield
} from "lucide-react";
import { generateYearlyPrediction } from "@/lib/astrology/dynamic-predictions";

interface YearlyPredictionsProps {
  moonSign: string;
  ascendant: string;
  mahaDasha: string;
  antarDasha?: string;
  year?: number;
}

export function YearlyPredictions({ moonSign, ascendant, mahaDasha, antarDasha, year = 2026 }: YearlyPredictionsProps) {
  const prediction = generateYearlyPrediction(
    moonSign,
    ascendant,
    mahaDasha,
    antarDasha || mahaDasha,
    year
  );

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
                  Personalized for {moonSign} Moon • {ascendant} Ascendant • {mahaDasha}-{antarDasha || mahaDasha} Dasha
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
            <p className="text-base leading-relaxed whitespace-pre-line">{prediction.overview}</p>
          </div>
        </CardContent>
      </Card>

      {/* Career Section with Quarters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <span>Career & Professional Life</span>
          </CardTitle>
          <CardDescription>Based on {ascendant} Ascendant and {mahaDasha}-{antarDasha || mahaDasha} Dasha</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.career}</p>

          {prediction.careerQuarters && prediction.careerQuarters.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Quarterly Career Breakdown
              </h4>
              <div className="grid gap-3">
                {prediction.careerQuarters.map((quarter: string, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-sm leading-relaxed">{quarter}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Finance Section with Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gold" />
            <span>Finance & Wealth</span>
          </CardTitle>
          <CardDescription>Income, investments, and financial planning for {year}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.finance}</p>

          {prediction.financeBreakdown && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  Income Outlook
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.financeBreakdown.income}</p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  Expense Management
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.financeBreakdown.expenses}</p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-500" />
                  Investment Strategy
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.financeBreakdown.investments}</p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-purple-500" />
                  Savings Goals
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.financeBreakdown.savings}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Relationships Section with Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>Relationships & Love</span>
          </CardTitle>
          <CardDescription>Emotional connections based on {moonSign} Moon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.relationships}</p>

          {prediction.relationshipAreas && (
            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Romance & Dating
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.relationshipAreas.romance}</p>
              </div>

              <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  Marriage & Partnership
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.relationshipAreas.marriage}</p>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-orange-500" />
                  Family Dynamics
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.relationshipAreas.family}</p>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-500" />
                  Friendships & Social
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.relationshipAreas.friendships}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Health Section with Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span>Health & Wellness</span>
          </CardTitle>
          <CardDescription>Physical and mental health for {ascendant} Ascendant and {moonSign} Moon</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.health}</p>

          {prediction.healthDetails && (
            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  Physical Health
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.healthDetails.physical}</p>
              </div>

              <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-indigo-500" />
                  Mental & Emotional Health
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{prediction.healthDetails.mental}</p>
              </div>

              {prediction.healthDetails.prevention && prediction.healthDetails.prevention.length > 0 && (
                <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-500/20">
                  <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-teal-500" />
                    Prevention & Wellness Checklist
                  </h5>
                  <ul className="space-y-2">
                    {prediction.healthDetails.prevention.map((item: string, idx: number) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-teal-500 mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education Section */}
      {prediction.education && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Education & Learning</span>
            </CardTitle>
            <CardDescription>Academic and skill development guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.education}</p>
          </CardContent>
        </Card>
      )}

      {/* Spiritual Growth with Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Spiritual Growth</span>
          </CardTitle>
          <CardDescription>Your spiritual path during {mahaDasha} Dasha</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.spiritualGrowth}</p>

          {prediction.spiritualPractices && prediction.spiritualPractices.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-3">Recommended Spiritual Practices</h4>
              <ul className="space-y-2">
                {prediction.spiritualPractices.map((practice: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2 p-2 rounded bg-purple-500/5">
                    <span className="text-purple-500">◈</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Highlights */}
      {prediction.monthlyHighlights && prediction.monthlyHighlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Month-by-Month Highlights</span>
            </CardTitle>
            <CardDescription>Key themes and focus areas for each month of {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {prediction.monthlyHighlights.map((highlight: string, idx: number) => (
                <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
                  <p className="text-sm leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lucky Periods & Challenges */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gold" />
              <span>Lucky Periods</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {prediction.luckyPeriods.map((period: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-gold text-lg">★</span>
                  <span className="text-sm">{period}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Challenges to Navigate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {prediction.challenges.map((challenge: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-orange-500 text-lg">⚠</span>
                  <span className="text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Remedies */}
      <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-orange/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span>Personalized Vedic Remedies</span>
          </CardTitle>
          <CardDescription>Specific to your {moonSign} Moon, {ascendant} Ascendant, and {mahaDasha} Dasha</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {prediction.remedies.map((remedy: string, index: number) => (
              <li key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-card border border-border">
                <span className="text-gold font-bold text-lg">{index + 1}.</span>
                <span className="text-sm leading-relaxed">{remedy}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Summary Note */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground italic text-center">
            This comprehensive prediction is uniquely generated for your combination of {moonSign} Moon Sign, {ascendant} Ascendant,
            and {mahaDasha}-{antarDasha || mahaDasha} Dasha periods, with current planetary transits for {year}.
            No two individuals receive the same prediction unless they share identical astrological configurations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
