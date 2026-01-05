import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vedic Astrology - AI-Powered Astrological Insights",
  description: "Complete Vedic astrology, numerology, and Vastu Shastra platform with AI-powered personalized insights and recommendations.",
  keywords: ["vedic astrology", "birth chart", "kundali", "numerology", "vastu shastra", "AI astrology"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
