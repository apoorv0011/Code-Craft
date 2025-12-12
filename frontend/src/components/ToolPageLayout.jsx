import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Info, Copy, Check, Sparkles, Zap } from "lucide-react";

/**
 * ToolPageLayout - Premium two-column layout for code tools with glassmorphism
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
  const [showInfo, setShowInfo] = useState(false);

  const handleCopy = () => {
    if (!rawResultText) return;
    navigator.clipboard.writeText(rawResultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      <div className="relative container mx-auto px-4 py-8">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 text-white hover:border-purple-500/50 hover:bg-white/5 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </button>
          {onStartOver && (
            <button
              onClick={onStartOver}
              className="px-4 py-2 glass rounded-xl border border-white/10 text-purple-400 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all font-medium"
            >
              Start New
            </button>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form
              className="space-y-6"
              onSubmit={e => { e.preventDefault(); onSubmit(); }}
              autoComplete="off"
            >
              {/* Header */}
              <div className="glass-strong rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold gradient-text">{title}</h1>
                      {info && (
                        <button
                          type="button"
                          onClick={() => setShowInfo(!showInfo)}
                          className="relative group"
                        >
                          <Info className="w-5 h-5 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-400 leading-relaxed">{description}</p>
                    
                    {/* Info tooltip */}
                    {showInfo && info && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-4 glass rounded-xl border border-blue-500/20 text-sm text-gray-300"
                      >
                        {info}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Steps */}
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2 text-white font-semibold">
                      {step.icon}
                      <span>{step.label}</span>
                    </div>
                  </div>
                  {step.input}
                </motion.div>
              ))}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <p className="text-red-400 text-sm whitespace-pre-line">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`
                  w-full py-4 rounded-xl font-bold text-white text-lg
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  shadow-lg hover:shadow-blue-500/30
                  transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                  group relative overflow-hidden
                `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>{submitLabel}</span>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Result Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-white text-lg">Generated Result</span>
              </div>
              
              {/* Copy Button */}
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!rawResultText}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg
                  transition-all font-medium
                  ${copied 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'glass border border-white/10 text-white hover:border-purple-500/50 hover:bg-purple-500/10'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Result Content */}
            <div className="p-6 min-h-[500px] max-h-[700px] overflow-y-auto custom-scrollbar">
              {resultSection || (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-lg">Your AI-generated result will appear here</p>
                  <p className="text-gray-500 text-sm mt-2">Fill in the form and click the button to generate</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ToolPageLayout;
