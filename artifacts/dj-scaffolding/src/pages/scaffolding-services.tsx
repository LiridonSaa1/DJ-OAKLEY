import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench, Home, Building2, Factory, ChevronLeft, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  { src: "/images/hero-coastal.png",     label: "Marine & Coastal Scaffolding" },
  { src: "/images/hero-commercial.png",  label: "Commercial Scaffolding" },
  { src: "/images/hero-closeup.png",     label: "Detail & Precision Work" },
];

const SERVICES = [
  {
    icon: Factory,
    title: "Industrial Scaffolding",
    desc: "Our industrial scaffolding services are designed to support large-scale projects, providing safe, durable, and efficient solutions for construction, maintenance, and repair in industrial environments.",
    points: ["Power stations & refineries", "Marine & shipyard access", "Large infrastructure projects"],
  },
  {
    icon: Building2,
    title: "Commercial Scaffolding",
    desc: "Our commercial scaffolding services are tailored to meet the needs of businesses, offering safe and efficient solutions for construction, maintenance, and refurbishment projects.",
    points: ["Retail & office buildings", "Hotels & leisure centres", "Schools & public buildings"],
  },
  {
    icon: Home,
    title: "Residential Scaffolding",
    desc: "Our residential scaffolding services are designed to provide safe and reliable support for home improvement projects, from minor repairs to large renovations.",
    points: ["Roof repairs & extensions", "Chimney & fascia work", "New build access"],
  },
];

function HeroSlider() {
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
      className="relative min-h-screen flex items-center overflow-hidden"
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 60%, transparent 100%)" }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">DJ Oakley Scaffolding</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none mb-6">
            OUR SCAFFOLDING<br />
            <span className="text-primary">SERVICES</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl leading-relaxed mb-8">
            We provide scaffolding services for industrial, commercial, and residential projects, ensuring quality and safety for every type of work.
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

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === active ? "#e50023" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function ScaffoldingServices() {
  return (
    <Layout>
      {/* ── HERO ── */}
      <HeroSlider />

      {/* ── WHO ARE WE ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-widest">About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-secondary uppercase tracking-tight mb-6">
                WHO ARE DJ OAKLEY<br />SCAFFOLDING LTD?
              </h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">
                At D J Oakley Scaffolding Ltd, based in Great Yarmouth, we bring over 30 years of experience in scaffolding hire and sales. Our dedicated team of skilled professionals is not only reliable and approachable but also highly knowledgeable, ensuring we deliver services that are precisely tailored to meet the unique requirements of each client.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                As a proud family-run business, we place great emphasis on offering a personalised and professional service, striving to exceed expectations with every project. Whether you need scaffolding for industrial, commercial, or residential purposes, our expertise allows us to provide solutions that are both efficient and safe. We are committed to maintaining the highest standards of quality and customer satisfaction, making us a trusted choice in the industry.
              </p>
              <Link href="/contact">
                <button className="btn-primary">
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative">
                <img
                  src="/images/roller-coaster-scaffold.jpg"
                  alt="DJ Oakley scaffolding on roller coaster"
                  className="w-full h-[420px] object-cover"
                />
                <div
                  className="absolute -bottom-4 -left-4 w-24 h-24 flex items-center justify-center"
                  style={{ background: "#e50023" }}
                >
                  <div className="text-center text-white">
                    <div className="text-2xl font-black">30+</div>
                    <div className="text-xs font-bold uppercase tracking-wide leading-tight">Years<br />Exp.</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIAL / COMMERCIAL / RESIDENTIAL ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Expertise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-secondary uppercase tracking-tight mb-6">
                INDUSTRIAL, COMMERCIAL,<br />AND RESIDENTIAL<br />SCAFFOLDING SERVICES
              </h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">
                Our industrial, commercial, and residential scaffolding services are designed to meet the diverse needs of our clients, no matter the scale or complexity of the project. Whether you're working on a large industrial site, a commercial development, or a residential property, we provide tailored scaffolding solutions that prioritise safety, efficiency, and quality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With years of experience, our team is equipped to handle a wide range of scaffolding requirements, ensuring each project is completed to the highest standards, on time, and within budget.
              </p>
              <div className="space-y-3 mb-10">
                {["CISRS-certified scaffolders", "Full public liability insurance", "Free site surveys & quotations", "Same-day emergency response"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="btn-primary">
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <img
                src="/images/projects/proj-1.jpg"
                alt="Domestic roofing scaffolding Norfolk"
                className="w-full h-[480px] object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Offer</span>
                <div className="w-10 h-0.5 bg-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-secondary uppercase tracking-tight">
                Our Scaffolding Services
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={i} delay={0.08 * (i % 3)}>
                  <div className="group bg-white p-8 h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div
                      className="w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300"
                      style={{ background: "rgba(229,0,35,0.1)" }}
                    >
                      <Icon className="w-7 h-7" style={{ color: "#e50023" }} />
                    </div>
                    <h3 className="text-secondary font-black uppercase tracking-wide text-lg mb-3">
                      {service.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-primary mb-4" />
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                      {service.desc}
                    </p>
                    <ul className="space-y-2">
                      {service.points.map(pt => (
                        <li key={pt} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-6">
              DO YOU NEED THE SERVICES OF<br /><span className="text-primary">EXPERIENCED SCAFFOLDING ERECTORS?</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto font-medium">
              Get in touch today for a free, no-obligation quote. We cover Great Yarmouth and all of East Anglia.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <button className="h-14 px-10 text-base font-black uppercase tracking-wide bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a
                href="tel:01493802500"
                className="h-14 px-10 text-base font-black uppercase tracking-wide border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>01493 802500</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
