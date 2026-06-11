'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { User, Award, Leaf, Recycle, TreePine, TrendingUp, MapPin, Navigation } from 'lucide-react';

const Chart = dynamic(() => import('react-chartjs-2').then((mod) => {
  const { Chart: ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } = require('chart.js');
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
  return mod.Line;
}), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
});

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Ерөнхий', icon: User },
    { id: 'submissions', label: 'Миний хог', icon: Recycle },
    { id: 'trees', label: 'Мод тарих', icon: TreePine },
    { id: 'badges', label: 'Badge', icon: Award },
  ];

  const stats = [
    { label: 'Нийт өгсөн хог', value: '245 кг', icon: Recycle, color: 'bg-blue-100 text-blue-600' },
    { label: 'CO₂ хэмнэлт', value: '712 кг', icon: Leaf, color: 'bg-green-100 text-green-600' },
    { label: 'Мод тарих', value: '12 мод', icon: TreePine, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Эко оноо', value: '1,450', icon: TrendingUp, color: 'bg-amber-100 text-amber-600' },
  ];

  const submissions = [
    { id: 1, material: 'PET', weight: 5, co2: 17.5, status: 'processed', date: '2025-06-01' },
    { id: 2, material: 'HDPE', weight: 3, co2: 8.4, status: 'delivered', date: '2025-06-05' },
    { id: 3, material: 'Цаас', weight: 10, co2: 12, status: 'collecting', date: '2025-06-08' },
  ];

  const badges = [
    { name: 'First Drop', icon: '🎯', description: 'Анхны дахин боловсруулалт', earned: true },
    { name: 'Plastic Saver', icon: '🥤', description: '10+ пластик бүртгүүлсэн', earned: true },
    { name: 'Tree Saver', icon: '🌳', description: '100 кг CO₂ хэмнэсэн', earned: true },
    { name: 'Climate Protector', icon: '🌍', description: '500 кг CO₂ хэмнэсэн', earned: false },
  ];

  const chartData = {
    labels: ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар'],
    datasets: [
      {
        label: 'CO₂ хэмнэлт (кг)',
        data: [120, 190, 300, 450, 580, 712],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'CO₂ хэмнэлтийн график',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-bold">Б.Батэрдэнэ</h1>
              <p className="text-gray-500">Eco Contributor • Level 3</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-primary-light text-primary-dark rounded-full text-sm font-medium">
                  Sustainability Score: 720
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CO2 Chart */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">CO₂ Хэмнэлтийн Аналитик</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>+12% энэ сард</span>
            </div>
          </div>
          <div className="h-80">
            <Chart data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Эко түвшний хөгжил</h2>
              <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-dark rounded-full" style={{ width: '60%' }} />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Eco Newbie (0)</span>
                <span>Eco Legend (1000+)</span>
              </div>
              <p className="text-gray-500">Дахиад 288 кг CO₂ хэмнэвэл Eco Advocate түвшинд хүрнэ.</p>
              
              {/* 5-Stage Tracking Summary */}
              <div className="mt-8">
                <h3 className="font-bold mb-4">Сүүлийн 5 Ye Шатны Tracking</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Recycle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-semibold text-sm">PET - 5 кг</span>
                    </div>
                    <div className="text-xs text-green-600 font-medium">✓ Борлуулалтад гарсан</div>
                    <div className="text-xs text-gray-400 mt-1">2025-06-01</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Recycle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-sm">HDPE - 3 кг</span>
                    </div>
                    <div className="text-xs text-blue-600 font-medium">→ Бүтээгдэхүүн боловсруулж байна</div>
                    <div className="text-xs text-gray-400 mt-1">2025-06-05</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Recycle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <span className="font-semibold text-sm">Цаас - 10 кг</span>
                    </div>
                    <div className="text-xs text-yellow-600 font-medium">→ Төвд хүргэгдэж байна</div>
                    <div className="text-xs text-gray-400 mt-1">2025-06-08</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Миний хог бүртгэл</h2>
              {submissions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                      {sub.material[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{sub.material}</div>
                      <div className="text-sm text-gray-500">{sub.weight} кг • {sub.co2} кг CO₂</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      sub.status === 'processed' ? 'bg-green-100 text-green-600' :
                      sub.status === 'delivered' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {sub.status}
                    </span>
                    <span className="text-sm text-gray-400">{sub.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trees' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Мод тарих бүртгэл</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Нийт тарьсан мод</div>
                  <div className="text-3xl font-bold text-primary">12</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">CO₂ шингээлт (3 жил)</div>
                  <div className="text-3xl font-bold text-primary">792 кг</div>
                </div>
              </div>
              <div className="p-4 bg-primary-light/30 rounded-xl">
                <div className="font-semibold text-primary-dark mb-2">GPS Байршил:</div>
                <div className="text-sm text-gray-600">47.9187°N, 106.9176°E</div>
                <div className="text-sm text-gray-500">Монголын ойн нөхөн сэргээлт</div>
                <div className="mt-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary">Google Maps дээр харах</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl text-center ${
                    badge.earned ? 'bg-primary-light/30 border-2 border-primary' : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-3">{badge.icon}</div>
                  <div className="font-bold text-sm">{badge.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{badge.description}</div>
                  {badge.earned && (
                    <div className="mt-2 text-xs font-medium text-primary">✓ Эзэмшсэн</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
