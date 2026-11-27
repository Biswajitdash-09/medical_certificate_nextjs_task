import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Self-hosted by next/font, so no render-blocking font request to a third party
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      {/* Cookie-free Vercel Analytics: page views plus the apply_click events from CtaTracking */}
      <body className="font-sans">{children}<Analytics /></body>
    </html>
  );
}
