import Button from "@/components/Button";
import InteractiveAstrolightCanvas from "@/components/InteractiveAstroligtCanvas";
import Link from "next/link";

export default function Astrolight() {
  return (
    <section className="relative w-screen h-lvh gradient-bg z-10">
      <div className="absolute inset-0 overflow-hidden">
        <InteractiveAstrolightCanvas />
      </div>
      <div className="relative w-full h-full container grid place-items-center pointer-events-none">
        <div className="flex flex-col gap-6 items-center">
        <h2 className="text-6xl uppercase text-center">Experience Astrolight</h2>
        <p className="uppercase text-center w-110"> 
          A material rarer than gold, engineered for those who seek the extraordinary.
        </p>
        <Button className="w-60 pointer-events-auto" as={Link} href="/astrolight"> READ MORE</Button>
        </div>
      </div>
    </section>
  );
}