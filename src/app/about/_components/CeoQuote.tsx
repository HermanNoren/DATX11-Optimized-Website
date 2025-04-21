"use client";

export default function CeoQuote() {
  return (
    <section className="w-full px-[2em] p-30">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-[2em] max-w-4xl mx-auto">
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
              src="/Reflective Chrome Elegance_simple_compose.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Quote */}
        <div className="w-full lg:w-1/2 text-sm font-light leading-relaxed tracking-wide">
          <p className="italic">
            “DESIGNED SPECIFICALLY FOR COLLECTORS, PIONEERS, AND VISIONARIES,
            OWNING A DECUBE MEANS POSSESSING SOMETHING TRULY EXTRAORDINARY.”
            <br />
            <span className="not-italic font-medium">
              – CEO OF DECUBE
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
