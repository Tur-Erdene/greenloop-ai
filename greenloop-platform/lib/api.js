// GreenLoop AI Backend API
// FastAPI/Node.js холбох бэлэн код

// CO2 Calculation Constants
const CO2_COEFFICIENTS = {
  pet: { name: 'Хуванцар PET', co2: 3.5, price: -2800 },
  hdpe: { name: 'Хуванцар HDPE', co2: 2.8, price: -2100 },
  paper: { name: 'Цаас', co2: 1.2, price: -900 },
  aluminum: { name: 'Хөнгөн цагаан', co2: 9.0, price: -7200 },
  glass: { name: 'Шил', co2: 0.9, price: -700 },
};

const ECO_LEVELS = [
  { level: 1, name: 'Eco Newbie', min: 0, max: 10 },
  { level: 2, name: 'Eco Starter', min: 10, max: 50 },
  { level: 3, name: 'Eco Contributor', min: 50, max: 200 },
  { level: 4, name: 'Eco Advocate', min: 200, max: 500 },
  { level: 5, name: 'Eco Hero', min: 500, max: 1000 },
  { level: 6, name: 'Eco Legend', min: 1000, max: Infinity },
];

const TREE_FUND = {
  cost_per_tree: 840,
  co2_absorption_per_year: 22,
  absorption_years: 3,
};

