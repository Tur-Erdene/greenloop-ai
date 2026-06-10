'use client';

import React, { useState } from 'react';
import { Users, Recycle, Leaf, CreditCard, BarChart3, Settings } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Ерөнхий', icon: BarChart3 },
    { id: 'users', label: 'Хэрэглэгчид', icon: Users },
    { id: 'submissions', label: 'Бүртгэл', icon: Recycle },
    { id: 'payments', label: 'Төлбөр', icon: CreditCard },
    { id: 'settings', label: 'Тохиргоо', icon: Settings },
  ];

  const chartData = {
    labels: ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар'],
    datasets: [
      {
        label: 'CO₂ хэмнэлт (кг)',
        data: [1200, 1900, 2400, 3100, 4200, 5600],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
      },
      {
        label: 'Материал (кг)',
        data: [800, 1300, 1800, 2400, 3200, 4100],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  const stats = [
    { label: 'Нийт хэрэглэгч', value: '3,420', change: '+12%', icon: Users },
    { label: 'Бүртгүүлсэн хог', value: '24,560 кг', change: '+8%', icon: Recycle },
    { label: 'CO₂ хэмнэлт', value: '12,847 кг', change: '+15%', icon: Leaf },
    { label: 'Нийт орлого', value: '2.4M ₮', change: '+5%', icon: CreditCard },
  ];

  const users = [
    { id: 1, name: 'Б.Батэрдэнэ', phone: '9911-1111', co2: 1250, status: 'active' },
    { id: 2, name: 'Г.Сарантуяа', phone: '9911-2222', co2: 980, status: 'active' },
    { id: 3, name: 'Д.Ганболд', phone: '9911-3333', co2: 756, status: 'inactive' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">GreenLoop AI системийн удирдлага</p>
        </div>

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

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">CO₂ Хэмнэлтийн Trend</h2>
              <div className="h-80">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold mb-4">Материал төрлөөр</h3>
                <div className="space-y-3">
                  {['PET', 'HDPE', 'Цаас', 'Хөнгөн цагаан', 'Шил'].map((material) => (
                    <div key={material} className="flex items-center justify-between">
                      <span className="text-sm">{material}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.random() * 80 + 20}%` }} />
                        </div>
                        <span className="text-sm font-medium w-12 text-right">
                          {Math.floor(Math.random() * 5000)} кг
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold mb-4">5 Ye Шатны Төлөв</h3>
                <div className="space-y-3">
                  {['АВАЛТ', 'ТЭЗВЭЭР', 'БОЛОВСРУУЛАГТ', 'БҮТЭЭГДЭХҮҮН', 'БОРЛУУЛАГТ'].map(
                    (stage, index) => (
                      <div key={stage} className="flex items-center justify-between">
                        <span className="text-sm">{stage}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${100 - index * 15}%` }} />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {Math.floor(Math.random() * 500)}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Хэрэглэгчид</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Нэр</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Утас</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">CO₂</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Төлөв</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">{user.id}</td>
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-sm">{user.phone}</td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">{user.co2} кг</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
