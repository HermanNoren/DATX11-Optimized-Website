"use client";

import { Boxes } from "lucide-react";
import NavigationLink from "../NavigationLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BurgerMenu from "./BurgerMenu";
import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import { useStopScroll } from "@/app/providers/StopScrollProvider";
import CartButton from "./CartButton";

export interface Link {
  name: string;
  href: string;
}

export default function Header() {
  const links: Link[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Astrolight",
      href: "/astrolight",
    },
    {
      name: "FAQ",
      href: "/faq",
    },
  ];
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const { setScrollDisabled } = useStopScroll();

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
                <li key={i} className="uppercase flex overflow-hidden ">
                  <NavigationLink
                    href={link.href}
                    text={link.name}
                    className="header_stagger_item"
                  ></NavigationLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className="flex justify-end flex-1">
          <ul className="flex gap-4 self-center">
            <li className="uppercase flex overflow-hidden">
              <NavigationLink
                href="/products"
                text="Buy Me"
                className="header_stagger_item"
              ></NavigationLink>
            </li>

            <li className="uppercase flex">
              <CartButton
                href="/cart"
                text="Cart"
                className="header_stagger_item"
              ></CartButton>
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
