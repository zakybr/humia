import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HUMIA | Indonesian Muslim Society in Auckland",
  description:
    "Himpunan Ummat Muslim Indonesia di Auckland (HUMIA) has connected the Indonesian Muslim community in Auckland since 2005 through lectures, Quran classes and community life.",
  openGraph: {
    title: "HUMIA | Indonesian Muslim Society in Auckland",
    description:
      "Connecting the Indonesian Muslim community in Auckland since 2005. Lectures, Quran classes and community life.",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-body">
        {children}
      </body>
    </html>
  );
}
