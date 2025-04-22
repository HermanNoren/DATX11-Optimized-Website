import ParallaxScroll from "@/components/ParallaxScroll";

export default function ProductHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-[2em] py-[10em]">
      {/* Video Container */}
      <div className="relative w-full max-w-3xl aspect-video overflow-hidden">
        <ParallaxScroll>
          <video
            className="w-full h-full object-cover"
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
        </ParallaxScroll>
        x{/* Heading */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-[0.5em] z-10 text-white">
          <h1
            className="text-white text-8xl font-light text-center leading-none tracking-wide whitespace-nowrap">
            PRODUCTS
          </h1>
        </div>
      </div>

      {/* Paragraph */}
      <p
        className="mt-[1em] text-center font-light tracking-wide uppercase"
        style={{
          fontSize: "var(--text-sm)",
          lineHeight: "var(--text-sm--line-height)",
          maxWidth: "50em",
        }}
      >
        Experience deCube—a revolutionary decorating cube crafted from
        Astrolite, an exclusive material from the depths of space. With its
        sleek, modern aesthetic and cutting-edge composition, deCube stands as a
        testament to innovation and sophistication.
      </p>
    </section>
  );
}
