"use client";

import CartHeader from "@/components/header/CartHeader";
import Header from "@/components/header/Header";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface HeaderProviderProps {
  children: React.ReactNode;
}

export interface Link {
  name: string;
  href: string;
}

interface HeaderContext {
  links: Link[];
  activeIndex: number;
  setActiveIndex: (value: number) => void;
}

const HeaderConditions = createContext<HeaderContext | undefined>(undefined);

export default function HeaderProvider({ children }: HeaderProviderProps) {
  const links: Link[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Astrolight",
      href: "/astrolight",
    },
    {
      name: "FAQ",
      href: "/faq",
    },
  ];

  const pathname = usePathname();
  const linkUrls = [];
  for (const link of links) {
    linkUrls.push(link.href);
  }
  linkUrls.push("/products");
  linkUrls.push("/cart");
  const [activeIndex, setActiveIndex] = useState(
    linkUrls.findIndex((url) => url === pathname)
  );

  let header;
  if (pathname === "/cart") header = <CartHeader />;
  else if (pathname === "/success") header = null;
  else header = <Header />;
  return (
    <>
      <HeaderConditions.Provider value={{ links, activeIndex, setActiveIndex }}>
        {header}
      </HeaderConditions.Provider>
      {children}
    </>
  );
}

export function useHeader() {
  const context = useContext(HeaderConditions);
  if (context === undefined) {
    throw new Error("useStopScroll must be used within a HeaderProvider");
  }

  return context;
}
