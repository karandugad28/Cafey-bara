"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const juggleItems = [
  { src: "/img-webp/lettuce.webp", alt: "lettuce", size: 11, lane: 12 },
  { src: "/img-webp/tomato.webp", alt: "tomato", size: 9, lane: 34 },
  { src: "/img-webp/cheese-logo.webp", alt: "cheese", size: 12, lane: 56 },
  { src: "/img-webp/meat.webp", alt: "patty", size: 13, lane: 80 },
];

const links = [
  { label: "Home", href: "/" },
  { label: "Burgers", href: "/menu" },
  { label: "Spices", href: "/spices" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const juggleRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const items = juggleRefs.current.filter(Boolean) as HTMLImageElement[];
      if (!items.length) return;

      const activeTimelines = new Set<gsap.core.Timeline>();

      // Desktop config
      const restVH = 22;
      const apex = [38, 60] as const;
      const driftStart = [2, 7] as const;
      const driftEnd = [8, 24] as const;
      const upDur = [0.9, 1.3] as const;
      const gravityRatio = [1.15, 1.5] as const;
      const spin = [220, 600] as const;
      const repeatDelay = [0.2, 0.9] as const;
      const staggerStart = 0.55;

      gsap.set(items, {
        xPercent: -50,
        x: 0,
        y: `${restVH}vh`,
        rotation: 0,
        opacity: 0,
        scale: 0.9,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      const juggle = (el: HTMLImageElement) => {
        const t = gsap.utils.random(apex[0], apex[1]);
        const r = Math.random() > 0.5 ? 1 : -1;
        const n = -(gsap.utils.random(driftStart[0], driftStart[1]) * r);
        const o = gsap.utils.random(driftEnd[0], driftEnd[1]) * r;
        const l = gsap.utils.random(upDur[0], upDur[1]);
        const c = l * gsap.utils.random(gravityRatio[0], gravityRatio[1]);
        const d = l + c;
        const h = gsap.utils.random(spin[0], spin[1]) * (Math.random() > 0.5 ? 1 : -1);
        const f = gsap.utils.random(repeatDelay[0], repeatDelay[1]);

        gsap.set(el, { x: `${n}vw`, y: `${restVH}vh`, rotation: 0, opacity: 0, scale: 0.9 });
        const tl = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            activeTimelines.delete(tl);
            gsap.delayedCall(f, () => juggle(el));
          },
        });
        activeTimelines.add(tl);
        tl.to(el, { opacity: 1, scale: 1, duration: 0.18, ease: "power1.out" }, 0)
          .to(el, { y: `${-t}vh`, duration: l, ease: "power2.out" }, 0)
          .to(el, { y: `${restVH}vh`, duration: c, ease: "power2.in" }, l)
          .to(el, { x: `${o}vw`, duration: d, ease: "sine.inOut" }, 0)
          .to(el, { rotation: h, duration: d, ease: "none" }, 0)
          .to(el, { opacity: 0, duration: 0.25, ease: "power1.in" }, d - 0.25);
      };

      items.forEach((el, idx) => {
        const delay = idx * staggerStart + gsap.utils.random(0, 0.4);
        gsap.delayedCall(delay, () => juggle(el));
      });

      const handleVisibility = () => {
        if (document.hidden) {
          activeTimelines.forEach((tl) => tl.pause());
        } else {
          activeTimelines.forEach((tl) => tl.play());
        }
      };

      document.addEventListener("visibilitychange", handleVisibility);

      // CRSP big text animation
      gsap.fromTo(
        ".footer-CRSP-char",
        { opacity: 0, y: 100, scale: 0.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(2.6)",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
          },
        }
      );

      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
        activeTimelines.forEach((tl) => tl.kill());
        activeTimelines.clear();
      };
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="h-fit w-full overflow-hidden self relative">
      <div className="relative z-30 flex items-center justify-between gap-[2vw] pb-[1vw] max-md:flex-col max-md:items-center max-md:gap-[4vw] max-md:pb-[6vw]">
        <nav className="flex flex-wrap items-center gap-x-[2vw] gap-y-[.6vw] max-md:gap-x-[5vw] max-md:gap-y-[2vw]" aria-label="Footer navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text40 uppercase font-mouse-memoirs hover:text-red transition-colors text-black">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text40 max-md:hidden uppercase opacity-80 font-mouse-memoirs text-black">
          © {new Date().getFullYear()} CRSP — All rights reserved
        </p>
      </div>

      <div className="relative z-30 max-md:hidden pt-[1vw] opacity-80 max-md:pt-[4vw] border-t border-black/10">
        <p className="text40 uppercase font-mouse-memoirs text-center text-black/60">
          Smashed patties · toasted buns · est. 1997
        </p>
      </div>

      <div className="mt-[10vw] relative min-h-[18vw] max-md:mt-[5vw] w-full">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 z-20" aria-hidden="true">
          {juggleItems.map((item, idx) => (
            <img
              key={item.src}
              ref={(el) => { juggleRefs.current[idx] = el; }}
              src={item.src}
              alt={item.alt}
              draggable={false}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${item.lane}%`,
                width: `calc(${item.size}vw * 1)`,
                opacity: 0,
                userSelect: "none",
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
        <h2 className="heading600 leading-[.5] translate-y-[5vw] max-md:translate-y-0 text-center text-red text-stroke z-10 relative flex justify-center w-full">
          {["C", "R", "S", "P"].map((char, idx) => (
            <span key={idx} className="footer-CRSP-char inline-block will-change-transform">
              {char}
            </span>
          ))}
        </h2>
      </div>

      <div className="relative z-30 pt-[1vw] max-md:pt-[4vw] md:hidden">
        <p className="text40 uppercase font-mouse-memoirs opacity-80 text-center text-black">
          © {new Date().getFullYear()} CRSP — All rights reserved
        </p>
      </div>
    </footer>
  );
}
