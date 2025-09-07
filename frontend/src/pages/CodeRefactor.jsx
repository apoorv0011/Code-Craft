import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function CodeRefactor() {
  const [code, setCode] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRefactor = async () => {
    if (!code.trim() || !goal.trim()) {
      setError('Please provide both the code and the refactoring goal.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      const prompt = `Please refactor the following code to achieve the specified goal.

      Original Code:
      \`\`\`
      ${code}
      \`\`\`

      Refactoring Goal: ${goal}

      Format your response using Markdown.
      Provide:
      1. **Refactored Code**: The improved code in a new code block.
      2. **Explanation of Changes**: A summary of what was improved (e.g., performance, readability, maintainability).
      3. **Before/After Comparison**: A brief comparison of the key differences.
      
      Ensure the refactored code maintains the same functionality.`;

      const refactoredCode = await generateContent(prompt);
      setResult(refactoredCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Code Refactor"
      description="Fine-tune your code for better performance, readability, and maintenance."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Code to Refactor
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
              Refactoring Goal
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Increase efficiency, improve readability, convert to functional components..."
              className="w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleRefactor}
            disabled={!code.trim() || !goal.trim()}
          >
            Refactor Code
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CodeRefactor;
