import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function CodeExplainer() {
  const [code, setCode] = useState('');
  const [specificQuestion, setSpecificQuestion] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplain = async () => {
    if (!code.trim()) {
      setError('Please paste your code to be explained.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      let prompt = `Please explain the following code in a clear, step-by-step manner.
      
      Code to explain:
      \`\`\`
      ${code}
      \`\`\`
      
      ${specificQuestion.trim() ? `Additionally, please address this specific question: ${specificQuestion}` : ''}

      Format your response using Markdown. Make the explanation easy to understand for developers of all levels.`;

      const explanation = await generateContent(prompt);
      setResult(explanation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Code Explainer"
      description="Simplify complex code. Paste any snippet to get a clear, step-by-step explanation."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Code Snippet
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-48 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Specific Question (Optional)
            </label>
            <textarea
              value={specificQuestion}
              onChange={(e) => setSpecificQuestion(e.target.value)}
              placeholder="e.g., Why is recursion used here?"
              className="w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleExplain}
            disabled={!code.trim()}
          >
            Explain Code
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CodeExplainer;
