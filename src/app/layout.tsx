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
  title: "Humia — A church for the city",
  description:
    "Humia is a community church gathering weekly in the heart of the city. Come as you are — find belonging, hope, and a place to grow.",
  openGraph: {
    title: "Humia — A church for the city",
    description:
      "A community church gathering weekly in the heart of the city. Come as you are.",
    type: "website",
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
