"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FullPageScroll from "@/components/FullPageScroll";
import DomeGallery from "@/components/DomeGallery";
import GalleryCTA from "@/components/GalleryCTA";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      
      <main className="bg-[#0a0a0a] min-h-screen w-full">
        <FullPageScroll>
          {/* SECTION 1: Immersive Gallery Hero */}
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            {/* Watermark Animation */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-overlay opacity-5 select-none flex flex-col justify-center -rotate-6 scale-150">
              <div className="whitespace-nowrap animate-marquee flex">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-[20vw] font-modak text-white px-8">CAPEY BARA</span>
                ))}
              </div>
              <div className="whitespace-nowrap animate-marquee-reverse flex mt-[-8vw]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-[20vw] font-modak text-white px-8">VISUAL STORIES</span>
                ))}
              </div>
              <div className="whitespace-nowrap animate-marquee flex mt-[-8vw]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="text-[20vw] font-modak text-white px-8">ARTISAN COFFEE</span>
                ))}
              </div>
            </div>

            {/* Header Overlay */}
            <div className="absolute top-[12vw] max-md:top-[25vw] left-[5vw] z-40 pointer-events-none">
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-[2vw] max-md:p-[5vw] max-w-[30vw] max-md:max-w-[80vw] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <p className="text-mustard uppercase tracking-[0.3em] text-[0.9vw] max-md:text-[3vw] font-bold mb-[1vw] drop-shadow-lg">
                  VISUAL STORIES
                </p>
                <h1 className="text-beige text-[4vw] max-md:text-[10vw] font-modak leading-[0.9] drop-shadow-2xl">
                  Life at <br/> <span className="italic font-serif text-white">Capey Bara</span>
                </h1>
                <p className="text-white/80 mt-[1.5vw] text-[1vw] max-md:text-[3.5vw] font-sans font-light leading-relaxed drop-shadow-md">
                  A curated collection of moments, capturing the rich aroma, warmth, and craft of every pour. Swipe to explore our world.
                </p>
              </div>
            </div>

            {/* 3D Gallery */}
            <DomeGallery />
          </div>

          {/* SECTION 2: CTA */}
          <div className="relative w-full h-full">
            <GalleryCTA />
          </div>

          {/* SECTION 3: Footer */}
          <div className="relative w-full h-full flex flex-col justify-end bg-beige">
            <Footer />
          </div>
        </FullPageScroll>
      </main>

      <style jsx global>{
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 20s linear infinite;
        }
        /* Hide scrollbar for clean look */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      }</style>
    </>
  );
}
