"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Home, User, Calculator, Compass, MessageSquare, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Birth Chart", href: "/dashboard/astrology", icon: Star },
  { name: "Numerology", href: "/dashboard/numerology", icon: Calculator },
  { name: "Vastu", href: "/dashboard/vastu", icon: Compass },
  { name: "AI Assistant", href: "/dashboard/ai", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">Vedic Astrology</span>
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/dashboard/profile" className="text-sm text-muted-foreground hover:text-foreground">
              Profile
            </Link>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 py-6">
        {/* Sidebar */}
        <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r border-border md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Subscription Info */}
            <div className="mt-8 rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium mb-2">Free Plan</p>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to unlock all features
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 w-full"
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background md:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 rounded-lg p-2 text-xs transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
