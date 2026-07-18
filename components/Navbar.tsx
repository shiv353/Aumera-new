"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === "/";
  const isSolidHeader = !isHomePage || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setScrolled(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isSolidHeader
          ? "bg-[#0A3323] shadow-xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between">

        {/* Logo */}

        <Link href="/">
          <img
            src="/logo.png"
            alt="The Aumera Gifts"
            className="w-[145px] h-[45px] object-contain cursor-pointer"
          />
        </Link>

        {/* Menu */}

        <nav className="hidden lg:flex items-center gap-10 text-sm uppercase tracking-[3px]">

          <Link href="/" className="text-[#F7F4D5] hover:text-[#839958] transition">
            Home
          </Link>

          {/* <Link href="/rakhi" className="text-[#F7F4D5] hover:text-[#839958] transition">
            Rakhi
          </Link> */}

          <Link href="/products" className="text-[#F7F4D5] hover:text-[#839958] transition">
            Products
          </Link>

          <Link href="/corporate" className="text-[#F7F4D5] hover:text-[#839958] transition">
            Corporate
          </Link>

          <Link href="#" className="text-[#F7F4D5] hover:text-[#839958] transition">
            About
          </Link>

          <Link href="/contact" className="text-[#F7F4D5] hover:text-[#839958] transition">
            Contact
          </Link>

        </nav>

        {/* Button */}

        {/* <a
          href="https://wa.me/917016731747?text=Hi%20The%20Aumera%20Gifts!%20I'd%20like%20to%20place%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-[#F7F4D5]
            text-[#0A3323]
            px-6
            py-3
            rounded-full
            font-medium
            hover:bg-[#839958]
            hover:text-white
            transition-all
            duration-300
          "
        >
          Order Now
        </a> */}

      </div>
    </header>
  );
}