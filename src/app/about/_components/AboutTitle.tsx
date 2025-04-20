"use client";

export default function AboutTitle() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/cubeOnStandAbout.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Left Vertical Text */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 writing-vertical text-white text-xs tracking-widest z-10 rotate-180">
        CUBE/KUB/CUBO/KUUTIO/立方体
      </div>

      {/* Right Vertical Text */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 writing-vertical text-white text-xs tracking-widest z-10">
        CUBE/KUB/CUBO/KUUTIO/立方体
      </div>

      {/* Main Title */}
      <h1 className="z-10 text-white text-6xl sm:text-7xl font-light tracking-wide text-center">
        -de<span className="font-semibold">Cube</span>-
      </h1>

      {/* Subtitle */}
      <p className="z-10 mt-8 text-white text-sm sm:text-lg tracking-wide text-center">
        A COMPANY THAT SPEAKS VOLUMES
      </p>
    </section>
  );
}