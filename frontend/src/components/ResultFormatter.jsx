import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace } from "react-syntax-highlighter/dist/esm/styles/prism";

function ResultFormatter({ markdown }) {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span role="img" aria-label="code">💡</span>
        Generated Code Segment
      </div>
      <ReactMarkdown
        children={markdown}
        components={{
          h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 text-blue-700 flex items-center gap-1" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2 text-indigo-600" {...props} />,
          h3: ({node, ...props}) => <h3 className="font-semibold mt-2 mb-1 text-purple-600" {...props} />,
          ul: ({node, ...props}) => <ul className="ml-6 list-disc text-base leading-relaxed" {...props} />,
          li: ({node, ...props}) => <li className="mb-1" {...props} />,
          code({node, inline, className, children, ...props}) {
            return !inline ? (
              <div className="relative my-4">
                <SyntaxHighlighter
                  style={duotoneSpace}
                  language={className?.replace("language-", "") || ""}
                  PreTag="div"
                  className="rounded-lg shadow border p-3 bg-gray-900 text-sm text-white"
                  {...props}
                >
                  {children}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="px-1 py-0.5 rounded bg-gray-100 text-red-600" {...props}>{children}</code>
            )
          },
        }}
      />
    </div>
  );
}

export default ResultFormatter;
