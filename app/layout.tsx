import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Geist for every role (calm clinical direction), self-hosted by next/font so no third-party font request
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geist.variable} antialiased`}>
      {/* Cookie-free Vercel Analytics, only on Vercel where its script exists (it 404s anywhere else) */}
      <body className="font-sans">{children}{process.env.VERCEL && <Analytics />}</body>
    </html>
  );
}
