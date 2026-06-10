'use client';

import React from 'react';
import { CheckCircle, Leaf, Globe, Users } from 'lucide-react';

export default function Impact() {
  const impacts = [
    '100% ил тод CO₂ тооцоолол',
    'GPS-д суурилсан мод тарилт',
    'Байгууллагын ESG тайлан',
    'Хэрэглэгчийн урамшуулал',
  ];

  return (
    <section id="impact" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
              Нөлөө
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
              Бодит экологийн өөрчлөлт
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              GreenLoop AI нь хог хаягдлыг дахин боловсруулалт руу чиглүүлж, Монголын тогтвортой хөгжлийн зорилгод хувь нэмэр оруулж байна.
            </p>
            <div className="space-y-4">
              {impacts.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-dark font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 border-2 border-primary-light rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 border-2 border-dashed border-primary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-16 border-2 border-primary rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="w-10 h-10 text-primary" />
                </div>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg">
              <Globe className="w-6 h-6 text-primary mb-1" />
              <div className="text-2xl font-bold">0.0003%</div>
              <div className="text-xs text-gray-500">Улсын CO₂ бууруулалт</div>
            </div>

            <div className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg">
              <Users className="w-6 h-6 text-primary mb-1" />
              <div className="text-2xl font-bold">3,420</div>
              <div className="text-xs text-gray-500">Идэвхтэй хэрэглэгч</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
