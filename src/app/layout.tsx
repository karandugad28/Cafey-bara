import type { Metadata } from "next";
import { Modak, Mouse_Memoirs } from "next/font/google";
import "./globals.css";
import "./custom.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import { AnimationProvider } from "@/context/AnimationContext";

const modak = Modak({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-modak",
});

const mouseMemoirs = Mouse_Memoirs({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mouse-memoirs",
});

export const metadata: Metadata = {
  title: "CRSP | Artisan Smashed Burgers",
  description: "Experience the ultimate artisan smashed burgers at CRSP. Fresh ingredients, bold flavors, and zero guilt. Est. 1997 — Navarra, España.",
  manifest: "/manifest.webmanifest",
  keywords: ["artisan burgers", "smashed burgers", "fresh ingredients", "organic burgers", "CRSP burgers"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${modak.variable} ${mouseMemoirs.variable} h-full antialiased`}
      suppressHydrationWarning
    >
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


