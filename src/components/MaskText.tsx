"use client";

import { cn } from "@/utils/cn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMemo, useRef } from "react";

export default function MaskText(
  props: Readonly<{
    phrase: string;
    children: React.ReactNode;
    className?: string;
    fontSize?: string;
    highlightWords?: string;
    highlightColor?: string;
    delay?: number;
    stagger?: number;
    upsideDown?: boolean;
  }>
) {
  const trigger = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!trigger.current) return;

    gsap.fromTo(
      trigger.current.querySelectorAll("#maskTextSpan"),
      { y: "110%", rotate: "5deg" },
      {
        y: 0,
        rotate: "0deg",
        duration: 1,
        stagger: props.stagger ? props.stagger : 0.005,
        ease: "power4.out",
        delay: props.delay ? props.delay : 0,
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      }
    );
  }, []);

  const words = useMemo(() => props.phrase.split(" "), [props.phrase]);
  const hWords = useMemo(
    () => props.highlightWords?.split(" "),
    [props.highlightWords]
  );

  return (
    <span ref={trigger} className="relative">
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;

        return (
          <span
            key={i}
            className={cn(
              "relative inline-flex overflow-hidden",
              props.className
            )}
          >
            <span
              id="maskTextSpan"
              className={cn(
                "relative inline-flex origin-top-left",
                props.fontSize,
                hWords?.includes(word) ? props.highlightColor : ""
              )}
            >
              {word}
            </span>
            {isLastWord ? null : <>&nbsp;</>}
          </span>
        );
      })}
    </span>
  );
}
