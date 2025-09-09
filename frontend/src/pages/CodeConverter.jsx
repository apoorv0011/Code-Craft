import React, { useState } from "react";
import ToolPageLayout from "../components/ToolPageLayout";
import ResultFormatter from "../components/ResultFormatter";
import { generateContent } from "../services/geminiApi";
import { useNavigate } from "react-router-dom";

const stepIcons = [
  <span key="target" role="img" aria-label="switch">🎯</span>,
  <span key="code" role="img" aria-label="file">💻</span>
];

const languageOptions = [
  "JavaScript", "Python", "Java", "C++", "C#", "TypeScript", "Go", "Ruby", "Rust", "PHP", "Kotlin", "Swift"
];

function CodeConverter() {
  const [targetLang, setTargetLang] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const rawResultText = result;

  const handleConvert = async () => {
    if (!targetLang.trim() || !code.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult("");
    try {
      const prompt = `
Convert the following code to ${targetLang} and explain any important changes.
- Output first the converted code as a code block.
- Then provide a sectioned Markdown explanation of significant transformations, language-specific differences, and usage notes.
- Use headings for "Converted Code" and "Explanation".

Source code:
\`\`\`
${code}
\`\`\`
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
      title="Code Converter"
      info="This tool effortlessly translates your code from one programming language to another, saving time and reducing the risk of errors."
      description="This tool effortlessly translates your code from one programming language to another, saving time and reducing the risk of errors."
      steps={[
        {
          label: "To which language would you like to convert the code?",
          icon: stepIcons[0],
          input: (
            <select
              value={targetLang}
              onChange={e => setTargetLang(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-background border rounded-md focus:ring-2 focus:ring-ring"
            >
              {languageOptions.map(lang =>
                <option key={lang} value={lang}>{lang}</option>
              )}
            </select>
          )
        },
        {
          label: "Can you share the source code you'd like converted?",
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
        }
      ]}
      onBack={() => navigate(-1)}
      onSubmit={handleConvert}
      error={error}
      loading={loading}
      submitLabel={loading ? "Converting..." : "Create Content"}
      resultSection={
        result ? (
          <ResultFormatter markdown={result} />
        ) : (
          <div className="text-muted-foreground">Your converted code and explanation will appear here.</div>
        )
      }
      rawResultText={rawResultText}
    />
  );
}

export default CodeConverter;
