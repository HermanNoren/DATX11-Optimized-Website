"use client";

import React from "react";
import AstrolightHero from "./_components/AstrolightHero";
import BornBeyondEarth from "./_components/BornBeyondEarth";
import FourTextSections from "./_components/FourTextSections";
import AstrolightScene from "@/components/3D/astrolightScene/AstrolightScene";
import BuyNowSection from "./_components/BuyNowSection";
import Footer from "@/components/footer/Footer";

export default function AstrolightPage() {
  return (
    <>
      <AstrolightHero />
      <BornBeyondEarth />
      <div className="w-screen h-90 "><AstrolightScene scale={0.6}/></div>
      <FourTextSections/>
      <BuyNowSection/>
      <Footer/>
    </>
  );
}
