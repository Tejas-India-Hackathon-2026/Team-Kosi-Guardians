// Quick SOS Emergency Dispatch Modal Component
export function renderQuickSOSModal() {
  return `
    <div id="quick-sos-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden">
      <div class="relative w-full max-w-lg bg-slate-900 border-2 border-red-500/80 rounded-2xl p-6 shadow-2xl shadow-red-950/60 overflow-hidden">
        
        <!-- Header -->
        <div class="flex items-start justify-between pb-4 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-red-600/30 border border-red-500 flex items-center justify-center text-2xl animate-pulse">
              🚨
            </div>
            <div>
              <h3 class="text-xl font-bold text-white font-heading">
                Emergency Rescue SOS Dispatch
              </h3>
              <p class="text-xs text-red-400 font-medium">
                Direct transmission to NDRF / SDRF / District Control Room
              </p>
            </div>
          </div>
          <button 
            onclick="window.closeQuickSOSModal()"
            class="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        <!-- Form Fields -->
        <form id="sos-dispatch-form" onsubmit="window.handleSOSSubmit(event)" class="mt-4 space-y-4">
          
          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Your Name / Primary Contact
            </label>
            <input 
              type="text" 
              id="sos-name" 
              required 
              placeholder="e.g. Ramesh Mukhiya / Kisan Representative"
              class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              value="Kisan Ramesh Kumar"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Phone Number
              </label>
              <input 
                type="tel" 
                id="sos-phone" 
                required 
                placeholder="+91 98765 43210"
                class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                value="+91 91224 81920"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 uppercase mb-1">
                People Trapped
              </label>
              <input 
                type="number" 
                id="sos-people-count" 
                required 
                min="1" 
                max="50"
                class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                value="5"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Exact Location / Landmark / Village
            </label>
            <input 
              type="text" 
              id="sos-location" 
              required 
              placeholder="e.g. Marauna Ward 3, Near Primary School Ring Bundh"
              class="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
              value="Marauna Ward 3, High School Bundh"
            />
          </div>

          <!-- Quick Checkboxes -->
          <div class="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
            <label class="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input type="checkbox" id="sos-has-infants" class="rounded text-red-600 focus:ring-0" checked />
              <span>Infants / Children Present</span>
            </label>
            <label class="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input type="checkbox" id="sos-has-elderly" class="rounded text-red-600 focus:ring-0" checked />
              <span>Elderly / Medical Emergency</span>
            </label>
          </div>

          <div class="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <span>⚠️</span>
            <span>Your GPS coordinates (Lat: 26.2410, Lng: 86.5220) will be attached automatically to alert the nearest rescue boat.</span>
          </div>

          <!-- Action Button -->
          <button 
            type="submit"
            class="w-full py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-red-700/40 flex items-center justify-center gap-2 uppercase tracking-wider transition"
          >
            <span>🚨</span> Broadcast SOS to Rescue Fleet
          </button>
        </form>

      </div>
    </div>
  `;
}
