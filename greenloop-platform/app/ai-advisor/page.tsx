'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  Bot,
  User,
  ArrowLeft,
  Leaf,
  Loader2,
  Sparkles,
  Trash2,
  Lightbulb,
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const SUGGESTIONS = [
  'PET хуванцар ямар CO₂ хэмнэлттэй вэ?',
  'Дахин боловсруулалт хэрхэн хийх вэ?',
  'Eco оноог хэрхэн цуглуулах вэ?',
  'Хог хаягдлыг хэрхэн ангилах вэ?',
  'Ногоон платформ гэж юу вэ?',
];

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Сайн байна уу! 🌿\n\nБи GreenLoop AI-ийн экологийн зөвлөх. Дахин боловсруулалт, CO₂ хэмнэлт, тогтвортой хөгжилтэй холбоотой асуултад хариулахад бэлэн.\n\nЮу талаар мэдэхийг хүсэж байна?',
      id: 'welcome',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: content.trim(),
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .concat(userMsg)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Алдаа гарлаа');
      }

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: data.reply,
        id: (Date.now() + 1).toString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err?.message || 'Хариу авахад алдаа гарлаа. Дахин оролдоно уу.');
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Сайн байна уу! 🌿\n\nБи GreenLoop AI-ийн экологийн зөвлөх. Дахин боловсруулалт, CO₂ хэмнэлт, тогтвортой хөгжилтэй холбоотой асуултад хариулахад бэлэн.\n\nЮу талаар мэдэхийг хүсэж байна?',
        id: 'welcome-' + Date.now(),
      },
    ]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Буцах</span>
            </Link>
            <div className="w-px h-6 bg-gray-200" />
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-dark text-sm sm:text-base leading-tight">
                AI Зөвлөх
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                GreenLoop AI экологийн туслах
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Чат цэвэрлэх"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Шинэчлэх</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white border border-gray-100 shadow-sm rounded-bl-md'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md px-5 py-3.5">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Хариу бичиж байна...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm max-w-lg text-center">
                {error}
                <br />
                <span className="text-xs text-red-400 mt-1">
                  OPENAI_API_KEY environment variable тохируулсан эсэхээ шалгана уу
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Suggestions (when few messages) */}
      {messages.length <= 2 && !loading && (
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Санал болгох асуултууд:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => sendMessage(suggestion)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 sticky bottom-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Асуултаа бичнэ үү... Жишээ: PET хуванцар ямар CO₂ хэмнэлттэй вэ?"
                className="w-full px-5 py-3.5 pr-12 rounded-2xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                disabled={loading}
              />
              {input.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-primary text-white px-5 py-3.5 rounded-2xl hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2 font-medium"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Илгээх</span>
            </button>
          </form>
          <p className="text-xs text-gray-300 text-center mt-2">
            AI зөвлөх нь тогтвортой хөгжлийн мэдлэг дээр тулгуурлана. Мэргэжлийн зөвлөгөөний оронд ашиглахгүй байна уу.
          </p>
        </div>
      </div>
    </div>
  );
}
