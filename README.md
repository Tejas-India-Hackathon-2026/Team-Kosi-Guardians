# 🌊 KosiManthan – Flood Relief & Agricultural Recovery Platform

> **"From Flood Warning to Agricultural Recovery"**  
> *"बाढ़ चेतावनी से कृषि पुनरुद्धार तक"*

KosiManthan is a modern, responsive, full-stack disaster management and agricultural resilience platform engineered specifically for the vulnerable **Kosi River Basin (North Bihar)** — covering Supaul, Saharsa, Madhepura, and Khagaria districts.

---

## 🌟 Key Features & Complete Disaster Lifecycle

KosiManthan connects technology, ground logistics, and government administration across all 7 operational phases:

1. **🌊 Early Flood Warning (`/early-warning`)**
   - Live telemetry from Birpur Barrage and 6 gauging stations.
   - 4-Tier Risk indicators: 🟢 Safe, 🟡 Watch, 🟠 Warning, 🔴 Critical.
   - Real-time discharge curves (cusecs) and danger mark metrics.
   - Interactive Leaflet basin map with safe high-ground shelters and evacuation corridors.
   - Low-bandwidth LoRa Mesh and FM Radio (87.5 MHz) offline broadcast simulator.

2. **🚚 Pre-Flood Asset Evacuation & Logistics (`/logistics`)**
   - Critical 24–48 hour response window counter.
   - Farmer evacuation request form (Crops, seed stock, 5HP pumps, dairy cattle).
   - Transporter dispatch hub with GPS distance matching (Haversine formula), payload capacity check, and 1-click dispatch.

3. **📷 AI-Based Crop Damage Verification (`/damage-report`)**
   - Geo-tagged field photo upload with EXIF metadata parsing.
   - **KosiVision AI (ResNet152)** multi-spectral damage engine:
     - Estimated loss % & model confidence score (e.g. 94%).
     - Sand casting / silt deposition thickness (cm).
     - Waterlogging duration & vegetative rot classification.
   - 1-Click automatic verified compensation claim generation.

4. **📄 Insurance & Direct Benefit Transfer (DBT) Compensation (`/claims`)**
   - End-to-end claim lifecycle: `Submitted ➔ AI Verified ➔ Officer Review ➔ Approved ➔ DBT Disbursed`.
   - Government officer approval interface with PFMS transaction ID generator.
   - **Official Printable Claim Dossier Certificate** with state seal, Sentinel-2 reference, and cryptographic signature.

5. **🌱 Post-Flood Soil Recovery & Agronomy Engine (`/soil-recovery`)**
   - **3-Pillar Recovery Workflow**:
     1. *Satellite Silt Mapping*: Farmland sand deposition depth overlay.
     2. *IoT Soil Testing*: Real-time N, P, K, pH, moisture, and silt depth telemetry.
     3. *AI Agronomist Recovery Guidance*: Tailored 60-day restoration roadmap (Sesbania/Dhaincha green manuring, Gypsum soil conditioning, and flood-tolerant Boro Rice / Maize varieties).

6. **🚨 Emergency & Ground Rescue Command (`/emergency`)**
   - Live SOS distress triage queue with urgency prioritization.
   - Watercraft fleet monitor (NDRF & SDRF motorboats, mechanized country craft).
   - Aerial drone surveillance video/telemetry feeds (DJI Matrice 350 RTK & IdeaForge SWITCH).
   - Community frontline coordination (Jeevika Self-Help Groups & Panchayats).

7. **🌾 Kisan Rural Portal (`/farmer/dashboard`)**
   - Tailored high-accessibility interface with large touch targets.
   - Bilingual voice-ready labels (English & हिन्दी).
   - Farm status cards (Flood threat level, evacuation tracker, claim payout status, soil health).

8. **🛡️ State & District Command Center (`/admin/dashboard`)**
   - Multi-tier administrative filters (District: Supaul, Saharsa, Madhepura, Khagaria; Block; Risk level).
   - Macro analytics for inundated hectares, evaluated losses, evacuated grain tonnage, and DBT clearance rates.
   - Unified geo-spatial master command map.

---

## 🛠️ Technology Stack

