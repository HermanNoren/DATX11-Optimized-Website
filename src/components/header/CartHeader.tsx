"use client";

import { ArrowLeft } from "lucide-react";
import NavigationLink from "../NavigationLink";
import BurgerMenu from "./BurgerMenu";
import SideNav from "./SideNav";
import { useEffect, useState } from "react";
import { useStopScroll } from "@/app/providers/StopScrollProvider";
import { useHeader } from "@/app/providers/HeaderProvider";

export interface Link {
  name: string;
  href: string;
}

export default function CartHeader() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const { setScrollDisabled } = useStopScroll();
  const { links, prevUrl } = useHeader();

  useEffect(() => {
    setScrollDisabled(isActive);
  }, [isActive]);

  return (
    <header className="fixed top-0 left-0 w-full z-100">
      <div className="container w-full flex pt-container-padding">
        <nav className="flex justify-start flex-1">
          <NavigationLink
            href={prevUrl}
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
