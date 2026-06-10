# GreenLoop AI — Backend Integration Guide
## PostgreSQL + Supabase + Google Maps API

---

## 1. Supabase PostgreSQL холбох

### 1.1 Supabase Project үүсгэх
1. https://supabase.com рүү орно
2. "New Project" → нэр: `greenloop-ai`
3. Region: `Asia NorthEast (Tokyo)` эсвэл ойрхон region
4. Database password оруулна
5. Create project (1-2 минут)

### 1.2 Supabase URL + API Key авах
Dashboard → Settings → API гарна:

```
Project URL: https://abcdefgh12345678.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIs... (public API)
service_role key: eyJhbGciOiJIUzI1NiIs... (admin API - НУУЦААР ХАДГАЛ)
```

### 1.3 Database Schema оруулах (SQL Editor)

Supabase Dashboard → SQL Editor → New query → дараах SQL-г ажиллуулна:

```sql
-- 1. Users Table
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

-- 2. Materials (CO2 Coefficients)
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

-- 3. Recycling Submissions
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
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Pickup Orders (5-Stage Tracking)
CREATE TABLE pickups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  submission_id UUID REFERENCES submissions(id),
  status VARCHAR(20) DEFAULT 'requested',
  requested_at TIMESTAMP DEFAULT NOW(),
  driver_id UUID,
  driver_assigned_at TIMESTAMP,
  driver_name VARCHAR(255),
  driver_phone VARCHAR(20),
  collecting_started_at TIMESTAMP,
  delivered_at TIMESTAMP,
  center_id UUID,
  center_name VARCHAR(255),
  processed_at TIMESTAMP,
  processed_weight DECIMAL(10,2),
  pickup_address TEXT,
  pickup_lat DECIMAL(10,8),
  pickup_lng DECIMAL(11,8),
  center_lat DECIMAL(10,8),
  center_lng DECIMAL(11,8),
  qr_code TEXT,
  tracking_code VARCHAR(20) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. Recycling Centers
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

-- 6. Tree Plantings
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

-- 7. Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  badge_type VARCHAR(50) NOT NULL,
  badge_name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- 8. Leaderboard
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

-- 9. Payments
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

-- 10. Notifications / SMS
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

-- 11. ESG Reports
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

-- CO2 Coefficients оруулах
INSERT INTO materials (name, type, co2_per_kg, price_per_kg, icon, description) VALUES
('Хуванцар PET', 'pet', 3.5, -2800, '♻️', 'Хуванцар сав дахин боловсруулах'),
('Хуванцар HDPE', 'hdpe', 2.8, -2100, '♻️', 'HDPE хуванцар дахин боловсруулах'),
('Цаас', 'paper', 1.2, -900, '📄', 'Цаас дахин боловсруулах'),
('Хөнгөн цагаан', 'aluminum', 9.0, -7200, '🔩', 'Хөнгөн цагаан дахин боловсруулах'),
('Шил', 'glass', 0.9, -700, '🍾', 'Шил дахин боловсруулах');

-- Recycling Centers оруулах (Demo data)
INSERT INTO centers (name, address, lat, lng, phone, materials_accepted, operating_hours) VALUES
('УБ Хог Хаягдлын Дахин Боловсруулах', 'Улаанбаатар, Баянзүрх', 47.919, 106.917, '7510-1234', ARRAY['PET', 'HDPE', 'Цаас'], '09:00-18:00'),
('Монголын Хог Хаягдлын Төв', 'Улаанбаатар, Сүхбаатар', 47.886, 106.905, '7510-5678', ARRAY['Хөнгөн цагаан', 'Шил'], '09:00-18:00'),
('Мүпликс Байгаль', 'Улаанбаатар, Хан-Уул', 47.903, 106.928, '7510-9999', ARRAY['PET', 'Цаас', 'Шил'], '08:00-20:00');

-- Row Level Security (RLS) хязгаарлалт
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE tree_plantings ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE esg_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policy: хэрэглэгч өөрийнхөө өгөгдөл харах
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own submissions" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own pickups" ON pickups
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own trees" ON tree_plantings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own badges" ON badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);
```

