'use client';

import React, { useState } from 'react';
import { TreePine, MapPin, Heart, Camera } from 'lucide-react';
import { TREE_FUND } from '../../lib/db-schema';

export default function TreeFund() {
  const [treeCount, setTreeCount] = useState(10);
  const totalCost = treeCount * TREE_FUND.cost_per_tree;
  const co2Absorption = treeCount * TREE_FUND.co2_absorption_per_year * TREE_FUND.absorption_years;

  return (
    <section id="tree-fund" className="py-24 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            Мод Тарих Систем
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Tree Fund
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Хандивыг мод тарих болгон хөрвүүлж, GPS бүртгэл хөтөл
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <TreePine className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Мод тарих</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Модны тоо
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTreeCount(Math.max(1, treeCount - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    -
                  </button>
                  <div className="text-2xl font-bold w-16 text-center">{treeCount}</div>
                  <button
                    onClick={() => setTreeCount(treeCount + 1)}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Нийт өртөг</span>
                  <span className="font-bold">{totalCost.toLocaleString()}₮</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CO₂ шингээлт (3 жил)</span>
                  <span className="font-bold text-primary">{co2Absorption} кг</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">1 модны үнэ</span>
                  <span className="font-bold">{TREE_FUND.cost_per_tree}₮</span>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Хандив өгөх
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">GPS Бүртгэл</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-500 mb-2">Тарих талбай</div>
                <div className="font-semibold">Монголын ойн нөхөн сэргээлт</div>
                <div className="text-sm text-gray-500 mt-1">
                  "Миллион мод" үндэсний хөтөлбөр
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-300" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">
                Жил бүр фото, CO₂ тайлан илгээнэ
              </p>
            </div>

            <div className="mt-6 p-4 bg-primary-light/30 rounded-xl">
              <div className="text-sm text-primary-dark font-semibold mb-2">
                Мод тарих түншүүд:
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Монголын ойн нөхөн сэргээлт</li>
                <li>• "Миллион мод" үндэсний хөтөлбөр</li>
                <li>• Дэлхийн банкны ойжуулалтын сан</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
