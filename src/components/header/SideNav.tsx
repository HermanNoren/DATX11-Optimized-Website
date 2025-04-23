import { createRef, useEffect, useRef } from "react";
import NavigationLink from "../NavigationLink";
import { cn } from "@/utils/cn";
import { socials } from "@/utils/socials";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useCart } from "@/app/cart/_components/cartlogic";
import { Link, useHeader } from "@/app/providers/HeaderProvider";

interface SideNavProps {
  links: Link[];
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

export default function SideNav({
  links,
  isActive,
  setIsActive,
  isAnimating,
  setIsAnimating,
}: SideNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const { activeIndex, setActiveIndex } = useHeader();
  const { cartCount } = useCart();
  const linkUrls = [];
  for (const link of links) {
    linkUrls.push(link.href);
  }
  linkUrls.push("/products");
  linkUrls.push("/cart");

  const indicatorRefs = useRef(
    Array.from({ length: links.length + 2 }, () => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
    gsap.defaults({ ease: "main", duration: 0.7 });

    const nav = navRef.current;
    if (!nav) return;

    const overlay = nav.querySelector<HTMLDivElement>(".overlay")!;
    const menu = nav.querySelector<HTMLDivElement>(".menu")!;
    const bgPanels = nav.querySelectorAll<HTMLDivElement>(".bg-panel");
    const menuLinks = nav.querySelectorAll<HTMLAnchorElement>(".menu-link");
    const fadeTargets = nav.querySelectorAll<HTMLElement>(".fade-target");
    const cartIndicator = nav.querySelectorAll<HTMLElement>(
      ".side-nav-cart-indicator"
    );

    const tl = gsap.timeline({ paused: true });

    const openNav = () => {
      setIsAnimating(true);
      tl.clear()
        .set(nav, { display: "block" })
        .set(menu, { xPercent: 0 })
        .set("#sideNavLinkIndicator", { scale: 0 })
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
        .fromTo(
          bgPanels,
          { xPercent: 101 },
          { xPercent: 0, stagger: 0.12, duration: 0.575 },
          "<"
        )
        .fromTo(
          menuLinks,
          { yPercent: 140, rotate: 10 },
          { yPercent: 0, rotate: 0, stagger: 0.05 },
          "<+=0.35"
        )
        .fromTo(
          indicatorRefs.current[activeIndex].current,
          { scale: 0 },
          { scale: 1, delay: 0.3 },
          "<"
        )
        .fromTo(
          fadeTargets,
          { autoAlpha: 0, yPercent: 50 },
          {
            autoAlpha: 1,
            yPercent: 0,
            stagger: 0.04,
            onComplete: () => {
              setIsAnimating(false);
            },
          },
          "<+=0.2"
        )
        .fromTo(cartIndicator, { scale: 0 }, { scale: 1 }, "<")
        .play();
    };

    const closeNav = () => {
      setIsAnimating(true);
      tl.clear()
        .to(overlay, { autoAlpha: 0 })
        .to(menu, { xPercent: 100 }, "<")
        .set(nav, { display: "none", onComplete: () => setIsAnimating(false) })
        .play();
    };

    if (isActive) {
      nav.style.display = "block";
      openNav();
    } else {
      closeNav();
    }
  }, [isActive]);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive && !isAnimating) {
        setIsActive(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [isActive, isAnimating]);

  function onMouseEnter(i: number) {
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
    for (let j = 0; j < indicatorRefs.current.length; j++) {
      const linkRef = indicatorRefs.current[j];
      if (j === activeIndex) {
        gsap.to(linkRef.current, { scale: 1, duration: 0.3 });
      } else {
        gsap.to(linkRef.current, { scale: 0, duration: 0.3 });
      }
    }
  }

  function onOverlayClick() {
    if (isAnimating) return;
    setIsActive(false);
  }

  return (
    <div ref={navRef} className={cn("nav fixed inset-0 hidden")}>
      <div
        onClick={onOverlayClick}
        className="overlay absolute inset-0 bg-black/40 cursor-pointer z-20"
      ></div>

      <nav className="menu flex flex-col justify-between items-start w-[30em] h-full pt-24 pb-8 absolute right-0 gap-20 z-90">
        <div className="menu-bg absolute inset-0 z-80">
          <div className="bg-panel first absolute inset-0 bg-foreground"></div>
          <div className="bg-panel second absolute inset-0 bg-white"></div>
          <div className="bg-panel third absolute inset-0 bg-gray-accent"></div>
        </div>

        <div className="menu-inner flex flex-col justify-between items-start gap-20 w-full h-full relative z-90">
          <ul className="menu-list flex flex-col gap-8 w-full">
            <div className="flex flex-col">
              {links.map((link, i) => {
                return (
                  <li key={i} className="flex relative pl-8">
                    <div
                      id="sideNavLinkIndicator"
                      ref={indicatorRefs.current[i]}
                      className="absolute right-8 top-[50%] translate-y-[-50%] will-change-transform scale-0"
                    >
                      <span className="text-4xl">•</span>
                    </div>
                    <div
                      onMouseEnter={() => onMouseEnter(i)}
                      onMouseLeave={onMouseLeave}
                      onClick={() => setActiveIndex(i)}
                      className="menu-list-item flex overflow-hidden"
                    >
                      <NavigationLink
                        text={link.name}
                        href={link.href}
                        className="text-5xl uppercase menu-link"
                        textClassName="menu-link-heading"
                        onClick={() => setIsActive(false)}
                      />
                    </div>
                  </li>
                );
              })}
            </div>

            <div className="flex flex-col">
              <li className="flex relative pl-8">
                <div
                  ref={indicatorRefs.current[indicatorRefs.current.length - 2]}
                  className="absolute right-8 top-[50%] translate-y-[-50%] will-change-transform scale-0"
                >
                  <span className="text-4xl">•</span>
                </div>
                <div
                  onMouseEnter={() =>
                    onMouseEnter(indicatorRefs.current.length - 2)
                  }
                  onMouseLeave={onMouseLeave}
                  onClick={() =>
                    setActiveIndex(indicatorRefs.current.length - 2)
                  }
                  className="menu-list-item flex overflow-hidden"
                >
                  <NavigationLink
                    text="Buy me"
                    href="/products"
                    className="text-5xl uppercase menu-link"
                    textClassName="menu-link-heading"
                    onClick={() => setIsActive(false)}
                  />
                </div>
              </li>

              <li className="flex relative pl-8">
                <div
                  ref={indicatorRefs.current[indicatorRefs.current.length - 1]}
                  className="absolute right-8 top-[50%] translate-y-[-50%] will-change-transform scale-0"
                >
                  <span className="text-4xl">•</span>
                </div>
                <div className="relative">
                  {cartCount > 0 ? (
                    <div className="absolute top-0 -right-6 rounded-full size-5 flex justify-center items-center z-90 side-nav-cart-indicator">
                      <span className="text-2xl select-none pointer-events-none">
                        {cartCount}
                      </span>
                    </div>
                  ) : null}
                  <div
                    onMouseEnter={() =>
                      onMouseEnter(indicatorRefs.current.length - 1)
                    }
                    onMouseLeave={onMouseLeave}
                    onClick={() =>
                      setActiveIndex(indicatorRefs.current.length - 1)
                    }
                    className="menu-list-item flex overflow-hidden"
                  >
                    <NavigationLink
                      href="/cart"
                      text="Cart"
                      className="text-5xl uppercase menu-link"
                      onClick={() => setIsActive(false)}
                    ></NavigationLink>
                  </div>
                </div>
              </li>
            </div>
          </ul>

          <div className="menu-details w-full flex flex-col justify-start items-start gap-5 px-8">
            <p className="p-small fade-target text-sm">Socials:</p>
            <div className="socials-row flex justify-between w-full">
              {socials.map((social, i) => {
                return (
                  <NavigationLink
                    key={i}
                    text={social.name}
                    href={social.href}
                    className="text-lg fade-target uppercase"
                    target="_blank"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
