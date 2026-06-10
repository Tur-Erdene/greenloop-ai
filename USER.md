# USER.md

# GreenLoop AI — User System Specification

---

## Overview

This document defines the user ecosystem for GreenLoop AI, including:

- Role system
- Eco levels
- Badge system
- CSR company users
- Sustainability scoring
- Leaderboards

The system is designed to gamify recycling and convert environmental actions into measurable CO₂ impact.

---

# 1. User Roles

## 1.1 Individual User (Citizen / Donor)

### Description
Normal users who contribute recyclable waste and generate environmental impact.

### Responsibilities
- Submit recyclable materials (plastic, paper, glass, metal)
- Request pickup via map
- Track recycling status
- View CO₂ impact

### Benefits
- Eco points
- Badges
- Eco level progression
- Leaderboard ranking

---

## 1.2 CSR Company User (Corporate Sustainability Account)

### Description
Organizations that fund or participate in sustainability initiatives.

### Responsibilities
- Sponsor recycling activities
- Track ESG / sustainability performance
- Engage employees in recycling programs

### Benefits
- CSR dashboard
- ESG reporting (PDF / analytics)
- Company sustainability score
- Corporate leaderboard ranking

---

## 1.3 Recycling Partner (Facility / Center)

### Description
Recycling centers that process collected materials.

### Responsibilities
- Accept pickup requests
- Process recyclable materials
- Update lifecycle tracking status
- Report processed quantities

### Benefits
- Supply flow visibility
- Pricing control per material type
- Operational analytics

---

## 1.4 Admin (System Operator)

### Description
Platform governance and validation role.

### Responsibilities
- Verify recycling partners
- Manage CO₂ calculation rules
- Handle disputes and fraud detection
- Monitor system analytics

---

# 2. Eco Level System

Users progress through eco levels based on total CO₂ saved.

| Level | Name | CO₂ Range |
|------|------|----------|
| 1 | Eco Newbie | 0 – 10 kg |
| 2 | Eco Starter | 10 – 50 kg |
| 3 | Eco Contributor | 50 – 200 kg |
| 4 | Eco Advocate | 200 – 500 kg |
| 5 | Eco Hero | 500 – 1000 kg |
| 6 | Eco Legend | 1000+ kg |

### Level Rules
- Auto-upgraded after each completed recycling event
- Unlocks badges and profile upgrades
- Higher levels improve leaderboard ranking weight

---

# 3. Badge System

Badges represent achievements and behavior milestones.

---

## 3.1 Recycling Badges
- Plastic Saver (10+ plastic submissions)
- Paper Hero
- Glass Recycler
- Multi-Material Expert

---

## 3.2 Impact Badges
- Tree Saver (100 kg CO₂ saved)
- Climate Protector (500 kg CO₂ saved)
- Carbon Neutral Contributor

---

## 3.3 Activity Badges
- First Drop (first recycling action)
- Bulk Recycler (10+ kg in one submission)
- Consistent Recycler (weekly streak)

---

## 3.4 CSR Badges
- Green Partner Company
- Sustainability Leader
- Carbon Offset Sponsor

---

# 4. Sustainability Scoring System

Each user has a **Sustainability Score (0–1000)**.

---

## 4.1 Individual Score Formula

Score =
(CO₂_saved × 2)

(recycling_events × 5)
(streak_bonus)
(badge_multiplier)
---

## 4.2 CSR Company Score Formula

Score =
(total_CO₂_offset × 1.5)

(employee_participation × 10)
(sponsored_projects × 50)
---

## 4.3 Score Purpose
- Rank users and companies
- Unlock rewards
- Measure sustainability performance

---

# 5. Leaderboard System

---

## 5.1 Leaderboard Types

### Individual Leaderboard
- Top CO₂ savers
- Weekly / Monthly / All-time rankings

### CSR Company Leaderboard
- Top sustainability companies
- ESG performance ranking

### Regional Leaderboard (Future)
- City / district-based ranking

---

## 5.2 Ranking Logic
Priority order:

1. CO₂ saved
2. Activity consistency
3. Recycling frequency

---

## 5.3 Reset Cycles
- Weekly reset → short-term competition
- Monthly rewards → incentive cycle
- All-time → permanent ranking

---

# 6. Core User Flow

1. User submits recyclable waste
2. System calculates CO₂ impact
3. Recycling partner collects materials
4. Status updated through lifecycle tracking
5. CO₂ and points added to user profile
6. Eco level + badges updated
7. Leaderboard recalculated
8. CSR dashboards updated (if applicable)

---

# 7. Design Principles

- Transparency of all scoring and CO₂ values
- Simple understanding of environmental impact
- Gamification through badges and levels
- Real-world traceability of waste lifecycle
- Motivation through ranking and rewards

---

# 8. Future Extensions

- Carbon credit integration
- Blockchain-based verification
- AI behavior prediction
- City-wide sustainability dashboards
- Government ESG reporting integration