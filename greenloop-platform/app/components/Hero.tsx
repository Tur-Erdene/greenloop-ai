'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Wind, Users, TreePine } from 'lucide-react';

export default function Hero() {
  const [stats, setStats] = useState({ co2: 0, users: 0, trees: 0 });
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValue(0, 12847, 2000, (v) => setStats(s => ({ ...s, co2: v })));
          animateValue(0, 3420, 2000, (v) => setStats(s => ({ ...s, users: v })));
          animateValue(0, 856, 2000, (v) => setStats(s => ({ ...s, trees: v })));
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function animateValue(start: number, end: number, duration: number, callback: (value: number) => void) {
    const startTime = performance.now();
    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      callback(Math.floor(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-dark-light to-[#064e3b] pt-16">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-semibold mb-6">
            🌿 Монголын анхны AI-driven дахин боловсруулалтын систем
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Таны хог хаягдал
            <br />
            <span className="text-primary">экологийн нөлөө</span> болно
          </h1>

          <p className="text-lg text-white/70 mb-10 max-w-xl leading-relaxed">
            GreenLoop AI-тай хамт бүх дахин боловсруулалтыг хэмжигдэхүйц, хянагдахуйц, урамшуулалтай болгоё.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              CO₂ нөлөө тооцоолох
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Илүү ихийг мэдэх
            </a>
          </div>

          <div ref={statsRef} className="flex flex-wrap gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Wind className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.co2.toLocaleString()}</div>
                <div className="text-sm text-white/50">кг CO₂ хэмнэсэн</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.users.toLocaleString()}</div>
                <div className="text-sm text-white/50">Идэвхтэй хэрэглэгч</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <TreePine className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{stats.trees.toLocaleString()}</div>
                <div className="text-sm text-white/50">Тарьсан мод</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
