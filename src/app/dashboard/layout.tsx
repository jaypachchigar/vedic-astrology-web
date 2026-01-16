"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Star, Home, User, Calculator, Compass, MessageSquare, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { VedicLogo } from "@/components/brand/VedicLogo";
import { EmailVerificationBanner } from "@/components/EmailVerificationBanner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Birth Chart", href: "/dashboard/astrology", icon: Star },
  { name: "Numerology", href: "/dashboard/numerology", icon: Calculator },
  { name: "Vastu", href: "/dashboard/vastu", icon: Compass },
  { name: "AI Assistant", href: "/dashboard/ai", icon: MessageSquare },
];

const userMenuItems = [
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-purple/5">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 backdrop-blur-md bg-background/90">
        <div className="max-w-7xl mx-auto flex h-16 items-center px-3 md:px-4">
          <Link href="/dashboard" className="flex items-center space-x-2 md:space-x-3">
            <VedicLogo size="md" animated />
            <span className="hidden sm:inline text-base md:text-xl font-bold bg-gradient-to-r from-primary via-gold to-purple-light bg-clip-text text-transparent">
              Vedic Astrology
            </span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 rounded-full bg-primary/10 p-2 hover:bg-primary/20 transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-lg"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-lg w-full text-left text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Email Verification Banner */}
      <EmailVerificationBanner />

      <div className="max-w-7xl mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 py-6">
        {/* Sidebar */}
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-[220px] lg:w-[240px] shrink-0 overflow-y-auto md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", isActive && "animate-pulse")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Platform Info */}
            <div className="mt-8 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 via-purple/5 to-gold/5 p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-gold" />
                <p className="text-sm font-semibold bg-gradient-to-r from-primary via-purple to-gold bg-clip-text text-transparent">
                  Authentic Vedic Astrology
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Precise calculations powered by astronomy-engine
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border backdrop-blur-md bg-background/95 md:hidden shadow-lg safe-area-bottom">
        <div className="grid grid-cols-5 gap-0 px-0.5 py-1.5 pb-safe">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            // Get mobile-friendly label
            const getMobileLabel = (name: string) => {
              if (name === "Birth Chart") return "Birth\nChart";
              if (name === "AI Assistant") return "AI\nChat";
              return name;
            };

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-lg p-1.5 transition-all min-h-[56px]",
                  isActive
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md"
                    : "text-muted-foreground active:bg-accent"
                )}
              >
                <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0", isActive && "animate-pulse")} />
                <span className="text-[9px] font-medium leading-[1.1] text-center whitespace-pre-line">
                  {getMobileLabel(item.name)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
