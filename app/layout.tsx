import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/business";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Free Live Walmart Selling Webinar`,
  description:
    "Learn the foundations of selling on Walmart Marketplace with Jacob Jones in a free live webinar on October 30, 2026 at 8:30 PM EST.",
  openGraph: {
    title: `${BRAND.name} — Free Live Walmart Selling Webinar`,
    description:
      "A free live session to help you understand Walmart Marketplace and where to begin.",
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
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
