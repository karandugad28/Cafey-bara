"use client";

import React from "react";
import Navbar from "@/components/Navbar";

const spicesList = [
  {
    name: "Pimentón de la Vera",
    type: "Smoked Paprika",
    description: "Imported directly from Spain, this oak-wood smoked red pepper gives our patties their deep, signature flavor profile.",
    origin: "Extremadura, ES",
    strength: "Mild & Smoky",
    color: "bg-[#b91c1c] text-white"
  },
  {
    name: "Wild Navarra Oregano",
    type: "Hand-Crushed Herbs",
    description: "Grown in the high pastures of northern Spain, this wild herb brings a rustic, aromatic depth to our kitchen secret.",
    origin: "Navarra, ES",
    strength: "Intense & Herbal",
    color: "bg-[#15803d] text-white"
  },
  {
    name: "Chipotle Chili Flakes",
    type: "Slow Smoked Jalapeños",
    description: "Sun-dried jalapeños ground to medium coarseness. They release a slow-burning, rich heat inside the toasted brioche buns.",
    origin: "Chihuahua, MX",
    strength: "Medium Heat",
    color: "bg-[#7c2d12] text-white"
  },
  {
    name: "Wildflower Chili Honey",
    type: "Glaze Secret ingredient",
    description: "Our legendary sweet finish. Blend of local raw wildflower honey with cayenne infusions, glazed hot on the patty.",
    origin: "Basque Country, ES",
    strength: "Sweet & Fierce",
    color: "bg-[#eab308] text-black"
  }
];

export default function SpicesPage() {
  return (
    <>
      <Navbar />

      <main className="w-full bg-[#f5e3cd] min-h-screen pt-[12vw] max-md:pt-[32vw] px-[5vw] pb-[8vw] relative overflow-hidden select-none">
        {/* Decorative elements */}
        <div className="absolute w-[18vw] max-md:w-[35vw] h-auto top-[8vw] right-[2vw] z-10 pointer-events-none opacity-40 animate-pulse">
          <img src="/img-webp/spices.webp" alt="Spices mix illustration" className="w-full h-auto" />
        </div>

        <section className="w-full relative z-20 h-fit mb-[5vw] self">
          {/* Header */}
          <div className="flex relative z-10 justify-between items-end max-md:flex-col max-md:items-start max-md:gap-[2vw]">
            <div className="space-y-[1vw] w-fit">
              <p className="text-mustard-dark -rotate-7 ml-[1vw] -translate-y-[2vw] uppercase text-stroke-180 text60 max-md:rotate-0 font-modak leading-[.9]! max-md:text-[8vw]">
                Secret Blend
              </p>
              <h1 className="text-red text-stroke-180-menu heading300 uppercase leading-[.75] max-md:leading-[.85] max-md:text-[9vw]">
                Our Signature<br />Artisan Spices
              </h1>
            </div>
            <p className="text40 uppercase font-mouse-memoirs text-black/60">
              4 secret ingredients
            </p>
          </div>

          <p className="text40 w-[45vw] max-md:w-full mt-[3vw] max-md:mt-[6vw] font-mouse-memoirs text-black/80 leading-[1.2]">
            Every CRSP smashed patty is seasoned with our proprietary blend of four key artisan spices. They are selected from micro-farms to ensure premium taste quality since 1997.
          </p>

          {/* Spices Grid */}
          <div className="w-full grid grid-cols-4 gap-[2vw] mt-[6vw] max-md:grid-cols-1 max-md:gap-[6vw] max-md:mt-[8vw]">
            {spicesList.map((spice) => (
              <div
                key={spice.name}
                className="group w-full rounded-[2vw] overflow-hidden bg-white/40 border border-black/5 hover:border-black/20 p-[2vw] max-md:p-[5vw] flex flex-col justify-between hover:bg-white transition-all duration-300 shadow-md hover:scale-[1.02] hover:shadow-xl"
              >
                <div>
                  {/* Decorative badge */}
                  <span className={`inline-block px-[0.8vw] py-[0.3vw] max-md:px-[3vw] max-md:py-[1.2vw] rounded-full text-[0.8vw] max-md:text-[2.8vw] font-mouse-memoirs uppercase tracking-widest ${spice.color}`}>
                    {spice.type}
                  </span>

                  {/* Title & Desc */}
                  <h2 className="font-modak text-red text-2xl max-md:text-[6vw] leading-[1.1] uppercase mt-[1.5vw] max-md:mt-[4vw]">
                    {spice.name}
                  </h2>
                  <p className="font-mouse-memoirs text-[1vw] max-md:text-[3.8vw] text-black/80 leading-[1.3] uppercase mt-[1vw] max-md:mt-[3vw]">
                    {spice.description}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="mt-[2vw] max-md:mt-[5vw] pt-[1vw] max-md:pt-[3vw] border-t border-black/10 flex items-center justify-between font-mouse-memoirs uppercase text-[0.9vw] max-md:text-[3vw] text-black/60">
                  <span>Origin: {spice.origin}</span>
                  <span className="font-bold text-red">{spice.strength}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="mt-[6vw] max-md:mt-[10vw] flex justify-center">
            <a
              className="relative w-fit border-none bg-transparent p-0 block cursor-pointer outline-none select-none hover:scale-105 transition-transform"
              href="/menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="-10 -10 602 475"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              >
                <path
                  stroke="#ffffff"
                  strokeWidth="10"
                  fill="#F91914"
                  d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z"
                ></path>
              </svg>
              <span className="relative z-10 text-white font-bold text40 uppercase inline-block px-[4vw] py-[1.5vw] max-md:px-[10vw] max-md:py-[4vw]">
                Explore Our Burgers
              </span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
