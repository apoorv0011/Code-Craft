import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

const stepIcons = [
  <span key="goal" role="img" aria-label="target">🎯</span>,
  <span key="lang" role="img" aria-label="laptop">💻</span>
];

function CodeGenerator() {
  const [purpose, setPurpose] = useState("");
  const [language, setLanguage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!purpose.trim() || !language.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const prompt = `Generate code for the following purpose: "${purpose}" using the programming language: ${language}.
Format your response using Markdown.
Provide:
1. A brief explanation of the code.
2. The complete, functional code inside a \`\`\`${language.toLowerCase()} code block.
3. Comments explaining key parts within the code.
4. Any setup instructions if needed.
5. Example usage if applicable.
Make sure the code is production-ready and follows best practices.`;
      const generated = await generateContent(prompt);
      setResult(generated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPageLayout
      title="Code Generator"
      info="This tool streamlines the process of turning ideas into code, offering tailored, ready-to-use solutions that save time and enhance productivity for developers of all levels."
      description="This tool streamlines the process of turning ideas into code, offering tailored, ready-to-use solutions..."
      steps={[
        {
          label: "Explain the goal or objective of the code you want to generate?",
          icon: stepIcons[0],
          input: (
            <textarea
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
              className="mt-1 w-full h-20 px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring resize-none text-sm"
              placeholder="Please describe your coding purpose. e.g., To create a quiz web app, etc."
              required
            />
          )
        },
        {
          label: "What programming language or framework are you using?",
          icon: stepIcons[1],
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
        }
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleGenerate}
      error={error}
      loading={loading}
      submitLabel={loading ? "Generating..." : "Create Content"}
      resultSection={result ? <ResultFormatter markdown={result} /> : <div className="text-muted-foreground">Your generated result will appear here.</div>}
    />
  );
}

export default CodeGenerator;
