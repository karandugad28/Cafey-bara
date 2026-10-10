import type { Metadata } from "next";
import { Playfair_Display, Mouse_Memoirs, Anton, Oswald } from "next/font/google";
import "./globals.css";
import "./custom.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import { AnimationProvider } from "@/context/AnimationContext";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ['normal', 'italic'] });
const mouseMemoirs = Mouse_Memoirs({ weight: "400", subsets: ["latin"], variable: "--font-mouse-memoirs" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Capey Bara | Crafting a New Frequency",
  description: "Side Quests and Caffeine. Experience the finest artisan coffee, pizzas, and hangout spots at Capey Bara in Surat.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${mouseMemoirs.variable} ${anton.variable} ${oswald.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AnimationProvider>
          <Loader />
          <SmoothScroll>
            {children}
            <Cursor />
          </SmoothScroll>
        </AnimationProvider>
      </body>
    </html>
  );
}
