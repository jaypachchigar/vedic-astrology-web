"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Calendar, TrendingUp, Sparkles, ArrowRight, Sun, Heart, Briefcase, DollarSign, Activity, Clock, Compass, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { getUserProfile } from "@/lib/supabase/birth-charts";
import { getCompleteBirthChart, convertToAPIFormat } from "@/lib/astrology-api";
import DailyHoroscope from "@/components/astrology/DailyHoroscope";
import { YearlyPredictions } from "@/components/astrology/YearlyPredictions";
import { MonthlyPredictions } from "@/components/astrology/MonthlyPredictions";

interface UserChartData {
  moonSign?: string;
  nakshatra?: string;
  nakshatraPada?: number;
  ascendant?: string;
  mahaDasha?: string;
  antarDasha?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<UserChartData>({});
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Not authenticated - redirect to register page
        router.push('/register');
        return;
      }

      // Get profile - try direct DB query first
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle() as { data: any };

      let name = "";
      if (profile?.full_name) {
        name = (profile.full_name as string).split(' ')[0]; // First name only
      } else {
        const emailName = user.email?.split('@')[0] || 'User';
        name = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      }
      setUserName(name);

      // If user has complete birth details, calculate their chart
      if (profile && profile.date_of_birth && profile.time_of_birth && profile.latitude && profile.longitude) {
        setHasProfile(true);
        try {
          const apiDetails = convertToAPIFormat({
            dateOfBirth: profile.date_of_birth,
            timeOfBirth: profile.time_of_birth,
            timezone: profile.timezone || 'Asia/Kolkata',
            latitude: profile.latitude,
            longitude: profile.longitude,
          });

          const data = await getCompleteBirthChart(apiDetails);
          const planets = data?.planetPositions?.planets || [];
          const moon = planets.find((p: any) => p.name === 'Moon');
          const ascendant = data?.kundli?.ascendant;
          const dasha = data?.advancedKundli?.vimshottari_dasha;

          setChartData({
            moonSign: moon?.sign?.name,
            nakshatra: moon?.nakshatra?.name,
            nakshatraPada: moon?.nakshatra?.pada,
            ascendant: ascendant?.sign?.name,
            mahaDasha: dasha?.maha_dasha?.planet,
            antarDasha: dasha?.antar_dasha?.planet,
          });
        } catch (error) {
          console.error('Error calculating chart:', error);
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUserName('User');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
          {loading ? 'Loading...' : `Welcome, ${userName}!`}
        </h1>
        <p className="text-muted-foreground mt-2">
          {hasProfile ?
            "Here's your personalized astrological overview for today" :
            "Set up your birth details to see personalized predictions"}
        </p>
      </div>

      {!hasProfile && !loading && (
        <GlassCard variant="primary" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground">
                Add your birth details to unlock personalized horoscope, dashas, and predictions
              </p>
            </div>
            <Link href="/dashboard/profile">
              <Button>
                Set Up Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </GlassCard>
      )}

      {hasProfile && !loading && (
        <>
          {/* User's Chart Overview */}
          <GlassCard variant="gradient" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-gold to-purple-light bg-clip-text text-transparent">
                  Your Birth Chart Overview
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Based on your birth details</p>
              </div>
              <Sun className="w-10 h-10 text-primary" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <p className="text-xs text-muted-foreground mb-1">Ascendant (Lagna)</p>
                <p className="text-lg font-bold text-primary">{chartData.ascendant || 'Loading...'}</p>
                <p className="text-xs text-muted-foreground mt-1">Rising Sign</p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/50">
                <p className="text-xs text-muted-foreground mb-1">Moon Sign (Rashi)</p>
                <p className="text-lg font-bold text-primary">{chartData.moonSign || 'Loading...'}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {chartData.nakshatra ? `${chartData.nakshatra} Nakshatra` : ''}
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card/50">
                <p className="text-xs text-muted-foreground mb-1">Current Dasha</p>
                <p className="text-lg font-bold text-gold">
                  {chartData.mahaDasha && chartData.antarDasha ?
                    `${chartData.mahaDasha} - ${chartData.antarDasha}` :
                    'Loading...'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Vimshottari Dasha</p>
              </div>
            </div>
          </GlassCard>

          {/* Predictions Tabs - Daily, Yearly, Monthly */}
          {chartData.moonSign && chartData.nakshatra && chartData.mahaDasha && chartData.antarDasha && chartData.ascendant && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Your Personalized Predictions</span>
                </CardTitle>
                <CardDescription>Comprehensive astrological forecasts based on your birth chart</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="daily" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 gap-2">
                    <TabsTrigger value="daily" className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" />
                      <span>Today</span>
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Year 2026</span>
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Monthly</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="daily">
                    <DailyHoroscope
                      moonSign={chartData.moonSign}
                      nakshatra={chartData.nakshatra}
                      mahaDasha={chartData.mahaDasha}
                      antarDasha={chartData.antarDasha}
                      ascendant={chartData.ascendant}
                    />
                  </TabsContent>

                  <TabsContent value="yearly">
                    <YearlyPredictions
                      moonSign={chartData.moonSign}
                      ascendant={chartData.ascendant}
                      mahaDasha={chartData.mahaDasha}
                      antarDasha={chartData.antarDasha}
                      year={2026}
                    />
                  </TabsContent>

                  <TabsContent value="monthly">
                    <MonthlyPredictions
                      moonSign={chartData.moonSign}
                      ascendant={chartData.ascendant}
                      year={2026}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-primary/20 hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/astrology" className="block">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Birth Chart</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Kundli Analysis</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get complete Vedic astrology birth chart with planetary positions, dashas, and doshas
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-primary/20 hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/numerology" className="block">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple to-purple/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Numerology</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Life Path Numbers</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Discover your life path, destiny, and personality numbers with detailed analysis
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="border-primary/20 hover:shadow-lg transition-shadow cursor-pointer group">
          <Link href="/dashboard/vastu" className="block">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Vastu</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Space Harmony</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time compass for Vastu-compliant directions and energy optimization
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>

    </div>
  );
}
