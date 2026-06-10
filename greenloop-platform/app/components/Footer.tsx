import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">GreenLoop AI</span>
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              Монголын дахин боловсруулах системийг AI-driven, хэрэглэгч төвтэй, CO₂ impact-aware экосистем болгох.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Боломжууд</h4>
            <div className="space-y-2 text-sm text-white/60">
              <a href="#calculator" className="block hover:text-white transition-colors">CO₂ Тооцоолуур</a>
              <a href="#map" className="block hover:text-white transition-colors">Pickup Tracking</a>
              <a href="#leaderboard" className="block hover:text-white transition-colors">Eco Rewards</a>
              <a href="#tree-fund" className="block hover:text-white transition-colors">Tree Funding</a>
              <a href="#" className="block hover:text-white transition-colors">ESG Dashboard</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компани</h4>
            <div className="space-y-2 text-sm text-white/60">
              <a href="#" className="block hover:text-white transition-colors">Бидний тухай</a>
              <a href="#" className="block hover:text-white transition-colors">Холбоо барих</a>
              <a href="#" className="block hover:text-white transition-colors">Тусламж</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>© 2025 GreenLoop AI. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
}
