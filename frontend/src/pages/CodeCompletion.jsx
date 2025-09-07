import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function CodeCompletion() {
  const [language, setLanguage] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [purpose, setPurpose] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleComplete = async () => {
    if (!language.trim() || !currentCode.trim() || !purpose.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      const prompt = `Please complete the following ${language} code based on the purpose described.
      
      Purpose: ${purpose}

      Current code:
      \`\`\`${language.toLowerCase()}
      ${currentCode}
      \`\`\`

      Format your response using Markdown.
      Provide:
      1. The completed/extended code in a new code block.
      2. An explanation of what was added or changed.
      
      Make the completion contextually appropriate and follow best practices.`;

      const completion = await generateContent(prompt);
      setResult(completion);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Code Completion"
      description="Get smart, context-aware code completions to save time and reduce errors."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Programming Language
            </label>
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g., Python, JavaScript"
              className="w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Current Code
            </label>
            <textarea
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              placeholder="Paste your incomplete code here..."
              className="w-full h-48 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Code's Purpose
            </label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., To create a user login system"
              className="w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleComplete}
            disabled={!language.trim() || !currentCode.trim() || !purpose.trim()}
          >
            Complete Code
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CodeCompletion;
