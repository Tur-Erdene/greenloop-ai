import { createClient } from '@supabase/supabase-js'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ==================== AUTH ====================

export const signUp = async (phone: string, password: string) => {
  return supabase.auth.signUp({
    phone,
    password,
    options: { data: { phone } }
  })
}

export const signIn = async (phone: string, password: string) => {
  return supabase.auth.signInWithPassword({ phone, password })
}

export const getUser = async () => {
  return supabase.auth.getUser()
}

export const signOut = async () => {
  return supabase.auth.signOut()
}

// ==================== MATERIALS ====================

export const getMaterials = async () => {
  return supabase.from('materials').select('*').order('co2_per_kg', { ascending: false })
}

export const getMaterialByType = async (type: string) => {
  return supabase.from('materials').select('*').eq('type', type).single()
}

// ==================== SUBMISSIONS ====================

export const createSubmission = async (data: any) => {
  return supabase.from('submissions').insert(data).select()
}

export const getUserSubmissions = async (userId: string) => {
  return supabase
    .from('submissions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const getSubmissionById = async (id: string) => {
  return supabase.from('submissions').select('*').eq('id', id).single()
}

// ==================== PICKUPS ====================

export const createPickup = async (data: any) => {
  return supabase.from('pickups').insert(data).select()
}

export const getPickupByTracking = async (code: string) => {
  return supabase.from('pickups').select('*').eq('tracking_code', code).single()
}

export const updatePickupStatus = async (id: string, status: string) => {
  const updateData: any = { status }
  
  // Timestamp update based on status
  const timestampFields: Record<string, string> = {
    'requested': 'requested_at',
    'driver_assigned': 'driver_assigned_at',
    'collecting': 'collecting_started_at',
    'delivered': 'delivered_at',
    'processed': 'processed_at'
  }
  
  if (timestampFields[status]) {
    updateData[timestampFields[status]] = new Date().toISOString()
  }
  
  return supabase.from('pickups').update(updateData).eq('id', id)
}

export const getUserPickups = async (userId: string) => {
  return supabase
    .from('pickups')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

// ==================== CENTERS ====================

export const getCenters = async () => {
  return supabase.from('centers').select('*').eq('status', 'active')
}

export const getCenterById = async (id: string) => {
  return supabase.from('centers').select('*').eq('id', id).single()
}

// ==================== TREES ====================

export const createTreePlanting = async (data: any) => {
  return supabase.from('tree_plantings').insert(data).select()
}

export const getUserTrees = async (userId: string) => {
  return supabase
    .from('tree_plantings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const updateTreePhoto = async (id: string, year: number, photoUrl: string) => {
  return supabase
    .from('tree_plantings')
    .update({ yearly_photo_urls: supabase.rpc('array_append', { arr: photoUrl }) })
    .eq('id', id)
}

// ==================== BADGES ====================

export const getUserBadges = async (userId: string) => {
  return supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })
}

export const awardBadge = async (userId: string, badgeType: string, badgeName: string) => {
  return supabase.from('badges').insert({
    user_id: userId,
    badge_type: badgeType,
    badge_name: badgeName
  }).select()
}

// ==================== LEADERBOARD ====================

export const getLeaderboard = async (period: string = 'all_time') => {
  return supabase
    .from('leaderboard')
    .select('*, users(name, avatar_url)')
    .eq('period', period)
    .order('co2_saved', { ascending: false })
    .limit(50)
}

export const updateLeaderboard = async (userId: string, period: string, data: any) => {
  return supabase
    .from('leaderboard')
    .upsert({ user_id: userId, period, ...data })
    .select()
}

// ==================== PAYMENTS ====================

export const createPayment = async (data: any) => {
  return supabase.from('payments').insert(data).select()
}

export const getUserPayments = async (userId: string) => {
  return supabase
    .from('payments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const updatePaymentStatus = async (id: string, status: string) => {
  return supabase
    .from('payments')
    .update({ status, paid_at: status === 'completed' ? new Date().toISOString() : null })
    .eq('id', id)
}

// ==================== NOTIFICATIONS ====================

export const createNotification = async (data: any) => {
  return supabase.from('notifications').insert(data).select()
}

export const getUserNotifications = async (userId: string) => {
  return supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export const markNotificationRead = async (id: string) => {
  return supabase.from('notifications').update({ status: 'read' }).eq('id', id)
}

// ==================== ESG REPORTS ====================

export const createESGReport = async (data: any) => {
  return supabase.from('esg_reports').insert(data).select()
}

export const getCompanyReports = async (companyId: string) => {
  return supabase
    .from('esg_reports')
    .select('*')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
}

// ==================== REALTIME ====================

export const subscribeToPickup = (pickupId: string, callback: (data: any) => void) => {
  const channel = supabase
    .channel(`pickup_${pickupId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'pickups',
        filter: `id=eq.${pickupId}`
      },
      (payload) => {
        callback(payload.new)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

export const updateDriverLocation = async (pickupId: string, lat: number, lng: number) => {
  return supabase
    .from('pickups')
    .update({
      driver_lat: lat,
      driver_lng: lng,
      updated_at: new Date().toISOString()
    })
    .eq('id', pickupId)
}

// ==================== USER STATS ====================

export const getUserStats = async (userId: string) => {
  const { data: submissions } = await supabase
    .from('submissions')
    .select('co2_saved, weight_kg')
    .eq('user_id', userId)
    .eq('status', 'processed')
  
  const { data: trees } = await supabase
    .from('tree_plantings')
    .select('tree_count')
    .eq('user_id', userId)
    .eq('status', 'verified')
  
  const { data: badges } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId)

  const totalCO2 = submissions?.reduce((sum, s) => sum + (s.co2_saved || 0), 0) || 0
  const totalMaterial = submissions?.reduce((sum, s) => sum + (s.weight_kg || 0), 0) || 0
  const totalTrees = trees?.reduce((sum, t) => sum + (t.tree_count || 0), 0) || 0

  return {
    total_co2_saved: totalCO2,
    total_material_kg: totalMaterial,
    trees_funded: totalTrees,
    badge_count: badges?.length || 0
  }
}

// ==================== CO2 CALCULATION ====================

export const CO2_COEFFICIENTS = {
  pet: { name: 'Хуванцар PET', co2_per_kg: 3.5, price_per_kg: -2800 },
  hdpe: { name: 'Хуванцар HDPE', co2_per_kg: 2.8, price_per_kg: -2100 },
  paper: { name: 'Цаас', co2_per_kg: 1.2, price_per_kg: -900 },
  aluminum: { name: 'Хөнгөн цагаан', co2_per_kg: 9.0, price_per_kg: -7200 },
  glass: { name: 'Шил', co2_per_kg: 0.9, price_per_kg: -700 },
}

export const calculateCO2 = (materialType: string, weightKg: number) => {
  const coeff = CO2_COEFFICIENTS[materialType as keyof typeof CO2_COEFFICIENTS]
  if (!coeff) return null

  const co2Saved = coeff.co2_per_kg * weightKg
  const price = coeff.price_per_kg * weightKg
  const ecoPoints = Math.floor(co2Saved * 2 + 5)
  const treesEquivalent = co2Saved / 22

  return {
    co2Saved: co2Saved.toFixed(1),
    price: price.toFixed(0),
    ecoPoints,
    materialName: coeff.name,
    treesEquivalent: treesEquivalent.toFixed(2),
  }
}

// ==================== ECO LEVELS ====================

export const ECO_LEVELS = [
  { level: 1, name: 'Eco Newbie', min_co2: 0, max_co2: 10 },
  { level: 2, name: 'Eco Starter', min_co2: 10, max_co2: 50 },
  { level: 3, name: 'Eco Contributor', min_co2: 50, max_co2: 200 },
  { level: 4, name: 'Eco Advocate', min_co2: 200, max_co2: 500 },
  { level: 5, name: 'Eco Hero', min_co2: 500, max_co2: 1000 },
  { level: 6, name: 'Eco Legend', min_co2: 1000, max_co2: Infinity },
]

export const calculateEcoLevel = (totalCO2: number) => {
  for (let i = ECO_LEVELS.length - 1; i >= 0; i--) {
    if (totalCO2 >= ECO_LEVELS[i].min_co2) {
      return ECO_LEVELS[i]
    }
  }
  return ECO_LEVELS[0]
}

export const calculateSustainabilityScore = (
  co2Saved: number,
  recyclingEvents: number,
  streakDays: number = 0,
  badgeCount: number = 0
) => {
  const baseScore = co2Saved * 2 + recyclingEvents * 5 + streakDays * 10
  const multiplier = 1 + (badgeCount * 0.1)
  return Math.floor(Math.min(baseScore * multiplier, 1000))
}

// ==================== TREE FUND ====================

export const TREE_FUND = {
  cost_per_tree: 840, // MNT
  co2_absorption_per_year: 22, // kg per tree
  absorption_years: 3,
}

export const calculateTreeImpact = (treeCount: number) => {
  return {
    totalCost: treeCount * TREE_FUND.cost_per_tree,
    co2Absorption: treeCount * TREE_FUND.co2_absorption_per_year * TREE_FUND.absorption_years,
  }
}

// ==================== UTILS ====================

export const generateTrackingCode = () => {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `GL-${date}-${random}`
}

export const generateQRContent = (trackingCode: string) => {
  return JSON.stringify({
    type: 'greenloop_pickup',
    trackingCode,
    timestamp: new Date().toISOString(),
  })
}

export const formatMNT = (amount: number) => {
  return new Intl.NumberFormat('mn-MN').format(amount) + '₮'
}

export const PICKUP_STATUS_LABELS: Record<string, string> = {
  requested: 'АВАЛТ',
  driver_assigned: 'ТЭЗВЭЭР',
  collecting: 'БОЛОВСРУУЛАГТ',
  delivered: 'БҮТЭЭГДЭХҮҮН',
  processed: 'БОРЛУУЛАГТ',
}

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
}
