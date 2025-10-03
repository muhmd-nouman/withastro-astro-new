import type { UnicodeSubCategory } from "./letter-unicode-data"

export const markCategory = {
  name: "Marks",
  slug: "marks",
  description: "Unicode characters that modify other characters",
  subcategories: [
    {
      name: "Nonspacing Mark",
      slug: "nonspacing",
      description:
        "Marks that don't occupy additional space and are usually rendered in combination with a base character",
      parentCategory: "marks",
    },
    {
      name: "Spacing Combining Mark",
      slug: "spacing",
      description: "Marks that occupy their own space and are usually rendered alongside a base character",
      parentCategory: "marks",
    },
    {
      name: "Enclosing Mark",
      slug: "enclosing",
      description: "Marks that enclose or surround the base character",
      parentCategory: "marks",
    },
  ] as UnicodeSubCategory[],
}

export const markCharacters = {
  nonspacing: [
    {
      code: "U+0300",
      name: "Combining Grave Accent",
      description: "Adds a grave accent to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0301",
      name: "Combining Acute Accent",
      description: "Adds an acute accent to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0302",
      name: "Combining Circumflex Accent",
      description: "Adds a circumflex accent to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0303",
      name: "Combining Tilde",
      description: "Adds a tilde to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0304",
      name: "Combining Macron",
      description: "Adds a macron to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0308",
      name: "Combining Diaeresis",
      description: "Adds a diaeresis to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0327",
      name: "Combining Cedilla",
      description: "Adds a cedilla to the previous character",
      subcategory: "nonspacing",
    },
    {
      code: "U+0331",
      name: "Combining Macron Below",
      description: "Adds a macron below the previous character",
      subcategory: "nonspacing",
    },
  ],
  spacing: [
    { code: "U+0903", name: "Devanagari Sign Visarga", description: "Devanagari visarga", subcategory: "spacing" },
    {
      code: "U+093E",
      name: "Devanagari Vowel Sign Aa",
      description: "Devanagari long a vowel sign",
      subcategory: "spacing",
    },
    {
      code: "U+0940",
      name: "Devanagari Vowel Sign Ii",
      description: "Devanagari long i vowel sign",
      subcategory: "spacing",
    },
    {
      code: "U+0949",
      name: "Devanagari Vowel Sign Candra O",
      description: "Devanagari candra o vowel sign",
      subcategory: "spacing",
    },
    {
      code: "U+094A",
      name: "Devanagari Vowel Sign Short O",
      description: "Devanagari short o vowel sign",
      subcategory: "spacing",
    },
    { code: "U+094B", name: "Devanagari Vowel Sign O", description: "Devanagari o vowel sign", subcategory: "spacing" },
    {
      code: "U+094C",
      name: "Devanagari Vowel Sign Au",
      description: "Devanagari au vowel sign",
      subcategory: "spacing",
    },
    { code: "U+0982", name: "Bengali Sign Anusvara", description: "Bengali anusvara", subcategory: "spacing" },
  ],
  enclosing: [
    {
      code: "U+20DD",
      name: "Combining Enclosing Circle",
      description: "Encloses the previous character in a circle",
      subcategory: "enclosing",
    },
    {
      code: "U+20DE",
      name: "Combining Enclosing Square",
      description: "Encloses the previous character in a square",
      subcategory: "enclosing",
    },
    {
      code: "U+20DF",
      name: "Combining Enclosing Diamond",
      description: "Encloses the previous character in a diamond",
      subcategory: "enclosing",
    },
    {
      code: "U+20E0",
      name: "Combining Enclosing Circle Backslash",
      description: "Encloses the previous character in a circle with a backslash",
      subcategory: "enclosing",
    },
    {
      code: "U+20E2",
      name: "Combining Enclosing Screen",
      description: "Encloses the previous character in a screen",
      subcategory: "enclosing",
    },
    {
      code: "U+20E3",
      name: "Combining Enclosing Keycap",
      description: "Encloses the previous character in a keycap",
      subcategory: "enclosing",
    },
    {
      code: "U+20E4",
      name: "Combining Enclosing Upward Pointing Triangle",
      description: "Encloses the previous character in an upward pointing triangle",
      subcategory: "enclosing",
    },
  ],
}

// Helper function to get all characters from a specific subcategory
export function getMarkCharactersBySubcategory(subcategory: string) {
  return markCharacters[subcategory as keyof typeof markCharacters] || []
}

// Helper function to get all mark characters
export function getAllMarkCharacters() {
  return Object.values(markCharacters).flat()
}

