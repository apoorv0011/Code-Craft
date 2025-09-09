import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

const stepIcons = [
  <span key="code" role="img" aria-label="page">📄</span>,
  <span key="type" role="img" aria-label="note">🗒️</span>,
  <span key="goal" role="img" aria-label="goal">🌟</span>,
  <span key="info" role="img" aria-label="info">ℹ️</span>
];

const docTypes = [
  "I require API reference documentation for my project.",
  "I require usage examples for this code.",
  "I require inline comments for clarity.",
  "I require high-level conceptual/project documentation."
];

function CodeDocumentation() {
  const [code, setCode] = useState("");
  const [docType, setDocType] = useState(docTypes[0]);
  const [goal, setGoal] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const rawResultText = result;

  const handleGenerate = async () => {
    if (!code.trim() || !docType.trim()) {
      setError("Please provide your code and documentation type.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const prompt = `
Generate clear, well-structured documentation for the following code.

Documentation type: ${docType}
${goal ? `\nProject goal: ${goal}` : ""}
${additionalInfo ? `\nAdditional details: ${additionalInfo}` : ""}

Code to document:
\`\`\`
${code}
\`\`\`

- Output the documentation in Markdown, with relevant section headings as needed.
- Include tables, bullet points, and code blocks where it makes the documentation clearer.
- Structure your answer to be easy to read both for beginners and experienced developers.
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
      title="Code Documentation"
      info="This tool streamlines the creation of clear and concise code documentation, making it easier for developers to understand, maintain, and collaborate on software projects."
      description="This tool streamlines the creation of clear and concise code documentation, making it easier for developers to understand, maintain, and collaborate on software projects."
      steps={[
        {
          label: "Can you share the source code that you need documentation for?",
          icon: stepIcons[0],
          input: (
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              className="mt-1 w-full h-20 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please paste your source code here."
              required
            />
          )
        },
        {
          label: "What type of documentation are you looking for?",
          icon: stepIcons[1],
          input: (
            <select
              value={docType}
              onChange={e => setDocType(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
              required
            >
              {docTypes.map(opt =>
                <option key={opt}>{opt}</option>
              )}
            </select>
          )
        },
        {
          label: "Tell us about your project's goal or what it aims to achieve? (optional)",
          icon: stepIcons[2],
          input: (
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
              placeholder="Please describe your project's goal."
            />
          )
        },
        {
          label: "Is there any additional information or specific details you'd like to include in the documentation? (optional)",
          icon: stepIcons[3],
          input: (
            <textarea
              value={additionalInfo}
              onChange={e => setAdditionalInfo(e.target.value)}
              className="mt-1 w-full h-14 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please provide any additional details for the documentation"
            />
          )
        }
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleGenerate}
      error={error}
      loading={loading}
      submitLabel={loading ? "Generating..." : "Create Content"}
      resultSection={
        result ? (
          <ResultFormatter markdown={result} />
        ) : (
          <div className="text-muted-foreground">Your generated documentation will appear here.</div>
        )
      }
      rawResultText={rawResultText}
    />
  );
}

export default CodeDocumentation;
