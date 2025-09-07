import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function CodeGenerator() {
  const [purpose, setPurpose] = useState('');
  const [language, setLanguage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!purpose.trim() || !language.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      const prompt = `Generate code for the following purpose: "${purpose}" using the programming language: ${language}. 
      
      Format your response using Markdown.
      Provide:
      1. A brief explanation of the code.
      2. The complete, functional code inside a \`\`\`${language.toLowerCase()} code block.
      3. Comments explaining key parts within the code.
      4. Any setup instructions if needed.
      5. Example usage if applicable.
      
      Make sure the code is production-ready and follows best practices.`;

      const generatedCode = await generateContent(prompt);
      setResult(generatedCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Code Generator"
      description="Turn ideas into code. Just describe what you need, and let AI build it for you."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Coding Purpose
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., A Python script to scrape website titles"
              className="w-full h-28 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Programming Language
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g., Python, JavaScript, React"
              className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleGenerate}
            disabled={!purpose.trim() || !language.trim()}
          >
            Generate Code
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CodeGenerator;
