'use client';

import React, { useState } from 'react';
import { QrCode, Phone, CreditCard, Banknote, ArrowRight } from 'lucide-react';
import QRCode from 'react-qr-code';

const PAYMENT_PROVIDERS = [
  { id: 'qpay', name: 'QPay', icon: '💳', color: 'bg-blue-500', description: 'QPay-ээр төлөх' },
  { id: 'socialpay', name: 'SocialPay', icon: '📱', color: 'bg-green-500', description: 'SocialPay-ээр төлөх' },
  { id: 'monpay', name: 'MonPay', icon: '💰', color: 'bg-purple-500', description: 'MonPay-ээр төлөх' },
  { id: 'cash', name: 'Бэлэн мөнгө', icon: '💵', color: 'bg-gray-500', description: 'Жолоочид шууд төлөх' },
];

const SMS_PROVIDERS = [
  { id: 'unitel', name: 'Unitel', api: 'https://api.unitel.mn/sms' },
  { id: 'skytel', name: 'Skytel', api: 'https://api.skytel.mn/sms' },
  { id: 'mobicom', name: 'MobiCom', api: 'https://api.mobicom.mn/sms' },
  { id: 'g-mobile', name: 'G-Mobile', api: 'https://api.gmobile.mn/sms' },
];

interface PaymentFormProps {
  type: 'tree' | 'reward' | 'donation';
  amount?: number;
  onSuccess?: (payment: any) => void;
}

export default function PaymentForm({ type, amount = 840, onSuccess }: PaymentFormProps) {
  const [selectedProvider, setSelectedProvider] = useState('qpay');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [treeCount, setTreeCount] = useState(1);

  const totalAmount = type === 'tree' ? treeCount * 840 : amount;

  const generateQRCode = async () => {
    setLoading(true);
    
    // Generate payment request data
    const paymentData = {
      type,
      amount: totalAmount,
      provider: selectedProvider,
      phone,
      orderId: `GL-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    // Create QR code with payment data
    const qrData = JSON.stringify(paymentData);
    setQrCode(qrData);
    setPaymentStatus('pending');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setLoading(false);
      
      if (onSuccess) {
        onSuccess({
          ...paymentData,
          status: 'completed',
          paidAt: new Date().toISOString(),
        });
      }
    }, 3000);
  };

  const sendSMS = async () => {
    if (!phone) return;

    const templates: Record<string, string> = {
      tree: `GreenLoop: ${treeCount} модний хандив (₮${totalAmount}) хүлээн авлаа. GPS: харах. Баярлалаа!`,
      reward: `GreenLoop: ₮${totalAmount} урамшуулал амжилттай. Дансанд орлоо.`,
      donation: `GreenLoop: ₮${totalAmount} хандив өгсөнд баярлалаа!`,
    };

    const message = templates[type] || 'GreenLoop: Төлбөр амжилттай.';

    // Simulate SMS sending
    console.log('SMS to:', phone, 'Message:', message);
    
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {type === 'tree' ? 'Мод тарих хандив' : type === 'reward' ? 'Урамшуулал авах' : 'Хандив өгөх'}
          </h3>
          <p className="text-sm text-gray-500">Төлбөрийн хэсэг</p>
        </div>
      </div>

      {/* Tree Count Selection (only for tree payments) */}
      {type === 'tree' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Модны тоо
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTreeCount(Math.max(1, treeCount - 1))}
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              -
            </button>
            <div className="text-2xl font-bold w-16 text-center">{treeCount}</div>
            <button
              onClick={() => setTreeCount(treeCount + 1)}
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            1 мод = 840₮ • CO₂ шингээлт: {treeCount * 22 * 3} кг (3 жил)
          </p>
        </div>
      )}

      {/* Payment Provider Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Төлбөрийн хэрэгсэл сонгох
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              onClick={() => setSelectedProvider(provider.id)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                selectedProvider === provider.id
                  ? 'border-primary bg-primary-light'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`w-8 h-8 ${provider.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                {provider.icon}
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{provider.name}</div>
                <div className="text-xs text-gray-500">{provider.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Утасны дугаар (SMS мэдэгдэл авах)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9911-XXXX"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
      </div>

      {/* Amount Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Нийт дүн:</span>
          <span className="text-2xl font-bold text-primary">₮{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Хураамж:</span>
          <span className="text-gray-500">0₮</span>
        </div>
      </div>

      {/* QR Code Display */}
      {qrCode && (
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <QRCode value={qrCode} size={200} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {paymentStatus === 'pending' ? '⏳ Төлбөр хүлээгдэж байна...' : '✅ Төлбөр амжилттай!'}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={generateQRCode}
          disabled={loading || !phone}
          className="flex-1 bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <QrCode className="w-5 h-5" />
              QR Code үүсгэх
            </>
          )}
        </button>
        <button
          onClick={sendSMS}
          disabled={!phone}
          className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          SMS илгээх
        </button>
      </div>

      {/* Payment Status */}
      {paymentStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-xl text-center">
          ✅ Төлбөр амжилттай хийгдлээ! Баярлалаа!
        </div>
      )}
    </div>
  );
}
