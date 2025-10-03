export interface UnicodeSubCategory {
  name: string
  slug: string
  description: string
  parentCategory: string
}

export interface LetterCategory {
  name: string
  slug: string
  description: string
  subcategories: UnicodeSubCategory[]
}

export const letterCategory: LetterCategory = {
  name: "Letters",
  slug: "letters",
  description: "Unicode characters representing letters from various writing systems",
  subcategories: [
    {
      name: "Uppercase Letter",
      slug: "uppercase",
      description: "Capital letters used at the start of sentences and proper nouns",
      parentCategory: "letters",
    },
    {
      name: "Lowercase Letter",
      slug: "lowercase",
      description: "Small letters used in general writing",
      parentCategory: "letters",
    },
    {
      name: "Titlecase Letter",
      slug: "titlecase",
      description: "Special characters that have both uppercase and lowercase variants in a single character",
      parentCategory: "letters",
    },
    {
      name: "Modifier Letter",
      slug: "modifier",
      description: "Letters that modify the pronunciation or meaning of other letters",
      parentCategory: "letters",
    },
    {
      name: "Other Letter",
      slug: "other",
      description: "Letters that don't fit into the other categories, including many non-Latin scripts",
      parentCategory: "letters",
    },
  ],
}

export const letterCharacters = {
  uppercase: [
    // Basic Latin Uppercase (A-Z)
    {
      code: "U+0041",
      name: "Latin Capital Letter A",
      description: "Standard Latin uppercase A",
      subcategory: "uppercase",
    },
    {
      code: "U+0042",
      name: "Latin Capital Letter B",
      description: "Standard Latin uppercase B",
      subcategory: "uppercase",
    },
    {
      code: "U+0043",
      name: "Latin Capital Letter C",
      description: "Standard Latin uppercase C",
      subcategory: "uppercase",
    },
    // Extended Latin Uppercase
    {
      code: "U+00C0",
      name: "Latin Capital Letter A with grave",
      description: "A with grave accent",
      subcategory: "uppercase",
    },
    {
      code: "U+00C1",
      name: "Latin Capital Letter A with acute",
      description: "A with acute accent",
      subcategory: "uppercase",
    },
    { code: "U+00C6", name: "Latin Capital Letter AE", description: "AE ligature", subcategory: "uppercase" },
    // Greek Uppercase
    {
      code: "U+0391",
      name: "Greek Capital Letter Alpha",
      description: "Greek uppercase alpha",
      subcategory: "uppercase",
    },
    {
      code: "U+0392",
      name: "Greek Capital Letter Beta",
      description: "Greek uppercase beta",
      subcategory: "uppercase",
    },
    {
      code: "U+0393",
      name: "Greek Capital Letter Gamma",
      description: "Greek uppercase gamma",
      subcategory: "uppercase",
    },
    // Cyrillic Uppercase
    {
      code: "U+0410",
      name: "Cyrillic Capital Letter A",
      description: "Cyrillic uppercase A",
      subcategory: "uppercase",
    },
    {
      code: "U+0411",
      name: "Cyrillic Capital Letter Be",
      description: "Cyrillic uppercase Be",
      subcategory: "uppercase",
    },
  ],

  lowercase: [
    // Basic Latin Lowercase (a-z)
    {
      code: "U+0061",
      name: "Latin Small Letter a",
      description: "Standard Latin lowercase a",
      subcategory: "lowercase",
    },
    {
      code: "U+0062",
      name: "Latin Small Letter b",
      description: "Standard Latin lowercase b",
      subcategory: "lowercase",
    },
    {
      code: "U+0063",
      name: "Latin Small Letter c",
      description: "Standard Latin lowercase c",
      subcategory: "lowercase",
    },
    // Extended Latin Lowercase
    {
      code: "U+00E0",
      name: "Latin Small Letter a with grave",
      description: "a with grave accent",
      subcategory: "lowercase",
    },
    {
      code: "U+00E1",
      name: "Latin Small Letter a with acute",
      description: "a with acute accent",
      subcategory: "lowercase",
    },
    { code: "U+00E6", name: "Latin Small Letter ae", description: "ae ligature", subcategory: "lowercase" },
    // Greek Lowercase
    {
      code: "U+03B1",
      name: "Greek Small Letter Alpha",
      description: "Greek lowercase alpha",
      subcategory: "lowercase",
    },
    { code: "U+03B2", name: "Greek Small Letter Beta", description: "Greek lowercase beta", subcategory: "lowercase" },
    {
      code: "U+03B3",
      name: "Greek Small Letter Gamma",
      description: "Greek lowercase gamma",
      subcategory: "lowercase",
    },
    // Cyrillic Lowercase
    { code: "U+0430", name: "Cyrillic Small Letter a", description: "Cyrillic lowercase a", subcategory: "lowercase" },
    {
      code: "U+0431",
      name: "Cyrillic Small Letter be",
      description: "Cyrillic lowercase be",
      subcategory: "lowercase",
    },
  ],

  titlecase: [
    // Titlecase Letters (rare in Unicode)
    {
      code: "U+01C5",
      name: "Latin Capital Letter D with Small Letter Z with Caron",
      description: "DZ with caron",
      subcategory: "titlecase",
    },
    {
      code: "U+01C8",
      name: "Latin Capital Letter L with Small Letter J",
      description: "LJ digraph",
      subcategory: "titlecase",
    },
    {
      code: "U+01CB",
      name: "Latin Capital Letter N with Small Letter J",
      description: "NJ digraph",
      subcategory: "titlecase",
    },
    {
      code: "U+01F2",
      name: "Latin Capital Letter D with Small Letter Z",
      description: "DZ digraph",
      subcategory: "titlecase",
    },
  ],

  modifier: [
    // Modifier Letters
    { code: "U+02B0", name: "Modifier Letter Small H", description: "Superscript h", subcategory: "modifier" },
    {
      code: "U+02B1",
      name: "Modifier Letter Small H with Hook",
      description: "Superscript h with hook",
      subcategory: "modifier",
    },
    { code: "U+02B2", name: "Modifier Letter Small J", description: "Superscript j", subcategory: "modifier" },
    { code: "U+02B3", name: "Modifier Letter Small R", description: "Superscript r", subcategory: "modifier" },
    {
      code: "U+02B4",
      name: "Modifier Letter Small Turn R",
      description: "Superscript turned r",
      subcategory: "modifier",
    },
    {
      code: "U+02B5",
      name: "Modifier Letter Small Turn R with Hook",
      description: "Superscript turned r with hook",
      subcategory: "modifier",
    },
    {
      code: "U+02B6",
      name: "Modifier Letter Small Capital Inverted R",
      description: "Superscript inverted capital R",
      subcategory: "modifier",
    },
    { code: "U+02B7", name: "Modifier Letter Small W", description: "Superscript w", subcategory: "modifier" },
    { code: "U+02B8", name: "Modifier Letter Small Y", description: "Superscript y", subcategory: "modifier" },
  ],

  other: [
    // Chinese Characters (Han)
    {
      code: "U+4E00",
      name: "CJK Unified Ideograph-4E00",
      description: "Chinese character meaning 'one'",
      subcategory: "other",
    },
    {
      code: "U+4E01",
      name: "CJK Unified Ideograph-4E01",
      description: "Chinese character meaning 'street'",
      subcategory: "other",
    },
    {
      code: "U+4E03",
      name: "CJK Unified Ideograph-4E03",
      description: "Chinese character meaning 'seven'",
      subcategory: "other",
    },
    // Japanese Hiragana
    { code: "U+3042", name: "Hiragana Letter A", description: "Japanese hiragana a", subcategory: "other" },
    { code: "U+3044", name: "Hiragana Letter I", description: "Japanese hiragana i", subcategory: "other" },
    { code: "U+3046", name: "Hiragana Letter U", description: "Japanese hiragana u", subcategory: "other" },
    // Arabic Letters
    { code: "U+0627", name: "Arabic Letter Alef", description: "Arabic alef", subcategory: "other" },
    { code: "U+0628", name: "Arabic Letter Beh", description: "Arabic beh", subcategory: "other" },
    { code: "U+062A", name: "Arabic Letter Teh", description: "Arabic teh", subcategory: "other" },
    // Devanagari Letters
    { code: "U+0905", name: "Devanagari Letter A", description: "Devanagari a", subcategory: "other" },
    { code: "U+0906", name: "Devanagari Letter AA", description: "Devanagari aa", subcategory: "other" },
    { code: "U+0907", name: "Devanagari Letter I", description: "Devanagari i", subcategory: "other" },
  ],
}

// Helper function to get all characters from a specific subcategory
export function getCharactersBySubcategory(subcategory: string) {
  return letterCharacters[subcategory as keyof typeof letterCharacters] || []
}

// Helper function to get all characters
export function getAllLetterCharacters() {
  return Object.values(letterCharacters).flat()
}

