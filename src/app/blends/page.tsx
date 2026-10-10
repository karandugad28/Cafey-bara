"use client";

import React from "react";
import Navbar from "@/components/Navbar";

const blendsList = [
  {
    name: "Ethiopian Yirgacheffe",
    type: "Single Origin Light Roast",
    description: "Imported directly from Ethiopia, this light roast delivers bright, floral notes and a crisp, clean finish that awakens the senses.",
    origin: "Yirgacheffe, ET",
    strength: "Bright & Floral",
    color: "bg-[#1B4F8A] text-white"
  },
  {
    name: "Colombian Supremo",
    type: "Artisan Medium Roast",
    description: "Grown in the high altitudes of Colombia, this balanced roast brings a rich, nutty depth with a hint of dark chocolate.",
    origin: "Huila, CO",
    strength: "Rich & Nutty",
    color: "bg-[#2C6FAC] text-white"
  },
  {
    name: "Sumatra Mandheling",
    type: "Bold Dark Roast",
    description: "Sun-dried Indonesian beans roasted to dark perfection. They release a slow-burning, earthy richness that lingers beautifully.",
    origin: "Sumatra, ID",
    strength: "Bold & Earthy",
    color: "bg-[#1b1b1b] text-white"
  },
  {
    name: "Capey Bara Signature Blend",
    type: "House Espresso Roast",
    description: "Our legendary house blend. A carefully crafted mix of South American and African beans, delivering a creamy, velvety espresso.",
    origin: "Global Blend",
    strength: "Smooth & Velvety",
    color: "bg-[#D4A853] text-black"
  }
];

export default function BlendsPage() {
  return (
    <>
      <Navbar />

      <main className="w-full bg-[#f5e3cd] min-h-screen pt-[12vw] max-md:pt-[32vw] px-[5vw] pb-[8vw] relative overflow-hidden select-none">
        <div className="absolute w-[18vw] max-md:w-[35vw] h-auto top-[8vw] right-[2vw] z-10 pointer-events-none opacity-40 animate-pulse">
          <img src="/cafe/coffee2.jpg" alt="Coffee beans illustration" className="w-full h-auto rounded-full object-cover aspect-square" />
        </div>

        <section className="w-full relative z-20 h-fit mb-[5vw] self">
          <div className="flex relative z-10 justify-between items-end max-md:flex-col max-md:items-start max-md:gap-[2vw]">
            <div className="space-y-[1vw] w-fit">
              <p className="text-mustard-dark -rotate-7 ml-[1vw] -translate-y-[2vw] uppercase text-stroke-180 text60 max-md:rotate-0 font-playfair leading-[.9]! max-md:text-[8vw]">
                Secret Beans
              </p>
              <h1 className="text-red text-stroke-180-menu heading300 uppercase leading-[.75] max-md:leading-[.85] max-md:text-[9vw]">
                Our Signature<br />Artisan Blends
              </h1>
            </div>
            <p className="text40 uppercase font-mouse-memoirs text-black/60">
              4 unique profiles
            </p>
          </div>

          <p className="text40 w-[45vw] max-md:w-full mt-[3vw] max-md:mt-[6vw] font-mouse-memoirs text-black/80 leading-[1.2]">
            Every Capey Bara blend is crafted from our proprietary selection of four key artisan roasts. They are sourced from micro-farms to ensure premium taste quality since 1997.
          </p>

          <div className="w-full grid grid-cols-4 gap-[2vw] mt-[6vw] max-md:grid-cols-1 max-md:gap-[6vw] max-md:mt-[8vw]">
            {blendsList.map((blend) => (
              <div
                key={blend.name}
                className="group w-full rounded-[2vw] overflow-hidden bg-white/40 border border-black/5 hover:border-black/20 p-[2vw] max-md:p-[5vw] flex flex-col justify-between hover:bg-white transition-all duration-300 shadow-md hover:scale-[1.02] hover:shadow-xl"
              >
                <div>
                  <span className={`inline-block px-[0.8vw] py-[0.3vw] max-md:px-[3vw] max-md:py-[1.2vw] rounded-full text-[0.8vw] max-md:text-[2.8vw] font-mouse-memoirs uppercase tracking-widest ${blend.color}`}>
                    {blend.type}
                  </span>
                  <h2 className="font-playfair text-red text-2xl max-md:text-[6vw] leading-[1.1] uppercase mt-[1.5vw] max-md:mt-[4vw]">
                    {blend.name}
                  </h2>
                  <p className="font-mouse-memoirs text-[1vw] max-md:text-[3.8vw] text-black/80 leading-[1.3] uppercase mt-[1vw] max-md:mt-[3vw]">
                    {blend.description}
                  </p>
                </div>
                <div className="mt-[2vw] max-md:mt-[5vw] pt-[1vw] max-md:pt-[3vw] border-t border-black/10 flex items-center justify-between font-mouse-memoirs uppercase text-[0.9vw] max-md:text-[3vw] text-black/60">
                  <span>Origin: {blend.origin}</span>
                  <span className="font-bold text-red">{blend.strength}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[6vw] max-md:mt-[10vw] flex justify-center">
            <a
              href="/menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[3vw] py-[1vw] max-md:px-[8vw] max-md:py-[3vw] bg-red text-beige font-mouse-memoirs uppercase text-[1.5vw] max-md:text-[5vw] rounded-full hover:scale-105 transition-transform duration-300"
            >
              Explore Our Blends
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
