"use client";

import React, { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const menuItems = [
  {
    name: "Signature Latte",
    price: "$6",
    image: "/cafe/coffee-late.png",
    detail: "Single origin · steamed oat milk · house blend",
    quick: { origin: "Ethiopia", roast: "Medium", milk: "Oat", time: "4-5 min" },
    nutrition: { calories: 180, protein: "8g" }
  },
  {
    name: "Matcha Latte",
    price: "$7",
    image: "/cafe/matcha-coffee.png",
    detail: "Ceremonial matcha · oat milk · honey drizzle",
    quick: { origin: "Japan", roast: "Green", milk: "Oat", time: "4-5 min" },
    nutrition: { calories: 160, protein: "6g" }
  },
  {
    name: "Artisan Cheesecake",
    price: "$8",
    image: "/cafe/cheesecake.png",
    detail: "New York style · berry compote · buttery crust",
    quick: { origin: "House Baked", roast: "N/A", milk: "Dairy", time: "Ready" },
    nutrition: { calories: 420, protein: "7g" }
  },
  {
    name: "Cold Brew",
    price: "$6",
    image: "/cafe/1.jpg",
    detail: "18hr cold steep · light sweetness · full body",
    quick: { origin: "Colombia", roast: "Dark", milk: "None", time: "Instant" },
    nutrition: { calories: 20, protein: "1g" }
  },
  {
    name: "Flat White",
    price: "$5",
    image: "/cafe/4.jpg",
    detail: "Double ristretto · velvety micro-foam · rich",
    quick: { origin: "Brazil", roast: "Medium", milk: "Whole", time: "3-4 min" },
    nutrition: { calories: 130, protein: "7g" }
  },
  {
    name: "Pour Over",
    price: "$7",
    image: "/cafe/7.jpg",
    detail: "Single origin · hand-poured · nuanced flavours",
    quick: { origin: "Kenya", roast: "Light", milk: "None", time: "5-6 min" },
    nutrition: { calories: 5, protein: "0g" }
  }
];

export default function MenuPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, t) => {
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 64 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.72,
              delay: (t % 3) * 0.1 + 0.05 * Math.floor(t / 3),
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (itemName: string, index: number) => {
    try {
      window.dispatchEvent(new CustomEvent("CapeyBara:add-to-cart", { detail: { item: itemName } }));
    } catch (e) {
      console.error(e);
    }
    const card = cardRefs.current[index];
    if (card) {
      gsap.fromTo(
        card,
        { scale: 1 },
        { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)" }
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="w-full bg-[#f5e3cd] min-h-screen pt-[12vw] max-md:pt-[32vw] px-[5vw] pb-[8vw]">
        <section className="w-full relative z-100 h-fit mb-[5vw] self">
          <div className="flex relative z-100 justify-between items-end max-md:flex-col max-md:items-start max-md:gap-[2vw]">
            <div className="space-y-[1vw] w-fit">
              <p className="text-mustard-dark -rotate-7 ml-[1vw] -translate-y-[2vw] uppercase text-stroke-180 text60 max-md:rotate-0 font-modak leading-[.9]! max-md:text-[8vw]">
                The best
              </p>
              <h1 className="text-red text-stroke-180-menu heading300 uppercase leading-[.75] max-md:leading-[.85] max-md:text-[9vw]">
                Our Finest<br />Cafe Picks
              </h1>
            </div>
            <p className="text40 uppercase font-mouse-memoirs text-black/60">
              {menuItems.length} items
            </p>
          </div>
          <div className="w-full grid grid-cols-3 gap-[2vw] mt-[6vw] max-md:grid-cols-1 max-md:gap-[6vw] max-md:mt-[8vw]">
            {menuItems.map((item, r) => (
              <div
                ref={(el) => { cardRefs.current[r] = el; }}
                key={item.name}
                className="opacity-0 w-full"
              >
                <div className="group h-[35vw] max-md:h-[70vw] w-full rounded-[2vw] overflow-hidden bg-white relative max-md:rounded-[5vw] shrink-0 translate-y-[4vw] transition-all duration-500 shadow-lg border border-black/5 hover:border-black/20">
                  <div
                    className="absolute w-full left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none will-change-transform opacity-0 group-hover:opacity-10 transition-all duration-500 group-hover:scale-y-110"
                    style={{ height: "6vw", transition: "transform 0.44s cubic-bezier(.4,1.6,.7,.95)" }}
                    aria-hidden="true"
                  >
                    <div className="flex w-full h-[3vw] max-md:h-[7vw] transition-all duration-600">
                      {Array.from({ length: 12 }).map((_, a) => (
                        <div key={a} className={`h-full w-[8.33%] max-md:w-[8.33%] transition-colors duration-500 ${a % 2 === 0 ? "bg-red" : "bg-white"}`} />
                      ))}
                    </div>
                    <div className="flex w-full h-[3vw] max-md:h-[7vw] transition-all duration-600">
                      {Array.from({ length: 12 }).map((_, a) => (
                        <div key={a} className={`h-full w-[8.33%] max-md:w-[8.33%] transition-colors duration-500 ${a % 2 === 1 ? "bg-red" : "bg-white"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="size-full relative z-20 flex flex-col justify-between p-[2vw] max-md:p-[4vw]">
                    <div className="absolute left-[2vw] z-200 right-[2vw] bottom-[2vw] max-md:hidden pointer-events-none">
                      <div className="rounded-[1.2vw] border border-black/10 bg-white/85 backdrop-blur-md px-[1.2vw] py-[1vw] opacity-0 translate-y-[1vw] transition-all duration-400 ease-[cubic-bezier(.45,.85,.34,1.12)] group-hover:opacity-100 group-hover:translate-y-0">
                        <div className="flex items-center justify-between gap-[1vw]">
                          <p className="text40 uppercase tracking-[.18em] text-black/60">Quick details</p>
                          <p className="text40 uppercase text-black/60">{item.quick.time}</p>
                        </div>
                        <div className="mt-[.6vw] grid grid-cols-3 gap-[.6vw]">
                          <div className="rounded-[.9vw] bg-black/5 border border-black/10 px-[.8vw] py-[.6vw] transition-all duration-300">
                            <p className="text40 uppercase text-black/60">Origin</p>
                            <p className="text40 uppercase text-black/80">{item.quick.origin}</p>
                          </div>
                          <div className="rounded-[.9vw] bg-black/5 border border-black/10 px-[.8vw] py-[.6vw] transition-all duration-300">
                            <p className="text40 uppercase text-black/60">Roast</p>
                            <p className="text40 uppercase text-black/80">{item.quick.roast}</p>
                          </div>
                          <div className="rounded-[.9vw] bg-black/5 border border-black/10 px-[.8vw] py-[.6vw] transition-all duration-300">
                            <p className="text40 uppercase text-black/60">Milk</p>
                            <p className="text40 uppercase text-black/80">{item.quick.milk}</p>
                          </div>
                        </div>
                        <div className="mt-[.7vw] flex flex-wrap gap-[.6vw]">
                          <span className="text40 uppercase px-[.7vw] py-[.35vw] rounded-full bg-beige border border-black/10 text-black/70 transition-all">Calories: {item.nutrition.calories}</span>
                          <span className="text40 uppercase px-[.7vw] py-[.35vw] rounded-full bg-beige border border-black/10 text-black/70 transition-all">Protein: {item.nutrition.protein}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      data-cursor-hide="true"
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item.name, r); }}
                      className="size-[3vw] p-[.5vw] max-md:p-[1vw] aspect-square max-md:size-[8vw] rounded-full bg-mustard grid place-items-center ml-auto transition-transform duration-400 hover:rotate-115 hover:scale-110 cursor-pointer will-change-transform"
                      aria-label={`Add ${item.name} to order`}
                    >
                      <svg className="w-full h-full object-contain" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <div className="size-[25vw] pointer-events-none max-md:size-[38vw] mx-auto transition-transform duration-700 will-change-transform group-hover:scale-[1.054]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover rounded-xl"
                        style={{ transition: "transform 0.7s cubic-bezier(.5,1.45,.2,1)", willChange: "transform" }}
                      />
                    </div>
                    <div className="w-full flex items-end justify-between text40 max-md:text-[5vw]">
                      <p className="text-red text60">{item.name}</p>
                      <p className="text60 max-md:mr-[2vw]">{item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
