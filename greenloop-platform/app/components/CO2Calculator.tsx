'use client';

import React, { useState } from 'react';
import { Calculator, Recycle, ChevronRight, Leaf, Zap, Droplets, TreePine, ArrowRight, Info, Truck } from 'lucide-react';
import { CO2_COEFFICIENTS } from '../../lib/db-schema';

type MaterialKey = keyof typeof CO2_COEFFICIENTS;

interface CalcResult {
  co2Saved: string;
  co2SavedNum: number;
  price: string;
  treesEquivalent: string;
  ecoPoints: number;
  materialName: string;
  energySaved: string;
  waterSaved: string;
  landfillSaved: string;
}

const MATERIAL_ICONS: Record<string, any> = {
  pet: Droplets,
  hdpe: Droplets,
  paper: Leaf,
  aluminum: Zap,
  glass: Recycle,
};

const MATERIAL_DESCRIPTIONS: Record<string, string> = {
  pet: 'Ундааны сав, шампунийн сав, гялгар уут. Хамгийн түгээмэл дахин боловсруулагддаг хуванцар.',
  hdpe: 'Тарагны сав, тэвш, хуванцар хоолны сав. Бат бөх, олон удаа дахин боловсруулагдана.',
  paper: 'Сонин, дэвтэр, картон хайрцаг. Мод тарихаас сэргийлнэ, энерги хэмнэнэ.',
  aluminum: 'Лааз, таглаа, фольга. Хамгийн үнэ цэнэтэй — 100% дахин ашиглагдана!',
  glass: 'Шар айрагны лонх, дарсны лонх, нөөшилсөн ногооны сав. Хязгааргүй дахин хэрэглэгдэнэ.',
};

const EQUIVALENTS = {
  carKm: 0.18, // kg CO2 per km
  phoneCharge: 0.008, // kg CO2 per charge
  shower: 6, // kg CO2 per 10-min shower
  bulbHours: 0.05, // kg CO2 per hour (60W incandescent)
};

