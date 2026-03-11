"use client";

import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Terminal } from 'lucide-react';

const PANEL = "bg-[#0F0F13]/95 backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]";
const PRIMARY_BTN = "bg-indigo-700 text-white rounded-xl font-black hover:translate-y-px transition-all shadow-[0_0_40px_rgba(79,70,229,0.18)]";

export default function SreAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Merhaba Emrah! Ben OnDemandSRE Asistanı. 🚀\n\nSistemlerinin sağlığını korumak ve altyapıdaki kör noktaları aydınlatmak için buradayım.\n\n**Hemen şunları sorabilirsin:**\n- "K3s loglarını analiz et"\n- "Neden CPU kullanımı yüksek?"\n- "Postgres bağlantılarını kontrol et"`
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Otomatik aşağı kaydır
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      // Senin Ingress IP/Domain adresin buraya gelecek
      const response = await fetch('http://<YOUR_INGRESS_IP>/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.result }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ Gateway'e bağlanılamadı. Lütfen Ingress ayarlarını kontrol et." }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`absolute bottom-20 right-0 w-[380px] h-[500px] flex flex-col ${PANEL}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/[0.05] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">SRE Copilot v1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white"><X size={18} /></button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.role === 'user'
                    ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-100'
                    : 'bg-white/[0.03] border border-white/[0.05] text-slate-300'
                  }`}>
                    {msg.content.split('\n').map((line, j) => <p key={j} className="mb-1">{line}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/[0.05] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Sisteme sor..."
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50"
              />
              <button onClick={handleSend} className={`p-2 ${PRIMARY_BTN}`}><Send size={16} /></button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 flex items-center justify-center shadow-2xl ${PRIMARY_BTN}`}
      >
        {isOpen ? <Terminal size={24} /> : <Bot size={24} />}
      </m.button>
    </div>
  );
}
