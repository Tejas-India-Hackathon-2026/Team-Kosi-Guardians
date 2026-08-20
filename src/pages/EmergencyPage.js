// Emergency & Rescue Ground Operations Module
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderEmergencyPage() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();
  const rescueOps = data.rescueOperations || {};
  const sosList = rescueOps.sosRequests || [];
  const boats = rescueOps.boatFleet || [];
  const drones = rescueOps.droneSurveillance || [];

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-red-500/40 bg-gradient-to-r from-slate-900 via-slate-950 to-red-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs font-semibold mb-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            LIVE DISASTER GROUND OPERATIONS ROOM
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.emergencyTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.emergencySubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button 
            onclick="window.openQuickSOSModal()"
            class="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-700/40 flex items-center gap-2 animate-pulse uppercase tracking-wider transition"
          >
            <span>🚨</span> Broadcast New SOS Distress
          </button>
        </div>
      </div>

      <!-- Emergency Operational Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div class="p-4 rounded-xl glass-panel border border-red-500/50 bg-red-950/30 space-y-1 shadow-lg shadow-red-950/40">
          <div class="flex items-center justify-between">
            <span class="text-xs text-red-300 uppercase font-semibold">Active SOS Beacons</span>
            <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          </div>
          <div class="text-3xl font-extrabold text-red-400 font-heading">${sosList.filter(s => s.status !== 'RESCUED').length} Urgent</div>
          <div class="text-[10px] text-red-300 font-medium">NDRF / SDRF Triage Active</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-slate-800 bg-slate-900/80 space-y-1">
          <span class="text-xs text-slate-400 uppercase font-semibold">Watercraft Fleet</span>
          <div class="text-3xl font-extrabold text-cyan-400 font-heading">${boats.length} Boats</div>
          <div class="text-[10px] text-slate-400">Motorized Inflatable & Launchers</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-slate-800 bg-slate-900/80 space-y-1">
          <span class="text-xs text-slate-400 uppercase font-semibold">Aerial Drones In Air</span>
          <div class="text-3xl font-extrabold text-sky-400 font-heading">${drones.length} UAVs</div>
          <div class="text-[10px] text-slate-400">Thermal Inundation Live Feeds</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-emerald-500/40 bg-emerald-950/20 space-y-1">
          <span class="text-xs text-emerald-300 uppercase font-semibold">Citizens Rescued</span>
          <div class="text-3xl font-extrabold text-emerald-400 font-heading">842 Persons</div>
          <div class="text-[10px] text-emerald-400">Evacuated to High Ground Today</div>
        </div>

      </div>

      <!-- Main Operational Layout: SOS Triage Queue & Interactive Tactical Map -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: SOS Distress Queue -->
        <div class="lg:col-span-2 space-y-6">
          
          <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white font-heading flex items-center gap-2">
                  <span>🆘</span> ${t.trappedPersons}
                </h3>
                <p class="text-xs text-slate-400">
                  Priority-sorted distress calls from cut-off diara islands and embankment breeches.
                </p>
              </div>
              <span class="px-2.5 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-xs font-mono font-bold">
                Live Dispatch
              </span>
            </div>

            <!-- SOS Cards -->
            <div class="space-y-4">
              ${sosList.map((sos) => {
                const isCrit = sos.urgency === 'CRITICAL';
                const isRescued = sos.status === 'RESCUED';
                const isDispatched = sos.status === 'BOAT_DISPATCHED';

                return `
                  <div class="p-4 rounded-xl bg-slate-950 border ${isRescued ? 'border-emerald-500/40 opacity-75' : isCrit ? 'border-red-500/60 shadow-lg shadow-red-950/30' : 'border-slate-800'} space-y-3">
                    
                    <div class="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs font-bold text-red-400">${sos.id}</span>
                          <span class="text-xs text-slate-400">• Reported ${sos.reportedAt}</span>
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isCrit ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300'
                          }">
                            ${sos.urgency}
                          </span>
                        </div>
                        <h4 class="text-sm font-bold text-white mt-1">
                          ${sos.name} <span class="text-xs text-slate-400 font-normal">(${sos.phone})</span>
                        </h4>
                      </div>

                      <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                        isRescued ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : isDispatched ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }">
                        ${sos.status.replace('_', ' ')}
                      </span>
                    </div>

                    <!-- Details Box -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                      <div>
                        <span class="text-slate-400 text-[10px] uppercase">Location:</span>
                        <div class="font-semibold text-white">${sos.locationName}</div>
                      </div>
                      <div>
                        <span class="text-slate-400 text-[10px] uppercase">Trapped Citizens:</span>
                        <div class="font-bold text-red-300">${sos.peopleCount} Persons ${sos.hasInfants ? '👶 Infants' : ''} ${sos.hasElderly ? '👵 Elderly' : ''}</div>
                      </div>
                      <div>
                        <span class="text-slate-400 text-[10px] uppercase">Threat Level:</span>
                        <div class="font-semibold text-amber-300">${sos.waterLevelRising}</div>
                      </div>
                    </div>

                    <!-- Action Toolbar -->
                    <div class="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                      <div class="text-slate-300">
                        <span class="text-slate-400">Assigned Unit:</span>
                        <strong class="text-cyan-300 ml-1">${sos.assignedUnit || 'Seeking Craft'}</strong>
                        ${sos.etaMinutes ? `<span class="text-slate-400 font-mono text-[11px]"> (ETA ~${sos.etaMinutes}m)</span>` : ''}
                      </div>

                      <div class="flex items-center gap-2">
                        ${!isRescued ? `
                          ${!isDispatched ? `
                            <button 
                              onclick="window.dispatchRescueBoat('${sos.id}')"
                              class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition"
                            >
                              🚤 ${t.dispatchBoat}
                            </button>
                          ` : ''}
                          <button 
                            onclick="window.markSOSRescued('${sos.id}')"
                            class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition"
                          >
                            ✓ ${t.markRescued}
                          </button>
                        ` : `
                          <span class="text-emerald-400 font-bold text-xs flex items-center gap-1">
                            ✓ Safely Transported to Safe Shelter
                          </span>
                        `}
                      </div>
                    </div>

                  </div>
                `;
              }).join('')}
            </div>

          </div>

          <!-- Tactical Live Map -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white font-heading">
                Tactical Emergency Map (SOS Beacons & Watercraft Fleet)
              </h3>
              <span class="text-xs text-slate-400">Real-time GPS Tracking</span>
            </div>
            <div id="emergency-map" class="w-full h-80 rounded-xl border border-slate-800 bg-slate-950 shadow-inner"></div>
          </div>

        </div>

        <!-- Right 1 Col: Watercraft Fleet & Aerial Drone Feeds -->
        <div class="space-y-6">
          
          <!-- Boat Fleet List -->
          <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white font-heading flex items-center gap-2">
                <span>🚤</span> ${t.boatFleetTitle}
              </h3>
              <span class="text-xs text-cyan-400 font-bold font-mono">4 Ready</span>
            </div>

            <div class="space-y-3 text-xs">
              ${boats.map((b) => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-white">${b.name}</div>
                    <div class="text-slate-400 text-[11px]">${b.type} • Cap: ${b.capacity} Persons</div>
                    <div class="text-slate-500 text-[10px]">Base: ${b.location}</div>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                    b.status === 'ON_MISSION' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
                  }">
                    ${b.status}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Aerial Drone Surveillance Feed -->
          <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="text-sm font-bold text-white font-heading flex items-center gap-2">
                <span>🛸</span> ${t.droneSurveillanceTitle}
              </h3>
              <span class="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded text-[10px] font-bold animate-pulse">
                REC LIVE
              </span>
            </div>

            <div class="space-y-3 text-xs">
              ${drones.map((dr) => `
                <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="font-bold text-white">${dr.model}</div>
                    <span class="font-mono text-emerald-400 text-[10px]">🔋 ${dr.batteryPct}%</span>
                  </div>
                  <div class="text-slate-300 text-[11px]">
                    <span class="text-slate-500">Mission:</span> ${dr.targetArea}
                  </div>
                  <div class="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                    <span>Altitude: ${dr.flightAltMeters}m</span>
                    <span class="text-emerald-400">Stream: 1080p 60fps</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Community Volunteer Network (SHGs) -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-2 text-xs">
            <h4 class="font-bold text-white flex items-center gap-2">
              <span>🤝</span> Community Frontline Network (Jeevika SHGs)
            </h4>
            <p class="text-slate-400 text-[11px] leading-relaxed">
              48 registered Panchayat response volunteers coordinating village dry ration packages and cattle fodder.
            </p>
          </div>

        </div>

      </div>

    </div>
  `;
}
