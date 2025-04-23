import LazyRoomScene from "@/components/3D/RoomScene/LazyRoomScene";
import Button from "@/components/Button";
import ClipPathReveal from "@/components/ClipPathReveal";
import MaskText from "@/components/MaskText";
import Link from "next/link";

export default function CubeShowcase() {
  const paragraphPhrase = `Acquiring a cube is more than a purchase, it's an entry into a
world of luxury and refinement. Each Astrolite cube is
precision-forged, certified, and delivered with the assurance of
authenticity. Designed for collectors, pioneers, and visionaries,
deCube offers a seamless way to own a piece of the extraordinary. In
a market where the exceptional is never ordinary, deCube sets the
standard.`;
  return (
    <section className="relative w-full py-36 gradient-bg z-10">
      <div className="relative container w-full h-full grid grid-cols-2 is-md  gap-8">
        <div className="flex flex-col gap-6 justify-center items-end">
          <h2 className="text-6xl uppercase text-end">
            <MaskText phrase="Luxurious decorations" stagger={0.1} />
          </h2>
          <p className="text-end pb-6">
            <MaskText phrase={paragraphPhrase} />
          </p>
          <Button className="w-60" as={Link} href="/about">
            READ MORE
          </Button>
        </div>
        <div className="relative w-full aspect-[2/1.5] hover:cursor-grab">
          <span className="text-sm absolute top-0 right-0 translate-y-[-100%] uppercase opacity-50">
            Drag to explore
          </span>
          <ClipPathReveal>
            <LazyRoomScene />
          </ClipPathReveal>
        </div>
      </div>
    </section>
  );
}
