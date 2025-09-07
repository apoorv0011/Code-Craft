import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import LoadingButton from '../components/LoadingButton';
import ResultDisplay from '../components/ResultDisplay';
import { generateContent } from '../services/geminiApi';

function CodeDocumentation() {
  const [sourceCode, setSourceCode] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateDocumentation = async () => {
    if (!sourceCode.trim() || !projectGoal.trim()) {
      setError('Please provide both the source code and the project goal.');
      return;
    }

    setError('');
    setLoading(true);
    setResult('');
    try {
      const prompt = `Generate comprehensive documentation for the following code.

      Source Code:
      \`\`\`
      ${sourceCode}
      \`\`\`

      Project Goal: ${projectGoal}

      Format the response using Markdown.
      Provide:
      1. **Overview**: A summary of the code's functionality.
      2. **API Documentation / Function Breakdown**: Detailed explanation of each function, its parameters, and return values.
      3. **Usage Examples**: Clear examples of how to use the code.
      4. **Installation/Setup**: Any necessary setup instructions.
      
      Make the documentation professional and easy for other developers to understand.`;

      const documentation = await generateContent(prompt);
      setResult(documentation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Code Documentation"
      description="Generate clear, concise documentation to make your projects easy to understand and maintain."
    >
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Source Code
            </label>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder="Paste your source code here..."
              className="w-full h-48 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Project's Goal
            </label>
            <textarea
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
              placeholder="Describe what your project aims to achieve..."
              className="w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <LoadingButton
            loading={loading}
            onClick={handleGenerateDocumentation}
            disabled={!sourceCode.trim() || !projectGoal.trim()}
          >
            Generate Docs
          </LoadingButton>

          {error && <p className="text-sm text-destructive">{error}</p>}
          <ResultDisplay result={result} />
        </div>
      </div>
    </ToolLayout>
  );
}

export default CodeDocumentation;
