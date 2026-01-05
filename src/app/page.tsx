import Link from "next/link";
import { ArrowRight, Sparkles, Compass, Calculator, Brain, Star, Check } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Star className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">Vedic Astrology</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">How It Works</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Vedic Wisdom</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Your Personal Guide to
            <br />
            Ancient Vedic Wisdom
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of authentic Vedic astrology, numerology, and Vastu Shastra
            enhanced with cutting-edge AI to optimize your life and living spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 inline-flex items-center justify-center space-x-2">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#features" className="border border-border px-8 py-4 rounded-lg font-medium hover:bg-accent inline-flex items-center justify-center">
              Explore Features
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free forever. No credit card required.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools combining ancient wisdom with modern technology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Vedic Astrology */}
            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
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
            </div>

            {/* Numerology */}
            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-primary" />
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
            </div>

            {/* Vastu Shastra */}
            <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Compass className="w-6 h-6 text-primary" />
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
            </div>
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground">
              Start free, upgrade when you need more
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-card p-8 rounded-xl border border-border flex flex-col h-full backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Basic birth chart</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Daily horoscope</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>1 numerology calculation</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>3 Vastu rooms</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>5 AI queries/day</span>
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center border border-border px-4 py-3 rounded-lg font-medium hover:bg-accent">
                Get Started
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="bg-card p-8 rounded-xl border-2 border-primary relative flex flex-col h-full backdrop-blur-sm shadow-lg shadow-primary/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium shadow-md">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Complete astrology features</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Unlimited numerology</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Unlimited Vastu analysis</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Unlimited AI assistant</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Compatibility reports</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Muhurat recommendations</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90">
                Start Premium
              </Link>
            </div>

            {/* Annual Tier */}
            <div className="bg-card p-8 rounded-xl border border-gold/30 flex flex-col h-full backdrop-blur-sm bg-gradient-to-br from-gold/5 to-purple-light/5">
              <h3 className="text-lg font-semibold mb-2">Annual</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$79.99</span>
                <span className="text-muted-foreground">/year</span>
                <div className="text-sm bg-gradient-to-r from-gold to-primary bg-clip-text text-transparent font-medium mt-1">Save 33%</div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Annual detailed report</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Exclusive webinars</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>Early access to features</span>
                </li>
                <li className="flex items-start text-sm">
                  <Check className="w-4 h-4 text-primary mr-2 mt-0.5" />
                  <span>VIP support</span>
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center border border-border px-4 py-3 rounded-lg font-medium hover:bg-accent">
                Get Annual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who trust our platform for authentic Vedic guidance
          </p>
          <Link href="/register" className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90">
            <span>Start Your Free Journey</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <span className="font-bold">Vedic Astrology</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Ancient wisdom meets modern technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Vedic Astrology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
