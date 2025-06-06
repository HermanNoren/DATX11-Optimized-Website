"use client";

import { cn } from "@/utils/cn";
import gsap from "gsap";
import { TransitionRouter } from "next-transition-router";
import { useRef } from "react";

interface PageTransitionProvidersProps {
  children: React.ReactNode;
}

export default function PageTransitionProviders({
  children,
}: PageTransitionProvidersProps) {
  const numOfDivs = 20;
  const stagger = -0.02;
  const duration = 0.4;
  const ease = "pow4.inOut";

  const transitionContainer = useRef<HTMLDivElement>(null);
  const toRef = useRef<string | undefined>("");

  const transitionTitles = new Map<string, string>();
  transitionTitles.set("/", "Home");
  transitionTitles.set("/about", "About");
  transitionTitles.set("/astrolight", "Astrolight");
  transitionTitles.set("/faq", "FAQ");
  transitionTitles.set("/products", "Products");
  transitionTitles.set("/cart", "Cart");
  transitionTitles.set("/success", "Kaching!");

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        gsap.set(transitionContainer.current, { zIndex: "999" });
        toRef.current = to;

        const tl = gsap.timeline().fromTo(
          "#pageTransitionDiv1",
          { y: "105%" },
          {
            y: "0%",
            duration: duration,
            stagger: stagger,
            ease: ease,
          }
        );

        const tl2 = gsap.timeline().fromTo(
          "#pageTransitionDiv0",
          { y: "-105%" },
          {
            y: "0%",
            duration: duration,
            stagger: stagger,
            ease: ease,
          }
        );

        const textDiv = document.getElementById("transitionTitleDiv");

        if (!to) return;
        if (!textDiv) return;

        const text = transitionTitles.get(to);
        textDiv.innerHTML = "";
        if (!text) return;

        [...text].forEach((char, index) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.classList.add("pageTransitionTitleChar");

          // Handle spaces explicitly
          if (char === " ") {
            span.style.whiteSpace = "pre"; // Preserve space width
          }

          textDiv.appendChild(span);
        });

        gsap.set(textDiv, { opacity: 1, y: "0%" });

        const tl3 = gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            ".pageTransitionTitleChar",
            { y: "105%" },
            {
              y: "0%",
              duration: 0.5,
              stagger: 0.02,
              ease: ease,
              delay: 0.2,
            }
          );

        return () => {
          tl.kill();
          tl2.kill();
          tl3.kill();
        };
      }}
      enter={(next) => {
        let extraDelay = 0;
        if (toRef.current === "/") extraDelay = 1;

        const tl = gsap
          .timeline({
            onComplete: () => {
              gsap.set(transitionContainer.current, { zIndex: "-999" });
            },
          })
          .fromTo(
            "#pageTransitionDiv1",
            { y: "0%" },
            {
              y: "105%",
              duration: duration,
              stagger: stagger,
              ease: ease,
              delay: 0.3 + extraDelay,
            }
          );
        const tl2 = gsap
          .timeline()
          .fromTo(
            "#pageTransitionDiv0",
            { y: "0%" },
            {
              y: "-105%",
              duration: duration,
              stagger: stagger,
              ease: ease,
              delay: 0.3 + extraDelay,
            }
          )
          .call(next, undefined, "<50%");

        const textDiv = document.getElementById("transitionTitleDiv");
        if (!textDiv) return;

        const tl3 = gsap.timeline().fromTo(
          textDiv,
          { y: "0%", opacity: 1 },
          {
            y: "-200%",
            opacity: 0,
            duration: 0.5,
            ease: "power4.in",
            delay: extraDelay,
          }
        );

        return () => {
          tl.kill();
          tl2.kill();
          tl3.kill();
        };
      }}
    >
      <>{children}</>
      <div
        ref={transitionContainer}
        className={cn("fixed inset-0 z-[-999] grid", `grid-rows-${numOfDivs}`)}
      >
        {Array.from({ length: numOfDivs }).map((_, i) => (
          <div key={i} className="relative h-full overflow-hidden">
            <div
              id={`pageTransitionDiv${i % 2}`}
              className={cn(
                "relative h-full bg-gray-accent",
                i % 2 == 0 ? "-translate-y-[-105%]" : "translate-y-[105%]"
              )}
            />
          </div>
        ))}
        <div
          id="transitionTitleDiv"
          className="fixed top-[50%] translate-y-[-50%] w-screen text-center text-7xl uppercase flex justify-center text-foreground z-[999] overflow-hidden select-none pointer-events-none"
        ></div>
      </div>
    </TransitionRouter>
  );
}
