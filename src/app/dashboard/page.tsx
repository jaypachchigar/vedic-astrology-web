"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Calendar, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-2">
          Here's your personalized astrological overview for today
        </p>
      </div>

      {/* Today's Insight */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>Today's Insight</CardTitle>
          </div>
          <CardDescription>Based on your birth chart and current transits</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed mb-4">
            The Moon transits through your 10th house today, highlighting your career and public image.
            This is an excellent time to network and make professional connections. Jupiter's aspect
            brings optimism and expansion in your creative projects.
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-primary/20 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <span className="text-sm font-medium">75% Favorable</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/astrology">
            <CardHeader>
              <Star className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="group-hover:text-primary transition-colors">Birth Chart</CardTitle>
              <CardDescription>View your complete Kundali and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10">
                Open Chart
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/numerology">
            <CardHeader>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-primary font-bold text-lg">9</span>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Numerology</CardTitle>
              <CardDescription>Discover your life path and destiny numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10">
                Calculate Numbers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/vastu">
            <CardHeader>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <span className="text-primary font-bold">N</span>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">Vastu Compass</CardTitle>
              <CardDescription>AI-powered directional recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:bg-primary/10">
                Open Compass
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Current Planetary Transits */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Planetary Transits</CardTitle>
              <CardDescription>Active planetary movements affecting you</CardDescription>
            </div>
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { planet: "Jupiter", house: "10th House", effect: "Career Growth", impact: "positive" },
              { planet: "Saturn", house: "7th House", effect: "Relationship Lessons", impact: "neutral" },
              { planet: "Mars", house: "3rd House", effect: "Communication Energy", impact: "positive" },
            ].map((transit) => (
              <div key={transit.planet} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    transit.impact === "positive" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{transit.planet} in {transit.house}</p>
                    <p className="text-sm text-muted-foreground">{transit.effect}</p>
                  </div>
                </div>
                <TrendingUp className={cn(
                  "w-5 h-5",
                  transit.impact === "positive" ? "text-green-500" : "text-blue-500"
                )} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Teaser */}
      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>Ask Your AI Assistant</CardTitle>
          </div>
          <CardDescription>Get personalized astrological guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <p className="text-sm italic text-muted-foreground">
              "What should I focus on this week based on my birth chart?"
            </p>
          </div>
          <Link href="/dashboard/ai">
            <Button className="w-full">
              Start Conversation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
