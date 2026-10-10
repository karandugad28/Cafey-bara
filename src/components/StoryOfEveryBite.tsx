"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import JellyDivider from "./JellyDivider";

const logosData = [
  { src: "/img-webp/lettuce.webp", alt: "Path — lettuce" },
  { src: "/img-webp/tomato.webp", alt: "Path — tomato" },
  { src: "/img-webp/cheese-logo.webp", alt: "Path — cheese" },
  { src: "/img-webp/meat.webp", alt: "Path — patty" },
];

const desktopBoxesData = [
  { src: "/img-webp/lettuceimg.webp", alt: "take away 1", country: "Freshly Greens", containerClass: "absolute right-[15vw] space-y-[1.5vw] z-[200] top-[45vw] items-end flex flex-col", noteClass: "rotate-7 text-right uppercase text-stroke-small text40 font-playfair leading-[.9]! text-[#60A905] country-label", description: "Grilled to perfection juicy, smoky, unforgettable.", descriptionClass: "text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1]" },
  { src: "/img-webp/tomatoimg.webp", alt: "take away 2", country: "Juicy Tomatoes", containerClass: "absolute left-[8vw] space-y-[1.5vw] z-[200] top-[85vw] items-start flex flex-col", noteClass: "text-red -rotate-7 text-left uppercase text-stroke-small text40 font-playfair leading-[.9]! country-label", description: "Sun-ripened tomatoes that bring natural sweetness and balance.", descriptionClass: "text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1]" },
  { src: "/img-webp/cheeseimg.webp", alt: "take away 3", country: "Creamy Cheese", containerClass: "absolute right-[8vw] space-y-[1.5vw] z-[200] top-[115vw] items-end flex flex-col", noteClass: "text-mustard rotate-12 text-right uppercase text-stroke-small text40 font-playfair leading-[.9]! country-label", description: "Rich, creamy cheese that melts into every bite.", descriptionClass: "text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1]" },
  { src: "/img-webp/tikki.webp", alt: "take away 4", country: "Perfect Patty", containerClass: "absolute left-[8vw] space-y-[1.5vw] z-[200] top-[135vw] items-start flex flex-col", noteClass: "text-[#662C00] -rotate-12 text-left uppercase text-stroke-small text40 font-playfair leading-[.9]! country-label", description: "Grilled to perfection juicy, smoky, unforgettable.", descriptionClass: "text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1]" },
  { src: "/img-webp/bun.webp", alt: "take away 5", country: "Artisan Bun", containerClass: "absolute right-[8vw] space-y-[1.5vw] z-[200] top-[160vw] items-start flex flex-col", noteClass: "text-mustard-dark rotate-6 text-right uppercase text-stroke-small text40 font-playfair leading-[.9]! country-label", description: "Soft, toasted buns crafted to hold everything together.", descriptionClass: "text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1]" },
];

const mobileBoxesData = [
  { src: "/img-webp/lettuceimg.webp", alt: "take away 1", country: "Freshly Greens", colorClass: "text-[#60A905]", description: "Grilled to perfection juicy, smoky, unforgettable." },
  { src: "/img-webp/tomatoimg.webp", alt: "take away 2", country: "Juicy Tomatoes", colorClass: "text-red", description: "Sun-ripened tomatoes that bring natural sweetness and balance." },
  { src: "/img-webp/cheeseimg.webp", alt: "take away 3", country: "Creamy Cheese", colorClass: "text-mustard", description: "Rich, creamy cheese that melts into every bite." },
  { src: "/img-webp/tikki.webp", alt: "take away 4", country: "Perfect Patty", colorClass: "text-[#662C00]", description: "Grilled to perfection juicy, smoky, unforgettable." },
  { src: "/img-webp/bun.webp", alt: "take away 5", country: "Artisan Bun", colorClass: "text-mustard-dark", description: "Soft, toasted buns crafted to hold everything together." },
];

