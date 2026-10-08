"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navDark, setNavDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const sRef = useRef<HTMLSpanElement>(null);

  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const burgerTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);

    if (href.startsWith("#") || href.includes("#")) {
      const hash = href.split("#")[1];
      const targetId = `#${hash}`;

      if (pathname === "/") {
        e.preventDefault();
        let targetEl: HTMLElement | null = null;
        if (targetId === "#map") {
          const isMobile = window.matchMedia("(max-width: 1025px)").matches;
          targetEl = document.querySelector(isMobile ? "#map-mobile" : "#map-desktop");
        } else {
          targetEl = document.querySelector(targetId);
        }

        if (targetEl) {
          const navHeight = navRef.current?.offsetHeight ?? 0;
          gsap.to(window, {
            duration: 0.9,
            ease: "power3.inOut",
            scrollTo: { y: targetEl, offsetY: navHeight + 12 },
          });
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    setNavDark(false);
    const darkSections = document.querySelectorAll('[data-nav-dark="true"]');
    const triggers: ScrollTrigger[] = [];
    darkSections.forEach((sec) => {
      const st = ScrollTrigger.create({
        trigger: sec,
        start: "top 5%",
        end: "bottom 5%",
        onEnter: () => setNavDark(true),
        onEnterBack: () => setNavDark(true),
        onLeave: () => setNavDark(false),
        onLeaveBack: () => setNavDark(false),
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [pathname]);

  // Menu Backdrop + Container Timeline
  useEffect(() => {
    const backdrop = backdropRef.current;
    const menu = menuRef.current;
    const itemsContainer = menuItemsRef.current;
    if (!backdrop || !menu) return;

    if (!menuTimelineRef.current) {
      gsap.set(backdrop, { opacity: 0, pointerEvents: "none" });
      gsap.set(menu, { opacity: 0, scale: 0.3, transformOrigin: "top right" });

      const tl = gsap.timeline({ paused: true, defaults: { overwrite: "auto" } });
      tl.add(() => gsap.set(backdrop, { pointerEvents: "auto" }), 0)
        .to(backdrop, { opacity: 1, duration: 0.28, ease: "power2.out" }, 0)
        .to(menu, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.5)" }, 0.3)
        .fromTo(
          itemsContainer?.children || [],
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.38, stagger: 0.06, ease: "power3.out" },
          0.14
        );

      tl.eventCallback("onReverseComplete", () => {
        gsap.set(backdrop, { pointerEvents: "none" });
      });

      menuTimelineRef.current = tl;
    }

    if (menuOpen) {
      menuTimelineRef.current.play();
    } else {
      menuTimelineRef.current.reverse();
    }
  }, [menuOpen]);

  // Burger icon lines animation timeline
  useEffect(() => {
    const top = bRef.current;
    const mid = yRef.current;
    const bot = sRef.current;
    if (!top || !mid || !bot) return;

    const createIconTimeline = () => {
      burgerTimelineRef.current?.kill();
      gsap.set([top, mid, bot], { clearProps: "transform,top,bottom,opacity,scaleX" });
      gsap.set(top, { top: 0, bottom: "auto" });
      gsap.set(mid, { opacity: 1, scaleX: 1 });
      gsap.set(bot, { top: "auto", bottom: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: "power3.inOut" } });
      tl.to(top, { top: "50%", yPercent: -50, rotation: 45, transformOrigin: "50% 50%" }, 0)
        .to(bot, { top: "50%", bottom: "auto", yPercent: -50, rotation: -45, transformOrigin: "50% 50%" }, 0)
        .to(mid, { opacity: 0, scaleX: 0, transformOrigin: "50% 50%" }, 0);
      return tl;
    };

    burgerTimelineRef.current = createIconTimeline();
    if (menuOpen) {
      burgerTimelineRef.current.progress(1);
    }

    let resizeTimer = 0;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const prog = burgerTimelineRef.current?.progress() ?? 0;
        burgerTimelineRef.current = createIconTimeline();
        burgerTimelineRef.current.progress(prog);
      }, 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      burgerTimelineRef.current?.kill();
      burgerTimelineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (burgerTimelineRef.current) {
      if (menuOpen) {
        burgerTimelineRef.current.play();
      } else {
        burgerTimelineRef.current.reverse();
      }
    }
  }, [menuOpen]);

  // Click outside to close menu
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      {/* Menu Overlay Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-[998] bg-red/30 backdrop-blur-md"
        style={{ opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      ></div>

      {/* Navigation Bar */}
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-[999] flex items-center justify-between px-[2.5vw] max-md:px-[4vw] py-[1vw] max-md:py-[4vw]">
        <a
          className="font-modak hover:scale-105 transition-all duration-300 text-red text-stroke-small text-[4vw] max-md:text-[10vw] leading-none"
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              handleNavClick(e, "/#hero");
            }
          }}
        >
          CRSP
        </a>
        <div className="flex items-center gap-[1vw] max-md:gap-[3vw]">
          <a
            className="font-mouse-memoirs hover:scale-105 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide text-beige bg-red px-[1.6vw] py-[.5vw] max-md:px-[5vw] max-md:py-[1.8vw] group rounded-full hover:bg-black"
            data-cursor-hide="true"
            href="/menu"
          >
            <span className="overflow-hidden relative inline-block group">
              <span className="block group-hover:-translate-y-full translate-y-0 transition-all duration-300">
                Burgers
              </span>
              <span
                className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-all duration-300"
                aria-hidden="true"
              >
                Burgers
              </span>
            </span>
          </a>
          <div className="relative">
            <button
              data-cursor-hide="true"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className={`hover:scale-105 flex items-center gap-[.6vw] max-md:gap-[2vw] px-[1.4vw] py-[.5vw] max-md:px-[4vw] group max-md:py-[1.8vw] rounded-full cursor-pointer transition-all duration-400 border-[.15vw] max-md:border-[.4vw] ${menuOpen ? "bg-red border-red" : navDark ? "bg-transparent border-white/20 hover:border-white" : "bg-transparent border-black/20 hover:border-black"
                }`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="main-menu"
            >
              <span className={`font-mouse-memoirs flex items-center justify-center uppercase text-[1.3vw] max-md:text-[4vw] tracking-wide transition-colors duration-300 ${menuOpen ? "text-beige" : navDark ? "text-white" : "text-black"
                }`}>
                <span className="overflow-hidden relative inline-block group">
                  <span className="block group-hover:-translate-y-full translate-y-0 transition-all duration-300">
                    {menuOpen ? "Close" : "Menu"}
                  </span>
                  <span
                    className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-all duration-300"
                    aria-hidden="true"
                  >
                    {menuOpen ? "Close" : "Menu"}
                  </span>
                </span>
              </span>
              <div
                className="relative shrink-0 w-[1.2vw] h-[1.2vw] max-md:w-[3.5vw] max-md:h-[3.5vw]"
                aria-hidden="true"
              >
                <span ref={bRef} className={`${menuOpen ? "bg-beige" : navDark ? "bg-white" : "bg-black"} absolute left-0 top-0 block w-full h-[.15vw] max-md:h-[.5vw] rounded-full origin-center`}></span>
                <span ref={yRef} className={`${menuOpen ? "bg-beige" : navDark ? "bg-white" : "bg-black"} absolute left-0 top-1/2 block w-[70%] h-[.15vw] max-md:h-[.5vw] rounded-full origin-center -translate-y-1/2`}></span>
                <span ref={sRef} className={`${menuOpen ? "bg-beige" : navDark ? "bg-white" : "bg-black"} absolute left-0 bottom-0 block w-full h-[.15vw] max-md:h-[.5vw] rounded-full origin-center`}></span>
              </div>
            </button>
            <div
              ref={menuRef}
              id="main-menu"
              role="menu"
              className="absolute top-[calc(100%+1vw)] right-0 w-[18vw] max-md:w-[91vw] bg-red rounded-[1.2vw] max-md:rounded-[4vw] p-[2vw] max-md:mt-[5vw] max-md:p-[6vw] shadow-[0_1vw_3vw_rgba(27,27,27,.25)]"
              style={{ opacity: 0, scale: 0.3, transformOrigin: "top right", pointerEvents: menuOpen ? "auto" : "none" }}
            >
              <div ref={menuItemsRef} className="flex flex-col gap-[.6vw] max-md:gap-[2vw]">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/#about" },
                  { label: "Our Spices", href: "/spices" },
                  { label: "Locations", href: "/#map" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <a
                    key={item.label}
                    role="menuitem"
                    className="font-modak text-[2.4vw] max-md:text-[8vw] text-beige leading-[1.1] uppercase hover:text-mustard hover:scale-105 transition-transform duration-300 transform inline-block"
                    href={item.href.startsWith("#") ? "/" : item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("/#") || item.href.startsWith("#")) {
                        handleNavClick(e, item.href);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-[1.5vw] max-md:mt-[4vw] pt-[1vw] max-md:pt-[3vw] border-t border-beige/20">
                <p className="font-mouse-memoirs text-[.9vw] max-md:text-[3.5vw] text-beige/85 uppercase tracking-[.2em]">
                  Est. 1997 — Navarra, España
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
