import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Vedic Astrology?",
        a: "Vedic Astrology, also known as Jyotish, is an ancient Indian system of astrology that uses the sidereal zodiac and provides detailed insights into various aspects of life including career, relationships, health, and spiritual growth."
      },
      {
        q: "How accurate are the predictions?",
        a: "Vedic Astrology has been practiced for thousands of years with remarkable accuracy. However, predictions should be used as guidance rather than absolute certainties, as free will and personal choices also play important roles."
      }
    ]
  },
  {
    category: "Account",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on 'Get Started' or 'Register' button, fill in your details including name, email, and create a password. You'll receive a confirmation email to activate your account."
      },
      {
        q: "Can I change my birth details later?",
        a: "Yes, you can update your birth details anytime from your Profile settings. Accurate birth information is crucial for precise astrological calculations."
      }
    ]
  },
  {
    category: "Features",
    questions: [
      {
        q: "What features are available on the platform?",
        a: "We offer comprehensive birth chart analysis with detailed planetary positions, Vimshottari Dasha predictions, daily personalized horoscopes, numerology calculations, Vastu analysis with real-time compass, gemstone recommendations, and AI-powered astrological guidance. Each feature provides in-depth, detailed insights based on authentic Vedic astrology principles."
      },
      {
        q: "How detailed are the birth chart analyses?",
        a: "Our birth chart analyses are extremely comprehensive, including planetary positions in signs and houses, nakshatra placements, aspects, yogas, doshas, complete Maha Dasha and Antar Dasha periods with detailed predictions, gemstone recommendations, and personalized remedies. We prioritize depth and accuracy in every reading."
      }
    ]
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Which browsers are supported?",
        a: "Our platform works best on the latest versions of Chrome, Firefox, Safari, and Edge. Mobile browsers are also fully supported."
      },
      {
        q: "Is my data secure?",
        a: "Yes, we use industry-standard encryption and security measures to protect your personal information and birth details. We never share your data with third parties."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Find answers to common questions about Vedic Astrology
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-4 text-primary">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, qIdx) => (
                    <Card key={qIdx}>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? Please contact our support team.
              </p>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-primary to-gold text-white px-6 py-2 rounded-lg font-medium">
                  Contact Support
                </button>
              </Link>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