export default function CO2Calculator() {
  const [material, setMaterial] = useState<MaterialKey>('pet');
  const [weight, setWeight] = useState(2);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const calculate = () => {
    const coeff = CO2_COEFFICIENTS[material];
    const co2SavedNum = coeff.co2_per_kg * weight;
    const co2Saved = co2SavedNum.toFixed(1);
    const price = (coeff.price * weight).toFixed(0);
    const treesEquivalent = (co2SavedNum / 22).toFixed(2);
    const ecoPoints = Math.floor(co2SavedNum * 2 + 5);
    
    // Approximate additional metrics
    const energySaved = (co2SavedNum * 1.5).toFixed(1); // kWh equivalent
    const waterSaved = (co2SavedNum * 50).toFixed(0); // liters
    const landfillSaved = (weight * 1.2).toFixed(1); // kg landfill space

    setResult({
      co2Saved,
      co2SavedNum,
      price,
      treesEquivalent,
      ecoPoints,
      materialName: coeff.name,
      energySaved,
      waterSaved,
      landfillSaved,
    });
    setShowDetails(true);
  };

  const materials = Object.entries(CO2_COEFFICIENTS) as [MaterialKey, { name: string; co2_per_kg: number; price: number }][];
  const selectedMaterial = CO2_COEFFICIENTS[material];
  const MaterialIcon = MATERIAL_ICONS[material] || Recycle;

  const getEquivalent = (co2: number) => {
    const carKm = (co2 / EQUIVALENTS.carKm).toFixed(0);
    const charges = (co2 / EQUIVALENTS.phoneCharge).toFixed(0);
    const showers = (co2 / EQUIVALENTS.shower).toFixed(1);
    const bulbHours = (co2 / EQUIVALENTS.bulbHours).toFixed(0);
    return { carKm, charges, showers, bulbHours };
  };

  return (
    <section id="calculator" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4 inline mr-2" />
            CO₂ Тооцоолуур
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Дахин боловсруулалтын нөлөөг тооцоол
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Хэдэн кг хог хаягдал дахин боловсруулснаар хэдэн кг CO₂ хэмнэж, хэдэн мод тарихтай тэнцүү болохыг хараарай
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Input */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark">Тооцоолуур</h3>
                <p className="text-sm text-gray-400">Материал сонгоод жин оруулна уу</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Material Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Материал төрөл
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {materials.map(([key, value]) => {
                    const Icon = MATERIAL_ICONS[key] || Recycle;
                    const isSelected = material === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setMaterial(key)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                          isSelected
                            ? 'bg-primary/5 border-primary text-primary-dark shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold">{value.name}</div>
                          <div className="text-xs text-gray-400">
                            {value.co2_per_kg} кг CO₂/кг
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Material Description */}
                <div className="mt-3 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    {MATERIAL_DESCRIPTIONS[material]}
                  </p>
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Жин (кг)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none text-lg font-bold text-center transition-all"
                    min="0.1"
                    step="0.1"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-gray-400 text-sm font-medium">кг</span>
                  </div>
                </div>
                
                {/* Quick weight buttons */}
                <div className="flex gap-2 mt-3">
                  {[0.5, 1, 2, 5, 10].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        weight === w
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {w} кг
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculate}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Recycle className="w-5 h-5" />
                Тооцоолох
              </button>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3">
            {!result ? (
              <div className="bg-gradient-to-br from-dark to-dark-light rounded-3xl p-8 text-white h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6">
                  <Recycle className="w-10 h-10 text-primary/50" />
                </div>
                <h3 className="text-xl font-bold mb-2">Тооцоолох хүлээж байна</h3>
                <p className="text-white/50 text-center max-w-xs">
                  Зүүн талаас материал сонгоод жин оруулаад, "Тооцоолох" товчийг дарна уу
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main CO2 Result - Hero Card */}
                <div className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                      <Leaf className="w-5 h-5" />
                      <span className="text-sm font-medium text-white/80">Таны экологийн нөлөө</span>
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-6xl md:text-7xl font-extrabold tracking-tight">
                        {result.co2Saved}
                      </span>
                      <span className="text-2xl font-bold text-white/80">кг</span>
                    </div>
                    <p className="text-white/70 text-lg mb-6">CO₂ хүлээн авалт хийгээгүй</p>
                    
                    {/* Impact Bar */}
                    <div className="bg-white/20 rounded-full h-4 mb-2 overflow-hidden">
                      <div 
                        className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min((result.co2SavedNum / 20) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-white/60">
                      {result.co2SavedNum < 5 ? 'Алхам эхэллээ! 🌱' : 
                       result.co2SavedNum < 15 ? 'Сайн байна! 👍' : 
                       result.co2SavedNum < 30 ? 'Гайхалтай! 🌿' : 'Эко баатар! 🏆'}
                    </p>
                  </div>
                </div>

                {/* Secondary Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TreePine className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-dark">{result.treesEquivalent}</div>
                    <div className="text-xs text-gray-500 mt-1">Мод тарихтай<br/>тэнцэх</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold text-dark">{result.ecoPoints}</div>
                    <div className="text-xs text-gray-500 mt-1">Эко оноо<br/>цуглуулсан</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-dark">{result.waterSaved}</div>
                    <div className="text-xs text-gray-500 mt-1">Литр ус<br/>хэмнэсэн</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-dark">{result.landfillSaved}</div>
                    <div className="text-xs text-gray-500 mt-1">кг хогийн цэг<br/>багассан</div>
                  </div>
                </div>

                {/* Equivalents - Real World Context */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-dark mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-gray-400" />
                    Энэ юутай тэнцэх вэ?
                  </h4>
                  {(() => {
                    const eq = getEquivalent(result.co2SavedNum);
                    return (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl mb-1">🚗</div>
                          <div className="font-bold text-dark">{eq.carKm} км</div>
                          <div className="text-xs text-gray-500">Машин явсан</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl mb-1">📱</div>
                          <div className="font-bold text-dark">{parseInt(eq.charges).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Утас цэнэглэсэн</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl mb-1">🚿</div>
                          <div className="font-bold text-dark">{eq.showers} удаа</div>
                          <div className="text-xs text-gray-500">Халуун душ</div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl mb-1">💡</div>
                          <div className="font-bold text-dark">{parseInt(eq.bulbHours).toLocaleString()} цаг</div>
                          <div className="text-xs text-gray-500">Чийдэн асаасан</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Price & CTA */}
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-amber-700 font-medium mb-1">Хүлээн авах дүн</div>
                      <div className="text-3xl font-bold text-amber-900">
                        {Math.abs(Number(result.price)).toLocaleString()}₮
                      </div>
                      <div className="text-sm text-amber-600 mt-1">
                        {result.materialName} — {weight} кг дахин боловсруулснаар
                      </div>
                    </div>
                    <a
                      href="#map"
                      className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                    >
                      Ойрын цэг хайх
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-bold text-dark mb-2">Яагаад CO₂ хэмнэлт чухал вэ?</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Дахин боловсруулалт нь шинээр түүхий эд олборлох, үйлдвэрлэхээс 70-90% бага CO₂ ялгаруулдаг. Таны жижиг алхам хүлэмжийн хийн хуримтлалыг багасгана.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-dark mb-2">Эко оноо яаж ажилладаг вэ?</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              1 кг CO₂ хэмнэлт = 2 эко оноо. Оноо цуглуулаад тэргүүлэгчдийн самбар дээр нэрээ гаргаж, урамшуулал аваарай.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Recycle className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-dark mb-2">Хаана өгөх вэ?</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Улаанбаатар хотод 200 гаруй дахивар цэг, 20 гаруй дахин боловсруулах үйлдвэр үйл ажиллагаа явуулж байна. Ойрын цэгээ хайж, хогоо өгөөрэй.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
