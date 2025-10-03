// Vietnamese translator (basic phrases)
export const translateToVietnamese = (text: string): string => {
  const vietnameseMap: Record<string, string> = {
    hello: "xin chào",
    goodbye: "tạm biệt",
    "thank you": "cảm ơn",
    please: "xin vui lòng",
    yes: "có",
    no: "không",
    "good morning": "chào buổi sáng",
    "good evening": "chào buổi tối",
    "how are you": "bạn có khỏe không",
    "i love you": "anh yêu em",
    beautiful: "đẹp",
    friend: "bạn",
    family: "gia đình",
    water: "nước",
    food: "thức ăn",
    house: "nhà",
    cat: "mèo",
    dog: "chó",
    happy: "hạnh phúc",
    sad: "buồn",
  }

  let result = text.toLowerCase()

  // Replace known phrases
  Object.entries(vietnameseMap).forEach(([english, vietnamese]) => {
    const regex = new RegExp(`\\b${english}\\b`, "gi")
    result = result.replace(regex, vietnamese)
  })

  return result
}

// Simlish translator
export const translateToSimlish = (text: string): string => {
  const simlishWords = [
    "plerg",
    "nooboo",
    "yibs",
    "firby",
    "blarfy",
    "grawl",
    "sul sul",
    "dag dag",
    "myshuno",
    "plerg majah",
    "badeesh",
    "litzergam",
    "oobelisk",
    "firby nurbs",
    "yibs",
    "nooboo",
    "meshaloob",
    "benzi chibna looble bazebni gweb",
    "firby",
    "nurbs",
    "yibs",
    "plerg",
    "blarfy",
    "grawl",
    "myshuno",
    "litzergam",
    "oobelisk",
    "badeesh",
  ]

  const words = text.split(/\s+/)

  return words
    .map((word) => {
      if (word.length === 0) return word

      // Keep punctuation
      const punctuation = word.match(/[.,!?;:]$/) ? word.slice(-1) : ""
      const cleanWord = word.replace(/[.,!?;:]$/, "")

      if (cleanWord.length === 0) return word

      // Generate simlish based on word length
      let simlishWord = ""
      if (cleanWord.length <= 3) {
        simlishWord = simlishWords[Math.floor(Math.random() * 5)] // shorter words
      } else if (cleanWord.length <= 6) {
        simlishWord = simlishWords[Math.floor(Math.random() * simlishWords.length)]
      } else {
        // Longer words get compound simlish
        simlishWord =
          simlishWords[Math.floor(Math.random() * simlishWords.length)] +
          " " +
          simlishWords[Math.floor(Math.random() * simlishWords.length)]
      }

      // Preserve capitalization
      if (cleanWord[0] === cleanWord[0].toUpperCase()) {
        simlishWord = simlishWord.charAt(0).toUpperCase() + simlishWord.slice(1)
      }

      return simlishWord + punctuation
    })
    .join(" ")
}

// High Valyrian translator (basic)
export const translateToHighValyrian = (text: string): string => {
  const valyrianMap: Record<string, string> = {
    fire: "dracarys",
    blood: "jelmor",
    dragon: "zaldrīzes",
    king: "dārys",
    queen: "dāria",
    prince: "dārilaros",
    princess: "dārilaros",
    lord: "aōha",
    lady: "riña",
    death: "morghon",
    life: "glaeson",
    love: "jorrāelagon",
    hate: "mazilībagon",
    war: "valar",
    peace: "gīmigon",
    sword: "rūklon",
    shield: "aegon",
    crown: "dārion",
    throne: "dārys",
    gold: "aeksion",
    silver: "qēlossās",
    iron: "qēlos",
    stone: "perzys",
    water: "bāne",
    wind: "vāedar",
    sun: "vāes",
    moon: "hūra",
    star: "jēdar",
    night: "bantis",
    day: "tubis",
    mother: "muña",
    father: "kepa",
    brother: "lēkia",
    sister: "mandia",
    son: "trēsy",
    daughter: "tala",
  }

  let result = text.toLowerCase()

  // Replace known words
  Object.entries(valyrianMap).forEach(([english, valyrian]) => {
    const regex = new RegExp(`\\b${english}\\b`, "gi")
    result = result.replace(regex, valyrian)
  })

  // Add some Valyrian flavor to remaining words
  result = result.replace(/\b\w+\b/g, (word) => {
    if (valyrianMap[word.toLowerCase()]) {
      return valyrianMap[word.toLowerCase()]
    }

    // Add Valyrian-sounding endings to unknown words
    const endings = ["ys", "on", "ar", "os", "ion", "aes"]
    if (Math.random() > 0.7 && word.length > 3) {
      const ending = endings[Math.floor(Math.random() * endings.length)]
      return word.slice(0, -1) + ending
    }

    return word
  })

  return result
}
