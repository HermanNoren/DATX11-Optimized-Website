import CubeScene from "@/components/3D/CubeScene";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-screen h-lvh z-20">
      <div className="relative container h-full flex flex-col justify-center pointer-events-none select-none">
        <div className="absolute inset-0 z-0">
          <CubeScene />
        </div>
        <h1 className="relative grid grid-rows-3 grid-cols-2 uppercase text-6xl sm:text-8xl">
          <span className="col-span-2 overflow-hidden">Everything is</span>
          <span className="overflow-hidden">better</span>
          <span className="text-end overflow-hidden">in</span>
          <span className="col-span-2 text-end overflow-hidden">cube form</span>
        </h1>
        <div className="absolute bottom-[var(--container-padding)] right-[var(--container-padding)] flex">
          <span className="flex gap-2">
            <p className="overflow-hidden">Scroll to explore</p>
            <span className="overflow-hidden">
              <ArrowDown strokeWidth={1} />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
