"use client";

import { useEffect, useState } from "react";
import { X, Mail, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function EmailVerificationBanner() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  async function checkVerificationStatus() {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setShow(false);
        return;
      }

      // Check if email is already verified
      if (user.email_confirmed_at) {
        setShow(false);
        return;
      }

      // Check if user dismissed the banner
      const dismissed = localStorage.getItem('email_verification_banner_dismissed');
      if (dismissed === 'true') {
        setShow(false);
        return;
      }

      // Check if more than 7 days have passed since registration
      const createdAt = new Date(user.created_at);
      const now = new Date();
      const daysSinceRegistration = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceRegistration > 7) {
        setShow(false);
        return;
      }

      // Show banner
      setEmail(user.email || "");
      setShow(true);
    } catch (error) {
      console.error("Error checking verification status:", error);
      setShow(false);
    }
  }

  async function handleResendEmail() {
    try {
      setResending(true);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        alert("Failed to resend email. Please try again.");
        console.error("Resend error:", error);
      } else {
        setResent(true);
        setTimeout(() => setResent(false), 5000); // Reset after 5 seconds
      }
    } catch (error) {
      console.error("Error resending email:", error);
      alert("Failed to resend email. Please try again.");
    } finally {
      setResending(false);
    }
  }

  function handleDismiss() {
    localStorage.setItem('email_verification_banner_dismissed', 'true');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="sticky top-16 z-40 w-full border-b border-primary/30 bg-gradient-to-r from-primary/90 to-purple/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">
                Please verify your email address
              </p>
              <p className="text-xs text-white/80 truncate">
                We sent a confirmation link to <strong>{email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleResendEmail}
              disabled={resending || resent}
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
            >
              {resending ? (
                <>
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  Sending...
                </>
              ) : resent ? (
                <>Email sent!</>
              ) : (
                <>Resend Email</>
              )}
            </Button>

            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
