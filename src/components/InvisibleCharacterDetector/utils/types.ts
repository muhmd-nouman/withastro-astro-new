export interface CaractereInvisivel {
  unicode: string;
  description: string;
  html: string;
  example: CaractereInvisivel;
}

export const invisibleCharacters = {
  "U+2800": "⠀",
  "U+2063": "⁣",
  "U+200B": "​",
  "U+200C": "‌",
  "U+200D": "‍",
  "U+FEFF": "﻿",
  "U+180E": "᠎",
  "U+200E": "‎",
  "U+200F": "‏",
  "U+2028": " ",
  "U+2029": " ",
  "U+2060": "⁠",
  "U+2061": "⁡",
  "U+2062": "⁢",
  "U+2064": "⁤",
  "U+2066": "⁦",
  "U+2067": "⁧",
  "U+2068": "⁨",
  "U+2069": "⁩",
  "U+3164": "ㅤ",
  "U+FFA0": "ﾠ",
  "U+1D159": "𝅙",
  "U+1D173": "𝅳",
  "U+1D174": "𝅴",
  "U+1D175": "𝅵",
  "U+1D176": "𝅶",
  "U+1D177": "𝅷",
  "U+1D178": "𝅸",
  "U+1D179": "𝅹",
  "U+1D17A": "𝅺",
  // Additional entries omitted for brevity.
} as const;

export const unicodeTable: CaractereInvisivel[] = [
  {
    unicode: "U+2800",
    description: "Braille em branco",
    html: "&#10240;",
    example: "⠀",
  },
  {
    unicode: "U+2063",
    description: "Separador invisível",
    html: "&#8291;",
    example: "⁣",
  },
  {
    unicode: "U+200B",
    description: "Espaço de largura zero",
    html: "&#8203;",
    example: "​",
  },
  {
    unicode: "U+200C",
    description: "Não-juntor de largura zero",
    html: "&#8204;",
    example: "‌",
  },
  {
    unicode: "U+200D",
    description: "Juntor de largura zero",
    html: "&#8205;",
    example: "‍",
  },
  {
    unicode: "U+FEFF",
    description: "Espaço inquebrável de largura zero",
    html: "&#65279;",
    example: "﻿",
  },
  {
    unicode: "U+180E",
    description: "Separador de vogal mongol",
    html: "&#6158;",
    example: "᠎",
  },
  {
    unicode: "U+200E",
    description: "Marca da esquerda para a direita",
    html: "&#8206;",
    example: "‎",
  },
  {
    unicode: "U+200F",
    description: "Marca da direita para a esquerda",
    html: "&#8207;",
    example: "‏",
  },
  {
    unicode: "U+2028",
    description: "Separador de linha",
    html: "&#8232;",
    example: " ",
  },
  {
    unicode: "U+2029",
    description: "Separador de parágrafo",
    html: "&#8233;",
    example: " ",
  },
  {
    unicode: "U+2060",
    description: "Juntor de palavra",
    html: "&#8288;",
    example: "⁠",
  },
  {
    unicode: "U+2061",
    description: "Aplicação de função",
    html: "&#8289;",
    example: "⁡",
  },
  {
    unicode: "U+2062",
    description: "Multiplicação invisível",
    html: "&#8290;",
    example: "⁢",
  },
  {
    unicode: "U+2064",
    description: "Adição invisível",
    html: "&#8292;",
    example: "⁤",
  },
  {
    unicode: "U+2066",
    description: "Isolamento da esquerda para a direita",
    html: "&#8294;",
    example: "⁦",
  },
  {
    unicode: "U+2067",
    description: "Isolamento da direita para a esquerda",
    html: "&#8295;",
    example: "⁧",
  },
  {
    unicode: "U+2068",
    description: "Isolamento do primeiro forte",
    html: "&#8296;",
    example: "⁨",
  },
  {
    unicode: "U+2069",
    description: "Isolamento direcional pop",
    html: "&#8297;",
    example: "⁩",
  },
  {
    unicode: "U+3164",
    description: "Preenchedor Hangul",
    html: "&#12644;",
    example: "ㅤ",
  },
  {
    unicode: "U+FFA0",
    description: "Preenchedor Hangul de meia largura",
    html: "&#65440;",
    example: "ﾠ",
  },
  {
    unicode: "U+1D159",
    description: "Símbolo musical combinando haste",
    html: "&#119129;",
    example: "𝅙",
  },
  {
    unicode: "U+1D173",
    description: "Símbolo musical início de feixe",
    html: "&#119187;",
    example: "𝅳",
  },
  {
    unicode: "U+1D174",
    description: "Símbolo musical fim de feixe",
    html: "&#119188;",
    example: "𝅴",
  },
  {
    unicode: "U+1D175",
    description: "Símbolo musical início de ligadura",
    html: "&#119189;",
    example: "𝅵",
  },
  {
    unicode: "U+1D176",
    description: "Símbolo musical fim de ligadura",
    html: "&#119190;",
    example: "𝅶",
  },
  {
    unicode: "U+1D177",
    description: "Símbolo musical início de ligadura curva",
    html: "&#119191;",
    example: "𝅷",
  },
  {
    unicode: "U+1D178",
    description: "Símbolo musical fim de ligadura curva",
    html: "&#119192;",
    example: "𝅸",
  },
  {
    unicode: "U+1D179",
    description: "Símbolo musical início de frase",
    html: "&#119193;",
    example: "𝅹",
  },
  {
    unicode: "U+1D17A",
    description: "Símbolo musical fim de frase",
    html: "&#119194;",
    example: "𝅺",
  },
  // Additional entries omitted for brevity.
];
