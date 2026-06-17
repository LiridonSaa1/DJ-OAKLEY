import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetContentSection } from "@/lib/api-client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  { src: "/images/hero-coastal.png",    label: "Marine & Coastal Scaffolding" },
  { src: "/images/hero-commercial.png", label: "Commercial Scaffolding" },
  { src: "/images/hero-closeup.png",    label: "Detail & Precision Work" },
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.6) 100%)" }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">About Us</span>
            <div className="w-10 h-0.5 bg-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
            About DJ Oakley<br /><span className="text-primary">Scaffolding</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Building solid foundations of trust across Great Yarmouth and Norfolk for over 30 years.
          </p>
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

export default function About() {
  const { data: aboutSection } = useGetContentSection("about_full");

  return (
    <Layout>
      <HeroCarousel />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Our Story</h2>
                <h3 className="text-4xl font-bold text-secondary tracking-tight mb-6">Local Experts. <br />National Standards.</h3>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed mb-8">
                  {aboutSection?.content ? (
                    <div dangerouslySetInnerHTML={{ __html: aboutSection.content }} />
                  ) : (
                    <>
                      <p>
                        DJ Scaffolding was founded with a single mission: to provide Great Yarmouth and the wider Norfolk area with safe, reliable, and professional scaffolding solutions. We understand that whether you're fixing a roof or building a commercial complex, safety is paramount.
                      </p>
                      <p className="mt-4">
                        Our team consists of fully qualified and highly experienced scaffolders who adhere strictly to TG20:21 and SG4:14 regulations. We don't just erect steel; we build access solutions that let other trades do their best work securely.
                      </p>
                    </>
                  )}
                </div>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {["TG20:21 Compliant", "CITB Registered", "£10m Public Liability", "Local & Reliable"].map((item, i) => (
                  <ScrollReveal key={i} delay={0.1 * i}>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-secondary font-medium">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4}>
                <Link href="/contact">
                  <Button className="bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-wide px-8">
                    Work With Us
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} className="relative">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                <img
                  src="/hero-bg.png"
                  alt="DJ Scaffolding Team at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-8 max-w-xs" style={{ background: "#0a0a0a" }}>
                <p className="text-white text-lg font-bold leading-snug">
                  "Safety isn't just a policy. It's the foundation of everything we build."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
