
import React, { useState, useRef, useEffect } from 'react';
import { getAIAssistance } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', text: 'SYSTEM READY. I am the ESBRAPY Technical Assistant. How can I assist with your engineering or accessibility queries?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAIAssistance(input);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: aiResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded shadow-2xl w-80 sm:w-96 flex flex-col h-[550px] border-2 border-slate-900 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 p-5 text-white flex justify-between items-center border-b-4 border-cyan-600">
            <div>
              <h3 className="font-black italic uppercase tracking-tighter text-sm">ESBRAPY-BOT v3.1</h3>
              <p className="text-[10px] text-cyan-400 font-mono flex items-center mt-1 uppercase">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                Protocol: Active
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-5 space-y-6 blueprint-bg">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded text-xs font-bold leading-relaxed shadow-sm border ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white border-slate-800 rounded-br-none' 
                  : 'bg-white text-slate-700 border-slate-200 rounded-bl-none'
                }`}>
                  {msg.role === 'assistant' && <span className="block text-[8px] uppercase tracking-widest text-cyan-600 mb-2 font-black mono italic">Response from system:</span>}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 border border-slate-200 rounded rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 border-t border-slate-200 bg-slate-50">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query system..."
                className="flex-grow p-4 border-2 border-slate-200 rounded font-bold text-xs focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 outline-none transition-all placeholder-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-slate-900 text-cyan-400 p-4 rounded hover:bg-cyan-600 hover:text-white disabled:opacity-50 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-5 rounded shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border-2 border-cyan-600 hover:bg-cyan-600 transition-all duration-300 hover:-translate-y-2 group"
          aria-label="Open Technical Assistant"
        >
          <div className="flex items-center space-x-3">
             <span className="font-black uppercase tracking-widest text-xs italic group-hover:text-white text-cyan-400">System Link</span>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
             </svg>
          </div>
        </button>
      )}
    </div>
  );
};
