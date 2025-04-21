"use client";

import React, { RefObject, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function CubeSizeButton(props: {
  text: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  dark?: boolean;
  icon?: React.ReactNode;
  ref?: RefObject<HTMLDivElement | null>;
  isAnimatingOut?: RefObject<boolean>;
}) {
  const text = useRef<HTMLSpanElement>(null);
  const timelineOver = useRef<any>(null);
  const timelineUnder = useRef<any>(null);

  useGSAP(() => {
    if (!text.current) return;

    const textOver = text.current.querySelectorAll("#buttonTextOver");
    const textUnder = text.current.querySelectorAll("#buttonTextUnder");

    timelineOver.current = gsap
      .timeline({ paused: true })
      .set(
        textOver,
        {
          y: "0",
        },
        "enter"
      )
      .to(textOver, {
        y: "-100%",
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
      });
    timelineUnder.current = gsap
      .timeline({ paused: true })
      .set(
        textUnder,
        {
          y: "0",
        },
        "enter"
      )
      .to(textUnder, {
        y: "-100%",
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
      });
  });

  const onHover = () => {
    if (props.isAnimatingOut?.current) return;
    timelineOver.current.tweenFromTo("enter", "exit");
    timelineUnder.current.tweenFromTo("enter", "exit");
  };

  const onLeave = () => {};

  const words = props.text.split(" ");

  const contents = (
    <div className="relative h-4 w-fit">
      <span ref={text} className="flex flex-col h-4 relative leading-[1em]">
        <span className="relative">
          {words.map((word, i) => {
            const chars = word.split("");

            return (
              <span
                key={i}
                className={cn(
                  "relative inline-flex",
                  words.length === i + 1 ? "" : "mr-1"
                )}
              >
                {chars.map((char, i) => {
                  return (
                    <span id="buttonTextOver" className="relative" key={i}>
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
        <span className="relative">
          {words.map((word, i) => {
            const chars = word.split("");

            return (
              <span
                key={i}
                className={cn(
                  "relative inline-flex",
                  words.length === i + 1 ? "" : "mr-1"
                )}
              >
                {chars.map((char, i) => {
                  return (
                    <span id="buttonTextUnder" className="relative" key={i}>
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
      </span>
    </div>
  );

  const containerClassName = cn(
    "relative w-fit flex justify-between items-center overflow-hidden cursor-pointer",
    props.className,
    props.dark ? "text-background" : "text-foreground"
  );

  return props.href ? (
    <div ref={props.ref}>
      <Link
        href={props.href}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={containerClassName}
      >
        {contents}
      </Link>
    </div>
  ) : (
    <div ref={props.ref}>
      <button
        type="button"
        onClick={props.onClick}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={containerClassName}
      >
        {contents}
      </button>
    </div>
  );
}
