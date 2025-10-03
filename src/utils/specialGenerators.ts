// Glitch text effects
export const generateGlitchText = (text: string): string[] => {
  const glitchChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~"
  const zalgoChars = {
    up: [
      "̍",
      "̎",
      "̄",
      "̅",
      "̿",
      "̑",
      "̆",
      "̐",
      "͒",
      "͗",
      "͑",
      "̇",
      "̈",
      "̊",
      "͂",
      "̓",
      "̈́",
      "͊",
      "͋",
      "͌",
      "̃",
      "̂",
      "̌",
      "͐",
      "́",
      "̋",
      "̏",
      "̽",
      "̉",
      "ͣ",
      "ͤ",
      "ͥ",
      "ͦ",
      "ͧ",
      "ͨ",
      "ͩ",
      "ͪ",
      "ͫ",
      "ͬ",
      "ͭ",
      "ͮ",
      "ͯ",
      "̾",
      "͛",
      "͆",
      "̚",
    ],
    down: [
      "̖",
      "̗",
      "̘",
      "̙",
      "̜",
      "̝",
      "̞",
      "̟",
      "̠",
      "̤",
      "̥",
      "̦",
      "̩",
      "̪",
      "̫",
      "̬",
      "̭",
      "̮",
      "̯",
      "̰",
      "̱",
      "̲",
      "̳",
      "̹",
      "̺",
      "̻",
      "̼",
      "ͅ",
      "͇",
      "͈",
      "͉",
      "͍",
      "͎",
      "͓",
      "͔",
      "͕",
      "͖",
      "͙",
      "͚",
      "̣",
    ],
    mid: ["̕", "̛", "̀", "́", "͘", "̡", "̢", "̧", "̨", "̴", "̵", "̶", "͜", "͝", "͞", "͟", "͠", "͢", "̸", "̷", "͡"],
  }

  const results: string[] = []

  // Style 1: Basic glitch with random characters
  const glitch1 = [...text]
    .map((char) => {
      if (Math.random() > 0.8 && char !== " ") {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)]
      }
      return char
    })
    .join("")
  results.push(glitch1)

  // Style 2: Zalgo text (corrupted)
  const zalgo = [...text]
    .map((char) => {
      if (char === " ") return char
      let result = char

      // Add random zalgo characters
      if (Math.random() > 0.3) {
        const upCount = Math.floor(Math.random() * 3)
        for (let i = 0; i < upCount; i++) {
          result += zalgoChars.up[Math.floor(Math.random() * zalgoChars.up.length)]
        }
      }

      if (Math.random() > 0.3) {
        const downCount = Math.floor(Math.random() * 3)
        for (let i = 0; i < downCount; i++) {
          result += zalgoChars.down[Math.floor(Math.random() * zalgoChars.down.length)]
        }
      }

      if (Math.random() > 0.5) {
        const midCount = Math.floor(Math.random() * 2)
        for (let i = 0; i < midCount; i++) {
          result += zalgoChars.mid[Math.floor(Math.random() * zalgoChars.mid.length)]
        }
      }

      return result
    })
    .join("")
  results.push(zalgo)

  // Style 3: Strikethrough glitch
  const strikethrough = [...text].map((char) => char + "̶").join("")
  results.push(strikethrough)

  // Style 4: Double vision
  const doubleVision = text
    .split("")
    .map((char) => char + char)
    .join("")
  results.push(doubleVision)

  // Style 5: Inverted characters
  const invertMap: Record<string, string> = {
    a: "ɐ",
    b: "q",
    c: "ɔ",
    d: "p",
    e: "ǝ",
    f: "ɟ",
    g: "ƃ",
    h: "ɥ",
    i: "ᴉ",
    j: "ɾ",
    k: "ʞ",
    l: "l",
    m: "ɯ",
    n: "u",
    o: "o",
    p: "d",
    q: "b",
    r: "ɹ",
    s: "s",
    t: "ʇ",
    u: "n",
    v: "ʌ",
    w: "ʍ",
    x: "x",
    y: "ʎ",
    z: "z",
  }
  const inverted = [...text].map((char) => invertMap[char.toLowerCase()] || char).join("")
  results.push(inverted)

  // Style 6: Glitch with brackets
  const bracketed = text.replace(/./g, (char, index) => {
    if (Math.random() > 0.7 && char !== " ") {
      return `[${char}]`
    }
    return char
  })
  results.push(bracketed)

  return results
}

