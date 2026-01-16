"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Calendar, MapPin, Clock, Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { getUserProfile, updateUserProfile, saveBirthChart } from "@/lib/supabase/birth-charts";
import { LocationAutocomplete } from "@/components/astrology/LocationAutocomplete";
import { getCompleteBirthChart, convertToAPIFormat } from "@/lib/astrology-api";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    date_of_birth: "",
    time_of_birth: "",
    place_of_birth: "",
    city: "",
    country: "",
    latitude: 0,
    longitude: 0,
    timezone: "Asia/Kolkata",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const profileData = await getUserProfile();
        if (profileData) {
          setProfile({
            full_name: profileData.full_name || "",
            email: profileData.email || user.email || "",
            date_of_birth: profileData.date_of_birth || "",
            time_of_birth: profileData.time_of_birth || "",
            place_of_birth: profileData.place_of_birth || "",
            city: profileData.city || "",
            country: profileData.country || "",
            latitude: profileData.latitude || 0,
            longitude: profileData.longitude || 0,
            timezone: profileData.timezone || "Asia/Kolkata",
          });
        } else {
          setProfile({ ...profile, email: user.email || "", timezone: "Asia/Kolkata" });
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    // Validate coordinates
    if (profile.place_of_birth && (!profile.latitude || !profile.longitude || profile.latitude === 0)) {
      alert("Please select a valid location from the dropdown to get coordinates");
      return;
    }

    try {
      setSaving(true);

      console.log('📝 Step 1/3: Saving profile...');
      await updateUserProfile(profile);
      console.log('✅ Profile saved');

      // If birth details are complete, auto-generate/update birth chart
      if (profile.date_of_birth && profile.time_of_birth && profile.latitude && profile.longitude) {
        console.log('📊 Step 2/3: Generating/updating birth chart...');
        try {
          const apiDetails = convertToAPIFormat({
            dateOfBirth: profile.date_of_birth,
            timeOfBirth: profile.time_of_birth,
            latitude: profile.latitude,
            longitude: profile.longitude,
            timezone: profile.timezone || 'Asia/Kolkata',
          });

          const chartData = await getCompleteBirthChart(apiDetails);
          console.log('✅ Birth chart calculated');

          console.log('💾 Step 3/3: Saving chart to database...');
          await saveBirthChart({
            name: profile.full_name || profile.email || 'User',
            date_of_birth: profile.date_of_birth,
            time_of_birth: profile.time_of_birth,
            place_of_birth: profile.place_of_birth || '',
            latitude: profile.latitude,
            longitude: profile.longitude,
            timezone: profile.timezone || 'Asia/Kolkata',
            chart_data: chartData,
          });
          console.log('✅ Birth chart saved/updated in database');
          console.log('🎉 Profile and chart synchronized!');

          alert("Profile saved and birth chart updated successfully!\n\nYour chart is now ready for:\n• AI Chat (personalized predictions)\n• Astrology (detailed analysis)\n• Numerology (automatic calculations)\n• All other features");
        } catch (chartError) {
          console.error('⚠️ Chart generation failed:', chartError);
          alert("Profile saved, but chart generation failed. You can generate it from the Astrology page.");
        }
      } else {
        alert("Profile saved successfully!\n\nAdd birth details (date, time, place) to unlock:\n• Personalized AI predictions\n• Complete birth chart\n• Numerology insights");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const handleLocationSelect = (location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
    formatted: string;
  }) => {
    setProfile({
      ...profile,
      place_of_birth: location.formatted,
      city: location.city,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
          Your Profile
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and birth details
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Information */}
        <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>Your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Birth Details */}
        <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-purple/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Birth Details</span>
            </CardTitle>
            <CardDescription>
              These details will be auto-filled when generating birth charts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  value={profile.date_of_birth}
                  onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time_of_birth">Time of Birth</Label>
                <Input
                  id="time_of_birth"
                  type="time"
                  value={profile.time_of_birth}
                  onChange={(e) => setProfile({ ...profile, time_of_birth: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">24-hour format</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="place_of_birth">
                <MapPin className="w-4 h-4 inline mr-1" />
                Place of Birth
              </Label>
              <LocationAutocomplete
                value={profile.place_of_birth}
                onSelect={handleLocationSelect}
                placeholder="Search for your birth city..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Start typing to search for your city. Coordinates will be set automatically.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={profile.timezone}
                  readOnly
                  disabled
                  className="bg-muted text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">Auto-detected from location</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={profile.latitude ? profile.latitude.toFixed(4) : ""}
                  readOnly
                  disabled
                  className="bg-muted text-muted-foreground font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={profile.longitude ? profile.longitude.toFixed(4) : ""}
                  readOnly
                  disabled
                  className="bg-muted text-muted-foreground font-mono text-sm"
                />
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Save your birth details here to avoid re-entering them every time. 
                These will automatically populate when you generate a new birth chart.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={saving} size="lg">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {profile.date_of_birth && profile.time_of_birth && profile.latitude
                  ? "Updating chart..."
                  : "Saving..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
