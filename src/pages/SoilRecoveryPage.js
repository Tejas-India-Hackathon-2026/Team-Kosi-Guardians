// Soil Recovery & Agronomist Module for Post-Flood Farmland Reclamation
import { storageService } from '../services/storageService.js';
import { translations } from '../data/translations.js';

export function renderSoilRecoveryPage(state = {}) {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const data = storageService.getData();
  const soilReports = data.soilReports || [];
  const currentReport = soilReports[0] || {};
  const metrics = currentReport.metrics || {
    pH: 6.2,
    nitrogenKgHa: 142,
    phosphorusKgHa: 14,
    potassiumKgHa: 110,
    moisturePct: 38,
    siltSandDepositionCm: 22
  };
  const ai = currentReport.aiRecommendation || {};
  const activePlan = state.generatedPlan || null;

  return `
    <div class="space-y-8">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-teal-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-teal-950/40">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-xs font-semibold mb-2">
            <span>🌱</span> 3-PILLAR RECOVERY: SATELLITE MAPPING + IoT SENSORS + AI AGRONOMIST
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            ${t.soilTitle}
          </h1>
          <p class="text-xs sm:text-sm text-slate-300">
            ${t.soilSubtitle}
          </p>
        </div>

        <button 
          onclick="document.getElementById('soil-test-input-card').scrollIntoView({ behavior: 'smooth' })"
          class="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
        >
          <span>🧪</span> Run New Soil Lab/IoT Test
        </button>
      </div>

      <!-- Real-time IoT Soil Telemetry Dashboard Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        <!-- Metric 1: pH -->
        <div class="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Soil pH</span>
            <span class="text-amber-400">⚡ Acidic</span>
          </div>
          <div class="text-2xl font-extrabold text-white font-mono">${metrics.pH}</div>
          <div class="text-[10px] text-slate-500">Ideal: 6.5 - 7.5</div>
        </div>

        <!-- Metric 2: Nitrogen -->
        <div class="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Nitrogen (N)</span>
            <span class="text-red-400">Low</span>
          </div>
          <div class="text-2xl font-extrabold text-red-400 font-mono">${metrics.nitrogenKgHa} <span class="text-xs text-slate-400 font-normal">kg/ha</span></div>
          <div class="text-[10px] text-slate-500">Benchmark: &gt; 280</div>
        </div>

        <!-- Metric 3: Phosphorus -->
        <div class="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Phosphorus (P)</span>
            <span class="text-amber-400">Deficient</span>
          </div>
          <div class="text-2xl font-extrabold text-amber-300 font-mono">${metrics.phosphorusKgHa} <span class="text-xs text-slate-400 font-normal">kg/ha</span></div>
          <div class="text-[10px] text-slate-500">Benchmark: &gt; 23</div>
        </div>

        <!-- Metric 4: Potassium -->
        <div class="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Potassium (K)</span>
            <span class="text-emerald-400">Optimal</span>
          </div>
          <div class="text-2xl font-extrabold text-emerald-400 font-mono">${metrics.potassiumKgHa} <span class="text-xs text-slate-400 font-normal">kg/ha</span></div>
          <div class="text-[10px] text-slate-500">Benchmark: &gt; 110</div>
        </div>

        <!-- Metric 5: Moisture -->
        <div class="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-slate-400">
            <span>Moisture</span>
            <span class="text-sky-400">Waterlogged</span>
          </div>
          <div class="text-2xl font-extrabold text-sky-400 font-mono">${metrics.moisturePct}%</div>
          <div class="text-[10px] text-slate-500">Field Saturation</div>
        </div>

        <!-- Metric 6: Sand Silt Depth -->
        <div class="glass-panel p-4 rounded-2xl border border-red-500/40 bg-red-950/20 space-y-1">
          <div class="flex items-center justify-between text-[11px] text-red-300">
            <span>Sand Casting</span>
            <span class="text-red-400">Critical</span>
          </div>
          <div class="text-2xl font-extrabold text-red-400 font-mono">${metrics.siltSandDepositionCm} cm</div>
          <div class="text-[10px] text-slate-400">Requires Deep Inversion</div>
        </div>

      </div>

      <!-- 3-Pillar Section Grid: Satellite Map, IoT Form, AI Recommendation Engine -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Pillar 1: Satellite Farmland Silt Overlay & IoT Node Form -->
        <div class="space-y-6">
          
          <!-- Satellite Map Section -->
          <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white font-heading">
                  🛰️ Satellite Farmland Silt & Sand Deposition Map
                </h3>
                <p class="text-xs text-slate-400">
                  Sentinel-2 NDVI & Soil Moisture Index across Supaul & Saharsa blocks.
                </p>
              </div>
              <span class="px-2.5 py-1 text-[10px] bg-slate-800 text-teal-300 font-mono rounded border border-slate-700">
                10m Spatial Resolution
              </span>
            </div>

            <!-- Map View Container -->
            <div id="soil-map" class="w-full h-64 rounded-xl border border-slate-800 bg-slate-950 shadow-inner"></div>

            <div class="grid grid-cols-3 gap-2 text-center text-xs">
              <div class="p-2 rounded-lg bg-red-950/30 border border-red-900/40">
                <span class="font-bold text-red-400">&gt; 20cm Sand Deposition</span>
                <div class="text-[10px] text-slate-400">Deep Mouldboard Plough</div>
              </div>
              <div class="p-2 rounded-lg bg-amber-950/30 border border-amber-900/40">
                <span class="font-bold text-amber-300">5-20cm Silt Layer</span>
                <div class="text-[10px] text-slate-400">Gypsum + Green Manure</div>
              </div>
              <div class="p-2 rounded-lg bg-emerald-950/30 border border-emerald-900/40">
                <span class="font-bold text-emerald-300">&lt; 5cm Alluvial Mud</span>
                <div class="text-[10px] text-slate-400">Immediate Rabi Sowing</div>
              </div>
            </div>
          </div>

          <!-- IoT Sensor / Lab Reading Input Form -->
          <div id="soil-test-input-card" class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-4">
            <div class="border-b border-slate-800 pb-3">
              <h3 class="text-base font-bold text-white font-heading flex items-center gap-2">
                <span>🧪</span> IoT Soil Health Telemetry & Test Input
              </h3>
              <p class="text-xs text-slate-400">
                Input lab or portable probe readings to re-compute the AI agronomy recovery roadmap.
              </p>
            </div>

            <form id="soil-test-form" onsubmit="window.handleSoilAnalysisSubmit(event)" class="space-y-3.5 text-xs">
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">Farmer / Plot ID</label>
                  <input 
                    type="text" 
                    id="soil-farmer" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-teal-500"
                    value="Ramesh Kumar (Khasra 412)"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">District</label>
                  <input 
                    type="text" 
                    id="soil-district" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-teal-500"
                    value="Supaul (Marauna Block)"
                  />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-2.5">
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">pH Level</label>
                  <input 
                    type="number" 
                    id="soil-ph" 
                    step="0.1" 
                    min="3" 
                    max="10" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-teal-500 font-mono"
                    value="${metrics.pH}"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">Nitrogen (kg/ha)</label>
                  <input 
                    type="number" 
                    id="soil-nitrogen" 
                    min="20" 
                    max="500" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-teal-500 font-mono"
                    value="${metrics.nitrogenKgHa}"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 uppercase mb-1">Sand Silt (cm)</label>
                  <input 
                    type="number" 
                    id="soil-silt-cm" 
                    min="0" 
                    max="80" 
                    required 
                    class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:border-teal-500 font-mono"
                    value="${metrics.siltSandDepositionCm}"
                  />
                </div>
              </div>

              <button 
                type="submit"
                class="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider transition mt-2"
              >
                <span>⚡</span> ${t.generateSoilPlan}
              </button>

            </form>
          </div>

        </div>

        <!-- Pillar 3: AI Agronomist Recovery Guidance Plan -->
        <div class="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-6 flex flex-col justify-between">
          
          <div class="space-y-5">
            <div class="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white font-heading flex items-center gap-2">
                  <span>🤖🌾</span> AI Agronomist Soil Rehabilitation Prescription
                </h3>
                <p class="text-xs text-slate-400">
                  Customized agronomical restoration roadmap for Kosi silt-deposited soil.
                </p>
              </div>
              <span class="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-full font-mono text-xs font-bold border border-teal-500/30">
                ICAR-RCER Bihar Calibrated
              </span>
            </div>

            <!-- Health Status Banner -->
            <div class="p-4 rounded-xl bg-gradient-to-r from-teal-950/50 via-slate-950 to-slate-900 border border-teal-500/40 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs text-teal-300 font-semibold uppercase">Condition Summary</span>
                <span class="text-sm font-extrabold text-white font-mono">
                  ${activePlan ? activePlan.statusLabel : ai.overallCondition || 'Severely Silted & Leached'}
                </span>
              </div>
              <div class="text-xs text-slate-300 leading-relaxed">
                <strong>Primary Silt Remedy:</strong> ${activePlan ? activePlan.primaryAction : ai.primaryAction || 'Deep Mouldboard Ploughing + Sesbania (Dhaincha) Sowing.'}
              </div>
            </div>

            <!-- Recovery Recommendation Cards -->
            <div class="space-y-3 text-xs">
              
              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span class="text-slate-400 text-[10px] uppercase font-semibold">🌾 Recommended Resilient Next Crop</span>
                <div class="font-bold text-white text-sm">
                  ${activePlan ? activePlan.recommendedCrop : ai.suggestedRecoveryCrop || 'Dhaincha Green Manuring -> Boro Rice (CR Dhan 201)'}
                </div>
                <div class="text-[11px] text-slate-400">Flood-submergence tolerant with high nitrogen fixation index.</div>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span class="text-slate-400 text-[10px] uppercase font-semibold">🧪 Fertilizer & Soil Amendment Prescription</span>
                <div class="font-semibold text-emerald-300">
                  ${activePlan ? activePlan.fertilizerPrescription : ai.fertilizerPrescription || 'Gypsum @ 150kg/acre + Single Super Phosphate (SSP) + Bio-NPK Consortium'}
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span class="text-slate-400 text-[10px] uppercase font-semibold">⏱️ Estimated Land Recovery</span>
                  <div class="text-base font-extrabold text-white font-mono">
                    ${activePlan ? activePlan.timelineWeeks : ai.timelineWeeks || 8} Weeks
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span class="text-slate-400 text-[10px] uppercase font-semibold">📅 Next Soil Test Date</span>
                  <div class="text-base font-extrabold text-teal-400 font-mono">
                    ${activePlan ? activePlan.nextTestDate : 'In 45 Days'}
                  </div>
                </div>
              </div>

            </div>

            <!-- 6-Week Action Calendar Timeline -->
            <div class="space-y-2 pt-2 border-t border-slate-800">
              <span class="text-xs font-bold text-slate-300 uppercase">🗓️ Restoration Action Roadmap:</span>
              <div class="space-y-2 text-xs">
                ${(activePlan?.weeklyRoadmap || [
                  { week: 1, action: "De-watering & Drainage", detail: "Open surface trenches to purge stagnant flood water." },
                  { week: 2, action: "Deep Tillage & Silt Inversion", detail: "Plough 25cm to blend coarse sand with bottom clay." },
                  { week: 3, action: "Bio-Fertilizers & Gypsum", detail: "Broadcast Gypsum @ 150kg/acre + Azotobacter culture." },
                  { week: 4, action: "Dhaincha (Sesbania) Broadcast", detail: "Sow green manure seeds for rapid organic carbon buildup." },
                  { week: 8, action: "Main Rabi Season Sowing", detail: "Transplant resilient Boro Paddy or winter Maize." }
                ]).map((item) => `
                  <div class="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span class="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded font-mono font-bold text-[10px]">W${item.week}</span>
                    <div>
                      <strong class="text-white">${item.action}:</strong>
                      <span class="text-slate-400 text-[11px]">${item.detail}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
