import React from 'react';
import { AlertTriangle, ExternalLink, Copy, Check } from 'lucide-react';
import { getApiKeyStatus } from '../services/geminiApi';

function ApiKeyNotice() {
  const [copied, setCopied] = React.useState(false);
  const apiKeyStatus = getApiKeyStatus();

  const copyToClipboard = () => {
    navigator.clipboard.writeText('VITE_GEMINI_API_KEY=your_api_key_here');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            API Key Required
          </h3>
          
          <div className="space-y-3 text-sm text-red-700">
            <p className="font-medium">
              Status: {apiKeyStatus.message}
            </p>
            
            <div className="bg-red-100 rounded p-3">
              <p className="font-medium mb-2">To fix this issue:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>
                  Get your free API key from{' '}
                  <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 underline hover:no-underline font-medium"
                  >
                    Google AI Studio
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>Copy your API key (it should start with "AIza")</li>
                <li>
                  Open your <code className="bg-red-200 px-1 rounded">.env</code> file in the project
                </li>
                <li>
                  Replace the line with your actual API key:
                  <div className="mt-1 flex items-center gap-2">
                    <code className="bg-red-200 px-2 py-1 rounded text-xs">
                      VITE_GEMINI_API_KEY=your_api_key_here
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </li>
                <li>Save the file and refresh this page</li>
              </ol>
            </div>

            <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
              <p className="text-yellow-800 text-xs">
                <strong>Important:</strong> Make sure your API key is valid and has not expired. 
                If you're still having issues, try generating a new API key from Google AI Studio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiKeyNotice;
