"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import AstroBlur from "@/imgs/AstrolightBlurry.png"

export default function AstrolightHero() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image 
        src={AstroBlur}
        alt="Astrolight Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105"
      />

      {/* Centered Video Container + Text Overflowing Bottom */}
      <div className="absolute top-1/2 left-1/2 w-[80vw] max-w-[40em] aspect-video -translate-x-1/2 -translate-y-1/2 z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/AstrolightBlenderAnimation.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <h1
          ref={textRef}
          className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-[60%] text-white text-9xl font-light tracking-wide text-center z-20">
          ASTROLIGHT
        </h1>
      </div>
    </div>
  );
}
