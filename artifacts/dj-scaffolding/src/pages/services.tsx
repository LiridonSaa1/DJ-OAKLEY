import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useListServices } from "@workspace/api-client-react";
import { Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

export default function Services() {
  const { data: services, isLoading } = useListServices();
  
  const displayServices = services?.length ? services : FALLBACK_SERVICES;

  return (
    <Layout>
      {/* Header */}
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Our Services</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Comprehensive scaffolding solutions tailored to your project requirements. From simple domestic repairs to complex industrial builds, we provide safe access you can rely on.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayServices.map((service, i) => (
              <ScrollReveal key={service.id} delay={0.1 * (i % 4)} className="h-full">
                <div className="group relative bg-white border border-gray-100 p-8 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:text-primary transition-all pointer-events-none">
                    <span className="text-5xl font-black">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="w-14 h-14 bg-secondary text-white flex items-center justify-center rounded-sm mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors">
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
            <h2 className="text-3xl md:text-4xl font-black text-secondary uppercase tracking-tight mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-secondary/80 text-lg mb-8 max-w-2xl mx-auto font-medium">
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
