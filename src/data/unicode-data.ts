export interface UnicodeCharacter {
  code: string
  name: string
  description: string
  category: string
}

export interface UnicodeCategory {
  name: string
  slug: string
  description: string
}

export const categories: UnicodeCategory[] = [
  {
    name: "Invisible Characters",
    slug: "invisible",
    description: "Characters that take up space but are not visible",
  },
  {
    name: "Space Characters",
    slug: "space",
    description: "Various types of whitespace characters",
  },
  {
    name: "Punctuation",
    slug: "punctuation",
    description: "Symbols used to organize and separate text",
  },
  {
    name: "Mathematical Symbols",
    slug: "math",
    description: "Symbols used in mathematical notation",
  },
]

export const characters: UnicodeCharacter[] = [
  // Invisible Characters
  {
    code: "U+200B",
    name: "Zero Width Space",
    description: "Invisible space character with zero width",
    category: "invisible",
  },
  {
    code: "U+FEFF",
    name: "Zero Width No-Break Space",
    description: "Invisible space character that prevents line breaks",
    category: "invisible",
  },
  {
    code: "U+200C",
    name: "Zero Width Non-Joiner",
    description: "Prevents characters from joining",
    category: "invisible",
  },
  { code: "U+200D", name: "Zero Width Joiner", description: "Causes characters to join", category: "invisible" },

  // Space Characters
  { code: "U+0020", name: "Space", description: "Standard space character", category: "space" },
  { code: "U+00A0", name: "No-Break Space", description: "Space that prevents line breaks", category: "space" },
  { code: "U+2002", name: "En Space", description: "Space with a width of half an em", category: "space" },
  { code: "U+2003", name: "Em Space", description: "Space with a width of one em", category: "space" },

  // Punctuation
  { code: "U+002E", name: "Full Stop", description: "Period or dot", category: "punctuation" },
  { code: "U+002C", name: "Comma", description: "Standard comma", category: "punctuation" },
  { code: "U+003B", name: "Semicolon", description: "Semicolon punctuation mark", category: "punctuation" },
  { code: "U+003A", name: "Colon", description: "Colon punctuation mark", category: "punctuation" },

  // Mathematical Symbols
  { code: "U+002B", name: "Plus Sign", description: "Addition operator", category: "math" },
  { code: "U+2212", name: "Minus Sign", description: "Subtraction operator", category: "math" },
  { code: "U+00D7", name: "Multiplication Sign", description: "Multiplication operator", category: "math" },
  { code: "U+00F7", name: "Division Sign", description: "Division operator", category: "math" },
]

// Generate 84 more characters to reach a total of 100
for (let i = 0; i < 84; i++) {
  const categoryIndex = i % categories.length
  const category = categories[categoryIndex].slug
  characters.push({
    code: `U+${(0x2600 + i).toString(16).toUpperCase()}`,
    name: `Generated Character ${i + 1}`,
    description: `This is a generated character for the ${categories[categoryIndex].name} category`,
    category: category,
  })
}

