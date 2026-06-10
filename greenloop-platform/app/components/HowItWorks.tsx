'use client';

import React, { useEffect, useRef } from 'react';
import { Camera, MapPin, Package, Globe } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Camera,
    title: 'Материал бүртгүүл',
    description: 'Дахин боловсруулах материалаа зурагтаа бүртгүүл.',
  },
  {
    number: 2,
    icon: MapPin,
    title: 'Pickup хүсэлт',
    description: 'Газрын зураг дээр хог цэвэрлүүлэх хүсэлт илгээ.',
  },
  {
    number: 3,
    icon: Package,
    title: 'Цуглуулалт',
    description: 'Жолооч ирж хогийг тань авч явна.',
  },
  {
    number: 4,
    icon: Globe,
    title: 'Нөлөө харах',
    description: 'CO₂ хэмнэлт, эко оноо, badge — бүгдийг харах.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.step-card');
    cards?.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
            Процесс
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Хэрхэн ажилладаг
          </h2>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card text-center opacity-0 translate-y-4 transition-all duration-700"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto relative z-10">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold z-20">
                  {step.number}
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* 5-Stage Tracking */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">5 Ye Шатны Tracking</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['АВАЛТ', 'ТЭЗВЭЭР', 'БОЛОВСРУУЛАГТ', 'БҮТЭЭГДЭХҮҮН', 'БОРЛУУЛАГТ'].map(
              (stage, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary-light px-6 py-3 rounded-full"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-semibold text-dark">{stage}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
