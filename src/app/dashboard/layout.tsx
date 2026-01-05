"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Home, User, Calculator, Compass, MessageSquare, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/90">
        <div className="container flex h-16 items-center px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Vedic Astrology</span>
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
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-accent rounded-lg w-full text-left text-destructive">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 py-6">
        {/* Sidebar */}
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto md:sticky md:block">
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

            {/* Subscription Info */}
            <div className="mt-8 rounded-lg border border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 p-4 backdrop-blur-sm">
              <p className="text-sm font-medium mb-2 text-gold-foreground">Free Plan</p>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to unlock all features
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-gold to-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:shadow-lg hover:shadow-gold/20 transition-all w-full"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border backdrop-blur-md bg-background/90 md:hidden shadow-lg">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 rounded-lg p-2 transition-all",
                  isActive
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
