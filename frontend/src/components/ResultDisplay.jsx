import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// A simple markdown to HTML converter
const formatText = (text) => {
  // Bold: **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Code blocks: ```language\ncode\n```
  text = text.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
    return `<pre class="bg-gray-800 text-white p-4 rounded-md my-4 overflow-x-auto"><code class="language-${lang}">${code.trim()}</code></pre>`;
  });

  // Inline code: `code`
  text = text.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono">$1</code>');
  
  // Headings: #, ##, ###
  text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Lists: * or -
  text = text.replace(/^\s*([*-]) (.*)/gm, '<ul><li>$2</li></ul>');
  text = text.replace(/<\/ul>\s*<ul>/g, ''); // Merge consecutive lists

  return text.replace(/\n/g, '<br />'); // Replace newlines with <br>
};


function ResultDisplay({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-foreground">Result</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-accent transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div 
        className="bg-card border rounded-lg p-6 prose prose-sm max-w-none text-card-foreground"
        dangerouslySetInnerHTML={{ __html: formatText(result) }}
      />
    </div>
  );
}

export default ResultDisplay;
