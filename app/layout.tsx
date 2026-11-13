import type { Metadata, Viewport } from "next";
import { site } from "@/config/wedding";
import "./globals.css";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Great+Vibes&family=Noto+Serif+Telugu:wght@400;600&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  ),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    images: [{ url: "/images/couple.jpg", width: 1067, height: 1600, alt: "Koushik & Srija" }],
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#641326",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
