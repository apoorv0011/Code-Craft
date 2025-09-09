import React, { useState } from "react";
import { ArrowLeft, Info, Copy, Check } from "lucide-react";

/**
 * ToolPageLayout - Two-column layout for code tools 
 * @param {*} props 
 *    - title: string (e.g., "Code Generator")
 *    - info: string (description shown in tooltip or via help icon)
 *    - description: string (subtitle)
 *    - steps: [{icon, label, input}]
 *    - onBack: function
 *    - onStartOver: function (optional)
 *    - error: string
 *    - loading: bool
 *    - onSubmit: function
 *    - submitLabel: string
 *    - resultSection: rendered JSX (result content)
 *    - rawResultText: string (plain text/markdown for copying)
 */
const ToolPageLayout = ({
  title,
  info,
  description,
  steps,
  onBack,
  onStartOver,
  error,
  loading,
  onSubmit,
  submitLabel,
  resultSection,
  rawResultText = ""
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!rawResultText) return;
    navigator.clipboard.writeText(rawResultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[80vh] pb-16 pt-8 px-2 bg-[#f8f9fb]">
      <div className="max-w-7xl mx-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-primary px-2 py-1 rounded transition"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          {onStartOver && (
            <button
              onClick={onStartOver}
              className="text-blue-600 font-medium hover:underline px-2 py-1"
            >Start New</button>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: Inputs */}
          <form
            className="space-y-8 flex flex-col items-stretch"
            onSubmit={e => { e.preventDefault(); onSubmit(); }}
            autoComplete="off"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {/* Info icon with tooltip */}
                {info && (
                  <span className="group relative cursor-pointer">
                    <Info className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    <span className="absolute z-10 left-8 top-0 bg-black text-white text-xs px-3 py-2 rounded shadow-lg whitespace-pre hidden group-hover:block">{info}</span>
                  </span>
                )}
              </div>
              <div className="text-gray-500 text-sm">{description}</div>
            </div>
            {steps.map((step, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2 text-base font-semibold">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-primary font-bold">
                    {idx + 1}
                  </span>
                  {step.icon} {step.label}
                </div>
                {step.input}
              </div>
            ))}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-bold shadow-lg hover:from-indigo-600 hover:to-blue-600 transition"
            >{submitLabel}</button>
          </form>
          {/* Right: Result */}
          <div className="bg-white rounded-2xl shadow-md border">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-semibold text-lg">Your Result</span>
              {/* Copy button */}
              <button
                onClick={handleCopy}
                aria-label="Copy Result"
                className="flex items-center gap-1 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-6 min-h-[360px] max-w-full overflow-y-auto overflow-x-hidden">
              {resultSection}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPageLayout;
