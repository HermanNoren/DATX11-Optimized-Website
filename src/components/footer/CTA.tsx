"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Copyright } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import NavigationLink from "../NavigationLink";
import CubeScene from "../3D/CubeScene";

export default function CTA() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-65%", "0%"]);

  const text = "deCube";
  const letters = text.split("");

  const letterTransforms = letters.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [`${0 + index * 8}%`, "0%"])
  );

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

  return (
    <motion.section
      ref={container}
      style={{ y }}
      className="relative h-full flex flex-col justify-between items-center container"
    >
      <div className="w-full h-lvh grid grid-cols-2 gap-12">
        <div className="absolute inset-0">
          <CubeScene cubePosition={[1.7, 0, 0]} />
        </div>
        <div className="flex flex-col gap-4 justify-center items-end">
          <h2 className="text-9xl flex">
            {letters.map((letter, i) => {
              return (
                <motion.span
                  key={i}
                  style={{ y: letterTransforms[i] }}
                  className="leading-[1em] font-normal overflow-hidden"
                >
                  {letter}
                </motion.span>
              );
            })}
          </h2>
          <p className="w-140 text-end">
            aksdf asdfkjasdfk iasdkf asdk fas dkf askdf kasdklf aslkd faklsd
            faksdf asdfkjasdfk iasdkf asdk fas dkf askdf kasdklf aslkd faklsd f
          </p>
          <Button as={Link} href="/products" className="uppercase w-96">
            Buy Now
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 container w-full py-container-padding">
        <div className="absolute top-0 left-0 w-full h-[1px] container">
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
    </motion.section>
  );
}
