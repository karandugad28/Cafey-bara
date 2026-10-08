"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import JellyDivider from "./JellyDivider";

const desktopLocations = [
  { src: "/img-webp/berlin.webp", alt: "CRSP Burger takeaway packaging in Berlin", country: "BERLIN", containerClass: "absolute right-[5vw] space-y-[1.5vw] z-[200] top-[50vw] items-end flex flex-col", noteClass: "text-red rotate-7 text-right uppercase text-stroke-small text40 font-modak leading-[.9]! country-label" },
  { src: "/img-webp/london.webp", alt: "CRSP Burger takeaway packaging in London", country: "LONDON", containerClass: "absolute left-[35vw] space-y-[1.5vw] z-[200] top-[64vw] items-start flex flex-col", noteClass: "text-red -rotate-7 text-left uppercase text-stroke-small text40 font-modak leading-[.9]! country-label" },
  { src: "/img-webp/newyork.webp", alt: "CRSP Burger takeaway packaging in New York", country: "NEW YORK", containerClass: "absolute right-[20vw] space-y-[1.5vw] z-[200] top-[80vw] items-end flex flex-col", noteClass: "text-red rotate-12 text-right uppercase text-stroke-small text40 font-modak leading-[.9]! country-label" },
  { src: "/img-webp/sydney.webp", alt: "CRSP Burger takeaway packaging in Sydney", country: "SYDNEY", containerClass: "absolute left-[15vw] space-y-[1.5vw] z-[200] top-[105vw] items-start flex flex-col", noteClass: "text-red -rotate-12 text-left uppercase text-stroke-small text40 font-modak leading-[.9]! country-label" },
  { src: "/img-webp/tokyo.webp", alt: "CRSP Burger takeaway packaging in Tokyo", country: "TOKYO", containerClass: "absolute right-[14vw] space-y-[1.5vw] z-[200] top-[130vw] items-end flex flex-col", noteClass: "text-red rotate-6 text-right uppercase text-stroke-small text40 font-modak leading-[.9]! country-label" },
];

const mobileLocations = [
  { src: "/img-webp/berlin.webp", alt: "take away 1", country: "BERLIN", note: "Grilled to perfection juicy, smoky, unforgettable." },
  { src: "/img-webp/london.webp", alt: "take away 2", country: "LONDON", note: "Sun-ripened tomatoes that bring natural sweetness and balance." },
  { src: "/img-webp/newyork.webp", alt: "take away 3", country: "NEW YORK", note: "Rich, creamy cheese that melts into every bite." },
  { src: "/img-webp/sydney.webp", alt: "take away 4", country: "SYDNEY", note: "Grilled to perfection juicy, smoky, unforgettable." },
  { src: "/img-webp/tokyo.webp", alt: "take away 5", country: "TOKYO", note: "Soft, toasted buns crafted to hold everything together." },
];

const mobilePlanes = [
  { src: "/img-webp/plane.webp", alt: "Path — plane 1" },
  { src: "/img-webp/plane.webp", alt: "Path — plane 2" },
  { src: "/img-webp/plane.webp", alt: "Path — plane 3" },
  { src: "/img-webp/plane.webp", alt: "Path — plane 4" },
];

