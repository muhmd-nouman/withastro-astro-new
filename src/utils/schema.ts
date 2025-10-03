export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "Website",
  name: "Invisible Symbol",
  description: "Tools for working with invisible Unicode characters",
  url: "https://invisiblesymbol.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "{search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Invisible Character Tool",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are invisible characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Invisible characters are Unicode characters that take up space but are not visible when rendered. They can be used for various purposes, including formatting and creating unique usernames.",
      },
    },
    {
      "@type": "Question",
      name: "Are invisible characters safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While invisible characters are generally safe, some platforms may filter them out or display them differently. Always test before using them in important situations.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use invisible characters in passwords?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's not recommended to use invisible characters in passwords as they may not be supported by all systems and could lead to login issues.",
      },
    },
    {
      "@type": "Question",
      name: "How do I see invisible characters?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use specialized text editors or online tools that highlight invisible characters to see them. Some word processors also have options to show hidden characters.",
      },
    },
  ],
};
