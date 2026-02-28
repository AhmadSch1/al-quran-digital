import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Al-Quran Online 30 Juz | Baca & Terjemahan",
    template: "%s | Al-Quran Digital",
  },
  description:
    "Baca Al-Quran online secara gratis dengan terjemahan Bahasa Indonesia. Dilengkapi juga dengan fitur Zikir, Ayat Sesuai Topik, Khatam Quran, dan Sedekah Subuh dengan user interface yang profesional, estetis, dan modern.",
  keywords: [
    "Al-Quran Online",
    "Baca Al-Quran 30 Juz",
    "Quran Digital",
    "Terjemahan Al-Quran",
    "Al-Quran Indonesia",
    "Zikir Online",
    "Khatam Quran",
  ],
  authors: [{ name: "Al-Quran Digital" }],
  openGraph: {
    title: "Al-Quran Online 30 Juz | Baca & Terjemahan",
    description:
      "Baca Al-Quran online secara gratis dengan terjemahan Bahasa Indonesia dengan user interface yang profesional dan modern.",
    type: "website",
    siteName: "Al-Quran Digital",
    locale: "id_ID",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Al-Quran Digital",
  description: "Baca dan dengarkan Al-Quran secara online dengan terjemahan Bahasa Indonesia.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${amiri.variable} font-sans antialiased bg-gray-50/50 dark:bg-background overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