// Half-elf name generator
export const generateHalfElfNames = (): string[] => {
  const elfPrefixes = [
    "Ael",
    "Ara",
    "Ari",
    "Cel",
    "Elu",
    "Gal",
    "Gil",
    "Hal",
    "Ith",
    "Leg",
    "Lin",
    "Mal",
    "Nal",
    "Ori",
    "Sil",
    "Thal",
    "Ther",
    "Vel",
  ]
  const elfSuffixes = [
    "adan",
    "adir",
    "ael",
    "ahvir",
    "amakir",
    "anar",
    "andune",
    "anel",
    "ara",
    "aran",
    "aris",
    "arnen",
    "aron",
    "dor",
    "dul",
    "dur",
    "ean",
    "el",
    "enel",
    "er",
    "erel",
    "ern",
    "eron",
    "haldir",
    "hir",
    "ias",
    "iel",
    "ien",
    "ieth",
    "ion",
    "ior",
    "ith",
    "las",
    "luin",
    "mor",
    "nal",
    "ndil",
    "ndir",
    "nel",
    "nin",
    "on",
    "or",
    "oth",
    "rail",
    "ras",
    "reth",
    "rian",
    "rion",
    "rond",
    "ruin",
    "sael",
    "thir",
    "thorn",
    "thranduil",
    "uil",
    "uin",
    "ul",
    "uth",
    "wing",
  ]

  const humanPrefixes = [
    "Aer",
    "Ahv",
    "Ber",
    "Cael",
    "Dar",
    "Eld",
    "Fen",
    "Gar",
    "Hav",
    "Jas",
    "Kael",
    "Lyr",
    "Mer",
    "Nal",
    "Oth",
    "Phen",
    "Quin",
    "Rav",
    "Syl",
    "Tar",
    "Ulr",
    "Var",
    "Wyl",
    "Xan",
    "Yor",
    "Zar",
  ]
  const humanSuffixes = ["an", "ar", "as", "en", "er", "es", "ian", "ic", "in", "is", "on", "or", "us", "yn"]

  const names: string[] = []

  for (let i = 0; i < 10; i++) {
    // Mix elf and human elements
    if (Math.random() > 0.5) {
      // Elf prefix + human suffix
      const prefix = elfPrefixes[Math.floor(Math.random() * elfPrefixes.length)]
      const suffix = humanSuffixes[Math.floor(Math.random() * humanSuffixes.length)]
      names.push(prefix + suffix)
    } else {
      // Human prefix + elf suffix
      const prefix = humanPrefixes[Math.floor(Math.random() * humanPrefixes.length)]
      const suffix = elfSuffixes[Math.floor(Math.random() * elfSuffixes.length)]
      names.push(prefix + suffix)
    }
  }

  return names
}

