"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import VelocityScroll from "@/components/VelocityScroll";
import gsap from "gsap";
import { cn } from "@/utils/cn";

export default function LoadingScreen({
  onFinish,
  renderChildren,
}: {
  onFinish: () => void;
  renderChildren: () => void;
}) {
  const [exit, setExit] = useState(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(onFinishLoading, 3000);
  }, []);

  const clipPathVariants = {
    initial: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    },
    exit: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0% 0)",
      transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const borderAnimateDuration = 1;
  const borderAnimateEase = "power4.inOut";

  const loadingText = "Loading";
  const loadingTextChars = loadingText.split("");

  const enterText = "Click to enter";
  const enterTextWords = enterText.split(" ");

  const loadingTextRef = useRef<HTMLDivElement>(null);
  const enterTextRef = useRef<HTMLDivElement>(null);
  const borderTop = useRef<HTMLDivElement>(null);
  const borderRight = useRef<HTMLDivElement>(null);
  const borderBottom = useRef<HTMLDivElement>(null);
  const borderLeft = useRef<HTMLDivElement>(null);

  function animateBorderTop() {
    gsap.fromTo(
      borderTop.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
      }
    );
  }

  function animateBorderRight() {
    gsap.fromTo(
      borderRight.current,
      {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      },
      {
        clipPath: "polygon(100% 100%, 0% 100%, 0% 100%, 100% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
      }
    );
  }

  function animateBorderBottom() {
    gsap.fromTo(
      borderBottom.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
      }
    );
  }

  function animateBorderLeft() {
    gsap.fromTo(
      borderLeft.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
      }
    );
  }

  type yPositions = "100%" | "0" | "-100%";

  function animateText(
    ref: RefObject<HTMLElement | null>,
    from: yPositions,
    to: yPositions,
    selector: string,
    delay?: number
  ) {
    if (!ref.current) return;
    const text = ref.current.querySelectorAll(selector);

    gsap.fromTo(
      text,
      { y: from },
      {
        y: to,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
        delay: delay ? delay : undefined,
      }
    );
  }

  function animateLoadingText() {
    animateText(loadingTextRef, "0", "-100%", "#loadingScreenLoadingChar", 0.5);
    animateText(enterTextRef, "100%", "0", "#loadingScreenEnterChar", 0.5);
  }

  function onFinishLoading() {
    setTimeout(() => setIsLoaded(true), 400);
    animateLoadingText();
    animateBorderTop();
    animateBorderRight();
    animateBorderBottom();
    animateBorderLeft();
    renderChildren();
  }

  function onClick() {
    if (!isLoaded) return;

    setIsClicked(true);
    setExit(true);
    onFinish();
  }

  return (
    <motion.div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-dark-background z-[1000]",
        isLoaded && !isClicked ? "cursor-pointer" : ""
      )}
      onClick={onClick}
      variants={clipPathVariants}
      initial="initial"
      animate={exit ? "exit" : "initial"}
    >
      <div className="flex justify-center items-center size-80 relative pointer-events-none">
        <div className="relative">
          <p
            ref={loadingTextRef}
            className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] text-4xl text-foreground uppercase flex overflow-hidden"
          >
            {loadingTextChars.map((char, i) => {
              return (
                <span id="loadingScreenLoadingChar" key={i}>
                  {char}
                </span>
              );
            })}
          </p>
          <p
            ref={enterTextRef}
            className="absolute top-0 left-0 translate-x-[-50%] translate-y-[-50%] text-4xl text-foreground uppercase flex overflow-hidden"
          >
            {enterTextWords.map((word, i) => {
              const chars = word.split("");
              return (
                <span key={i} className="pr-1 flex relative">
                  {chars.map((char, i) => {
                    return (
                      <span
                        id="loadingScreenEnterChar"
                        className="translate-y-[100%] relative"
                        key={i}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full animate-[spin_3s_linear_infinite]">
          <div
            ref={borderTop}
            className="absolute top-0 left-0 w-full h-[1px] bg-foreground"
          ></div>
          <div
            ref={borderRight}
            className="absolute top-0 right-0 w-[1px] h-full bg-foreground"
          ></div>
          <div
            ref={borderBottom}
            className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground"
          ></div>
          <div
            ref={borderLeft}
            className="absolute top-0 left-0 w-[1px] h-full bg-foreground"
          ></div>
        </div>
      </div>

      <div className="absolute left-[-142.5em] rotate-[-90deg] top-0 pointer-events-none">
        <VelocityScroll className="text-4xl">
          CUBE/KUB/CUBO/KUUTIO/立方体/CUBE/KUB/CUBO/KUUTIO/立方体/
        </VelocityScroll>
      </div>
      <div className="absolute right-[-142.5em] rotate-[90deg] bottom-0 pointer-events-none">
        <VelocityScroll className="text-4xl">
          CUBE/KUB/CUBO/KUUTIO/立方体/CUBE/KUB/CUBO/KUUTIO/立方体/
        </VelocityScroll>
      </div>
    </motion.div>
  );
}
