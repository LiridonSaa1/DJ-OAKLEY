import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
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
    title: "Fully Insured",
    desc: "We are fully insured for your complete peace of mind on every job.",
  },
  {
    title: "CITB / CISRS Trained",
    desc: "Ensuring the highest levels of skill, safety, and professionalism on every project.",
  },
  {
    title: "Over 30 Years' Experience",
    desc: "With 30 years in the scaffolding industry, we bring a wealth of knowledge to every job.",
  },
  {
    title: "Competitive Prices",
    desc: "We pride ourselves on offering competitive prices without compromising on quality.",
  },
  {
    title: "Free Quotes",
    desc: "No-obligation quotes for all our scaffolding services — call us today.",
  },
  {
    title: "Beat Any Genuine Quote",
    desc: "We provide competitive quotes, ensuring you receive the best value for top-quality scaffolding.",
  },
  {
    title: "All East Anglia Covered",
    desc: "We offer reliable scaffolding services and can travel to your location across East Anglia and further.",
  },
  {
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
      <section className="py-16 bg-white border-t border-gray-100">
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
                className="group relative overflow-hidden bg-white border border-gray-200 p-8 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Top red accent bar — animates wider on hover */}
                <div
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ background: "#e50023" }}
                />
                {/* Background fill on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "#0a0a0a" }}
                />

                <div className="relative z-10">
                  {/* Number */}
                  <div
                    className="font-display leading-none mb-3 tracking-tight"
                    style={{
                      fontSize: "clamp(3rem, 5vw, 4.5rem)",
                      color: "#e50023",
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <p
                    className="font-bold uppercase tracking-widest text-xs mb-2 transition-colors duration-300 group-hover:text-white"
                    style={{ color: "#0a0a0a", letterSpacing: "0.15em" }}
                  >
                    {stat.label}
                  </p>

                  {/* Divider */}
                  <div className="w-8 h-0.5 mb-3" style={{ background: "#e50023" }} />

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed transition-colors duration-300 group-hover:text-gray-400">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SCAFFOLDING SERVICES ── */}
      <section className="py-24 bg-gray-50">
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
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Strengths</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-4xl sm:text-5xl text-secondary">WHY CHOOSE US?</h2>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Committed to delivering the highest standards — fully insured, CITB trained,
                and over 30 years of trusted expertise.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Auto-scrolling infinite card strip */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white, transparent)" }} />

          <div
            className="flex gap-5 w-max"
            style={{ animation: "why-scroll 32s linear infinite" }}
          >
            {[...WHY_CHOOSE, ...WHY_CHOOSE].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }}
                transition={{ duration: 0.2 }}
                className="bg-gray-50 border border-gray-100 p-7 cursor-default flex-shrink-0"
                style={{ width: 280 }}
              >
                <div className="w-10 h-1 mb-5" style={{ background: "#e50023" }} />
                <h3 className="text-secondary font-bold mb-3 text-base uppercase tracking-wide">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── RECENT PROJECTS ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Portfolio</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white mb-12">OUR RECENT PROJECTS</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="overflow-hidden rounded-none">
              <img
                src="/images/projects.png"
                alt="DJ Oakley Scaffolding recent projects"
                className="w-full object-cover"
                style={{ maxHeight: 520 }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/services">
                <button className="btn-ghost">
                  <span>View All Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
              <div className="w-full h-56 bg-gray-100 flex items-center justify-center border border-gray-200 relative overflow-hidden">
                <iframe
                  title="DJ Oakley Scaffolding location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2397.6!2d1.7228!3d52.5914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e3b5b5e5e5e5%3A0x1!2sDJ+Oakley+Scaffolding+%26+Access!5e0!3m2!1sen!2suk!4v1234567890"
                  className="w-full h-full border-0"
                  loading="lazy"
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
