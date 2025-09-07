import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export function isApiKeyConfigured() {
  return GEMINI_API_KEY && 
         GEMINI_API_KEY !== 'YOUR_API_KEY' && 
         GEMINI_API_KEY.trim() !== '' &&
         GEMINI_API_KEY.length > 20 && // Basic length validation
         GEMINI_API_KEY.startsWith('AIza'); // Gemini API keys start with 'AIza'
}

export function getApiKeyStatus() {
  if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
    return { valid: false, message: 'No API key found' };
  }
  if (GEMINI_API_KEY === 'YOUR_API_KEY') {
    return { valid: false, message: 'Please replace YOUR_API_KEY with your actual API key' };
  }
  if (!GEMINI_API_KEY.startsWith('AIza')) {
    return { valid: false, message: 'Invalid API key format. Gemini API keys should start with "AIza"' };
  }
  if (GEMINI_API_KEY.length < 39) {
    return { valid: false, message: 'API key appears to be too short' };
  }
  return { valid: true, message: 'API key format appears valid' };
}

export async function generateContent(prompt) {
  const apiKeyStatus = getApiKeyStatus();
  
  if (!apiKeyStatus.valid) {
    throw new Error(`API Key Error: ${apiKeyStatus.message}. Please get a valid API key from Google AI Studio (https://makersuite.google.com/app/apikey) and add it to your .env file.`);
  }

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY,
        }
      }
    );

    if (!response.data.candidates || !response.data.candidates[0]) {
      throw new Error('No response generated. Please try again with a different request.');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Handle specific API key errors
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      if (errorData.error?.message?.includes('API key not valid')) {
        throw new Error('Invalid API Key: Your Gemini API key is not valid. Please check that you have:\n\n1. A valid API key from Google AI Studio\n2. The API key is correctly added to your .env file\n3. The API key has proper permissions\n\nGet a new API key at: https://makersuite.google.com/app/apikey');
      }
      if (errorData.error?.message?.includes('User location is not supported')) {
        throw new Error('Geographic Restriction: Gemini API is not available in your location. Please check Google AI Studio for supported regions.');
      }
      throw new Error(`API Error: ${errorData.error?.message || 'Invalid request. Please check your input and try again.'}`);
    } else if (error.response?.status === 403) {
      throw new Error('Access forbidden. Your API key may not have the required permissions or may be restricted.');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    } else if (error.message.includes('API key')) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to generate content. Please check your internet connection and try again.');
    }
  }
}
