import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SECTIONS = [
  {
    title: "Types Of Information We May Collect From You",
    content: [
      {
        subtitle: "Information you supply to us",
        text: "You may supply us with information about you by filling in forms on our website. This includes information you provide when you submit a contact/enquiry form. The information you give us may include your name, address, e-mail address, phone number, and a brief message.",
      },
      {
        subtitle: "Information our website automatically collects about you",
        text: "With regard to each of your visits to our website we may automatically collect information including the following:",
        list: [
          "Technical information, including a truncated and anonymised version of your Internet protocol (IP) address, browser type and version, operating system and platform;",
          "Information about your visit, including what pages you visit, how long you are on the site, how you got to the site (including date and time); page response times, length of visit, what you click on, documents downloaded and download errors.",
        ],
      },
      {
        subtitle: "Cookies",
        text: "Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. For detailed information on the cookies we use and the purposes for which we use them see our Cookie Policy.",
      },
    ],
  },
  {
    title: "How We May Use The Information We Collect",
    content: [
      {
        text: "Information you supply to us to provide you with information and/or services that you request from us; we collect any additional personal data you may provide to us from time to time if you contact us by email, letter or telephone, through our Site, by submitting a comment on our Site, or by any other means; Survey responses so we can review and continue to improve our services.",
      },
    ],
  },
  {
    title: "Information We Automatically Collect About You",
    content: [
      {
        text: "We will use this information:",
        list: [
          "To administer our site including troubleshooting and statistical purposes;",
          "To improve our site to ensure that content is presented in the most effective manner for you and for your computer;",
          "Security and debugging as part of our efforts to keep our site safe and secure.",
        ],
      },
      {
        text: "This information is collected anonymously and is not linked to information that identifies you as an individual. We use Google Analytics to track this information.",
      },
    ],
  },
  {
    title: "Disclosure Of Your Information",
    content: [
      {
        text: "Any information you provide to us will either be emailed directly to us or may be stored on a secure server using a trusted third-party website and hosting provider to facilitate the running and management of this website.",
      },
      {
        text: "We do not rent, sell or share personal information about you with other people or non-affiliated companies. Your data may be shared with our trusted, third-party operating systems which we use to manage our services and keep in touch with you.",
      },
      {
        text: "We will use all reasonable efforts to ensure that your personal data is not disclosed to regional/national institutions and authorities, unless required by law or other regulations.",
      },
      {
        text: "Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our site; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access.",
      },
    ],
  },
  {
    title: "Third Party Links",
    content: [
      {
        text: "Our site may, from time to time, contain links to and from third-party websites. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.",
      },
    ],
  },
  {
    title: "Your Rights – Access To Your Personal Data",
    content: [
      {
        text: 'You have the right to ensure that your personal data is being processed lawfully ("Subject Access Right"). Your subject access right can be exercised in accordance with data protection laws and regulations. Any subject access request must be made in writing to us. We will provide your personal data to you within the statutory time frames. To enable us to trace any of your personal data that we may be holding, we may need to request further information from you. If you have a complaint about how we have used your information, you have the right to complain to the Information Commissioner\'s Office (ICO).',
      },
    ],
  },
  {
    title: "Changes To Our Privacy Policy",
    content: [
      {
        text: "Any changes we may make to our privacy policy in the future will be posted on this page and, where appropriate, notified to you by e-mail. Please check back frequently to see any updates or changes to our privacy policy.",
      },
    ],
  },
  {
    title: "Contact",
    content: [
      {
        text: "Questions, comments and requests regarding this privacy policy are welcomed and should be addressed to us.",
      },
    ],
  },
];

export default function CookiesPrivacyPolicy() {
  return (
    <Layout>
      {/* Hero banner */}
      <section className="relative pt-36 pb-16 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #e50023 0, #e50023 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-display font-black uppercase leading-none">
              Cookies &amp; Privacy<br />
              <span className="text-primary">Policy</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Policy body */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Intro */}
          <ScrollReveal>
            <div className="border-l-4 border-primary pl-6 mb-14">
              <p className="text-gray-600 leading-relaxed text-base">
                This website is operated by us and we are committed to protecting and preserving the privacy of our
                visitors when visiting our site or communicating electronically with us.
              </p>
              <p className="text-gray-600 leading-relaxed text-base mt-4">
                This policy sets out how we process any personal data we collect from you or that you provide to us
                through our website. We confirm that we will keep your information secure and that we will comply fully
                with all applicable UK Data Protection legislation and regulations. Please read the following carefully
                to understand what happens to personal data that you choose to provide to us, or that we collect from
                you when you visit this site. By visiting our website you are accepting and consenting to the practices
                described in this policy.
              </p>
            </div>
          </ScrollReveal>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section, si) => (
              <ScrollReveal key={si} delay={0.05 * si}>
                <div>
                  {/* Section heading */}
                  <div className="flex items-center gap-4 mb-5">
                    <span
                      className="text-xs font-black uppercase tracking-widest px-2 py-1 flex-shrink-0"
                      style={{ background: "#e50023", color: "#fff" }}
                    >
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-secondary">
                      {section.title}
                    </h2>
                  </div>

                  <div className="pl-10 space-y-4">
                    {section.content.map((block, bi) => (
                      <div key={bi}>
                        {block.subtitle && (
                          <h3 className="font-bold text-secondary mb-2 text-base">{block.subtitle}</h3>
                        )}
                        {block.text && (
                          <p className="text-gray-600 leading-relaxed text-sm">{block.text}</p>
                        )}
                        {block.list && (
                          <ul className="mt-3 space-y-2">
                            {block.list.map((item, li) => (
                              <li key={li} className="flex items-start gap-3 text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Last updated notice */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Last reviewed: {new Date().getFullYear()}
              </p>
              <a
                href="/contact"
                className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Contact Us →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
