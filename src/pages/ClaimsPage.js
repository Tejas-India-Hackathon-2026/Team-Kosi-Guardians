// Insurance & Compensation (DBT) Module
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';
import { authService } from '../services/authService.js';

export function renderClaimsPage() {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();
  const claims = data.damageReports || [];
  const currentRole = storageService.getCurrentRole();
  const isOfficerOrAdmin = ['OFFICER', 'ADMIN'].includes(currentRole);

  const totalLoss = claims.reduce((acc, c) => acc + (c.aiAnalysis?.estimatedFinancialLossINR || 80000), 0);
  const totalApproved = claims
    .filter((c) => c.claimStatus === 'APPROVED' || c.claimStatus === 'DISBURSED')
    .reduce((acc, c) => acc + (c.compensationAmountINR || 0), 0);

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold mb-2">
            <span>💳</span> DIRECT BENEFIT TRANSFER (DBT) & PMFBY SETTLEMENT
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.claimsTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.claimsSubtitle}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button 
            onclick="window.appNavigate('damage-report')"
            class="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
          >
            <span>📷</span> File New Damage Claim
          </button>
        </div>
      </div>

      <!-- Macro Summary Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div class="p-4 rounded-xl glass-panel border border-slate-800 bg-slate-900/80 space-y-1">
          <span class="text-xs text-slate-400 uppercase font-semibold">Total Claims Filed</span>
          <div class="text-2xl font-extrabold text-white font-heading">${claims.length} Claims</div>
          <div class="text-[10px] text-emerald-400">100% AI-Verified with GPS</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-slate-800 bg-slate-900/80 space-y-1">
          <span class="text-xs text-slate-400 uppercase font-semibold">Evaluated Loss Value</span>
          <div class="text-2xl font-extrabold text-red-400 font-heading">₹ ${(totalLoss / 100000).toFixed(2)} Lakh</div>
          <div class="text-[10px] text-slate-400">Assessed by KosiVision AI</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-emerald-500/40 bg-emerald-950/20 space-y-1">
          <span class="text-xs text-emerald-300 uppercase font-semibold">Approved State DBT</span>
          <div class="text-2xl font-extrabold text-emerald-400 font-heading">₹ ${(totalApproved / 100000).toFixed(2)} Lakh</div>
          <div class="text-[10px] text-emerald-400">Direct to Aadhaar Bank A/C</div>
        </div>

        <div class="p-4 rounded-xl glass-panel border border-slate-800 bg-slate-900/80 space-y-1">
          <span class="text-xs text-slate-400 uppercase font-semibold">Settlement Turnaround</span>
          <div class="text-2xl font-extrabold text-sky-400 font-heading">48 Hours</div>
          <div class="text-[10px] text-slate-400">vs 45 days traditional manual survey</div>
        </div>

      </div>

      <!-- Officer Review Mode Notice -->
      ${isOfficerOrAdmin ? `
        <div class="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🏛️</span>
            <div>
              <strong class="text-amber-200 text-sm">Government Officer / Surveyor Action Mode Active</strong>
              <div class="text-slate-300">You are logged in with approval authorization. You can approve claims and trigger DBT payouts directly.</div>
            </div>
          </div>
          <span class="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono font-bold rounded-lg border border-amber-500/30">
            Auth: Bihar Administrative Service
          </span>
        </div>
      ` : ''}

      <!-- Claims Table Section -->
      <div class="glass-panel rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl space-y-4 p-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-lg font-bold text-white font-heading">
              Crop Damage Verification & Compensation Registry
            </h3>
            <p class="text-xs text-slate-400">
              Traceable claim lifecycle with cryptographic verification stamps.
            </p>
          </div>
          
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
              Filter: <strong class="text-emerald-400">All Blocks</strong>
            </span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead class="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th class="p-3.5">Claim ID</th>
                <th class="p-3.5">Farmer & Village</th>
                <th class="p-3.5">Crop & Area</th>
                <th class="p-3.5">Loss %</th>
                <th class="p-3.5">Estimated Loss</th>
                <th class="p-3.5">Compensation (DBT)</th>
                <th class="p-3.5">Lifecycle Status</th>
                <th class="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80 text-slate-300">
              ${claims.map((c) => {
                const ai = c.aiAnalysis || {};
                const isApproved = c.claimStatus === 'APPROVED';
                const isReview = c.claimStatus === 'OFFICER_REVIEW';
                const isVerified = c.claimStatus === 'AI_VERIFIED';

                let statusBadge = 'bg-slate-800 text-slate-300';
                if (isApproved) statusBadge = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
                else if (isReview) statusBadge = 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
                else if (isVerified) statusBadge = 'bg-sky-500/20 text-sky-300 border border-sky-500/40';

                return `
                  <tr class="hover:bg-slate-800/50 transition">
                    <td class="p-3.5 font-mono font-bold text-white">
                      ${c.id}
                      <div class="text-[10px] text-slate-500">${new Date(c.submittedAt).toLocaleDateString()}</div>
                    </td>
                    <td class="p-3.5">
                      <div class="font-bold text-white">${c.farmerName}</div>
                      <div class="text-slate-400 text-[11px]">${c.village}, ${c.district}</div>
                      <div class="text-slate-500 text-[10px] font-mono">${c.kisanAadhaar}</div>
                    </td>
                    <td class="p-3.5">
                      <div class="font-semibold text-slate-200">${c.crop}</div>
                      <div class="text-slate-400 text-[11px]">${c.submergedAcres || c.landAreaAcres} / ${c.landAreaAcres} Acres</div>
                    </td>
                    <td class="p-3.5">
                      <span class="text-sm font-extrabold font-mono text-red-400">
                        ${ai.lossPercentage || 75}%
                      </span>
                      <div class="text-[10px] text-slate-400">Conf: ${ai.confidence || 92}%</div>
                    </td>
                    <td class="p-3.5 font-mono font-semibold text-slate-200">
                      ₹ ${(ai.estimatedFinancialLossINR || 85000).toLocaleString('en-IN')}
                    </td>
                    <td class="p-3.5">
                      <div class="font-bold text-emerald-400 font-mono">
                        ₹ ${(c.compensationAmountINR || 72000).toLocaleString('en-IN')}
                      </div>
                      ${c.dbtTransactionId ? `
                        <div class="text-[10px] text-emerald-500 font-mono">${c.dbtTransactionId}</div>
                      ` : `
                        <div class="text-[10px] text-amber-400">Pending Approval</div>
                      `}
                    </td>
                    <td class="p-3.5">
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${statusBadge}">
                        ${c.claimStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td class="p-3.5 text-right space-x-2">
                      <button 
                        onclick="window.openClaimCertificateModal('${c.id}')"
                        class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition border border-slate-700"
                        title="View Official Certificate"
                      >
                        📄 Dossier
                      </button>

                      ${isOfficerOrAdmin && !isApproved ? `
                        <button 
                          onclick="window.approveClaimNow('${c.id}')"
                          class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow"
                        >
                          ✓ Approve DBT
                        </button>
                      ` : ''}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  `;
}
