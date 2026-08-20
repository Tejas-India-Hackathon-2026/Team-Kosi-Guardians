// AI Crop Damage Verification & Assessment Module
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderDamageReportPage(state = {}) {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const analysisResult = state.analysisResult || null;
  const isAnalyzing = state.isAnalyzing || false;

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-amber-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-semibold mb-2">
            <span>📷</span> COMPUTER VISION & SATELLITE LOSS VERIFICATION
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.damageTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.damageSubtitle}
          </p>
        </div>

        <div class="flex items-center gap-2 text-xs">
          <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
            Model: <strong class="text-emerald-400 font-mono">KosiVision-v3.2</strong>
          </span>
        </div>
      </div>

      <!-- 3-Step Workflow Graphic -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="p-4 rounded-xl glass-panel border ${isAnalyzing ? 'border-slate-800' : 'border-emerald-500/40 bg-emerald-950/20'} flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <div class="text-xs font-bold text-white">Step 1 — Upload Photos</div>
            <div class="text-[11px] text-slate-400">Geo-tagged field photos with GPS coordinates</div>
          </div>
        </div>

        <div class="p-4 rounded-xl glass-panel border ${isAnalyzing ? 'border-amber-500/60 bg-amber-950/30 animate-pulse' : analysisResult ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-800'} flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${isAnalyzing ? 'bg-amber-600/40 text-amber-300' : 'bg-slate-800 text-slate-400'} flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <div class="text-xs font-bold text-white">Step 2 — AI Verify</div>
            <div class="text-[11px] text-slate-400">Neural loss %, sand deposition & waterlogging</div>
          </div>
        </div>

        <div class="p-4 rounded-xl glass-panel border ${analysisResult ? 'border-emerald-500/60 bg-emerald-950/30' : 'border-slate-800'} flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl ${analysisResult ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'} flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <div class="text-xs font-bold text-white">Step 3 — Compensate</div>
            <div class="text-[11px] text-slate-400">Auto-generate verified claim for DBT settlement</div>
          </div>
        </div>
      </div>

      <!-- Main Interaction: Upload Form & AI Output Dashboard -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Col: Photo Upload & Field Parameters Form -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-5">
          <div class="border-b border-slate-800 pb-3">
            <h3 class="text-base font-bold text-white font-heading flex items-center gap-2">
              <span>🌾</span> ${t.uploadPhotos}
            </h3>
            <p class="text-xs text-slate-400">
              Submit images of submerged fields or silted crops for instant analysis.
            </p>
          </div>

          <form id="damage-upload-form" onsubmit="window.handleDamageAnalysisSubmit(event)" class="space-y-4 text-xs">
            
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Farmer Name / ID</label>
                <input 
                  type="text" 
                  id="dmg-farmer-name" 
                  required 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                  value="Ramesh Kumar Mandal (FARM-001)"
                />
              </div>
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Kisan Aadhaar Mask</label>
                <input 
                  type="text" 
                  id="dmg-aadhaar" 
                  required 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                  value="XXXX-XXXX-8492"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Crop Type</label>
                <select 
                  id="dmg-crop-type"
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option value="Paddy" selected>Paddy (Swarna Sub-1 / Aman)</option>
                  <option value="Maize">Maize (Hybrid Ganga-11)</option>
                  <option value="Makhana">Makhana (Fox Nut Pond Crop)</option>
                  <option value="Jute">Raw Jute (Tossa)</option>
                  <option value="Mustard">Mustard / Oilseeds</option>
                  <option value="Wheat">Wheat (PBW 343)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Cultivated Land Area</label>
                <input 
                  type="number" 
                  id="dmg-land-acres" 
                  step="0.1" 
                  min="0.5" 
                  max="50" 
                  required 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                  value="4.5"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Submersion Duration</label>
                <select 
                  id="dmg-submersion-days"
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                >
                  <option value="1">1 Day (&lt; 24h)</option>
                  <option value="2">2 Days (48h)</option>
                  <option value="4" selected>4 Days (96h - Critical)</option>
                  <option value="6">6+ Days (Severe Siltation)</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold text-slate-300 uppercase mb-1">Flood Water Depth</label>
                <input 
                  type="number" 
                  id="dmg-depth-cm" 
                  min="10" 
                  max="300" 
                  required 
                  class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                  value="110"
                />
              </div>
            </div>

            <!-- Image Upload Drag/Drop Box -->
            <div>
              <label class="block font-semibold text-slate-300 uppercase mb-1">Field Damage Photos</label>
              <div 
                class="border-2 border-dashed border-slate-700 hover:border-amber-500 rounded-xl p-5 text-center bg-slate-950/60 cursor-pointer space-y-2 transition"
                onclick="document.getElementById('dmg-file-input').click()"
              >
                <input type="file" id="dmg-file-input" class="hidden" accept="image/*" onchange="window.handleImageSelected(event)" />
                <div class="text-3xl">🌾📸</div>
                <div class="text-xs text-slate-300 font-semibold" id="dmg-upload-label">
                  Click or Drop Geo-Tagged Crop Photos Here
                </div>
                <div class="text-[10px] text-slate-500">
                  GPS EXIF Metadata (26.24°N, 86.52°E) will be extracted automatically.
                </div>
              </div>
            </div>

            <!-- Preset Demonstration Image Pickers -->
            <div class="space-y-1.5 pt-1">
              <span class="text-[11px] text-slate-400 font-semibold">Or Select a Demonstration Field Image:</span>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  type="button" 
                  onclick="window.selectSamplePhoto('paddy')"
                  class="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500 text-left text-[11px] text-slate-300 transition"
                >
                  🌾 Submerged Paddy
                </button>
                <button 
                  type="button" 
                  onclick="window.selectSamplePhoto('maize')"
                  class="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500 text-left text-[11px] text-slate-300 transition"
                >
                  🌽 Lodged Maize
                </button>
                <button 
                  type="button" 
                  onclick="window.selectSamplePhoto('makhana')"
                  class="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500 text-left text-[11px] text-slate-300 transition"
                >
                  🪷 Silted Makhana
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              class="w-full py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold rounded-xl shadow-lg shadow-amber-700/30 flex items-center justify-center gap-2 uppercase tracking-wider text-xs transition mt-2"
            >
              <span>⚡</span> Run Neural Vision Damage Assessment
            </button>

          </form>
        </div>

        <!-- Right Col: AI Analysis Results Screen -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col justify-between space-y-6">
          
          <div>
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white font-heading">
                  ${t.aiAssessmentResult}
                </h3>
                <p class="text-xs text-slate-400">
                  Real-time segmentation & spectral damage verification output.
                </p>
              </div>
              ${analysisResult ? `
                <span class="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-mono text-xs font-bold">
                  ✓ Verified (94%)
                </span>
              ` : ''}
            </div>

            <!-- Loading Spinner State -->
            ${isAnalyzing ? `
              <div class="py-16 text-center space-y-4">
                <div class="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <div class="text-sm font-bold text-amber-300 animate-pulse">
                  ${t.analyzingAI}
                </div>
                <div class="text-xs text-slate-400 max-w-xs mx-auto">
                  Cross-referencing Sentinel-2 SAR reflectance and ground photos for Supaul district...
                </div>
              </div>
            ` : analysisResult ? `
              <!-- AI Assessment Breakdown Results -->
              <div class="space-y-4 mt-4">
                
                <!-- Main Loss Card -->
                <div class="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-950 to-slate-900 border border-red-500/50 shadow-xl space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-[11px] text-red-300 uppercase font-semibold">Estimated Crop Loss</div>
                      <div class="text-4xl font-extrabold text-red-400 font-heading">
                        ${analysisResult.lossPercentage}%
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-[11px] text-slate-400 uppercase font-semibold">Confidence Rating</div>
                      <div class="text-2xl font-bold text-emerald-400 font-mono">
                        ${analysisResult.confidenceScore}%
                      </div>
                      <span class="px-2 py-0.5 bg-red-500/20 text-red-300 rounded text-[10px] font-bold uppercase">
                        ${analysisResult.impactLevel} Impact
                      </span>
                    </div>
                  </div>

                  <!-- Loss Breakdown Progress -->
                  <div class="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      class="bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 h-full rounded-full"
                      style="width: ${analysisResult.lossPercentage}%"
                    ></div>
                  </div>
                </div>

                <!-- Classification Breakdown Grid -->
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span class="text-slate-400 text-[10px] uppercase">${t.vegetativeRot}</span>
                    <div class="font-bold text-white">${analysisResult.vegetativeLossDesc}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span class="text-slate-400 text-[10px] uppercase">${t.siltDeposition}</span>
                    <div class="font-bold text-amber-300">${analysisResult.siltDepositionCm} cm Silt Layer</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span class="text-slate-400 text-[10px] uppercase">Waterlogging Duration</span>
                    <div class="font-bold text-white">${analysisResult.waterloggingScore}</div>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span class="text-slate-400 text-[10px] uppercase">Estimated Financial Loss</span>
                    <div class="font-bold text-red-400 font-mono">₹ ${analysisResult.estimatedFinancialLossINR.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <!-- Verified Claim Box -->
                <div class="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-emerald-300">🏛️ Eligible State Compensation (SDRF / PMFBY)</span>
                    <span class="font-extrabold text-emerald-400 font-heading text-base font-mono">
                      ₹ ${analysisResult.recommendedCompensationINR.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p class="text-[11px] text-slate-300">
                    Calculated under Bihar State Flood Relief Guidelines. Ready for 1-click submission to the Circle Agriculture Officer.
                  </p>
                </div>

              </div>
            ` : `
              <!-- Empty Initial State -->
              <div class="py-14 text-center space-y-3">
                <div class="text-4xl text-slate-600">🤖📊</div>
                <div class="text-sm font-semibold text-slate-300">Ready for Photo Analysis</div>
                <p class="text-xs text-slate-500 max-w-sm mx-auto">
                  Upload an image or pick a sample above to see the AI neural breakdown of damage, silt deposition, and auto-generated claim amount.
                </p>
              </div>
            `}
          </div>

          <!-- Bottom Action: Generate Claim -->
          ${analysisResult ? `
            <div class="pt-3 border-t border-slate-800">
              <button 
                onclick="window.submitGeneratedClaimNow()"
                class="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-xl shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 uppercase tracking-wide text-xs transition"
              >
                <span>📄</span> ${t.generateClaimBtn}
              </button>
            </div>
          ` : ''}

        </div>

      </div>

    </div>
  `;
}
