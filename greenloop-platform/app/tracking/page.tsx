'use client';

import React, { useState } from 'react';
import { Package, Truck, Factory, Store, CheckCircle } from 'lucide-react';

const stages = [
  { id: 'requested', label: 'АВАЛТ', icon: Package, description: 'Та хог бүртгүүлсэн' },
  { id: 'driver_assigned', label: 'ТЭЗВЭЭР', icon: Truck, description: 'Жолооч очиж байна' },
  { id: 'collecting', label: 'БОЛОВСРУУЛАГТ', icon: Factory, description: 'Төвд хүргэгдэж байна' },
  { id: 'delivered', label: 'БҮТЭЭГДЭХҮҮН', icon: Store, description: 'Боловсруулж байна' },
  { id: 'processed', label: 'БОРЛУУЛАГТ', icon: CheckCircle, description: 'Борлуулалтад гарсан' },
];

export default function PickupTracking() {
  const [currentStage, setCurrentStage] = useState(2); // 0-indexed
  const [trackingCode, setTrackingCode] = useState('GL-240609-001');

  const trackingInfo = {
    code: 'GL-240609-001',
    material: 'PET',
    weight: '5 кг',
    driver: 'А.Болд',
    driverPhone: '9911-2233',
    pickupTime: '2025-06-09 14:00',
    center: 'УБ Хог Хаягдлын Дахин Боловсруулах',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h1 className="text-2xl font-bold mb-2">5 Ye Шатны Tracking</h1>
          <p className="text-gray-500">Хог хаягдлын бүрэн ажлын процесс</p>
        </div>

        {/* Tracking Input */}
        <div className="bg-white rounded-2xl p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Tracking код оруулах"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all">
              Хайх
            </button>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-2xl p-8 mb-8">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4 relative">
              {stages.map((stage, index) => {
                const isActive = index <= currentStage;
                const isCurrent = index === currentStage;

                return (
                  <div key={stage.id} className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 transition-all ${
                        isCurrent
                          ? 'bg-primary text-white shadow-lg scale-110'
                          : isActive
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <stage.icon className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-sm">{stage.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{stage.description}</div>
                    {isCurrent && (
                      <div className="mt-2 text-xs font-medium text-primary">→ Одоогийн</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold mb-4">Хогийн мэдээлэл</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tracking код:</span>
                <span className="font-medium">{trackingInfo.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Материал:</span>
                <span className="font-medium">{trackingInfo.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Жин:</span>
                <span className="font-medium">{trackingInfo.weight}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h3 className="font-bold mb-4">Жолоочийн мэдээлэл</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Нэр:</span>
                <span className="font-medium">{trackingInfo.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Утас:</span>
                <span className="font-medium">{trackingInfo.driverPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Цаг:</span>
                <span className="font-medium">{trackingInfo.pickupTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="mt-8 bg-white rounded-2xl p-6">
          <h3 className="font-bold mb-4">SMS мэдэгдэл</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm">✓</div>
              <div className="text-sm">Амжилттай бүртгэгдлээ. Жолооч очиж байна.</div>
              <div className="text-xs text-gray-400 ml-auto">14:00</div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">🚛</div>
              <div className="text-sm">Жолооч ирлээ. Цуглуулалт эхэллээ.</div>
              <div className="text-xs text-gray-400 ml-auto">14:30</div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl opacity-50">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm">⏳</div>
              <div className="text-sm">Төвд хүргэгдлээ. Боловсруулж байна.</div>
              <div className="text-xs text-gray-400 ml-auto">...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
