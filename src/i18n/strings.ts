// src/i18n/strings.ts

export const strings = {
  en: {
    breadcrumbs: {
      home: "Home",
      unicode: "Unicode Characters",
    },
    unicode: {
      details: "Character Details",
      category: "Category",
      block: "Unicode Block",
      plane: "Unicode Plane",
      htmlEntity: "HTML Entity",
      decimal: "Decimal Code",
      version: "Unicode Version",
      copySymbol: "Copy Symbol",
      copyCode: "Copy Code",
      clickToCopy: "Click to copy",
      copied: "Copied!",
      content: {
        title: "About This Character",
        usageTitle: "Common Usage",
        historyTitle: "Historical Background",
        technicalTitle: "Technical Information",
        examples: "Usage Examples",
        defaultUsage:
          "This Unicode character is used in various contexts depending on the specific needs of the text or document.",
        defaultHistory:
          "This character was added to the Unicode Standard as part of its ongoing development to provide comprehensive text encoding support.",
        defaultTechnical:
          "This character follows Unicode's standard encoding principles and can be used in any Unicode-compliant system.",
      },
      categories: {
        Lu: "Uppercase Letter",
        Ll: "Lowercase Letter",
        Lt: "Titlecase Letter",
        Lm: "Modifier Letter",
        Lo: "Other Letter",
        Mn: "Non-spacing Mark",
        Mc: "Spacing Mark",
        Me: "Enclosing Mark",
        Nd: "Decimal Number",
        Nl: "Letter Number",
        No: "Other Number",
        Pc: "Connector Punctuation",
        Pd: "Dash Punctuation",
        Ps: "Open Punctuation",
        Pe: "Close Punctuation",
        Pi: "Initial Punctuation",
        Pf: "Final Punctuation",
        Po: "Other Punctuation",
        Sm: "Math Symbol",
        Sc: "Currency Symbol",
        Sk: "Modifier Symbol",
        So: "Other Symbol",
        Zs: "Space Separator",
        Zl: "Line Separator",
        Zp: "Paragraph Separator",
        Cc: "Control",
        Cf: "Format",
        Cs: "Surrogate",
        Co: "Private Use",
        Cn: "Unassigned",
      },
      planes: {
        BMP: "Basic Multilingual Plane",
        SMP: "Supplementary Multilingual Plane",
        SIP: "Supplementary Ideographic Plane",
        TIP: "Tertiary Ideographic Plane",
        SSP: "Supplementary Special-purpose Plane",
        PUA: "Private Use Area",
      },
      related: {
        title: "Related Characters",
        category: "Same Category",
        block: "Same Block",
        noResults: "No related characters found",
      },
      search: {
        placeholder: "Search Unicode characters...",
        noResults: "No characters found",
        categories: "Categories",
        blocks: "Blocks",
      },
    },
  },
  es: {
    breadcrumbs: {
      home: "Inicio",
      unicode: "Caracteres Unicode",
    },
    unicode: {
      details: "Detalles del Carácter",
      category: "Categoría",
      block: "Bloque Unicode",
      plane: "Plano Unicode",
      htmlEntity: "Entidad HTML",
      decimal: "Código Decimal",
      version: "Versión Unicode",
      copySymbol: "Copiar Símbolo",
      copyCode: "Copiar Código",
      clickToCopy: "Clic para copiar",
      copied: "¡Copiado!",
      content: {
        title: "Sobre este Carácter",
        usageTitle: "Uso Común",
        historyTitle: "Antecedentes Históricos",
        technicalTitle: "Información Técnica",
        examples: "Ejemplos de Uso",
        defaultUsage:
          "Este carácter Unicode se utiliza en varios contextos según las necesidades específicas del texto o documento.",
        defaultHistory:
          "Este carácter se agregó al Estándar Unicode como parte de su desarrollo continuo para proporcionar soporte de codificación de texto integral.",
        defaultTechnical:
          "Este carácter sigue los principios de codificación estándar de Unicode y se puede usar en cualquier sistema compatible con Unicode.",
      },
      // ... (similar structure for categories, planes, etc.)
    },
  },
  // Add more languages as needed
};

// Type definitions for type safety
export interface TranslationStrings {
  breadcrumbs: {
    home: string;
    unicode: string;
  };
  unicode: {
    details: string;
    category: string;
    block: string;
    plane: string;
    htmlEntity: string;
    decimal: string;
    version: string;
    copySymbol: string;
    copyCode: string;
    clickToCopy: string;
    copied: string;
    content: {
      title: string;
      usageTitle: string;
      historyTitle: string;
      technicalTitle: string;
      examples: string;
      defaultUsage: string;
      defaultHistory: string;
      defaultTechnical: string;
    };
    categories: {
      [key: string]: string;
    };
    planes: {
      [key: string]: string;
    };
    related: {
      title: string;
      category: string;
      block: string;
      noResults: string;
    };
    search: {
      placeholder: string;
      noResults: string;
      categories: string;
      blocks: string;
    };
  };
}

// Utility function to ensure type safety when accessing translations
export function getTranslation(
  strings: Record<string, TranslationStrings>,
  lang: string,
  key: string,
): string {
  const parts = key.split(".");
  let current: any = strings[lang] || strings["en"];

  for (const part of parts) {
    current = current?.[part];
    if (current === undefined) {
      // Fallback to English if translation is missing
      current = strings["en"];
      for (const p of parts) {
        current = current?.[p];
      }
      break;
    }
  }

  return current || key;
}
