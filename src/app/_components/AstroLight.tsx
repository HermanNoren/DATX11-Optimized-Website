import InteractiveAstrolightCanvas from "@/components/InteractiveAstroligtCanvas";

export default function Astrolight() {
  return (
    <section className="relative w-screen h-lvh">
      <div className="absolute inset-0">
        <InteractiveAstrolightCanvas />
      </div>
      <div className="relative w-full h-full container grid place-items-center pointer-events-none">
        <div>
        <h2 className="text-6xl uppercase text-center">Experience the Astrolight</h2>
        <p className="text-base uppercase text-center"> 
          Exclusive materials since 1998: A material rarer than gold, engineered for those who seek the extraordinary.
        </p>
        </div>
      </div>
    </section>
  );
}