import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Inter } from "next/font/google";
import { Toaster } from "sonner";
import AppThemeProvider from "@/components/providers/app-theme-provider";
import LightRays from '@/components/LightRays';
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable:"--font-inter",
  weight: ["400","500","600","700","800","900"]
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "Never miss an event!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${schibstedGrotesk.variable} ${martianMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysOrigin="top-center-offset"
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0}
            distortion={0.01}
            className="custom-rays pointer-events-none"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <AppThemeProvider>
          <main 
            className="container mx-auto flex-1 min-w-0 w-full flex flex-col sm:px-10 px-5 py-10"
          >
            {children}
          </main>
        </AppThemeProvider>
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
