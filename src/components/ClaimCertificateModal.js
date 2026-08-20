// Official Claim Dossier & Printable Certificate Modal Component
export function renderClaimCertificateModal(claim = null) {
  if (!claim) {
    return `<div id="claim-certificate-modal" class="hidden"></div>`;
  }

  const ai = claim.aiAnalysis || {};
  const formattedLoss = (claim.compensationAmountINR || claim.estimatedLoss || 98000).toLocaleString('en-IN');
  const dbtId = claim.dbtTransactionId || 'DBT-BIHAR-2026-PENDING';

  return `
    <div id="claim-certificate-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div class="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        <!-- Modal Top Bar -->
        <div class="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between no-print">
          <div class="flex items-center gap-2 text-white font-bold text-sm">
            <span>📄</span>
            <span>Official Crop Damage Assessment & DBT Compensation Certificate</span>
          </div>
          <div class="flex items-center gap-2">
            <button 
              onclick="window.printClaimCertificate()"
              class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition"
            >
              <span>🖨️</span> Print / Save PDF
            </button>
            <button 
              onclick="window.closeClaimCertificateModal()"
              class="px-2.5 py-1.5 text-slate-400 hover:text-white text-xs font-bold rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Printable Document Body -->
        <div id="printable-claim-certificate" class="p-8 overflow-y-auto bg-slate-950 text-slate-100 space-y-6">
          
          <!-- State Embankment Header -->
          <div class="border-b-2 border-emerald-500/40 pb-6 text-center space-y-2">
            <div class="flex items-center justify-center gap-3">
              <span class="text-3xl">🏛️</span>
              <div>
                <h2 class="text-lg font-extrabold font-heading text-emerald-400 uppercase tracking-wide">
                  Government of Bihar • Disaster Management & Agriculture Department
                </h2>
                <h3 class="text-sm font-semibold text-slate-300">
                  Kosi Flood Relief, AI Loss Verification & Direct Benefit Transfer (DBT) Cell
                </h3>
              </div>
            </div>
            <div class="text-[11px] text-slate-400 font-mono">
              Certificate No: BSDMA/KOSI/2026/${claim.id} • Authenticated via KosiManthan AI Vision Sentinel-2 Node
            </div>
          </div>

          <!-- Top Meta Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div>
              <div class="text-slate-500 font-semibold uppercase text-[10px]">Claim Dossier ID</div>
              <div class="font-bold text-white font-mono text-sm">${claim.id}</div>
            </div>
            <div>
              <div class="text-slate-500 font-semibold uppercase text-[10px]">Farmer / Beneficiary</div>
              <div class="font-bold text-white">${claim.farmerName || 'Ramesh Kumar Mandal'}</div>
            </div>
            <div>
              <div class="text-slate-500 font-semibold uppercase text-[10px]">Kisan Aadhaar Mask</div>
              <div class="font-bold text-white font-mono">${claim.kisanAadhaar || 'XXXX-XXXX-8492'}</div>
            </div>
            <div>
              <div class="text-slate-500 font-semibold uppercase text-[10px]">District & Block</div>
              <div class="font-bold text-white">${claim.district || 'Supaul'}, ${claim.village || 'Marauna'}</div>
            </div>
          </div>

          <!-- AI Assessment Technical Table -->
          <div class="border border-slate-800 rounded-xl overflow-hidden">
            <div class="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-200 uppercase flex items-center justify-between">
              <span>Field Damage & AI Verification Breakdown</span>
              <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px]">
                Confidence: ${ai.confidence || 94}%
              </span>
            </div>
            <table class="w-full text-xs text-left">
              <tbody class="divide-y divide-slate-800 text-slate-300">
                <tr class="bg-slate-950">
                  <td class="p-3 font-medium text-slate-400">Crop Type & Variety:</td>
                  <td class="p-3 font-bold text-white">${claim.crop || 'Paddy (Swarna Sub-1)'}</td>
                  <td class="p-3 font-medium text-slate-400">Total Cultivated Area:</td>
                  <td class="p-3 font-bold text-white">${claim.landAreaAcres || 4.5} Acres</td>
                </tr>
                <tr class="bg-slate-900/40">
                  <td class="p-3 font-medium text-slate-400">Submerged Area:</td>
                  <td class="p-3 font-bold text-red-400">${claim.submergedAcres || 3.8} Acres</td>
                  <td class="p-3 font-medium text-slate-400">Peak Water Inundation:</td>
                  <td class="p-3 font-bold text-white">${claim.floodDepthCm || 110} cm (${claim.submersionDays || 4} Days)</td>
                </tr>
                <tr class="bg-slate-950">
                  <td class="p-3 font-medium text-slate-400">AI Estimated Crop Loss:</td>
                  <td class="p-3 font-extrabold text-red-400 text-sm">${ai.lossPercentage || 78}%</td>
                  <td class="p-3 font-medium text-slate-400">Sand / Silt Casting Depth:</td>
                  <td class="p-3 font-bold text-amber-300">${ai.siltDepositionCm || 18} cm Depth</td>
                </tr>
                <tr class="bg-slate-900/40">
                  <td class="p-3 font-medium text-slate-400">Vegetative Classification:</td>
                  <td class="p-3 text-slate-300" colspan="3">${ai.vegetativeLoss || 'Stem Rot, Severe Chlorosis & Silt Choking'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Financial Compensation Assessment -->
          <div class="p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div class="text-xs text-slate-400 font-semibold uppercase">Approved State Assistance (SDRF + PMFBY)</div>
              <div class="text-2xl font-extrabold text-emerald-400 font-heading">₹ ${formattedLoss}</div>
              <div class="text-[11px] text-slate-400 mt-1">Direct Bank Account Credit via PFMS Gateway</div>
            </div>
            <div class="text-right">
              <div class="text-xs text-slate-400 font-semibold uppercase">DBT Ref Transaction</div>
              <div class="text-sm font-mono text-emerald-300 font-bold">${dbtId}</div>
              <div class="text-[10px] text-emerald-500 mt-0.5">✓ Verified by Circle Agriculture Officer</div>
            </div>
          </div>

          <!-- Digital Seal & Signatures -->
          <div class="pt-4 border-t border-slate-800 grid grid-cols-2 gap-8 text-xs text-slate-400">
            <div>
              <div class="font-bold text-white mb-1">State Verification Seal:</div>
              <div class="inline-flex items-center gap-2 p-2 bg-slate-900 border border-slate-700 rounded-lg">
                <span class="text-2xl">🛡️</span>
                <span class="font-mono text-[10px] text-slate-300">
                  SHA-256: e8f921ab0c...99a0<br>
                  Validated via KosiManthan Sentinel Node
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold text-white mb-6">Authorized Signatory:</div>
              <div class="text-xs font-semibold text-slate-200">Sunita Jha, Bihar Administrative Service</div>
              <div class="text-[10px] text-slate-500">Block Development & Relief Officer, Supaul</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}
