import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

// Step icons using emoji for simplicity
const stepIcons = [
  <span key="snippet" role="img" aria-label="page">📄</span>,
  <span key="level" role="img" aria-label="target">🎯</span>,
  <span key="focus" role="img" aria-label="question">🔍</span>
];

function CodeExplainer() {
  const [code, setCode] = useState("");
  const [level, setLevel] = useState("Step-by-step guide");
  const [specificQuestion, setSpecificQuestion] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // For copy button: always use the markdown output string
  const rawResultText = result;

  const handleExplain = async () => {
    if (!code.trim()) {
      setError("Please paste your code to be explained.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      let prompt = `Please explain the following code in a clear, ${level.toLowerCase()}.
      
Code to explain:
\`\`\`
${code}
\`\`\`
${specificQuestion.trim() ? `Additionally, please address this specific question: ${specificQuestion}` : ""}

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
    <ToolPageLayout
      title="Code Explainer"
      info="This tool simplifies understanding code by explaining it in easy-to-follow terms, making programming more accessible for everyone."
      description="This tool simplifies understanding code by explaining it in easy-to-follow terms, making programming more accessible for everyone."
      steps={[
        {
          label: "Could you share the code snippet you’d like to be explained?",
          icon: stepIcons[0],
          input: (
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-1 w-full h-24 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please paste your code here."
              required
            />
          ),
        },
        {
          label: "What level of explanation are you looking for?",
          icon: stepIcons[1],
          input: (
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
            >
              <option>Step-by-step guide</option>
              <option>Quick summary</option>
              <option>High-level overview</option>
            </select>
          ),
        },
        {
          label: "Are there specific details or concepts you want the explanation to focus on? (optional)",
          icon: stepIcons[2],
          input: (
            <input
              type="text"
              value={specificQuestion}
              onChange={e => setSpecificQuestion(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
              placeholder="Please enter your specific question, doubt, or any details for which you need an explanation."
            />
          ),
        },
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleExplain}
      error={error}
      loading={loading}
      submitLabel={loading ? "Explaining..." : "Create Content"}
      // Pass rawResultText for copying, resultSection for display
      resultSection={
        result ? (
          <ResultFormatter markdown={result} />
        ) : (
          <div className="text-muted-foreground">Your explanation will appear here.</div>
        )
      }
      rawResultText={rawResultText}
    />
  );
}

export default CodeExplainer;
