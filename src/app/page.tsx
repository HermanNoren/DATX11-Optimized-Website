import Astrolight from "./_components/AstroLight";
import CubeShowcase from "./_components/CubeShowcase";
import CubeSizes from "./_components/CubeSizes";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <CubeShowcase/>
      <CubeSizes/>
      <Astrolight/>
    </>
  );
}
