import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Sparkles, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Vedic Astrology</h1>
            <p className="text-lg text-muted-foreground">
              Bringing ancient wisdom to the modern world through technology
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  We believe that ancient Vedic wisdom combined with modern AI technology can provide profound insights
                  and guidance for navigating life's journey. Our platform makes authentic Vedic astrology accessible
                  to everyone, anywhere in the world.
                </p>
                <p className="text-muted-foreground">
                  Founded by practitioners and technologists passionate about both Eastern philosophy and cutting-edge
                  technology, we've created a platform that honors traditional astrological practices while leveraging
                  the power of artificial intelligence to deliver personalized, accurate insights.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Star className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Authentic Vedic Practices</h3>
                    <p className="text-muted-foreground text-sm">
                      Our calculations and interpretations are based on traditional Vedic astrology principles,
                      ensuring authentic and accurate readings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Sparkles className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">AI-Powered Insights</h3>
                    <p className="text-muted-foreground text-sm">
                      Advanced AI technology analyzes your birth chart and planetary positions to provide
                      personalized guidance and predictions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Expert Team</h3>
                    <p className="text-muted-foreground text-sm">
                      Our team includes experienced Vedic astrologers, numerologists, and Vastu consultants
                      who ensure the accuracy and quality of our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">User-Centric Design</h3>
                    <p className="text-muted-foreground text-sm">
                      We've designed our platform to be intuitive and easy to use, making complex
                      astrological concepts accessible to everyone.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-gold/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
              <p className="text-muted-foreground mb-6">
                Over 10,000 seekers have already discovered the power of Vedic wisdom.
                Start your journey today.
              </p>
              <Link href="/register">
                <button className="bg-gradient-to-r from-primary to-gold text-white px-8 py-3 rounded-lg font-medium">
                  Get Started
                </button>
              </Link>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