export default function MapSection() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopPlaneRef = useRef<HTMLDivElement>(null);
  const desktopBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobilePlanesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Desktop ScrollTrigger for plane following path
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const container = desktopContainerRef.current;
    const path = desktopPathRef.current;
    const plane = desktopPlaneRef.current;

    if (!container || !path || !plane) return;

    const ctx = gsap.context(() => {
      gsap.set(plane, { xPercent: -50, yPercent: -50, opacity: 0 });
      gsap.to(plane, {
        motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: -90 },
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: "-10% top",
          end: "75% top",
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set(plane, { opacity: 1 }),
          onLeaveBack: () => gsap.set(plane, { opacity: 0 }),
        },
      });
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

  // Mobile ScrollTrigger for path following planes
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const container = mobileContainerRef.current;
    const path = mobilePathRef.current;
    const planes = mobilePlanesRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container || !path || planes.length === 0) return;

    const ctx = gsap.context(() => {
      planes.forEach((plane) => {
        gsap.set(plane, { xPercent: -50, yPercent: -50, opacity: 0 });
      });

      const count = planes.length;
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
          planes[i],
          { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: startPos, end: startPos } },
          { motionPath: { path: path, align: path, alignOrigin: [0.5, 0.5], autoRotate: true, start: startPos, end: endPos }, duration: 1, ease: "none" },
          i
        );
        tl.fromTo(planes[i], { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.inOut" }, i);
        tl.to(planes[i], { opacity: 0, duration: 0.2, ease: "power1.inOut" }, i + 0.8);
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
      {/* DESKTOP MAP SECTION */}
      <section id="map-desktop" className="h-fit max-md:hidden overflow-clip overflow-hidden w-full bg-mustard relative" style={{ contain: "paint" }}>
        <JellyDivider fill="#F5E3CD" />
        <div
          ref={desktopPlaneRef}
          className="pointer-events-none absolute left-0 top-0 w-[15vw] opacity-0"
          style={{ zIndex: 2, WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden", transform: "translate3d(0,0,0)" }}
        >
          <img src="/img-webp/plane.webp" alt="Plane" className="h-full w-full object-contain" draggable={false} />
        </div>
        <div ref={desktopContainerRef} className="relative self h-[163vw] w-full">
          <div className="absolute top-0 left-0 h-full w-full">
            <svg className="h-full w-full object-cover" width="1728" height="2176" viewBox="0 0 1728 2176" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={true}>
              <path
                ref={desktopPathRef}
                d="M500 -139C557 -139 1550.43 364.378 1610.6 653.93C1745.6 1303.59 -160.566 551.165 -11.7069 1197.36C117.259 1757.21 1470.1 925.826 1474.12 1502.33C1478.15 2080.14 63.7084 1375.34 -11.707 1896.78C-107.419 2558.55 1928.5 2042.5 1928.5 2042.5"
                stroke="#F4A804"
                strokeOpacity="0.5"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="42 42"
              ></path>
            </svg>
          </div>
          <div className="space-y-[2vw] mt-[20vw] relative z-10 text-center">
            <p className="text-mustard-dark -rotate-7 ml-[1vw] -translate-y-[6vw] uppercase text-stroke-180 text-[2.8vw] font-modak leading-[.9]! inline-block">
              take away
            </p>
            <h2 className="text-white text-stroke-180-mustard heading300 w-[80vw] mx-auto leading-[.85]">
              QUALITY THAT TRAVELS WITH YOU
            </h2>
            <p className="text40 w-[30vw] mx-auto text-black font-mouse-memoirs leading-[1.1] mt-4">
              Freshly packed smash burgers, ready to go wherever you CRSPe. From our flat-top to any corner of the globe, we ensure every layer stays hot and juicy.
            </p>
          </div>
          {desktopLocations.map((box, idx) => (
            <div
              key={`desktop-map-box-${idx}`}
              ref={(el) => { desktopBoxesRef.current[idx] = el; }}
              className={box.containerClass}
              style={{ cursor: "pointer", willChange: "transform" }}
            >
              <p className={box.noteClass} style={{ willChange: "transform", cursor: "pointer" }}>
                {box.country}
              </p>
              <div className="w-[14vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl bg-white/20">
                <img src={box.src} alt={box.alt} className="h-full w-full object-cover" draggable={false} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE MAP SECTION */}
      <section id="map-mobile" className="h-fit hidden space-y-[5vw] max-md:block relative min-h-screen w-full bg-mustard overflow-hidden">
        <JellyDivider fill="#F5E3CD" />
        <div className="space-y-[4vw] mt-[30vw] relative z-10 px-[4vw]">
          <h2 className="text-white text-center w-full text-stroke-180-mustard heading300 uppercase leading-[.85]">
            A story in every bite.
          </h2>
          <p className="text40 mx-auto text-center w-[65%] text-black font-mouse-memoirs leading-[1.1]">
            From fresh farms to your hands every layer matters.
          </p>
        </div>
        <div ref={mobileContainerRef} className="flex flex-col relative gap-[50vw] items-center mt-[25vw] pb-[10vw]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[83%] w-[2vw] flex items-center pointer-events-none z-0">
            <svg width="6" height="100%" viewBox="0 0 6 1000" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block" }}>
              <path ref={mobilePathRef} d="M3 0 L3 1000" stroke="#F4A804" strokeOpacity="0.7" strokeWidth="4" strokeDasharray="10 14"></path>
            </svg>
          </div>
          {mobilePlanes.map((plane, idx) => (
            <div
              key={`mobile-plane-${idx}`}
              ref={(el) => { mobilePlanesRef.current[idx] = el; }}
              className="pointer-events-none absolute left-0 top-0 w-[25vw] will-change-transform z-[2]"
            >
              <img src={plane.src} alt={plane.alt} className="h-full w-full object-contain -rotate-90" draggable={false} />
            </div>
          ))}
          {mobileLocations.map((box, idx) => (
            <div
              key={`mobile-map-box-${idx}`}
              ref={(el) => { mobileBoxesRef.current[idx] = el; }}
              className="flex flex-col items-center space-y-[3vw] w-fit relative z-10"
              style={{ cursor: "pointer", willChange: "transform" }}
            >
              <p className="uppercase text-stroke-small text-[7vw] font-modak leading-snug country-label" style={{ willChange: "transform", cursor: "pointer" }}>
                {box.country}
              </p>
              <div className="w-[60vw] rounded-[5vw] overflow-hidden h-auto mx-auto bg-white/70 shadow-lg">
                <img src={box.src} alt={box.alt} className="h-full w-full object-cover" draggable={false} />
              </div>
              <p className="text-[5vw] w-[70%] text-black uppercase font-mouse-memoirs leading-[1.1] text-center px-[6vw]">
                {box.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
