
export default function RecievingProduct() {
    return (
      <section className="w-full px-[2em] p-20 ">
        {/* Gray container box */}
        <div className="bg-[#D9D9D9] pb-10 max-w-6xl mx-auto">
          {/* Top row: video + heading */}
          <div className="flex flex-col lg:flex-row  items-start gap-[1em] mb-[3em]">
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
            <h2 className="text-[4em] leading-tight font-light lg:text-left">
              RECEIVING <br /> THE <br /> PRODUCT
            </h2>
          </div>
          <div className="text-center max-w-3xl mx-auto space-y-[1.5em] text-base leading-relaxed font-light uppercase">
            <p>
              Acquiring a deCube is your gateway to luxury and refinement. Each
              Astrolite cube arrives carefully crafted in{" "}
              <span className="font-medium">premium packaging</span> with a{" "}
              <span className="font-medium">certificate of authenticity</span>,
              highlighting its exclusivity and prestige.
            </p>
            <p>
              We offer <span className="font-medium">worldwide shipping</span>,
              and our <span className="font-medium">no-return policy</span>{" "}
              highlights our confidence in the exceptional quality and uniqueness
              of every deCube.
            </p>
          </div>
          <div className="mt-[3em] text-center text-[0.9em] text-black font-light">
            <p>
              ANY QUESTIONS?
              <br />
              <span className="underline font-medium">CHECK OUT OUR FAQ</span>
            </p>
          </div>
        </div>
      </section>
    );
  }
  