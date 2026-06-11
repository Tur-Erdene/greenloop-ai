'use client';

import React, { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'CO₂ Тооцоолуур', href: '#calculator' },
    { label: 'Боломжууд', href: '#features' },
    { label: 'AI Зөвлөх', href: '/ai-advisor' },
    { label: 'Гарын авлага', href: '/recycling-guide' },
    { label: 'Процесс', href: '#how-it-works' },
    { label: 'Газрын зураг', href: '#map' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Мод тарих', href: '#tree-fund' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-dark">GreenLoop AI</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/register"
              className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Бүртгүүлэх
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
