"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

const stickers = [
  { src: "/img-webp/lettuce.webp", alt: "lettuce" },
  { src: "/img-webp/tomato.webp", alt: "tomato" },
  { src: "/img-webp/cheese-logo.webp", alt: "cheese" },
  { src: "/img-webp/meat.webp", alt: "patty" }
];

interface CursorProps {
  ropeColor?: string;
  ropeWidth?: number;
  ropeOpacity?: number;
  segmentLength?: number;
  segmentCount?: number;
  knots?: number[];
}

export default function Cursor({
  ropeColor = "#fff",
  ropeWidth = 2,
  ropeOpacity = 1,
  segmentLength = 8,
  segmentCount = 8,
  knots = [0, 3, 5, 9]
}: CursorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFinePointer = useMemo(() => {
    if (!mounted) return false;
    return (
      window.matchMedia?.("(pointer: fine)")?.matches &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    );
  }, [mounted]);

  const parentRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const segments = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const segmentLengthRef = useRef({ value: segmentLength });
  const idleTimeout = useRef<number | null>(null);

  const [mouseMoved, setMouseMoved] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef(0);

  // Animate cursor opacity when shouldHide or mouseMoved changes
  useEffect(() => {
    if (!isFinePointer || !mouseMoved) return;

    gsap.to(opacityRef, {
      current: shouldHide ? 0 : 1,
      duration: 0.6,
      overwrite: "auto",
      ease: "power3.inOut",
      onUpdate: () => {
        const val = opacityRef.current;
        setOpacity(val);
        if (parentRef.current) {
          parentRef.current.style.opacity = String(val);
          parentRef.current.style.zIndex = val < 0.2 ? "0" : "10000";
        }
        stickerRefs.current.forEach((sticker) => {
          if (sticker) {
            sticker.style.opacity = String(val);
          }
        });
      }
    });
  }, [shouldHide, mouseMoved, isFinePointer]);

  useEffect(() => {
    if (!isFinePointer) return;

    let hasInit = false;
    let rafId: number | null = null;

    const onMouseDown = () => {
      // Small pulse or opacity set
    };

    const updateRope = () => {
      if (hasInit && mouse.current.x !== null && mouse.current.y !== null) {
        const segs = segments.current;
        const targetX = mouse.current.x;
        const targetY = mouse.current.y;

        // Move first segment to mouse position
        gsap.to(segs[0], {
          x: targetX,
          y: targetY,
          duration: 0.05,
          ease: "power2.out",
          overwrite: true
        });

        // Simulating the rope logic: each segment pulls the next one
        const currentLen = Math.max(0, segmentLengthRef.current.value);
        for (let i = 1; i < segmentCount; i++) {
          const prev = segs[i - 1];
          const curr = segs[i];
          const dx = prev.x - curr.x;
          const dy = prev.y - curr.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > currentLen) {
            const angle = Math.atan2(dy, dx);
            const targetSegmentX = prev.x - Math.cos(angle) * currentLen;
            const targetSegmentY = prev.y - Math.sin(angle) * currentLen;

            gsap.to(curr, {
              x: targetSegmentX,
              y: targetSegmentY,
              duration: 0.12 + 0.01 * i,
              ease: "power3.out",
              overwrite: true
            });
          }
        }

        // Draw curved path in SVG
        if (pathRef.current && segs.length > 0) {
          let d = `M ${segs[0].x} ${segs[0].y}`;
          for (let i = 1; i < segmentCount - 1; i++) {
            const xc = (segs[i].x + segs[i + 1].x) / 2;
            const yc = (segs[i].y + segs[i + 1].y) / 2;
            d += ` Q ${segs[i].x} ${segs[i].y} ${xc} ${yc}`;
          }
          const last = segs[segmentCount - 1];
          d += ` L ${last.x} ${last.y}`;
          pathRef.current.setAttribute("d", d);
        }

        // Align stickers to segments/knots
        knots.forEach((knotIdx, index) => {
          const sticker = stickerRefs.current[index];
          const segmentIdx = Math.max(0, Math.min(segmentCount - 1, knotIdx));
          const currSeg = segs[segmentIdx];
          if (!sticker || !currSeg) return;

          gsap.set(sticker, { x: currSeg.x, y: currSeg.y });

          // Rotate sticker based on segment angle
          const prevSeg = segs[Math.max(0, Math.min(segmentCount - 1, knotIdx - 1))];
          if (prevSeg) {
            const angle = Math.atan2(currSeg.y - prevSeg.y, currSeg.x - prevSeg.x) * (180 / Math.PI);
            gsap.set(sticker, { rotation: angle });
          }
        });
      }

      rafId = requestAnimationFrame(updateRope);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!hasInit) {
        // Initialize segments to current mouse position
        segments.current = Array.from({ length: segmentCount }, () => ({
          x: e.clientX,
          y: e.clientY
        }));
        hasInit = true;
        setMouseMoved(true);
        segmentLengthRef.current.value = segmentLength;
      }

      // Briefly contract segment length when moving
      gsap.to(segmentLengthRef.current, {
        value: segmentLength,
        duration: 0.01,
        ease: "power4.inOut",
        overwrite: true
      });

      if (idleTimeout.current) {
        window.clearTimeout(idleTimeout.current);
      }
      idleTimeout.current = window.setTimeout(() => {
        gsap.to(segmentLengthRef.current, {
          value: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: true
        });
      }, 0) as any;

      // Check if hovering an element with data-cursor-hide
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      let hide = false;
      let curr = targetElement;
      while (curr) {
        if (curr.getAttribute && curr.getAttribute("data-cursor-hide") !== null) {
          hide = true;
          break;
        }
        curr = curr.parentElement;
      }
      setShouldHide(hide);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    rafId = requestAnimationFrame(updateRope);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      if (idleTimeout.current) {
        window.clearTimeout(idleTimeout.current);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isFinePointer, segmentLength, segmentCount, knots]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={parentRef}
      className="fixed max-md:hidden inset-0 pointer-events-none"
      style={{ opacity, zIndex: shouldHide ? 0 : 10000 }}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          ref={pathRef}
          fill="none"
          stroke={ropeColor}
          strokeWidth={ropeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={ropeOpacity}
        />
      </svg>
      {knots.slice(0, 4).map((knotIdx, index) => {
        const sticker = stickers[index];
        return (
          <div
            key={index}
            ref={(el) => {
              stickerRefs.current[index] = el;
            }}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
            style={{ opacity, zIndex: 10000 - index }}
          >
            <div className="size-[2.2vw] max-md:hidden rounded-full bg-white/80 backdrop-blur-md border border-black/20 grid place-items-center">
              <img
                src={sticker.src}
                alt={sticker.alt}
                draggable={false}
                className="w-[70%] h-[70%] object-contain select-none"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
