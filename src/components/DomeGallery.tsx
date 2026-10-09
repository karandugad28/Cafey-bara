"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "framer-motion";

const images = Array.from({ length: 12 }).map((_, i) => /cafe/ + (i + 1) + .jpg);

export default function DomeGallery() {
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 100, damping: 20 });
  const rotateY = useTransform(springX, (v) => v * 0.25);

  const [radius, setRadius] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      // Adjust radius based on screen width
      if (window.innerWidth < 768) {
        setRadius(400);
      } else if (window.innerWidth < 1024) {
        setRadius(600);
      } else {
        setRadius(800);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const angleStep = 360 / images.length;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden" style={{ perspective: 1500 }}>
      {/* Invisible drag surface */}
      <motion.div
        className="absolute inset-0 z-30 cursor-grab active:cursor-grabbing"
        drag="x"
        dragElastic={0}
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={(e, info) => {
          dragX.set(dragX.get() + info.delta.x);
        }}
      />
      
      {/* 3D Rotating container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: "preserve-3d", rotateY }}
      >
        {images.map((src, i) => {
          const rotate = i * angleStep;
          return (
            <div
              key={i}
              className="absolute w-[22vw] h-[32vw] max-w-[320px] max-h-[460px] min-w-[200px] min-h-[300px] rounded-[16px] overflow-hidden shadow-2xl border border-white/10 bg-black/50"
              style={{
                transform: otateY( + rotate + deg) translateZ( + radius + px),
                backfaceVisibility: "visible", // let user see the back images too for depth
              }}
            >
              <img src={src} alt="Gallery image" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
