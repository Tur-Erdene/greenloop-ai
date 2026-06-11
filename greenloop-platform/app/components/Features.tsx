'use client';

import React from 'react';
import { Wind, Truck, Trophy, TreePine, BarChart3, Bot } from 'lucide-react';

const features = [
  {
    icon: Wind,
    title: 'CO₂ Тооцоолуур',
    description: 'PET, HDPE, aluminum, paper, glass материал бүрээс хэдэн кг CO₂ хэмнэснийг харуул.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Truck,
    title: 'Pickup Tracking',
    description: 'Google Maps дээр хог цэвэрлүүлэх хүсэлтээ илгээж, жолоочийн байршлыг хяна.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Trophy,
    title: 'Eco Rewards',
    description: 'Эко оноо, badge, leaderboard — тоглоомжуулалтаар урамшуул.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: TreePine,
    title: 'Tree Funding',
    description: 'Хандивыг мод тарих болгон хөрвүүлж, GPS бүртгэл хөтөл.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'ESG Dashboard',
    description: 'Байгууллагын тогтвортой хөгжлийн тайлан, ESG аналитик.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: Bot,
    title: 'AI Зөвлөх',
    description: 'AI ашиглан хэрэглэгчдэд тогтвортой хувийн зөвлөгөө өг.',
    color: 'bg-purple-100 text-purple-600',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            Боломжууд
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Ногоон платформ ба боломж
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Дахин боловсруулалтын бүтэн экосистемийг нэг дор хяна.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
