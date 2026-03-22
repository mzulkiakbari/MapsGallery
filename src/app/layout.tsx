import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GalleryProvider } from "@/context/GalleryContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MapsGallery",
  description: "Optimized Image Gallery with Google Maps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <GalleryProvider>
          {children}
          <SpeedInsights />
        </GalleryProvider>
      </body>
    </html>
  );
}
