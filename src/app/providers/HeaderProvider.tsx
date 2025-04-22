"use client";

import CartHeader from "@/components/header/CartHeader";
import Header from "@/components/header/Header";
import { usePathname } from "next/navigation";

interface HeaderProviderProps {
  children: React.ReactNode;
}

export default function HeaderProvider({ children }: HeaderProviderProps) {
  const pathname = usePathname();
  let header;
  if (pathname === "/cart") header = <CartHeader />;
  else if (pathname === "/success") header = null;
  else header = <Header />;
  return (
    <>
      {header}
      {children}
    </>
  );
}
