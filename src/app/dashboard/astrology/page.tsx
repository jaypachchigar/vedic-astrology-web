"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { LocationAutocomplete } from "@/components/astrology/LocationAutocomplete";
import { ComprehensiveResults } from "./comprehensive-results";
import { getUserProfile, updateUserProfile } from "@/lib/supabase/birth-charts";
import { useRouter } from "next/navigation";

export default function AstrologyPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "chart">("form");
  const [loading, setLoading] = useState(true);
  const [hasProfileData, setHasProfileData] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    timezone: "Asia/Kolkata", // Default to IST
    placeOfBirth: "",
    city: "",
    country: "",
    latitude: 0,
    longitude: 0,
  });

  // Load profile data on mount
  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        console.log('🔄 Loading profile data...');
        const profile = await getUserProfile();

        if (profile && profile.date_of_birth && profile.time_of_birth && profile.latitude) {
          console.log('📥 Complete profile data found - auto-loading chart');
          const profileData = {
            name: profile.full_name || "",
            dateOfBirth: profile.date_of_birth || "",
            timeOfBirth: profile.time_of_birth || "",
            timezone: profile.timezone || "Asia/Kolkata",
            placeOfBirth: profile.place_of_birth || "",
            city: profile.city || profile.place_of_birth?.split(',')[0]?.trim() || "",
            country: profile.country || profile.place_of_birth?.split(',').pop()?.trim() || "",
            latitude: profile.latitude || 0,
            longitude: profile.longitude || 0,
          };
          setFormData(profileData);
          setHasProfileData(true);
          setStep("chart"); // Automatically show chart
          console.log('✅ Profile data loaded, showing chart');
        } else {
          console.log('ℹ️ No complete profile data found - showing setup prompt');
          setHasProfileData(false);
        }
      } catch (error) {
        console.error("❌ Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, []); // Load only on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate coordinates are set
    if (!formData.latitude || !formData.longitude || formData.latitude === 0 || formData.longitude === 0) {
      alert('Please select a valid location from the dropdown');
      return;
    }

    // Validate all required fields
    if (!formData.name || !formData.dateOfBirth || !formData.timeOfBirth) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Form data before submission:', formData);

    // Save to profile for future use
    try {
      await updateUserProfile({
        full_name: formData.name,
        date_of_birth: formData.dateOfBirth,
        time_of_birth: formData.timeOfBirth,
        timezone: formData.timezone,
        place_of_birth: formData.placeOfBirth,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
    } catch (error) {
      console.error('❌ Error saving to profile:', error);
      // Don't block chart generation if profile save fails
    }

    setStep("chart");
  };

  if (step === "chart") {
    return (
      <ComprehensiveResults
        birthData={formData}
        onEdit={() => router.push('/dashboard/profile')}
      />
    );
  }

  // If no profile data, redirect to complete registration
  if (!loading && !hasProfileData) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-primary mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-bold mb-4">Complete Your Birth Profile</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            To view your birth chart and astrological insights, please complete your birth profile with date, time, and place of birth.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => router.push('/register-complete')}
              className="bg-gradient-to-r from-primary to-gold"
            >
              Complete Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/profile')}
            >
              Go to Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Old basic results view (replaced with ComprehensiveResults above)
  if (false) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Your Birth Chart</h1>
            <p className="text-muted-foreground mt-2">
              Complete Vedic astrology analysis for {formData.name}
            </p>
          </div>
          <Button variant="outline" onClick={() => setStep("form")}>
            Edit Details
          </Button>
        </div>

        {/* Birth Chart Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Kundali (Birth Chart)</CardTitle>
            <CardDescription>Your planetary positions at birth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center border-2 border-primary/20">
              <div className="text-center">
                <Star className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Birth chart visualization will be rendered here
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Using Swiss Ephemeris calculations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Planetary Positions */}
          <Card>
            <CardHeader>
              <CardTitle>Planetary Positions</CardTitle>
              <CardDescription>Grahas in your chart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { planet: "Sun (Surya)", sign: "Aries", house: "1st", degree: "15°32'" },
                  { planet: "Moon (Chandra)", sign: "Taurus", house: "2nd", degree: "22°18'" },
                  { planet: "Mars (Mangal)", sign: "Leo", house: "5th", degree: "8°45'" },
                  { planet: "Mercury (Budha)", sign: "Pisces", house: "12th", degree: "28°12'" },
                  { planet: "Jupiter (Guru)", sign: "Sagittarius", house: "9th", degree: "12°30'" },
                  { planet: "Venus (Shukra)", sign: "Gemini", house: "3rd", degree: "19°22'" },
                  { planet: "Saturn (Shani)", sign: "Capricorn", house: "10th", degree: "5°48'" },
                ].map((planet) => (
                  <div key={planet.planet} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div>
                      <p className="font-medium text-sm">{planet.planet}</p>
                      <p className="text-xs text-muted-foreground">{planet.sign} - {planet.house} House</p>
                    </div>
                    <span className="text-sm font-mono text-primary">{planet.degree}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dasha Periods */}
          <Card>
            <CardHeader>
              <CardTitle>Current Dasha</CardTitle>
              <CardDescription>Vimshottari Dasha system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Maha Dasha</p>
                  <p className="font-semibold text-lg">Jupiter (Guru)</p>
                  <p className="text-xs text-muted-foreground mt-1">2020 - 2036</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Antar Dasha</p>
                  <p className="font-medium">Saturn (Shani)</p>
                  <p className="text-xs text-muted-foreground mt-1">2024 - 2026</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-1">Pratyantar Dasha</p>
                  <p className="font-medium">Mercury (Budha)</p>
                  <p className="text-xs text-muted-foreground mt-1">Current Period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictions */}
        <Card>
          <CardHeader>
            <CardTitle>Personalized Predictions</CardTitle>
            <CardDescription>Based on your birth chart analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Career & Profession</h4>
                <p className="text-sm text-muted-foreground">
                  Strong 10th house with Saturn indicates success in structured careers. Your Jupiter placement
                  suggests expansion in fields related to education, finance, or law. The current dasha period
                  is favorable for career advancement.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Relationships & Marriage</h4>
                <p className="text-sm text-muted-foreground">
                  Venus in the 3rd house indicates strong communication in relationships. The 7th house
                  placement suggests a harmonious partnership. Best period for marriage considerations
                  is during Venus Antar Dasha.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Health & Well-being</h4>
                <p className="text-sm text-muted-foreground">
                  Mars in the 5th house provides good vitality. However, Saturn's aspect suggests
                  need for attention to bone health and joints. Regular exercise and yoga are recommended.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remedies */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>Recommended Remedies</CardTitle>
            <CardDescription>Vedic solutions for planetary imbalances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Gemstone</p>
                  <p className="text-sm text-muted-foreground">Yellow Sapphire for Jupiter - Wear on index finger on Thursday</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Mantra</p>
                  <p className="text-sm text-muted-foreground">Guru Mantra: "Om Gram Greem Graum Sah Gurave Namah" - 108 times daily</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Charity</p>
                  <p className="text-sm text-muted-foreground">Donate yellow items on Thursdays - helps strengthen Jupiter</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show profile setup prompt if no complete profile data
  if (!hasProfileData && !loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 px-4">
        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold mx-auto mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Complete Your Birth Profile</CardTitle>
            <CardDescription className="text-base mt-2">
              To view your birth chart and astrological insights, please add your birth details to your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <p className="text-sm font-medium">What you'll get with your birth profile:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Complete birth chart with all planetary positions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Detailed Vimshottari Dasha predictions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Personalized daily horoscope</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Gemstone recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Automatic calculations for numerology, vastu, and AI insights</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-primary to-gold"
                size="lg"
                onClick={() => window.location.href = '/dashboard/profile'}
              >
                Complete Birth Profile
                <Star className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Takes less than 2 minutes • Your data is kept private and secure
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4">
      <div>
        <h1 className="text-3xl font-bold">Create Your Birth Chart</h1>
        <p className="text-muted-foreground mt-2">
          Enter your birth details for accurate Vedic astrology analysis
        </p>
        {formData.name && (
          <p className="text-sm text-primary mt-2">
            ✓ Loaded from your profile
          </p>
        )}
        {!formData.timezone && formData.name && (
          <p className="text-sm text-yellow-600 mt-2">
            ⚠️ Your saved profile is missing timezone info. Please select timezone below and regenerate chart.
          </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Birth Information</CardTitle>
          <CardDescription>All fields are required for accurate calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className="pl-9"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOfBirth">Time of Birth</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="timeOfBirth"
                    type="time"
                    className="pl-9"
                    value={formData.timeOfBirth}
                    onChange={(e) => setFormData({ ...formData, timeOfBirth: e.target.value })}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Use 24-hour format. Exact time is crucial.</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select
                id="timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                required
              >
                <option value="Asia/Kolkata">India Standard Time (IST, UTC+5:30)</option>
                <option value="America/New_York">US Eastern Time (EST/EDT, UTC-5/-4)</option>
                <option value="America/Chicago">US Central Time (CST/CDT, UTC-6/-5)</option>
                <option value="America/Denver">US Mountain Time (MST/MDT, UTC-7/-6)</option>
                <option value="America/Los_Angeles">US Pacific Time (PST/PDT, UTC-8/-7)</option>
                <option value="Europe/London">UK Time (GMT/BST, UTC+0/+1)</option>
                <option value="Europe/Paris">Central European Time (CET/CEST, UTC+1/+2)</option>
                <option value="Asia/Dubai">UAE Time (GST, UTC+4)</option>
                <option value="Asia/Singapore">Singapore Time (SGT, UTC+8)</option>
                <option value="Asia/Tokyo">Japan Standard Time (JST, UTC+9)</option>
                <option value="Australia/Sydney">Australian Eastern Time (AEST/AEDT, UTC+10/+11)</option>
                <option value="Pacific/Auckland">New Zealand Time (NZST/NZDT, UTC+12/+13)</option>
              </select>
              <p className="text-xs text-muted-foreground">Select the timezone where you were born</p>
            </div>

            {/* Location Autocomplete */}
            <LocationAutocomplete
              value={formData.placeOfBirth}
              onChange={(location) => {
                setFormData({
                  ...formData,
                  placeOfBirth: location.place,
                  city: location.city,
                  country: location.country,
                  latitude: location.latitude,
                  longitude: location.longitude,
                });
              }}
              onPlaceChange={(place) => setFormData({ ...formData, placeOfBirth: place })}
              placeholder="Start typing city name... (e.g., New York, USA)"
            />

            {/* City and Country (auto-filled) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  placeholder="Auto-filled from location"
                  readOnly
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  placeholder="Auto-filled from location"
                  readOnly
                  className="bg-muted/50"
                />
              </div>
            </div>

            {/* Latitude and Longitude (auto-filled, read-only) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="Auto-filled"
                  value={formData.latitude || ""}
                  readOnly
                  className="bg-muted/50 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Automatically calculated from location</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="Auto-filled"
                  value={formData.longitude || ""}
                  readOnly
                  className="bg-muted/50 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">Automatically calculated from location</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              <strong>Tip:</strong> Use Google Maps to find exact latitude and longitude of your birth place.
              Right-click on the location and select the coordinates.
            </p>

            <Button type="submit" className="w-full" size="lg">
              Generate Birth Chart
              <Star className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm mb-1">Why exact birth time matters</p>
              <p className="text-sm text-muted-foreground">
                Your birth time determines the Ascendant (Lagna) and house placements, which are crucial
                for accurate predictions. Even a few minutes difference can change your chart significantly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
