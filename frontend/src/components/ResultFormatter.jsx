import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code2, Lightbulb, Sparkles } from "lucide-react";

function ResultFormatter({ markdown }) {
  return (
    <div className="space-y-4">
      <ReactMarkdown
        components={{
          // H1 - Main headings
          h1: (props) => (
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
              <Sparkles className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <h1 className="text-xl font-bold text-white" {...props} />
            </div>
          ),
          
          // H2 - Section headings
          h2: (props) => (
            <h2 className="text-lg font-bold text-blue-300 mt-6 mb-3 flex items-center gap-2" {...props}>
              <div className="w-1 h-4 bg-blue-500 rounded"></div>
              {props.children}
            </h2>
          ),
          
          // H3 - Subsection headings
          h3: (props) => (
            <h3 className="text-base font-semibold text-blue-200 mt-4 mb-2" {...props} />
          ),
          
          // Paragraphs
          p: (props) => (
            <p className="text-gray-300 leading-relaxed mb-3 text-sm" {...props} />
          ),
          
          // Unordered lists
          ul: (props) => (
            <ul className="ml-4 space-y-1.5 mb-3" {...props} />
          ),
          
          // List items
          li: (props) => (
            <li className="text-gray-300 text-sm flex items-start gap-2">
              <span className="text-blue-400 mt-1.5">•</span>
              <span>{props.children}</span>
            </li>
          ),
          
          // Ordered lists
          ol: (props) => (
            <ol className="ml-4 space-y-1.5 mb-3 list-decimal list-inside" {...props} />
          ),
          
          // Blockquotes
          blockquote: (props) => (
            <div className="my-3 pl-4 border-l-2 border-blue-500/50 bg-blue-500/5 rounded-r-lg p-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300 text-sm italic" {...props} />
              </div>
            </div>
          ),
          
          // Strong/Bold text
          strong: (props) => (
            <strong className="text-blue-300 font-semibold" {...props} />
          ),
          
          // Emphasis/Italic text
          em: (props) => (
            <em className="text-blue-200" {...props} />
          ),
          
          // Code blocks and inline code
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            return !inline ? (
              <div className="relative my-4 group">
                {/* Language badge */}
                {language && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="px-2 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-semibold rounded-md border border-blue-500/50 uppercase">
                      {language}
                    </span>
                  </div>
                )}
                
                {/* Code block */}
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#1e1e1e]">
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={language || 'text'}
                    PreTag="div"
                    className="!bg-transparent !m-0 text-sm"
                    customStyle={{
                      padding: '1rem',
                      background: 'transparent',
                      margin: 0,
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30 font-mono text-xs" {...props}>
                {children}
              </code>
            );
          },
          
          // Horizontal rules
          hr: () => (
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          ),
          
          // Links
          a: (props) => (
            <a 
              className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default ResultFormatter;