### 1.4 Supabase Client холбох (Frontend)

```bash
npm install @supabase/supabase-js
```

`.env.local` файл:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

`lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Auth helpers
export const signUp = async (phone: string, password: string) => {
  return supabase.auth.signUp({
    phone,
    password,
    options: { data: { phone } }
  })
}

export const signIn = async (phone: string, password: string) => {
  return supabase.auth.signInWithPassword({
    phone,
    password
  })
}

export const getUser = async () => {
  return supabase.auth.getUser()
}

// Database helpers
export const getMaterials = async () => {
  return supabase.from('materials').select('*')
}

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

export const getLeaderboard = async () => {
  return supabase
    .from('leaderboard')
    .select('*, users(name, avatar_url)')
    .eq('period', 'all_time')
    .order('co2_saved', { ascending: false })
    .limit(50)
}

export const getCenters = async () => {
  return supabase.from('centers').select('*').eq('status', 'active')
}

export const createPickup = async (data: any) => {
  return supabase.from('pickups').insert(data).select()
}

export const getPickupByTracking = async (code: string) => {
  return supabase
    .from('pickups')
    .select('*')
    .eq('tracking_code', code)
    .single()
}

export const updatePickupStatus = async (id: string, status: string) => {
  return supabase
    .from('pickups')
    .update({ status, [`${status}_at`]: new Date().toISOString() })
    .eq('id', id)
}
```

---

## 2. Google Maps API холбох

### 2.1 API Key авах
1. https://console.cloud.google.com рүү орно
2. New Project → "greenloop-maps"
3. APIs & Services → Library → `Maps JavaScript API` идэвхжүүл
4. `Geocoding API` идэвхжүүл
5. `Directions API` идэвхжүүл (route optimization)
6. Credentials → Create API Key
7. HTTP Referrers хязгаарлалт: `*.here.now/*`, `localhost:3000/*`

```
API Key: AIzaSy... (example)
```

### 2.2 Frontend интеграц

```bash
npm install @react-google-maps/api
```

`.env.local`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
```

`app/components/GoogleMap.tsx`:
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '500px'
}

const defaultCenter = {
  lat: 47.919,
  lng: 106.917
}

// Recycling Centers (Supabase-аас авах)
const centers = [
  { id: 1, name: 'УБ Хог Хаягдлын Дахин Боловсруулах', lat: 47.919, lng: 106.917, materials: ['PET', 'HDPE', 'Цаас'] },
  { id: 2, name: 'Монголын Хог Хаягдлын Төв', lat: 47.886, lng: 106.905, materials: ['Хөнгөн цагаан', 'Шил'] },
  { id: 3, name: 'Мүпликс Байгаль', lat: 47.903, lng: 106.928, materials: ['PET', 'Цаас', 'Шил'] },
]

export default function RecyclingMap() {
  const [selectedCenter, setSelectedCenter] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [directions, setDirections] = useState(null)
  const [map, setMap] = useState(null)

  // Хэрэглэгчийн байршил авах
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          // Default: Улаанбаатар
          setUserLocation(defaultCenter)
        }
      )
    }
  }, [])

  // Хамгийн ойр төв хайх
  const findNearestCenter = () => {
    if (!userLocation || !map) return
    
    let nearest = null
    let minDistance = Infinity
    
    centers.forEach(center => {
      const distance = getDistance(userLocation, { lat: center.lat, lng: center.lng })
      if (distance < minDistance) {
        minDistance = distance
        nearest = center
      }
    })
    
    if (nearest) {
      setSelectedCenter(nearest)
      calculateRoute(nearest)
    }
  }

  // Route тооцоолох
  const calculateRoute = (destination) => {
    if (!userLocation || !window.google) return

    const directionsService = new window.google.maps.DirectionsService()
    
    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result)
        } else {
          console.error('Directions request failed:', status)
        }
      }
    )
  }

  // Haversine distance formula
  const getDistance = (p1, p2) => {
    const R = 6371 // km
    const dLat = (p2.lat - p1.lat) * Math.PI / 180
    const dLng = (p2.lng - p1.lng) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={findNearestCenter}
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium"
          >
            🧭 Хамгийн ойр төв хайх
          </button>
          <button
            onClick={() => setDirections(null)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
          >
            🗺️ Зургыг цэвэрлэх
          </button>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || defaultCenter}
          zoom={13}
          onLoad={setMap}
          options={{
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {/* Хэрэглэгчийн байршил */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              title="Таны байршил"
            />
          )}

          {/* Төвүүд */}
          {centers.map((center) => (
            <Marker
              key={center.id}
              position={{ lat: center.lat, lng: center.lng }}
              onClick={() => {
                setSelectedCenter(center)
                calculateRoute(center)
              }}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                scaledSize: new window.google.maps.Size(36, 36)
              }}
            />
          ))}

          {/* Info Window */}
          {selectedCenter && (
            <InfoWindow
              position={{ lat: selectedCenter.lat, lng: selectedCenter.lng }}
              onCloseClick={() => setSelectedCenter(null)}
            >
              <div className="p-2">
                <h3 className="font-bold text-sm">{selectedCenter.name}</h3>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {selectedCenter.materials.map((m) => (
                    <span key={m} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </InfoWindow>
          )}

          {/* Directions */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#22c55e',
                  strokeWeight: 5
                }
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  )
}
```

