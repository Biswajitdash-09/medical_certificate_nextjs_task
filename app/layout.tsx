import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted by next/font, so no render-blocking font request to a third party
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
