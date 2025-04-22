import MaskText from "@/components/MaskText";

export default function BornBeyondEarth() {
  return (
    <section className="w-full px-[2em] py-[5em] flex flex-col items-center gap-4 justify-center text-center">
      {/* Heading */}
      <h2 className="text-4xl font-light tracking-wide mb-[0em] max-w-4xl">
        <MaskText phrase="ASTROLIGHT: BORN BEYOND EARTH" stagger={0.05} />
      </h2>

      {/* Paragraph */}
      <p className="text-base leading-relaxed font-light tracking-wide max-w-3xl uppercase">
        <MaskText phrase="Forged from the cosmos, AstroLight is no ordinary material. Discovered on the distant asteroid Ryugu and returned to Earth through a landmark deep-space mission, this rare alloy redefines the boundaries of material science and design." />
      </p>
    </section>
  );
}
