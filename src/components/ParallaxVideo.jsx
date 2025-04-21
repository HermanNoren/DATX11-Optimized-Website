"use client";
import React, { useRef, useEffect } from "react";
import { useLenis } from "@/utils/lenis";

const lerp = (start, end, factor) => start + (end - start) * factor;

export default function ParallaxVideo({
  src,
  id = "",
  factor = 0.2,
  absolute = false,
}) {
  const videoRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const updateBounds = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const animate = () => {
      if (videoRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.2
        );

        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          videoRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  useLenis(({ scroll }) => {
    if (!bounds.current) return;

    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * factor;
  });

  return (
    <div
      id={id}
      className={`w-full h-full overflow-hidden ${
        absolute ? "absolute top-0 left-0" : "relative"
      }`}
    >
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        style={{
          willChange: "transform",
          transform: "translateY(0) scale(1.25)",
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