- **Frontend**: Modern ES6+ JavaScript, Tailwind CSS (3.4), Google Fonts (*Outfit*, *Inter*, *Noto Sans Devanagari*).
- **Interactive Maps**: Leaflet.js (OpenStreetMap + CartoDB tiles).
- **Visual Analytics**: Interactive canvas sparklines & progress meters.
- **Offline & PWA**: Service Worker (`service-worker.js`), Web App Manifest (`manifest.json`), LocalStorage & IndexedDB offline action queue.
- **Backend API**: Node.js, Express.js REST API with CORS.
- **Database Schema**: PostgreSQL with Prisma ORM (`server/prisma/schema.prisma`).
- **Bilingual Engine**: English & हिन्दी localized dictionary (`src/data/translations.js`).

---

## 🚀 Quick Start Guide

### Option 1: Direct Browser Launch (Instant Zero-Config Demo)
You can directly open `index.html` in any modern web browser or run any static server:
```bash
# Open index.html in browser directly, or run:
npx serve .
# or
python -m http.server 8080
```

### Option 2: Full-Stack Node.js Server
```bash
# Install backend dependencies
npm install

# Start Express REST API and static frontend
npm start
```
Visit `http://localhost:3000` to access KosiManthan.

---

## 👤 1-Click Role Switcher Demo

To test different role-specific workflows instantly during demonstrations, click the role badge in the navigation bar:

| Role | Demo Persona | Primary Responsibilities |
| :--- | :--- | :--- |
| **🌾 Farmer** | Ramesh Kumar Mandal | Request transport, upload damage photos, check soil health, track DBT. |
| **🚚 Transporter** | Kishore Yadav | Accept harvest evacuation requests, view GPS routes, manage payload. |
| **🏛️ Govt Officer** | Sunita Jha (BDO) | Field review, approve compensation payouts, authorize DBT transfer. |
| **🤝 NGO Volunteer** | Aarav Relief Foundation | Emergency relief distribution, community kitchen and shelter coordination. |
| **🛡️ Disaster Admin** | State BSDMA Admin | Master macro command center, regional sensor analytics, multi-district filters. |

---

## 📡 REST API Endpoints

### Authentication
- `POST /api/auth/register` — Register a new farmer or field operator.
- `POST /api/auth/login` — Login and receive JWT token.
- `GET /api/auth/me` — Retrieve active profile.

### Flood Early Warning
- `GET /api/flood/status` — Get Kosi basin warning level & Birpur discharge.
- `GET /api/flood/sensors` — List all 6 river telemetry sensors.
- `GET /api/flood/alerts` — Active emergency broadcast alerts.

### Logistics & Evacuation
- `POST /api/logistics/request` — Broadcast farmer evacuation request.
- `GET /api/logistics/requests` — Retrieve all active requests in basin.
- `PATCH /api/logistics/request/:id` — Update evacuation status.
- `POST /api/logistics/match` — GPS matching engine for transporters.

### AI Damage Verification
- `POST /api/damage/upload` — Upload geo-tagged field photos.
- `POST /api/damage/analyze` — Run KosiVision AI loss estimation.
- `GET /api/damage/:id` — Retrieve damage assessment details.

### Insurance & Claims
- `POST /api/claims` — Submit verified compensation claim.
- `GET /api/claims` — List all registered claims in registry.
- `PATCH /api/claims/:id/status` — Approve claim & trigger DBT payout.

### Soil Recovery
- `POST /api/soil/test` — Submit IoT soil sensor readings.
- `GET /api/soil/:farmerId` — Get plot soil health history.
- `POST /api/soil/recovery-plan` — Generate AI agronomist 60-day roadmap.

### Emergency & Rescue
- `POST /api/rescue/request` — Broadcast citizen SOS distress beacon.
- `GET /api/rescue/active` — Active rescue operations queue.
- `PATCH /api/rescue/:id` — Update rescue unit dispatch status.

---

## 🏛️ Emergency Helplines

- **National Disaster Relief (NDRF)**: `1078` / `011-24363260`
- **Bihar State Disaster Management (BSDMA)**: `1070`
- **Supaul Flood Control Cell**: `06473-222002`
- **Mesh Radio Broadcast**: `FM 87.5 MHz / LoRa Node KOSI-04`

---

*Developed for the Kosi Flood Relief & Agricultural Recovery Initiative, Bihar.*
