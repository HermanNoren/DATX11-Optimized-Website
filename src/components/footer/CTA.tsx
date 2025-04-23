"use client";

import React, { useRef } from "react";
import { Copyright } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import NavigationLink from "../NavigationLink";
import CubeScene from "../3D/CubeScene";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";

export default function CTA() {
  const container = useRef(null);
  const content = useRef(null);

  const text = "deCube";
  const letters = text.split("");

  const links = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/deecubee/",
      target: "_blank",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      target: "_blank",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/",
      target: "_blank",
    },
    {
      name: "Spotify",
      href: "https://www.spotify.com/",
      target: "_blank",
    },
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(content.current, {
      y: "0%",
      ease: "linear",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to("#CTAdeCubeChar", {
      y: "0%",
      ease: "linear",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={container}
      className="relative h-full flex flex-col justify-between items-center container"
    >
      <div ref={content} className="w-full h-full relative translate-y-[-65%]">
        <div className="w-full h-lvh grid grid-cols-2 gap-12">
          <div className="absolute inset-0">
            <CubeScene cubePosition={[1.7, 0, 0]} cubeSize={0.8} />
          </div>
          <div className="flex flex-col gap-4 justify-center items-end">
            <h2 className="relative text-9xl flex">
              {letters.map((letter, i) => {
                return (
                  <span
                    key={i}
                    id="CTAdeCubeChar"
                    style={{ translate: `0% ${i * 8}%` }}
                    className={cn("relative leading-[1em] font-normal")}
                  >
                    {letter}
                  </span>
                );
              })}
            </h2>
            <p className="w-125 text-end">
              JOIN THE FAMILY OF CUBIC PERFECTION TODAY BY SECURING YOUR OWN
              ASTROLIGHT CUBE!
            </p>
            <Button as={Link} href="/products" className="uppercase w-80">
              Buy Now
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full container py-container-padding">
          <div className="absolute top-0 left-0 w-full container h-[1px]">
            <div className="relative w-full h-[1px] bg-foreground opacity-50"></div>
          </div>

          <div className="flex justify-between items-center">
            <p className="flex gap-2 items-center">
              <Copyright strokeWidth={1} />
              <span>deCube</span>
            </p>
            <ul className="flex gap-4 items-center">
              {links.map((link, i) => {
                return (
                  <li key={i}>
                    <NavigationLink
                      href={link.href}
                      target={link.target}
                      className="uppercase"
                      text={link.name}
                    ></NavigationLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
