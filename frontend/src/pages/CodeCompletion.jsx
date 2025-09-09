import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

const stepIcons = [
  <span key="lang" role="img" aria-label="laptop">💻</span>,
  <span key="snippet" role="img" aria-label="page">📄</span>,
  <span key="target" role="img" aria-label="goal">🎯</span>
];

function CodeCompletion() {
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const rawResultText = result;

  const handleCompletion = async () => {
    if (!language.trim() || !code.trim() || !goal.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const prompt = `
Given the following code (in ${language}), please offer a smart, context-aware completion to help the user achieve:
"${goal}".

Current code:
\`\`\`
${code}
\`\`\`

- If useful, include additional explanation, comments, and suggestions.
- Output your answer in clear Markdown, using:
  - **Section headings** for "Completed Code", "Explanation", etc.
  - Code blocks where relevant.
  - Bullet points or tables if that will help understanding.
- Your answer should be readable and visually clear, ready for direct use or learning.
      `;
      const completion = await generateContent(prompt);
      setResult(completion);
    } catch (err) {
      setError("Sorry, something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageLayout
      title="Code Completion"
      info="This tool streamlines the coding process by offering smart, context-aware code completions, saving time and reducing errors, making coding more productive."
      description="This tool streamlines the coding process by offering smart, context-aware code completions, saving time and reducing errors, making coding more productive."
      steps={[
        {
          label: "What programming language or framework are you using?",
          icon: stepIcons[0],
          input: (
            <input
              type="text"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
              placeholder="e.g., Python, Java, React etc.."
              required
            />
          )
        },
        {
          label: "Can you share the code you're working on?",
          icon: stepIcons[1],
          input: (
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-1 w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please paste your current code here"
              required
            />
          )
        },
        {
          label: "What specific functionality or outcome are you aiming to achieve with this code?",
          icon: stepIcons[2],
          input: (
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
              placeholder="Please describe your code's purpose. e.g., To create a user login system"
              required
            />
          )
        }
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleCompletion}
      error={error}
      loading={loading}
      submitLabel={loading ? "Completing..." : "Create Content"}
      resultSection={
        result ? (
          <ResultFormatter markdown={result} />
        ) : (
          <div className="text-muted-foreground">Your completed code and explanation will appear here.</div>
        )
      }
      rawResultText={rawResultText}
    />
  );
}

export default CodeCompletion;
