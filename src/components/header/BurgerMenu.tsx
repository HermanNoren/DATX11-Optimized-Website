"use client";

import { useGSAP } from "@gsap/react";
import "./burgerMenu.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function BurgerMenu(props: {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  isAnimating: boolean;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const burger = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: 50,
      onLeave: () => {
        gsap.to(button.current, {
          scale: 1,
          duration: 0.5,
          delay: 1,
          ease: "power4.out",
        });
      },
      onEnterBack: () => {
        gsap.to(button.current, {
          scale: 0,
          duration: 0.5,
          ease: "power4.in",
        });
      },
    });
  });

  function onClick() {
    if (props.isAnimating) return;
    props.setIsActive(!props.isActive);
  }

  return (
    <button
      ref={button}
      onClick={onClick}
      className="fixed bg-white rounded-full top-container-padding right-container-padding flex justify-center items-center size-10 z-[100] scale-0 will-change-transform"
    >
      <div
        ref={burger}
        className={`burger ${props.isActive ? "burgerActive" : ""}`}
      ></div>
    </button>
  );
}
