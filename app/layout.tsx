import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Grain } from "@/components/layout/Grain";
import { Chrome } from "@/components/layout/Chrome";
import { BackgroundFX } from "@/components/layout/BackgroundFX";
import { profile } from "@/content/profile";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${GeistMono.variable} dark`}
    >
      <body>
        <SmoothScrollProvider>
          <BackgroundFX />
          <Grain />
          <CustomCursor />
          <Chrome />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
