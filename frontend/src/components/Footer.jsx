import React from 'react';
import { Heart, Linkedin, Github, Twitter, Sparkles } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative border-t border-white/10 glass-strong backdrop-blur-xl">
      {/* Refined gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand with matching gradient */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-md opacity-40"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold gradient-text">CodeCraft</p>
              <p className="text-xs text-gray-400 font-light">AI-Powered Coding Excellence</p>
            </div>
          </div>

          {/* Creator Info with gradient text */}
          <div className="text-center">
            <p className="text-gray-400 mb-2 text-sm font-light">
              Crafted with{' '}
              <Heart className="inline w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              {' '}by
            </p>
            <a 
              href="https://www.linkedin.com/in/apoorv-pachori" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-lg font-bold gradient-text hover:scale-105 transition-transform"
            >
              Apoorv Pachori
            </a>
          </div>

          {/* Social Links with matching style */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/apoorv-pachori"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group shadow-lg"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://github.com/apoorv0011"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group shadow-lg"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://twitter.com/apoorv0011"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group shadow-lg"
              title="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom text with gradient */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} <span className="gradient-text font-semibold">CodeCraft</span>. Transforming ideas into code with AI.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
