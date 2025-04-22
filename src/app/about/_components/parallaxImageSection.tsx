import MaskText from "@/components/MaskText";
import ParallaxImage from "@/components/ParallaxImage";
import cubeChairPainting from "@/imgs/png/cubeChairPaintings.webp"
import cubeWindowHybrid from "@/imgs/png/cubeWindow.webp";

export default function ParallaxImageSection() {
  const cubeLangs = "CUBE/KUB/CUBO/KUUTIO/立方体";
  return (
    <section className="relative w-screen p-20">
      <div className="relative container is-md h-[55em]">
        <div className="absolute right-50">
          <div className="relative w-80 aspect-[1/1.5]">
            <ParallaxImage src={cubeWindowHybrid} alt="Chair and Cube" />
          </div>
          <div className="rotate-z-90 rotate-x-180 rotate-y-180 origin-top-left absolute right-[-15.5em]">
            <span className="">{cubeLangs}</span>
          </div>
        </div>
        <div className="absolute left-50 top-72 z-0">
          <div className="relative w-80 aspect-[1/1.5]">
            <ParallaxImage src={cubeChairPainting} alt="Cube Image" />
          </div>
          <div className="rotate-z-90 rotate-x-180 rotate-y-180 origin-top-left absolute right-[-15.5em]">
            <span className="">{cubeLangs}</span>
          </div>
        </div>
        <p className="absolute top-7 left-35 w-[28em] text-xl z-20 text-end">
          <h1 className="text-4xl">THE VISION</h1>
          <MaskText
            stagger={0.005}
            phrase="OUR TEAM IS OBSESSED WITH MINIMALISM, SYMMETRY, AND MATERIAL INNOVATION—PUSHING THE BOUNDARIES 
            OF DESIGN TO DELIVER PIECES THAT EMBODY SOPHISTICATION AND EXCLUSIVITY."
          />
        </p>
        <p className="absolute top-[30em] right-31 w-[28em] text-xl z-20">
          <MaskText
            stagger={0.005}
            phrase="WITH A VISION ROOTED IN SIMPLICITY AND EXCELLENCE, DECUBE CONTINUES TO INNOVATE, 
            BRINGING THE FUTURE OF DESIGN INTO THE PRESENT—ONE PERFECT CUBE AT A TIME."
          />
        </p>
      </div>
    </section>
  );
}
