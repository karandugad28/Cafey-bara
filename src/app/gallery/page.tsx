import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DomeGallery from "@/components/DomeGallery";
import Cursor from "@/components/Cursor";
import GalleryCTA from "@/components/GalleryCTA";
import FullPageScroll from "@/components/FullPageScroll";

export const metadata: Metadata = {
  title: "Gallery | CapeyBara Café",
  description:
    "A visual journey through CapeyBara — our coffees, our space, our craft. Follow us on Instagram @capeybara.srt.",
};

const PHOTOS = [
  { src: "/1.jpg", alt: "Gallery Image 1" },
  { src: "/2.jpg", alt: "Gallery Image 2" },
  { src: "/3.jpg", alt: "Gallery Image 3" },
  { src: "/4.jpg", alt: "Gallery Image 4" },
  { src: "/5.jpg", alt: "Gallery Image 5" },
  { src: "/6.jpg", alt: "Gallery Image 6" },
  { src: "/7.jpg", alt: "Gallery Image 7" },
  { src: "/8.jpg", alt: "Gallery Image 8" },
  { src: "/9.jpg", alt: "Gallery Image 9" },
  { src: "/10.jpg", alt: "Gallery Image 10" },
  { src: "/11.jpg", alt: "Gallery Image 11" },
  { src: "/12.jpg", alt: "Gallery Image 12" },
];

export default function GalleryPage() {
  return (
    <>
      <Cursor />
      <Navbar />
      <div className="h-screen overflow-hidden">
        <FullPageScroll>
          {/* Section 1 */}
          <main data-nav-dark="true" className="relative w-full h-screen shrink-0 bg-[#0a0a0a] overflow-hidden">
            {/* Background Watermark Strips */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03] flex flex-col justify-between py-10 -rotate-6 scale-150 mix-blend-overlay">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`whitespace-nowrap font-display text-[15rem] max-md:text-[8rem] leading-none text-white ${i % 2 === 0 ? 'animate-marquee-slow' : 'animate-marquee-slow-reverse'}`}>
                  CAPEYBARA CAPEYBARA CAPEYBARA CAPEYBARA CAPEYBARA CAPEYBARA
                </div>
              ))}
            </div>

            {/* Header Overlay - Z-Index 50, White Text, Top Left */}
            <div className="absolute top-36 left-6 md:left-12 max-md:top-24 max-md:left-4 max-md:right-4 z-50 pointer-events-none">
              <div className="bg-black/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <p className="text-gold text-[10px] tracking-[0.5em] uppercase font-body mb-3 font-semibold drop-shadow-md">Visual Stories</p>
                <h1 className="font-display font-medium text-white text-4xl md:text-6xl leading-none tracking-tight mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                  Life at <em className="text-white">CapeyBara</em>
                </h1>
                <p className="font-body text-white/90 text-xs md:text-sm max-w-sm leading-relaxed mt-4 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                  Moments, textures, and aromas — captured to bring you a little closer to our world.
                </p>
              </div>
            </div>

            {/* Dome Gallery - Full viewport */}
            <div className="absolute inset-0 w-full h-full">
              <DomeGallery
                images={PHOTOS}
                grayscale={false}
                overlayBlurColor="#0a0a0a"
                padFactor={0.15}
                dragSensitivity={15}
                fit={1.5}
                minRadius={1500}
                imageBorderRadius="16px"
                openedImageBorderRadius="24px"
              />
            </div>
          </main>

          {/* Section 2 */}
          <GalleryCTA />

          {/* Section 3 */}
          <div data-nav-dark="true" className="w-full h-screen">
            <Footer theme="dark" />
          </div>
        </FullPageScroll>
      </div>
    </>
  );
}
