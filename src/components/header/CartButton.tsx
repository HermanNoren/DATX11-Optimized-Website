"use client";

import { useCart } from "@/app/cart/_components/cartlogic";
import NavigationLink from "../NavigationLink";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

type NavLinkProps = {
  icon?: React.ReactNode;
  light?: boolean;
  className?: string;
  text: string;
  href: string;
  target?: string;
  textClassName?: string;
};

export default function CartButton({
  icon,
  light,
  className,
  text,
  href,
  target,
  textClassName,
}: NavLinkProps) {
  const { cartCount } = useCart();
  const [scrolledOut, setScrolledOut] = useState(false);
  const [oldCount, setOldCount] = useState(0);
  const counterContainer = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: 50,
      onLeave: () => {
        gsap.to(".cart-indicator", {
          scale: 0,
          duration: 0.5,
          delay: 0.5,
          ease: "power4.in",
          onComplete: () => {
            setScrolledOut(true);
          },
        });
      },
      onEnterBack: () => {
        setScrolledOut(false);
        gsap.to(".cart-indicator", {
          scale: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power4.out",
        });
      },
    });
  });

  useEffect(() => {
    if (!counterContainer.current) return;

    if (cartCount > 0) {
      const newCountSpan = document.createElement("span");
      newCountSpan.textContent = cartCount.toString();
      newCountSpan.classList.add("absolute");
      newCountSpan.classList.add("newHeaderCartIndicatorSpan");
      counterContainer.current.appendChild(newCountSpan);

      if (cartCount > oldCount) {
        newCountSpan.classList.add("translate-y-[100%]");

        gsap.to(".newHeaderCartIndicatorSpan", {
          y: "-=100%",
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(".oldHeaderCartIndicatorSpan", {
          y: "-=100%",
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            const oldSpan = counterContainer.current?.querySelector(
              ".oldHeaderCartIndicatorSpan"
            );
            oldSpan?.remove();
            newCountSpan.classList.remove("newHeaderCartIndicatorSpan");
            newCountSpan.classList.add("oldHeaderCartIndicatorSpan");
          },
        });
      }

      if (cartCount < oldCount) {
        newCountSpan.classList.add("translate-y-[-100%]");

        gsap.to(".newHeaderCartIndicatorSpan", {
          y: "+=100%",
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(".oldHeaderCartIndicatorSpan", {
          y: "+=100%",
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            const oldSpan = counterContainer.current?.querySelector(
              ".oldHeaderCartIndicatorSpan"
            );
            oldSpan?.remove();
            newCountSpan.classList.remove("newHeaderCartIndicatorSpan");
            newCountSpan.classList.add("oldHeaderCartIndicatorSpan");
          },
        });
      }
    }

    if (cartCount <= 0) {
      gsap.to(".oldHeaderCartIndicatorSpan", {
        y: "+=100%",
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => {
          const oldSpan = counterContainer.current?.querySelector(
            ".oldHeaderCartIndicatorSpan"
          );
          oldSpan?.remove();
        },
      });
    }

    setOldCount(cartCount);
  }, [cartCount]);

  return (
    <div className={cn("relative")}>
      <div
        id="HeaderCartIndicator"
        className="absolute -top-3 -right-4 rounded-full size-5 grid place-items-center z-10 cart-indicator pointer-events-none"
      >
        <span
          ref={counterContainer}
          className="text-sm h-4 w-6 flex flex-col justify-center items-center relative overflow-hidden"
        >
          <span className="relative"></span>
        </span>
      </div>

      <div className="flex overflow-hidden">
        <NavigationLink
          icon={icon}
          light={light}
          className={className}
          text={text}
          href={href}
          target={target}
          textClassName={textClassName}
        />
      </div>
    </div>
  );
}
