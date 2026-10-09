"use client";


import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useAnimation } from "@/context/AnimationContext";


const burgerLayers = [
  {
    id: "saucer",
    component: () => (
      <svg className="size-full" viewBox="0 0 2000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1000" cy="400" rx="900" ry="300" fill="#1B4F8A" stroke="#4C0016" strokeWidth="40" />
        <ellipse cx="1000" cy="400" rx="600" ry="200" fill="#2C6FAC" stroke="#4C0016" strokeWidth="20" />
        <ellipse cx="1000" cy="400" rx="400" ry="120" fill="#153b69" />
      </svg>
    ),
    alt: "Saucer",
    width: "w-[96%]",
    height: "h-[25%]",
    bottom: "0%",
    zIndex: 10,
    rotate: 0,
    label: "PLACING THE CERAMIC SAUCER..."
  },
  {
    id: "mug-base",
    component: () => (
      <svg className="size-full" viewBox="0 0 2000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 500,600 C 500,900 1500,900 1500,600 L 1550,100 C 1550,-100 450,-100 450,100 Z" fill="#F5E3CD" stroke="#4C0016" strokeWidth="40" />
        <path d="M 500,600 C 500,900 1500,900 1500,600 C 1500,300 500,300 500,600 Z" fill="#e3cbb0" />
      </svg>
    ),
    alt: "Mug Base",
    width: "w-[70%]",
    height: "h-[30%]",
    bottom: "12%",
    zIndex: 11,
    rotate: -2,
    label: "WARMING THE MUG..."
  },
  {
    id: "mug-middle",
    component: () => (
      <svg className="size-full" viewBox="0 0 2000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 1500,200 C 1900,200 1900,700 1500,700 C 1700,700 1700,300 1500,300 Z" fill="#D4A853" stroke="#4C0016" strokeWidth="40" />
        <path d="M 450,700 C 450,900 1550,900 1550,700 L 1600,100 C 1600,-100 400,-100 400,100 Z" fill="#F5E3CD" stroke="#4C0016" strokeWidth="40" />
      </svg>
    ),
    alt: "Mug Middle",
    width: "w-[75%]",
    height: "h-[30%]",
    bottom: "28%",
    zIndex: 12,
    rotate: 1,
    label: "BREWING ESPRESSO SHOT..."
  },
  {
    id: "mug-top",
    component: () => (
      <svg className="size-full" viewBox="0 0 2000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 350,500 C 350,700 1650,700 1650,500 L 1650,200 C 1650,0 350,0 350,200 Z" fill="#F5E3CD" stroke="#4C0016" strokeWidth="40" />
        <ellipse cx="1000" cy="200" rx="650" ry="180" fill="#e3cbb0" stroke="#4C0016" strokeWidth="30" />
      </svg>
    ),
    alt: "Mug Top",
    width: "w-[80%]",
    height: "h-[25%]",
    bottom: "45%",
    zIndex: 13,
    rotate: -1,
    label: "STEAMING OAT MILK..."
  },
  {
    id: "latte-art",
    component: () => (
      <svg className="size-full" viewBox="0 0 2000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="1000" cy="300" rx="600" ry="160" fill="#4a2511" stroke="#4C0016" strokeWidth="20" />
        <path d="M 1000,400 C 1000,400 800,250 800,150 C 800,50 950,50 1000,150 C 1050,50 1200,50 1200,150 C 1200,250 1000,400 1000,400 Z" fill="#F5E3CD" />
      </svg>
    ),
    alt: "Latte Art",
    width: "w-[76%]",
    height: "h-[20%]",
    bottom: "60%",
    zIndex: 14,
    rotate: 2,
    label: "POURING LATTE ART..."
  },
  {
    id: "steam",
    component: () => (
      <svg className="size-full" viewBox="0 0 2000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 800,700 C 700,500 900,300 800,100" stroke="#ffffff" strokeWidth="60" strokeLinecap="round" opacity="0.6" fill="none" />
        <path d="M 1000,800 C 900,600 1100,400 1000,200" stroke="#ffffff" strokeWidth="80" strokeLinecap="round" opacity="0.8" fill="none" />
        <path d="M 1200,700 C 1100,500 1300,300 1200,100" stroke="#ffffff" strokeWidth="60" strokeLinecap="round" opacity="0.6" fill="none" />
      </svg>
    ),
    alt: "Steam",
    width: "w-[50%]",
    height: "h-[35%]",
    bottom: "75%",
    zIndex: 15,
    rotate: 0,
    label: "READY TO SERVE YOUR CAPEY BARA!"
  }
];

