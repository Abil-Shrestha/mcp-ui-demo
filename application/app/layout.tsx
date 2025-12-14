import React from "react";
import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { baseURL } from "@/lib/base-url";

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: "xmcp Retro Arcade | Classic Games Collection",
    template: "%s | xmcp Retro Arcade",
  },
  description:
    "Step into the Retro Arcade! Experience classic DOS games like DOOM and Digger with authentic pixel art styling and vintage arcade vibes. Insert coin to play!",
  keywords: [
    "retro arcade",
    "classic games",
    "DOS games",
    "DOOM",
    "Digger",
    "vintage gaming",
    "pixel art",
    "retro gaming",
    "arcade games",
    "browser games",
  ],
  authors: [{ name: "xmcp" }],
  creator: "xmcp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseURL,
    title: "xmcp Retro Arcade | Classic Games Collection",
    description:
      "Experience classic DOS games like DOOM and Digger with authentic pixel art styling and vintage arcade vibes.",
    siteName: "xmcp Retro Arcade",
    images: [
      {
        url: "/doom.jpg",
        width: 1200,
        height: 630,
        alt: "Retro Arcade - Classic Gaming Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "xmcp Retro Arcade | Classic Games Collection",
    description:
      "Experience classic DOS games like DOOM and Digger with authentic pixel art styling and vintage arcade vibes.",
    creator: "@xmcp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#00ff00" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* We use the base href to set the base URL for the application for the assets to be resolved correctly */}
      <head>
        <base href={baseURL} />
      </head>
      <body
        className={`${pixelifySans.variable} antialiased bg-black text-white w-full h-screen max-h-dv`}
      >
        {children}
      </body>
    </html>
  );
}
