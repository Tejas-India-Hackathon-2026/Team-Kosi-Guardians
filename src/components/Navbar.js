// Navigation Bar Component with Bilingual Switch and Fast Role Switcher
import { storageService } from '../services/storageService.js';
import { authService } from '../services/authService.js';
import { translations } from '../data/translations.js';

export function renderNavbar(activePage = 'home') {
  const currentLang = storageService.getCurrentLanguage();
  const t = translations[currentLang] || translations.en;
  const currentRole = storageService.getCurrentRole();
  const currentUser = authService.getCurrentUser();
  const availableRoles = authService.getAvailableRoles();

  const navLinks = [
    { id: 'home', label: t.navHome, icon: '🏠' },
    { id: 'early-warning', label: t.navEarlyWarning, icon: '🌊', badge: 'Live' },
    { id: 'logistics', label: t.navLogistics, icon: '🚚' },
    { id: 'damage-report', label: t.navDamageReport, icon: '📷' },
    { id: 'claims', label: t.navClaims, icon: '📄' },
    { id: 'soil-recovery', label: t.navSoilRecovery, icon: '🌱' },
    { id: 'emergency', label: t.navEmergency, icon: '🚨' },
    { id: 'farmer-dashboard', label: t.navFarmerDash, icon: '🌾' },
    { id: 'admin-dashboard', label: t.navAdminDash, icon: '🛡️' }
  ];

  return `
    <header class="sticky top-0 z-50 glass-panel border-b border-slate-700/60 bg-slate-950/85 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-18 py-3">
          
          <!-- Brand Logo -->
          <div class="flex items-center gap-3 cursor-pointer" onclick="window.appNavigate('home')">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-sky-600 to-amber-500 p-0.5 shadow-lg shadow-emerald-500/20">
              <div class="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-xl">
                🌊
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-heading font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-amber-400">
                  ${t.brandName}
                </span>
                <span class="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  Bihar Basin
                </span>
              </div>
              <p class="text-[11px] text-slate-400 hidden sm:block">
                ${t.brandSubtitle}
              </p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden xl:flex items-center gap-1">
            ${navLinks.map((link) => `
              <button 
                onclick="window.appNavigate('${link.id}')"
                class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activePage === link.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }"
              >
                <span>${link.icon}</span>
                <span>${link.label}</span>
                ${link.badge ? `<span class="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>` : ''}
              </button>
            `).join('')}
          </nav>

          <!-- Right Action Controls -->
          <div class="flex items-center gap-2.5">
            
            <!-- Bilingual Toggle -->
            <div class="bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 flex text-xs">
              <button 
                onclick="window.setLanguage('en')"
                class="px-2.5 py-1 rounded-md transition-all font-semibold ${
                  currentLang === 'en' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }"
              >
                EN
              </button>
              <button 
                onclick="window.setLanguage('hi')"
                class="px-2.5 py-1 rounded-md transition-all font-semibold ${
                  currentLang === 'hi' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }"
              >
                हिन्दी
              </button>
            </div>

            <!-- Role Selector Dropdown -->
            <div class="relative inline-block text-left group">
              <button 
                id="role-switch-btn"
                class="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-600/70 rounded-lg text-xs font-medium text-slate-200 transition"
              >
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="hidden sm:inline">${currentUser.name?.split(' ')[0] || 'User'}:</span>
                <span class="text-emerald-300 font-semibold">${currentUser.role || currentRole}</span>
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="hidden group-hover:block absolute right-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-1.5 space-y-1">
                <div class="px-2.5 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  ${t.navSwitchRole}
                </div>
                ${availableRoles.map((role) => `
                  <button 
                    onclick="window.switchActiveRole('${role.key}')"
                    class="w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between hover:bg-slate-800 transition ${
                      currentRole === role.key ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' : 'text-slate-300'
                    }"
                  >
                    <span>${role.label}</span>
                    <span class="text-[10px] text-slate-400 font-mono">${role.badge}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Emergency Quick SOS Button -->
            <button 
              onclick="window.openQuickSOSModal()"
              class="px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs rounded-lg shadow-lg shadow-red-600/30 flex items-center gap-1.5 border border-red-500/50 animate-pulse"
            >
              <span>🚨</span>
              <span class="hidden md:inline">${t.quickSOS}</span>
            </button>

            <!-- Mobile Menu Toggle Button -->
            <button 
              id="mobile-menu-btn"
              onclick="window.toggleMobileMenu()"
              class="xl:hidden p-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

          </div>

        </div>
      </div>

      <!-- Mobile Drawer Menu -->
      <div id="mobile-nav-drawer" class="hidden xl:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-3 space-y-1">
        ${navLinks.map((link) => `
          <button 
            onclick="window.appNavigate('${link.id}'); window.toggleMobileMenu();"
            class="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
              activePage === link.id
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-300 hover:bg-slate-900'
            }"
          >
            <div class="flex items-center gap-2">
              <span>${link.icon}</span>
              <span>${link.label}</span>
            </div>
            ${link.badge ? `<span class="px-2 py-0.5 text-[10px] bg-red-500/30 text-red-300 rounded">${link.badge}</span>` : ''}
          </button>
        `).join('')}
      </div>
    </header>
  `;
}
