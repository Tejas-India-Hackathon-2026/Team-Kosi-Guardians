// Pre-Flood Logistics & Asset Evacuation Module
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';
import { logisticsService } from '../services/logisticsService.js';

export function renderLogisticsPage() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();
  const requests = data.transportRequests || [];
  const transporters = data.transporters || [];

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold mb-2">
            <span>🚚</span> 24–48 HOUR PRE-FLOOD ASSET EVACUATION NETWORK
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.logisticsTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.logisticsSubtitle}
          </p>
        </div>

        <button 
          onclick="document.getElementById('farmer-evac-form-section').scrollIntoView({ behavior: 'smooth' })"
          class="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition"
        >
          <span>➕</span>
          <span>${t.requestTransportBtn}</span>
        </button>
      </div>

      <!-- Main 2-Column Layout: Transporter Dispatch Hub & Farmer Request Form -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: Active Evacuation Dispatch Hub -->
        <div class="lg:col-span-2 space-y-6">
          
          <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold text-white font-heading">
                  Active Asset Evacuation Requests
                </h3>
                <p class="text-xs text-slate-400">
                  GPS-matched rural tractors, 4WD mini-trucks, and storage warehouses.
                </p>
              </div>
              <span class="px-3 py-1 bg-slate-800 text-emerald-300 text-xs font-mono font-bold rounded-lg border border-slate-700">
                ${requests.length} Requests in Basin
              </span>
            </div>

            <!-- Requests List -->
            <div class="space-y-4">
              ${requests.map((req) => {
                const isMatched = req.status === 'MATCHED' || req.status === 'IN_TRANSIT';
                const isPending = req.status === 'PENDING';
                const isCrit = req.urgency === 'CRITICAL';

                return `
                  <div class="p-5 rounded-xl bg-slate-950 border ${isCrit ? 'border-red-500/40' : 'border-slate-800'} space-y-3 shadow-md hover:border-emerald-500/40 transition">
                    
                    <div class="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono text-xs text-emerald-400 font-bold">${req.id}</span>
                          <span class="text-xs text-slate-400">• ${req.village}</span>
                          ${isCrit ? `<span class="px-2 py-0.5 bg-red-500/20 text-red-300 text-[10px] font-bold rounded uppercase">URGENT</span>` : ''}
                        </div>
                        <h4 class="text-sm font-bold text-white mt-0.5">
                          ${req.farmerName} <span class="text-xs text-slate-400 font-normal">(${req.phone})</span>
                        </h4>
                      </div>

                      <div class="flex items-center gap-2">
                        <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isMatched ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }">
                          ${req.status}
                        </span>
                      </div>
                    </div>

                    <!-- Details Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                      <div>
                        <span class="text-slate-400 text-[10px] uppercase">Crops & Seeds:</span>
                        <div class="font-semibold text-white">${req.cropType} (${req.quantity})</div>
                      </div>
                      <div>
                        <span class="text-slate-400 text-[10px] uppercase">Farm Machinery / Cattle:</span>
                        <div class="font-semibold text-amber-200">${req.equipment || 'None'}</div>
                      </div>
                      <div>
                        <span class="text-slate-400 text-[10px] uppercase">Safe Destination:</span>
                        <div class="font-semibold text-sky-300">${req.destination}</div>
                      </div>
                    </div>

                    <!-- Matching Info or Action -->
                    <div class="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                      ${isMatched ? `
                        <div class="flex items-center gap-2 text-emerald-300">
                          <span>🚚 Assigned:</span>
                          <strong class="text-white">${req.transporterName}</strong>
                          <span class="text-slate-400 font-mono">(ETA ~${req.etaMinutes || 20}m)</span>
                        </div>
                      ` : `
                        <div class="flex items-center gap-2 text-amber-400">
                          <span>⚠️ Seeking nearby tractor with &gt; 2T capacity</span>
                        </div>
                        <button 
                          onclick="window.quickMatchRequest('${req.id}')"
                          class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition"
                        >
                          ⚡ Auto-Match Nearest Transporter
                        </button>
                      `}
                    </div>

                  </div>
                `;
              }).join('')}
            </div>

          </div>

          <!-- Logistics Live Routing Map -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-bold text-white font-heading">
                Logistics & Transport Fleet Deployment Map
              </h3>
              <span class="text-xs text-slate-400">Showing 4 Available Vehicles & Active Routes</span>
            </div>
            <div id="logistics-map" class="w-full h-80 rounded-xl border border-slate-800 shadow-inner bg-slate-950"></div>
          </div>

        </div>

        <!-- Right 1 Col: Farmer Request Evacuation Form & Transporter Fleet -->
        <div class="space-y-6">
          
          <!-- Request Form -->
          <div id="farmer-evac-form-section" class="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-slate-900/90 space-y-4 shadow-xl">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white font-heading flex items-center gap-2">
                <span>🌾</span> ${t.evacFormTitle}
              </h3>
              <p class="text-[11px] text-slate-400">
                Broadcast harvest pickup request to rural transport network.
              </p>
            </div>

            <form id="farmer-evac-form" onsubmit="window.handleEvacRequestSubmit(event)" class="space-y-3.5 text-xs">
              
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Farmer Name</label>
                <input 
                  type="text" 
                  id="evac-farmer-name" 
                  required 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  value="Ramesh Kumar Mandal"
                />
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">Village</label>
                  <input 
                    type="text" 
                    id="evac-village" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    value="Marauna Ward 3"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">Contact Phone</label>
                  <input 
                    type="tel" 
                    id="evac-phone" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    value="+91 91224 81920"
                  />
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">${t.cropTypeLabel}</label>
                <input 
                  type="text" 
                  id="evac-crop" 
                  required 
                  placeholder="e.g. Aman Paddy (45 Bags) & Mustard seed"
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  value="Aman Paddy (50 Bags) + Wheat Seed Stock"
                />
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">${t.quantityLabel}</label>
                  <input 
                    type="text" 
                    id="evac-qty" 
                    required 
                    placeholder="2.5 Tonnes"
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                    value="2.5 Tonnes"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">${t.urgencyLabel}</label>
                  <select 
                    id="evac-urgency"
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    <option value="CRITICAL">🔴 Critical (&lt; 12h)</option>
                    <option value="HIGH" selected>🟠 High (12-24h)</option>
                    <option value="MEDIUM">🟡 Medium (24-48h)</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">${t.equipmentLabel}</label>
                <input 
                  type="text" 
                  id="evac-equipment" 
                  placeholder="e.g. 5HP Diesel Pump, Thresher, 3 Cows"
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  value="1x 5HP Irrigation Pump + 2 Milch Cows"
                />
              </div>

              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">${t.destinationLabel}</label>
                <input 
                  type="text" 
                  id="evac-destination" 
                  required 
                  placeholder="e.g. Supaul Central FCI Safe Godown"
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                  value="Supaul FCI Central Safe Godown"
                />
              </div>

              <button 
                type="submit"
                class="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 uppercase tracking-wide transition mt-2"
              >
                <span>📡</span> ${t.submitEvacRequest}
              </button>

            </form>
          </div>

          <!-- Registered Transporter Fleet List -->
          <div class="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-3">
            <h3 class="text-sm font-bold text-white font-heading">
              ${t.transporterFleet}
            </h3>
            
            <div class="space-y-2.5">
              ${transporters.map((tr) => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div class="font-bold text-white">${tr.name}</div>
                    <div class="text-slate-400 text-[11px]">${tr.vehicleType} • ${tr.capacityTonnes}T</div>
                    <div class="text-emerald-400 text-[10px]">⭐ ${tr.rating} (${tr.completedTrips} Trips)</div>
                  </div>
                  <div class="text-right">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                      tr.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }">
                      ${tr.status}
                    </span>
                    <div class="text-slate-500 text-[10px] mt-1">${tr.baseVillage}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
