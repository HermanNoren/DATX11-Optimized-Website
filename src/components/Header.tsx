import { Boxes } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const links = [
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

  return (
    <header className="absolute inset-0 z-20">
      <nav className="w-full container is-full pt-[var(--container-padding)] flex justify-between text-xl">
        <Link href="/" className="flex gap-2">
          <Boxes strokeWidth={1} className="size-6" />
          deCube
        </Link>

        <ul className="flex gap-4">
          {links.map((link, i) => {
            return (
              <li key={i} className="uppercase">
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>

        <ul className="flex gap-4">
          <li className="uppercase">
            <Link href="/products" className="py-2 px-4 border rounded-full">
              Buy Me
            </Link>
          </li>

          <li className="uppercase">
            <Link href="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
