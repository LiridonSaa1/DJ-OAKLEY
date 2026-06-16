import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const submitContact = useSubmitContact({
    mutation: {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "Message Sent",
          description: "We'll be in touch as soon as possible.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    }
  });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    submitContact.mutate({ data });
  }

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Contact Us</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Get in touch for a free site survey and competitive quote. Our team is ready to provide safe access for your next project.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Details */}
            <div>
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-secondary tracking-tight mb-8">Let's Discuss Your Project</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</h4>
                      <a href="tel:07939352899" className="text-xl font-bold text-secondary hover:text-primary transition-colors">
                        07939 352 899
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                      <a href="mailto:info@djscaffolding-greatyarmouth.co.uk" className="text-lg font-bold text-secondary hover:text-primary transition-colors break-all">
                        info@djscaffolding-greatyarmouth.co.uk
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Address</h4>
                      <p className="text-lg font-bold text-secondary">
                        Great Yarmouth,<br />
                        Norfolk, NR31
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="w-full h-64 bg-gray-200 border border-gray-300 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Great+Yarmouth,Norfolk,UK&zoom=13&size=600x300&maptype=roadmap&key=placeholder')] bg-cover bg-center"></div>
                  <div className="relative z-10 flex flex-col items-center text-gray-500">
                    <MapPin className="w-8 h-8 mb-2" />
                    <span className="font-medium">Map View</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <div>
              <ScrollReveal delay={0.2}>
                <div className="bg-white border border-gray-100 shadow-xl p-8">
                  {isSuccess ? (
                    <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-secondary mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-8">Thank you for contacting DJ Scaffolding. We'll be in touch shortly.</p>
                      <Button 
                        onClick={() => setIsSuccess(false)}
                        variant="outline"
                        className="font-bold uppercase"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <h3 className="text-2xl font-bold text-secondary tracking-tight border-b border-gray-100 pb-4 mb-6">
                          Send a Message
                        </h3>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-secondary font-bold">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="h-12 bg-gray-50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-secondary font-bold">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@example.com" className="h-12 bg-gray-50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-secondary font-bold">Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="07123 456789" className="h-12 bg-gray-50" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-secondary font-bold">Service of Interest</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Domestic Scaffolding" className="h-12 bg-gray-50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-secondary font-bold">Project Details</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please provide details about your scaffolding requirements..." 
                                  className="min-h-[150px] resize-y bg-gray-50" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full h-14 bg-primary text-secondary hover:bg-primary/90 font-bold text-lg uppercase tracking-wide"
                          disabled={submitContact.isPending}
                        >
                          {submitContact.isPending ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Submit Enquiry"
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
