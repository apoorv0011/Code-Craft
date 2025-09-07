import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function CodeConverter() {
  const [fromLanguage, setFromLanguage] = useState('JavaScript');
  const [toLanguage, setToLanguage] = useState('Python');
  const [currentCode, setCurrentCode] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const languages = [ 'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'SQL' ];

  const handleConvert = async () => {
    if (!currentCode.trim()) {
      setError('Please paste your code to convert.');
      return;
    }
    if (fromLanguage === toLanguage) {
      setError('Please select different languages for conversion.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      const prompt = `Convert the following ${fromLanguage} code to ${toLanguage}.

      Original Code (${fromLanguage}):
      \`\`\`${fromLanguage.toLowerCase()}
      ${currentCode}
      \`\`\`

      Format your response using Markdown.
      Provide:
      1. The converted code in a \`\`\`${toLanguage.toLowerCase()} code block.
      2. An explanation of any significant changes or language-specific adaptations.
      
      Ensure the converted code maintains the same functionality and follows ${toLanguage} best practices.`;

      const convertedCode = await generateContent(prompt);
      setResult(convertedCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Code Converter"
      description="Effortlessly translate code from one programming language to another."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">From</label>
              <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)} className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring">
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">To</label>
              <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)} className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring">
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Code to Convert
            </label>
            <textarea
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              placeholder={`Paste your ${fromLanguage} code here...`}
              className="w-full h-48 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleConvert}
            disabled={!currentCode.trim()}
          >
            Convert Code
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CodeConverter;
