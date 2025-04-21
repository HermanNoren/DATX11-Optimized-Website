import CTA from "./CTA";
import SlideText from "./SlideText";

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
