"use client";

import { cn } from "@/utils/cn";
import { useLenis } from "lenis/react";
import { createContext, useContext, useEffect, useState } from "react";

interface StopScrollProviderProps {
  children: React.ReactNode;
}

interface DisableScrollContext {
  setScrollDisabled: (disabled: boolean) => void;
}

const ScrollConditions = createContext<DisableScrollContext | undefined>(
  undefined
);

export default function StopScrollProvider({
  children,
}: StopScrollProviderProps) {
  const [scrollDisabled, setScrollDisabled] = useState(false);

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (scrollDisabled) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [scrollDisabled, lenis]);

  return (
    <ScrollConditions.Provider value={{ setScrollDisabled }}>
      <main className={scrollDisabled ? "h-full overflow-hidden" : ""}>
        {children}
      </main>
    </ScrollConditions.Provider>
  );
}

export function useStopScroll() {
  const context = useContext(ScrollConditions);
  if (context === undefined) {
    throw new Error("useStopScroll must be used within a StopScrollProvider");
  }

  return context;
}
