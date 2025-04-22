"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MaskText from "@/components/MaskText";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealText() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".word-animation");
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div
      className="max-w-[70%] mx-auto text-center text-xl p-5 opacity-100 overflow-visible "
      ref={textRef}
    >
      <p className="inline-block uppercase">
        <MaskText
          stagger={0.002}
          highlightWords="deCube sleek, geometric precision. collective of cube enthusiasts, pure form and function."
          highlightColor="font-normal"
          phrase="deCube is a design-driven company redefining interior aesthetics through sleek, geometric precision. Founded by a collective of cube enthusiasts, we merge artistry and engineering to create objects of pure form and function."
        />
      </p>
    </div>
  );
}
