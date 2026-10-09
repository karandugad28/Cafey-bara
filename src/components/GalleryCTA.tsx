"use client";

import React from "react";

export default function GalleryCTA() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] text-beige px-[5vw] text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src="/cafe/coffee3.jpg" alt="Coffee pouring" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 space-y-[3vw] max-md:space-y-[6vw]">
        <h2 className="heading200 font-modak text-beige uppercase leading-[.8]">
          Experience <br/><span className="text-mustard">Capey Bara</span>
        </h2>
        <p className="text60 font-mouse-memoirs text-beige/80 uppercase max-w-[40vw] max-md:max-w-full mx-auto">
          Immerse yourself in the finest artisan coffee. Visit our location or follow our journey.
        </p>
        <div className="flex gap-[2vw] justify-center pt-[2vw] max-md:flex-col max-md:gap-[4vw] max-md:pt-[4vw]">
          <a href="/visit" className="px-[3vw] py-[1vw] max-md:px-[8vw] max-md:py-[3vw] bg-mustard text-black font-mouse-memoirs uppercase text-[1.5vw] max-md:text-[5vw] rounded-full hover:scale-105 transition-transform duration-300">
            Visit Us
          </a>
          <a href="https://instagram.com/capeybara.srt" target="_blank" rel="noreferrer" className="px-[3vw] py-[1vw] max-md:px-[8vw] max-md:py-[3vw] border border-mustard text-mustard font-mouse-memoirs uppercase text-[1.5vw] max-md:text-[5vw] rounded-full hover:bg-mustard hover:text-black transition-all duration-300">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
