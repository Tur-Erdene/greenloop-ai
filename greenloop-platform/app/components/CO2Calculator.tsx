'use client';

import React, { useState } from 'react';
import { Calculator, Recycle, ChevronRight } from 'lucide-react';
import { CO2_COEFFICIENTS } from '../../lib/db-schema';

type MaterialKey = keyof typeof CO2_COEFFICIENTS;

export default function CO2Calculator() {
  const [material, setMaterial] = useState<MaterialKey>('pet');
  const [weight, setWeight] = useState(2);
  const [result, setResult] = useState<{
    co2Saved: string;
    price: string;
    treesEquivalent: string;
    ecoPoints: number;
    materialName: string;
  } | null>(null);

  const calculate = () => {
    const coeff = CO2_COEFFICIENTS[material];
    const co2SavedNum = coeff.co2_per_kg * weight;
    const co2Saved = co2SavedNum.toFixed(1);
    const price = (coeff.price * weight).toFixed(0);
    const treesEquivalent = (co2SavedNum / 22).toFixed(2);
    const ecoPoints = Math.floor(co2SavedNum * 2 + 5);

    setResult({
      co2Saved,
      price,
      treesEquivalent,
      ecoPoints,
      materialName: coeff.name,
    });
  };

  return (
    <section id="calculator" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            CO₂ Тооцоолуур
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Дахин боловсруулалтын CO₂ тооцоолуур
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Материал төрөл, жингээ оруулаад хэдэн кг CO₂ хэмнэснээ хараарай
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Тооцоолуур</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Материал төрөл
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(CO2_COEFFICIENTS).map(([key, value]) => {
                  const materialKey = key as MaterialKey;
                  return (
                    <button
                      key={key}
                      onClick={() => setMaterial(materialKey)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        material === materialKey
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'
                      }`}
                    >
                      {value.name}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Жин (кг)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  min="0.1"
                  step="0.1"
                />
              </div>

              <button
                onClick={calculate}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg"
              >
                Тооцоолох
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-dark to-dark-light rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Үр дүн</h3>
            </div>

            {result ? (
              <div className="space-y-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {result.co2Saved} кг
                  </div>
                  <div className="text-white/70 text-sm">CO₂ хэмнэсэн</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">{result.ecoPoints}</div>
                    <div className="text-white/70 text-sm">Эко оноо</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-2xl font-bold">{result.treesEquivalent}</div>
                    <div className="text-white/70 text-sm">Модтой тэнцэх</div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-lg font-semibold">
                    {result.price}₮ үнэ цэнэтэй
                  </div>
                  <div className="text-white/70 text-sm">
                    {result.materialName} — {weight} кг дахин боловсруулснаар
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                  Захиалах
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-white/50">
                <Recycle className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Материал сонгон тооцоолох товчийг дарна уу</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
