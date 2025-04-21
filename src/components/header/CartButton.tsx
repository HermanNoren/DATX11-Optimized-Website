"use client";

import { useCart } from "@/app/cart/_components/cartlogic";
import NavigationLink from "../NavigationLink";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";

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

  const scaleCartIndotor = {
    initial: {
      scale: 0,
    },
    animate: {
      x: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

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
        });
      },
      onEnterBack: () => {
        gsap.to(".cart-indicator", {
          scale: 1,
          duration: 0.5,
          delay: 0.5,
          ease: "power4.out",
        });
      },
    });
  });

  return (
    <div className={cn("relative")}>
      <AnimatePresence mode="wait">
        {cartCount > 0 ? (
          <motion.div
            variants={scaleCartIndotor}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-0 translate-y-[-50%] right-0 translate-x-[50%] rounded-full bg-white size-5 grid place-items-center z-10 cart-indicator"
          >
            <span className="text-xs leading-1">{cartCount}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
