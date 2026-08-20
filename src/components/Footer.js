// Footer Component with Disaster Helplines and Platform Metadata
import { translations } from '../data/translations.js';
import { storageService } from '../services/storageService.js';

export function renderFooter() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;

  return `
    <footer class="mt-20 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Emergency Helplines Strip -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-amber-950/30 to-slate-900/60 border border-red-900/40 mb-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center text-lg">
              📞
            </div>
            <div>
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">National Disaster Relief</div>
              <div class="text-sm font-bold text-white">NDRF: 1078 / 011-24363260</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-lg">
              🏛️
            </div>
            <div>
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Bihar SDMA Helpline</div>
              <div class="text-sm font-bold text-white">BSDMA: 1070 (Toll Free)</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-lg">
              🌊
            </div>
            <div>
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Supaul Flood Control Cell</div>
              <div class="text-sm font-bold text-white">06473-222002 / 222004</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-lg">
              📻
            </div>
            <div>
              <div class="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Offline Mesh Radio Relay</div>
              <div class="text-sm font-bold text-emerald-300 font-mono">FM 87.5 MHz / LoRa 868</div>
            </div>
          </div>
        </div>

        <!-- Main Footer Links & Summary -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🌊</span>
              <span class="font-heading font-extrabold text-lg text-white">${t.brandName}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Integrated disaster management and post-flood agricultural resilience system engineered for the vulnerable Kosi Basin, Bihar.
            </p>
            <div class="flex items-center gap-2 pt-2">
              <span class="px-2.5 py-1 text-[11px] font-semibold bg-slate-900 border border-slate-700 rounded-md text-emerald-400">
                PWA Ready
              </span>
              <span class="px-2.5 py-1 text-[11px] font-semibold bg-slate-900 border border-slate-700 rounded-md text-sky-400">
                AI Vision + IoT
              </span>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-3">Core Modules</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="javascript:void(0)" onclick="window.appNavigate('early-warning')" class="hover:text-emerald-400 transition">Early Flood Warning</a></li>
              <li><a href="javascript:void(0)" onclick="window.appNavigate('logistics')" class="hover:text-emerald-400 transition">Pre-Flood Asset Logistics</a></li>
              <li><a href="javascript:void(0)" onclick="window.appNavigate('damage-report')" class="hover:text-emerald-400 transition">AI Crop Damage Assessment</a></li>
              <li><a href="javascript:void(0)" onclick="window.appNavigate('claims')" class="hover:text-emerald-400 transition">Insurance & DBT Compensation</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-3">Recovery & Field Ops</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="javascript:void(0)" onclick="window.appNavigate('soil-recovery')" class="hover:text-emerald-400 transition">Post-Flood Soil Recovery</a></li>
              <li><a href="javascript:void(0)" onclick="window.appNavigate('emergency')" class="hover:text-emerald-400 transition">Emergency Rescue & Boat Fleet</a></li>
              <li><a href="javascript:void(0)" onclick="window.appNavigate('farmer-dashboard')" class="hover:text-emerald-400 transition">Kisan Rural Portal</a></li>
              <li><a href="javascript:void(0)" onclick="window.appNavigate('admin-dashboard')" class="hover:text-emerald-400 transition">State Command Center</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold text-white uppercase tracking-wider mb-3">Prototype Utilities</h4>
            <p class="text-xs text-slate-400 mb-3">
              KosiManthan is fully functional with live state persistence and real-time simulations.
            </p>
            <button 
              onclick="window.resetDemoData()"
              class="px-3 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 rounded-lg transition flex items-center gap-2"
            >
              <span>🔄</span> Reset Demo Dataset
            </button>
          </div>

        </div>

        <div class="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 KosiManthan Platform. Developed for Bihar Flood Relief & Agricultural Recovery.
          </div>
          <div class="flex items-center gap-4">
            <span>Supaul • Saharsa • Madhepura • Khagaria</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
