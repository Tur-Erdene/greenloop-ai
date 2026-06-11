'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Recycle,
  Trash2,
  ChevronDown,
  ChevronUp,
  Leaf,
  AlertTriangle,
  Lightbulb,
  MapPin,
  Award,
  BookOpen,
  Home,
  ShoppingBag,
  Utensils,
  Shirt,
  Flame,
  Battery,
  Smartphone,
  Pill,
  Paintbrush,
  LightbulbIcon,
  Droplets,
  Wind,
  CheckCircle,
  XCircle,
  ArrowRight,
  Info,
  Truck,
  TreePine,
  Zap,
  Camera,
  Upload,
  Loader2,
  ImageIcon,
  ScanLine,
  Sparkles,
  X,
  RefreshCw,
} from 'lucide-react';

const quizQuestions = [
  {
    question: '«Гоё» жүүсний хоосон хуванцар савыг аль ангилалд хийх вэ?',
    options: ['Энгийн хог', 'Хуванцар', 'Цаас'],
    correct: 1,
  },
  {
    question: 'Чипсний гялгар уутыг дахин боловсруулж болох уу?',
    options: ['Болно, хуванцарт хийнэ', 'Болохгүй, энгийн хогт хийнэ'],
    correct: 1,
  },
  {
    question: '«Сүү ХК»-ийн тетра пак савыг хаашаа хийх нь зөв бэ?',
    options: ['Цаасанд', 'Хуванцарт', 'Тусгай цуглуулах цэгт өгөх нь хамгийн зөв'],
    correct: 2,
  },
  {
    question: 'Тослог пиццаны хайрцгийг цаасны ангилалд хийж болох уу?',
    options: ['Болно', 'Болохгүй, тос нь дахин боловсруулалтыг муутгадаг'],
    correct: 1,
  },
  {
    question: 'Хуучин зай, батерейг хаана хаях вэ?',
    options: ['Энгийн хогт', 'Тусгай цуглуулах хайрцагт'],
    correct: 1,
  },
  {
    question: '«Боргио»-гийн шилэн лонхыг хаяхаасаа өмнө юу хийх вэ?',
    options: ['Шууд хаяна', 'Хоослон зайлж, металл таглааг салгана'],
    correct: 1,
  },
  {
    question: 'Дэлгүүрийн термо чек (баримт) аль ангилалд орох вэ?',
    options: ['Цаас', 'Энгийн хог'],
    correct: 1,
  },
  {
    question: 'Бууз, хуушуурын үлдэгдлийг юу хийж болох вэ?',
    options: ['Компост (бордоо)', 'Хуванцартай хамт хаяна'],
    correct: 0,
  },
  {
    question: 'Хөнгөн цагаан лааз хэдэн хувь дахин ашиглагдах боломжтой вэ?',
    options: ['50%', '100%'],
    correct: 1,
  },
  {
    question: 'Хамгийн сайн хог гэж юу вэ?',
    options: ['Сайн ангилсан хог', 'Огт үүсээгүй хог'],
    correct: 1,
  },
];

