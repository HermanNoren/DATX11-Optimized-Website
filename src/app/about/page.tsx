import React from "react";
import AboutTitle from "./_components/AboutTitle";
import ScrollRevealText from "./_components/ScrollRevealText";
import ParallaxImageSection from "./_components/parallaxImageSection";
import RecievingProduct from "./_components/RecievingProduct";
import CeoQuote from "./_components/CeoQuote";
import Footer from "@/components/footer/Footer";

export default function AboutPage() {
  return (
    <>
      <AboutTitle />
      <ScrollRevealText />
      <ParallaxImageSection />
      <RecievingProduct />
      <CeoQuote />
      <Footer />
    </>
  );
}
