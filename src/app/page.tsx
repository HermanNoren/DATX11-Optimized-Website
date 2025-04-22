import Footer from "@/components/footer/Footer";
import Astrolight from "./_components/AstroLight";
import CubeShowcase from "./_components/CubeShowcase";
import Hero from "./_components/Hero";
import LazyCubeSizes from "./_components/LazyCubeSizes";

export default function Home() {
  return (
    <>
      <Hero />
      <CubeShowcase />
      <LazyCubeSizes />
      <Astrolight />
      <Footer />
    </>
  );
}
