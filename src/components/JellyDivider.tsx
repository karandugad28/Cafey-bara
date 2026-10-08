"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface JellyDividerProps {
  fill?: string;
  flip?: boolean;
  className?: string;
}

export default function JellyDivider({ fill = "#f5e3cd", flip = false, className = "" }: JellyDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const pathEl = pathRef.current;
      if (!pathEl) return;

      const animObj = flip
        ? { v: 165, s1c: 235, s1e: 145, s2c: 195, s2e: 163, s3c: 195, s3e: 195 }
        : { v: 135, s1c: 65, s1e: 155, s2c: 105, s2e: 137, s3c: 105, s3e: 105 };

      const getPathStr = () =>
        flip
          ? `M1536,300 H-1 V${300 - animObj.v} S184.32,${300 - animObj.s1c} 460.8,${300 - animObj.s1e} S860.16,${300 - animObj.s2c} 1121.28,${300 - animObj.s2e} S1413.12,${300 - animObj.s3c} 1536,${300 - animObj.s3e} V300`
          : `M1536,0 H-1 V${animObj.v} S184.32,${animObj.s1c} 460.8,${animObj.s1e} S860.16,${animObj.s2c} 1121.28,${animObj.s2e} S1413.12,${animObj.s3c} 1536,${animObj.s3e} V0`;

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      if (flip) {
        tl.to(animObj, { v: 145, s1c: 215, s1e: 155, duration: 1, ease: "sine.inOut", onUpdate: () => pathEl.setAttribute("d", getPathStr()) }, 0)
          .to(animObj, { s2c: 175, s2e: 140, duration: 2, ease: "sine.inOut", onUpdate: () => pathEl.setAttribute("d", getPathStr()) }, 0.3)
          .to(animObj, { s3c: 170, s3e: 200, duration: 1.8, ease: "sine.inOut", onUpdate: () => pathEl.setAttribute("d", getPathStr()) }, 0.6);
      } else {
        tl.to(animObj, { v: 155, s1c: 45, s1e: 175, duration: 1, ease: "sine.inOut", onUpdate: () => pathEl.setAttribute("d", getPathStr()) }, 0)
          .to(animObj, { s2c: 85, s2e: 160, duration: 2, ease: "sine.inOut", onUpdate: () => pathEl.setAttribute("d", getPathStr()) }, 0.3)
          .to(animObj, { s3c: 130, s3e: 80, duration: 1.8, ease: "sine.inOut", onUpdate: () => pathEl.setAttribute("d", getPathStr()) }, 0.6);
      }

      const c = containerRef.current;
      if (c) {
        gsap.set(c, { transformOrigin: flip ? "bottom center" : "top center" });
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          gsap.to(c, {
            scaleY: 1.5,
            scrollTrigger: {
              trigger: c,
              start: flip ? "bottom 80%" : "top 80%",
              end: flip ? "top 20%" : "bottom 20%",
              scrub: 1,
            },
          });
        });
        mm.add("(max-width: 767px)", () => {
          gsap.to(c, {
            scaleY: 1.2,
            scrollTrigger: {
              trigger: c,
              start: flip ? "bottom 95%" : "top 90%",
              end: flip ? "top 15%" : "bottom 10%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, [flip]);

  return (
    <div ref={containerRef} className={`z-99 w-full absolute left-0 right-0 overflow-x-clip ${flip ? "bottom-0" : "top-0"} ${className}`}>
      <svg
        className="jelly pointer-events-none block w-full max-w-[100vw] h-[300px] max-md:h-[150px]"
        width="100%"
        viewBox="0 0 1536 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d={flip ? "M1536,300 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V300" : "M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0"}
          fill={fill}
        ></path>
      </svg>
    </div>
  );
}
