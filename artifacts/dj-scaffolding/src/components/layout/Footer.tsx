import { Link } from "wouter";
import { HardHat, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-gray-300 pt-16 pb-8 border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group mb-6 inline-flex">
              <div className="bg-primary p-1.5 rounded-sm">
                <HardHat className="w-5 h-5 text-secondary" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white uppercase">
                DJ SCAFFOLDING
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Your Local Scaffolding Specialists. Safe access and solid foundations for domestic, commercial, and industrial projects across Great Yarmouth and Norfolk.
            </p>
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
            &copy; {new Date().getFullYear()} DJ Scaffolding. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
