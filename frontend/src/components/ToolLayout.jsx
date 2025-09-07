import React from 'react';
import { motion } from 'framer-motion';
import { isApiKeyConfigured } from '../services/geminiApi';
import ApiKeyNotice from './ApiKeyNotice';

function ToolLayout({ title, description, children }) {
  const apiKeyConfigured = isApiKeyConfigured();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {!apiKeyConfigured && <ApiKeyNotice />}

          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default ToolLayout;
