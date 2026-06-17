import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useListServices } from "@/lib/api-client";
import { Ruler, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  { src: "/images/hero-commercial.png", label: "Commercial Scaffolding" },
  { src: "/images/hero-closeup.png",    label: "Detail & Precision Work" },
  { src: "/images/hero-coastal.png",    label: "Marine & Coastal Scaffolding" },
];

const FALLBACK_SERVICES = [
  { id: 1, name: "Domestic Scaffolding", description: "Reliable scaffolding for home repairs, extensions, and renovations" },
  { id: 2, name: "Commercial Scaffolding", description: "Safe, efficient access solutions for commercial builds and refurbishments" },
  { id: 3, name: "Industrial Scaffolding", description: "Heavy-duty scaffolding for industrial plants and large-scale projects" },
  { id: 4, name: "Roofing Scaffolding", description: "Specialist scaffolding systems for roofing contractors and roofers" },
  { id: 5, name: "Chimney Scaffolding", description: "Birdcage and chimney scaffolding for safe chimney repair and maintenance" },
  { id: 6, name: "New Build Scaffolding", description: "Full scaffolding solutions for new residential and commercial builds" },
  { id: 7, name: "Maintenance Scaffolding", description: "Ongoing maintenance scaffold for long-term access requirements" },
  { id: 8, name: "Emergency Scaffolding", description: "Fast-response emergency scaffolding 24/7" },
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
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "70vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 0.9 }}
        >
          <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
        </motion.div>
      ))}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 60%, transparent 100%)" }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">DJ Oakley Scaffolding</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            Our<br /><span className="text-primary">Services</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed mb-8">
            Comprehensive scaffolding solutions tailored to your project requirements. From simple domestic repairs to complex industrial builds.
          </p>
          <Link href="/contact">
            <button className="btn-primary">
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ width: 48, height: 48, background: "rgba(10,10,10,0.55)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer" }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-105"
        style={{ width: 48, height: 48, background: "#e50023", border: "none", color: "white", cursor: "pointer" }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? "#e50023" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }}
          />
        ))}
      </div>
    </section>
  );
}

export default function Services() {
  const { data: services } = useListServices();
  const displayServices = services?.length ? services : FALLBACK_SERVICES;

  return (
    <Layout>
      <HeroCarousel />

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Offer</span>
                <div className="w-10 h-0.5 bg-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-secondary uppercase tracking-tight">All Our Services</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayServices.map((service, i) => (
              <ScrollReveal key={service.id} delay={0.1 * (i % 4)} className="h-full">
                <div className="group relative bg-white border border-gray-100 p-8 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:text-primary transition-all pointer-events-none">
                    <span className="text-5xl font-black">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="w-14 h-14 bg-secondary text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Ruler className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{service.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">{service.description}</p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full font-bold uppercase tracking-wide border-secondary/20 hover:bg-secondary hover:text-white">
                      Request Quote
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
              We provide bespoke scaffolding designs for unique access challenges. Contact our expert team to discuss your specific requirements.
            </p>
            <Link href="/contact">
              <Button className="bg-secondary text-white hover:bg-secondary/90 h-14 px-10 text-lg font-bold uppercase tracking-wide">
                Discuss Your Project
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
