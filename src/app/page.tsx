import Link from "next/link";
import { ArrowRight, Sparkles, Compass, Calculator, Brain, Check } from "lucide-react";
import { VedicLogo } from "@/components/brand/VedicLogo";
import { GlassCard } from "@/components/ui/glass-card";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-lg border-b border-border/50 z-50 shadow-sm">
        <div className="container mx-auto px-3 md:px-4 lg:px-8 py-2.5 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <VedicLogo size="sm" animated />
              <span className="text-base md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary via-gold to-purple-light bg-clip-text text-transparent">
                Vedic Astrology
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-base text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/login"
                className="px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 md:px-6 py-1.5 md:py-2.5 text-sm md:text-base font-medium bg-gradient-to-r from-primary to-gold text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-36 pb-16 md:pb-24 px-4 lg:px-8">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-gold/10 text-primary px-5 py-2.5 rounded-full mb-8 border border-primary/20">
            <Sparkles className="w-5 h-5" />
            <span className="text-base font-semibold">AI-Powered Vedic Wisdom</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent leading-tight">
            Your Personal Guide to
            <br />
            Ancient Vedic Wisdom
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience the power of authentic Vedic astrology, numerology, and Vastu Shastra
            enhanced with cutting-edge AI to optimize your life and living spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-8">
            <Link href="/register" className="w-full sm:w-auto bg-gradient-to-r from-primary to-gold text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center space-x-2 shadow-lg shadow-primary/30">
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link href="#features" className="w-full sm:w-auto border-2 border-border px-10 py-4 rounded-xl text-lg font-semibold hover:bg-accent transition-colors inline-flex items-center justify-center">
              Explore Features
            </Link>
          </div>
          <p className="text-base lg:text-lg text-muted-foreground font-medium">
            Start your journey today. No credit card required.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 bg-muted/30 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools combining ancient wisdom with modern technology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Vedic Astrology */}
            <GlassCard variant="primary" animated className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-gold/50 rounded-lg flex items-center justify-center mb-4">
                <VedicLogo size="sm" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vedic Astrology</h3>
              <p className="text-muted-foreground mb-4">
                Complete birth chart analysis with planetary positions, dashas, and personalized predictions
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Accurate Kundali generation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Daily, weekly, monthly predictions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Compatibility matching</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Gemstone & remedy suggestions</span>
                </li>
              </ul>
            </GlassCard>

            {/* Numerology */}
            <GlassCard variant="gold" animated className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-purple-light/50 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-gold-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Numerology</h3>
              <p className="text-muted-foreground mb-4">
                Discover your life path, destiny, and personality numbers with detailed interpretations
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Life path number analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Name vibration analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Lucky numbers & dates</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Business name suggestions</span>
                </li>
              </ul>
            </GlassCard>

            {/* Vastu Shastra */}
            <GlassCard variant="purple" animated className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-dark to-primary/50 rounded-lg flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-purple-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Vastu Compass</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered real-time directional analysis with personalized placement recommendations
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Live compass detection</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Direction-specific suggestions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Dosha identification & remedies</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Color & element guidance</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* AI Assistant Feature */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Personal Vedic AI Assistant
              </h2>
              <p className="text-muted-foreground mb-6">
                Ask anything about your birth chart, get personalized daily insights,
                and receive intelligent recommendations tailored to your unique astrological profile.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <span>Context-aware responses based on your chart</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <span>Auspicious timing (Muhurat) suggestions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <span>Proactive transit alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-primary mr-3 mt-0.5" />
                  <span>Natural language queries</span>
                </li>
              </ul>
              <Link href="/register" className="inline-flex items-center space-x-2 text-primary font-medium hover:underline">
                <span>Try AI Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border border-primary/20">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">You asked:</p>
                  <p className="font-medium">"What should I focus on this month?"</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">AI Assistant:</p>
                  <p className="text-sm">
                    Based on your current Jupiter transit through your 10th house,
                    this is an excellent time to focus on career advancement. Your
                    Moon dasha suggests emotional clarity. I recommend scheduling
                    important meetings between Nov 15-18 during favorable Muhurats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 lg:py-32 px-4 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Simple Steps to Get Started
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Begin your journey to self-discovery in just a few minutes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-gold rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4">Create Your Account</h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Sign up in seconds and begin your astrological journey.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gold to-purple-light rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4">Enter Your Details</h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Provide your birth information for accurate readings.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-dark to-primary rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-purple-foreground">3</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4">Get Insights</h3>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Receive personalized guidance and predictions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-4 lg:px-8 bg-gradient-to-br from-primary/5 via-gold/5 to-purple-light/5">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who trust our platform for authentic Vedic guidance
          </p>
          <Link href="/register" className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-gold text-primary-foreground px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">
            <span>Start Your Journey</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <VedicLogo size="sm" />
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                  Vedic Astrology
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Ancient wisdom meets modern technology
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li><a href="/about" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-base text-muted-foreground">
              &copy; {new Date().getFullYear()} Vedic Astrology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
