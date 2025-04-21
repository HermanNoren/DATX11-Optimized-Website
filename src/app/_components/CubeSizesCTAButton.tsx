import { ButtonSkeleton } from "@/components/Button";
import Link from "next/link";
import { RefObject } from "react";

interface CubeSizeCTAButtonProps {
  children: React.ReactNode;
  trigger: RefObject<HTMLElement | null>;
  ref: RefObject<HTMLDivElement | null>;
  triggerAnimPos: string;
  isAnimatingOut: RefObject<boolean>;
  className?: string;
}

export default function CubeSizeCTAButton({
  children,
  trigger,
  ref,
  triggerAnimPos,
  isAnimatingOut,
  className,
}: CubeSizeCTAButtonProps) {
  return (
    <div ref={ref} className={className}>
      <Link href={"/products"}>
        <ButtonSkeleton
          animTrigger={trigger}
          triggerStartOptions={triggerAnimPos}
          blockAnimation={isAnimatingOut}
        >
          {children}
        </ButtonSkeleton>
      </Link>
    </div>
  );
}
