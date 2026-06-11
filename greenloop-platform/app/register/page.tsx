'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Leaf, Eye, EyeOff, Phone, Lock, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function RegisterPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 8 && /^[0-9]+$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim()) {
      setError('Нэрээ оруулна уу');
      return;
    }

    if (!validatePhone(phone)) {
      setError('Утасны дугаар зөв оруулна уу (8 оронтой)');
      return;
    }

    if (password.length < 6) {
      setError('Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой');
      return;
    }

    setLoading(true);

    try {
      const cleanedPhone = phone.replace(/\D/g, '');
      const email = `${cleanedPhone}@greenloop.mn`;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone: cleanedPhone,
            full_name: name.trim(),
            display_name: name.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message === 'User already registered' 
          ? 'Энэ утасны дугаар бүртгэлтэй байна' 
          : signUpError.message
        );
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase.from('users').insert({
          id: data.user.id,
          phone: cleanedPhone,
          name: name.trim(),
          display_name: name.trim(),
          eco_points: 0,
          total_co2_saved: 0,
          sustainability_score: 0,
          eco_level: 1,
          created_at: new Date().toISOString(),
        });

        if (profileError && !profileError.message.includes('duplicate')) {
          console.warn('Profile insert warning:', profileError);
        }
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Нүүр хуудас руу буцах
          </Link>
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark">Бүртгүүлэх</h1>
          <p className="text-gray-500 mt-2">
            GreenLoop AI-д нэгдэж, экологийн нөлөөгөө хэмжээрэй
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-dark mb-2">
              Амжилттай бүртгэгдлээ!
            </h2>
            <p className="text-gray-500 mb-6">
              Таны бүртгэл баталгаажлаа. Одоо нэвтэрч өөрийн дашборд руу орж болно.
            </p>
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all text-center"
              >
                Дашборд руу орох
              </Link>
              <Link
                href="/"
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all text-center"
              >
                Нүүр хуудас руу буцах
              </Link>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нэр
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Таны нэр"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Утасны дугаар
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="99887766"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Монгол утасны дугаар (8 оронтой)
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нууц үг
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Хамгийн багадаа 6 тэмдэгт"
                    className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Бүртгэж байна...
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    Бүртгүүлэх
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-400">эсвэл</span>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-500">
              Бүртгэл байгаа?{' '}
              <Link
                href="/dashboard"
                className="text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                Нэвтрэх
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
