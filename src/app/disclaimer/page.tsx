import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1>Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <h2>General Disclaimer</h2>
          <p>
            The information provided by Vedic Astrology ("we," "us," or "our") on this platform is
            for general informational and entertainment purposes only. All information is provided
            in good faith, however we make no representation or warranty of any kind, express or
            implied, regarding the accuracy, adequacy, validity, reliability, availability, or
            completeness of any information on the platform.
          </p>

          <h2>Astrological Predictions</h2>
          <p>
            Vedic astrology is an ancient system of divination and guidance. While we strive to
            provide accurate calculations based on traditional principles, astrological predictions
            should not be considered as:
          </p>
          <ul>
            <li>Absolute certainties or guaranteed outcomes</li>
            <li>Professional medical, legal, or financial advice</li>
            <li>A substitute for professional consultation in any field</li>
            <li>Scientifically proven predictions of future events</li>
          </ul>

          <h2>Medical Disclaimer</h2>
          <p>
            The astrological health insights provided on our platform are not intended to diagnose,
            treat, cure, or prevent any disease or medical condition. Always consult with a
            qualified healthcare professional before making any health-related decisions.
          </p>

          <h2>Financial Disclaimer</h2>
          <p>
            Any financial or career predictions should not be considered as financial advice.
            Consult with a certified financial advisor before making investment or career decisions.
          </p>

          <h2>Relationship Guidance</h2>
          <p>
            Compatibility reports and relationship insights are meant to provide general guidance
            and should not be the sole basis for making relationship decisions. Professional
            counseling is recommended for serious relationship issues.
          </p>

          <h2>AI-Generated Content</h2>
          <p>
            Our platform uses artificial intelligence to provide personalized insights. While we
            use advanced algorithms, AI-generated content may occasionally contain errors or
            inconsistencies. Human judgment should always be applied.
          </p>

          <h2>Free Will and Personal Responsibility</h2>
          <p>
            We believe in free will and personal responsibility. Astrological insights are meant
            to guide and inform, not to dictate your choices. You are fully responsible for your
            own decisions and actions.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites. We have no control over and
            assume no responsibility for the content, privacy policies, or practices of any
            third-party sites.
          </p>

          <h2>Professional Advice</h2>
          <p>
            For professional advice on medical, legal, financial, or psychological matters, please
            consult appropriate licensed professionals. Vedic astrology should complement, not
            replace, professional guidance.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Under no circumstances shall we be liable for any loss or damage of any kind incurred
            as a result of the use of our platform or reliance on any information provided. Use
            of our platform and reliance on any information is solely at your own risk.
          </p>

          <h2>Changes to Disclaimer</h2>
          <p>
            We reserve the right to make changes to this disclaimer at any time. Please review
            this disclaimer periodically for updates.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this disclaimer, please contact us at
            legal@vedicastrology.com
          </p>

          <div className="text-center mt-12 not-prose">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
