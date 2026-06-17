import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useSubmitContact } from "@/lib/api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Loader2, CheckCircle2, Clock, Award, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(5, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ASSOCIATIONS = [
  "Federation Of Small Businesses",
  "The Construction Industry Training Board",
  "National Access & Scaffolding Confederation",
  "Construction Equipment Association",
  "CITB – Advanced Scaffolding – Certificate",
  "First Aid Awards Ltd – Emergency First Aid at Work – Level 2 Award",
];

const ACCREDITATIONS = [
  "Construction Industry Scaffolders Record Scheme",
];

export default function Contact() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const submitContact = useSubmitContact({
    mutation: {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
        toast({ title: "Message Sent", description: "We'll be in touch as soon as possible." });
      },
      onError: () => {
        toast({ title: "Error", description: "There was a problem sending your message. Please try again.", variant: "destructive" });
      },
    },
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", address: "", email: "", phone: "", message: "" },
  });

  function onSubmit(data: ContactFormValues) {
    submitContact.mutate({ data: { name: data.name, email: data.email, phone: data.phone, message: data.message } });
  }

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center overflow-hidden text-center" style={{ minHeight: "55vh" }}>
        <img
          src="/images/footer.png"
          alt="DJ Oakley Scaffolding vehicles"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.6) 100%)" }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-40">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Get In Touch</span>
              <div className="w-10 h-0.5 bg-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
              CONTACT US FOR<br />
              <span className="text-primary">SCAFFOLDING HIRE &amp; SALES</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              At D J Oakley Scaffolding Ltd, based in Great Yarmouth, we offer professional scaffolding services for industrial, commercial, and residential projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHO ARE WE ── */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
                WHO ARE DJ OAKLEY<br />SCAFFOLDING LTD?
              </h2>
              <div className="w-12 h-1 bg-primary mb-8" />
              <p className="text-gray-300 leading-relaxed mb-6">
                At D J Oakley Scaffolding Ltd, based in Great Yarmouth, we bring over 30 years of experience in scaffolding hire and sales. Our dedicated team of skilled professionals is not only reliable and approachable but also highly knowledgeable, ensuring we deliver services that are precisely tailored to meet the unique requirements of each client.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                As a proud family-run business, we place great emphasis on offering a personalised and professional service, striving to exceed expectations with every project. Whether you need scaffolding for industrial, commercial, or residential purposes, our expertise allows us to provide solutions that are both efficient and safe. We are committed to maintaining the highest standards of quality and customer satisfaction, making us a trusted choice in the industry.
              </p>
              <Link href="/scaffolding-services">
                <button className="btn-primary">
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="relative">
                <img
                  src="/images/roller-coaster-scaffold.jpg"
                  alt="DJ Oakley scaffolding project"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 flex items-center justify-center" style={{ background: "#e50023" }}>
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

      {/* ── CONTACT DETAILS ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <h2 className="text-3xl font-black text-secondary uppercase tracking-tight mb-4">CONTACT DETAILS</h2>
              <div className="w-12 h-1 bg-primary mb-10" />

              <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p>Unit B Fenner Rd Monument Estate</p>
                    <p>Great Yarmouth</p>
                    <p>NR30 3PS</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="text-primary font-medium hover:underline break-all">
                    info@djscaffolding-greatyarmouth.co.uk
                  </a>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <a href="tel:01493802500" className="block text-primary font-medium hover:underline">01493 802500</a>
                    <a href="tel:07860738293" className="block text-primary font-medium hover:underline">07860 738293</a>
                    <a href="tel:07875344499" className="block text-primary font-medium hover:underline">07875 344499</a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-secondary mb-1">Hours of business:</p>
                    <p>Monday to Saturday: 7:00 am – 5:00 pm</p>
                    <p>Sunday: 9:00 am – 2:30 pm</p>
                  </div>
                </div>

                {/* Professional associations */}
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-secondary mb-2">Professional associations:</p>
                    <ul className="space-y-1">
                      {ASSOCIATIONS.map(a => (
                        <li key={a} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Accreditations */}
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-secondary mb-2">Professional accreditations:</p>
                    <ul className="space-y-1">
                      {ACCREDITATIONS.map(a => (
                        <li key={a} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <img
                src="/images/projects/proj-5.jpg"
                alt="Heritage building scaffolding"
                className="w-full h-[520px] object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA + CONTACT / MAP / FORM ── */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-4">
              DO YOU NEED THE SERVICES OF<br />EXPERIENCED SCAFFOLDING ERECTORS?
            </h2>
            <div className="w-16 h-1 bg-primary mb-12" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Us */}
            <ScrollReveal>
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b border-white/10">CONTACT US</h3>
              <div className="space-y-5 text-gray-300 text-sm">
                <div>
                  <p className="text-white font-bold mb-1">Tel:</p>
                  <a href="tel:01493802500" className="block hover:text-primary transition-colors">01493 802500</a>
                  <a href="tel:07875344499" className="block hover:text-primary transition-colors">07875 344499</a>
                  <a href="tel:07860738293" className="block hover:text-primary transition-colors">07860 738293</a>
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Email:</p>
                  <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="hover:text-primary transition-colors break-all">
                    info@djscaffolding-greatyarmouth.co.uk
                  </a>
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Address:</p>
                  <p>Unit B Fenner Rd Monument Estate</p>
                  <p>Great Yarmouth</p>
                  <p>NR30 3PS</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Find Us */}
            <ScrollReveal delay={0.1}>
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b border-white/10">FIND US</h3>
              <div className="overflow-hidden" style={{ height: 200 }}>
                <iframe
                  title="DJ Oakley Scaffolding location"
                  src="https://maps.google.com/maps?q=Unit+B+Fenner+Road,+Great+Yarmouth,+Norfolk+NR30+3AE&z=15&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-gray-400 text-xs">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span>Unit B Fenner Rd, Great Yarmouth, NR30 3PS</span>
              </div>
            </ScrollReveal>

            {/* Get In Touch form */}
            <ScrollReveal delay={0.2}>
              <h3 className="text-white font-black uppercase tracking-widest text-sm mb-4 pb-3 border-b border-white/10">GET IN TOUCH</h3>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                  <p className="text-white font-bold text-lg mb-2">Message Sent!</p>
                  <p className="text-gray-400 text-sm mb-6">We'll be in touch shortly.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 border border-white/20 text-white text-sm font-bold uppercase tracking-wide hover:bg-white/10 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    {(["name", "address", "email", "phone"] as const).map(field => (
                      <FormField
                        key={field}
                        control={form.control}
                        name={field}
                        render={({ field: f }) => (
                          <FormItem>
                            <FormControl>
                              <input
                                {...f}
                                placeholder={field === "name" ? "Name" : field === "address" ? "Your Address" : field === "email" ? "Email Address" : "Phone"}
                                className="w-full border border-white/10 bg-white/5 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400 text-xs" />
                          </FormItem>
                        )}
                      />
                    ))}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea
                              {...field}
                              placeholder="Message"
                              rows={4}
                              className="w-full border border-white/10 bg-white/5 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />
                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full py-3 font-black uppercase tracking-wide text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                      style={{ background: "#e50023" }}
                    >
                      {submitContact.isPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : "Submit"}
                    </button>
                  </form>
                </Form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
