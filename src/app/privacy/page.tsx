import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name, email address, and contact information</li>
            <li>Birth date, time, and place for astrological calculations</li>
            <li>Payment information for premium subscriptions</li>
            <li>Usage data and interaction with our platform</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide accurate astrological calculations and predictions</li>
            <li>Personalize your experience on our platform</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
            <li>Improve our services and develop new features</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            information with:
          </p>
          <ul>
            <li>Service providers who assist in operating our platform</li>
            <li>Law enforcement when required by law</li>
            <li>Professional advisors under confidentiality agreements</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>5. Your Birth Data</h2>
          <p>
            Your birth details are considered highly sensitive. We encrypt this information and use
            it solely for astrological calculations. You can request deletion of your birth data at
            any time.
          </p>

          <h2>6. Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to improve your experience, analyze
            usage patterns, and deliver personalized content.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data in a portable format</li>
          </ul>

          <h2>8. Children's Privacy</h2>
          <p>
            Our service is not intended for individuals under 18. We do not knowingly collect
            personal information from children.
          </p>

          <h2>9. Changes to Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of significant
            changes via email or platform notification.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at
            privacy@vedicastrology.com
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
