import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/scaffolding-services", label: "Scaffolding Services" },
    { href: "/about", label: "Scaffolding Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar */}
      <div className="bg-secondary border-b border-white/5 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <a href="tel:01493802500" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-primary" />
              01493 802500
            </a>
            <span className="text-white/10">|</span>
            <a href="tel:07860738293" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-primary" />
              07860 738293
            </a>
            <span className="text-white/10">|</span>
            <a href="tel:07875344499" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-primary" />
              07875 344499
            </a>
          </div>
          <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3 h-3 text-primary" />
            info@djscaffolding-greatyarmouth.co.uk
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-secondary/98 backdrop-blur-md shadow-lg"
            : "bg-secondary/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="DJ Oakley Scaffolding and Access Ltd"
                className="h-14 w-auto object-contain transition-opacity group-hover:opacity-85"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors rounded-none ${
                    location === link.href
                      ? "bg-primary text-white"
                      : "text-gray-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 text-base font-semibold transition-colors ${
                    location === link.href ? "bg-primary text-white" : "text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2 text-sm text-gray-400">
                <a href="tel:01493802500" className="flex items-center gap-2 px-4 py-2">
                  <Phone className="w-4 h-4 text-primary" /> 01493 802500
                </a>
                <a href="tel:07860738293" className="flex items-center gap-2 px-4 py-2">
                  <Phone className="w-4 h-4 text-primary" /> 07860 738293
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
