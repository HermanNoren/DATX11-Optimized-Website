import MaskText from "@/components/MaskText";

export default function FourTextSections() {
  return (
    <section className="w-full px-[2em] py-[5em]">
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-[2em] gap-y-[2em]"
        style={{ maxWidth: "81em" }}
      >
        {/* Section 1 */}
        <div className="text-justify uppercase space-y-[0.5em]">
          <h3
            style={{
              fontSize: "var(--text-3xl)",
              lineHeight: "var(--text-3xl--line-height)",
            }}
            className="font-light"
          >
            <MaskText phrase="A CELESTIAL DISCOVERY" stagger={0.05} />
          </h3>
          <p className="text-[var(--text-base)] font-light leading-[var(--text-base--line-height)] tracking-wide">
            <MaskText phrase="Astrolight is a once-mythical substance—an outer-Earth alloy formed under extreme cosmic pressure. Located and extracted from Asteroid Ryugu, it was transported across millions of kilometers by cutting-edge space technology. What arrived was more than metal. It was potential." />
          </p>
        </div>

        {/* Section 2 */}
        <div className="text-justify uppercase space-y-[0.5em]">
          <h3
            style={{
              fontSize: "var(--text-3xl)",
              lineHeight: "var(--text-3xl--line-height)",
            }}
            className="font-light"
          >
            <MaskText phrase="FORGED IN EXTREMES" stagger={0.05} />
          </h3>
          <p className="text-[var(--text-base)] font-light leading-[var(--text-base--line-height)] tracking-wide">
            <MaskText phrase="Through an advanced, proprietary process, Astrolight is crystallized into flawless geometric cubes. Each piece reflects an eerie, otherworldly glow, capturing light in a way unmatched by any terrestrial element. The result? A cube that is equal parts sculpture and artifact." />
          </p>
        </div>

        {/* Section 3 */}
        <div className="text-justify uppercase space-y-[0.5em]">
          <h3
            style={{
              fontSize: "var(--text-3xl)",
              lineHeight: "var(--text-3xl--line-height)",
            }}
            className="font-light"
          >
            <MaskText phrase="PRECISION. PURITY. POWER." stagger={0.05} />
          </h3>
          <p className="text-[var(--text-base)] font-light leading-[var(--text-base--line-height)] tracking-wide">
            <MaskText phrase="Astrolight’s perfect structure and mysterious shimmer speak of cosmic origins and human precision. It is a material rarer than gold, engineered for those who seek the extraordinary—collectors, visionaries, and pioneers alike." />
          </p>
        </div>

        {/* Section 4 */}
        <div className="text-justify uppercase space-y-[0.5em]">
          <h3
            style={{
              fontSize: "var(--text-3xl)",
              lineHeight: "var(--text-3xl--line-height)",
            }}
            className="font-light"
          >
            <MaskText phrase="A MATERIAL WITH A STORY" stagger={0.05} />
          </h3>
          <p className="text-[var(--text-base)] font-light leading-[var(--text-base--line-height)] tracking-wide">
            <MaskText phrase="From the void of space to the palm of your hand, Astrolight represents a story of ambition, science, and imagination. Each cube is a symbol: of how far we’ve come—and how far we dare to go." />
          </p>
        </div>
      </div>
    </section>
  );
}