export default function StoryOfEveryBite() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopLogosRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileLogosRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Desktop ScrollTrigger for path following
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const container = desktopContainerRef.current;
    const path = desktopPathRef.current;
    const logos = desktopLogosRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container || !path || logos.length === 0) return;

    const ctx = gsap.context(() => {
      logos.forEach((logo) => {
        gsap.set(logo, { xPercent: -50, yPercent: -50 });
      });

      const count = logos.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "5% top",
          end: "95% bottom",
          scrub: 1,
        },
      });

      for (let i = 0; i < count; i++) {
        const startPos = i / count;
        const endPos = (i + 1) / count;
        tl.fromTo(
          logos[i],
          { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: startPos, end: startPos } },
          { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: startPos, end: endPos }, duration: 1, ease: "none" },
          i
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  // Desktop ScrollTrigger & Inertia for takeaway boxes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cleanups: (() => void)[] = [];
    const boxes = desktopBoxesRef.current.filter(Boolean) as HTMLDivElement[];

    boxes.forEach((box) => {
      gsap.set(box, { opacity: 0, scale: 0.8, y: 50 });
      ScrollTrigger.create({
        trigger: box,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            box,
            { opacity: 0, scale: 0.8, rotate: -15 + Math.random() * 30, y: 50 },
            { opacity: 1, scale: 1.05, rotate: 3 - Math.random() * 6, y: 0, duration: 0.6, ease: "back.out(2.2)", overwrite: "auto" }
          );
        },
      });

      let lastX = 0;
      let lastY = 0;
      let deltaX = 0;
      let deltaY = 0;
      const origRotation = (gsap.getProperty(box, "rotation") as number) || 0;

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        deltaX = mouseEvent.clientX - lastX;
        deltaY = mouseEvent.clientY - lastY;
        lastX = mouseEvent.clientX;
        lastY = mouseEvent.clientY;
      };

      const handleMouseEnter = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        deltaX = 0;
        deltaY = 0;
        lastX = mouseEvent.clientX;
        lastY = mouseEvent.clientY;
      };

      const handleMouseLeave = () => {
        const clampedX = Math.max(-40, Math.min(40, deltaX * 2));
        const clampedY = Math.max(-40, Math.min(40, deltaY * 2));

        gsap.to(box, {
          keyframes: [
            { x: clampedX, y: clampedY, rotation: origRotation + clampedX * 0.1, duration: 0.25, ease: "power2.out" },
            { x: 0, y: 0, rotation: origRotation, duration: 0.85, ease: "power3.out" },
          ],
          overwrite: "auto",
          force3D: true,
        });
      };

      box.addEventListener("mousemove", handleMouseMove);
      box.addEventListener("mouseenter", handleMouseEnter);
      box.addEventListener("mouseleave", handleMouseLeave);

      cleanups.push(() => {
        box.removeEventListener("mousemove", handleMouseMove);
        box.removeEventListener("mouseenter", handleMouseEnter);
        box.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Mobile ScrollTrigger for path following
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const container = mobileContainerRef.current;
    const path = mobilePathRef.current;
    const logos = mobileLogosRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container || !path || logos.length === 0) return;

    const ctx = gsap.context(() => {
      logos.forEach((logo) => {
        gsap.set(logo, { xPercent: -50, yPercent: -50, opacity: 0 });
      });

      const count = logos.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "-2% center",
          end: "95% center",
          scrub: 1,
        },
      });

      for (let i = 0; i < count; i++) {
        const startPos = i / count;
        const endPos = (i + 1) / count;
        tl.fromTo(
          logos[i],
          { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: startPos, end: startPos } },
          { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: startPos, end: endPos }, duration: 1, ease: "none" },
          i
        );
        tl.fromTo(logos[i], { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.inOut" }, i);
        tl.to(logos[i], { opacity: 0, duration: 0.2, ease: "power1.inOut" }, i + 0.8);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  // Mobile ScrollTrigger for boxes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const boxes = mobileBoxesRef.current.filter(Boolean) as HTMLDivElement[];

    boxes.forEach((box) => {
      gsap.set(box, { opacity: 0, scale: 0.8, y: 50 });
      ScrollTrigger.create({
        trigger: box,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            box,
            { opacity: 0, scale: 0.8, rotate: -15 + Math.random() * 30, y: 50 },
            { opacity: 1, scale: 1.05, rotate: 3 - Math.random() * 6, y: 0, duration: 0.6, ease: "back.out(2.2)", overwrite: "auto" }
          );
        },
      });
    });
  }, []);

  return (
    <>
      {/* DESKTOP SECTION */}
      <section id="storyofEveryBite" className="max-md:hidden h-[195vw] -mt-[5vw] w-full relative bg-mustard overflow-hidden">
        <JellyDivider fill="#f91814" />
        {logosData.map((logo, idx) => (
          <div
            key={`desktop-logo-${idx}`}
            ref={(el) => { desktopLogosRef.current[idx] = el; }}
            className="pointer-events-none absolute left-0 top-0 w-[15vw] will-change-transform z-[2]"
          >
            <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" draggable={false} />
          </div>
        ))}
        <div ref={desktopContainerRef} className="relative self h-[153vw] w-full">
          <div className="absolute top-[40vw] left-1/2 -translate-x-1/2 h-full w-[70vw]">
            <svg className="h-full w-full object-contain" width="1021" height="1750" viewBox="0 0 1021 1750" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                ref={desktopPathRef}
                d="M869.51 4.98096C869.51 4.98096 92.2848 72.8008 46.5095 431.981C-6.4157 847.264 1011.9 471.855 1015.51 890.481C1019.21 1319.64 1.40592 893.322 5.00955 1322.48C8.60041 1750.12 1015.51 1744.48 1015.51 1744.48"
                stroke="#F4A804"
                strokeOpacity="0.5"
                strokeWidth="10"
                strokeDasharray="36 36"
              ></path>
            </svg>
          </div>
          <div className="space-y-[2vw] mt-[20vw] relative z-10 text-center">
            <h2 className="text-white w-[70vw] mx-auto text-stroke-180-mustard heading300 uppercase leading-[.85]">
              A story in every bite.
            </h2>
            <p className="text40 w-[25vw] mx-auto uppercase text-black font-mouse-memoirs leading-[1.1]">
              From fresh farms to your hands every layer matters.
            </p>
          </div>
          {desktopBoxesData.map((box, idx) => (
            <div
              key={`desktop-box-${idx}`}
              ref={(el) => { desktopBoxesRef.current[idx] = el; }}
              className={box.containerClass}
              style={{ cursor: "pointer", willChange: "transform" }}
            >
              <p className={box.noteClass} style={{ willChange: "transform", cursor: "pointer" }}>
                {box.country}
              </p>
              <div className="w-[25vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl bg-white/20">
                <img src={box.src} alt={box.alt} className="h-full w-full object-cover" draggable={false} />
              </div>
              <p className={box.descriptionClass}>{box.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE SECTION */}
      <section id="storyofEveryBiteMobile" className="h-fit hidden space-y-[5vw] max-md:block relative min-h-screen w-full bg-mustard overflow-hidden">
        <JellyDivider fill="#f91814" />
        <div className="space-y-[2vw] mt-[30vw] relative z-10 px-[4vw]">
          <h2 className="text-white text-center w-full text-stroke-180-mustard heading300 uppercase leading-[.85]">
            A story in every bite.
          </h2>
          <p className="text40 text-center w-[60%] mx-auto text-black font-mouse-memoirs leading-[1.1]">
            From fresh farms to your hands every layer matters.
          </p>
        </div>
        <div ref={mobileContainerRef} className="flex flex-col relative gap-[40vw] items-center mt-[25vw] pb-[10vw]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[83%] w-[2vw] flex items-center pointer-events-none z-0">
            <svg width="6" height="100%" viewBox="0 0 6 1000" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block" }}>
              <path ref={mobilePathRef} d="M3 0 L3 1000" stroke="#F4A804" strokeOpacity="0.7" strokeWidth="4" strokeDasharray="10 14"></path>
            </svg>
          </div>
          {logosData.map((logo, idx) => (
            <div
              key={`mobile-logo-${idx}`}
              ref={(el) => { mobileLogosRef.current[idx] = el; }}
              className="pointer-events-none absolute left-0 top-0 w-[15vw] will-change-transform z-[2]"
            >
              <img src={logo.src} alt={logo.alt} className="h-full w-full object-contain" draggable={false} />
            </div>
          ))}
          {mobileBoxesData.map((box, idx) => (
            <div
              key={`mobile-box-${idx}`}
              ref={(el) => { mobileBoxesRef.current[idx] = el; }}
              className="flex flex-col items-center space-y-[3vw] w-fit relative z-10"
              style={{ cursor: "pointer", willChange: "transform" }}
            >
              <p className={`uppercase text-stroke-small text-[7vw] font-playfair leading-snug country-label ${box.colorClass}`} style={{ willChange: "transform", cursor: "pointer" }}>
                {box.country}
              </p>
              <div className="w-[60vw] rounded-[5vw] overflow-hidden h-[45vw] mx-auto bg-white/70 shadow-lg">
                <img src={box.src} alt={box.alt} className="h-full w-full object-cover" draggable={false} />
              </div>
              <p className="text-[5vw] w-[70%] text-black uppercase font-mouse-memoirs leading-[1.1] text-center px-[6vw]">
                {box.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
