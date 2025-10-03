import React from "react"
import { useState, useEffect } from "react"
import { transformToBold, transformToItalic, transformToCursive, transformToBubble, transformToReverse, transformToInstagramFonts, transformToFancyText } from "../utils/textTransformers"
import { translateToWingdings, translateToUwU, translateToOldEnglish } from "../utils/translators"
import { generateStylishFonts, generateFacebookFonts, generateIGFonts } from "../utils/fontGenerators"
import { generateGlitchText, generateHalfElfNames, generateAestheticUsernames, generateCatNames, generateQuirks } from "../utils/specialGenerators"
import { translateToVietnamese, translateToSimlish, translateToHighValyrian } from "../utils/specialTranslators"
import { generateFantasyFonts, generateMetalFont, generateCreepyFonts, generateTikTokFont, generateDiscordBold, generateDemonicSymbols, generateCurvedText } from "../utils/specialFonts"

interface TextTransformerProps {
  title: string
  description: string
  transformType:
    | "bold"
    | "italic"
    | "cursive"
    | "bubble"
    | "reverse" 
    | "instagram"
    | "fancy"
    | "wingdings"
    | "uwu"
    | "oldenglish"
    | "stylish"
    | "facebook"
    | "igfonts"
    | "glitch"
    | "halfelf"
    | "aesthetic"
    | "curved"
    | "vietnamese"
    | "discordbold"
    | "catnames"
    | "fantasy"
    | "quirks"
    | "metal"
    | "demonic"
    | "simlish"
    | "tiktok"
    | "creepy"
    | "valyrian"
  placeholder?: string
  isGenerator?: boolean
}

const TextTransformer = ({
  title,
  description,
  transformType,
  placeholder = "Enter your text here",
  isGenerator = false,
}: TextTransformerProps) => {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState<string | string[]>("")
  const [copied, setCopied] = useState<number | boolean>(false)

  const getTransformation = (text: string, type: string) => {
    switch (type) {
      case "bold":
        return transformToBold(text)
      case "italic":
        return transformToItalic(text)
      case "cursive":
        return transformToCursive(text)
      case "bubble":
        return transformToBubble(text)
      case "reverse":
        return transformToReverse(text)
      case "instagram":
        return transformToInstagramFonts(text)
      case "fancy":
        return transformToFancyText(text)
      case "wingdings":
        return translateToWingdings(text)
      case "uwu":
        return translateToUwU(text)
      case "oldenglish":
        return translateToOldEnglish(text)
      case "stylish":
        return generateStylishFonts(text)
      case "facebook":
        return generateFacebookFonts(text)
      case "igfonts":
        return generateIGFonts(text)
      case "glitch":
        return generateGlitchText(text)
      case "halfelf":
        return generateHalfElfNames()
      case "aesthetic":
        return generateAestheticUsernames(text)
      case "curved":
        return generateCurvedText(text)
      case "vietnamese":
        return translateToVietnamese(text)
      case "discordbold":
        return generateDiscordBold(text)
      case "catnames":
        return generateCatNames()
      case "fantasy":
        return generateFantasyFonts(text)
      case "quirks":
        return generateQuirks()
      case "metal":
        return generateMetalFont(text)
      case "demonic":
        return generateDemonicSymbols(text)
      case "simlish":
        return translateToSimlish(text)
      case "tiktok":
        return generateTikTokFont(text)
      case "creepy":
        return generateCreepyFonts(text)
      case "valyrian":
        return translateToHighValyrian(text)
      default:
        return text
    }
  }

  useEffect(() => {
    if (isGenerator || inputText.trim()) {
      const result = getTransformation(inputText, transformType)
      setOutputText(result)
    } else {
      setOutputText(Array.isArray(outputText) ? [] : "")
    }
  }, [inputText, transformType, isGenerator])

  const handleCopy = (textToCopy: string, index?: number) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(index !== undefined ? index : true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea")
        textArea.value = textToCopy
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        setCopied(index !== undefined ? index : true)
        setTimeout(() => setCopied(false), 2000)
      })
  }

  const handleGenerate = () => {
    const result = getTransformation(inputText, transformType)
    setOutputText(result)
  }

  const isMultipleOutputs = [
    "instagram",
    "fancy",
    "stylish",
    "facebook",
    "igfonts",
    "glitch",
    "halfelf",
    "aesthetic",
    "curved",
    "catnames",
    "fantasy",
    "quirks",
    "creepy",
  ].includes(transformType)

  const isNameGenerator = ["halfelf", "catnames", "quirks"].includes(transformType)

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">{description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {isNameGenerator ? "Generator Options" : "Input Text"}
              </h2>
            </div>
            <div className="p-6">
              {!isNameGenerator ? (
                <>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-60 p-4 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-700 resize-none"
                    aria-label="Input text to transform"
                  />
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">Characters: {inputText.length}</div>
                </>
              ) : (
                <div className="space-y-4">
                  {transformType === "aesthetic" && (
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter a base word (optional)"
                      className="w-full p-4 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-white dark:bg-gray-700"
                    />
                  )}
                  <button
                    onClick={handleGenerate}
                    className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Generate{" "}
                    {transformType === "halfelf" ? "Names" : transformType === "catnames" ? "Cat Names" : "Quirks"}
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click the button above to generate new{" "}
                    {transformType === "halfelf"
                      ? "half-elf names"
                      : transformType === "catnames"
                        ? "cat names"
                        : "character quirks"}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                {isMultipleOutputs ? "Generated Results" : "Transformed Text"}
              </h2>
              {!isMultipleOutputs && typeof outputText === "string" && outputText && (
                <button
                  onClick={() => handleCopy(outputText as string)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white  bg-gray-950  hover:bg-gray-800   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                  aria-label="Copy transformed text"
                >
                  {copied === true ? "Copied!" : "Copy"}
                </button>
              )}
            </div>
            <div className="p-6">
              {!isMultipleOutputs ? (
                <div className="w-full h-60 p-4 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white break-all">
                  {outputText || (
                    <span className="text-gray-400 dark:text-gray-500 italic">
                      Your transformed text will appear here...
                    </span>
                  )}
                </div>
              ) : (
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {Array.isArray(outputText) && outputText.length > 0 ? (
                    outputText.map((output, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 relative group"
                      >
                        <div className="pr-20 break-all text-gray-900 dark:text-white min-h-[1.5rem]">{output}</div>
                        <button
                          onClick={() => handleCopy(output, index)}
                          className="absolute top-2 right-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-black  hover:bg-gray-950  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label={`Copy style ${index + 1}`}
                        >
                          {copied === index ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500 italic text-center py-8">
                      {isNameGenerator
                        ? "Click the generate button to create new results..."
                        : "Enter some text to see the different styles..."}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
            {isNameGenerator ? (
              <>
                <li>
                  Click the "Generate" button to create new{" "}
                  {transformType === "halfelf"
                    ? "half-elf names"
                    : transformType === "catnames"
                      ? "cat names"
                      : "character quirks"}
                </li>
                <li>Browse through the generated results</li>
                <li>Click "Copy" next to any result you like</li>
                <li>Use the copied text in your projects</li>
              </>
            ) : (
              <>
                <li>Type or paste your text in the input box</li>
                <li>See the {isMultipleOutputs ? "different styles" : "transformed text"} appear instantly</li>
                <li>Click the "Copy" button to copy {isMultipleOutputs ? "any style" : "the result"} you like</li>
                <li>Paste it anywhere you want to use the transformed text</li>
              </>
            )}
          </ol>
        </div>
      </div>
    </>
  )
}

export default TextTransformer