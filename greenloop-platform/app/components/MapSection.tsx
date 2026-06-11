'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Recycle } from 'lucide-react';

const centers = [
  { id: 1, name: 'УБ Хог Хаягдлын Дахин Боловсруулах', lat: 47.919, lng: 106.917, materials: ['PET', 'HDPE', 'Цаас'] },
  { id: 2, name: 'Монголын Хог Хаягдлын Төв', lat: 47.886, lng: 106.905, materials: ['Хөнгөн цагаан', 'Шил'] },
  { id: 3, name: 'Мүпликс Байгаль', lat: 47.903, lng: 106.928, materials: ['PET', 'Цаас', 'Шил'] },
];

export default function MapSection() {
  const mapRef = useRef(null);
  const [selectedCenter, setSelectedCenter] = useState<{ id: number; name: string; lat: number; lng: number; materials: string[] } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation({ lat: 47.919, lng: 106.917 }) // Default Ulaanbaatar
      );
    }
  }, []);

  return (
    <section id="map" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            Газрын зураг
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Дахин боловсруулах төвүүд
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Хамгийн ойр төв хайж, хог хаягдлаа хүргэх
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Center List */}
          <div className="space-y-4">
            {centers.map((center) => (
              <div
                key={center.id}
                onClick={() => setSelectedCenter(center)}
                className={`bg-white rounded-xl p-5 border cursor-pointer transition-all hover:shadow-md ${
                  selectedCenter?.id === center.id ? 'border-primary shadow-md' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Recycle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{center.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {center.materials.map((m) => (
                        <span key={m} className="px-2 py-1 bg-primary-light text-primary-dark text-xs rounded-md">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all">
              <div className="flex items-center justify-center gap-2">
                <Navigation className="w-5 h-5" />
                Хамгийн ойр төв хайх
              </div>
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary-light/30 to-blue-50 relative flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Google Maps интеграц</p>
                <p className="text-gray-300 text-sm mt-1">
                  {userLocation
                    ? `Таны байршил: ${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)}`
                    : 'Байршил тодорхойлж байна...'}
                </p>
              </div>

              {/* Pins */}
              {centers.map((center, i) => (
                <div
                  key={center.id}
                  className="absolute"
                  style={{
                    top: `${30 + i * 15}%`,
                    left: `${20 + i * 20}%`,
                  }}
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {center.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
