import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

const stepIcons = [
  <span key="code" role="img" aria-label="page">📄</span>,
  <span key="goal" role="img" aria-label="target">🎯</span>,
  <span key="docs" role="img" aria-label="docs">📚</span>
];

function CodeRefactor() {
  const [code, setCode] = useState("");
  const [goal, setGoal] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const rawResultText = result;

  const handleRefactor = async () => {
    if (!code.trim() || !goal.trim()) {
      setError("Please enter both your code and the refactoring goal.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const prompt = `
Please refactor the following code to achieve the stated improvements.

Goal: ${goal}
${details ? `\nAdditional information/guidelines: ${details}` : ""}

Code to refactor:
\`\`\`
${code}
\`\`\`

- Refactor and optimize the code as needed to achieve the goal.
- Output the refactored code first in a code block.
- Then provide a clear, sectioned Markdown explanation for changes made, their impact, and any best practices followed.
- Use section headings like "Refactored Code", "Key Improvements", and "Explanation".
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
      title="Code Refactor"
      info="This tool fine-tunes your code for better performance and easier maintenance, ensuring it stays efficient and clear without altering its purpose."
      description="This tool fine-tunes your code for better performance and easier maintenance, ensuring it stays efficient and clear without altering its purpose."
      steps={[
        {
          label: "Can you share the piece of code you'd like to improve or refactor?",
          icon: stepIcons[0],
          input: (
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-1 w-full h-20 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please paste your code here."
              required
            />
          )
        },
        {
          label: "What specific improvements or outcomes are you aiming for with this refactoring?",
          icon: stepIcons[1],
          input: (
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
              placeholder="Please state your goal. e.g., increase efficiency, reduce processing time."
              required
            />
          )
        },
        {
          label: "Is there any additional information, documentation, or guidelines you'd like to provide to help with the refactor? (optional)",
          icon: stepIcons[2],
          input: (
            <textarea
              value={details}
              onChange={e => setDetails(e.target.value)}
              className="mt-1 w-full h-14 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please share any relevant documents or details here."
            />
          )
        }
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleRefactor}
      error={error}
      loading={loading}
      submitLabel={loading ? "Refactoring..." : "Create Content"}
      resultSection={
        result ? (
          <ResultFormatter markdown={result} />
        ) : (
          <div className="text-muted-foreground">Your refactored code and explanation will appear here.</div>
        )
      }
      rawResultText={rawResultText}
    />
  );
}

export default CodeRefactor;
