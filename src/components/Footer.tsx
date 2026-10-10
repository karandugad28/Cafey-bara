"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const juggleItems = [
  { src: "/cafe/matcha-coffee.png", alt: "matcha", size: 11, lane: 12 },
  { src: "/img-webp/tomato.webp", alt: "pastry", size: 9, lane: 34 },
  { src: "/cafe/cheesecake.png", alt: "cheesecake", size: 12, lane: 56 },
  { src: "/cafe/coffee-late.png", alt: "coffee", size: 13, lane: 80 },
];

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu.pdf" },
  { label: "Our Blends", href: "/spices" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ theme = "light", reveal = false }: { theme?: "light" | "dark"; reveal?: boolean }) {
  const footerRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
  }, [reveal]);

  const textColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = theme === "dark" ? "border-white/10" : "border-black/10";

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Parallax overlay effect for main content
      const mainContent = document.querySelector(".main-content");
      if (mainContent) {
        gsap.to(mainContent, {
          y: 200,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Capey Bara big text animation
      gsap.fromTo(
        ".footer-Capey Bara-char",
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
            start: "top 70%",
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, [reveal]);

  const footerContent = (
    <footer ref={footerRef} className={`w-full overflow-hidden self pt-8 px-6 md:px-16 flex flex-col font-oswald text-red relative z-50 bg-beige shadow-[0_-20px_50px_rgba(0,0,0,0.15)]`}>
      
      {/* Huge Retro Text */}
      <div className="relative w-full flex flex-col items-center mt-2 mb-16 md:mb-20 z-30">
        <h2 
          className="text-[17vw] md:text-[15vw] font-playfair uppercase leading-[.8] text-center w-full relative z-20 text-red"
          style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1), 8px 8px 0px rgba(0,0,0,0.05)' }}
        >
          {["C", "A", "P", "E", "Y", "\u00A0", "B", "A", "R", "A"].map((char, idx) => (
            <span key={idx} className="footer-Capey Bara-char inline-block will-change-transform">
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Single Links Row */}
      <div className="flex flex-row flex-wrap justify-center items-center w-full uppercase font-mouse-memoirs text-2xl md:text-3xl gap-6 md:gap-10 mb-10 md:mb-12 z-30 opacity-90 text-center">
        <a href="#" aria-label="Instagram" className="hover:text-mustard transition-colors flex-shrink-0">
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="/" className="hover:text-mustard transition-colors tracking-wide">Home</a>
        <a href="/#about" className="hover:text-mustard transition-colors tracking-wide">About</a>
        <a href="/gallery" className="hover:text-mustard transition-colors tracking-wide">Gallery</a>
        <a href="/#map" className="hover:text-mustard transition-colors tracking-wide">Locations</a>
        <a href="/contact" className="hover:text-mustard transition-colors tracking-wide">Contact</a>
      </div>
      
      {/* Horizontal Cafe Illustrations */}
      <div className="relative w-full overflow-hidden flex justify-center items-end z-10 pointer-events-none mix-blend-multiply opacity-90 -mt-[15vw] md:-mt-[22vw] -mb-[12vw] md:-mb-[18vw]">
        <img 
          src="/cafe/horizontal_cafe.jpg" 
          alt="Horizontal Cafe Vibe Illustrations" 
          className="w-full md:w-[90%] max-w-[1400px] h-auto object-contain object-bottom mix-blend-multiply opacity-90" 
        />
      </div>
    </footer>
  );

  return footerContent;
}


