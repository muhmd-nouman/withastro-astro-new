// Wingdings character mapping
const wingdingsMap: Record<string, string> = {
  // Letters
  a: "✌",
  b: "👌",
  c: "👍",
  d: "👎",
  e: "☝",
  f: "✋",
  g: "👇",
  h: "👈",
  i: "👉",
  j: "😀",
  k: "😃",
  l: "😄",
  m: "😁",
  n: "😆",
  o: "😅",
  p: "😂",
  q: "🤣",
  r: "☺",
  s: "😊",
  t: "😇",
  u: "🙂",
  v: "🙃",
  w: "😉",
  x: "😌",
  y: "😍",
  z: "😘",
  A: "✌",
  B: "👌",
  C: "👍",
  D: "👎",
  E: "☝",
  F: "✋",
  G: "👇",
  H: "👈",
  I: "👉",
  J: "😀",
  K: "😃",
  L: "😄",
  M: "😁",
  N: "😆",
  O: "😅",
  P: "😂",
  Q: "🤣",
  R: "☺",
  S: "😊",
  T: "😇",
  U: "🙂",
  V: "🙃",
  W: "😉",
  X: "😌",
  Y: "😍",
  Z: "😘",

  // Numbers
  "0": "⓪",
  "1": "①",
  "2": "②",
  "3": "③",
  "4": "④",
  "5": "⑤",
  "6": "⑥",
  "7": "⑦",
  "8": "⑧",
  "9": "⑨",

  // Common punctuation
  " ": " ",
  ".": ".",
  ",": ",",
  "!": "❗",
  "?": "❓",
  ":": ":",
  ";": ";",
  "'": "'",
  '"': '"',
  "(": "(",
  ")": ")",
  "[": "[",
  "]": "]",
  "{": "{",
  "}": "}",
  "-": "➖",
  "+": "➕",
  "=": "🟰",
  "*": "✳",
  "/": "➗",
  "\\": "\\",
  "|": "|",
  "&": "&",
  "%": "%",
  $: "💲",
  "#": "#",
  "@": "@",
}

// Old English character mapping
const oldEnglishMap: Record<string, string> = {
  a: "𝔞",
  b: "𝔟",
  c: "𝔠",
  d: "𝔡",
  e: "𝔢",
  f: "𝔣",
  g: "𝔤",
  h: "𝔥",
  i: "𝔦",
  j: "𝔧",
  k: "𝔨",
  l: "𝔩",
  m: "𝔪",
  n: "𝔫",
  o: "𝔬",
  p: "𝔭",
  q: "𝔮",
  r: "𝔯",
  s: "𝔰",
  t: "𝔱",
  u: "𝔲",
  v: "𝔳",
  w: "𝔴",
  x: "𝔵",
  y: "𝔶",
  z: "𝔷",
  A: "𝔄",
  B: "𝔅",
  C: "ℭ",
  D: "𝔇",
  E: "𝔈",
  F: "𝔉",
  G: "𝔊",
  H: "ℌ",
  I: "ℑ",
  J: "𝔍",
  K: "𝔎",
  L: "𝔏",
  M: "𝔐",
  N: "𝔑",
  O: "𝔒",
  P: "𝔓",
  Q: "𝔔",
  R: "ℜ",
  S: "𝔖",
  T: "𝔗",
  U: "𝔘",
  V: "𝔙",
  W: "𝔚",
  X: "𝔛",
  Y: "𝔜",
  Z: "ℨ",
}

// Helper function to transform text using a character map
const transformWithMap = (text: string, map: Record<string, string>): string => {
  return [...text].map((char) => map[char] || char).join("")
}

// Wingdings translator
export const translateToWingdings = (text: string): string => {
  return transformWithMap(text, wingdingsMap)
}

// UwU translator
export const translateToUwU = (text: string): string => {
  let uwuText = text.toLowerCase()

  // Replace patterns
  uwuText = uwuText.replace(/r/g, "w")
  uwuText = uwuText.replace(/l/g, "w")
  uwuText = uwuText.replace(/n([aeiou])/g, "ny$1")
  uwuText = uwuText.replace(/ove/g, "uv")
  uwuText = uwuText.replace(/th/g, "d")

  // Add uwu expressions randomly
  const uwuExpressions = [" uwu", " owo", " >w<", " ^w^", " :3", " (◡ ω ◡)", " (´∀｀)♡"]
  const sentences = uwuText.split(/[.!?]+/)

  return sentences
    .map((sentence) => {
      if (sentence.trim()) {
        const shouldAddExpression = Math.random() > 0.7
        if (shouldAddExpression) {
          const randomExpression = uwuExpressions[Math.floor(Math.random() * uwuExpressions.length)]
          return sentence + randomExpression
        }
      }
      return sentence
    })
    .join(". ")
    .replace(/\.\s*\./g, ".")
}

// Old English translator
export const translateToOldEnglish = (text: string): string => {
  let oldText = transformWithMap(text, oldEnglishMap)

  // Add some old English word replacements
  const oldEnglishWords: Record<string, string> = {
    you: "thou",
    your: "thy",
    yours: "thine",
    are: "art",
    were: "wert",
    have: "hath",
    has: "hath",
    do: "doth",
    does: "doth",
    will: "shall",
    would: "wouldst",
    could: "couldst",
    should: "shouldst",
    can: "canst",
    cannot: "canst not",
    yes: "yea",
    no: "nay",
    before: "ere",
    between: "betwixt",
    often: "oft",
    very: "verily",
    indeed: "forsooth",
    perhaps: "mayhap",
    because: "for",
    while: "whilst",
    among: "amongst",
  }

  // Apply word replacements (case-insensitive)
  Object.entries(oldEnglishWords).forEach(([modern, old]) => {
    const regex = new RegExp(`\\b${modern}\\b`, "gi")
    oldText = oldText.replace(regex, (match) => {
      // Preserve original case
      if (match === match.toUpperCase()) return old.toUpperCase()
      if (match[0] === match[0].toUpperCase()) return old.charAt(0).toUpperCase() + old.slice(1)
      return old
    })
  })

  return oldText
}
