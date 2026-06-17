import { Link } from "wouter";
import { MapPin, Phone, Mail, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/djoakleyscaffolding",
    icon: Facebook,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/djoakleyscaff",
    icon: Twitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/djoakleyscaffoldingaccess/",
    icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 pt-16 pb-8 border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex mb-6 group">
              <img
                src="/logo.png"
                alt="DJ Oakley Scaffolding and Access Ltd"
                className="h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Your Local Scaffolding Specialists. Safe access and solid foundations for domestic, commercial, and industrial projects across Great Yarmouth and Norfolk.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/15 text-gray-400 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold tracking-wide uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Our Services" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold tracking-wide uppercase mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Domestic Scaffolding",
                "Commercial Scaffolding",
                "Industrial Scaffolding",
                "Emergency Scaffolding",
              ].map((service) => (
                <li key={service} className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold tracking-wide uppercase mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="tel:07939352899" className="hover:text-white transition-colors">
                  07939 352 899
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="hover:text-white transition-colors break-all">
                  info@djscaffolding-greatyarmouth.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Great Yarmouth,<br />Norfolk, NR31</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} DJ Oakley Scaffolding and Access Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5 flex-wrap justify-center md:justify-end">
            {/* Social icons repeat in bottom bar */}
            <div className="flex gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <span className="text-gray-700 text-xs">|</span>
            <Link href="/policies/cookies-privacy-policy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Cookies &amp; Privacy Policy
            </Link>
            <span className="text-gray-700 text-xs">|</span>
            <Link href="/admin" className="text-xs text-gray-500 hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
