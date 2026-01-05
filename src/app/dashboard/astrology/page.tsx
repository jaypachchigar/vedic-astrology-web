"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Calendar, MapPin, Clock } from "lucide-react";

export default function AstrologyPage() {
  const [step, setStep] = useState<"form" | "chart">("form");
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    latitude: "",
    longitude: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("chart");
  };

  if (step === "chart") {
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

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Your Birth Chart</h1>
        <p className="text-muted-foreground mt-2">
          Enter your birth details for accurate Vedic astrology analysis
        </p>
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
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="placeOfBirth"
                  placeholder="City, Country"
                  className="pl-9"
                  value={formData.placeOfBirth}
                  onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 28.6139"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="e.g., 77.2090"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  required
                />
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
