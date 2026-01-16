/**
 * Gemstone Recommendations Component
 * Provides detailed gemstone suggestions based on planetary positions
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem, AlertCircle, CheckCircle2, Clock, Star } from "lucide-react";

interface Planet {
  name: string;
  longitude: number;
  sign?: { name: string };
  house: number;
  isRetrograde?: boolean;
  nakshatra?: { name: string };
}

interface GemstoneRecommendationsProps {
  planets: Planet[];
  ascendant?: string;
}

interface GemstoneInfo {
  name: string;
  planet: string;
  weight: string;
  metal: string;
  finger: string;
  day: string;
  benefits: string[];
  cautions: string[];
  mantras: string[];
  alternative: string;
}

const gemstoneDatabase: Record<string, GemstoneInfo> = {
  Sun: {
    name: "Ruby (Manik)",
    planet: "Sun",
    weight: "3-5 carats minimum",
    metal: "Gold or Copper",
    finger: "Ring finger (right hand)",
    day: "Sunday morning (sunrise to 2 hours after)",
    benefits: [
      "Enhances leadership abilities and confidence",
      "Strengthens vitality and physical health",
      "Improves relationship with father and authority figures",
      "Attracts recognition and fame",
      "Boosts courage and willpower",
      "Beneficial for heart health and circulation",
      "Helps in government and administrative careers"
    ],
    cautions: [
      "Avoid if Sun is exalted or very strong already (may cause ego issues)",
      "Not recommended if Sun is with Rahu/Ketu without proper consultation",
      "Can increase body heat and aggression if misused",
      "Should be tested before permanent wearing (3-7 days trial)",
      "Ensure natural, unheated ruby for maximum benefits"
    ],
    mantras: [
      "Om Suryaya Namaha (108 times before wearing)",
      "Aditya Hridayam Stotra (daily recitation)",
      "Gayatri Mantra (for solar energy)"
    ],
    alternative: "Red Garnet (for those who cannot afford Ruby)"
  },
  Moon: {
    name: "Pearl (Moti)",
    planet: "Moon",
    weight: "5-7 carats minimum",
    metal: "Silver",
    finger: "Little finger (right hand)",
    day: "Monday evening after sunset",
    benefits: [
      "Calms emotions and reduces anxiety",
      "Improves mental peace and emotional stability",
      "Enhances intuition and psychic abilities",
      "Strengthens relationship with mother",
      "Beneficial for digestive system and mind",
      "Promotes good sleep and reduces nightmares",
      "Helps in public relations and creative fields"
    ],
    cautions: [
      "Replace every 2-4 years as Pearl loses luster over time",
      "Avoid if Moon is debilitated in Scorpio without consultation",
      "May increase emotional sensitivity in some individuals",
      "Keep away from chemicals and perfumes",
      "Natural Pearl from oyster is most effective"
    ],
    mantras: [
      "Om Chandraya Namaha (108 times before wearing)",
      "Chandra Gayatri Mantra",
      "Om Som Somaya Namaha"
    ],
    alternative: "Moonstone or White Sapphire"
  },
  Mars: {
    name: "Red Coral (Moonga)",
    planet: "Mars",
    weight: "5-7 carats minimum",
    metal: "Gold, Copper, or Silver",
    finger: "Ring finger (right hand)",
    day: "Tuesday morning",
    benefits: [
      "Increases physical energy and stamina",
      "Enhances courage and confidence",
      "Protects from accidents and injuries",
      "Beneficial for blood-related issues",
      "Helps overcome debts and enemies",
      "Strengthens immune system",
      "Good for real estate and property matters"
    ],
    cautions: [
      "Avoid if Mars is very strong or causes Manglik dosha without consultation",
      "Can increase anger and aggression if misused",
      "Not recommended during pregnancy",
      "May cause accidents if Mars is severely afflicted",
      "Ensure natural, unbleached coral from sea"
    ],
    mantras: [
      "Om Mangalaya Namaha (108 times before wearing)",
      "Hanuman Chalisa (daily for Mars energy)",
      "Om Kram Kreem Krom Sah Bhaumaya Namaha"
    ],
    alternative: "Red Carnelian"
  },
  Rahu: {
    name: "Hessonite Garnet (Gomed)",
    planet: "Rahu (North Node)",
    weight: "5-8 carats minimum",
    metal: "Silver or Panchdhatu (five metals)",
    finger: "Middle finger (right hand)",
    day: "Saturday evening or during Rahu Kaal",
    benefits: [
      "Reduces confusion and mental fog",
      "Protects from enemies and negative energies",
      "Helps in foreign travel and residence",
      "Beneficial for technology and innovation careers",
      "Reduces anxiety and fears",
      "Protects from accidents and sudden events",
      "Helps overcome addictions"
    ],
    cautions: [
      "Mandatory to consult astrologer before wearing",
      "Can cause adverse effects if Rahu is beneficial in chart",
      "May initially cause discomfort or strange dreams (normal)",
      "Avoid if suffering from mental health issues without guidance",
      "Must be natural, eye-clean Hessonite"
    ],
    mantras: [
      "Om Rahave Namaha (108 times before wearing)",
      "Rahu Beej Mantra: Om Bhram Bhreem Bhroum Sah Rahave Namaha",
      "Durga Chalisa for Rahu protection"
    ],
    alternative: "Gomedh (specific type of Hessonite)"
  },
  Jupiter: {
    name: "Yellow Sapphire (Pukhraj)",
    planet: "Jupiter",
    weight: "5-7 carats minimum",
    metal: "Gold",
    finger: "Index finger (right hand)",
    day: "Thursday morning",
    benefits: [
      "Attracts wisdom and spiritual growth",
      "Brings prosperity and good fortune",
      "Excellent for education and knowledge",
      "Improves relationships and marriage prospects",
      "Beneficial for children and fertility",
      "Enhances decision-making abilities",
      "Protects from legal troubles"
    ],
    cautions: [
      "Generally safe but consult if Jupiter is debilitated",
      "May cause overconfidence or weight gain in some",
      "Ensure unheated, natural Yellow Sapphire",
      "Avoid if Jupiter causes difficulties in your chart",
      "Can increase kapha dosha (gain weight, lethargy)"
    ],
    mantras: [
      "Om Gurave Namaha (108 times before wearing)",
      "Guru Beej Mantra: Om Gram Greem Graum Sah Gurave Namaha",
      "Vishnu Sahasranama for Jupiter blessings"
    ],
    alternative: "Yellow Topaz or Citrine"
  },
  Saturn: {
    name: "Blue Sapphire (Neelam)",
    planet: "Saturn",
    weight: "5-7 carats minimum",
    metal: "Silver, Gold, or Panchdhatu",
    finger: "Middle finger (right hand)",
    day: "Saturday evening",
    benefits: [
      "Brings discipline and focus",
      "Helps overcome chronic health issues",
      "Protects from enemies and evil eye",
      "Beneficial for real estate and property",
      "Reduces suffering from Saturn's malefic effects",
      "Enhances longevity and patience",
      "Good for career stability and structure"
    ],
    cautions: [
      "MOST IMPORTANT: Must consult expert astrologer before wearing",
      "Can show immediate adverse effects if unsuitable (remove immediately)",
      "Should be tested for 3-7 days before permanent wearing",
      "Not suitable for everyone - individualized analysis essential",
      "Never wear if Saturn is functional benefic without consultation",
      "Can cause accidents, losses if incompatible"
    ],
    mantras: [
      "Om Shanaischaraya Namaha (108 times before wearing)",
      "Hanuman Chalisa (daily for Saturn protection)",
      "Shani Stotra and Saturn mantras"
    ],
    alternative: "Amethyst or Blue Tourmaline (safer alternatives)"
  },
  Mercury: {
    name: "Emerald (Panna)",
    planet: "Mercury",
    weight: "5-7 carats minimum",
    metal: "Gold or Silver",
    finger: "Little finger (right hand)",
    day: "Wednesday morning",
    benefits: [
      "Enhances intelligence and communication",
      "Improves business and commercial success",
      "Sharpens analytical and mathematical abilities",
      "Beneficial for nervous system",
      "Helps in learning and education",
      "Improves skin health",
      "Good for writing and speaking careers"
    ],
    cautions: [
      "Avoid if Mercury is combust or severely afflicted",
      "Can cause nervous anxiety if misused",
      "May increase restlessness in some individuals",
      "Ensure natural, untreated Colombian Emerald ideally",
      "Consult if Mercury rules difficult houses"
    ],
    mantras: [
      "Om Budhaya Namaha (108 times before wearing)",
      "Budh Beej Mantra: Om Bram Breem Braum Sah Budhaya Namaha",
      "Vishnu mantras for Mercury"
    ],
    alternative: "Green Tourmaline or Peridot"
  },
  Venus: {
    name: "Diamond (Heera)",
    planet: "Venus",
    weight: "1+ carat (Diamond is very powerful)",
    metal: "Silver, Platinum, or White Gold",
    finger: "Middle or Ring finger (right hand)",
    day: "Friday morning",
    benefits: [
      "Enhances charm and attractiveness",
      "Improves relationships and marriage",
      "Attracts luxury and material comforts",
      "Beneficial for artistic and creative abilities",
      "Strengthens reproductive health",
      "Brings wealth and prosperity",
      "Good for fashion and beauty industries"
    ],
    cautions: [
      "Diamond is very powerful - consult before wearing",
      "Can increase materialistic tendencies",
      "May cause problems if Venus is malefic in chart",
      "Ensure natural, conflict-free diamond",
      "Can increase sensual desires and expenditure"
    ],
    mantras: [
      "Om Shukraya Namaha (108 times before wearing)",
      "Shukra Beej Mantra: Om Dram Dreem Draum Sah Shukraya Namaha",
      "Lakshmi mantras for Venus blessings"
    ],
    alternative: "White Sapphire or Clear Quartz"
  },
  Ketu: {
    name: "Cat's Eye (Lehsunia)",
    planet: "Ketu (South Node)",
    weight: "5-7 carats minimum",
    metal: "Silver or Gold",
    finger: "Middle finger (right hand)",
    day: "Tuesday or Thursday evening",
    benefits: [
      "Enhances spiritual awareness and intuition",
      "Protects from hidden enemies",
      "Helpful in mystical and occult practices",
      "Reduces fear and anxiety",
      "Beneficial for sudden wealth",
      "Protects from accidents and evil spirits",
      "Good for meditation and moksha"
    ],
    cautions: [
      "Must consult expert astrologer before wearing",
      "Can cause confusion if unsuitable",
      "May increase detachment from worldly matters",
      "Should be natural Chrysoberyl Cat's Eye",
      "Test for 3-7 days before permanent wearing"
    ],
    mantras: [
      "Om Ketave Namaha (108 times before wearing)",
      "Ketu Beej Mantra: Om Sram Sreem Sraum Sah Ketave Namaha",
      "Ganesha mantras for Ketu"
    ],
    alternative: "Tiger's Eye or Labradorite"
  }
};

function analyzePlanetStrength(planet: Planet): "Strong" | "Weak" | "Moderate" {
  // Simplified strength analysis
  // In actual implementation, this would consider multiple factors
  if (planet.house === 1 || planet.house === 4 || planet.house === 7 || planet.house === 10) {
    return "Strong";
  } else if (planet.house === 6 || planet.house === 8 || planet.house === 12) {
    return "Weak";
  }
  return "Moderate";
}

export default function GemstoneRecommendations({ planets, ascendant }: GemstoneRecommendationsProps) {
  // Analyze which gemstones to recommend based on planetary positions
  const recommendations: Array<{ gemstone: GemstoneInfo; priority: "Primary" | "Secondary"; reason: string }> = [];

  planets.forEach((planet) => {
    const strength = analyzePlanetStrength(planet);
    const gemstone = gemstoneDatabase[planet.name];

    if (gemstone && strength === "Weak") {
      recommendations.push({
        gemstone,
        priority: "Primary",
        reason: `${planet.name} is weakly positioned in your chart (House ${planet.house}). Wearing ${gemstone.name} will strengthen this planet's positive influence.`
      });
    } else if (gemstone && strength === "Moderate") {
      recommendations.push({
        gemstone,
        priority: "Secondary",
        reason: `${planet.name} has moderate strength in House ${planet.house}. ${gemstone.name} can enhance its beneficial effects.`
      });
    }
  });

  // Sort by priority
  recommendations.sort((a, b) => (a.priority === "Primary" ? -1 : 1));

  return (
    <div className="space-y-4">
      {/* Introduction Card */}
      <Card className="border-purple/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gem className="w-5 h-5 text-purple" />
            <span>Personalized Gemstone Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on your birth chart analysis, the following gemstones are recommended to strengthen weak planets
              and enhance their positive influences in your life. Each gemstone is carefully selected based on your
              planetary positions, houses, and overall chart balance.
            </p>
            <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Important Guidelines:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Always consult a qualified Vedic astrologer before wearing any gemstone</li>
                  <li>Ensure gemstones are natural, unheated, and properly energized</li>
                  <li>Wear gemstones on prescribed days and times for maximum benefit</li>
                  <li>Blue Sapphire and Cat's Eye require special caution and expert consultation</li>
                  <li>Remove gemstone immediately if you experience negative effects</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gemstone Recommendations */}
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <Card key={idx} className={rec.priority === "Primary" ? "border-primary/40" : "border-border"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Gem className={rec.priority === "Primary" ? "w-5 h-5 text-primary" : "w-5 h-5 text-muted-foreground"} />
                    <span>{rec.gemstone.name}</span>
                  </CardTitle>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    rec.priority === "Primary"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {rec.priority} Recommendation
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{rec.reason}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Specifications */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Minimum Weight</p>
                    <p className="text-sm font-semibold">{rec.gemstone.weight}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Metal Setting</p>
                    <p className="text-sm font-semibold">{rec.gemstone.metal}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Finger to Wear</p>
                    <p className="text-sm font-semibold">{rec.gemstone.finger}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Best Day/Time</p>
                    <p className="text-sm font-semibold">{rec.gemstone.day}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Ruling Planet</p>
                    <p className="text-sm font-semibold">{rec.gemstone.planet}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Alternative Stone</p>
                    <p className="text-sm font-semibold">{rec.gemstone.alternative}</p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <h4 className="font-semibold text-sm">Benefits & Positive Effects</h4>
                  </div>
                  <ul className="space-y-2">
                    {rec.gemstone.benefits.map((benefit, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start space-x-2">
                        <Star className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cautions */}
                <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <h4 className="font-semibold text-sm">Cautions & Precautions</h4>
                  </div>
                  <ul className="space-y-2">
                    {rec.gemstone.cautions.map((caution, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start space-x-2">
                        <AlertCircle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{caution}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mantras */}
                <div className="p-4 bg-purple/5 rounded-lg border border-purple/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-4 h-4 text-purple" />
                    <h4 className="font-semibold text-sm">Energization Mantras</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      Chant these mantras before wearing and daily for maximum benefit:
                    </p>
                    {rec.gemstone.mantras.map((mantra, i) => (
                      <div key={i} className="p-2 bg-background rounded text-xs font-mono">
                        {mantra}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Wearing Instructions */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-sm mb-3">How to Wear This Gemstone</h4>
                  <ol className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary">1.</span>
                      <span>Purchase natural, certified gemstone from reputable dealer. Ensure proper weight ({rec.gemstone.weight}).</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary">2.</span>
                      <span>Get gemstone set in {rec.gemstone.metal} ring or pendant by skilled jeweler.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary">3.</span>
                      <span>On {rec.gemstone.day}, wash gemstone with raw milk and Ganga water (or pure water).</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary">4.</span>
                      <span>Offer incense and flowers to the gemstone while chanting mantras 108 times.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary">5.</span>
                      <span>Wear on {rec.gemstone.finger} while continuing to chant the main mantra.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-semibold text-primary">6.</span>
                      <span>Continue chanting the mantra daily for 40 days after wearing for full energization.</span>
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <Gem className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">
              Your planets are generally well-placed. Specific gemstone recommendations require detailed personal consultation.
            </p>
          </CardContent>
        </Card>
      )}

      {/* General Information */}
      <Card className="border-gold/20">
        <CardHeader>
          <CardTitle className="text-base">General Gemstone Wearing Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-muted-foreground">
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Quality Matters:</p>
            <p>Always choose natural, unheated, and eye-clean gemstones. Treated or synthetic stones have little to no astrological effect. Certification from reputable gemological laboratories is recommended.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Weight and Touch:</p>
            <p>The gemstone should touch your skin for maximum effect. Minimum weight requirements are essential - smaller stones may not provide sufficient planetary energy.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Maintenance:</p>
            <p>Clean gemstones regularly with soft cloth and mild soap water. Recharge monthly by keeping under moonlight overnight or sunlight for solar gemstones. Avoid chemicals and harsh cleaning agents.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">When to Remove:</p>
            <p>If you experience persistent negative effects, headaches, or unusual problems after wearing, remove the gemstone immediately and consult your astrologer. Not all gemstones suit everyone.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
