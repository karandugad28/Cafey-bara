import type { Metadata } from "next";
import { Modak, Mouse_Memoirs, Anton, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./custom.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import { AnimationProvider } from "@/context/AnimationContext";

const modak = Modak({ weight: "400", subsets: ["latin"], variable: "--font-modak" });
const mouseMemoirs = Mouse_Memoirs({ weight: "400", subsets: ["latin"], variable: "--font-mouse-memoirs" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Capey Bara | Crafting a New Frequency",
  description: "Side Quests and Caffeine. Experience the finest artisan coffee, pizzas, and hangout spots at Capey Bara in Surat.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full antialiased ${modak.variable} ${mouseMemoirs.variable} ${anton.variable} ${playfair.variable}`} suppressHydrationWarning>
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
