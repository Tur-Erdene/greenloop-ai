'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CO2Calculator from './components/CO2Calculator';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Leaderboard from './components/Leaderboard';
import TreeFund from './components/TreeFund';
import PaymentForm from './components/PaymentForm';
import Impact from './components/Impact';
import Footer from './components/Footer';

const GoogleMap = dynamic(() => import('./components/GoogleMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-50 rounded-2xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Газрын зураг ачаалж байна...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>GreenLoop AI — Дахин боловсруулалтын ирээдүй</title>
        <meta name="description" content="Монголын анхны AI-driven дахин боловсруулалтын систем" />
      </Head>

      <Navbar />

      <main>
        <Hero />

        <CO2Calculator />

        <Features />

        <HowItWorks />

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
            <GoogleMap />
          </div>
        </section>

        <Leaderboard />

        <TreeFund />

        <section id="payment" className="py-24 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
                Төлбөр
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Хандив өгөх
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                QPay, SocialPay, MonPay-ээр шууд төлөх
              </p>
            </div>
            <PaymentForm type="tree" />
          </div>
        </section>

        <Impact />

        <section id="start" className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Тогтвортой ирээдүйг хамтдаа бүтээе</h2>
            <p className="text-white/90 mb-8 max-w-lg mx-auto">
              GreenLoop AI-д нэгдэж, өөрийн экологийн нөлөөг хэмжиж, урамшуулал аваарай.
            </p>
            <button className="bg-white text-primary-dark px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all hover:-translate-y-1">
              Бүртгүүлэх
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
