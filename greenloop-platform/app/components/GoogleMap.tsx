'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { MapPin, Navigation, X, Truck } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 47.919,
  lng: 106.917,
};

interface RecyclingCenter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  materials: string[];
  operating_hours: string;
}

export default function RecyclingMap() {
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<RecyclingCenter | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Demo centers
  useEffect(() => {
    const demoCenters: RecyclingCenter[] = [
      {
        id: '1',
        name: 'УБ Хог Хаягдлын Дахин Боловсруулах',
        lat: 47.919,
        lng: 106.917,
        address: 'Улаанбаатар, Баянзүрх дүүрэг',
        phone: '7510-1234',
        materials: ['PET', 'HDPE', 'Цаас'],
        operating_hours: '09:00-18:00',
      },
      {
        id: '2',
        name: 'Монголын Хог Хаягдлын Төв',
        lat: 47.886,
        lng: 106.905,
        address: 'Улаанбаатар, Сүхбаатар дүүрэг',
        phone: '7510-5678',
        materials: ['Хөнгөн цагаан', 'Шил'],
        operating_hours: '09:00-18:00',
      },
      {
        id: '3',
        name: 'Мүпликс Байгаль',
        lat: 47.903,
        lng: 106.928,
        address: 'Улаанбаатар, Хан-Уул дүүрэг',
        phone: '7510-9999',
        materials: ['PET', 'Цаас', 'Шил'],
        operating_hours: '08:00-20:00',
      },
    ];

    setCenters(demoCenters);
    setLoading(false);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(defaultCenter);
        }
      );
    } else {
      setUserLocation(defaultCenter);
    }
  }, []);

  // Calculate distance between two points
  const getDistance = useCallback((p1: { lat: number; lng: number }, p2: { lat: number; lng: number }) => {
    const R = 6371;
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }, []);

  // Calculate route (mock - Google Maps API key required)
  const calculateRoute = useCallback((destination: RecyclingCenter) => {
    if (!userLocation) return;
    console.log('Route to:', destination.name, 'from', userLocation);
  }, [userLocation]);

  // Find nearest center
  const findNearestCenter = useCallback(() => {
    if (!userLocation || centers.length === 0) return;

    let nearest: RecyclingCenter = centers[0];
    let minDistance = Infinity;

    centers.forEach((center) => {
      const distance = getDistance(userLocation, { lat: center.lat, lng: center.lng });
      if (distance < minDistance) {
        minDistance = distance;
        nearest = center;
      }
    });
    
    setSelectedCenter(nearest);
    calculateRoute(nearest);
  }, [userLocation, centers, getDistance, calculateRoute]);

  const clearRoute = () => {
    setDirections(null);
    setSelectedCenter(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-2xl">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Газрын зураг ачаалж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={findNearestCenter}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary-dark transition-all"
        >
          <Navigation className="w-4 h-4" />
          Хамгийн ойр төв хайх
        </button>
        <button
          onClick={clearRoute}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-all"
        >
          <X className="w-4 h-4" />
          Зургыг цэвэрлэх
        </button>
      </div>

      {/* Map Embed with Styling */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-white">
        <div className="relative w-full h-96 md:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d42788.098351814544!2d106.90868296242674!3d47.912081023691094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smn!4v1781169002952!5m2!1sen!2smn"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '1rem' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Улаанбаатар - Дахин боловсруулах төвүүд"
          />
        </div>
      </div>

      {/* Center List */}
      <div className="grid md:grid-cols-3 gap-4">
        {centers.map((center) => {
          const distance = userLocation
            ? getDistance(userLocation, { lat: center.lat, lng: center.lng }).toFixed(1)
            : null;

          return (
            <div
              key={center.id}
              onClick={() => {
                setSelectedCenter(center);
                calculateRoute(center);
              }}
              className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md ${
                selectedCenter?.id === center.id ? 'border-primary shadow-md' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{center.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{center.address}</p>
                  {distance && (
                    <p className="text-xs text-primary font-medium mt-1">{distance} км</p>
                  )}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {center.materials.map((m) => (
                      <span key={m} className="text-xs bg-primary-light text-primary-dark px-2 py-0.5 rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
