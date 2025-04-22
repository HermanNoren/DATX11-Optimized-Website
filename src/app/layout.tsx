import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "@/utils/lenis";
import { CartProvider } from "./cart/_components/cartlogic";
import Header from "@/components/header/Header";
import StopScrollProvider from "./providers/StopScrollProvider";
import HeaderProvider from "./providers/HeaderProvider";
import PageTransitionProviders from "./providers/PageTransitionProviders";

export const rhd = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-rhd",
});

export const metadata: Metadata = {
  title: "deCube",
  description: "Because everything is better in cube form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${rhd.className} antialiased`}>
          <StopScrollProvider>
            <CartProvider>
              <PageTransitionProviders>
                <HeaderProvider>{children}</HeaderProvider>
              </PageTransitionProviders>
            </CartProvider>
          </StopScrollProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
