"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Calendar, Hash, Star, Loader2 } from "lucide-react";
import { calculateAllNumbers } from "@/lib/calculations/numerology";
import { getUserProfile } from "@/lib/supabase/birth-charts";

// Simple numerology calculation functions
const calculateLifePathNumber = (dateOfBirth: string): number => {
  const digits = dateOfBirth.replace(/-/g, "").split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
};

const calculateDestinyNumber = (fullName: string): number => {
  const values: { [key: string]: number } = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  const name = fullName.toLowerCase().replace(/[^a-z]/g, "");
  let sum = name.split("").reduce((acc, char) => acc + (values[char] || 0), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
};

const getNumberMeaning = (type: string, number: number) => {
  const meanings: { [key: string]: { [key: number]: { title: string; description: string } } } = {
    lifePath: {
      1: { title: "The Leader", description: "Independent, ambitious, and pioneering. You're meant to lead and inspire others with your innovative ideas." },
      2: { title: "The Peacemaker", description: "Diplomatic, sensitive, and cooperative. Your path involves creating harmony and building partnerships." },
      3: { title: "The Creative", description: "Expressive, optimistic, and artistic. You're here to inspire others through creativity and communication." },
      4: { title: "The Builder", description: "Practical, disciplined, and hardworking. Your purpose is to create lasting foundations and systems." },
      5: { title: "The Freedom Seeker", description: "Adventurous, versatile, and dynamic. Your path involves exploration and embracing change." },
      6: { title: "The Nurturer", description: "Responsible, caring, and protective. You're meant to serve and create harmony in your community." },
      7: { title: "The Seeker", description: "Analytical, spiritual, and introspective. Your journey is about seeking truth and wisdom." },
      8: { title: "The Powerhouse", description: "Ambitious, authoritative, and material-minded. Your path leads to material success and power." },
      9: { title: "The Humanitarian", description: "Compassionate, idealistic, and selfless. You're here to serve humanity and make a difference." },
      11: { title: "The Master Intuitive", description: "Highly spiritual, intuitive, and inspirational. You're meant to illuminate and inspire others." },
      22: { title: "The Master Builder", description: "Visionary with practical abilities. You're here to build something of lasting value for humanity." },
    },
    destiny: {
      1: { title: "Destined to Lead", description: "Your destiny is to pioneer new paths and inspire others through your leadership." },
      2: { title: "Destined to Unite", description: "Your purpose is to bring people together and create harmony through diplomacy." },
      3: { title: "Destined to Create", description: "You're meant to express yourself creatively and bring joy to others." },
      4: { title: "Destined to Build", description: "Your calling is to create structure and stability in the world." },
      5: { title: "Destined to Explore", description: "Your mission is to embrace freedom and inspire others to do the same." },
      6: { title: "Destined to Nurture", description: "You're meant to care for others and create beautiful, harmonious environments." },
      7: { title: "Destined to Discover", description: "Your purpose is to seek wisdom and share spiritual insights." },
      8: { title: "Destined for Success", description: "You're meant to achieve material success and use it wisely." },
      9: { title: "Destined to Serve", description: "Your calling is to serve humanity with compassion and wisdom." },
      11: { title: "Destined to Inspire", description: "You're meant to be a spiritual beacon for others." },
      22: { title: "Destined to Transform", description: "Your purpose is to turn dreams into reality on a grand scale." },
    },
  };
  return meanings[type][number] || { title: "Unknown", description: "No description available" };
};

export default function NumerologyPage() {
  const [loading, setLoading] = useState(true);
  const [hasProfileData, setHasProfileData] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
  });
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState({
    lifePathNumber: 0,
    destinyNumber: 0,
    soulUrgeNumber: 0,
    personalityNumber: 0,
  });

  // Load profile data on mount
  useEffect(() => {
    async function loadProfileData() {
      try {
        setLoading(true);
        const profile = await getUserProfile();

        if (profile && profile.full_name && profile.date_of_birth) {
          setFormData({
            fullName: profile.full_name,
            dateOfBirth: profile.date_of_birth,
          });
          setHasProfileData(true);

          // Auto-calculate with profile data
          const allNumbers = calculateAllNumbers(profile.full_name, profile.date_of_birth);
          setResults({
            lifePathNumber: allNumbers.lifePath,
            destinyNumber: allNumbers.expression,
            soulUrgeNumber: allNumbers.soulUrge,
            personalityNumber: allNumbers.personality,
          });
          setCalculated(true);
        } else {
          setHasProfileData(false);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setHasProfileData(false);
      } finally {
        setLoading(false);
      }
    }
    loadProfileData();
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Use proper calculations from numerology library
    const calculated = calculateAllNumbers(formData.fullName, formData.dateOfBirth);

    setResults({
      lifePathNumber: calculated.lifePath,
      destinyNumber: calculated.expression,
      soulUrgeNumber: calculated.soulUrge,
      personalityNumber: calculated.personality,
    });
    setCalculated(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your numerology profile...</p>
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple to-gold mx-auto mb-4 flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Complete Your Profile for Numerology</CardTitle>
            <CardDescription className="text-base mt-2">
              Add your name and birth date to your profile to automatically calculate your numerology numbers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <p className="text-sm font-medium">What you'll get:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Life Path Number - Your life's purpose and journey</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Destiny Number - Your soul's mission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Soul Urge Number - Your inner desires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Personality Number - How others see you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>All calculations updated automatically when you change your profile</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-purple to-gold"
                size="lg"
                onClick={() => window.location.href = '/dashboard/profile'}
              >
                Complete Profile
                <Calculator className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Only your name and birth date are needed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (calculated) {
    const lifePathMeaning = getNumberMeaning("lifePath", results.lifePathNumber);
    const destinyMeaning = getNumberMeaning("destiny", results.destinyNumber);

    return (
      <div className="space-y-6 pb-20 md:pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
              Your Numerology Profile
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete analysis for {formData.fullName}
            </p>
          </div>
          <Button variant="outline" onClick={() => setCalculated(false)}>
            Recalculate
          </Button>
        </div>

        {/* Core Numbers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader>
              <CardDescription>Life Path Number</CardDescription>
              <div className="text-5xl font-bold text-primary">{results.lifePathNumber}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{lifePathMeaning.title}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-purple/5">
            <CardHeader>
              <CardDescription>Destiny Number</CardDescription>
              <div className="text-5xl font-bold text-primary">{results.destinyNumber}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">{destinyMeaning.title}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-gold/5">
            <CardHeader>
              <CardDescription>Soul Urge Number</CardDescription>
              <div className="text-5xl font-bold text-primary">{results.soulUrgeNumber}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Inner Desires</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
            <CardHeader>
              <CardDescription>Personality Number</CardDescription>
              <div className="text-5xl font-bold text-primary">{results.personalityNumber}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium">Outer Self</p>
            </CardContent>
          </Card>
        </div>

        {/* Life Path Analysis */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Life Path Number {results.lifePathNumber}: {lifePathMeaning.title}</CardTitle>
            <CardDescription>Your life's purpose and journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {lifePathMeaning.description}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-semibold text-sm mb-2">Strengths</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Natural leadership abilities</li>
                  <li>Strong determination</li>
                  <li>Innovation and creativity</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-semibold text-sm mb-2">Challenges</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>May be too independent</li>
                  <li>Can be stubborn</li>
                  <li>Impatience with others</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-semibold text-sm mb-2">Career Paths</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Entrepreneurship</li>
                  <li>Management</li>
                  <li>Innovation fields</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Destiny Number Analysis */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Destiny Number {results.destinyNumber}: {destinyMeaning.title}</CardTitle>
            <CardDescription>Your life's mission and what you're meant to achieve</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {destinyMeaning.description}
            </p>
          </CardContent>
        </Card>

        {/* Lucky Elements */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Lucky Elements</CardTitle>
              <CardDescription>Numbers, colors, and dates aligned with your energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Lucky Numbers</p>
                <div className="flex gap-2">
                  {[results.lifePathNumber, results.destinyNumber, results.lifePathNumber * 2].map((num) => (
                    <div key={num} className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Lucky Colors</p>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-500"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-500"></div>
                  <div className="w-10 h-10 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Lucky Days</p>
                <p className="text-sm text-muted-foreground">
                  Sunday, Tuesday, Thursday
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Compatibility</CardTitle>
              <CardDescription>Most compatible life path numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { number: 3, compatibility: "Excellent", description: "Natural creative synergy" },
                  { number: 5, compatibility: "Very Good", description: "Shared love of adventure" },
                  { number: 7, compatibility: "Good", description: "Balanced perspectives" },
                ].map((match) => (
                  <div key={match.number} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                        {match.number}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{match.compatibility}</p>
                        <p className="text-xs text-muted-foreground">{match.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Year Number */}
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle>Your Personal Year Number</CardTitle>
            <CardDescription>The energy theme for 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center font-bold text-2xl text-primary flex-shrink-0">
                {Math.floor(Math.random() * 9) + 1}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Year of New Beginnings</h4>
                <p className="text-sm text-muted-foreground">
                  2026 is a year of fresh starts and new opportunities. This is the perfect time to
                  initiate new projects, start new relationships, or make significant life changes.
                  Your personal energy is aligned with manifestation and creation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
          Numerology Calculator
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover your life path, destiny, and personality numbers
        </p>
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader>
          <CardTitle>Calculate Your Numbers</CardTitle>
          <CardDescription>Enter your details for a complete numerology reading</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name (as on birth certificate)</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder="John Michael Doe"
                  className="pl-9"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Use your complete birth name for most accurate results
              </p>
            </div>

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

            <Button type="submit" className="w-full" size="lg">
              Calculate My Numbers
              <Calculator className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">What is Numerology?</h3>
            <p className="text-sm text-muted-foreground">
              Numerology is the ancient study of numbers and their mystical significance in our lives.
              It reveals insights about your personality, life path, and destiny through the vibrations
              of numbers.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Core Numbers</h3>
            <p className="text-sm text-muted-foreground">
              We'll calculate your Life Path, Destiny, Soul Urge, and Personality numbers - the four
              core numbers that define your numerological profile and life journey.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
