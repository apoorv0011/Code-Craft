import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function BugDetector() {
  const [codeSnippet, setCodeSnippet] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDetectBug = async () => {
    if (!codeSnippet.trim() || !errorMessage.trim()) {
      setError('Please provide both the code snippet and the error message.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      const prompt = `Please analyze the following code and error message to identify and fix bugs.

      Code snippet:
      \`\`\`
      ${codeSnippet}
      \`\`\`

      Error message:
      \`\`\`
      ${errorMessage}
      \`\`\`

      ${additionalDetails ? `Additional context: ${additionalDetails}` : ''}

      Format your response using Markdown.
      Provide:
      1. **Root Cause Analysis**: A clear explanation of the bug.
      2. **Corrected Code**: The fixed code snippet in a new code block.
      3. **Explanation of Fix**: A step-by-step guide on what was changed.
      4. **Best Practices**: Tips to prevent similar issues.`;

      const analysis = await generateContent(prompt);
      setResult(analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Bug Detector"
      description="Pinpoint and fix bugs by analyzing your code snippets and error messages."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Code Snippet
            </label>
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="Paste your code snippet here..."
              className="w-full h-48 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Error Message
            </label>
            <textarea
              value={errorMessage}
              onChange={(e) => setErrorMessage(e.target.value)}
              placeholder="Paste your error message here..."
              className="w-full h-32 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Additional Details (Optional)
            </label>
            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Provide any additional context or expectations..."
              className="w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleDetectBug}
            disabled={!codeSnippet.trim() || !errorMessage.trim()}
          >
            Detect Bug
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default BugDetector;
