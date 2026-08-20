// Early Warning Module for Kosi River Basin
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderEarlyWarningPage() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();
  const sensors = data.sensors || [];
  const villages = data.villages || [];
  const shelters = data.shelters || [];

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-sky-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs font-semibold mb-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            LIVE BASIN TELEMETRY ACTIVE
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.ewTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.ewSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs">
            <span class="text-slate-400">Birpur Discharge:</span>
            <span class="font-mono font-bold text-red-400 text-sm ml-1">385,420 cusecs</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs">
            <span class="text-slate-400">Peak Forecast:</span>
            <span class="font-mono font-bold text-amber-300 text-sm ml-1">+32 Hours Window</span>
          </div>
        </div>
      </div>

      <!-- Risk Level Indicators Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div class="p-4 rounded-xl glass-panel border border-emerald-500/40 bg-emerald-950/20 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-400 uppercase">🟢 01 ${t.riskSafe}</span>
            <span class="text-xs text-slate-400">&lt; 150k cusecs</span>
          </div>
          <div class="text-xs text-slate-300">Normal river channel flow. No inundation risk.</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-amber-500/40 bg-amber-950/20 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-amber-400 uppercase">🟡 02 ${t.riskWatch}</span>
            <span class="text-xs text-slate-400">150k - 250k</span>
          </div>
          <div class="text-xs text-slate-300">Embankment patrol activated. Farmers alerted.</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-orange-500/40 bg-orange-950/20 space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-orange-400 uppercase">🟠 03 ${t.riskWarning}</span>
            <span class="text-xs text-slate-400">250k - 350k</span>
          </div>
          <div class="text-xs text-slate-300">24-48h pre-flood asset evacuation mandatory.</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-red-500/50 bg-red-950/30 space-y-1 shadow-lg shadow-red-950/50">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-red-400 uppercase">🔴 04 ${t.riskCritical}</span>
            <span class="text-xs text-red-300 font-bold">&gt; 350k cusecs</span>
          </div>
          <div class="text-xs text-slate-300">Immediate human rescue and high-ground refuge.</div>
        </div>

      </div>

      <!-- Live River Sensors Grid -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-white font-heading">
            Gauging Stations & IoT Telemetry Nodes
          </h3>
          <span class="text-xs text-slate-400">Updated every 5 minutes via LoRa Gateway</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${sensors.map((s) => {
            const isCrit = s.status === 'CRITICAL';
            const isWarn = s.status === 'WARNING';
            const isWatch = s.status === 'WATCH';
            const borderCol = isCrit ? 'border-red-500/60' : isWarn ? 'border-amber-500/60' : isWatch ? 'border-yellow-500/40' : 'border-emerald-500/40';
            const bgBadge = isCrit ? 'bg-red-500/20 text-red-300 border-red-500/40' : isWarn ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

            return `
              <div class="glass-panel rounded-2xl p-5 border ${borderCol} bg-slate-900/80 space-y-4 shadow-lg">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="font-mono text-[10px] text-slate-400">${s.id} • ${s.district}</span>
                    <h4 class="text-sm font-bold text-white">${s.name}</h4>
                  </div>
                  <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full border ${bgBadge}">
                    ${s.status}
                  </span>
                </div>

                <!-- Metrics Display -->
                <div class="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div>
                    <div class="text-slate-400 text-[10px] uppercase">Water Level</div>
                    <div class="text-lg font-extrabold ${isCrit ? 'text-red-400' : 'text-slate-100'} font-mono">
                      ${s.currentLevel} m
                    </div>
                    <div class="text-[10px] text-slate-500">Danger: ${s.dangerLevel} m</div>
                  </div>
                  <div>
                    <div class="text-slate-400 text-[10px] uppercase">Discharge Rate</div>
                    <div class="text-sm font-bold text-white font-mono mt-0.5">
                      ${s.discharge}
                    </div>
                    <div class="text-[10px] text-emerald-400">${s.trend}</div>
                  </div>
                </div>

                <!-- Sparkline Trend Simulation -->
                <div class="space-y-1">
                  <div class="flex items-center justify-between text-[10px] text-slate-400">
                    <span>6-Hour Gauge Curve</span>
                    <span class="font-mono">Battery: ${s.battery}%</span>
                  </div>
                  <div class="h-8 flex items-end gap-1.5 pt-1">
                    ${s.history.map((val, idx) => {
                      const heightPct = Math.min(100, Math.max(20, Math.round(((val - 30) / 50) * 100)));
                      return `
                        <div 
                          class="flex-1 bg-gradient-to-t ${isCrit ? 'from-red-600 to-rose-400' : 'from-sky-600 to-cyan-400'} rounded-t"
                          style="height: ${heightPct}%;"
                          title="${val}m"
                        ></div>
                      `;
                    }).join('')}
                  </div>
                </div>

                <div class="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800">
                  <span>Last synced: ${s.lastUpdated}</span>
                  <span class="text-sky-400 font-mono">Lat: ${s.lat.toFixed(2)}, Lng: ${s.lng.toFixed(2)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Interactive Map & Vulnerable Villages Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: Interactive Leaflet Basin Map -->
        <div class="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-white font-heading">
                Interactive Kosi Basin Flood Inundation & Shelter Map
              </h3>
              <p class="text-xs text-slate-400">
                Click any sensor node or safe shelter for capacity, discharge and medical readiness.
              </p>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300">
                🌊 River Corridor
              </span>
              <span class="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-sky-300">
                🏥 Safe Shelters
              </span>
            </div>
          </div>

          <!-- Leaflet Map Container -->
          <div id="early-warning-map" class="w-full h-96 rounded-xl border border-slate-800 relative shadow-inner bg-slate-950"></div>
        </div>

        <!-- Right 1 Col: Designated High-Ground Safe Shelters -->
        <div class="glass-panel p-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-white font-heading">
              ${t.safeShelters}
            </h3>
            <span class="text-xs text-emerald-400 font-bold">4 Active Camps</span>
          </div>

          <div class="space-y-3 overflow-y-auto max-h-96 pr-1">
            ${shelters.map((sh) => `
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition space-y-2">
                <div class="flex items-start justify-between">
                  <h4 class="text-xs font-bold text-white">${sh.name}</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">
                    ${sh.occupied} / ${sh.capacity}
                  </span>
                </div>
                
                <!-- Occupancy Bar -->
                <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    class="bg-gradient-to-r from-emerald-500 to-sky-400 h-full rounded-full"
                    style="width: ${(sh.occupied / sh.capacity) * 100}%"
                  ></div>
                </div>

                <div class="text-[11px] text-slate-400">
                  <span class="font-medium text-slate-300">Facilities:</span> ${sh.facilities.join(' • ')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}
