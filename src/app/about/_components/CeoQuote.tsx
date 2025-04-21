"use client";

import Button from "@/components/Button";
import Link from "next/link";

export default function CeoQuote() {
  return (
    <section className="w-full px-[2em] p-30 gradient-bg relative z-10">
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
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <p className="italic text-sm font-light leading-relaxed">
            “DESIGNED SPECIFICALLY FOR COLLECTORS, PIONEERS, AND VISIONARIES,
            OWNING A DECUBE MEANS POSSESSING SOMETHING TRULY EXTRAORDINARY.”
            &nbsp;
            <span className="not-italic font-normal">
              – CEO OF DECUBE
            </span>
          </p>
          <Button className= "w-50" as={Link} href={"/products"}> BUY NOW </Button> 
        </div>
      </div>
    </section>
  );
}
