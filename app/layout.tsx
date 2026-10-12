import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/business";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Free Live Walmart Selling Webinar`,
  description:
    "A free live webinar on building a profitable Walmart Marketplace business: getting approved, sourcing winning products, and scaling past your first $10k month.",
  openGraph: {
    title: `${BRAND.name} — Free Live Walmart Selling Webinar`,
    description:
      "Learn how to get approved, find winning products, and scale a profitable Walmart Marketplace store. Free live webinar.",
    siteName: BRAND.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
