import Button from "@/components/Button";
import Link from "next/link";

export default function RecievingProduct() {
  return (
    <section className="w-full py-30 grid place-items-center">
      <div className="bg-[#D9D9D9] pb-15 w-[50em]">
        {/* Top row: video + heading */}
        <div className="flex flex-col lg:flex-row items-center gap-4 mb-12">
          {/* Video */}
          <div className="w-full lg:w-1/2">
            <video
              className="w-full h-auto object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="/Chrome Cube Elegance_simple_compose_.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Heading */}
          <h2 className="text-6xl">
            RECEIVING <br /> THE <br /> PRODUCT
          </h2>
        </div>
        <div className="text-center flex flex-col items-center gap-4 uppercase">
          <p className="w-[40em]">
            Acquiring a deCube is your gateway to luxury and refinement. Each
            Astrolite cube arrives carefully crafted in{" "}
            <span className="font-normal">premium packaging</span> with a{" "}
            <span className="font-normal">certificate of authenticity</span>,
            highlighting its exclusivity and prestige.
          </p>
          <p className="w-[40em]">
            We offer <span className="font-normal">worldwide shipping</span>,
            and our <span className="font-normal">no-return policy</span>{" "}
            highlights our confidence in the exceptional quality and uniqueness
            of every deCube.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-2 items-center">
          <Button className="w-90" as={Link} href={"/faq"}>
            FOR QUESTIONS, CHECK OUT FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}