"use client";

import { Boxes } from "lucide-react";
import NavigationLink from "../NavigationLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BurgerMenu from "./BurgerMenu";
import SideNav from "./SideNav";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useStopScroll } from "@/app/providers/StopScrollProvider";
import CartButton from "./CartButton";
import { useHeader } from "@/app/providers/HeaderProvider";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const { setScrollDisabled } = useStopScroll();

  const { links, linkUrls } = useHeader();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const activeIndex = useMemo(
    () => [...linkUrls].findIndex((item) => item === pathname),
    [pathname]
  );

  const indicatorRefs = useRef(
    Array.from({ length: linkUrls.length }, () => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    setScrollDisabled(isActive);
  }, [isActive]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const escapeHatch = document.querySelector(".escape-hatch");
    const escapeHatchTextOver = escapeHatch?.querySelectorAll(
      "#buttonTextOverLetter"
    );
    const escapeHatchTextUnder = escapeHatch?.querySelectorAll(
      "#buttonTextUnderLetter"
    );

    ScrollTrigger.create({
      id: "headerScrollScrollTrigger",
      trigger: document.documentElement,
      start: 0,
      end: 50,
      onLeave: () => {
        setIsScrolled(true);
        gsap.to(".header_stagger_item", {
          y: "-105%",
          duration: 0.5,
          stagger: 0.07,
          ease: "power4.in",
        });
        gsap.to(escapeHatchTextOver!, {
          x: "-105%",
          duration: 0.5,
          stagger: -0.05,
          ease: "power4.in",
        });
        gsap.to(escapeHatchTextUnder!, {
          x: "-105%",
          duration: 0.5,
          stagger: -0.05,
          ease: "power4.in",
        });
      },
      onEnterBack: () => {
        setIsScrolled(false);
        gsap.to(".header_stagger_item", {
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power4.out",
        });
        gsap.to(escapeHatchTextOver!, {
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power4.out",
        });
        gsap.to(escapeHatchTextUnder!, {
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power4.out",
        });
      },
    });
  });

  useEffect(() => {
    ScrollTrigger.create({
      id: "headerIndicatorScrollScrollTrigger",
      trigger: document.documentElement,
      start: 0,
      end: 50,
      onLeave: () => {
        gsap.to(indicatorRefs.current[activeIndex].current, {
          scale: 0,
          duration: 0.5,
          ease: "power4.in",
        });
      },
      onEnterBack: () => {
        gsap.to(indicatorRefs.current[activeIndex].current, {
          scale: 1,
          duration: 0.5,
          delay: 0.1 * activeIndex,
          ease: "power4.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getById("headerIndicatorScrollScrollTrigger")?.kill();
    };
  }, [activeIndex]);

  useEffect(() => {
    gsap.set(indicatorRefs.current[activeIndex].current, { scale: 1 });
  }, []);

  function onMouseEnter(i: number) {
    if (isScrolled) return;
    for (let j = 0; j < indicatorRefs.current.length; j++) {
      const linkRef = indicatorRefs.current[j];
      if (i === j) {
        gsap.to(linkRef.current, { scale: 1, duration: 0.3 });
      } else {
        gsap.to(linkRef.current, { scale: 0, duration: 0.3 });
      }
    }
  }

  function onMouseLeave() {
    if (isScrolled) return;
    for (let j = 0; j < indicatorRefs.current.length; j++) {
      const linkRef = indicatorRefs.current[j];
      if (j === activeIndex) {
        gsap.to(linkRef.current, { scale: 1, duration: 0.3 });
      } else {
        gsap.to(linkRef.current, { scale: 0, duration: 0.3 });
      }
    }
  }

  function onClick(i: number) {
    if (isScrolled) return;
    //setActiveIndex(i);
  }

  return (
    <header className="fixed top-0 left-0 w-full z-100 ">
      <div className="container w-full flex pt-container-padding ">
        <nav className="flex justify-start flex-1 ">
          <NavigationLink
            href="/"
            text="deCube"
            icon={<Boxes strokeWidth={0.75} className="size-7" />}
            className="flex gap-2 escape-hatch "
          ></NavigationLink>
        </nav>
        <nav className="flex justify-center flex-1">
          <ul className="flex gap-4 self-center">
            {links.map((link, i) => {
              return (
                <li key={i} className="relative">
                  <div
                    id="sideNavLinkIndicator"
                    ref={indicatorRefs.current[i]}
                    className="absolute left-[50%] translate-x-[-50%] -bottom-6 will-change-transform scale-0"
                  >
                    <span className="">•</span>
                  </div>
                  <div
                    onMouseEnter={() => onMouseEnter(i)}
                    onMouseLeave={onMouseLeave}
                    onClick={() => onClick(i)}
                    className="uppercase flex overflow-hidden"
                  >
                    <NavigationLink
                      href={link.href}
                      text={link.name}
                      className="header_stagger_item"
                    ></NavigationLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className="flex justify-end flex-1">
          <ul className="flex gap-4 self-center">
            <li className="relative">
              <div
                ref={indicatorRefs.current[indicatorRefs.current.length - 2]}
                className="absolute left-[50%] translate-x-[-50%] -bottom-6 will-change-transform scale-0"
              >
                <span className="">•</span>
              </div>
              <div
                onMouseEnter={() =>
                  onMouseEnter(indicatorRefs.current.length - 2)
                }
                onMouseLeave={onMouseLeave}
                onClick={() => onClick(indicatorRefs.current.length - 2)}
                className="uppercase flex overflow-hidden"
              >
                <NavigationLink
                  href="/products"
                  text="Products"
                  className="header_stagger_item"
                ></NavigationLink>
              </div>
            </li>

            <li className="relative">
              <div
                ref={indicatorRefs.current[indicatorRefs.current.length - 1]}
                className="absolute left-[50%] translate-x-[-50%] -bottom-6 will-change-transform scale-0"
              >
                <span className="">•</span>
              </div>
              <div
                onMouseEnter={() =>
                  onMouseEnter(indicatorRefs.current.length - 1)
                }
                onMouseLeave={onMouseLeave}
                onClick={() => onClick(indicatorRefs.current.length - 1)}
                className="relative uppercase flex"
              >
                <CartButton
                  href="/cart"
                  text="Cart"
                  className="header_stagger_item"
                ></CartButton>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <BurgerMenu
        isActive={isActive}
        setIsActive={setIsActive}
        isAnimating={isAnimating}
      />
      <SideNav
        links={links}
        isActive={isActive}
        setIsActive={setIsActive}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />
    </header>
  );
}
