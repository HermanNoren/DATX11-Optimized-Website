"use client";

import { useGSAP } from "@gsap/react";
import "./burgerMenu.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { useCart } from "@/app/cart/_components/cartlogic";

export default function BurgerMenu(props: {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  isAnimating: boolean;
  isInCart?: boolean;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const burger = useRef<HTMLDivElement>(null);

  const { cartCount } = useCart();
  const [oldCount, setOldCount] = useState(0);
  const counterContainer = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (props.isInCart) return;
    gsap.registerPlugin(ScrollTrigger);

    let timeout: NodeJS.Timeout;

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: 50,
      onLeave: () => {
        timeout = setTimeout(() => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.5,
            ease: "power4.out",
          });
        }, 1000);
      },
      onEnterBack: () => {
        if (timeout) clearTimeout(timeout);
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

  useEffect(() => {
    if (!counterContainer.current) return;

    if (cartCount > 0) {
      gsap.to("#BurgerCartIndicator", {
        scale: 1,
        duration: 0.5,
        ease: "power4.out",
      });

      const newCountSpan = document.createElement("span");
      newCountSpan.textContent = cartCount.toString();
      newCountSpan.classList.add("absolute");
      newCountSpan.classList.add("newBurgerCartIndicatorSpan");
      counterContainer.current.appendChild(newCountSpan);

      if (cartCount > oldCount) {
        newCountSpan.classList.add("translate-y-[100%]");

        gsap.to(".newBurgerCartIndicatorSpan", {
          y: "-=100%",
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(".oldBurgerCartIndicatorSpan", {
          y: "-=100%",
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            const oldSpan = counterContainer.current?.querySelector(
              ".oldBurgerCartIndicatorSpan"
            );
            oldSpan?.remove();
            newCountSpan.classList.remove("newBurgerCartIndicatorSpan");
            newCountSpan.classList.add("oldBurgerCartIndicatorSpan");
          },
        });
      }

      if (cartCount < oldCount) {
        newCountSpan.classList.add("translate-y-[-100%]");

        gsap.to(".newBurgerCartIndicatorSpan", {
          y: "+=100%",
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(".oldBurgerCartIndicatorSpan", {
          y: "+=100%",
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            const oldSpan = counterContainer.current?.querySelector(
              ".oldBurgerCartIndicatorSpan"
            );
            oldSpan?.remove();
            newCountSpan.classList.remove("newBurgerCartIndicatorSpan");
            newCountSpan.classList.add("oldBurgerCartIndicatorSpan");
          },
        });
      }
    }

    if (cartCount <= 0) {
      gsap.to("#BurgerCartIndicator", {
        scale: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }

    setOldCount(cartCount);
  }, [cartCount]);

  useEffect(() => {
    if (cartCount <= 0) return;

    gsap.to("#BurgerCartIndicator", {
      scale: props.isActive ? 0 : 1,
      duration: 0.5,
      ease: "power4.out",
    });
  }, [props.isActive]);

  return (
    <button
      ref={button}
      onClick={onClick}
      className={cn(
        "fixed bg-white rounded-full top-container-padding right-container-padding flex justify-center items-center size-10 z-[100]",
        props.isInCart ? "" : "scale-0 will-change-transform"
      )}
    >
      <div
        id="BurgerCartIndicator"
        className="absolute -top-2 -right-2 size-6 z-[101] grid place-items-center pointer-events-none bg-white rounded-full scale-0 will-change-transform"
      >
        <span
          ref={counterContainer}
          className="text-sm h-4 w-6 flex flex-col justify-center items-center relative overflow-hidden"
        ></span>
      </div>
      <div
        ref={burger}
        className={`burger ${props.isActive ? "burgerActive" : ""}`}
      ></div>
    </button>
  );
}
