// Database Schema for GreenLoop Platform
// PostgreSQL + Supabase

export const schema = {
  // Users
  users: `
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      phone VARCHAR(20) UNIQUE NOT NULL,
      email VARCHAR(255),
      name VARCHAR(255),
      avatar_url TEXT,
      eco_level INTEGER DEFAULT 1,
      eco_points INTEGER DEFAULT 0,
      total_co2_saved DECIMAL(10,2) DEFAULT 0,
      total_material_kg DECIMAL(10,2) DEFAULT 0,
      trees_funded INTEGER DEFAULT 0,
      sustainability_score INTEGER DEFAULT 0,
      badge_count INTEGER DEFAULT 0,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Materials / CO2 Coefficients
  materials: `
    CREATE TABLE materials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      co2_per_kg DECIMAL(10,3) NOT NULL,
      energy_saved_per_kg DECIMAL(10,3),
      price_per_kg DECIMAL(10,2) DEFAULT 0,
      icon VARCHAR(50),
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Recycling Submissions
  submissions: `
    CREATE TABLE submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      material_type VARCHAR(50) NOT NULL,
      weight_kg DECIMAL(10,2) NOT NULL,
      co2_saved DECIMAL(10,2) NOT NULL,
      eco_points_earned INTEGER NOT NULL,
      photo_url TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      location_lat DECIMAL(10,8),
      location_lng DECIMAL(11,8),
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Pickup Orders (5-Stage Tracking)
  pickups: `
    CREATE TABLE pickups (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      submission_id UUID REFERENCES submissions(id),
      status VARCHAR(20) DEFAULT 'requested',
      -- Stage 1: Requested
      requested_at TIMESTAMP DEFAULT NOW(),
      -- Stage 2: Driver Assigned
      driver_id UUID,
      driver_assigned_at TIMESTAMP,
      driver_name VARCHAR(255),
      driver_phone VARCHAR(20),
      -- Stage 3: Collecting
      collecting_started_at TIMESTAMP,
      -- Stage 4: Delivered to Center
      delivered_at TIMESTAMP,
      center_id UUID,
      center_name VARCHAR(255),
      -- Stage 5: Processed
      processed_at TIMESTAMP,
      processed_weight DECIMAL(10,2),
      
      pickup_address TEXT,
      pickup_lat DECIMAL(10,8),
      pickup_lng DECIMAL(11,8),
      center_lat DECIMAL(10,8),
      center_lng DECIMAL(11,8),
      
      qr_code TEXT,
      tracking_code VARCHAR(20) UNIQUE,
      
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Recycling Centers
  centers: `
    CREATE TABLE centers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      address TEXT,
      lat DECIMAL(10,8) NOT NULL,
      lng DECIMAL(11,8) NOT NULL,
      phone VARCHAR(20),
      materials_accepted TEXT[],
      operating_hours TEXT,
      status VARCHAR(20) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Tree Planting
  tree_plantings: `
    CREATE TABLE tree_plantings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      tree_count INTEGER NOT NULL,
      amount_mnt DECIMAL(10,2) NOT NULL,
      location_name VARCHAR(255),
      lat DECIMAL(10,8),
      lng DECIMAL(11,8),
      photo_url TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      planted_at TIMESTAMP,
      verified_at TIMESTAMP,
      yearly_photo_urls TEXT[],
      co2_absorption_estimate DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Badges
  badges: `
    CREATE TABLE badges (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      badge_type VARCHAR(50) NOT NULL,
      badge_name VARCHAR(100) NOT NULL,
      icon VARCHAR(50),
      earned_at TIMESTAMP DEFAULT NOW(),
      description TEXT
    );
  `,

  // Leaderboard
  leaderboard: `
    CREATE TABLE leaderboard (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      period VARCHAR(20) DEFAULT 'all_time',
      co2_saved DECIMAL(10,2) DEFAULT 0,
      material_kg DECIMAL(10,2) DEFAULT 0,
      submissions_count INTEGER DEFAULT 0,
      rank INTEGER,
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Payments
  payments: `
    CREATE TABLE payments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      type VARCHAR(20) NOT NULL,
      amount_mnt DECIMAL(10,2) NOT NULL,
      provider VARCHAR(20) DEFAULT 'qpay',
      status VARCHAR(20) DEFAULT 'pending',
      reference_id VARCHAR(100),
      qr_code TEXT,
      paid_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // Notifications / SMS
  notifications: `
    CREATE TABLE notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      type VARCHAR(50) NOT NULL,
      title VARCHAR(255),
      message TEXT,
      channel VARCHAR(20) DEFAULT 'sms',
      status VARCHAR(20) DEFAULT 'pending',
      sent_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,

  // ESG Reports
  esg_reports: `
    CREATE TABLE esg_reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id UUID REFERENCES users(id),
      period_start DATE,
      period_end DATE,
      total_co2_offset DECIMAL(10,2),
      total_material_processed DECIMAL(10,2),
      employee_participation INTEGER,
      report_data JSONB,
      pdf_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
};

// CO2 Coefficients (from the screenshot)
export const CO2_COEFFICIENTS = {
  pet: { name: 'Хуванцар PET', co2_per_kg: 3.5, price: -2800 },
  hdpe: { name: 'Хуванцар HDPE', co2_per_kg: 2.8, price: -2100 },
  paper: { name: 'Цаас', co2_per_kg: 1.2, price: -900 },
  aluminum: { name: 'Хөнгөн цагаан', co2_per_kg: 9.0, price: -7200 },
  glass: { name: 'Шил', co2_per_kg: 0.9, price: -700 },
};

// Eco Points Calculation
export const ECO_POINTS = {
  per_kg_co2: 2,
  per_submission: 5,
  streak_bonus: 10,
  badge_multiplier: 1.5,
};

// Tree Fund
export const TREE_FUND = {
  cost_per_tree: 840, // MNT
  co2_absorption_per_year: 22, // kg per tree
  absorption_years: 3,
};

// Eco Levels
export const ECO_LEVELS = [
  { level: 1, name: 'Eco Newbie', min_co2: 0, max_co2: 10 },
  { level: 2, name: 'Eco Starter', min_co2: 10, max_co2: 50 },
  { level: 3, name: 'Eco Contributor', min_co2: 50, max_co2: 200 },
  { level: 4, name: 'Eco Advocate', min_co2: 200, max_co2: 500 },
  { level: 5, name: 'Eco Hero', min_co2: 500, max_co2: 1000 },
  { level: 6, name: 'Eco Legend', min_co2: 1000, max_co2: Infinity },
];

// Pickup Status Flow
export const PICKUP_STATUS = [
  'requested',       // Ye 1 - АВАЛТ
  'driver_assigned', // Ye 2 - ТЭЗВЭЭР
  'collecting',      // Ye 3 - БОЛОВСРУУЛАГТ
  'delivered',       // Ye 4 - БҮТЭЭГДЭХҮҮН
  'processed',       // Ye 5 - БОРЛУУЛАГТ
];
