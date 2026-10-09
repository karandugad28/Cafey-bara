"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface RetroStarProps {
  color?: string;
  size?: number | string;
  className?: string;
  rotateReverse?: boolean;
}

export default function RetroStar({
  color = "#F5E3CD",
  size = 100,
  className = "",
  rotateReverse = false,
}: RetroStarProps) {
  const starRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!starRef.current) return;
    gsap.to(starRef.current, {
      rotation: rotateReverse ? -360 : 360,
      repeat: -1,
      duration: 15,
      ease: "linear",
    });
  }, [rotateReverse]);

  return (
    <svg
      ref={starRef}
      className={className}
      style={{ width: size, height: size }}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z"
        fill={color}
      />
    </svg>
  );
}
