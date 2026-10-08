"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StickerProps {
  imageSrc: string;
  alt?: string;
  rotate?: number;
  triggers?: [string, string];
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  width?: string | number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  peelDirection?: number;
  className?: string;
}

export default function Sticker({
  imageSrc,
  alt = "",
  rotate = 0,
  triggers = ["-120% 50%", "30% 50%"],
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = "power3.out",
  peelHoverEasing = "power2.out",
  width = "100%",
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  peelDirection = 0,
  className = "",
}: StickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<SVGFEPointLightElement>(null);
  const lightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const [simpleEffects, setSimpleEffects] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isCoarse || isSafari) {
        setSimpleEffects(true);
      }
    }
  }, []);

  useEffect(() => {
    if (simpleEffects) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (lightRef.current) {
        gsap.set(lightRef.current, { attr: { x, y } });
      }
      if (lightFlippedRef.current) {
        if (Math.abs(peelDirection % 360) !== 180) {
          gsap.set(lightFlippedRef.current, { attr: { x, y: rect.height - y } });
        } else {
          gsap.set(lightFlippedRef.current, { attr: { x: -1000, y: -1000 } });
        }
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove as EventListener);
      return () => el.removeEventListener("mousemove", handleMouseMove as EventListener);
    }
  }, [peelDirection, simpleEffects]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const addTouch = () => el.classList.add("touch-active");
    const removeTouch = () => el.classList.remove("touch-active");
    el.addEventListener("touchstart", addTouch);
    el.addEventListener("touchend", removeTouch);
    el.addEventListener("touchcancel", removeTouch);
    return () => {
      el.removeEventListener("touchstart", addTouch);
      el.removeEventListener("touchend", removeTouch);
      el.removeEventListener("touchcancel", removeTouch);
    };
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const targetObj = { peel: 1 };
    const st = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: triggers[0],
        end: triggers[1],
        scrub: 1,
        markers: false,
      },
    });
    st.to(targetObj, {
      peel: 0,
      ease: "none",
      onUpdate: () => {
        el.style.setProperty("--peel-amount", String(targetObj.peel));
      },
    });
    return () => {
      st.kill();
    };
  }, [triggers]);

  const styleObj = useMemo(
    () =>
      ({
        "--sticker-rotate": `${rotate}deg`,
        "--sticker-p": "20%",
        "--sticker-peelback-hover": `${peelBackHoverPct}%`,
        "--sticker-peelback-active": `${peelBackActivePct}%`,
        "--sticker-peel-easing": peelEasing,
        "--sticker-peel-hover-easing": peelHoverEasing,
        "--sticker-width": typeof width === "number" ? `${width}px` : width,
        "--sticker-shadow-opacity": shadowIntensity,
        "--sticker-lighting-constant": lightingIntensity,
        "--peel-direction": `${peelDirection}deg`,
        "--peel-amount": 1,
      } as React.CSSProperties),
    [rotate, peelBackHoverPct, peelBackActivePct, peelEasing, peelHoverEasing, width, shadowIntensity, lightingIntensity, peelDirection]
  );

  return (
    <div
      className={`${className} ${simpleEffects ? "simple-effects" : ""}`}
      ref={wrapperRef}
      style={styleObj}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="pointLight">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity}
              lightingColor="white"
            >
              <fePointLight ref={lightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id="pointLightFlipped">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lightingIntensity * 7}
              lightingColor="white"
            >
              <fePointLight ref={lightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id="dropShadow">
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation={shadowIntensity * 3}
              floodColor="black"
              floodOpacity={shadowIntensity}
            />
          </filter>
          <filter id="expandAndFill">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>
      <div className="sticker-container hover:scale-110 transition-transform duration-300" ref={containerRef}>
        <div className="sticker-main">
          <div className="sticker-lighting">
            <img
              src={imageSrc}
              alt={alt}
              className="sticker-image w-full h-auto"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
        <div className="flap">
          <div className="flap-lighting">
            <img
              src={imageSrc}
              alt={alt}
              className="flap-image w-full h-auto"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
