import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Refined display serif — gravitas + warmth for the headings.
const frauncesDisplay = Fraunces({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "HUMIA — Indonesian Muslim Society in Auckland",
  description:
    "Himpunan Ummat Muslim Indonesia di Auckland (HUMIA) has connected the Indonesian Muslim community in Auckland since 2005 — through lectures, Quran classes, and community life grounded in the Quran and Sunnah.",
  openGraph: {
    title: "HUMIA — Indonesian Muslim Society in Auckland",
    description:
      "Connecting the Indonesian Muslim community in Auckland since 2005 — lectures, Quran classes, and community life.",
    type: "website",
    locale: "en_NZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${frauncesDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-body">
        {children}
      </body>
    </html>
  );
}
