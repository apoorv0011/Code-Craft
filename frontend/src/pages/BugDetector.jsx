import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

const stepIcons = [
  <span key="code" role="img" aria-label="page">📄</span>,
  <span key="bug" role="img" aria-label="bug">🦠</span>,
  <span key="more" role="img" aria-label="info">🌟</span>
];

function BugDetector() {
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const rawResultText = result;

  const handleDetect = async () => {
    if (!code.trim() || !errorMsg.trim()) {
      setError("Please provide both your code and the error message.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const prompt = `
Please analyze and help debug the following code.

Code:
\`\`\`
${code}
\`\`\`
Error message:
${errorMsg}
${details ? `\nAdditional details/expected outcome: ${details}` : ""}

- Identify the most likely cause of the error, suggest a fix, and briefly explain your reasoning.
- Format your answer in Markdown, using clear section headings ("Diagnosis", "Solution", "Explanation", etc.).
- Use code blocks for any corrected code. Bullet lists are encouraged when needed.
      `;
      const aiResult = await generateContent(prompt);
      setResult(aiResult);
    } catch (err) {
      setError("Sorry, something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageLayout
      title="Bug Detector"
      info="This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in an easy-to-understand manner."
      description="This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in an easy-to-understand manner."
      steps={[
        {
          label: "Can you share the code snippet causing trouble?",
          icon: stepIcons[0],
          input: (
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-1 w-full h-20 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Paste your code snippet here."
              required
            />
          )
        },
        {
          label: "What's the error message you're seeing?",
          icon: stepIcons[1],
          input: (
            <textarea
              value={errorMsg}
              onChange={e => setErrorMsg(e.target.value)}
              className="mt-1 w-full h-16 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please copy and paste the error you got"
              required
            />
          )
        },
        {
          label: "Any additional details or expected outcomes? (optional)",
          icon: stepIcons[2],
          input: (
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="mt-1 w-full h-14 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="To understand your goal better! Please provide your expectations or any additional details."
            />
          )
        }
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleDetect}
      error={error}
      loading={loading}
      submitLabel={loading ? "Detecting..." : "Create Content"}
      resultSection={
        result ? (
          <ResultFormatter markdown={result} />
        ) : (
          <div className="text-muted-foreground">Your bug analysis and solution will appear here.</div>
        )
      }
      rawResultText={rawResultText}
    />
  );
}

export default BugDetector;
