import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, FileText, Wrench, Bug, RefreshCw, BookOpen, Zap, ArrowRight, Sparkles, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const tools = [
  { 
    id: 'code-generator', 
    title: 'Code Generator', 
    description: 'Turn ideas into code with tailored, ready-to-use solutions.', 
    icon: Code, 
    path: '/code-generator', 
    gradient: 'from-blue-500 via-blue-600 to-indigo-600',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]'
  },
  { 
    id: 'code-explainer', 
    title: 'Code Explainer', 
    description: 'Simplify complex code into easy-to-follow explanations.', 
    icon: FileText, 
    path: '/code-explainer', 
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]'
  },
  { 
    id: 'code-completion', 
    title: 'Code Completion', 
    description: 'Get smart, context-aware code completions to code faster.', 
    icon: Zap, 
    path: '/code-completion', 
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    glow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]'
  },
  { 
    id: 'bug-detector', 
    title: 'Bug Detector', 
    description: 'Analyze code and error messages to pinpoint and fix bugs.', 
    icon: Bug, 
    path: '/bug-detector', 
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]'
  },
  { 
    id: 'code-converter', 
    title: 'Code Converter', 
    description: 'Translate code from one programming language to another.', 
    icon: RefreshCw, 
    path: '/code-converter', 
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    glow: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]'
  },
  { 
    id: 'code-documentation', 
    title: 'Code Documentation', 
    description: 'Generate clear and concise documentation for your projects.', 
    icon: BookOpen, 
    path: '/code-documentation', 
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]'
  },
  { 
    id: 'code-refactor', 
    title: 'Code Refactor', 
    description: 'Fine-tune your code for better performance and maintenance.', 
    icon: Wrench, 
    path: '/code-refactor', 
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

function Home() {
  const { user } = useAuth();
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient"></div>

      {/* Refined blur orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-orb animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-orb animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-violet-500/15 rounded-full blur-orb animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-40"></div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          {/* Refined floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 glass rounded-full border border-white/10 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">AI-Powered Coding Excellence</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Premium heading with refined gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-tight">
            <span className="block gradient-text text-glow">
              Welcome to
            </span>
            <span className="block mt-3 gradient-text text-glow">
              CodeCraft
            </span>
          </h1>

          {/* Refined subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Your premium suite of{' '}
            <span className="text-blue-400 font-medium">7 AI-powered tools</span>
            {' '}designed to elevate your development workflow.
            {user ? (
              <span className="block mt-3 text-blue-300 font-normal">
                Select a tool below to begin
              </span>
            ) : (
              <span className="block mt-3 text-blue-300 font-normal">
                Sign in to unlock the full experience
              </span>
            )}
          </motion.p>

          {/* Premium CTA Buttons */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
            >
              <Link
                to="/signup"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 glass rounded-xl font-semibold text-white hover:bg-white/5 transition-all duration-300 border border-white/10 hover:border-blue-500/30"
              >
                Sign In
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link to={tool.path} className="block h-full group">
                <div className={`
                  relative h-full p-7 rounded-2xl glass-strong
                  border border-white/10 overflow-hidden
                  transition-all duration-500
                  ${tool.glow}
                  hover:border-white/20
                `}>
                  {/* Subtle gradient overlay on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${tool.gradient} 
                    opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500
                  `}></div>

                  {/* Refined shimmer effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with refined gradient */}
                    <div className={`
                      w-14 h-14 rounded-xl mb-5 flex items-center justify-center
                      bg-gradient-to-br ${tool.gradient}
                      group-hover:scale-110 transition-transform duration-400
                      shadow-lg
                    `}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300 font-light">
                      {tool.description}
                    </p>

                    {/* Arrow with refined animation */}
                    <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">
                      <span>Explore Tool</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Refined corner accent */}
                  <div className={`
                    absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${tool.gradient}
                    opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full
                  `}></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="glass-strong rounded-3xl p-10 md:p-14 max-w-4xl mx-auto border border-white/10 backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-5 gradient-text leading-tight">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-gray-400 text-lg mb-10 font-light max-w-2xl mx-auto">
              Join developers worldwide who are building better software with AI-powered tools.
            </p>
            {!user && (
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                Start Building with AI
                <Sparkles className="w-5 h-5" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
