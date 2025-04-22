"use client";

import { cn } from "@/utils/cn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export default function ClipPathReveal(props: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const trigger = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!trigger.current) return;

    gsap.fromTo(
      trigger.current,
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: props.duration ? props.duration : 1.5,
        delay: props.delay ? props.delay : 0,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  return (
    <div
      ref={trigger}
      className={cn("relative w-full h-full", props.className)}
    >
      {props.children}
    </div>
  );
}