// Aesthetic username generator
export const generateAestheticUsernames = (baseWord = ""): string[] => {
  const aestheticWords = [
    "moon",
    "star",
    "dream",
    "soft",
    "glow",
    "mist",
    "silk",
    "pearl",
    "rose",
    "sage",
    "fawn",
    "dove",
    "iris",
    "luna",
    "nova",
    "aura",
    "echo",
    "wisp",
    "dusk",
    "dawn",
  ]
  const aestheticSuffixes = ["core", "wave", "girl", "boy", "vibes", "mood", "feels", "dreams", "soft", "glow"]
  const aestheticPrefixes = ["soft", "dark", "light", "moon", "sun", "star", "dream", "angel", "fairy", "cosmic"]
  const separators = ["_", ".", "-", ""]
  const numbers = ["01", "02", "03", "11", "22", "33", "99", "00", "777", "444"]

  const usernames: string[] = []
  const base = baseWord.toLowerCase() || aestheticWords[Math.floor(Math.random() * aestheticWords.length)]

  // Style 1: base + aesthetic suffix
  aestheticSuffixes.forEach((suffix) => {
    const sep = separators[Math.floor(Math.random() * separators.length)]
    usernames.push(base + sep + suffix)
  })

  // Style 2: aesthetic prefix + base
  aestheticPrefixes.slice(0, 5).forEach((prefix) => {
    const sep = separators[Math.floor(Math.random() * separators.length)]
    usernames.push(prefix + sep + base)
  })

  // Style 3: base + numbers
  numbers.slice(0, 3).forEach((num) => {
    usernames.push(base + num)
  })

  // Style 4: x + base + x pattern
  usernames.push(`x${base}x`)
  usernames.push(`_${base}_`)
  usernames.push(`${base}.exe`)

  return usernames.slice(0, 12)
}

// Cat name generator
export const generateCatNames = (): string[] => {
  const catPrefixes = [
    "Whisker",
    "Paw",
    "Fur",
    "Tail",
    "Purr",
    "Meow",
    "Kitty",
    "Tiger",
    "Shadow",
    "Midnight",
    "Luna",
    "Star",
    "Moon",
    "Sun",
    "Cloud",
    "Storm",
    "Snow",
    "Frost",
    "Ember",
    "Flame",
  ]
  const catSuffixes = ["paws", "tail", "whiskers", "fur", "eyes", "nose", "ears", "belly", "face", "heart"]
  const simpleCatNames = [
    "Mittens",
    "Socks",
    "Patches",
    "Oreo",
    "Cookie",
    "Muffin",
    "Pepper",
    "Salt",
    "Ginger",
    "Cinnamon",
    "Cocoa",
    "Mocha",
    "Latte",
    "Espresso",
    "Caramel",
    "Honey",
    "Sugar",
    "Vanilla",
    "Chocolate",
    "Peanut",
  ]
  const fancyCatNames = [
    "Aristocat",
    "Duchess",
    "Prince",
    "Princess",
    "Sir Whiskers",
    "Lady Paws",
    "Count Meowcula",
    "Baron von Purr",
    "Madame Fluff",
    "Captain Whiskers",
  ]

  const names: string[] = []

  // Add simple names
  names.push(...simpleCatNames.slice(0, 8))

  // Add compound names
  for (let i = 0; i < 6; i++) {
    const prefix = catPrefixes[Math.floor(Math.random() * catPrefixes.length)]
    const suffix = catSuffixes[Math.floor(Math.random() * catSuffixes.length)]
    names.push(prefix + suffix)
  }

  // Add fancy names
  names.push(...fancyCatNames.slice(0, 6))

  return names.slice(0, 20)
}

// Quirk generator for characters
export const generateQuirks = (): string[] => {
  const quirks = [
    "Always speaks in rhymes",
    "Collects bottle caps obsessively",
    "Can't sleep without a nightlight",
    "Talks to plants and believes they respond",
    "Always wears mismatched socks",
    "Counts everything in groups of three",
    "Never uses contractions when speaking",
    "Always carries a lucky penny",
    "Hums while thinking",
    "Can't eat food that's touching on the plate",
    "Always knocks on wood after making plans",
    "Speaks in third person when nervous",
    "Collects vintage postcards",
    "Always sits facing the door",
    "Can't resist petting every dog they see",
    "Always orders the same thing at restaurants",
    "Draws doodles on everything",
    "Never steps on cracks in sidewalks",
    "Always checks locks three times",
    "Speaks different languages when angry",
    "Can't throw anything away 'just in case'",
    "Always wears a hat indoors",
    "Makes sound effects for everything",
    "Can't start the day without tea/coffee ritual",
    "Always apologizes to inanimate objects when bumping into them",
  ]

  // Return random selection of quirks
  const shuffled = quirks.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 10)
}
