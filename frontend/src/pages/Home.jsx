import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, FileText, Wrench, Bug, RefreshCw, BookOpen, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const tools = [
  { id: 'code-generator', title: 'Code Generator', description: 'Turn ideas into code with tailored, ready-to-use solutions.', icon: Code, path: '/code-generator', color: 'text-blue-500', ring: 'hover:ring-blue-500/50' },
  { id: 'code-explainer', title: 'Code Explainer', description: 'Simplify complex code into easy-to-follow explanations.', icon: FileText, path: '/code-explainer', color: 'text-green-500', ring: 'hover:ring-green-500/50' },
  { id: 'code-completion', title: 'Code Completion', description: 'Get smart, context-aware code completions to code faster.', icon: Zap, path: '/code-completion', color: 'text-yellow-500', ring: 'hover:ring-yellow-500/50' },
  { id: 'bug-detector', title: 'Bug Detector', description: 'Analyze code and error messages to pinpoint and fix bugs.', icon: Bug, path: '/bug-detector', color: 'text-red-500', ring: 'hover:ring-red-500/50' },
  { id: 'code-converter', title: 'Code Converter', description: 'Translate code from one programming language to another.', icon: RefreshCw, path: '/code-converter', color: 'text-purple-500', ring: 'hover:ring-purple-500/50' },
  { id: 'code-documentation', title: 'Code Documentation', description: 'Generate clear and concise documentation for your projects.', icon: BookOpen, path: '/code-documentation', color: 'text-indigo-500', ring: 'hover:ring-indigo-500/50' },
  { id: 'code-refactor', title: 'Code Refactor', description: 'Fine-tune your code for better performance and maintenance.', icon: Wrench, path: '/code-refactor', color: 'text-orange-500', ring: 'hover:ring-orange-500/50' }
];

function Home() {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
          Welcome to CodeCraft
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your AI-powered suite of coding tools. 
          {user ? ' Select a tool to get started.' : ' Log in or sign up to begin.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
          >
            <Link to={tool.path} className="block h-full">
              <div className={`bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 h-full border hover:ring-2 ${tool.ring} group flex flex-col`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-secondary`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {tool.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-primary">
                  Use Tool
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
