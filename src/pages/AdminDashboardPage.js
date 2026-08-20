// Government & NGO Multi-Tier Command Center Dashboard
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderAdminDashboardPage(state = {}) {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();

  const selectedDistrict = state.selectedDistrict || 'ALL';
  const selectedRisk = state.selectedRisk || 'ALL';

  const sensors = data.sensors || [];
  const villages = data.villages || [];
  const requests = data.transportRequests || [];
  const claims = data.damageReports || [];
  const rescue = data.rescueOperations || {};

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-xs font-semibold mb-2">
            <span>🛡️</span> STATE & DISTRICT MULTI-TIER DISASTER COMMAND
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.adminTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.adminSubtitle}
          </p>
        </div>

        <!-- Administrative Multi-Tier Filters -->
        <div class="flex flex-wrap items-center gap-2 text-xs">
          <div>
            <select 
              id="admin-filter-district"
              onchange="window.handleAdminFilterChange()"
              class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-sky-500"
            >
              <option value="ALL">All Districts (Supaul, Saharsa, Madhepura, Khagaria)</option>
              <option value="Supaul">Supaul District</option>
              <option value="Saharsa">Saharsa District</option>
              <option value="Madhepura">Madhepura District</option>
              <option value="Khagaria">Khagaria District</option>
            </select>
          </div>
          <div>
            <select 
              id="admin-filter-risk"
              onchange="window.handleAdminFilterChange()"
              class="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-sky-500"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">🔴 Critical Only</option>
              <option value="WARNING">🟠 Warning Only</option>
              <option value="WATCH">🟡 Watch Only</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Macro Executive KPIs -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
        
        <div class="glass-panel p-3.5 rounded-xl border border-red-500/40 bg-red-950/20">
          <div class="text-[10px] text-red-300 uppercase font-semibold">Active Flood Zones</div>
          <div class="text-xl font-extrabold text-red-400 font-heading">6 Blocks</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Villages At Risk</div>
          <div class="text-xl font-extrabold text-white font-heading">${villages.length} Villages</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Farmers Alerted</div>
          <div class="text-xl font-extrabold text-sky-400 font-heading">18,400+</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
          <div class="text-[10px] text-emerald-300 uppercase font-semibold">Evacuation Tonnes</div>
          <div class="text-xl font-extrabold text-emerald-400 font-heading">1,480 T</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-amber-500/40 bg-amber-950/20">
          <div class="text-[10px] text-amber-300 uppercase font-semibold">Damage Claims</div>
          <div class="text-xl font-extrabold text-amber-300 font-heading">${claims.length} Claims</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
          <div class="text-[10px] text-slate-400 uppercase font-semibold">DBT Disbursed</div>
          <div class="text-xl font-extrabold text-emerald-400 font-heading">₹ 4.8 Cr</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Rescue Watercraft</div>
          <div class="text-xl font-extrabold text-cyan-400 font-heading">${rescue.boatFleet?.length || 4} Boats</div>
        </div>

        <div class="glass-panel p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
          <div class="text-[10px] text-slate-400 uppercase font-semibold">Soil Test Cases</div>
          <div class="text-xl font-extrabold text-teal-400 font-heading">${data.soilReports?.length || 2} Plots</div>
        </div>

      </div>

      <!-- Master Command Map & Geo-Spatial Overlays -->
      <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-lg font-bold text-white font-heading">
              Unified Geo-Spatial Operations Command Map
            </h3>
            <p class="text-xs text-slate-400">
              Real-time multi-layer synchronization: River Telemetry Sensors • Transporter Fleets • Safe Shelters • SOS Distress Beacons • Inundation Polygon.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="px-2.5 py-1 bg-red-500/20 text-red-300 rounded border border-red-500/30">🔴 Sensors</span>
            <span class="px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">🚚 Fleets</span>
            <span class="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">🚤 Boats</span>
            <span class="px-2.5 py-1 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">🏥 Shelters</span>
          </div>
        </div>

        <div id="admin-master-map" class="w-full h-96 rounded-xl border border-slate-800 bg-slate-950 shadow-inner"></div>
      </div>

      <!-- Macro Analytics Section: Charts & Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Chart 1: Discharge Curves & Danger Level Analysis -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-white font-heading">
              🌊 River Discharge Telemetry vs Danger Limits (cusecs)
            </h3>
            <span class="text-[10px] text-red-400 font-mono font-bold">Peak Alert</span>
          </div>

          <div class="space-y-3 text-xs">
            ${sensors.map((s) => {
              const isCrit = s.status === 'CRITICAL';
              const isWarn = s.status === 'WARNING';
              const barPct = Math.min(100, Math.max(15, Math.round((s.currentLevel / 80) * 100)));

              return `
                <div class="space-y-1">
                  <div class="flex items-center justify-between text-xs">
                    <span class="font-medium text-slate-200">${s.name}</span>
                    <span class="font-mono ${isCrit ? 'text-red-400 font-bold' : isWarn ? 'text-amber-300' : 'text-emerald-400'}">
                      ${s.currentLevel}m (${s.discharge})
                    </span>
                  </div>
                  <div class="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      class="h-full rounded-full bg-gradient-to-r ${isCrit ? 'from-amber-500 to-red-600' : 'from-sky-500 to-cyan-400'}"
                      style="width: ${barPct}%"
                    ></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Chart 2: Direct Benefit Transfer (DBT) Payout Progress -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 class="text-sm font-bold text-white font-heading">
              💳 Compensation Claim Processing Velocity
            </h3>
            <span class="text-[10px] text-emerald-400 font-mono font-bold">100% Digital Flow</span>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-white">AI Vision Auto-Verified</span>
                <div class="text-[11px] text-slate-400">Within 2 minutes of photo upload</div>
              </div>
              <span class="font-mono text-emerald-400 font-bold text-sm">94.2%</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-white">Circle Officer Field Clearance</span>
                <div class="text-[11px] text-slate-400">Average review latency: 3.4 hours</div>
              </div>
              <span class="font-mono text-sky-400 font-bold text-sm">88.5%</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-bold text-white">PFMS Direct Bank Account Disbursal</span>
                <div class="text-[11px] text-slate-400">Aadhaar enabled payment system (AePS)</div>
              </div>
              <span class="font-mono text-teal-400 font-bold text-sm">₹ 4.82 Cr</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}
