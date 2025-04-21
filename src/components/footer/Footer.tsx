import CTA from "./_components/CTA";
import SlideText from "./_components/SlideText";

export default function Footer() {
  return (
    <footer className="relative gradient-bg">
      <div className="absolute top-0 left-0">
        <SlideText />
      </div>
      <CTA />
    </footer>
  );
}
