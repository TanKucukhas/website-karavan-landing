import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

    export const metadata: Metadata = {
      title: "Karavan B2B Marketplace | Secure Trade with Escrow, Logistics & Finance",
      description: "Karavan is a B2B marketplace for the Turkic States. Connect sellers and buyers with secure payments, integrated logistics, customs, insurance, and trade finance.",
      keywords: "B2B marketplace Turkey, Uzbekistan, Central Asia, secure B2B platform, wholesale trade with escrow, logistics and customs for exporters/importers",
      authors: [{ name: "Karavan Team" }],
      openGraph: {
        title: "Karavan B2B Marketplace | Secure Trade with Escrow, Logistics & Finance",
        description: "Karavan is a B2B marketplace for the Turkic States. Secure payments, logistics, customs, insurance, and finance.",
        type: "website",
        locale: "en_US",
        url: "https://karavan.net",
        siteName: "Karavan",
      },
      twitter: {
        card: "summary_large_image",
        title: "Karavan B2B Marketplace | Secure Trade with Escrow, Logistics & Finance",
        description: "Secure B2B trade with escrow, logistics, customs, insurance and finance.",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-brand-bg text-brand-ink px-3 py-2 rounded">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
