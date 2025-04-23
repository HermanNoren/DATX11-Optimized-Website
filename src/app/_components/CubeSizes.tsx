"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { JSX, RefObject, useRef, useState } from "react";
import CubeSizeButton from "./CubeSizeButton";
import { cn } from "@/utils/cn";

import {
  BufferGeometry,
  Group,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import CubeSizeInfo from "./CubeSizeInfo";
import CubeSizeDimension from "./CubeSizeDimension";
import CubeSizesTitle from "./CubeSizesTitle";
import CubeSizeCTAButton from "./CubeSizesCTAButton";
import CubeScene from "@/components/3D/CubeScene";

gsap.registerPlugin(ScrollTrigger);

type availableCubeSizes = 0.7 | 1 | 1.2;

export default function CubeSizes() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const trigger = useRef<HTMLElement>(null);
  const borderTop = useRef<HTMLDivElement>(null);
  const borderRight = useRef<HTMLDivElement>(null);
  const borderBottom = useRef<HTMLDivElement>(null);
  const borderLeft = useRef<HTMLDivElement>(null);

  const isAnimatingCube = useRef<boolean>(false);

  const [cubeSize, setCubeSize] = useState<availableCubeSizes>(1);
  const cubeSizeRef = useRef<availableCubeSizes>(1);

  const cube = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);
  const cubeGroup = useRef<Group<Object3DEventMap>>(null);

  const borderAnimateDuration = 1;
  const borderAnimateEase = "power4.inOut";
  const borderToggleAction = "play none none none";

  const triggerAnimPos = "top 25%";

  const sizes = [
    {
      id: 0,
      title: "Petite",
      size: "10 x 10 x 10 cm",
      description: `The Petit, a refined choice for those who value rarity in a compact form. A favorite among collectors looking to own a rare piece of the future. Whether displayed on a desk or stored as a long-term asset, it carries the unmistakable presence of something beyond Earth.`,
    },
    {
      id: 1,
      title: "Regal",
      size: "20 x 20 x 20 cm",
      description: `The Regal, a perfect balance of rarity and prestige, the go-to choice for industry leaders and forward-thinkers. Coveted yet attainable, it's the cube that moves industries and closes deals. When a Regal is in your hands, you hold more than metal—you hold progress.`,
    },
    {
      id: 2,
      title: "Imperial",
      size: "30 x 30 x 30 cm",
      description: `The Imperial, the largest and boldest, A monolith of Astrolite, commanding attention whether placed in a corporate headquarters, or private collection. Its sheer presence is a testament to those who operate on a grander scale. To own an Imperial is to stake a claim in the future itself.`,
    },
  ];

  const title = useRef<HTMLHeadingElement>(null);

  const descSm = useRef<HTMLSpanElement>(null);
  const descMd = useRef<HTMLSpanElement>(null);
  const descLg = useRef<HTMLSpanElement>(null);
  const descRefs = [descSm, descMd, descLg];

  const dimensionSm = useRef<HTMLSpanElement>(null);
  const dimensionMd = useRef<HTMLSpanElement>(null);
  const dimensionLg = useRef<HTMLSpanElement>(null);
  const dimensionRefs = [dimensionSm, dimensionMd, dimensionLg];

  const buttonSm = useRef<HTMLDivElement>(null);
  const buttonMd = useRef<HTMLDivElement>(null);
  const buttonLg = useRef<HTMLDivElement>(null);
  const buttonHref = useRef<HTMLDivElement>(null);
  const buttonRefs = [buttonSm, buttonMd, buttonLg, buttonHref];
  const buttonSmIndicator = useRef<HTMLDivElement>(null);
  const buttonMdIndicator = useRef<HTMLDivElement>(null);
  const buttonLgIndicator = useRef<HTMLDivElement>(null);
  const buttonIndicatorRefs = [
    buttonSmIndicator,
    buttonMdIndicator,
    buttonLgIndicator,
  ];
  const isAnimatingButtons = useRef<boolean>(false);

  const currentID = useRef<number>(1);
  const newID = useRef<number>(1);

  const descriptions: JSX.Element[] = [];
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const element = (
      <CubeSizeInfo
        ref={descRefs[i]}
        text={size.description}
        key={`sizeDesc${i}`}
      />
    );
    descriptions.push(element);
  }

  const dimensions: JSX.Element[] = [];
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const element = (
      <CubeSizeDimension
        ref={dimensionRefs[i]}
        text={size.size}
        key={`sizeDimensions${i}`}
      />
    );
    dimensions.push(element);
  }

  function animateBorderTop() {
    gsap.fromTo(
      borderTop.current,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
        scrollTrigger: {
          trigger: trigger.current,
          start: triggerAnimPos,
          toggleActions: borderToggleAction,
        },
      }
    );
  }

  function animateBorderRight() {
    gsap.fromTo(
      borderRight.current,
      {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 0%, 100% 0%)",
      },
      {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
        scrollTrigger: {
          trigger: trigger.current,
          start: triggerAnimPos,
          toggleActions: borderToggleAction,
        },
      }
    );
  }

  function animateBorderBottom() {
    gsap.fromTo(
      borderBottom.current,
      {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
        scrollTrigger: {
          trigger: trigger.current,
          start: triggerAnimPos,
          toggleActions: borderToggleAction,
        },
      }
    );
  }

  function animateBorderLeft() {
    gsap.fromTo(
      borderLeft.current,
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: borderAnimateDuration,
        ease: borderAnimateEase,
        scrollTrigger: {
          trigger: trigger.current,
          start: triggerAnimPos,
          toggleActions: borderToggleAction,
        },
      }
    );
  }

  function aniamteCubeIn() {
    if (!cube.current) return;

    gsap.to(cube.current.scale, {
      x: cubeSizeRef.current,
      y: cubeSizeRef.current,
      z: cubeSizeRef.current,
      duration: 1,
      ease: "power4.inOut",
    });
  }

  type yPositions = "100%" | "0" | "-100%";

  function animateText(
    ref: RefObject<HTMLSpanElement | null>,
    from: yPositions,
    to: yPositions,
    stagger?: number
  ) {
    if (!ref.current) return;
    const text = ref.current.querySelectorAll("#sizeDescText");

    gsap.fromTo(
      text,
      { y: from },
      {
        y: to,
        duration: 0.5,
        stagger: stagger ? stagger : 0.02,
        ease: "power2.out",
      }
    );
  }

  function animateTextScrollIn() {
    const ref = descRefs[currentID.current];
    if (!ref.current) return;

    const text = ref.current.querySelectorAll("#sizeDescText");

    gsap.to(text, {
      y: "0",
      duration: 0.5,
      stagger: 0.002,
      ease: "power2.out",
    });
  }

  function animateDimensionScrollIn() {
    const ref = dimensionRefs[currentID.current];
    if (!ref.current) return;

    const text = ref.current.querySelectorAll("#sizeDescText");

    gsap.to(text, {
      y: "0",
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.out",
    });
  }

  function animateDimensionScrollOut() {
    const ref = dimensionRefs[currentID.current];
    if (!ref.current) return;

    const text = ref.current.querySelectorAll("#sizeDescText");

    gsap.fromTo(
      text,
      { y: "0" },
      {
        y: "100%",
        duration: 0.5,
        stagger: -0.02,
        ease: "power2.in",
      }
    );
  }

  function animateTitleScrollIn() {
    if (!title.current) return;

    const text = title.current.querySelectorAll("#sizeTitleText");

    gsap.to(text, {
      y: "0",
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
    });
  }

  function animateButtonsScrollIn(ref: RefObject<HTMLDivElement | null>) {
    if (!ref.current) return;

    gsap.to(ref.current, {
      pointerEvents: "auto",
      userSelect: "auto",
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: trigger.current,
        start: triggerAnimPos,
        toggleActions: "play none none none",
      },
    });

    const textOver = ref.current.querySelectorAll("#buttonTextOver");
    const textUnder = ref.current.querySelectorAll("#buttonTextUnder");

    gsap.fromTo(
      textOver,
      { y: "100%" },
      {
        y: "0",
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: triggerAnimPos,
          toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      textUnder,
      { y: "100%" },
      {
        y: "0",
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger.current,
          start: triggerAnimPos,
          toggleActions: "play none none none",
        },
      }
    );
  }

  function setInitCubeSize() {
    if (!cube.current) {
      requestAnimationFrame(setInitCubeSize);
      return;
    }
    gsap.set(cube.current.scale, {
      x: 0,
      y: 0,
      z: 0,
    });
  }

  useGSAP(
    () => {
      animateBorderTop();
      animateBorderRight();
      animateBorderBottom();
      animateBorderLeft();
      setInitCubeSize();
      for (const ref of buttonRefs) {
        animateButtonsScrollIn(ref);
      }

      ScrollTrigger.create({
        trigger: trigger.current,
        start: triggerAnimPos,
        onEnter: () => {
          if (hasAnimated) return;

          isAnimatingButtons.current = true;
          setTimeout(() => {
            isAnimatingButtons.current = false;
          }, 500);
          aniamteCubeIn();
          const indicatorRef = buttonIndicatorRefs[currentID.current];
          gsap.to(indicatorRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.5,
            ease: "power4.inOut",
          });
          animateTextScrollIn();
          animateDimensionScrollIn();
          animateTitleScrollIn();

          setHasAnimated(true);
        },
      });
    },
    {
      scope: trigger,
    }
  );

  function onClick(i: number) {
    newID.current = i;
    const descStagger = 0.002;
    const dimensionStagger = 0.02;
    if (newID.current !== currentID.current) {
      animateText(descRefs[newID.current], "-100%", "0", descStagger);
      animateText(descRefs[currentID.current], "0", "100%", descStagger);
    }

    if (newID.current !== currentID.current) {
      animateText(dimensionRefs[newID.current], "-100%", "0", dimensionStagger);
      animateText(
        dimensionRefs[currentID.current],
        "0",
        "100%",
        dimensionStagger
      );
    }

    sizeChange(i);

    currentID.current = i;
  }

  const sizeChange = (i: number) => {
    if (!cube.current) return;
    if (isAnimatingCube.current) return;
    const sizes: availableCubeSizes[] = [0.7, 1, 1.2];
    const size = sizes[i];
    isAnimatingCube.current = true;

    gsap.fromTo(
      cube.current.scale,
      {
        x: cubeSize,
        y: cubeSize,
        z: cubeSize,
      },
      {
        x: size,
        y: size,
        z: size,
        duration: 0.5,
        ease: "Power4.out",
      }
    );
    setTimeout(() => {
      isAnimatingCube.current = false;
    }, 500);
    setCubeSize(size);
    cubeSizeRef.current = size;
  };

  function onMouseEnter(i: number) {
    for (let j = 0; j < buttonIndicatorRefs.length; j++) {
      const indicatorRef = buttonIndicatorRefs[j];
      if (i === j) {
        gsap.to(indicatorRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
        });
      } else {
        gsap.to(indicatorRef.current, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 0.3,
        });
      }
    }
  }

  function onMouseLeave() {
    for (let j = 0; j < buttonIndicatorRefs.length; j++) {
      const indicatorRef = buttonIndicatorRefs[j];
      if (j === currentID.current) {
        gsap.to(indicatorRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.3,
        });
      } else {
        gsap.to(indicatorRef.current, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: 0.3,
        });
      }
    }
  }

  return (
    <section
      ref={trigger}
      className="relative py-section-padding z-20 gradient-bg"
    >
      <div className="container w-full h-full grid grid-cols-2 gap-4">
        <div className="absolute container inset-0">
          <div className="relative w-full h-full">
            <CubeScene
              cubeRef={cube}
              groupRef={cubeGroup}
              cubePosition={[-1.75, 0, 0]}
              cubeSize={0}
            />
          </div>
        </div>
        <div className="grid place-items-center">
          <div className="relative w-[30em] aspect-square">
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
        <div className="relative flex flex-col justify-center uppercase">
          <div className="relative h-[30em] flex flex-col gap-6">
            <div className="pb-8 pt-4">
              <CubeSizesTitle text="Available Sizes" ref={title} />
            </div>

            <div className="flex gap-8">
              {sizes.map((size, i) => {
                return (
                  <div
                    key={i}
                    className="relative w-fit mb-2"
                    ref={buttonRefs[i]}
                  >
                    <div
                      onMouseEnter={() => onMouseEnter(i)}
                      onMouseLeave={onMouseLeave}
                      className="w-fit"
                    >
                      <CubeSizeButton
                        onClick={() => onClick(size.id)}
                        text={size.title}
                        className="text-3xl uppercase"
                        isAnimatingOut={isAnimatingButtons}
                      ></CubeSizeButton>
                    </div>

                    <div
                      ref={buttonIndicatorRefs[i]}
                      className={cn(
                        "absolute left-0 -bottom-2 w-full h-[1px] bg-foreground [clip-path:polygon(0%_0%,0%_0%,0%_100%,0%_100%)]"
                      )}
                    ></div>
                  </div>
                );
              })}
            </div>
            <span className="relative h-[6.3em]">{descriptions}</span>
            <span className="relative h-5 mb-4 opacity-70">{dimensions}</span>
            <CubeSizeCTAButton
              ref={buttonRefs[3]}
              trigger={trigger}
              triggerAnimPos={triggerAnimPos}
              isAnimatingOut={isAnimatingButtons}
              className="w-96"
            >
              Buy deCube
            </CubeSizeCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
