import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, ChevronLeft, Phone, Mail, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const CATEGORIES = ["All", "Industrial", "Commercial", "Residential"] as const;
type Category = typeof CATEGORIES[number];

const PROJECTS: { src: string; label: string; location: string; cat: Exclude<Category, "All"> }[] = [
  { src: "/images/projects/proj-1.jpg",  label: "Domestic Roofing",          location: "Norfolk",       cat: "Residential" },
  { src: "/images/projects/proj-2.jpg",  label: "Marine / Boat Refit",       location: "Great Yarmouth",cat: "Industrial" },
  { src: "/images/projects/proj-3.jpg",  label: "Roller Coaster Scaffold",   location: "Great Yarmouth",cat: "Industrial" },
  { src: "/images/projects/proj-4.jpg",  label: "Commercial High Street",    location: "Norfolk",       cat: "Commercial" },
  { src: "/images/projects/proj-5.jpg",  label: "Heritage Building",         location: "East Anglia",   cat: "Commercial" },
  { src: "/images/projects/proj-6.jpg",  label: "Industrial Warehouse",      location: "Norfolk",       cat: "Industrial" },
  { src: "/images/projects/proj-7.jpg",  label: "Industrial Unit",           location: "Great Yarmouth",cat: "Industrial" },
  { src: "/images/projects/proj-8.jpg",  label: "Covered Walkway",          location: "Norfolk",       cat: "Commercial" },
  { src: "/images/projects/proj-9.jpg",  label: "New Build — Block Work",    location: "East Anglia",   cat: "Residential" },
  { src: "/images/projects/proj-10.jpg", label: "Residential Block",         location: "Norfolk",       cat: "Residential" },
  { src: "/images/projects/proj-11.jpg", label: "Residential Block Phase 2", location: "Norfolk",       cat: "Residential" },
  { src: "/images/projects/proj-12.jpg", label: "Roof Access — Rural",       location: "East Anglia",   cat: "Residential" },
];

const CAT_CARDS = [
  { label: "Our Industrial Scaffolding Projects", cat: "Industrial" as const, count: PROJECTS.filter(p => p.cat === "Industrial").length },
  { label: "Our Commercial Scaffolding Projects", cat: "Commercial" as const, count: PROJECTS.filter(p => p.cat === "Commercial").length },
  { label: "Our Residential Scaffolding Projects", cat: "Residential" as const, count: PROJECTS.filter(p => p.cat === "Residential").length },
];

const HERO_IMAGES = [
  { src: "/images/hero-closeup.png",    label: "Precision Scaffolding Work" },
  { src: "/images/hero-coastal.png",    label: "Marine & Coastal Projects" },
  { src: "/images/hero-commercial.png", label: "Commercial Scaffolding" },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_IMAGES.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive(i => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total, paused]);

  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden text-center"
      style={{ minHeight: "100vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_IMAGES.map((img, i) => (
        <motion.div key={i} className="absolute inset-0" animate={{ opacity: i === active ? 1 : 0 }} transition={{ duration: 0.9 }}>
          <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
        </motion.div>
      ))}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.55) 100%)" }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Work</span>
            <div className="w-10 h-0.5 bg-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            OUR SCAFFOLDING PROJECTS
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose D J Oakley Scaffolding Ltd in Great Yarmouth for expert industrial platform and scaffolding hire backed by years of experience.
          </p>
        </motion.div>
      </div>

      {/* Prev arrow */}
      <button onClick={prev} aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ width: 48, height: 48, background: "rgba(10,10,10,0.55)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer" }}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      {/* Next arrow */}
      <button onClick={next} aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ width: 48, height: 48, background: "#e50023", border: "none", color: "white", cursor: "pointer" }}>
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? "#e50023" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
        ))}
      </div>
    </section>
  );
}

