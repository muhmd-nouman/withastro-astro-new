import React, { useState, useRef } from "react";
import {
  Copy,
  Heart,
  Share,
  Code2,
  Info,
  ClipboardCheck,
  Book,
  Globe,
  ChevronLeft,
  ChevronRight,
  Home,
  ArrowLeft,
  Facebook,
  Twitter,
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Type,
  Layers,
  LucidePanelTopClose,
} from "lucide-react";

export const UnicodeCharacterPage = ({
  character = "★",
  characterData,
  relatedCharacters,
  unicodeBlocks,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [fontSize, setFontSize] = useState(8);
  const [showPreview, setShowPreview] = useState(true);
  const sliderRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(character);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Unicode Character: ${character}`,
          text: `Check out this Unicode character: ${character}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4 text-sm">
          <a
            href="/"
            className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400"
          >
            <Home size={16} className="mr-1" />
            Home
          </a>
          <ChevronRight size={16} className="text-gray-400" />
          <a
            href="/unicode"
            className="flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400"
          >
            <Type size={16} className="mr-1" />
            Unicode Characters
          </a>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="text-indigo-600 dark:text-indigo-400">
            {char.symbol}
          </span>
        </div>
      </nav>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <a
          href="/unicode"
          className="inline-flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Unicode Characters
        </a>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <div
            className={`text-${fontSize}xl mb-8 transition-all duration-300`}
          >
            {character}
          </div>
          <h1 className="text-4xl font-bold mb-4">{characterData.name}</h1>
          <p className="text-xl text-indigo-100">{characterData.code}</p>

          {/* Font Size Controls */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={() => setFontSize(Math.max(4, fontSize - 2))}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30"
            >
              <Type size={16} />
            </button>
            <span className="text-white/80">Size: {fontSize}x</span>
            <button
              onClick={() => setFontSize(Math.min(12, fontSize + 2))}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30"
            >
              <Type size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr,300px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {copied ? (
                  <ClipboardCheck className="text-green-500" size={24} />
                ) : (
                  <Copy className="text-indigo-500" size={24} />
                )}
                <div className="text-left">
                  <p className="font-semibold dark:text-white">
                    {copied ? "Copied!" : "Copy Symbol"}
                  </p>
                  <p className="text-sm text-gray-500">Click to copy</p>
                </div>
              </button>

              <button
                className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                onClick={() => setLiked(!liked)}
              >
                <Heart
                  className={
                    liked ? "text-red-500 fill-current" : "text-gray-400"
                  }
                  size={24}
                />
                <div className="text-left">
                  <p className="font-semibold dark:text-white">
                    {liked ? "Saved!" : "Save Symbol"}
                  </p>
                  <p className="text-sm text-gray-500">Add to collection</p>
                </div>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Share className="text-indigo-500" size={24} />
                <div className="text-left">
                  <p className="font-semibold dark:text-white">Share</p>
                  <p className="text-sm text-gray-500">Share character</p>
                </div>
              </button>
            </div>

            {/* Preview and Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Preview Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Code2 className="text-indigo-500" size={20} />
                    Character Preview
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Maximize2 size={20} />
                    </button>
                  </div>
                </div>
                {showPreview && (
                  <div
                    className={`aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
                  >
                    <span className="text-8xl select-all">{character}</span>
                  </div>
                )}
              </div>

              {/* Technical Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Info className="text-indigo-500" size={20} />
                  Technical Details
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Unicode
                    </span>
                    <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                      {characterData.code}
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      HTML Entity
                    </span>
                    <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                      {characterData.htmlEntity}
                    </code>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Category
                    </span>
                    <span>{characterData.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Block
                    </span>
                    <span>{characterData.block}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What is This Character? */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">
                What is {characterData.name}?
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>{characterData.description}</p>
                <h3>Historical Background</h3>
                <p>{characterData.history}</p>
                <h3>Usage in Modern Context</h3>
                <p>{characterData.modernUsage}</p>
              </div>
            </div>

            {/* Usage Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Usage Examples</h2>
              <div className="space-y-6">
                {characterData.examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
                  >
                    <h3 className="font-semibold mb-2">{example.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {example.description}
                    </p>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded border dark:border-gray-700">
                      <code className="text-sm">{example.code}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Characters Slider */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">
                Related Characters
              </h2>
              <div className="relative">
                <button
                  onClick={() => scrollSlider("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2"
                >
                  <ChevronLeft size={24} />
                </button>
                <div
                  ref={sliderRef}
                  className="overflow-x-auto flex space-x-4 scroll-smooth"
                  style={{ scrollbarWidth: "none" }}
                >
                  {relatedCharacters.map((char, index) => (
                    <a
                      key={index}
                      href={`/unicode/${char.code.toLowerCase()}`}
                      className="flex-none bg-gray-50 dark:bg-gray-900 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
                    >
                      <div className="text-4xl mb-2">{char.symbol}</div>
                      <div className="text-sm font-medium">{char.name}</div>
                      <div className="text-xs text-gray-500">{char.code}</div>
                    </a>
                  ))}
                </div>
                <button
                  onClick={() => scrollSlider("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Tools */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LucidePanelTopClose className="text-indigo-500" size={20} />
                Unicode Tools
              </h2>
              <div className="space-y-4">
                <a
                  href="/tools/converter"
                  className="block p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Unicode Converter
                </a>
                <a
                  href="/tools/encoder"
                  className="block p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Text Encoder
                </a>
                <a
                  href="/tools/finder"
                  className="block p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow"
                >
                  Character Finder
                </a>
              </div>
            </div>

            {/* Unicode Blocks */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Layers className="text-indigo-500" size={20} />
                Unicode Blocks
              </h2>
              <div className="space-y-4">
                {unicodeBlocks.map((block, index) => (
                  <a
                    key={index}
                    href={`/blocks/${block.name.toLowerCase()}`}
                    className="block p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {block.name}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
