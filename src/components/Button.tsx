"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/cn";

type ButtonOwnProps = {
  icon?: React.ReactNode;
  light?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type PolymorphicProps<C extends React.ElementType, Props extends object> = {
  as?: C;
} & Props &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props | "as">;

export type ButtonProps<C extends React.ElementType = "button"> =
  PolymorphicProps<C, ButtonOwnProps>;

export default function Button<C extends React.ElementType = "button">({
  as,
  icon,
  light,
  children,
  className,
  ...rest
}: ButtonProps<C>) {
  const Component = as || "button";

  return React.createElement(
    Component,
    {
      ...rest,
      className: cn("", className),
    } as React.ComponentPropsWithoutRef<C>,
    <ButtonSkeleton icon={icon} light={light}>
      {children}
    </ButtonSkeleton>
  );
}

interface ButtonSkeletonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  light?: boolean;
}

export function ButtonSkeleton({ children, icon, light }: ButtonSkeletonProps) {
  const line = useRef<HTMLDivElement>(null);
  const bgLine = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const timeline = useRef<gsap.core.Timeline>(null);
  const trigger = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    (timeline.current = gsap
      .timeline({ paused: true })
      .set(
        text.current,
        {
          y: "0",
        },
        "enter"
      )
      .to(text.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power2.out",
      }));

    gsap.fromTo(
      arrow.current,
      { y: "100%" },
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "restart none none reverse",
        },
      }
    );

    gsap.fromTo(
      text.current,
      { y: "100%" },
      {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "restart none none reverse",
        },
      }
    );

    gsap.fromTo(
      bgLine.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top bottom",
          toggleActions: "restart none none reverse",
        },
      }
    );
  });

  const onHover = () => {
    gsap.fromTo(
      line.current,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power4.out",
      }
    );
    gsap.fromTo(
      arrow.current,
      {
        opacity: 1,
        right: "1em",
      },
      {
        opacity: 0.3,
        right: "0",
        duration: 0.5,
        ease: "power2.out",
      }
    );

    if (!timeline.current) return;
    timeline.current.tweenFromTo("enter", "exit");
  };

  const onLeave = () => {
    gsap.to(line.current, {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(arrow.current, {
      opacity: 1,
      right: "1em",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={trigger}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative w-full  py-4 flex justify-between items-center overflow-hidden",
        light ? "text-background" : "text-foreground" 
      )}
    >
      <div className="relative h-6 overflow-hidden pr-24">
        <span ref={text} className="flex flex-col text-base h-6 relative">
          <span>{children}</span>
          <span>{children}</span>
        </span>
      </div>
      {icon ? (
        <svg ref={arrow} className="absolute right-4 size-7">
          {icon}
        </svg>
      ) : (
        <ArrowUpRight
          ref={arrow}
          strokeWidth={0.75}
          className="absolute right-4 size-7"
        />
      )}

      <div
        ref={bgLine}
        className={cn(
          "absolute left-0 bottom-0 w-full h-[1px]",
          light ? "bg-background opacity-30" : "bg-foreground opacity-30"
        )}
      ></div>
      <div
        ref={line}
        className={cn(
          "absolute left-0 bottom-0 w-full h-[1px] [clip-path:polygon(0%_0%,0%_0%,0%_100%,0%_100%)]",
          light ? "bg-background" : "bg-foreground"
        )}
      ></div>
    </div>
  );
}
