"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = pathname === "/";
  const isSolidHeader = !isHomePage || scrolled || isMenuOpen;

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
    setIsMenuOpen(false);
  }, [pathname]);

  // Navigation Link Class
  const navLinkClass = (href: string) => {
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

    return `
      relative
      block
      py-2
      transition-all
      duration-300
      ${
        isActive
          ? "text-[#839958]"
          : "text-[#F7F4D5] hover:text-[#839958]"
      }

      after:content-['']
      after:absolute
      after:left-0
      after:-bottom-1
      after:h-[2px]
      after:bg-[#839958]
      after:transition-all
      after:duration-300
      after:ease-in-out
      after:origin-left
      ${
        isActive
          ? "after:w-full"
          : "after:w-0 hover:after:w-full"
      }
    `;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isSolidHeader
          ? "bg-[#0A3323] shadow-xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <img
              src="/logo.png"
              alt="The Aumera Gifts"
              className="w-[145px] h-[45px] object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-10 text-sm uppercase tracking-[3px]">
            <Link href="/" className={navLinkClass("/")}>
              Home
            </Link>

            <Link href="/products" className={navLinkClass("/products")}>
              Products
            </Link>

            <Link href="/corporate" className={navLinkClass("/corporate")}>
              Corporate
            </Link>

            <Link href="/about" className={navLinkClass("/about")}>
              About
            </Link>

            <Link href="/contact" className={navLinkClass("/contact")}>
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-[#F7F4D5]/30 bg-[#0A3323]/70 p-2 text-[#F7F4D5] shadow-sm backdrop-blur-sm"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 rounded-2xl border border-[#F7F4D5]/15 bg-[#0A3323]/95 p-4 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col gap-1 text-sm uppercase tracking-[2px]">
              <Link href="/" className={navLinkClass("/" )} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>

              <Link href="/products" className={navLinkClass("/products")} onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>

              <Link href="/corporate" className={navLinkClass("/corporate")} onClick={() => setIsMenuOpen(false)}>
                Corporate
              </Link>

              <Link href="/about" className={navLinkClass("/about")} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>

              <Link href="/contact" className={navLinkClass("/contact")} onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}