import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useGetContentSection } from "@workspace/api-client-react";

export default function About() {
  const { data: aboutSection } = useGetContentSection("about_full");

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">About Us</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Building solid foundations of trust across Great Yarmouth and Norfolk since day one.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">Our Story</h2>
                <h3 className="text-4xl font-bold text-secondary tracking-tight mb-6">Local Experts. <br/>National Standards.</h3>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed mb-8">
                  {aboutSection?.content ? (
                    <div dangerouslySetLayout={{ __html: aboutSection.content }} />
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
                {[
                  "TG20:21 Compliant",
                  "CITB Registered",
                  "£10m Public Liability",
                  "Local & Reliable"
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={0.1 * i} direction="right">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-secondary font-medium">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4}>
                <Link href="/contact">
                  <Button className="bg-primary text-secondary hover:bg-primary/90 font-bold uppercase tracking-wide px-8">
                    Work With Us
                  </Button>
                </Link>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={0.2} className="relative">
              <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden border-4 border-white shadow-2xl">
                 <img 
                   src="/hero-bg.png" 
                   alt="DJ Scaffolding Team at work" 
                   className="w-full h-full object-cover grayscale opacity-80"
                 />
                 <div className="absolute inset-0 bg-primary mix-blend-color opacity-20"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-secondary text-white p-8 max-w-xs shadow-xl">
                <p className="text-xl font-bold leading-snug">
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
