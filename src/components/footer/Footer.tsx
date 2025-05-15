import CTA from "./CTA";
import CTAProducts from "./CTAProducts";
import SlideText from "./SlideText";

interface FooterProps {
  isOnProducts?: boolean;
}

export default function Footer({ isOnProducts }: FooterProps) {
  return (
    <footer className="relative gradient-bg">
      <div className="absolute top-0 left-0">
        <SlideText />
      </div>
      {isOnProducts ? <CTAProducts /> : <CTA />}
    </footer>
  );
}
