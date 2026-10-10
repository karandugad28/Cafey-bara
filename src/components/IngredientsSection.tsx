"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function IngredientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const item4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Reveal text lines
      const textLines = section.querySelectorAll(".heading300 span.inline-block");
      textLines.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Floating / Parallax effect for ingredient images
      const items = [item1Ref.current, item2Ref.current, item3Ref.current, item4Ref.current];
      items.forEach((item, i) => {
        if (!item) return;
        const direction = i % 2 === 0 ? -1 : 1;
        gsap.fromTo(
          item,
          { y: direction * 40 },
          {
            y: -direction * 40,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="h-fit max-md:h-fit max-md:py-[14vw] w-full px-[2.5vw] relative"
    >
      <div className="h-fit pt-[2vw] relative z-100 space-y-[3vw] w-full max-md:space-y-[6vw]">
        <p className="text-red -rotate-7 max-md:rotate-0 mx-auto uppercase text-stroke-180 text-center text-[2.8vw] max-md:text-[8vw] font-playfair leading-[.9]!">
          Pure Craft
        </p>
        <div className="max-md:mt-[10vw] flex flex-col gap-[1vw] w-full items-center justify-center">
          <p className="heading300 mx-auto text-center w-[60vw] max-md:w-full leading-[.75] uppercase text-stroke-180 text-red">
            <span className="inline-block opacity-0">Every Sip</span>
          </p>
          <p className="heading300 mx-auto text-center w-[60vw] max-md:w-full leading-[.75] uppercase text-stroke-180 text-red">
            <span className="inline-block opacity-0">Steeped In</span>
          </p>
          <p className="heading300 mx-auto text-center w-[60vw] max-md:w-full leading-[.75] uppercase text-stroke-180 text-red">
            <span className="inline-block opacity-0">Signature</span>
          </p>
          <p className="heading300 mx-auto text-center w-[60vw] max-md:w-full leading-[.75] uppercase text-stroke-180 text-red">
            <span className="inline-block opacity-0">Warmth</span>
          </p>
        </div>
        <div
          ref={item1Ref}
          className="w-[18vw] max-md:w-[26vw] h-auto absolute right-[15vw] max-md:right-[5vw] top-[18vw] max-md:top-[25vw] z-10"
          style={{ willChange: "transform" }}
        >
          <img
            alt="Fresh organic cinnamon spice"
            className="h-full w-full object-contain"
            src="/img-webp/tomato.webp"
          />
        </div>
        <div
          ref={item2Ref}
          className="w-[23vw] max-md:w-[32vw] h-auto absolute left-[14vw] max-md:left-[5vw] top-[37vw] max-md:top-[65vw] z-20"
          style={{ willChange: "transform" }}
        >
          <img
            alt="Premium artisan cheesecake"
            className="h-full w-full object-contain"
            src="/cafe/cheesecake.png"
          />
        </div>
        <div
          ref={item3Ref}
          className="w-[20vw] max-md:w-[28vw] h-auto absolute right-[16vw] max-md:right-[5vw] bottom-[-4vw] max-md:bottom-[-10vw] z-30"
          style={{ willChange: "transform" }}
        >
          <img
            alt="Artisan matcha coffee blend"
            className="h-full w-full object-contain"
            src="/cafe/matcha-coffee.png"
          />
        </div>
        <div
          ref={item4Ref}
          className="w-[24vw] max-md:w-[36vw] h-auto absolute left-[15vw] max-md:left-[5vw] top-[5vw] max-md:top-[20vw] z-40"
          style={{ willChange: "transform" }}
        >
          <img
            alt="Premium cafe latte with latte art"
            className="h-full w-full object-contain"
            src="/cafe/coffee-late.png"
          />
        </div>
      </div>
    </section>
  );
}
