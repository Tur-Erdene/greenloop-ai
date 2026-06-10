export const SMS_TEMPLATES = {
  // Pickup 5-stage notifications
  pickup_requested: (trackingCode: string) =>
    `GreenLoop: Таны хог бүртгүүлсэн. Tracking: ${trackingCode}. Жолооч очиж байна.`,

  driver_assigned: (driverName: string, phone: string) =>
    `GreenLoop: Жолооч ${driverName} (${phone}) ирж байна.`,

  collecting_started: (trackingCode: string) =>
    `GreenLoop: Хог хаягдал тань авч явлаа. Tracking: ${trackingCode}`,

  delivered_to_center: (centerName: string) =>
    `GreenLoop: Хог хаягдал ${centerName} төвд хүргэгдлээ.`,

  processed_completed: (co2Saved: string, ecoPoints: number) =>
    `GreenLoop: Дахин боловсруулалт дууслаа! CO2 хэмнэлт: ${co2Saved}кг. Эко оноо: +${ecoPoints}.`,

  // Tree planting notifications
  tree_donated: (count: number, location: string) =>
    `GreenLoop: ${count} модний хандив хүлээн авлаа. Байршил: ${location}.`,

  tree_planted: (count: number, location: string) =>
    `GreenLoop: ${count} мод тарилаа. Байршил: ${location}. GPS: харах.`,

  tree_yearly_update: (year: number, treeCount: number, photoUrl: string) =>
    `GreenLoop: ${year} оны модны тайлан. ${treeCount} мод. Фото: ${photoUrl}`,

  // Reward/Points notifications
  eco_points_earned: (points: number, total: number) =>
    `GreenLoop: +${points} эко оноо авлаа! Нийт: ${total} оноо.`,

  badge_earned: (badgeName: string) =>
    `GreenLoop: 🏆 "${badgeName}" badge эзэмшлээ!`,

  level_up: (newLevel: string, nextLevel: string) =>
    `GreenLoop: 🎉 ${newLevel} түвшинд хүрлээ! Дараагийн: ${nextLevel}`,

  // Payment notifications
  payment_received: (amount: number, type: string) =>
    `GreenLoop: ₮${amount} ${type} төлбөр хүлээн авлаа.`,

  payment_reminder: (amount: number, dueDate: string) =>
    `GreenLoop: ₮${amount} төлбөр. Дуусах: ${dueDate}.`,

  // ESG/Company notifications
  esg_report_ready: (period: string) =>
    `GreenLoop: ${period} ESG тайлан бэлэн боллоо.`,

  monthly_summary: (co2Saved: string, materialKg: string) =>
    `GreenLoop: Сарын тайлан. CO2: ${co2Saved}кг. Хог: ${materialKg}кг.`,

  // Emergency/Maintenance
  pickup_delayed: (trackingCode: string, reason: string) =>
    `GreenLoop: ${trackingCode} хүргэлт хойшиллоо. Шалтгаан: ${reason}`,

  center_closed: (centerName: string, reopenDate: string) =>
    `GreenLoop: ${centerName} түр хаалттай. Нээгдэх: ${reopenDate}`,
};

// SMS Provider configuration
export const SMS_PROVIDERS = {
  unitel: {
    name: 'Unitel',
    apiUrl: 'https://sms.unitel.mn/api/send',
    headers: { 'Content-Type': 'application/json' },
  },
  skytel: {
    name: 'Skytel',
    apiUrl: 'https://sms.skytel.mn/api/send',
    headers: { 'Content-Type': 'application/json' },
  },
  mobicom: {
    name: 'MobiCom',
    apiUrl: 'https://sms.mobicom.mn/api/send',
    headers: { 'Content-Type': 'application/json' },
  },
  gmobile: {
    name: 'G-Mobile',
    apiUrl: 'https://sms.gmobile.mn/api/send',
    headers: { 'Content-Type': 'application/json' },
  },
};

// Send SMS function (mock implementation)
export const sendSMS = async (phone: string, message: string, provider: string = 'unitel') => {
  // In production, this would call the actual SMS provider API
  const providerConfig = SMS_PROVIDERS[provider as keyof typeof SMS_PROVIDERS];

  if (!providerConfig) {
    throw new Error(`Unknown SMS provider: ${provider}`);
  }

  // Mock implementation for now
  console.log(`📱 SMS via ${providerConfig.name}:`);
  console.log(`To: ${phone}`);
  console.log(`Message: ${message}`);

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        messageId: `SMS-${Date.now()}`,
        provider: providerConfig.name,
        sentAt: new Date().toISOString(),
      });
    }, 1000);
  });
};

// Send bulk SMS
export const sendBulkSMS = async (phones: string[], message: string, provider: string = 'unitel') => {
  const results = await Promise.all(
    phones.map(phone => sendSMS(phone, message, provider))
  );

  return {
    total: phones.length,
    success: results.filter((r: any) => r.success).length,
    failed: results.filter((r: any) => !r.success).length,
    results,
  };
};

// Schedule SMS (using cron or similar)
export const scheduleSMS = async (phone: string, message: string, sendAt: Date, provider: string = 'unitel') => {
  // In production, this would use a job queue like Bull or similar
  const delay = sendAt.getTime() - Date.now();

  if (delay < 0) {
    throw new Error('Scheduled time must be in the future');
  }

  setTimeout(() => {
    sendSMS(phone, message, provider);
  }, delay);

  return {
    scheduled: true,
    phone,
    sendAt,
    provider,
  };
};

// Notification history tracking
export const notificationHistory: any[] = [];

export const trackNotification = (notification: any) => {
  notificationHistory.push({
    ...notification,
    id: `NOTIF-${Date.now()}`,
    createdAt: new Date().toISOString(),
  });
};

export const getNotificationHistory = (phone?: string) => {
  if (phone) {
    return notificationHistory.filter(n => n.phone === phone);
  }
  return notificationHistory;
};
