import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, ShieldCheck, GraduationCap, Award, Tag, FileText, TrendingDown, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_WORDS = ["ERECTORS", "HIRE & SALES", "EXPERTS", "INSTALLERS"];

const TICKER_ITEMS = [
  "Scaffolding hire and sales",
  "Erection and dismantling services",
  "Temporary roofs",
  "Design works",
  "Heritage scaffolding",
  "Advanced bookings",
];

function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const word = words[wordIndex % words.length] ?? words[0];
  const displayed = (word ?? "").slice(0, charIndex);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1800);
      return () => clearTimeout(t);
    }
    const speed = isDeleting ? 55 : 110;
    const t = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) { setCharIndex(c => c + 1); }
        else { setIsPaused(true); }
      } else {
        if (charIndex > 0) { setCharIndex(c => c - 1); }
        else { setIsDeleting(false); setWordIndex(w => (w + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, isPaused, word.length, words]);

  return (
    <span className="text-primary">
      {displayed}
      <span
        className="inline-block align-middle ml-1"
        style={{ width: "3px", height: "0.8em", background: "#e50023", animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

const TICKER_STRIP = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

function ServicesTicker() {
  return (
    <div className="overflow-hidden py-3 relative" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(229,0,35,0.2)", borderBottom: "1px solid rgba(229,0,35,0.2)" }}>
      <div className="flex whitespace-nowrap" style={{ animation: "ticker-scroll 38s linear infinite" }}>
        {TICKER_STRIP.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-semibold tracking-wide px-5" style={{ color: "rgba(255,255,255,0.75)" }}>
            {item}
            <span className="mx-5" style={{ color: "#e50023" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const WHY_CHOOSE = [
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    desc: "We are fully insured for your complete peace of mind on every job.",
  },
  {
    icon: GraduationCap,
    title: "CITB / CISRS Trained",
    desc: "Ensuring the highest levels of skill, safety, and professionalism on every project.",
  },
  {
    icon: Award,
    title: "Over 30 Years' Experience",
    desc: "With 30 years in the scaffolding industry, we bring a wealth of knowledge to every job.",
  },
  {
    icon: Tag,
    title: "Competitive Prices",
    desc: "We pride ourselves on offering competitive prices without compromising on quality.",
  },
  {
    icon: FileText,
    title: "Free Quotes",
    desc: "No-obligation quotes for all our scaffolding services — call us today.",
  },
  {
    icon: TrendingDown,
    title: "Beat Any Genuine Quote",
    desc: "We provide competitive quotes, ensuring you receive the best value for top-quality scaffolding.",
  },
  {
    icon: MapPin,
    title: "All East Anglia Covered",
    desc: "We offer reliable scaffolding services and can travel to your location across East Anglia and further.",
  },
  {
    icon: Heart,
    title: "Family Run Business",
    desc: "A proud family-run business focused on personalised service and exceeding expectations.",
  },
];

const PROJECT_IMAGES = [
  { src: "/images/projects.png", label: "Residential Block — Great Yarmouth" },
];

const SERVICES_LIST = [
  "Scaffolding hire and sales",
  "Erection and dismantling services",
  "Temporary roofs",
  "Design works",
  "Heritage scaffolding",
  "Advanced bookings",
];

const HERO_SLIDES = [
  { src: "/hero-bg.png",                          alt: "Scaffolding structure at night" },
  { src: "/images/hero-commercial.png",           alt: "Commercial scaffolding at dusk" },
  { src: "/images/roller-coaster-scaffold.jpg",   alt: "Roller Coaster project — Great Yarmouth" },
  { src: "/images/hero-coastal.png",              alt: "Coastal scaffolding, Norfolk" },
  { src: "/images/dj-oakley-sign.jpg",            alt: "D J Oakley Scaffolding on site" },
  { src: "/images/hero-closeup.png",              alt: "Scaffolding steel detail" },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {HERO_SLIDES.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-secondary/70 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent z-10" />
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover object-center scale-105"
          />
        </motion.div>
      ))}
      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300"
            style={{
              width: i === active ? 28 : 8,
              height: 4,
              background: i === active ? "#e50023" : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WhyChooseSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = WHY_CHOOSE.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(i => (i + 1) % total), 4000);
    return () => clearInterval(t);
  }, [paused, total]);

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  const CARD_W = 300;
  const GAP = 20;
  const STEP = CARD_W + GAP;

  return (
    <section className="py-24 bg-gray-50" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Strengths</span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-secondary">WHY CHOOSE US?</h2>
            </div>
            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 border-2 border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all duration-300 group"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-400 font-mono w-16 text-center select-none">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                onClick={next}
                className="w-12 h-12 border-2 border-primary bg-primary flex items-center justify-center text-white hover:bg-secondary hover:border-secondary transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Slider viewport */}
        <div className="overflow-hidden relative">
          {/* Fade right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }} />

          <motion.div
            className="flex"
            style={{ gap: GAP }}
            animate={{ x: -current * STEP }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            {WHY_CHOOSE.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === current;
              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: i >= current && i < current + 3 ? 1 : 0.35,
                    scale: isActive ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.35 }}
                  className="flex-shrink-0 border p-7 cursor-default"
                  style={{
                    width: CARD_W,
                    borderColor: isActive ? "#e50023" : "#e5e7eb",
                    background: "#f9fafb",
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5"
                    style={{ background: "rgba(229,0,35,0.08)" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#e50023" }} />
                  </div>
                  <h3
                    className="font-bold mb-3 text-base uppercase tracking-wide"
                    style={{ color: "#0a0a0a" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-8">
          {WHY_CHOOSE.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                height: 3,
                width: i === current ? 32 : 12,
                background: i === current ? "#e50023" : "#d1d5db",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { src: "/images/projects/proj-1.jpg",  label: "Domestic Roofing — Norfolk" },
  { src: "/images/projects/proj-2.jpg",  label: "Marine / Boat Refit" },
  { src: "/images/projects/proj-3.jpg",  label: "Roller Coaster — Great Yarmouth" },
  { src: "/images/projects/proj-4.jpg",  label: "Commercial High Street" },
  { src: "/images/projects/proj-5.jpg",  label: "Heritage Building" },
  { src: "/images/projects/proj-6.jpg",  label: "Industrial Warehouse" },
  { src: "/images/projects/proj-7.jpg",  label: "Industrial Unit" },
  { src: "/images/projects/proj-8.jpg",  label: "Covered Walkway" },
  { src: "/images/projects/proj-9.jpg",  label: "New Build — Block Work" },
  { src: "/images/projects/proj-10.jpg", label: "Residential Block" },
  { src: "/images/projects/proj-11.jpg", label: "Residential Block — Phase 2" },
  { src: "/images/projects/proj-12.jpg", label: "Roof Access — Rural" },
];

function ProjectsCarousel() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;
  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);
  const current = PROJECTS[active]!;

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-0.5 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-widest">Portfolio</span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white">OUR RECENT PROJECTS</h2>
            </div>
            <Link href="/services">
              <button className="btn-ghost flex-shrink-0">
                <span>View All Our Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </ScrollReveal>

        {/* Main image */}
        <div className="mx-auto relative overflow-hidden" style={{ borderRadius: 2, maxWidth: 800 }}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="relative"
            style={{ aspectRatio: "4 / 3" }}
          >
            <img
              src={current.src}
              alt={current.label}
              className="w-full h-full object-cover"
            />
            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.1) 45%, transparent 100%)" }}
            />
            {/* Label */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-bold uppercase tracking-widest text-white"
                style={{ background: "#e50023" }}
              >
                <span>D J Oakley — Great Yarmouth</span>
              </div>
              <p className="text-white text-xl sm:text-2xl font-bold uppercase tracking-wide">
                {current.label}
              </p>
            </div>
            {/* Dot indicators bottom-right */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 flex gap-2">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === active ? "#e50023" : "rgba(255,255,255,0.45)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200"
            style={{
              width: 44, height: 44,
              background: "rgba(10,10,10,0.55)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              cursor: "pointer",
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200"
            style={{
              width: 44, height: 44,
              background: "#e50023",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="mx-auto flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none", maxWidth: 800 }}>
          {PROJECTS.map((project, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-shrink-0 relative overflow-hidden transition-all duration-200"
              style={{
                width: 80, height: 56,
                outline: i === active ? "2px solid #e50023" : "2px solid transparent",
                outlineOffset: 0,
                padding: 0,
                background: "none",
                cursor: "pointer",
                opacity: i === active ? 1 : 0.55,
              }}
            >
              <img
                src={project.src}
                alt={project.label}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { data: services } = useListServices();

  const displayServices = services?.slice(0, 6) || [
    { id: 1, name: "Domestic Scaffolding", description: "Reliable scaffolding for home repairs, extensions, and renovations." },
    { id: 2, name: "Commercial Scaffolding", description: "Safe, efficient access solutions for commercial builds." },
    { id: 3, name: "Industrial Scaffolding", description: "Heavy-duty scaffolding for industrial plants." },
    { id: 4, name: "Roofing Scaffolding", description: "Specialist systems for roofing contractors." },
    { id: 5, name: "Heritage Scaffolding", description: "Sensitive solutions for listed and historic buildings." },
    { id: 6, name: "Emergency Scaffolding", description: "Fast-response emergency scaffolding 24/7." },
  ];

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
        <HeroCarousel />

        {/* Red accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary z-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-4 border-b-2 border-primary pb-1">
                Great Yarmouth & East Anglia
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl text-white mb-6 leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SCAFFOLDING
              <br />
              <Typewriter words={HERO_WORDS} />
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Choose D J Oakley Scaffolding Ltd in Great Yarmouth for all your industrial,
              commercial, and residential scaffolding needs. Over 30 years of trusted expertise.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/contact">
                <button className="btn-primary">
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-ghost">
                  <span>Our Services</span>
                </button>
              </Link>
              <Link href="/about#projects">
                <button className="btn-ghost">
                  <span>Our Portfolio</span>
                </button>
              </Link>
            </motion.div>

            {/* Quick contact strip */}
            <motion.div
              className="flex flex-wrap gap-6 mt-14 pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { icon: Phone, label: "01493 802500" },
                { icon: Phone, label: "07860 738293" },
                { icon: Mail, label: "info@djscaffolding-greatyarmouth.co.uk" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-gray-300 text-sm">
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES TICKER ── */}
      <ServicesTicker />

      {/* ── WHO ARE WE ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-0.5 bg-primary" />
                  <span className="text-primary text-sm font-bold uppercase tracking-widest">About Us</span>
                </div>
                <h2 className="text-4xl sm:text-5xl text-secondary mb-8 leading-tight">
                  WHO ARE D J OAKLEY
                  <br />
                  SCAFFOLDING <span className="text-primary">EXPERTS</span>?
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <p className="text-gray-600 leading-relaxed mb-6">
                  At D J Oakley Scaffolding Ltd, based in Great Yarmouth, we bring over 30 years
                  of experience in scaffolding hire and sales. Our dedicated team of skilled
                  professionals is not only reliable and approachable but also highly knowledgeable,
                  ensuring we deliver services that are precisely tailored to meet the unique
                  requirements of each client.
                </p>
                <p className="text-gray-600 leading-relaxed mb-10">
                  As a proud family-run business, we place great emphasis on offering a personalised
                  and professional service, striving to exceed expectations with every project.
                  Whether you need scaffolding for industrial, commercial, or residential purposes,
                  our expertise allows us to provide solutions that are both efficient and safe.
                  We are committed to maintaining the highest standards of quality and customer
                  satisfaction, making us a trusted choice in the industry.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <Link href="/about">
                  <button className="btn-dark">
                    <span>Learn More About Us</span>
                  </button>
                </Link>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary z-0" />
                <img
                  src="/images/dj-oakley-sign.jpg"
                  alt="D J Oakley Scaffolding Ltd sign on site"
                  className="relative z-10 w-full h-[460px] object-cover object-center shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-secondary z-0" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── STATS CARDS ── */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { value: 30, suffix: "+", label: "Years Experience", desc: "Decades of trusted industry expertise" },
              { value: 500, suffix: "+", label: "Projects Completed", desc: "Across East Anglia and beyond" },
              { value: 100, suffix: "%", label: "Safety Record", desc: "Fully insured, CITB trained team" },
              { value: 24, suffix: "/7", label: "Emergency Service", desc: "Round-the-clock rapid response" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="group relative overflow-hidden border border-white/10 p-8 flex flex-col"
                style={{ background: "rgba(255,255,255,0.04)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Top red accent bar */}
                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ background: "#e50023" }}
                />
                {/* Hover fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(229,0,35,0.08)" }}
                />

                <div className="relative z-10">
                  <div
                    className="font-display leading-none mb-3 tracking-tight"
                    style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", color: "#e50023" }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p
                    className="font-bold uppercase tracking-widest text-xs mb-2 text-white"
                    style={{ letterSpacing: "0.15em" }}
                  >
                    {stat.label}
                  </p>
                  <div className="w-8 h-0.5 mb-3" style={{ background: "#e50023" }} />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SCAFFOLDING SERVICES ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="right">
              <div className="relative">
                <img
                  src="/images/roller-coaster-scaffold.jpg"
                  alt="D J Oakley Scaffolding — Roller Coaster project, Great Yarmouth"
                  className="w-full h-[440px] object-cover object-top shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent" />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-0.5 bg-primary" />
                  <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Offer</span>
                </div>
                <h2 className="text-4xl sm:text-5xl text-secondary mb-8">
                  OUR SCAFFOLDING
                  <br />
                  SERVICES
                </h2>
              </ScrollReveal>

              <div className="space-y-3 mb-10">
                {SERVICES_LIST.map((item, i) => (
                  <ScrollReveal key={i} delay={0.08 * i}>
                    <div className="flex items-center gap-4 py-3 border-b border-gray-200 group">
                      <div className="w-8 h-8 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-secondary transition-colors">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.5}>
                <Link href="/contact">
                  <button className="btn-primary">
                    <span>Reach Out To Us Today</span>
                  </button>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <WhyChooseSlider />


      {/* ── RECENT PROJECTS ── */}
      <ProjectsCarousel />

      {/* ── CTA CONTACT STRIP ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-secondary text-center mb-4">
              DO YOU NEED THE SERVICES OF
              <br />
              <span className="text-primary">EXPERIENCED SCAFFOLDING ERECTORS?</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-12" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Contact Info */}
            <ScrollReveal delay={0.1}>
              <h3 className="text-secondary font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b-2 border-primary">
                Contact Us
              </h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-bold text-secondary text-sm mb-1">Tel:</p>
                  <p><a href="tel:01493802500" className="hover:text-primary transition-colors">01493 802500</a></p>
                  <p><a href="tel:07875344499" className="hover:text-primary transition-colors">07875 344499</a></p>
                  <p><a href="tel:07860738293" className="hover:text-primary transition-colors">07860 738293</a></p>
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm mb-1">Email:</p>
                  <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="hover:text-primary transition-colors text-sm break-all">
                    info@djscaffolding-greatyarmouth.co.uk
                  </a>
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm mb-1">Address:</p>
                  <p className="text-sm">Unit B Fenner Rd Monument Estate<br />Great Yarmouth<br />Norfolk</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal delay={0.2}>
              <h3 className="text-secondary font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b-2 border-primary">
                Find Us
              </h3>
              <div className="w-full h-56 bg-gray-100 border border-gray-200 relative overflow-hidden">
                <iframe
                  title="DJ Oakley Scaffolding location"
                  src="https://maps.google.com/maps?q=Unit+B+Fenner+Road,+Great+Yarmouth,+Norfolk+NR30+3AE&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Unit B Fenner Rd, Great Yarmouth, Norfolk</span>
              </div>
            </ScrollReveal>

            {/* Quick contact form */}
            <ScrollReveal delay={0.3}>
              <h3 className="text-secondary font-bold uppercase tracking-widest text-sm mb-6 pb-2 border-b-2 border-primary">
                Get In Touch
              </h3>
              <div className="space-y-3">
                {["Name", "Email Address", "Phone", "Message"].map((placeholder) => (
                  placeholder === "Message" ? (
                    <textarea
                      key={placeholder}
                      placeholder={placeholder}
                      rows={3}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  ) : (
                    <input
                      key={placeholder}
                      type="text"
                      placeholder={placeholder}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  )
                ))}
                <Link href="/contact">
                  <button className="btn-primary w-full mt-1">
                    <span>Send Message</span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
