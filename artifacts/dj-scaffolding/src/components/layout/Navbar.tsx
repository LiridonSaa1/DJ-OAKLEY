import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md py-4 shadow-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="DJ Oakley Scaffolding and Access Ltd"
              className="h-14 w-auto object-contain transition-opacity group-hover:opacity-80"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    location === link.href ? "text-primary" : "text-gray-200"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/contact">
              <Button className="bg-primary text-secondary hover:bg-primary/90 font-bold tracking-wide uppercase px-6">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-secondary shadow-lg border-t border-secondary-foreground/10 animate-in slide-in-from-top-2">
          <div className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium py-2 border-b border-secondary-foreground/5 ${
                  location === link.href ? "text-primary" : "text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-4">
              <Button className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold uppercase py-6">
                Get a Quote
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
