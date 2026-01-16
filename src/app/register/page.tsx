"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardFooter, GlassCardHeader, GlassCardTitle } from "@/components/ui/glass-card";
import { VedicLogo } from "@/components/brand/VedicLogo";
import { AlertCircle, ArrowRight, Loader2, User, Mail, Lock, Calendar, Clock, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LocationAutocomplete } from "@/components/astrology/LocationAutocomplete";
import { updateUserProfile, saveBirthChart } from "@/lib/supabase/birth-charts";
import { getCompleteBirthChart, convertToAPIFormat } from "@/lib/astrology-api";

export default function SimpleRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Account details
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Step 2: Birth details
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

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!accountData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!accountData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (accountData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (accountData.password !== accountData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Move to step 2
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate birth details
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
      console.log('🚀 Starting simplified registration...');

      // Step 1: Create account
      console.log('📝 Creating account...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: accountData.email,
        password: accountData.password,
        options: {
          data: {
            full_name: accountData.name,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if email already exists
      if (authData.user.identities && authData.user.identities.length === 0) {
        setError("This email is already registered. Please sign in instead.");
        setIsLoading(false);
        return;
      }

      console.log('✅ Account created:', authData.user.email);

      // Step 2: Save birth profile
      console.log('📊 Saving birth profile...');
      await updateUserProfile(birthData);
      console.log('✅ Profile saved');

      // Step 3: Generate birth chart
      console.log('🌟 Generating birth chart...');
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

        await saveBirthChart({
          name: accountData.name,
          date_of_birth: birthData.date_of_birth,
          time_of_birth: birthData.time_of_birth,
          place_of_birth: birthData.place_of_birth,
          latitude: birthData.latitude,
          longitude: birthData.longitude,
          timezone: birthData.timezone,
          chart_data: chartData,
        });
        console.log('✅ Birth chart saved');
      } catch (chartError) {
        console.error('⚠️ Chart generation failed (non-blocking):', chartError);
      }

      console.log('🎉 Registration complete!');

      // Check if email confirmation is required
      if (!authData.session) {
        // Email confirmation required
        setError(null);
        alert("✅ Registration successful!\n\nWe've sent a confirmation email to " + accountData.email + ".\n\nPlease check your inbox and click the confirmation link to access your account.\n\nYour birth chart is already prepared and waiting!");
        router.push("/login");
      } else {
        // No email confirmation needed - direct login
        alert("🎉 Registration successful!\n\nYour birth chart has been generated!\n\nWelcome to your personalized Vedic astrology dashboard.");
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

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
              {step === 1 ? "Create Your Account" : "Complete Your Birth Profile"}
            </GlassCardTitle>
            <GlassCardDescription>
              {step === 1
                ? "Start your journey with authentic Vedic wisdom"
                : "We'll use this to generate your personalized birth chart"}
            </GlassCardDescription>
          </GlassCardHeader>

          <GlassCardContent>
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 1 ? 'bg-primary text-primary-foreground' : 'bg-primary/20 text-primary'
                }`}>
                  1
                </div>
                <div className="w-12 h-0.5 bg-primary/20"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              </div>
            )}

            {/* Step 1: Account Details */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={accountData.name}
                      onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={accountData.email}
                      onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={accountData.password}
                      onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat your password"
                      value={accountData.confirmPassword}
                      onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-gold">
                  Next: Birth Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}

            {/* Step 2: Birth Details */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date_of_birth">Date of Birth *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={birthData.date_of_birth}
                      onChange={(e) => setBirthData({ ...birthData, date_of_birth: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time_of_birth">Time of Birth *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time_of_birth"
                      type="time"
                      value={birthData.time_of_birth}
                      onChange={(e) => setBirthData({ ...birthData, time_of_birth: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use 24-hour format (e.g., 14:30). Check your birth certificate for accuracy.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="place_of_birth">Place of Birth *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <div className="pl-10">
                      <LocationAutocomplete
                        value={birthData.place_of_birth}
                        onSelect={handleLocationSelect}
                        placeholder="Search for your birth city..."
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Type and select from dropdown for accurate coordinates
                  </p>
                </div>

                {birthData.latitude !== 0 && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">📍 Location Confirmed:</p>
                    <p className="text-sm font-medium">{birthData.place_of_birth}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Coordinates: {birthData.latitude.toFixed(4)}°, {birthData.longitude.toFixed(4)}° | {birthData.timezone}
                    </p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-primary to-gold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </GlassCardContent>

          <GlassCardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </GlassCardFooter>
        </GlassCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
