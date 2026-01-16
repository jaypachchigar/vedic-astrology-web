import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto prose prose-slate">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Vedic Astrology, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily use Vedic Astrology for personal, non-commercial
            use only. This is the grant of a license, not a transfer of title.
          </p>

          <h2>3. User Account</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password.
            You agree to accept responsibility for all activities that occur under your account.
          </p>

          <h2>4. Astrological Services</h2>
          <p>
            All astrological predictions, readings, and consultations are for entertainment and
            guidance purposes only. We do not guarantee the accuracy of predictions and they should
            not be used as the sole basis for making important life decisions.
          </p>

          <h2>5. Service Terms</h2>
          <p>
            Our platform provides comprehensive Vedic astrology services and features. You may manage
            your account settings at any time. Service-related concerns are addressed on a case-by-case basis.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content, features, and functionality are owned by Vedic Astrology and are protected
            by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            Vedic Astrology shall not be liable for any indirect, incidental, special, consequential
            or punitive damages resulting from your use or inability to use the service.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any
            material changes via email or through the platform.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at legal@vedicastrology.com
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
