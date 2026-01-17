"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Briefcase, DollarSign, Heart, Activity, Sparkles, AlertTriangle, Star } from "lucide-react";
import { generateYearlyPrediction } from "@/lib/astrology/dynamic-predictions";

interface YearlyPredictionsProps {
  moonSign: string;
  ascendant: string;
  mahaDasha: string;
  antarDasha?: string;
  year?: number;
}

export function YearlyPredictions({ moonSign, ascendant, mahaDasha, antarDasha, year = 2026 }: YearlyPredictionsProps) {
  // Generate completely personalized prediction based on ALL factors
  const prediction = generateYearlyPrediction(
    moonSign,
    ascendant,
    mahaDasha,
    antarDasha || mahaDasha,
    year
  );

  return (
    <div className="space-y-6">
      {/* Year Header with personalized overview */}
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
                  Personalized for {moonSign} Moon • {ascendant} Ascendant • {mahaDasha} Dasha
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

      {/* Career Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <span>Career & Professional Life</span>
          </CardTitle>
          <CardDescription>Based on your {ascendant} Ascendant and {mahaDasha}-{antarDasha} Dasha</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.career}</p>
        </CardContent>
      </Card>

      {/* Finance Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-gold" />
            <span>Finance & Wealth</span>
          </CardTitle>
          <CardDescription>Income, investments, and financial planning for {year}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.finance}</p>
        </CardContent>
      </Card>

      {/* Relationship Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>Relationships & Love</span>
          </CardTitle>
          <CardDescription>Emotional connections based on your {moonSign} Moon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.relationships}</p>
        </CardContent>
      </Card>

      {/* Health Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-green-500" />
            <span>Health & Wellness</span>
          </CardTitle>
          <CardDescription>Physical and mental health focus areas</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.health}</p>
        </CardContent>
      </Card>

      {/* Spiritual Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Spiritual Growth</span>
          </CardTitle>
          <CardDescription>Your spiritual path during {mahaDasha} Dasha</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-line">{prediction.spiritualGrowth}</p>
        </CardContent>
      </Card>

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
              {prediction.luckyPeriods.map((period, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-gold text-lg">•</span>
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
              {prediction.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-orange-500 text-lg">•</span>
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
          <CardDescription>Specific to your chart configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {prediction.remedies.map((remedy, index) => (
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
            This prediction is uniquely generated for your combination of {moonSign} Moon Sign, {ascendant} Ascendant,
            and {mahaDasha}-{antarDasha} Dasha periods. No two individuals receive the same prediction unless they
            share identical astrological configurations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
