"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/cn";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

type NavLinkProps = {
  icon?: React.ReactNode;
  light?: boolean;
  className?: string;
  text: string;
  href: string;
  target?: string;
  textClassName?: string;
  onClick?: () => void;
};

export default function NavigationLink({
  icon,
  light,
  text,
  className,
  href,
  target,
  textClassName,
  onClick,
  ...rest
}: NavLinkProps) {
  return (
    <Link
      onClick={onClick}
      {...rest}
      href={href}
      target={target}
      className={cn("", className)}
    >
      <NavigationLinkSkeleton
        icon={icon}
        text={text}
        textClassName={textClassName}
      />
    </Link>
  );
}

export function NavigationLinkSkeleton(props: {
  text: string;
  className?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  light?: boolean;
  icon?: React.ReactNode;
  animateIn?: boolean;
  textClassName?: string;
}) {
  const trigger = useRef<any>(null);
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

  useGSAP(() => {
    if (!props.animateIn) return;
    if (!text.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const textOver = text.current.querySelectorAll("#buttonTextOver");
    const textUnder = text.current.querySelectorAll("#buttonTextUnder");

    gsap.fromTo(
      textOver,
      { y: "110%" },
      {
        y: 0,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      }
    );

    gsap.fromTo(
      textUnder,
      { y: "110%" },
      {
        y: 0,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "play none none reset",
        },
      }
    );
  });

  const onHover = () => {
    timelineOver.current.tweenFromTo("enter", "exit");
    timelineUnder.current.tweenFromTo("enter", "exit");
  };

  const onLeave = () => {};

  const words = props.text.split(" ");

  return (
    <div
      ref={trigger}
      onClick={props.onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative w-fit flex justify-between items-center overflow-hidden cursor-pointer gap-1",
        props.className,
        props.light ? "text-background" : "text-foreground"
      )}
    >
      {props.icon ? props.icon : null}
      <div className="relative h-4 overflow-hidden w-fit">
        <span ref={text} className="flex flex-col h-4 relative leading-[1em]">
          <span className="relative">
            {words.map((word, i) => {
              const chars = word.split("");
              const last = words.length - 1 === i;

              return (
                <span
                  key={i}
                  className={cn(
                    "relative inline-flex",
                    last ? "" : "mr-1",
                    props.textClassName
                  )}
                >
                  {chars.map((char, i) => {
                    return (
                      <span
                        id="buttonTextOver"
                        key={i}
                        className="relative flex overflow-hidden"
                      >
                        <span
                          id="buttonTextOverLetter"
                          className="relative"
                          key={i}
                        >
                          {char}
                        </span>
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
              const last = words.length - 1 === i;

              return (
                <span
                  key={i}
                  className={cn(
                    "relative inline-flex",
                    last ? "" : "mr-1",
                    props.textClassName
                  )}
                >
                  {chars.map((char, i) => {
                    return (
                      <span
                        id="buttonTextUnder"
                        key={i}
                        className="relative flex overflow-hidden"
                      >
                        <span
                          id="buttonTextUnderLetter"
                          className="relative"
                          key={i}
                        >
                          {char}
                        </span>
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        </span>
      </div>
    </div>
  );
}