export default function ScaffoldingPortfolio() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  const openLightbox = (globalIdx: number) => setLightbox(globalIdx);
  const closeLightbox = () => setLightbox(null);
  const lightboxPrev = () => setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
  const lightboxNext = () => setLightbox(i => i !== null ? (i + 1) % filtered.length : null);

  return (
    <Layout>
      <HeroCarousel />

      {/* ── WHO ARE WE ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-black text-secondary uppercase tracking-tight mb-4">
                WHO ARE DJ OAKLEY<br />SCAFFOLDING LTD?
              </h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">
                At D J Oakley Scaffolding Ltd, based in Great Yarmouth, we bring over 30 years of experience in scaffolding hire and sales. Our dedicated team of skilled professionals is not only reliable and approachable but also highly knowledgeable, ensuring we deliver services that are precisely tailored to meet the unique requirements of each client.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a proud family-run business, we place great emphasis on offering a personalised and professional service, striving to exceed expectations with every project. Whether you need scaffolding for industrial, commercial, or residential purposes, our expertise allows us to provide solutions that are both efficient and safe. We are committed to maintaining the highest standards of quality and customer satisfaction, making us a trusted choice in the industry.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <img
                src="/images/roller-coaster-scaffold.jpg"
                alt="Roller coaster scaffold — Great Yarmouth"
                className="w-full h-[380px] object-cover"
              />
            </ScrollReveal>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CAT_CARDS.map((card, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <button
                  onClick={() => { setActive(card.cat); document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="w-full bg-white p-7 flex items-center gap-5 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ background: "rgba(229,0,35,0.1)" }}
                  >
                    <ChevronRight className="w-6 h-6" style={{ color: "#e50023" }} />
                  </div>
                  <div>
                    <p className="text-secondary font-bold text-sm uppercase tracking-wide">{card.label}</p>
                    <p className="text-gray-400 text-xs mt-1">{card.count} projects</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-0.5 bg-primary" />
                  <span className="text-primary text-sm font-bold uppercase tracking-widest">Portfolio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-secondary uppercase tracking-tight">
                  Project Gallery
                </h2>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className="px-5 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-200"
                    style={{
                      background: active === cat ? "#e50023" : "transparent",
                      color: active === cat ? "#fff" : "#0a0a0a",
                      border: active === cat ? "2px solid #e50023" : "2px solid #e5e7eb",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={project.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="relative overflow-hidden group cursor-pointer"
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={project.src}
                    alt={project.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)" }}
                  >
                    <span
                      className="inline-block px-2 py-0.5 text-white text-xs font-bold uppercase tracking-widest mb-1 self-start"
                      style={{ background: "#e50023" }}
                    >
                      {project.cat}
                    </span>
                    <p className="text-white text-xs font-bold uppercase tracking-wide leading-tight">{project.label}</p>
                    <p className="text-gray-300 text-xs">{project.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-5 right-5 text-white hover:text-primary transition-colors z-10"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
              onClick={e => { e.stopPropagation(); lightboxPrev(); }}
            >
              ‹
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 text-2xl"
              style={{ background: "#e50023", border: "none", color: "white" }}
              onClick={e => { e.stopPropagation(); lightboxNext(); }}
            >
              ›
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full mx-8"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox]!.src}
                alt={filtered[lightbox]!.label}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="mt-4 text-center">
                <span
                  className="inline-block px-3 py-1 text-white text-xs font-bold uppercase tracking-widest mr-2"
                  style={{ background: "#e50023" }}
                >
                  {filtered[lightbox]!.cat}
                </span>
                <span className="text-white font-bold uppercase tracking-wide">{filtered[lightbox]!.label}</span>
                <span className="text-gray-400 text-sm ml-2">— {filtered[lightbox]!.location}</span>
              </div>
              <p className="text-gray-500 text-center text-sm mt-2">
                {lightbox + 1} / {filtered.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA STRIP ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-secondary uppercase tracking-tight mb-4">
              DO YOU NEED THE SERVICES OF<br /><span className="text-primary">EXPERIENCED SCAFFOLDING ERECTORS?</span>
            </h2>
            <div className="w-16 h-1 bg-primary mb-12" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Us */}
            <ScrollReveal>
              <h3 className="text-secondary font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b-2 border-primary">
                CONTACT US
              </h3>
              <div className="space-y-4 text-gray-600 text-sm">
                <div>
                  <p className="text-secondary font-bold mb-1">Tel:</p>
                  <a href="tel:01493802500" className="block hover:text-primary transition-colors">01493 802500</a>
                  <a href="tel:07875344499" className="block hover:text-primary transition-colors">07875 344499</a>
                  <a href="tel:07860738293" className="block hover:text-primary transition-colors">07860 738293</a>
                </div>
                <div>
                  <p className="text-secondary font-bold mb-1">Email:</p>
                  <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="hover:text-primary transition-colors break-all">
                    info@djscaffolding-greatyarmouth.co.uk
                  </a>
                </div>
                <div>
                  <p className="text-secondary font-bold mb-1">Address:</p>
                  <p>Unit B Fenner Rd Monument Estate</p>
                  <p>Great Yarmouth</p>
                  <p>NR30 3PS</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Find Us */}
            <ScrollReveal delay={0.1}>
              <h3 className="text-secondary font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b-2 border-primary">
                FIND US
              </h3>
              <div className="w-full overflow-hidden border border-gray-200" style={{ height: 200 }}>
                <iframe
                  title="DJ Oakley Scaffolding location"
                  src="https://maps.google.com/maps?q=Unit+B+Fenner+Road,+Great+Yarmouth,+Norfolk+NR30+3AE&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-gray-500 text-xs">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span>Unit B Fenner Rd, Great Yarmouth, NR30 3PS</span>
              </div>
            </ScrollReveal>

            {/* Get in Touch */}
            <ScrollReveal delay={0.2}>
              <h3 className="text-secondary font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b-2 border-primary">
                GET IN TOUCH
              </h3>
              <div className="space-y-2">
                {["Name", "Your Address", "Email Address", "Phone"].map(placeholder => (
                  <input
                    key={placeholder}
                    type="text"
                    placeholder={placeholder}
                    className="w-full border border-gray-200 text-secondary placeholder-gray-400 px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                ))}
                <textarea
                  placeholder="Message"
                  rows={3}
                  className="w-full border border-gray-200 text-secondary placeholder-gray-400 px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  className="w-full py-3 font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90"
                  style={{ background: "#e50023" }}
                >
                  Submit
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
