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



// <script type="application/ld+json">
//   {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     "name": "Invisible Text",
//     "url": "https://www.invisibletext.me/",
//     "logo": "https://www.invisibletext.me/logo.webp",
//     "contactPoint": {
//       "@type": "ContactPoint",
//       "email": "support@invisibletext.me",
//       "contactType": "Customer Support",
//       "areaServed": ["en", "de", "es", "fr", "pt", "nl", "id", "it", "ru", "ko", "tr"],
//       "availableLanguage": ["English", "German", "Spanish", "French", "Portuguese", "Dutch", "Indonesian", "Italian", "Russian", "Korean", "Turkish"]
//     }
//   }
//   </script>

//   <script type="application/ld+json">
//   {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://www.invisibletext.me/"
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": "About Us",
//         "item": "https://www.invisibletext.me/about"
//       },
//       {
//         "@type": "ListItem",
//         "position": 3,
//         "name": "Contact Us",
//         "item": "https://www.invisibletext.me/contact"
//       },
//       {
//         "@type": "ListItem",
//         "position": 4,
//         "name": "Privacy Policy",
//         "item": "https://www.invisibletext.me/privacy"
//       },
//       {
//         "@type": "ListItem",
//         "position": 5,
//         "name": "Terms and Condition",
//         "item": "https://www.invisibletext.me/terms-and-conditions"
//       }
//     ]
//   }
//   </script><script type="application/ld+json">
//   {
//     "@context": "https://schema.org",
//     "@type": "WebPage",
//     "name": "Invisible Text - English",
//     "url": "https://www.invisibletext.me/",
//     "inLanguage": "en",
//     "isPartOf": {
//       "@type": "WebSite",
//       "url": "https://www.invisibletext.me/"
//     }
//   }
//   </script><script type="application/ld+json">
//   {
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     "mainEntity": [
//       {
//         "@type": "Question",
//         "name": "What is an empty text?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "An empty text is a Unicode character that appears blank but occupies space, allowing for unique text formatting and applications. It looks like blank space but is a character like any other letter or number."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "How do I use invisible characters in my social media bio?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "To use invisible spaces in your social media bio, copy an invisible text from a blank space character tool and paste it into the desired location in your bio."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "Can invisible characters be used in coding?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Yes, invisible characters can be used in coding to help format and structure code, especially in languages that are sensitive to whitespace."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "Are invisible characters allowed in all apps?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Most apps allow the use of invisible characters, but some might filter them out due to security settings or platform restrictions."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "How can I send a blank message on WhatsApp?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "To send a blank message on WhatsApp, use an invisible character generator, copy the character, and paste it into the message field before sending."
//         }
//       },
//       {
//         "@type": "Question",
//         "name": "How can I copy paste empty space?",
//         "acceptedAnswer": {
//           "@type": "Answer",
//           "text": "Visit our website www.invisibletext.me, which allows you to generate empty space with multiple methods. You can generate and copy-paste empty spaces into your clipboard with just a single click."
//         }
//       }
//     ]
//   }
//   </script>