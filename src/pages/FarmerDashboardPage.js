// Farmer Personal Portal Dashboard (Kisan Rural Interface)
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';
import { authService } from '../services/authService.js';

export function renderFarmerDashboardPage() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const user = authService.getCurrentUser();
  const data = storageService.getData();

  const myClaims = (data.damageReports || []).filter((c) => c.farmerId === 'FARM-001');
  const myEvacRequests = (data.transportRequests || []).filter((r) => r.farmerId === 'FARM-001');

  return `
    <div class="space-y-8">
      
      <!-- Welcome Hero Banner -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/60 via-slate-950 to-slate-900 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
            <span>🌾</span> KISAN FLOOD PREPAREDNESS & RECOVERY PORTAL
          </div>
          <h1 class="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            ${t.farmerWelcome}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            Village: <strong class="text-white">${user.village || 'Marauna'}</strong> • District: <strong class="text-white">${user.district || 'Supaul'}</strong> • Land: <strong class="text-emerald-400 font-mono">${user.landArea || '4.5 Acres'}</strong>
          </p>
        </div>

        <!-- High-contrast Flood Threat Alert Badge -->
        <div class="p-4 rounded-2xl bg-amber-950/60 border-2 border-amber-500/60 text-amber-200 text-xs space-y-1 shadow-lg shadow-amber-950/50">
          <div class="flex items-center gap-2 font-bold text-sm text-amber-300">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>⚠️ Kosi Basin Warning Active</span>
          </div>
          <div>Pre-flood evacuation window: <strong class="text-white font-mono text-sm">32 Hours Remaining</strong></div>
        </div>
      </div>

      <!-- 5 Big Touch Quick Action Buttons (Designed for Rural Low-Literacy Users) -->
      <div class="space-y-3">
        <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Quick Touch Actions / त्वरित किसान सेवाएं:
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          
          <!-- Action 1: SOS -->
          <button 
            onclick="window.openQuickSOSModal()"
            class="p-5 rounded-2xl bg-gradient-to-b from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-xl shadow-red-950/50 border border-red-400/50 text-center space-y-2 transform hover:-translate-y-1 transition group"
          >
            <div class="text-3xl group-hover:scale-110 transition">🚨</div>
            <div class="font-extrabold text-sm font-heading">${t.actionEmergencySOS}</div>
            <div class="text-[10px] text-red-200 font-medium">1-Tap Boat Dispatch</div>
          </button>

          <!-- Action 2: Transport -->
          <button 
            onclick="window.appNavigate('logistics')"
            class="p-5 rounded-2xl bg-gradient-to-b from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-xl shadow-emerald-950/50 border border-emerald-400/50 text-center space-y-2 transform hover:-translate-y-1 transition group"
          >
            <div class="text-3xl group-hover:scale-110 transition">🚚</div>
            <div class="font-extrabold text-sm font-heading">${t.actionRequestTransport}</div>
            <div class="text-[10px] text-emerald-200 font-medium">Save Crops & Cattle</div>
          </button>

          <!-- Action 3: Report Damage -->
          <button 
            onclick="window.appNavigate('damage-report')"
            class="p-5 rounded-2xl bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-xl shadow-amber-950/50 border border-amber-400/50 text-center space-y-2 transform hover:-translate-y-1 transition group"
          >
            <div class="text-3xl group-hover:scale-110 transition">📷</div>
            <div class="font-extrabold text-sm font-heading">${t.actionReportDamage}</div>
            <div class="text-[10px] text-amber-200 font-medium">AI Photo Verification</div>
          </button>

          <!-- Action 4: Soil Health -->
          <button 
            onclick="window.appNavigate('soil-recovery')"
            class="p-5 rounded-2xl bg-gradient-to-b from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white shadow-xl shadow-teal-950/50 border border-teal-400/50 text-center space-y-2 transform hover:-translate-y-1 transition group"
          >
            <div class="text-3xl group-hover:scale-110 transition">🌱</div>
            <div class="font-extrabold text-sm font-heading">${t.actionSoilHealth}</div>
            <div class="text-[10px] text-teal-200 font-medium">Silt Recovery Roadmap</div>
          </button>

          <!-- Action 5: Claims Payout -->
          <button 
            onclick="window.appNavigate('claims')"
            class="p-5 rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-xl shadow-blue-950/50 border border-blue-400/50 text-center space-y-2 transform hover:-translate-y-1 transition group"
          >
            <div class="text-3xl group-hover:scale-110 transition">📄</div>
            <div class="font-extrabold text-sm font-heading">${t.actionTrackClaim}</div>
            <div class="text-[10px] text-blue-200 font-medium">Bank DBT Status</div>
          </button>

        </div>
      </div>

      <!-- Kisan Status Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Card 1: Active Evacuation Status -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 class="font-bold text-white text-sm flex items-center gap-2">
              <span>🚚</span> Asset Evacuation Status
            </h4>
            <span class="text-xs text-emerald-400 font-bold">1 Active</span>
          </div>

          ${myEvacRequests.length > 0 ? `
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white">${myEvacRequests[0].cropType}</span>
                <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold uppercase text-[10px]">
                  ${myEvacRequests[0].status}
                </span>
              </div>
              <div class="text-slate-400 text-[11px]">
                Driver: <strong class="text-slate-200">${myEvacRequests[0].transporterName || 'Kishore Yadav (Tractor T-101)'}</strong>
              </div>
              <div class="text-slate-400 text-[11px]">
                Destination: <strong class="text-sky-300">${myEvacRequests[0].destination}</strong>
              </div>
            </div>
          ` : `
            <div class="text-xs text-slate-500 py-4 text-center">No active evacuation requests.</div>
          `}
        </div>

        <!-- Card 2: Crop Damage Claim Status -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 class="font-bold text-white text-sm flex items-center gap-2">
              <span>📄</span> Insurance / DBT Payout
            </h4>
            <span class="text-xs text-amber-400 font-bold">1 Verified</span>
          </div>

          ${myClaims.length > 0 ? `
            <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white">${myClaims[0].crop}</span>
                <span class="text-emerald-400 font-bold font-mono">₹ ${(myClaims[0].compensationAmountINR || 98000).toLocaleString('en-IN')}</span>
              </div>
              <div class="text-slate-400 text-[11px]">
                Loss: <strong class="text-red-400">${myClaims[0].aiAnalysis?.lossPercentage || 78}% Verified</strong>
              </div>
              <div class="text-slate-400 text-[11px] flex items-center justify-between">
                <span>Status: <strong class="text-emerald-300">${myClaims[0].claimStatus}</strong></span>
                <button 
                  onclick="window.openClaimCertificateModal('${myClaims[0].id}')"
                  class="text-sky-400 underline hover:text-sky-300"
                >
                  View Dossier
                </button>
              </div>
            </div>
          ` : `
            <div class="text-xs text-slate-500 py-4 text-center">No damage claims filed yet.</div>
          `}
        </div>

        <!-- Card 3: Soil Health & Recovery Advisory -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 class="font-bold text-white text-sm flex items-center gap-2">
              <span>🌱</span> Land Soil Health Score
            </h4>
            <span class="text-xs text-teal-400 font-bold">Khasra 412</span>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">Sand Deposition Depth:</span>
              <span class="font-bold text-amber-300 font-mono">22 cm</span>
            </div>
            <div class="text-slate-400 text-[11px]">
              Next Step: <strong class="text-white">Dhaincha Green Manuring + Gypsum</strong>
            </div>
            <div class="text-slate-400 text-[11px]">
              Timeline: <strong class="text-teal-300">8 Weeks to Sowing Boro Rice</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}
