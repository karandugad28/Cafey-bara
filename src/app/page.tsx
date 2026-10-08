"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import CheesyDivider from "@/components/CheesyDivider";
import IngredientsSection from "@/components/IngredientsSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import { useAnimation } from "@/context/AnimationContext";
import Button from "@/components/Button";
import Sticker from "@/components/Sticker";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { isLoaderFinished } = useAnimation();
  const heroRef = useRef<HTMLElement>(null);
  const burgerImgRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanupFns: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (!isLoaderFinished) {
        gsap.set("#hero h1 span.inline-block > span, #hero p span.inline-block", { y: 60, opacity: 0, skewY: 4 });
        return;
      }

      // ── Hero text reveal ──────────────────────────────────────────────
      gsap.fromTo(
        "#hero h1 span.inline-block > span, #hero p span.inline-block",
        { y: 60, opacity: 0, skewY: 4 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // ── Hero burger spin-in & floating ────────────────────────────────
      if (burgerImgRef.current) {
        gsap.fromTo(
          burgerImgRef.current,
          { scale: 0.5, opacity: 0, y: 100, rotate: -5 },
          { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 1.5, ease: "back.out(1.5)", delay: 0.5 }
        );
        gsap.to(burgerImgRef.current, {
          y: "-=15",
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.7,
        });
      }

      // ── About section reveal ──────────────────────────────────────────
      const aboutTextEls = document.querySelectorAll("#about p.text-red, #about h2 span.inline-block, #about p.text-black");
      aboutTextEls.forEach((el, i) => {
        gsap.set(el, { y: 64, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 86%",
          once: true,
          onEnter: () => {
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.72,
              delay: (i % 5) * 0.08,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        });
      });

      // ── About images rotate-in & cursor inertia effect ────────────────
      const mediaItems = document.querySelectorAll("#about .media-item");
      mediaItems.forEach((item, i) => {
        gsap.set(item, { y: 64, opacity: 0, scale: 0.9 });
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(item, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: "power3.out",
              overwrite: "auto",
              onComplete: () => {
                let lastX = 0;
                let lastY = 0;
                let deltaX = 0;
                let deltaY = 0;
                const origRotation = (gsap.getProperty(item, "rotation") as number) || 0;

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

                  gsap.to(item, {
                    keyframes: [
                      { x: clampedX, y: clampedY, rotation: origRotation + clampedX * 0.1, duration: 0.25, ease: "power2.out" },
                      { x: 0, y: 0, rotation: origRotation, duration: 0.85, ease: "power3.out" },
                    ],
                    overwrite: "auto",
                    force3D: true,
                  });
                };

                item.addEventListener("mousemove", handleMouseMove);
                item.addEventListener("mouseenter", handleMouseEnter);
                item.addEventListener("mouseleave", handleMouseLeave);

                cleanupFns.push(() => {
                  item.removeEventListener("mousemove", handleMouseMove);
                  item.removeEventListener("mouseenter", handleMouseEnter);
                  item.removeEventListener("mouseleave", handleMouseLeave);
                });
              },
            });
          },
        });
      });

      // ── CTA section ───────────────────────────────────────────────────
      if (ctaSectionRef.current) {
        const ctaEls = ctaSectionRef.current.querySelectorAll("h2, p, a");
        ctaEls.forEach((el, i) => {
          gsap.set(el, { y: 64, opacity: 0 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(el, {
                y: 0,
                opacity: 1,
                duration: 0.72,
                delay: i * 0.1,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
          });
        });
      }

      // ── Sticker parallax ──────────────────────────────────────────────
      document.querySelectorAll(".sticker-container").forEach((el, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        gsap.to(el, {
          y: dir * 40,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // ── Navbar dark/light on section scroll ───────────────────────────
      const navEl = document.querySelector("nav");
      const sections = document.querySelectorAll("[data-nav-dark]");
      sections.forEach((section) => {
        const isDark = section.getAttribute("data-nav-dark") === "true";
        ScrollTrigger.create({
          trigger: section,
          start: "top 60px",
          end: "bottom 60px",
          onEnter: () => {
            if (navEl) navEl.setAttribute("data-dark", String(isDark));
          },
          onEnterBack: () => {
            if (navEl) navEl.setAttribute("data-dark", String(isDark));
          },
        });
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, [isLoaderFinished]);

  return (
    <>
      <div className="relative w-full h-full">
        <Navbar />

        {/* ── 1. Hero Section ───────────────────────────────────────────── */}
        <section
          ref={heroRef}
          data-nav-dark="false"
          id="hero"
          className="h-screen w-full relative flex flex-col justify-between items-center pt-[8vw] max-md:pt-[40vw] max-md:h-[200vw] max-md:pb-[2vw]"
        >
          <div className="w-fit h-fit relative">
            <h1 className="text-[30vw] leading-[.8] text-center text-red text-stroke-180 font-mouse-memoirs max-md:text-[26vw] max-md:leading-[.85]">
              <span className="sr-only">THE BURGER</span>
              <span aria-hidden="true" className="inline-block">
                <span className="inline-block will-change-transform">THE</span>{" "}
                <span className="inline-block will-change-transform">BURGER</span>
              </span>
            </h1>
            <p className="absolute top-[10%] left-[10%] text-mustard-dark z-10 rotate-15 max-md:rotate-0 max-md:top-[2%] max-md:left-[2%] text-stroke-180 text-center text-[2.8vw] font-modak leading-[.9]! max-md:text-[6vw]">
              <span className="sr-only">SMASHED FRESH</span>
              <span aria-hidden="true">
                <span className="inline-block">SMASHED</span>
                <br />
                <span className="inline-block">FRESH</span>
              </span>
            </p>
            <p className="absolute bottom-[10%] right-[10%] text-mustard-dark z-10 -rotate-15 max-md:rotate-0 max-md:bottom-[2%] max-md:right-[2%] text-stroke-180 text-center text-[2.8vw] font-modak leading-[.9]! max-md:text-[6vw]">
              <span className="sr-only">BOLD FLAVOR</span>
              <span aria-hidden="true">
                <span className="inline-block">BOLD</span>
                <br />
                <span className="inline-block">FLAVOR</span>
              </span>
            </p>
          </div>

          {/* Rotating burger image */}
          <div className="size-[40vw] z-20 absolute top-[60%] -translate-y-[60%] left-1/2 -translate-x-1/2 max-md:size-[80vw] max-md:top-[110vw] max-md:-translate-y-[50%]">
            <div ref={burgerImgRef} className="w-full h-full opacity-0">
              <img
                alt="CRSP Artisan Smashed Burger with fresh ingredients"
                className="h-full w-full object-contain"
                src="/img-webp/burgerH.webp"
              />
            </div>
          </div>

          <p className="text-center text-[15vw] max-md:text-[20vw] font-modak uppercase mt-[15vw] relative z-20 max-md:z-20 text-stroke-180 text-[#F4A804] translate-y-[-9vw] max-md:mt-[6vw] max-md:absolute max-md:top-[133vw] max-md:-translate-y-1/2">
            <span className="sr-only">CRSP</span>
            <span aria-hidden="true">
              <span className="inline-block">CRSP</span>
            </span>
          </p>

          <div className="w-full absolute bottom-0 left-0 flex justify-between px-[2.5vw] py-[2vw] max-md:static max-md:flex-col max-md:gap-[4vw] max-md:items-center max-md:px-[5vw] max-md:py-0">
            <div className="w-[23vw] max-md:w-full">
              <p className="text40 leading-none max-md:text-center">
                <span className="inline-block opacity-0">
                  Smashed hot on the flat top, our prime patties lock in ultimate juiciness under a caramelized crust.
                </span>
              </p>
            </div>
            <div className="w-[23vw] max-md:w-full">
              <p className="text40 leading-none text-right max-md:text-center">
                <span className="inline-block opacity-0">
                  Topped with melted cheddar and our signature chili honey glaze crafted to satisfy your CRSPings since 1997.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. About Section ──────────────────────────────────────────── */}
        <section
          ref={aboutRef}
          id="about"
          className="h-fit overflow-clip self relative z-100 text-center space-y-[2vw] w-full max-md:space-y-[6vw] py-[6vw]"
        >
          <div className="space-y-[1vw] relative max-md:space-y-[6vw]">
            <p className="text-red z-100 max-md:rotate-0 relative top-[-1vw] max-md:top-0 -rotate-5 text-stroke-180 w-full text-center mx-auto text-[2.8vw] font-modak leading-[.9]! max-md:text-[8vw] max-md:w-fit max-md:mx-auto">
              TOP CLASSIC
            </p>
            <h2 className="text-stroke-180 max-md:w-full w-[70%] text-center mx-auto leading-[.75]! text-red heading300 uppercase">
              <span className="sr-only">juicy cheesy fully Loaded</span>
              <span aria-hidden="true">
                <span className="inline-block">juicy</span>{" "}
                <span className="inline-block">cheesy</span>{" "}
                <span className="inline-block">fully</span>{" "}
                <span className="inline-block">Loaded</span>
              </span>
            </h2>
            <p className="text-black text40 w-[45%] mt-[2vw] leading-[1.1] mx-auto max-md:w-[90%]">
              CRSP is back and bolder than ever. Honoring our rich roots, we bring you the ultimate smashed experience fully loaded, hot, and crafted fresh.
            </p>
          </div>

          <div className="mx-auto mt-[2vw] mb-[4vw] w-full max-md:mt-[6vw] max-md:mb-[8vw]">
            <Button href="/menu">Order Now</Button>
          </div>

          <div className="relative grid h-fit w-full place-items-center px-[10vw] pb-[6vw] max-md:px-[4vw] max-md:pb-[12vw]">
            <div className="absolute w-[15vw] max-md:w-[25vw] h-auto top-[-13vw] max-md:top-[-30vw] left-[5vw] max-md:-left-[4vw] z-50 drop-shadow-xl">
              <Sticker imageSrc="/img/burgerselfie.png" alt="Burger Selfie Sticker" rotate={0} />
            </div>
            <div className="grid grid-cols-3 gap-[1vw] justify-center mx-auto max-w-[70vw] max-md:flex max-md:flex-row max-md:flex-nowrap max-md:items-end max-md:justify-center max-md:gap-[2vw] max-md:w-full max-md:pt-[4vw] max-md:pb-[2vw]">
              <div className="h-[25vw] w-[20vw] rounded-[4%] overflow-hidden media-item max-md:origin-bottom max-md:w-[35vw] max-md:h-[38vw] max-md:shrink-0 md:rotate-[5deg] max-md:-rotate-12 max-md:translate-y-[3vw]" style={{ willChange: 'transform', cursor: 'pointer' }}>
                <img
                  alt="Chef preparing a fresh smashed burger"
                  className="h-full w-full object-cover"
                  src="/img-webp/about-1.webp"
                />
              </div>
              <div className="h-[25vw] w-[20vw] rounded-[4%] overflow-hidden media-item max-md:origin-bottom max-md:w-[35vw] max-md:h-[38vw] max-md:shrink-0 md:rotate-[-5deg] max-md:-translate-y-[6vw] max-md:z-10" style={{ willChange: 'transform', cursor: 'pointer' }}>
                <img
                  alt="Close-up of melted cheese on a burger patty"
                  className="h-full w-full object-cover"
                  src="/img-webp/about-2.webp"
                />
              </div>
              <div className="h-[25vw] w-[20vw] rounded-[4%] overflow-hidden media-item max-md:origin-bottom max-md:w-[35vw] max-md:h-[38vw] max-md:shrink-0 md:rotate-[8deg] max-md:rotate-12 max-md:translate-y-[3vw]" style={{ willChange: 'transform', cursor: 'pointer' }}>
                <img
                  alt="CRSP restaurant atmosphere"
                  className="h-full w-full object-cover"
                  src="/img-webp/about-3.webp"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Cheesy Divider Section ─────────────────────────────────── */}
        <CheesyDivider />

        {/* ── 4. Dripping Cheese Full Image ─────────────────────────────── */}
        <div className="h-[160vh] max-md:h-[70vh] w-full relative">
          <div className="z-99 w-full absolute left-0 right-0 overflow-x-clip max-md:left-0 max-md:right-0 top-0">
            <svg
              className="jelly pointer-events-none block w-full max-w-[100vw] h-[300px] max-md:h-auto"
              width="100%"
              viewBox="0 0 1536 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0"
                fill="#f91814"
              ></path>
            </svg>
          </div>
          <div className="z-99 w-full absolute left-0 right-0 overflow-x-clip max-md:left-0 max-md:right-0 bottom-[-.5vw] max-md:bottom-0 max-md:!bottom-[-7vw]">
            <svg
              className="jelly pointer-events-none block w-full max-w-[100vw] h-[300px] max-md:h-auto"
              width="100%"
              viewBox="0 0 1536 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M1536,300 H-1 V135 S184.32,235 460.8,145 S860.16,195 1121.28,163 S1413.12,195 1536,195 V300"
                fill="#f5e3cd"
              ></path>
            </svg>
          </div>
          <img
            alt="CRSP Signature Cheesy Burger with dripping cheese"
            className="h-full w-full object-cover"
            src="/img-webp/cheesyBurger.webp"
          />
        </div>

        {/* ── 5. Ingredients Section ────────────────────────────────────── */}
        <IngredientsSection />

        {/* ── 6. Locations Section ──────────────────────────────────────── */}
        <MapSection />

        {/* ── 7. CTA Section ────────────────────────────────────────────── */}
        <section
          ref={ctaSectionRef}
          id="cta"
          className="h-fit w-full pt-[18vw] max-md:pt-[12vw] overflow-clip relative bg-beige"
        >
          <div className="z-99 w-full absolute left-0 right-0 overflow-x-clip max-md:left-0 max-md:right-0 top-0">
            <svg
              className="jelly pointer-events-none block w-full max-w-[100vw] h-[300px] max-md:h-auto"
              width="100%"
              viewBox="0 0 1536 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0"
                fill="#ffd750"
              ></path>
            </svg>
          </div>
          <div className="h-screen my-[8vw] mt-0 flex items-center justify-center w-full relative max-md:my-[2vw] max-md:mt-0 max-md:h-fit max-md:flex-col max-md:gap-0 max-md:px-[2vw]">
            <div className="absolute z-222 bottom-[1vw] max-md:bottom-[65vw] max-md:left-[2vw] max-md:translate-x-0! -rotate-45 left-1/2 -translate-x-1/2 w-[35vw] h-auto max-md:w-[70vw] object-contain max-md:mb-[4vw]">
              <Sticker imageSrc="/img/burger-boy.png" alt="Burger Boy Sticker" rotate={0} />
            </div>
            <div className="w-[60vw] flex items-start gap-[2vw] justify-center flex-col self h-full max-md:w-full max-md:gap-[4vw] max-md:items-center max-md:h-fit px-[5vw]">
              <p className="text-red -rotate-7 ml-[.5vw] uppercase text-stroke-180 font-modak leading-[.9]! text60 max-md:rotate-0 max-md:ml-0 max-md:translate-y-0 max-md:text-center">
                FEEL IT
              </p>
              <h2 className="text-red text-stroke-180 heading300 uppercase leading-[.75] max-md:leading-[.85]! max-md:text-[10vw] max-md:text-center">
                feel the Change
              </h2>
              <p className="text40 w-[35vw] font-mouse-memoirs leading-[1.1] max-md:w-full max-md:text-[4vw] max-md:text-center text-black/80">
                Smashed for the bold, built for the hungry. Dive into a legendary craft experience where every crispy edge and juicy layer rules.
              </p>
              <div className="max-md:w-full max-md:flex max-md:justify-center pt-[2vw]">
                <Button href="/menu" className="hover:scale-105 transition-transform">
                  Order Now
                </Button>
              </div>
            </div>
            <div className="w-[45vw] rounded-[2vw] overflow-hidden h-[60vw] max-md:w-full max-md:h-[40vh] max-md:min-h-[40vw] max-md:rounded-[4vw] shadow-2xl">
              <img alt="Premium smashed burger on a wooden board" className="h-full w-full object-cover" src="/img-webp/cta.webp" />
            </div>
          </div>
        </section>

        {/* ── 8. Footer ─────────────────────────────────────────────────── */}
        <Footer />
      </div>
    </>
  );
}
