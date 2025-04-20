import RoomScene from "@/components/3D/RoomScene/RoomScene";


export default function CubeShowcase() {
  return (
    <section className="relative w-full py-36 gradient-bg z-10">
      <div className="relative container w-full h-full grid grid-cols-12 gap-8">
        <div className="w-full aspect-[2/1.5] col-span-7">
          <RoomScene />
        </div>
        <div className="flex flex-col gap-12 col-span-5">
          <h2 className="text-6xl uppercase">Luxurious decorations</h2>
          <p>
            Acquiring a cube is more than a purchase, it&apos;s an entry into a world
            of luxury and refinement. Each Astrolite cube is precision-forged,
            certified, and delivered with the assurance of authenticity.
            Designed for collectors, pioneers, and visionaries, deCube offers a
            seamless way to own a piece of the extraordinary. In a market where
            the exceptional is never ordinary, deCube sets the standard.
          </p>
        </div>
      </div>
    </section>
  );
}