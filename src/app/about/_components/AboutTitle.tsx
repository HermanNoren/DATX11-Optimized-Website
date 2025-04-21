"use client";

export default function AboutTitle() {
  return (
    <section className="relative w-full overflow-hidden p-[10em] ">
      {/* Video Container */}
      <div className="relative w-full max-w-3xl mx-auto aspect-video overflow-hidden">
        {/* Video */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/cubeOnStandAbout.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Title -deCube- at bottom center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 pb-[0em]">
          <h1 className="text-white text-[4em] sm:text-[7em] text-9xl font-medium text-center leading-none tracking-wide whitespace-nowrap">
            -deCube-
          </h1>
        </div>
      </div>

      {/* Subtitle below the video */}
      <p className="mt-[0.5em] text-center text-black text-[1em] sm:text-[1.5em] tracking-wide">
        A COMPANY THAT SPEAKS VOLUMES
      </p>
    </section>
  );
}
