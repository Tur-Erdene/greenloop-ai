import { CO2_COEFFICIENTS, ECO_POINTS, ECO_LEVELS, TREE_FUND } from './db-schema';

// Calculate CO2 savings
export function calculateCO2(materialType: string, weightKg: number) {
  const coeff = CO2_COEFFICIENTS[materialType as keyof typeof CO2_COEFFICIENTS];
  if (!coeff) return null;

  const co2Saved = coeff.co2_per_kg * weightKg;
  const price = coeff.price * weightKg;
  const ecoPoints = Math.floor(co2Saved * ECO_POINTS.per_kg_co2 + ECO_POINTS.per_submission);

  return {
    co2Saved: co2Saved.toFixed(1),
    price: price.toFixed(0),
    ecoPoints,
    materialName: coeff.name,
    treesEquivalent: (co2Saved / 22).toFixed(2),
  };
}

// Calculate eco level
export function calculateEcoLevel(totalCO2: number) {
  for (let i = ECO_LEVELS.length - 1; i >= 0; i--) {
    if (totalCO2 >= ECO_LEVELS[i].min_co2) {
      return ECO_LEVELS[i];
    }
  }
  return ECO_LEVELS[0];
}

// Calculate sustainability score
export function calculateSustainabilityScore(
  co2Saved: number,
  recyclingEvents: number,
  streakDays: number = 0,
  badgeCount: number = 0
) {
  const baseScore = co2Saved * 2 + recyclingEvents * 5 + streakDays * 10;
  const multiplier = 1 + (badgeCount * 0.1);
  return Math.floor(Math.min(baseScore * multiplier, 1000));
}

// Generate tracking code
export function generateTrackingCode() {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `GL-${date}-${random}`;
}

// Generate QR code content
export function generateQRContent(trackingCode: string) {
  return JSON.stringify({
    type: 'greenloop_pickup',
    trackingCode,
    timestamp: new Date().toISOString(),
  });
}

// Format MNT currency
export function formatMNT(amount: number) {
  return new Intl.NumberFormat('mn-MN').format(amount) + '₮';
}

// Get pickup status label
export function getPickupStatusLabel(status: string) {
  const labels: Record<string, string> = {
    requested: 'АВАЛТ',
    driver_assigned: 'ТЭЗВЭЭР',
    collecting: 'БОЛОВСРУУЛАГТ',
    delivered: 'БҮТЭЭГДЭХҮҮН',
    processed: 'БОРЛУУЛАГТ',
  };
  return labels[status] || status;
}

// SMS templates
export const SMS_TEMPLATES = {
  pickup_requested: (trackingCode: string) => 
    `GreenLoop: Таны хог бүртгүүлсэн. Tracking: ${trackingCode}. Жолооч очиж байна.`,
  
  driver_assigned: (driverName: string, phone: string) => 
    `GreenLoop: Жолооч ${driverName} (${phone}) ирж байна.`,
  
  collecting: (trackingCode: string) => 
    `GreenLoop: Хог хаягдал тань авч явлаа. Tracking: ${trackingCode}`,
  
  delivered: (centerName: string) => 
    `GreenLoop: Хог хаягдал ${centerName} төвд хүргэгдлээ.`,
  
  processed: (co2Saved: string, ecoPoints: number) => 
    `GreenLoop: Дахин боловсруулалт дууслаа! CO2 хэмнэлт: ${co2Saved}кг. Эко оноо: +${ecoPoints}.`,
  
  tree_planted: (count: number, location: string) => 
    `GreenLoop: ${count} мод тарилаа. Байршил: ${location}. GPS: харах.`,
};

// Mock data for demo
export const mockUsers = [
  { id: '1', name: 'Б.Батэрдэнэ', phone: '9911-1111', total_co2: 1250, eco_level: 5, trees: 12 },
  { id: '2', name: 'Г.Сарантуяа', phone: '9911-2222', total_co2: 980, eco_level: 5, trees: 8 },
  { id: '3', name: 'Д.Ганболд', phone: '9911-3333', total_co2: 756, eco_level: 4, trees: 5 },
  { id: '4', name: 'М.Энхтуул', phone: '9911-4444', total_co2: 520, eco_level: 4, trees: 3 },
  { id: '5', name: 'Н.Амаржаргал', phone: '9911-5555', total_co2: 410, eco_level: 3, trees: 2 },
];

export const mockCenters = [
  { id: '1', name: 'УБ Хог Хаягдлын Дахин Боловсруулах', lat: 47.919, lng: 106.917, materials: ['PET', 'HDPE', 'Цаас'] },
  { id: '2', name: 'Монголын Хог Хаягдлын Төв', lat: 47.886, lng: 106.905, materials: ['Хөнгөн цагаан', 'Шил'] },
  { id: '3', name: 'Мүпликс Байгаль', lat: 47.903, lng: 106.928, materials: ['PET', 'Цаас', 'Шил'] },
];