### 2.3 Pickup Tracking (Driver route visualization)

```tsx
// Driver route tracking with real-time updates
import { useEffect, useState } from 'react'

export function DriverTracker({ pickupId, driverLocation }) {
  const [route, setRoute] = useState(null)
  const [eta, setEta] = useState(null)

  useEffect(() => {
    // WebSocket эсвэл Supabase Realtime ашиглан жолоочийн байршил хүлээн авах
    const channel = supabase
      .channel(`pickup_${pickupId}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'pickups', filter: `id=eq.${pickupId}` },
        (payload) => {
          const newLocation = payload.new.driver_location
          if (newLocation) {
            updateRoute(newLocation)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [pickupId])

  const updateRoute = (driverLoc) => {
    // Google Directions API-ээр route шинэчлэх
    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route({
      origin: driverLoc,
      destination: userLocation,
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === 'OK') {
        setRoute(result)
        const duration = result.routes[0].legs[0].duration.text
        setEta(duration)
      }
    })
  }

  return (
    <div>
      {eta && <div className="text-sm font-medium">Жолооч: {eta} дотор ирнэ</div>}
      {/* Map component */}
    </div>
  )
}
```

### 2.4 Supabase Realtime (Live tracking)

```typescript
// lib/realtime.ts
import { supabase } from './supabase'

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

