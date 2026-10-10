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
    label: "PLACING THE SAUCER..."
  },
  {
    id: "cup",
    component: () => (
      <>
        <style>{`
          @keyframes fill-cup {
            0%, 39% { transform: scale(0.1); opacity: 0; }
            45% { transform: scale(0.2); opacity: 1; }
            90%, 100% { transform: scale(1); opacity: 1; }
          }
          .animate-fill {
            animation: fill-cup 1.8s ease-out forwards;
            animation-delay: 0.8s;
            transform-origin: 1000px 200px;
          }
        `}</style>
        <svg className="size-full" viewBox="0 0 2000 1200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
          {/* Cup Handle */}
          <path d="M 1400,450 C 1800,450 1800,900 1450,950" fill="none" stroke="#D4A853" strokeWidth="60" strokeLinecap="round" />
          {/* Cup body */}
          <path d="M 550,900 C 550,1150 1450,1150 1450,900 L 1550,200 C 1550,0 450,0 450,200 Z" fill="#F5E3CD" stroke="#4C0016" strokeWidth="40" />
          {/* Inner rim */}
          <ellipse cx="1000" cy="200" rx="550" ry="140" fill="#e3cbb0" stroke="#4C0016" strokeWidth="30" />
          {/* Cappuccino Liquid Base inside the rim */}
          <g className="animate-fill">
            <ellipse cx="1000" cy="200" rx="500" ry="120" fill="#c68e58" stroke="#a06e3d" strokeWidth="10" />
            {/* Latte art (heart) */}
            <path d="M 1000,230 C 1000,230 850,130 900,80 C 950,30 1000,100 1000,130 C 1000,100 1050,30 1100,80 C 1150,130 1000,230 1000,230 Z" fill="#F5E3CD" />
            <path d="M 1000,210 C 1000,210 900,140 930,100 C 960,60 1000,120 1000,140 C 1000,120 1040,60 1070,100 C 1100,140 1000,210 1000,210 Z" fill="#c68e58" />
          </g>
        </svg>
      </>
    ),
    alt: "Coffee Cup",
    width: "w-[65%]",
    height: "h-[45%]",
    bottom: "12%",
    zIndex: 11,
    rotate: -1,
    label: "PLACING THE CUP..."
  },
  {
    id: "jug-and-pour",
    component: () => (
      <>
        <style>{`
          @keyframes pour-down {
            0% { clip-path: inset(0 0 100% 0); }
            40% { clip-path: inset(0 0 0 0); }
            70% { clip-path: inset(0 0 0 0); }
            100% { clip-path: inset(100% 0 0 0); }
          }
          @keyframes splash {
            0%, 39% { opacity: 0; transform: scale(0); }
            45%, 85% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.5); }
          }
          .animate-pour {
            animation: pour-down 1.8s ease-in-out forwards;
            animation-delay: 0.8s;
            clip-path: inset(0 0 100% 0);
          }
          .animate-splash {
            animation: splash 1.8s ease-in-out forwards;
            animation-delay: 0.8s;
            transform-origin: 1000px 1300px;
            opacity: 0;
          }
        `}</style>
        <svg className="size-full" viewBox="0 0 2000 2000" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
          {/* Coffee stream pouring down to center 1000 */}
          <g className="animate-pour">
            <path d="M 1000,700 L 1000,1300" stroke="#c68e58" strokeWidth="40" strokeLinecap="round" />
          </g>
          
          {/* Splash lines at the bottom */}
          <g className="animate-splash">
            <path d="M 960,1300 C 920,1200 850,1250 900,1330" stroke="#c68e58" strokeWidth="15" strokeLinecap="round" fill="none" />
            <path d="M 1040,1300 C 1080,1200 1150,1250 1100,1330" stroke="#c68e58" strokeWidth="15" strokeLinecap="round" fill="none" />
          </g>
          
          {/* Jug (Tilted) */}
          <g transform="translate(1000, 700) rotate(-45) translate(-150, -250)">
            {/* Jug Spout */}
            <path d="M 150,250 L 300,200 L 400,400 Z" fill="#ffffff" stroke="#4C0016" strokeWidth="30" strokeLinejoin="round" />
            {/* Jug Body */}
            <rect x="400" y="100" width="500" height="700" rx="80" fill="#ffffff" stroke="#4C0016" strokeWidth="40" />
            {/* Jug Handle */}
            <path d="M 900,300 C 1200,300 1200,600 900,600" fill="none" stroke="#ffffff" strokeWidth="50" strokeLinecap="round" />
            {/* Jug Lid/Top */}
            <rect x="350" y="50" width="600" height="60" rx="30" fill="#D4A853" stroke="#4C0016" strokeWidth="30" />
          </g>
        </svg>
      </>
    ),
    alt: "Jug Pouring",
    width: "w-[100%]",
    height: "h-[70%]",
    bottom: "25%",
    zIndex: 12,
    rotate: 0,
    label: "POURING THE CAPPUCCINO..."
  },
  {
    id: "steam",
    component: () => (
      <>
        <style>{`
          @keyframes waft {
            0% { transform: translateY(20px) scale(0.8); opacity: 0; }
            50% { transform: translateY(-50px) scale(1.1); opacity: 0.8; }
            100% { transform: translateY(-150px) scale(0.8); opacity: 0; }
          }
          .steam-1 { animation: waft 2.5s ease-in-out infinite forwards; animation-delay: 1.8s; transform-origin: center bottom; opacity: 0; }
          .steam-2 { animation: waft 3s ease-in-out infinite forwards; animation-delay: 2.3s; transform-origin: center bottom; opacity: 0; }
          .steam-3 { animation: waft 2.8s ease-in-out infinite forwards; animation-delay: 2.0s; transform-origin: center bottom; opacity: 0; }
        `}</style>
        <svg className="size-full" viewBox="0 0 2000 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
          <path className="steam-1" d="M 800,700 C 700,500 900,300 800,100" stroke="#ffffff" strokeWidth="40" strokeLinecap="round" fill="none" />
          <path className="steam-2" d="M 1000,800 C 900,600 1100,400 1000,200" stroke="#ffffff" strokeWidth="60" strokeLinecap="round" fill="none" />
          <path className="steam-3" d="M 1200,700 C 1100,500 1300,300 1200,100" stroke="#ffffff" strokeWidth="40" strokeLinecap="round" fill="none" />
        </svg>
      </>
    ),
    alt: "Steam",
    width: "w-[40%]",
    height: "h-[30%]",
    bottom: "50%",
    zIndex: 13,
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






