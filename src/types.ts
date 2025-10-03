export interface UnicodeCharacter {
  symbol: string;
  code: string;
  decimal: number;
  category: string;
  name: {
    [key: string]: string;
  };
  description: {
    [key: string]: string;
  };
  content?: {
    [key: string]: {
      usage: string;
      history: string;
      technical: string;
    };
  };
}
