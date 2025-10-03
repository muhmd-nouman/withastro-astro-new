'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Breadcrumb from '@/components/unicode/BreadCrubms.astro';
import Sidebar from '@/components/unicode/SideBar.astro';
import { Copy, Check } from 'lucide-react';

export default function UnicodeCategoryPage({ category, slug }) {
  const [copiedStates, setCopiedStates] = useState({});

  const showCopyFeedback = (charId) => {
    setCopiedStates((prev) => ({ ...prev, [charId]: true }));
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [charId]: false }));
    }, 2000);
  };

  return (
    <div className="flex">
            
        <div className="flex-1 min-w-0">
            <div className="container mx-auto px-4 py-8">

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
                    <p className="text-gray-600 mb-8">{category.description}</p>
                    <div className="grid gap-6">
                        {category.characters.map((char) => (
                            <Card key={char.id} className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-1">{char.name}</h2>
                                        <p className="text-gray-600">{char.description}</p>
                                    </div>
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(char.symbol);
                                            showCopyFeedback(char.id);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="copy-button flex items-center gap-2"
                                        data-char-id={char.id}
                                        disabled={copiedStates[char.id]}
                                    >
                                    {copiedStates[char.id] ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                        <p className="text-gray-600">Unicode</p>
                                        <code className="font-mono">U+{char.id}</code>
                                        </div>
                                        <div>
                                        <p className="text-gray-600">HTML Entity</p>
                                        <code className="font-mono">{char.htmlEntity}</code>
                                        </div>
                                    </div>
                                    </div>

                                    <div>
                                    <h3 className="font-medium mb-2">Common Uses</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {char.usage.map((use, index) => (
                                        <li key={index}>{use}</li>
                                        ))}
                                    </ul>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
}
