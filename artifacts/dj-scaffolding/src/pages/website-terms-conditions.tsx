import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SECTIONS = [
  {
    title: "Cookies",
    content: [
      {
        text: "We use cookies to enhance your experience on our website. By accessing our website, you agree to the use of cookies in accordance with our Cookies & Privacy Policy.",
      },
      {
        text: "Like most interactive websites, our site uses cookies to store user preferences and facilitate certain functionalities, improving your browsing experience. Additionally, some of our affiliate and advertising partners may also use cookies.",
      },
    ],
  },
  {
    title: "License",
    content: [
      {
        text: "Unless otherwise stated, Our Company and/or its licensors own the intellectual property rights for all material on Our Website. All intellectual property rights are reserved. You may access this from Our Website for your own personal use subjected to restrictions set in these terms and conditions.",
      },
      {
        subtitle: "You must not:",
        list: [
          "Republish material from Our Website",
          "Sell, rent or sub-license material from Our Website",
          "Reproduce, duplicate or copy material from Our Website",
          "Redistribute content from Our Website",
        ],
      },
    ],
  },
  {
    title: "Comments",
    content: [
      {
        text: "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Our Company does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Our Company, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Our Company shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.",
      },
      {
        text: "Our Company reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.",
      },
    ],
  },
  {
    title: "Hyperlinking to our Content",
    content: [
      {
        text: "The following organisations may link to our Website without prior written approval:",
        list: [
          "Government agencies;",
          "Search engines;",
          "News organisations;",
          "Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses;",
          "System wide Accredited Businesses except soliciting non-profit organisations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.",
        ],
      },
    ],
  },
  {
    title: "iFrames",
    content: [
      {
        text: "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
      },
    ],
  },
  {
    title: "Content Liability",
    content: [
      {
        text: "We shall not be held responsible for any content on your Website. You agree to protect and defend us against all claims arising from your Website. No links should appear on any Website that may be considered libelous, obscene, criminal, or that infringe or violate any third-party rights.",
      },
    ],
  },
  {
    title: "Your Privacy",
    content: [
      {
        text: "We value your privacy and are committed to protecting your personal information. For details on how we collect, use, and safeguard your data, please review our privacy policy.",
      },
    ],
  },
  {
    title: "Reservation of Rights",
    content: [
      {
        text: "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.",
      },
    ],
  },
  {
    title: "Removal of Links from Our Website",
    content: [
      {
        text: "If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.",
      },
    ],
  },
  {
    title: "Disclaimer",
    content: [
      {
        text: "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:",
        list: [
          "Limit or exclude our or your liability for death or personal injury;",
          "Limit or exclude our or your liability for fraud or fraudulent misrepresentation;",
          "Limit any of our or your liabilities in any way that is not permitted under applicable law; or",
          "Exclude any of our or your liabilities that may not be excluded under applicable law.",
        ],
      },
      {
        text: "The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.",
      },
      {
        text: "As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.",
      },
    ],
  },
];

export default function WebsiteTermsConditions() {
  return (
    <Layout>
      {/* Hero banner */}
      <section className="relative pt-36 pb-16 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #e50023 0, #e50023 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-display font-black uppercase leading-none">
              Website Terms &amp;<br />
              <span className="text-primary">Conditions</span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Intro */}
          <ScrollReveal>
            <div className="border-l-4 border-primary pl-6 mb-14 space-y-4">
              <p className="text-gray-600 leading-relaxed text-base">
                These terms and conditions outline the rules and regulations for the use of D J Oakley Scaffolding
                and Access Ltd's website. By accessing this website we assume you accept these terms and conditions.
                Do not continue to use our website if you do not agree to take all of the terms and conditions
                stated on this page.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer
                Notice, as well as all Agreements: <strong>"Client," "You,"</strong> and <strong>"Your"</strong> refer
                to you, the person accessing this website and complying with the Company's terms and conditions.
                <strong> "The Company," "Ourselves," "We," "Our,"</strong> and <strong>"Us"</strong> refer to
                D J Oakley Scaffolding and Access Ltd. <strong>"Party," "Parties,"</strong> or <strong>"Us"</strong> refer
                to both the Client and the Company.
              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the
                process of our assistance to the Client in the most appropriate manner for the express purpose of
                meeting the Client's needs in respect of the provision of the Company's stated services, in
                accordance with and subject to the prevailing law of the United Kingdom.
              </p>
            </div>
          </ScrollReveal>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((section, si) => (
              <ScrollReveal key={si} delay={0.04 * si}>
                <div>
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

          {/* Footer note */}
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
