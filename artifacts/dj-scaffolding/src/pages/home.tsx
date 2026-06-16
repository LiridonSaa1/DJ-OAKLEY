import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, HardHat, Ruler, PhoneCall, Clock } from "lucide-react";
import { useListServices, useGetContentSection } from "@workspace/api-client-react";

export default function Home() {
  const { data: services } = useListServices();
  const { data: heroSection } = useGetContentSection("hero");
  const { data: aboutTeaser } = useGetContentSection("about_teaser");

  const displayServices = services?.slice(0, 4) || [
    { id: 1, name: "Domestic Scaffolding", description: "Reliable scaffolding for home repairs, extensions, and renovations." },
    { id: 2, name: "Commercial Scaffolding", description: "Safe, efficient access solutions for commercial builds." },
    { id: 3, name: "Industrial Scaffolding", description: "Heavy-duty scaffolding for industrial plants." },
    { id: 4, name: "Emergency Scaffolding", description: "Fast-response emergency scaffolding 24/7." }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent z-10" />
          <img 
            src="/hero-bg.png" 
            alt="Scaffolding structure against Norfolk sky" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 backdrop-blur-sm rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Your Local Scaffolding Specialists</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                {heroSection?.title || "Built on Trust. Erected with Precision."}
              </h1>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                {heroSection?.content || "Serving Great Yarmouth and Norfolk with premium, safe, and reliable scaffolding solutions for domestic, commercial, and industrial projects."}
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-primary text-secondary hover:bg-primary/90 h-14 px-8 text-base font-bold uppercase tracking-wide group">
                    Get a Free Quote
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="h-14 px-8 text-base font-bold uppercase tracking-wide border-white/20 text-white hover:bg-white/10">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <ScrollReveal>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">What We Do</h2>
                <h3 className="text-4xl font-bold text-secondary tracking-tight">Comprehensive Scaffolding Solutions</h3>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.2} direction="left">
              <Link href="/services">
                <Button variant="outline" className="font-bold uppercase tracking-wide border-secondary/20 hover:bg-secondary hover:text-white">
                  View All Services
                </Button>
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service, i) => (
              <ScrollReveal key={service.id} delay={0.1 * i} className="h-full">
                <div className="group relative bg-white border border-gray-100 p-8 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:text-primary transition-all">
                    <span className="text-5xl font-black">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="w-12 h-12 bg-secondary text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors">
                    <Ruler className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-secondary mb-3">{service.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Why Choose Us</h2>
                <h3 className="text-4xl font-bold tracking-tight mb-6">Built on Safety.<br/>Driven by Excellence.</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {aboutTeaser?.content || "With over 15 years of experience serving Great Yarmouth and surrounding areas, DJ Scaffolding has built a reputation for reliability, precision, and unwavering commitment to safety."}
                </p>
              </ScrollReveal>

              <div className="space-y-4 mb-10">
                {[
                  "Fully insured and certified professionals",
                  "Strict adherence to TG20:21 compliance",
                  "Competitive pricing without compromising quality",
                  "Prompt, reliable service delivery"
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={0.1 * i} direction="right">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-gray-200">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4}>
                <Link href="/about">
                  <Button className="bg-primary text-secondary hover:bg-primary/90 font-bold uppercase tracking-wide px-8">
                    Read Our Story
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 15, suffix: "+", label: "Years Experience", icon: Clock },
                { value: 500, suffix: "+", label: "Projects Completed", icon: HardHat },
                { value: 100, suffix: "%", label: "Safety Record", icon: ShieldCheck },
                { value: 24, suffix: "/7", label: "Emergency Service", icon: PhoneCall }
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <div className="bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                    <stat.icon className="w-8 h-8 text-primary mb-4" />
                    <div className="text-4xl font-black text-white mb-2 font-mono">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-secondary uppercase tracking-tight mb-6">
              Ready to start your next project?
            </h2>
            <p className="text-secondary/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
              Get in touch today for a free, no-obligation site survey and competitive quote.
            </p>
            <Link href="/contact">
              <Button className="bg-secondary text-white hover:bg-secondary/90 h-14 px-10 text-lg font-bold uppercase tracking-wide">
                Contact Us Now
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
