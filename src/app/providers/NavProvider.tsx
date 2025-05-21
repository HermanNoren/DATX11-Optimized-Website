"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface NavProviderProps {
  children: React.ReactNode;
}

interface NavContext {
  prevUrl: string;
}

const NavConditions = createContext<NavContext | undefined>(undefined);

export default function NavProvider({ children }: NavProviderProps) {
  const pathname = usePathname();
  const [prevUrl, setPrevUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    console.log("new PrevUrl:", currentUrl);
    console.log("new CurrentURL:", pathname);

    setPrevUrl(currentUrl);
    setCurrentUrl(pathname);
  }, [pathname]);

  return (
    <>
      <NavConditions.Provider value={{ prevUrl }}>
        {children}
      </NavConditions.Provider>
    </>
  );
}

export function useNav() {
  const context = useContext(NavConditions);
  if (context === undefined) {
    throw new Error("useStopScroll must be used within a NavProvider");
  }

  return context;
}
