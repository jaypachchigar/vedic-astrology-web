"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { VedicLogo } from "@/components/brand/VedicLogo";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LocationAutocomplete } from "@/components/astrology/LocationAutocomplete";
import { updateUserProfile, saveBirthChart } from "@/lib/supabase/birth-charts";
import { getCompleteBirthChart, convertToAPIFormat } from "@/lib/astrology-api";

export default function CompleteRegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [birthData, setBirthData] = useState({
    date_of_birth: "",
    time_of_birth: "",
    place_of_birth: "",
    city: "",
    country: "",
    latitude: 0,
    longitude: 0,
    timezone: "Asia/Kolkata",
  });

  // Check authentication on mount (but don't block access)
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error checking session:', error);
          // Don't block - let them continue anyway
        }

        if (session) {
          console.log('✅ User authenticated:', session.user.email);
        } else {
          console.log('⚠️ No session - user may need to confirm email later');
        }

        setCheckingAuth(false);
      } catch (err) {
        console.error('Error in checkAuth:', err);
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleLocationSelect = (location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
    formatted: string;
  }) => {
    setBirthData({
      ...birthData,
      place_of_birth: location.formatted,
      city: location.city,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!birthData.date_of_birth) {
      setError("Please enter your date of birth");
      return;
    }

    if (!birthData.time_of_birth) {
      setError("Please enter your time of birth");
      return;
    }

    if (!birthData.place_of_birth || !birthData.latitude || birthData.latitude === 0) {
      setError("Please select a valid location from the dropdown");
      return;
    }

    setIsLoading(true);

    try {
      // Get current session and user
      const { data: { session } } = await supabase.auth.getSession();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("⚠️ Email confirmation required. Please check your email and click the confirmation link, then sign in to complete your profile.\n\nTip: Ask your admin to disable 'Confirm email' in Supabase settings for instant access.");
        setIsLoading(false);
        setTimeout(() => router.push('/login'), 5000);
        return;
      }

      // User exists (even if session is pending email confirmation)
      console.log('📝 Step 1/3: Saving birth profile for user:', user.email);
      // Update user profile with birth details
      await updateUserProfile(birthData);
      console.log('✅ Profile saved');

      console.log('📊 Step 2/3: Generating birth chart...');
      // Automatically generate birth chart
      try {
        const apiDetails = convertToAPIFormat({
          dateOfBirth: birthData.date_of_birth,
          timeOfBirth: birthData.time_of_birth,
          latitude: birthData.latitude,
          longitude: birthData.longitude,
          timezone: birthData.timezone,
        });

        const chartData = await getCompleteBirthChart(apiDetails);
        console.log('✅ Birth chart calculated');

        console.log('💾 Step 3/3: Saving chart to database...');
        // Save birth chart to database
        await saveBirthChart({
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          date_of_birth: birthData.date_of_birth,
          time_of_birth: birthData.time_of_birth,
          place_of_birth: birthData.place_of_birth,
          latitude: birthData.latitude,
          longitude: birthData.longitude,
          timezone: birthData.timezone,
          chart_data: chartData,
        });
        console.log('✅ Birth chart saved to database');
        console.log('🎉 Registration complete! Chart ready for AI.');
      } catch (chartError) {
        console.error('⚠️ Chart generation failed (non-blocking):', chartError);
        // Don't block registration if chart generation fails
        // User can generate it later from astrology page
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error saving birth details:", err);
      setError(err.message || "Failed to save birth details. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-4">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/">
            <VedicLogo size="lg" showText />
          </Link>
        </div>

        <GlassCard variant="gradient" animated>
          <GlassCardHeader className="space-y-1">
            <GlassCardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-gold to-purple-light bg-clip-text text-transparent">
              Complete Your Birth Profile
            </GlassCardTitle>
            <GlassCardDescription>
              Enter your birth details to unlock personalized astrological insights
            </GlassCardDescription>
          </GlassCardHeader>
          <GlassCardContent>
            {/* Benefits Banner */}
            <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="text-sm font-semibold mb-3 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                Why we need this information
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Automatically calculate your complete birth chart with precise planetary positions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Generate personalized daily horoscopes based on your Moon sign and Nakshatra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Provide accurate Vimshottari Dasha predictions for your life periods</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Calculate numerology, Vastu, and all other features automatically</span>
                </li>
              </ul>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth *</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={birthData.date_of_birth}
                  onChange={(e) => setBirthData({ ...birthData, date_of_birth: e.target.value })}
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-muted-foreground">Required for accurate astrological calculations</p>
              </div>

              {/* Time of Birth */}
              <div className="space-y-2">
                <Label htmlFor="time_of_birth">Time of Birth *</Label>
                <Input
                  id="time_of_birth"
                  type="time"
                  value={birthData.time_of_birth}
                  onChange={(e) => setBirthData({ ...birthData, time_of_birth: e.target.value })}
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter in 24-hour format (e.g., 14:30). Check your birth certificate for accurate time.
                </p>
              </div>

              {/* Place of Birth */}
              <div className="space-y-2">
                <Label htmlFor="place_of_birth">Place of Birth *</Label>
                <LocationAutocomplete
                  value={birthData.place_of_birth}
                  onSelect={handleLocationSelect}
                  placeholder="Search for your birth city..."
                />
                <p className="text-xs text-muted-foreground">
                  Type and select from dropdown. Coordinates will be auto-filled.
                </p>
              </div>

              {/* Coordinates Display (read-only) */}
              {birthData.latitude !== 0 && (
                <div className="p-3 bg-muted rounded-lg space-y-2">
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground mb-1">Latitude</p>
                      <p className="font-medium">{birthData.latitude.toFixed(4)}°</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Longitude</p>
                      <p className="font-medium">{birthData.longitude.toFixed(4)}°</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Timezone</p>
                      <p className="font-medium">{birthData.timezone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex space-x-3">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-gold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating your chart...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  disabled={isLoading}
                >
                  Skip for now
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                You can always add or update this information later from your Profile page
              </p>
            </form>
          </GlassCardContent>
        </GlassCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your birth data is kept private and secure. We never share your personal information.
        </p>
      </div>
    </div>
  );
}
