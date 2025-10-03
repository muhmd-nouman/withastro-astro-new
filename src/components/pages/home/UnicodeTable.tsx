import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const unicodeChars = [
  { unicode: "U+0020", description: "Space", html: "&#32;" },
  { unicode: "U+00A0", description: "No-Break Space", html: "&#160;" },
  { unicode: "U+2000", description: "En Quad", html: "&#8192;" },
  { unicode: "U+2001", description: "Em Quad", html: "&#8193;" },
  { unicode: "U+2002", description: "En Space", html: "&#8194;" },
  { unicode: "U+2003", description: "Em Space", html: "&#8195;" },
  { unicode: "U+2004", description: "Three-Per-Em Space", html: "&#8196;" },
  { unicode: "U+2005", description: "Four-Per-Em Space", html: "&#8197;" },
  { unicode: "U+2006", description: "Six-Per-Em Space", html: "&#8198;" },
  { unicode: "U+2007", description: "Figure Space", html: "&#8199;" },
  { unicode: "U+2008", description: "Punctuation Space", html: "&#8200;" },
  { unicode: "U+2009", description: "Thin Space", html: "&#8201;" },
  { unicode: "U+200A", description: "Hair Space", html: "&#8202;" },
  { unicode: "U+2028", description: "Line Separator", html: "&#8232;" },
  { unicode: "U+205F", description: "Medium Mathematical Space", html: "&#8287;" },
  { unicode: "U+3000", description: "Ideographic Space", html: "&#12288;" },
  { unicode: "U+200B", description: "Zero Width Space", html: "&#8203;" },
  { unicode: "U+200C", description: "Zero Width Non-Joiner", html: "&#8204;" },
  { unicode: "U+200D", description: "Zero Width Joiner", html: "&#8205;" },
  { unicode: "U+202F", description: "Narrow No-Break Space", html: "&#8239;" },
  { unicode: "U+2060", description: "Word Joiner", html: "&#8288;" },
  { unicode: "U+2061", description: "Function Application", html: "&#8289;" },
  { unicode: "U+2062", description: "Invisible Times", html: "&#8290;" },
  { unicode: "U+2063", description: "Invisible Separator", html: "&#8291;" },
  { unicode: "U+2064", description: "Invisible Plus", html: "&#8292;" },
  // ...other entries
];

const UnicodeTable: React.FC = () => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyExample = (example: string, key: string) => {
    navigator.clipboard.writeText(example);
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const parseHtmlChar = (html: string) => {
    const code = parseInt(html.replace(/[^0-9]/g, ''), 10);
    return String.fromCodePoint(code);
  };

  return (
    <div className="overflow-x-auto overflow-y-auto h-100 rounded-lg border border-black bg-black">
      <table className="container mx-auto bg-white border border-black w-full">
        <thead className="sticky top-0 border border-black bg-gray-100 p-2">
          <tr className=" bg-black text-white border border-black">
            <th className="py-2 border-r text-center">Unicode</th>
            <th className="py-2 border-r text-center">Description</th>
            <th className="py-2 border-r text-center">HTML</th>
            <th className="py-2 border-r text-center">Example</th>
            <th className="py-2 border-b text-center">Copy</th>
          </tr>
        </thead>
        <tbody>
          {unicodeChars.map((char, index) => {
            const example = parseHtmlChar(char.html);
            const rowKey = `${char.unicode}-${index}`;
            return (
              <tr key={rowKey} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center border-r">{char.unicode}</td>
                <td className="py-2 px-4 border-b text-center border-r">{char.description}</td>
                <td className="py-2 px-4 border-b text-center border-r">{char.html}</td>
                <td className="py-2 px-4 border-b text-center border-r">[{example}]</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800 relative group z-0"
                    onClick={() => copyExample(example, rowKey)}
                  >
                    {copiedStates[rowKey] ? (
                      <Check className="w-4 h-4 inline-block text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 inline-block" />
                    )}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {copiedStates[rowKey] ? "Copied!" : "Copy"}
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UnicodeTable;