// Driver location update (every 30 seconds)
export const updateDriverLocation = async (pickupId: string, lat: number, lng: number) => {
  return supabase
    .from('pickups')
    .update({
      driver_location: { lat, lng },
      updated_at: new Date().toISOString()
    })
    .eq('id', pickupId)
}
```

---

## 3. Backend API (FastAPI) - Node.js-ийн оронд

### 3.1 FastAPI сервер

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel
import os

app = FastAPI(title="GreenLoop AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production-д here.now URL хязгаарлах
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_KEY")
)

# Models
class SubmissionCreate(BaseModel):
    user_id: str
    material_type: str
    weight_kg: float
    location_lat: float
    location_lng: float

class CO2Calculation(BaseModel):
    material_type: str
    weight_kg: float

# CO2 Calculation endpoint
@app.post("/api/calculate-co2")
async def calculate_co2(data: CO2Calculation):
    materials = {
        'pet': {'co2': 3.5, 'price': -2800, 'name': 'Хуванцар PET'},
        'hdpe': {'co2': 2.8, 'price': -2100, 'name': 'Хуванцар HDPE'},
        'paper': {'co2': 1.2, 'price': -900, 'name': 'Цаас'},
        'aluminum': {'co2': 9.0, 'price': -7200, 'name': 'Хөнгөн цагаан'},
        'glass': {'co2': 0.9, 'price': -700, 'name': 'Шил'},
    }
    
    coeff = materials.get(data.material_type)
    if not coeff:
        raise HTTPException(status_code=400, detail="Unknown material type")
    
    co2_saved = coeff['co2'] * data.weight_kg
    price = coeff['price'] * data.weight_kg
    eco_points = int(co2_saved * 2 + 5)
    
    return {
        "co2_saved": round(co2_saved, 1),
        "price": int(price),
        "eco_points": eco_points,
        "material_name": coeff['name'],
        "trees_equivalent": round(co2_saved / 22, 2)
    }

# Create submission
@app.post("/api/submissions")
async def create_submission(data: SubmissionCreate):
    calc = await calculate_co2(CO2Calculation(
        material_type=data.material_type,
        weight_kg=data.weight_kg
    ))
    
    submission = {
        "user_id": data.user_id,
        "material_type": data.material_type,
        "weight_kg": data.weight_kg,
        "co2_saved": calc["co2_saved"],
        "eco_points_earned": calc["eco_points"],
        "location_lat": data.location_lat,
        "location_lng": data.location_lng,
    }
    
    result = supabase.table("submissions").insert(submission).execute()
    
    # Update user stats
    supabase.rpc("update_user_stats", {
        "user_id": data.user_id,
        "co2_added": calc["co2_saved"],
        "points_added": calc["eco_points"]
    }).execute()
    
    return result.data

# Get leaderboard
@app.get("/api/leaderboard")
async def get_leaderboard(period: str = "all_time"):
    result = supabase.table("leaderboard")\
        .select("*, users(name, avatar_url)")\
        .eq("period", period)\
        .order("co2_saved", desc=True)\
        .limit(50)\
        .execute()
    return result.data

# Get pickup tracking
@app.get("/api/pickups/{tracking_code}")
async def get_pickup(tracking_code: str):
    result = supabase.table("pickups")\
        .select("*")\
        .eq("tracking_code", tracking_code)\
        .single()\
        .execute()
    
    if not result.data:
        raise HTTPException(status_code=404, detail="Pickup not found")
    
    return result.data

# Update pickup status (Admin/Driver only)
@app.patch("/api/pickups/{pickup_id}/status")
async def update_pickup_status(pickup_id: str, status: str):
    valid_statuses = ['requested', 'driver_assigned', 'collecting', 'delivered', 'processed']
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    update_data = {
        "status": status,
        f"{status}_at": "now()"
    }
    
    result = supabase.table("pickups")\
        .update(update_data)\
        .eq("id", pickup_id)\
        .execute()
    
    return result.data
```

---

## 4. Хурдан эхлүүлэх командууд

```bash
# 1. Supabase client суулгах
npm install @supabase/supabase-js

# 2. Google Maps React суулгах
npm install @react-google-maps/api

# 3. QR code суулгах
npm install qrcode.react

# 4. Chart.js (admin dashboard)
npm install chart.js react-chartjs-2

# 5. .env.local файл үүсгэх
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
SUPABASE_SERVICE_KEY=your-service-role-key
EOF
```

---

## 5. API Key хадгалах

```bash
# here.now API key (хэрэв ашиглах бол)
mkdir -p ~/.herenow && echo "your-api-key" > ~/.herenow/credentials && chmod 600 ~/.herenow/credentials

# Supabase service key (backend-д)
export SUPABASE_URL=https://your-project.supabase.co
export SUPABASE_SERVICE_KEY=your-service-key
```
