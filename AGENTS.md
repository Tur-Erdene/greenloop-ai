# AGENTS.md

# GreenLoop AI — Agents System

## Overview

GreenLoop AI uses specialized agents
to coordinate sustainability workflows,
CO2 calculations,
pickup logistics,
and environmental impact tracking.

---

# Core Agents

## 1. CO2Agent

### Purpose

Calculate environmental impact from recycled materials.

### Responsibilities

* Calculate CO2 reduction
* Estimate energy savings
* Convert recycling into environmental metrics
* Generate sustainability summaries

### Input

* material type
* weight
* location
* recycling status

### Output

* CO2 reduced
* energy saved
* equivalent tree impact

### Example

2kg PET
→ 5.4kg CO2 reduced

---

## 2. RouteAgent

### Purpose

Optimize recycling pickup flow.

### Responsibilities

* pickup assignment
* ETA calculation
* route optimization
* driver tracking
* center delivery coordination

### Features

* Google Maps integration
* live route tracking
* pickup event updates

### Status Flow

Requested
→ Driver Assigned
→ Collecting
→ Delivered

---

## 3. RewardAgent

### Purpose

Encourage sustainable behavior.

### Responsibilities

* calculate user rewards
* assign badges
* update leaderboard
* gamification scoring

### Reward Types

* eco points
* badges
* achievement levels
* donation milestones

---

## 4. TreeAgent

### Purpose

Track tree funding contributions.

### Responsibilities

* convert donations into tree funding
* track planting campaigns
* maintain GPS tree records
* yearly tree updates

### Output

* funded tree count
* tree locations
* environmental impact

---

## 5. ESGAgent

### Purpose

Generate sustainability analytics.

### Responsibilities

* business ESG reports
* CO2 analytics
* environmental dashboards
* sustainability insights

### Future Scope

* carbon credits
* government reporting
* ESG scoring

---

# Agent Communication Rules

## All agents must:

* log important events
* maintain transparency
* avoid fake sustainability claims
* prioritize accurate calculations

## Event Bus

Agents communicate through:

* event queue
* webhook events
* database triggers

---

# Agent Priorities

1. Transparency
2. Environmental accuracy
3. User engagement
4. Scalability
5. Automation

---

# Future Expansion

Potential future agents:

* CarbonCreditAgent
* SmartSortingAgent
* MarketplaceAgent
* SustainabilityAdvisorAgent
