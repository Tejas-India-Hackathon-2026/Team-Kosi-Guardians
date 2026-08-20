// Landing Page Component for KosiManthan Platform
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderLandingPage() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();

  const discharge = data.systemStatus?.dischargeAtBirpur || '385,420 cusecs';
  const evacHours = data.systemStatus?.evacuationWindowHours || 32;

  return `
    <div class="space-y-20">
      
      <!-- HERO SECTION -->
      <section class="relative rounded-3xl overflow-hidden glass-panel border border-slate-700/80 p-8 sm:p-12 lg:p-16 shadow-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-900/90">
        
        <!-- Background Ambient Water Glow -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        <div class="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          <!-- Evacuation Window Pill -->
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-950/40">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>🚨 ${t.evacuationCountdown}: <strong class="font-mono text-amber-200 text-sm">${evacHours} ${t.hoursRemaining}</strong></span>
          </div>

          <!-- Hero Main Title -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-amber-300">
              ${t.brandName}
            </span>
            <br />
            <span class="text-2xl sm:text-4xl lg:text-5xl text-slate-100 font-bold">
              ${t.heroTitle}
            </span>
          </h1>

          <!-- Subtitle -->
          <p class="text-sm sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            ${t.heroSubtitle}
          </p>

          <!-- Key Live Indicator Bar -->
          <div class="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 p-3.5 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs font-medium text-slate-300 shadow-inner">
            <div class="flex items-center gap-2">
              <span class="text-sky-400">🌊</span>
              <span>${t.liveDischarge}: <strong class="text-white font-mono text-sm">${discharge}</strong></span>
            </div>
            <div class="hidden sm:block w-px h-4 bg-slate-700"></div>
            <div class="flex items-center gap-2">
              <span class="text-emerald-400">📡</span>
              <span>Kosi Basin Stations: <strong class="text-white">6 Active Gauges</strong></span>
            </div>
            <div class="hidden sm:block w-px h-4 bg-slate-700"></div>
            <div class="flex items-center gap-2">
              <span class="text-amber-400">📻</span>
              <span>Offline Mesh Relay: <strong class="text-emerald-400">Active (87.5 FM)</strong></span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onclick="window.appNavigate('early-warning')"
              class="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white shadow-lg shadow-sky-600/30 border border-sky-400/40 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>🌊</span>
              <span>${t.btnCheckFloodRisk}</span>
            </button>

            <button 
              onclick="window.appNavigate('damage-report')"
              class="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/40 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>📷</span>
              <span>${t.btnReportCropDamage}</span>
            </button>

            <button 
              onclick="window.appNavigate('soil-recovery')"
              class="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400/40 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>🌱</span>
              <span>${t.btnGetRecoveryPlan}</span>
            </button>

            <button 
              onclick="window.appNavigate('emergency')"
              class="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-red-400 border border-red-500/40 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <span>🚨</span>
              <span>${t.btnEmergencyDashboard}</span>
            </button>
          </div>

        </div>
      </section>

      <!-- 4 CORE SOLUTION PILLARS -->
      <section class="space-y-8">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-heading text-white">
            Comprehensive Disaster Resilience Pillars
          </h2>
          <p class="text-sm text-slate-400">
            Engineered specifically for rural terrains, low-connectivity networks, and flash flood dynamics of the Kosi Basin.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <!-- Card 1 -->
          <div 
            onclick="window.appNavigate('early-warning')"
            class="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 cursor-pointer border border-sky-500/30 bg-slate-900/60 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center text-2xl shadow-lg shadow-sky-500/20">
                🌊
              </div>
              <h3 class="text-lg font-bold text-white font-heading">${t.pillar1Title}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t.pillar1Desc}
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-sky-400 font-semibold">
              <span>View River Telemetry</span>
              <span>→</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div 
            onclick="window.appNavigate('logistics')"
            class="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 cursor-pointer border border-emerald-500/30 bg-slate-900/60 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">
                🚚
              </div>
              <h3 class="text-lg font-bold text-white font-heading">${t.pillar2Title}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t.pillar2Desc}
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Dispatch Evacuation Fleet</span>
              <span>→</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div 
            onclick="window.appNavigate('damage-report')"
            class="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 cursor-pointer border border-amber-500/30 bg-slate-900/60 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
                📷
              </div>
              <h3 class="text-lg font-bold text-white font-heading">${t.pillar3Title}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t.pillar3Desc}
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Analyze Field Photos</span>
              <span>→</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div 
            onclick="window.appNavigate('soil-recovery')"
            class="glass-panel glass-panel-hover rounded-2xl p-6 space-y-4 cursor-pointer border border-teal-500/30 bg-slate-900/60 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20">
                🌱
              </div>
              <h3 class="text-lg font-bold text-white font-heading">${t.pillar4Title}</h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                ${t.pillar4Desc}
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-teal-400 font-semibold">
              <span>Get Soil Restoration Plan</span>
              <span>→</span>
            </div>
          </div>

        </div>
      </section>

      <!-- 12-STEP END-TO-END DISASTER & RECOVERY LIFECYCLE -->
      <section class="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 bg-slate-950/70 space-y-8">
        <div class="text-center max-w-3xl mx-auto space-y-2">
          <div class="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider rounded-full">
            Complete Integrated Lifecycle
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold font-heading text-white">
            ${t.flowTitle}
          </h2>
          <p class="text-sm text-slate-400">
            ${t.flowSubtitle}
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          ${[
            { num: "01", title: "Flood Sensor Telemetry", desc: "Birpur Barrage & 6 gauges detect water surge.", icon: "🌊" },
            { num: "02", title: "Risk Detection & AI Trend", desc: "Forecast discharge spike 24-48h ahead.", icon: "📈" },
            { num: "03", title: "Offline Mesh & FM Warning", desc: "Local radio & LoRa alerts reach farmers.", icon: "📻" },
            { num: "04", title: "Farmer Evacuation Request", desc: "Kisan lists grain bags, seeds & pumps.", icon: "🌾" },
            { num: "05", title: "GPS Transport Matching", desc: "Nearby tractor/truck matched in 15 mins.", icon: "🚚" },
            { num: "06", title: "Pre-Flood Asset Evacuation", desc: "Harvest stored in elevated safe godowns.", icon: "📦" },
            { num: "07", title: "Flood Inundation & Rescue", desc: "NDRF/SDRF boats & drones dispatch SOS.", icon: "🚤" },
            { num: "08", title: "Geo-tagged Photo Upload", desc: "Farmer clicks waterlogged crop photos.", icon: "📷" },
            { num: "09", title: "AI Damage Verification", desc: "Vision AI estimates loss % & sand depth.", icon: "🔍" },
            { num: "10", title: "Insurance & DBT Payout", desc: "Government officer 1-click approves claim.", icon: "💳" },
            { num: "11", title: "IoT & Satellite Soil Test", desc: "Analyze NPK loss & sand silt thickness.", icon: "🧪" },
            { num: "12", title: "AI Recovery Plan & Sowing", desc: "Dhaincha green manuring & Boro paddy.", icon: "🌱" }
          ].map((step) => `
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xl">${step.icon}</span>
                <span class="text-xs font-mono font-bold text-emerald-400">${step.num}</span>
              </div>
              <h4 class="text-xs font-bold text-white">${step.title}</h4>
              <p class="text-[11px] text-slate-400 leading-snug">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MACRO IMPACT NUMBERS -->
      <section class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="glass-panel p-6 rounded-2xl text-center space-y-1 border border-slate-800">
          <div class="text-3xl font-extrabold text-sky-400 font-heading">14</div>
          <div class="text-xs text-slate-400">${t.affectedVillagesCount}</div>
        </div>
        <div class="glass-panel p-6 rounded-2xl text-center space-y-1 border border-slate-800">
          <div class="text-3xl font-extrabold text-emerald-400 font-heading">1,480+ T</div>
          <div class="text-xs text-slate-400">${t.evacuatedTonnage}</div>
        </div>
        <div class="glass-panel p-6 rounded-2xl text-center space-y-1 border border-slate-800">
          <div class="text-3xl font-extrabold text-amber-400 font-heading">94%</div>
          <div class="text-xs text-slate-400">AI Damage Verification Accuracy</div>
        </div>
        <div class="glass-panel p-6 rounded-2xl text-center space-y-1 border border-slate-800">
          <div class="text-3xl font-extrabold text-teal-400 font-heading">₹ 4.8 Cr</div>
          <div class="text-xs text-slate-400">Direct DBT Compensation Disbursed</div>
        </div>
      </section>

    </div>
  `;
}
