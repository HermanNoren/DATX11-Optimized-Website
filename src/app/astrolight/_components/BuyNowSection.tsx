import Button from "@/components/Button";
import Link from "next/link";

export default function BuyNowSection() {
  return (
    <section className="w-full py-[5em] flex justify-center items-center gradient-bg relative z-10">
      <div className="relative w-full h-[30em] overflow-hidden flex items-center justify-center">
        <video
          className="absolute top-[50%] translate-y-[-50%] left-0 w-full h-[20em] object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/Minimalist_Industrial_Cubes_simple_compose.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute left-[1em] top-1/2 -translate-y-1/2 z-10">
          <h2 className="text-white text-7xl font-light tracking-wider [writing-mode:vertical-rl] rotate-180">
            deCube
          </h2>
        </div>

        <div className="relative z-10 bg-[#d9d9d9] h-[25em] w-full max-w-md p-[3em] justify-center text-center flex flex-col gap-[1.5em]">
          <h2 className="uppercase text-lg font-normal">
            LIMITED. ICONIC. UNEARTHLY.
          </h2>
          <p className="uppercase font-light text-sm">
            This is not just a material. It is an experience, a relic, a vision
            cast in metal. Astrolight is the culmination of exploration,
            craftsmanship, and cosmic wonder.
          </p>

          <div className="mt-2 px-9">
            <Button as={Link} href="/products">
              BUY NOW
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
