"use client";

import { ArrowLeft, Boxes } from "lucide-react";
import NavigationLink from "../NavigationLink";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BurgerMenu from "./BurgerMenu";
import { AnimatePresence } from "framer-motion";
import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStopScroll } from "@/app/providers/StopScrollProvider";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import CartButton from "./CartButton";

export interface Link {
  name: string;
  href: string;
}

const fadeInBG = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.6,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function CartHeader() {
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
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const { setScrollDisabled } = useStopScroll();

  useEffect(() => {
    setScrollDisabled(isActive);
  }, [isActive]);

  return (
    <header className="fixed top-0 left-0 w-full z-100">
      <div className="container w-full flex pt-container-padding">
        <nav className="flex justify-start flex-1">
          <NavigationLink
            href="#"
            onClick={() => history.back()}
            text="Back"
            icon={<ArrowLeft strokeWidth={0.75} className="size-7" />}
            className="flex gap-2 uppercase"
          ></NavigationLink>
        </nav>
      </div>
      <BurgerMenu
        isActive={isActive}
        setIsActive={setIsActive}
        isAnimating={isAnimating}
        isInCart={true}
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