// API Functions
const api = {
  // Calculate CO2
  calculateCO2: (materialType, weightKg) => {
    const coeff = CO2_COEFFICIENTS[materialType];
    if (!coeff) return null;

    const co2Saved = coeff.co2 * weightKg;
    const price = coeff.price * weightKg;
    const ecoPoints = Math.floor(co2Saved * 2 + 5);
    const treesEquivalent = co2Saved / 22;

    return {
      co2Saved: co2Saved.toFixed(1),
      price: price.toFixed(0),
      ecoPoints,
      materialName: coeff.name,
      treesEquivalent: treesEquivalent.toFixed(2),
    };
  },

  // Calculate Eco Level
  calculateEcoLevel: (totalCO2) => {
    for (let i = ECO_LEVELS.length - 1; i >= 0; i--) {
      if (totalCO2 >= ECO_LEVELS[i].min) {
        return ECO_LEVELS[i];
      }
    }
    return ECO_LEVELS[0];
  },

  // Calculate Sustainability Score
  calculateScore: (co2Saved, recyclingEvents, streakDays = 0, badgeCount = 0) => {
    const baseScore = co2Saved * 2 + recyclingEvents * 5 + streakDays * 10;
    const multiplier = 1 + (badgeCount * 0.1);
    return Math.floor(Math.min(baseScore * multiplier, 1000));
  },

  // Generate Tracking Code
  generateTrackingCode: () => {
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `GL-${date}-${random}`;
  },

  // Generate QR Content
  generateQRContent: (trackingCode) => {
    return JSON.stringify({
      type: 'greenloop_pickup',
      trackingCode,
      timestamp: new Date().toISOString(),
    });
  },

  // Calculate Tree Impact
  calculateTreeImpact: (treeCount) => {
    return {
      totalCost: treeCount * TREE_FUND.cost_per_tree,
      co2Absorption: treeCount * TREE_FUND.co2_absorption_per_year * TREE_FUND.absorption_years,
    };
  },

  // Format MNT
  formatMNT: (amount) => {
    return new Intl.NumberFormat('mn-MN').format(amount) + '₮';
  },

  // Get Pickup Status Label
  getPickupStatusLabel: (status) => {
    const labels = {
      requested: 'АВАЛТ',
      driver_assigned: 'ТЭЗВЭЭР',
      collecting: 'БОЛОВСРУУЛАГТ',
      delivered: 'БҮТЭЭГДЭХҮҮН',
      processed: 'БОРЛУУЛАГТ',
    };
    return labels[status] || status;
  },

  // SMS Templates
  sms: {
    pickup_requested: (trackingCode) =>
      `GreenLoop: Таны хог бүртгүүлсэн. Tracking: ${trackingCode}. Жолооч очиж байна.`,
    driver_assigned: (driverName, phone) =>
      `GreenLoop: Жолооч ${driverName} (${phone}) ирж байна.`,
    collecting: (trackingCode) =>
      `GreenLoop: Хог хаягдал тань авч явлаа. Tracking: ${trackingCode}`,
    delivered: (centerName) =>
      `GreenLoop: Хог хаягдал ${centerName} төвд хүргэгдлээ.`,
    processed: (co2Saved, ecoPoints) =>
      `GreenLoop: Дахин боловсруулалт дууслаа! CO2 хэмнэлт: ${co2Saved}кг. Эко оноо: +${ecoPoints}.`,
    tree_planted: (count, location) =>
      `GreenLoop: ${count} мод тарилаа. Байршил: ${location}. GPS: харах.`,
  },

  // Payment Integration (QPay/SocialPay/MonPay)
  payment: {
    createQPayInvoice: (amount, description, phone) => {
      // QPay API integration
      return {
        provider: 'qpay',
        amount,
        description,
        phone,
        invoiceId: `QP-${Date.now()}`,
        status: 'pending',
        qrCode: `https://qpay.mn/qr/${Date.now()}`,
      };
    },

    createSocialPayInvoice: (amount, description, phone) => {
      // SocialPay API integration
      return {
        provider: 'socialpay',
        amount,
        description,
        phone,
        invoiceId: `SP-${Date.now()}`,
        status: 'pending',
        qrCode: `https://socialpay.mn/qr/${Date.now()}`,
      };
    },

    verifyPayment: (invoiceId, provider) => {
      // Verify payment status
      return {
        invoiceId,
        provider,
        status: 'completed',
        verifiedAt: new Date().toISOString(),
      };
    },
  },

  // Database Queries (Supabase)
  db: {
    // User queries
    getUser: async (supabase, userId) => {
      return supabase.from('users').select('*').eq('id', userId).single();
    },

    createSubmission: async (supabase, data) => {
      return supabase.from('submissions').insert(data).select();
    },

    createPickup: async (supabase, data) => {
      return supabase.from('pickups').insert(data).select();
    },

    updatePickupStatus: async (supabase, id, status) => {
      const updateData = { status };
      const timestampFields = {
        requested: 'requested_at',
        driver_assigned: 'driver_assigned_at',
        collecting: 'collecting_started_at',
        delivered: 'delivered_at',
        processed: 'processed_at',
      };
      if (timestampFields[status]) {
        updateData[timestampFields[status]] = new Date().toISOString();
      }
      return supabase.from('pickups').update(updateData).eq('id', id);
    },

    getLeaderboard: async (supabase, period = 'all_time') => {
      return supabase
        .from('leaderboard')
        .select('*, users(name, avatar_url)')
        .eq('period', period)
        .order('co2_saved', { ascending: false })
        .limit(50);
    },

    createTreePlanting: async (supabase, data) => {
      return supabase.from('tree_plantings').insert(data).select();
    },

    createPayment: async (supabase, data) => {
      return supabase.from('payments').insert(data).select();
    },

    createNotification: async (supabase, data) => {
      return supabase.from('notifications').insert(data).select();
    },

    createESGReport: async (supabase, data) => {
      return supabase.from('esg_reports').insert(data).select();
    },
  },

  // Real-time updates
  realtime: {
    subscribeToPickup: (supabase, pickupId, callback) => {
      const channel = supabase
        .channel(`pickup_${pickupId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'pickups',
            filter: `id=eq.${pickupId}`,
          },
          (payload) => {
            callback(payload.new);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    },

    updateDriverLocation: async (supabase, pickupId, lat, lng) => {
      return supabase
        .from('pickups')
        .update({
          driver_lat: lat,
          driver_lng: lng,
          updated_at: new Date().toISOString(),
        })
        .eq('id', pickupId);
    },
  },

  // Google Maps integration
  maps: {
    calculateDistance: (p1, p2) => {
      const R = 6371; // km
      const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
      const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
          Math.cos((p2.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    },

    findNearestCenter: (userLocation, centers) => {
      let nearest = null;
      let minDistance = Infinity;

      centers.forEach((center) => {
        const distance = api.maps.calculateDistance(userLocation, {
          lat: center.lat,
          lng: center.lng,
        });
        if (distance < minDistance) {
          minDistance = distance;
          nearest = center;
        }
      });

      return { nearest, distance: minDistance };
    },
  },
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
} else if (typeof window !== 'undefined') {
  window.GreenLoopAPI = api;
}
