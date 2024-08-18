import { useState, useEffect } from 'react';
import axios from 'axios';

const useAIAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAIResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize speech synthesis
  const synth = window.speechSynthesis;
  let utterance: SpeechSynthesisUtterance | null = null;

  useEffect(() => {
    return () => {
      // Clean up: stop speaking when component unmounts
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    // Cancel any ongoing speech
    if (synth.speaking) {
      synth.cancel();
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance error', event);
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth.speaking) {
      synth.cancel();
    }
    setIsSpeaking(false);
  };

  const callOpenAI = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer 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`,
            'Content-Type': 'application/json'
          }
        }
      );
      const responseText = response.data.choices[0].message.content.trim();
      setAIResponse(responseText);
      speakText(responseText);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      const errorMessage = 'Sorry, I encountered an error. Please try again later.';
      setAIResponse(errorMessage);
      speakText(errorMessage);
    }
    setIsLoading(false);
  };

  return { isLoading, aiResponse, isSpeaking, callOpenAI, stopSpeaking };
};

export default useAIAssistant;