const seedParticles = Array.from({ length: 14 }, (e, t) => ({
  id: t,
  color: t % 3 === 0 ? "#4a2511" : t % 3 === 1 ? "#633214" : "#F5E3CD",
  size: t % 2 === 0 ? "w-2 h-2 md:w-3 md:h-3" : "w-3 h-3 md:w-4 md:h-4"
}));

export default function Loader() {
  const lenis = useLenis();
  const { setLoaderFinished } = useAnimation();
  const [show, setShow] = useState(true);
  const [progressVal, setProgressVal] = useState(0);
  const [loadingText, setLoadingText] = useState("WARMING UP THE CAFE...");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const layersRefs = useRef<(HTMLDivElement | null)[]>([]);
  const seedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  const curtain1Ref = useRef<SVGPathElement>(null);
  const curtain2Ref = useRef<SVGPathElement>(null);
  const curtain3Ref = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (lenis) {
      lenis.stop();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (lenis) {
            lenis.start();
            lenis.scrollTo("top", { immediate: true });
          }
          setShow(false);
          setLoaderFinished(true);
        }
      });

      const curtain1 = { yLeft: 101, yRight: 101, yCenter: 101 };
      const curtain2 = { yLeft: 101, yRight: 101, yCenter: 101 };
      const curtain3 = { yLeft: 101, yRight: 101, yCenter: 101 };

      // Set initial states
      gsap.set(layersRefs.current, { y: -800, opacity: 0, scale: 0.8 });
      gsap.set(burgerRef.current, { scaleX: 1, scaleY: 1 });
      gsap.set(textRef.current, { opacity: 1, y: 0 });

      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: () => {
          setProgressVal(Math.floor(progressObj.value));
        }
      }, 0);

      // Animate burger layers landing and squishing
      burgerLayers.forEach((layer, i) => {
        const landTime = 0.22 * i;
        const rotateTime = landTime + 0.32;

        tl.call(() => setLoadingText(layer.label), undefined, landTime + 0.05);

        tl.fromTo(
          layersRefs.current[i],
          { y: -800, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power1.in" },
          landTime
        );

        tl.fromTo(
          layersRefs.current[i],
          { rotate: layer.rotate + (Math.random() > 0.5 ? 12 : -12) },
          { rotate: layer.rotate, duration: 0.45, ease: "back.out(2.5)" },
          rotateTime
        );

        tl.to(burgerRef.current, { scaleY: 0.88, scaleX: 1.06, duration: 0.06, ease: "power2.out" }, rotateTime);
        tl.to(burgerRef.current, { scaleY: 1.03, scaleX: 0.98, duration: 0.08, ease: "power1.inOut" }, rotateTime + 0.06);
        tl.to(burgerRef.current, { scaleY: 1, scaleX: 1, duration: 0.12, ease: "power2.out" }, rotateTime + 0.14);
      });

      // Spray seed particles when the stack completes
      const completedTime = 1.1 + 0.32;
      tl.call(() => {
        seedRefs.current.forEach((seed, index) => {
          if (!seed) return;
          const angle = (index / seedParticles.length) * Math.PI * 2;
          const distance = 110 + 90 * Math.random();
          const targetX = Math.cos(angle) * distance;
          const targetY = Math.sin(angle) * distance - 30;

          gsap.fromTo(
            seed,
            { x: 0, y: 0, scale: 0, opacity: 1 },
            {
              x: targetX,
              y: targetY,
              scale: 1.5 * Math.random() + 0.6,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out"
            }
          );
        });
      }, undefined, completedTime);

      // Lift completed burger slightly and bounce it
      tl.to(burgerRef.current, {
        y: -50,
        scale: 1.08,
        rotate: 2,
        duration: 0.4,
        ease: "power2.out"
      }, completedTime + 0.3)
        .to(burgerRef.current, {
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: "bounce.out"
        });

      tl.call(() => setLoadingText("READY TO BREW!"), undefined, completedTime + 0.3);

      const curtainsOutTime = completedTime + 1.2;

      // Animate text & progress bar out
      tl.to([textRef.current, ".loader-bar"], {
        y: 50,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          if (lenis) {
            lenis.scrollTo("top", { immediate: true });
          }
        }
      }, curtainsOutTime - 0.4);

      // Animate burger stack out
      tl.to(burgerRef.current, {
        y: -1000,
        opacity: 0,
        scale: 0.9,
        duration: 0.75,
        ease: "power2.in"
      }, curtainsOutTime);

      // Slide layered colored curtains up out of screen
      // Curtain 1 (fill #f91814)
      tl.to(curtain1, { yLeft: -1, yRight: -1, duration: 0.8, ease: "power2.inOut" }, curtainsOutTime)
        .to(curtain1, {
          yCenter: -1,
          duration: 1.1,
          ease: "power4.inOut",
          onUpdate: () => {
            if (curtain1Ref.current) {
              curtain1Ref.current.setAttribute("d", `M -1 -1 L 101 -1 L 101 ${curtain1.yRight} Q 50 ${curtain1.yCenter} -1 ${curtain1.yLeft} Z`);
            }
          }
        }, curtainsOutTime);

      // Curtain 2 (fill #EF6F2E)
      const curtain2Start = curtainsOutTime + 0.12;
      tl.to(curtain2, { yLeft: -1, yRight: -1, duration: 0.8, ease: "power2.inOut" }, curtain2Start)
        .to(curtain2, {
          yCenter: -1,
          duration: 1.1,
          ease: "power4.inOut",
          onUpdate: () => {
            if (curtain2Ref.current) {
              curtain2Ref.current.setAttribute("d", `M -1 -1 L 101 -1 L 101 ${curtain2.yRight} Q 50 ${curtain2.yCenter} -1 ${curtain2.yLeft} Z`);
            }
          }
        }, curtain2Start);

      // Curtain 3 (fill #4C0016)
      const curtain3Start = curtainsOutTime + 0.24;
      tl.to(curtain3, { yLeft: -1, yRight: -1, duration: 0.8, ease: "power2.inOut" }, curtain3Start)
        .to(curtain3, {
          yCenter: -1,
          duration: 1.1,
          ease: "power4.inOut",
          onUpdate: () => {
            if (curtain3Ref.current) {
              curtain3Ref.current.setAttribute("d", `M -1 -1 L 101 -1 L 101 ${curtain3.yRight} Q 50 ${curtain3.yCenter} -1 ${curtain3.yLeft} Z`);
            }
          }
        }, curtain3Start);

    }, wrapperRef);

    return () => ctx.revert();
  }, [lenis, setLoaderFinished]);

  if (!show) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 h-dvh w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 99999 }}
      role="dialog"
      aria-modal="true"
      aria-label="Page loading"
    >
      {/* Background curtains sliding up */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={curtain3Ref} fill="#4C0016" d="M -1 -1 L 101 -1 L 101 101 Q 50 101 -1 101 Z" />
        </svg>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={curtain2Ref} fill="#2C6FAC" d="M -1 -1 L 101 -1 L 101 101 Q 50 101 -1 101 Z" />
        </svg>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path ref={curtain1Ref} fill="#1B4F8A" d="M -1 -1 L 101 -1 L 101 101 Q 50 101 -1 101 Z" />
        </svg>
      </div>

      {/* Assembly Container */}
      <div
        ref={burgerRef}
        className="relative w-[75vw] h-[80vw] mb-[12vw] max-w-[340px] max-h-[360px] md:max-w-[450px] md:max-h-[480px] flex items-center justify-center z-20 origin-bottom"
        aria-hidden="true"
      >
        {/* Seeds particles */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
          {seedParticles.map((particle, idx) => (
            <div
              key={particle.id}
              ref={(el) => {
                seedRefs.current[idx] = el;
              }}
              className={`absolute rounded-full ${particle.size}`}
              style={{ backgroundColor: particle.color, opacity: 0 }}
            />
          ))}
        </div>

        {/* Burger layers SVGs */}
        {burgerLayers.map((layer, idx) => {
          const LayerSVG = layer.component;
          return (
            <div
              key={layer.id}
              ref={(el) => {
                layersRefs.current[idx] = el;
              }}
              className="absolute left-1/2 -translate-x-1/2 will-change-transform"
              style={{
                bottom: layer.bottom,
                width: layer.width,
                height: layer.height,
                zIndex: layer.zIndex,
                opacity: 0
              }}
            >
              <LayerSVG />
            </div>
          );
        })}
      </div>

      {/* Text status */}
      <div ref={textRef} className="flex absolute bottom-[4vw] max-md:bottom-[20vw] flex-col items-center mt-[6vw] md:mt-[10vw] z-20 w-full px-6">
        <div className="font-mouse-memoirs text60 text-white/90 tracking-wider uppercase mt-[3vw] md:mt-[1.5vw] text-center min-h-[1.5em]" aria-live="polite">
          {loadingText}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full loader-bar absolute bottom-0 left-0 h-[2vw] md:h-[1vw] bg-white/15 overflow-hidden mt-[2vw] md:mt-[1vw]"
        role="progressbar"
        aria-label="Loading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressVal}
      >
        <div
          className="h-full bg-mustard transition-all duration-75"
          style={{ width: `${progressVal}%` }}
        />
      </div>
    </div>
  );
}






