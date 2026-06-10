'use client';

import React from 'react';
import { Medal, Crown, Award } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Б.Батэрдэнэ', co2: 1250, material: 340, level: 'Eco Legend', avatar: '👨' },
  { rank: 2, name: 'Г.Сарантуяа', co2: 980, material: 275, level: 'Eco Hero', avatar: '👩' },
  { rank: 3, name: 'Д.Ганболд', co2: 756, material: 210, level: 'Eco Hero', avatar: '👨' },
  { rank: 4, name: 'М.Энхтуул', co2: 520, material: 180, level: 'Eco Advocate', avatar: '👩' },
  { rank: 5, name: 'Н.Амаржаргал', co2: 410, material: 145, level: 'Eco Advocate', avatar: '👩' },
];

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            Leaderboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Тэргүүлэгчид
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Хамгийн их CO₂ хэмнэсэн хэрэглэгчид
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`flex items-center gap-4 p-5 rounded-xl border transition-all hover:shadow-md ${
                user.rank <= 3
                  ? 'bg-gradient-to-r from-primary-light/30 to-white border-primary/20'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex-shrink-0">
                {user.rank === 1 ? (
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                ) : user.rank === 2 ? (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Medal className="w-5 h-5 text-white" />
                  </div>
                ) : user.rank === 3 ? (
                  <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {user.rank}
                  </div>
                )}
              </div>

              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
                {user.avatar}
              </div>

              <div className="flex-1">
                <div className="font-bold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.level}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-primary">{user.co2} кг</div>
                <div className="text-sm text-gray-500">CO₂ хэмнэсэн</div>
              </div>

              <div className="text-right hidden sm:block">
                <div className="font-bold">{user.material} кг</div>
                <div className="text-sm text-gray-500">Материал</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
