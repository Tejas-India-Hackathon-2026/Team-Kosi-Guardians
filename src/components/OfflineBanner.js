// Offline & Mesh Radio Broadcast Banner Component
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderOfflineBanner() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const queue = storageService.getOfflineQueue();
  const data = storageService.getData();
  const isMeshActive = data.systemStatus?.meshRelayActive;

  return `
    <div class="bg-gradient-to-r from-amber-950/80 via-slate-900 to-emerald-950/80 border-b border-amber-500/30 px-4 py-2 text-xs">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        <!-- Live Radio Broadcast Status -->
        <div class="flex items-center gap-2.5">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span class="font-semibold text-amber-300">
            📻 ${t.offlineRelayActive}
          </span>
        </div>

        <!-- System Alert Window Status -->
        <div class="hidden sm:flex items-center gap-4 text-slate-300">
          <div>
            <span class="text-slate-400">🌊 Birpur Discharge:</span>
            <span class="font-bold text-red-400 font-mono">${data.systemStatus?.dischargeAtBirpur || '385,000 cusecs'} (Rising)</span>
          </div>
          <div>
            <span class="text-slate-400">⏳ Safe Window:</span>
            <span class="font-bold text-amber-300 font-mono">${data.systemStatus?.evacuationWindowHours || 32}h remaining</span>
          </div>
        </div>

        <!-- Offline Storage Sync Info -->
        <div class="flex items-center gap-2">
          ${queue.length > 0 ? `
            <span class="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-mono text-[11px] font-semibold animate-pulse">
              ⚡ ${queue.length} Offline Actions Queued
            </span>
            <button 
              onclick="window.syncOfflineQueueNow()"
              class="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold"
            >
              Sync Now
            </button>
          ` : `
            <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              PWA Local Cache Ready
            </span>
          `}
        </div>

      </div>
    </div>
  `;
}