const sections = [
  { id: 'plastic', title: 'Хуванцар', icon: Recycle, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'paper', title: 'Цаас, картон', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
  { id: 'glass', title: 'Шил', icon: Droplets, color: 'bg-green-100 text-green-600' },
  { id: 'metal', title: 'Металл', icon: Zap, color: 'bg-gray-100 text-gray-600' },
  { id: 'organic', title: 'Органик', icon: Leaf, color: 'bg-emerald-100 text-emerald-600' },
  { id: 'hazardous', title: 'Аюултай', icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
  { id: 'general', title: 'Энгийн', icon: Trash2, color: 'bg-slate-100 text-slate-600' },
  { id: 'centers', title: 'Хаана өгөх', icon: MapPin, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'tips', title: 'Эко зөвлөгөө', icon: Lightbulb, color: 'bg-amber-100 text-amber-600' },
  { id: 'quiz', title: 'Сорил', icon: Award, color: 'bg-purple-100 text-purple-600' },
];

function Section({ id, title, icon: Icon, color, children, defaultOpen = true }: any) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div id={id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden scroll-mt-20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-dark">{title}</h2>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function ItemCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <p className="font-medium text-sm text-dark">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function Alert({ type, children }: { type: 'warning' | 'tip'; children: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-3 rounded-xl p-4 text-sm ${
      type === 'warning' ? 'bg-red-50 border border-red-100 text-red-700' : 'bg-green-50 border border-green-100 text-green-700'
    }`}>
      {type === 'warning' ? <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />}
      <div>{children}</div>
    </div>
  );
}

// AI Waste Scanner Component
function AIWasteScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Зөвхөн зураг файл оруулна уу (JPEG, PNG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Зургийн хэмжээ 5MB-с ихгүй байх ёстой');
      return;
    }

    setError('');
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/analyze-waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Алдаа гарлаа');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err?.message || 'Зураг танихад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const categoryColors: Record<string, string> = {
    plastic: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    paper: 'bg-blue-50 border-blue-200 text-blue-700',
    glass: 'bg-green-50 border-green-200 text-green-700',
    metal: 'bg-gray-50 border-gray-200 text-gray-700',
    organic: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    hazardous: 'bg-red-50 border-red-200 text-red-700',
    general: 'bg-slate-50 border-slate-200 text-slate-700',
    unknown: 'bg-gray-50 border-gray-200 text-gray-700',
  };

  const categoryNames: Record<string, string> = {
    plastic: 'Хуванцар',
    paper: 'Цаас',
    glass: 'Шил',
    metal: 'Металл',
    organic: 'Органик',
    hazardous: 'Аюултай',
    general: 'Энгийн',
    unknown: 'Тодорхойгүй',
  };

  const categoryIcons: Record<string, any> = {
    plastic: Recycle,
    paper: BookOpen,
    glass: Droplets,
    metal: Zap,
    organic: Leaf,
    hazardous: AlertTriangle,
    general: Trash2,
    unknown: Info,
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <ScanLine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-dark">AI Зураг Таньж Хог Ангилах</h2>
            <p className="text-sm text-gray-400">Зураг оруулаад AI хогийг автоматаар ангилна</p>
          </div>
        </div>

        {!image && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Зураг оруулах
            </p>
            <p className="text-xs text-gray-400">
              JPEG, PNG • Max 5MB
            </p>
          </div>
        )}

        {image && !result && (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={image}
                alt="Upload preview"
                className="w-full max-h-64 object-contain bg-gray-50 rounded-xl"
              />
              <button
                onClick={reset}
                className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <button
              onClick={analyzeImage}
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-dark transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI хогийг таньж байна...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  AI Хог Ангилах
                </>
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border ${categoryColors[result.category] || categoryColors.unknown}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center">
                  {React.createElement(categoryIcons[result.category] || Trash2, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <div className="text-sm font-medium opacity-70">Ангилал</div>
                  <div className="text-xl font-bold">{categoryNames[result.category] || result.category}</div>
                </div>
              </div>
            </div>

            {result.description && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm font-medium text-gray-700 mb-1">Тайлбар</div>
                <div className="text-sm text-gray-600">{result.description}</div>
              </div>
            )}

            {result.preparation && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <div className="text-sm font-medium text-blue-700">Бэлдэх заавар</div>
                </div>
                <div className="text-sm text-blue-600">{result.preparation}</div>
              </div>
            )}

            {result.location && (
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <div className="text-sm font-medium text-green-700">Хаана өгөх</div>
                </div>
                <div className="text-sm text-green-600">{result.location}</div>
              </div>
            )}

            {result.impact && (
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-4 h-4 text-purple-500" />
                  <div className="text-sm font-medium text-purple-700">Эко нөлөө</div>
                </div>
                <div className="text-sm text-purple-600">{result.impact}</div>
              </div>
            )}

            {result.ecoPoints && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <div className="text-sm font-medium text-amber-700">Эко оноо</div>
                </div>
                <div className="text-2xl font-bold text-amber-600">+{result.ecoPoints}</div>
              </div>
            )}

            {result.warning && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <div className="text-sm font-medium text-red-700">Анхааруулга</div>
                </div>
                <div className="text-sm text-red-600">{result.warning}</div>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Өөр зураг оруулах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecyclingGuidePage() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === quizQuestions[currentQ].correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ + 1 < quizQuestions.length) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  const getRank = () => {
    if (score >= 9) return { label: '🏆 Та жинхэнэ эко иргэн!', color: 'text-green-600' };
    if (score >= 6) return { label: '👍 Сайн байна, бага зэрэг сайжруулъя!', color: 'text-amber-600' };
    return { label: '🌱 Гарын авлагаа дахин нэг уншаарай!', color: 'text-blue-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Буцах</span>
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Recycle className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-dark text-sm sm:text-base">Хог ангилах гарын авлага</h1>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <div className="sticky top-14 bg-white border-b border-gray-100 z-40 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-4 py-2 flex gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap bg-gray-50 hover:bg-primary/10 hover:text-primary transition-colors text-gray-600"
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* AI Photo Upload Section */}
        <AIWasteScanner />

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-8 text-white text-center">
          <Recycle className="w-10 h-10 mx-auto mb-3 opacity-90" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">♻️ Хог ангилах гарын авлага</h1>
          <p className="text-white/90 text-sm max-w-lg mx-auto leading-relaxed">
            Хогоо зөв ангилснаар бид дахин боловсруулах түүхий эдийг эргэлтэд оруулж, хогийн цэгийн ачааллыг бууруулж, Улаанбаатар хотоо илүү цэвэр, ногоон болгоход хувь нэмрээ оруулна.
          </p>
        </div>

        {/* 1. Plastic */}
        <Section id="plastic" title="1. Хуванцар (Пластик)" icon={Recycle} color="bg-yellow-100 text-yellow-600">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <ItemCard icon={<Droplets className="w-4 h-4" />} title="Ундааны сав" desc="Кока-Кола, Пепси, Спрайт, Сэлэнгэ, Эко, Mojito" />
              <ItemCard icon={<Droplets className="w-4 h-4" />} title="Шампунийн сав" desc="Витафит, бусад биеийн арчилгаа" />
              <ItemCard icon={<ShoppingBag className="w-4 h-4" />} title="Гялгар уут" desc="Төвлөрсөн цэвэр уут (хоолны биш)" />
              <ItemCard icon={<Utensils className="w-4 h-4" />} title="Тэвш, тарагны сав" desc="Сүү ХК, Витафит тараг, хуванцар таглаа" />
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">📝 Хэрхэн бэлдэх:</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Савыг хоослон, усаар зайлна</li>
                <li>Шошго, таглааг боломжтой бол салгана</li>
                <li>Эзлэхүүнийг багасгахын тулд дарж хавтгайруулна</li>
              </ol>
            </div>
            <Alert type="warning">
              <strong>Хоол наалдсан бохир хуванцар</strong>, чипсний гялгар уут (Лэйс, Багодар г.м.) ихэвчлэн дахин боловсруулагддаггүй — энгийн хогт хийнэ.
            </Alert>
          </div>
        </Section>

        {/* 2. Paper */}
        <Section id="paper" title="2. Цаас, картон" icon={BookOpen} color="bg-blue-100 text-blue-600">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <ItemCard icon={<ShoppingBag className="w-4 h-4" />} title="Картон хайрцаг" desc="И-Март, Номин, Emart худалдан авалт" />
              <ItemCard icon={<BookOpen className="w-4 h-4" />} title="Сонин, дэвтэр" desc="Өдрийн сонин, Зууны мэдээ, хуучин ном" />
              <ItemCard icon={<ShoppingBag className="w-4 h-4" />} title="Цаасан уут" desc="Алтан Тариа, Хаан гурил (цэвэр бол)" />
              <ItemCard icon={<BookOpen className="w-4 h-4" />} title="Оффисын цаас" desc="A4 цаас, хуучин баримт бичиг" />
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">📝 Хэрхэн бэлдэх:</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Хайрцгийг задалж хавтгайруулна</li>
                <li>Скоч, тууз, тороох утсыг авна</li>
                <li>Хуурай, цэвэр байлгана</li>
              </ol>
            </div>
            <Alert type="warning">
              <strong>Тослог пиццаны хайрцаг</strong>, нойтон цаас, термо чек (дэлгүүрийн баримт) дахин боловсруулагддаггүй.
            </Alert>
            <Alert type="tip">
              <strong>Тетра пак</strong> (Сүү ХК, Тэсо сүү) = цаас + хуванцар + хөнгөн цагааны нийлмэл. Тусад нь цуглуулдаг цэгт өгөх нь зөв. Зайлж хатааж хадгалаарай.
            </Alert>
          </div>
        </Section>

        {/* 3. Glass */}
        <Section id="glass" title="3. Шил" icon={Droplets} color="bg-green-100 text-green-600">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <ItemCard icon={<Droplets className="w-4 h-4" />} title="Шар айрагны шил" desc="Боргио, Сэнгүр, Нийслэл, Алтан говь" />
              <ItemCard icon={<Droplets className="w-4 h-4" />} title="Архи, дарсны лонх" desc="Шилэн лонх бүх төрөл" />
              <ItemCard icon={<Droplets className="w-4 h-4" />} title="Нөөшилсөн ногоо" desc="Чанамал, майонезын шилэн сав" />
              <ItemCard icon={<Droplets className="w-4 h-4" />} title="Сүүний шил" desc="Сүү ХК-ийн шилэн савтай бүтээгдэхүүн" />
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">📝 Хэрхэн бэлдэх:</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Савыг хоослон, зайлна</li>
                <li>Металл таглааг салгаж металл ангилалд хийнэ</li>
                <li>Хагарсан шилийг тусад нь, гэмтэл учруулахааргүй боож хаяна</li>
              </ol>
            </div>
            <Alert type="tip">
              Зарим шилэн лонхыг (ялангуяа шар айрагны) хүлээн авах цэгт буцааж өгвөл <strong>мөнгөн урамшуулал</strong> олгодог!
            </Alert>
          </div>
        </Section>

        {/* 4. Metal */}
        <Section id="metal" title="4. Металл" icon={Zap} color="bg-gray-100 text-gray-600">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <ItemCard icon={<Zap className="w-4 h-4" />} title="Хөнгөн цагаан лааз" desc="Сэнгүр, Кока-Кола лааз" />
              <ItemCard icon={<Zap className="w-4 h-4" />} title="Төмөр лааз" desc="Загас, нөөшилсөн мах" />
              <ItemCard icon={<Zap className="w-4 h-4" />} title="Шар айрагны лааз" desc="Хөнгөн цагаан, төмөр лааз" />
              <ItemCard icon={<Zap className="w-4 h-4" />} title="Шилэн савны таглаа" desc="Металл таглаа, тугалган цаас" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">📝 Хэрхэн бэлдэх:</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Лаазыг хоослон зайлна</li>
                <li>Боломжтой бол дарж хавтгайруулна</li>
              </ol>
            </div>
            <Alert type="tip">
              Хөнгөн цагаан нь хамгийн үнэ цэнэтэй дахин боловсруулах материалын нэг — <strong>100% дахин ашиглагдана!</strong>
            </Alert>
          </div>
        </Section>

        {/* 5. Organic */}
        <Section id="organic" title="5. Органик хог (Хүнсний үлдэгдэл)" icon={Leaf} color="bg-emerald-100 text-emerald-600">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <ItemCard icon={<Utensils className="w-4 h-4" />} title="Хүнсний ногоо" desc="Төмс, лууван, байцааны хальс" />
              <ItemCard icon={<Utensils className="w-4 h-4" />} title="Жимсний үлдэгдэл" desc="Жимсний хальс, үр" />
              <ItemCard icon={<Utensils className="w-4 h-4" />} title="Цай, кофе" desc="Цайны шаар, кофены шаар, үлдэгдэл" />
              <ItemCard icon={<Utensils className="w-4 h-4" />} title="Бууз, хуушуур" desc="Бууз, хуушуурын үлдэгдэл, гурил" />
            </div>
            <Alert type="tip">
              Хашаа байшинтай бол <strong>компост (бордоо)</strong> хийж зуслангийн газартаа ашиглаж болно. Орон сууцанд тусдаа битүү саванд хийж, органик хогийн цэгт өгнө.
            </Alert>
          </div>
        </Section>

        {/* 6. Hazardous */}
        <Section id="hazardous" title="6. Аюултай хог — Тусгай цэгт" icon={AlertTriangle} color="bg-red-100 text-red-600">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <ItemCard icon={<Battery className="w-4 h-4" />} title="Зай, батерей" desc="АА, ААА зай, утасны хуучин батерей" />
              <ItemCard icon={<Smartphone className="w-4 h-4" />} title="Электроник" desc="Хуучин гар утас, цэнэглэгч" />
              <ItemCard icon={<LightbulbIcon className="w-4 h-4" />} title="Гэрлийн чийдэн" desc="Мөнгөн устай флюресцент чийдэн" />
              <ItemCard icon={<Pill className="w-4 h-4" />} title="Хугацаа дууссан эм" desc="Эмийн санд буцааж өгч болно" />
              <ItemCard icon={<Paintbrush className="w-4 h-4" />} title="Будаг, химийн бодис" desc="Хуучин будаг, органик уусгагч" />
            </div>
            <Alert type="warning">
              <strong>Хэзээ ч энгийн хогт бүү хая!</strong> Эдгээр нь хөрс, усыг хордуулдаг. Зарим их дэлгүүр, сургууль дээр зай хүлээн авах хайрцаг байдаг.
            </Alert>
          </div>
        </Section>

        {/* 7. General */}
        <Section id="general" title="7. Энгийн (ангилагдахгүй) хог" icon={Trash2} color="bg-slate-100 text-slate-600">
          <p className="text-sm text-gray-600 mb-3">Дээрх ангилалд орохгүй зүйлс:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <ItemCard icon={<XCircle className="w-4 h-4" />} title="Чипс, чихрийн гялгар боодол" desc="Дахин боловсруулагддаггүй" />
            <ItemCard icon={<XCircle className="w-4 h-4" />} title="Бохирдсон сальфетка" desc="Ариун цэврийн хэрэглэл" />
            <ItemCard icon={<XCircle className="w-4 h-4" />} title="Тослог, бохир цаас" desc="Дахин боловсруулалтанд орохгүй" />
            <ItemCard icon={<XCircle className="w-4 h-4" />} title="Тамхины иш" desc="Энгийн хогт хийх" />
          </div>
        </Section>

        {/* Where to dispose */}
        <Section id="centers" title="📍 Хаана өгөх вэ? — Улаанбаатар" icon={MapPin} color="bg-indigo-100 text-indigo-600">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 text-left">
                    <th className="p-3 rounded-tl-xl font-semibold">Нэр / Төрөл</th>
                    <th className="p-3 font-semibold">Хүлээн авах материал</th>
                    <th className="p-3 rounded-tr-xl font-semibold">Байршил</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="p-3 font-medium">Морингийн давааны хог дахин боловсруулах үйлдвэр</td><td className="p-3 text-gray-600">Барилгын хог, төвлөрсөн ландфилл</td><td className="p-3 text-gray-600">Морин даваа орчим</td></tr>
                  <tr><td className="p-3 font-medium">TML хуванцар дахин боловсруулах үйлдвэр</td><td className="p-3 text-gray-600">PET болон бусад хуванцар (дуудлагаар авдаг)</td><td className="p-3 text-gray-600">Улаанбаатар</td></tr>
                  <tr><td className="p-3 font-medium">Төвшин Сайхан төв</td><td className="p-3 text-gray-600">Шил, зэс, гууль, хөнгөн цагаан, төмөр, аккумлятор, хуванцар, гялгар уут</td><td className="p-3 text-gray-600">Улаанбаатар</td></tr>
                  <tr><td className="p-3 font-medium">Хороо орчмын дахивар цэгүүд</td><td className="p-3 text-gray-600">Хуванцар, цаас, картон, лааз</td><td className="p-3 text-gray-600">Дүүрэг бүрд</td></tr>
                  <tr><td className="p-3 font-medium">Эргүүлийн худалдан авагч</td><td className="p-3 text-gray-600">Лонх, лааз, цаас, төмөр (мөнгөөр авдаг)</td><td className="p-3 text-gray-600">Хороолол дундуур</td></tr>
                  <tr><td className="p-3 font-medium">Хуучин хувцас хүлээн авах цэг</td><td className="p-3 text-gray-600">Хувцас, гутал</td><td className="p-3 text-gray-600">Хан-Уул дүүрэг, Зайсангийн зам</td></tr>
                  <tr><td className="p-3 font-medium">Эмийн сангууд</td><td className="p-3 text-gray-600">Хугацаа дууссан эм</td><td className="p-3 text-gray-600">Зарим томоохон эмийн сан</td></tr>
                  <tr><td className="p-3 font-medium">Их дэлгүүр, сургуулийн хайрцаг</td><td className="p-3 text-gray-600">Зай, батерей</td><td className="p-3 text-gray-600">Худалдааны төв, сургууль</td></tr>
                </tbody>
              </table>
            </div>
            <Alert type="tip">
              <strong>Нийслэлийн байгаль орчны газар</strong> дахивар хүлээн авах цэг, дахин боловсруулах үйлдвэрүүдийн байршлыг ArcGIS газрын зургийн санд байршуулсан байдаг. Мөн дүүргийнхээ хорооноос хамгийн ойрын цэгийг лавлаж болно.
            </Alert>
            <div className="bg-indigo-50 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3">Товчлох:</h3>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded-lg p-3 border border-indigo-100">
                  <p className="font-medium text-indigo-900">Хуванцар, цаас, металл</p>
                  <p className="text-gray-600 mt-1">Хороо орчмын дахивар хүлээн авах цэг, эргүүлийн худалдан авагч</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-indigo-100">
                  <p className="font-medium text-indigo-900">Шилэн лонх</p>
                  <p className="text-gray-600 mt-1">Хүлээн авах цэг (зарим нь урамшуулалтай)</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-indigo-100">
                  <p className="font-medium text-indigo-900">Зай, электроник</p>
                  <p className="text-gray-600 mt-1">Их дэлгүүр, сургуулийн цуглуулах хайрцаг</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-indigo-100">
                  <p className="font-medium text-indigo-900">Хуучин хувцас</p>
                  <p className="text-gray-600 mt-1">Хандивын төв, сүм хийд, буяны байгууллага</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Eco Tips */}
        <Section id="tips" title="💚 Эко зөвлөгөө — Монгол ахуйд тохирсон" icon={Lightbulb} color="bg-amber-100 text-amber-600">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-dark mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                Гэрийн хэрэглээнд
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <ItemCard icon={<ShoppingBag className="w-4 h-4" />} title="Даавуун уут" desc="Дэлгүүрт явахдаа даавуун уут авч яваарай — нэг уут олон зуун гялгар уутыг орлоно" />
                <ItemCard icon={<Utensils className="w-4 h-4" />} title="Өөрийн сав" desc="Кофе, цай авахдаа өөрийн савтай очвол зарим кафе хөнгөлөлт үзүүлдэг" />
                <ItemCard icon={<Droplets className="w-4 h-4" />} title="Олон удаагийн термос" desc="Нэг удаагийн усны сав авахын оронд олон удаагийн хээтэй сав хэрэглээрэй" />
                <ItemCard icon={<Leaf className="w-4 h-4" />} title="Хоол захиалахдаа" desc="Нэг удаагийн сэрээ, савх «хэрэггүй» гэж тэмдэглээрэй" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-500" />
                Хүнсний хэрэглээнд
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <ItemCard icon={<ShoppingBag className="w-4 h-4" />} title="Өөрийн савтай очих" desc="Зах, дэлгүүрээс мах, ногоогоо өөрийн савтай очиж авах нь гялгар уутыг багасгана" />
                <ItemCard icon={<Utensils className="w-4 h-4" />} title="Хоолоо төлөвлөх" desc="Хоолоо төлөвлөж хийснээр хүнсний хаягдлыг багасгана — үлдсэн хоолоор шинэ хоол хийх монгол уламжлал!" />
                <ItemCard icon={<Wind className="w-4 h-4" />} title="Байгалийн хөргөгч" desc="Өвлийн улиралд тагт, агуулахаа байгалийн хөргөгч болгон ашиглах нь эрчим хүч хэмнэнэ" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-amber-500" />
                Зуслан, хөдөөгийн хэрэглээнд
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <ItemCard icon={<Trash2 className="w-4 h-4" />} title="Хогоо буцааж авчир" desc="Зуслан, хөдөө явахдаа хогоо заавал буцааж авчирч хотын хогийн цэгт хая — хуванцар задрахад 400 жил шаардагдана" />
                <ItemCard icon={<Leaf className="w-4 h-4" />} title="Компост хийх" desc="Хүнсний үлдэгдлийг компост хийж зуслангийн хүлэмж, ногооны талбайдаа бордоо болгоорой" />
                <ItemCard icon={<Flame className="w-4 h-4 text-red-500" />} title="Хуванцар бүү шатаа" desc="Хуванцар, гялгар уутыг галд бүү шатаа — хорт утаа ялгаруулдаг" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3 flex items-center gap-2">
                <Shirt className="w-4 h-4 text-amber-500" />
                Хувцас, эд зүйлд
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <ItemCard icon={<Shirt className="w-4 h-4" />} title="Хандивлах" desc="Хэрэглэхгүй болсон хувцсаа хаяхын оронд хандивын цэгт өгөх эсвэл дахин ашиглах дэлгүүрт зараарай" />
                <ItemCard icon={<Lightbulb className="w-4 h-4" />} title="Засуулж ашиглах" desc="Эвдэрсэн зүйлийг шууд хаяхын өмнө засуулж болох эсэхийг бодоорой" />
                <ItemCard icon={<BookOpen className="w-4 h-4" />} title="Ном хандивлах" desc="Хуучин ном, дэвтрээ номын сан, сургуульд хандивлаарай" />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-500" />
                Өрх, хамт олондоо
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <ItemCard icon={<Trash2 className="w-4 h-4" />} title="СӨХ-д санал тавих" desc="СӨХ-тэйгөө ярилцаж байрандаа ангилах хогийн сав байршуулахыг санал болгоорой" />
                <ItemCard icon={<Award className="w-4 h-4" />} title="Хүүхдэд зааж сургах" desc="Хүүхдэдээ хог ангилахыг тоглоом шиг зааж сургавал бүх насных нь зуршил болно" />
                <ItemCard icon={<Leaf className="w-4 h-4" />} title="Их цэвэрлэгээнд оролцох" desc="Хавар, намрын бүх нийтийн их цэвэрлэгээнд идэвхтэй оролцоорой" />
              </div>
            </div>

            <Alert type="tip">
              <strong>Багасга → Дахин ашигла → Ангил</strong>
              <br />
              Хамгийн сайн хог бол үүсээгүй хог. Даавуун уут авч явах, олон удаа хэрэглэдэг сав ашиглах зэргээр хогоо эхнээс нь багасгаарай.
            </Alert>
          </div>
        </Section>

        {/* Quiz */}
        <div id="quiz" className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <Award className="w-10 h-10 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">📝 Хог ангилах сорил</h2>
            <p className="text-white/80 text-sm">Өөрийгөө шалгаж, хог ангилах мэдлэгээ сориорой!</p>
          </div>

          {!quizStarted ? (
            <div className="text-center">
              <p className="text-white/70 mb-4 text-sm">{quizQuestions.length} асуулт</p>
              <button
                onClick={() => setQuizStarted(true)}
                className="bg-white text-primary-dark px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-all"
              >
                Сорил эхлүүлэх
              </button>
            </div>
          ) : showResult ? (
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{score}/{quizQuestions.length}</div>
              <p className={`text-lg font-semibold mb-4 ${getRank().color}`}>{getRank().label}</p>
              <div className="bg-white/10 rounded-xl p-4 mb-6 text-left text-sm">
                <p className="font-semibold mb-2">Хариулт:</p>
                {quizQuestions.map((q, i) => (
                  <div key={i} className="flex items-start gap-2 py-1">
                    {i < score ? (
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{i + 1}. {q.options[q.correct]}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={restartQuiz}
                className="bg-white text-primary-dark px-8 py-3 rounded-xl font-bold hover:bg-white/90 transition-all"
              >
                Дахин оролдох
              </button>
            </div>
          ) : (
            <div className="bg-white/10 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4 text-sm text-white/70">
                <span>Асуулт {currentQ + 1} / {quizQuestions.length}</span>
                <span>Оноо: {score}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-6">
                <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }} />
              </div>
              <h3 className="text-lg font-bold mb-4">{currentQ + 1}. {quizQuestions[currentQ].question}</h3>
              <div className="space-y-3">
                {quizQuestions[currentQ].options.map((option, index) => {
                  const isCorrect = index === quizQuestions[currentQ].correct;
                  const isSelected = selected === index;
                  const showCorrect = selected !== null && isCorrect;
                  const showWrong = selected !== null && isSelected && !isCorrect;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl transition-all text-sm font-medium ${
                        showCorrect ? 'bg-green-500 text-white' : showWrong ? 'bg-red-500 text-white' : isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">{String.fromCharCode(65 + index)}</span>
                        {option}
                        {showCorrect && <CheckCircle className="w-5 h-5 ml-auto" />}
                        {showWrong && <XCircle className="w-5 h-5 ml-auto" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <button
                  onClick={nextQuestion}
                  className="w-full mt-6 bg-white text-primary-dark py-3 rounded-xl font-bold hover:bg-white/90 transition-all"
                >
                  {currentQ + 1 === quizQuestions.length ? 'Үр дүн харах' : 'Дараагийн асуулт'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4 text-sm">Таны жижиг алхам — Улаанбаатарын том өөрчлөлт!</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all">
            <Leaf className="w-5 h-5" />
            GreenLoop AI-рүү буцах
          </Link>
        </div>
      </main>
    </div>
  );
}
