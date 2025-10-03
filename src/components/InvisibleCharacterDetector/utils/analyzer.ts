import { unicodeTable } from "./types";

export function analyzeText(text: string) {
  const results: Record<
    string,
    {
      char: string;
      unicode: string;
      name: string;
      html: string;
      count: number;
      position: number[];
    }
  > = {};

  [...text].forEach((char, index) => {
    const charInfo = unicodeTable.find(
      (info) => info.example === (char as unknown as string),
    );
    if (charInfo) {
      if (!results[char]) {
        results[char] = {
          char,
          unicode: charInfo.unicode,
          name: charInfo.description,
          html: charInfo.html,
          count: 1,
          position: [index],
        };
      } else {
        results[char].count++;
        results[char].position.push(index);
      }
    }
  });

  return Object.values(results);
}
