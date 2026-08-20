// Main KosiManthan Application Router and Orchestrator
import { storageService } from './services/storageService.js';
import { authService } from './services/authService.js';
import { damageAiService } from './services/damageAiService.js';
import { soilAiService } from './services/soilAiService.js';
import { logisticsService } from './services/logisticsService.js';
import { translations } from './data/translations.js';

import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderOfflineBanner } from './components/OfflineBanner.js';
import { renderQuickSOSModal } from './components/QuickSOSModal.js';
import { renderClaimCertificateModal } from './components/ClaimCertificateModal.js';
import { initLeafletMap, populateMapLayers } from './components/MapView.js';

import { renderLandingPage } from './pages/LandingPage.js';
import { renderEarlyWarningPage } from './pages/EarlyWarningPage.js';
import { renderLogisticsPage } from './pages/LogisticsPage.js';
import { renderDamageReportPage } from './pages/DamageReportPage.js';
import { renderClaimsPage } from './pages/ClaimsPage.js';
import { renderSoilRecoveryPage } from './pages/SoilRecoveryPage.js';
import { renderEmergencyPage } from './pages/EmergencyPage.js';
import { renderFarmerDashboardPage } from './pages/FarmerDashboardPage.js';
import { renderAdminDashboardPage } from './pages/AdminDashboardPage.js';

// Application State
const appState = {
  activePage: 'home',
  activeClaimForModal: null,
  damagePageState: {
    analysisResult: null,
    isAnalyzing: false,
    uploadedImageSrc: null
  },
  soilPageState: {
    generatedPlan: null
  },
  adminFilterState: {
    selectedDistrict: 'ALL',
    selectedRisk: 'ALL'
  }
};

// Main App Render Loop
export function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  const data = storageService.getData();

  // Determine active view
  let pageContent = '';
  switch (appState.activePage) {
    case 'home':
      pageContent = renderLandingPage();
      break;
    case 'early-warning':
      pageContent = renderEarlyWarningPage();
      break;
    case 'logistics':
      pageContent = renderLogisticsPage();
      break;
    case 'damage-report':
      pageContent = renderDamageReportPage(appState.damagePageState);
      break;
    case 'claims':
      pageContent = renderClaimsPage();
      break;
    case 'soil-recovery':
      pageContent = renderSoilRecoveryPage(appState.soilPageState);
      break;
    case 'emergency':
      pageContent = renderEmergencyPage();
      break;
    case 'farmer-dashboard':
      pageContent = renderFarmerDashboardPage();
      break;
    case 'admin-dashboard':
      pageContent = renderAdminDashboardPage(appState.adminFilterState);
      break;
    default:
      pageContent = renderLandingPage();
  }

  root.innerHTML = `
    ${renderOfflineBanner()}
    ${renderNavbar(appState.activePage)}
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      ${pageContent}
    </main>

    ${renderFooter()}
    ${renderQuickSOSModal()}
    ${renderClaimCertificateModal(appState.activeClaimForModal)}
  `;

  // Initialize Maps after DOM is injected
  setTimeout(() => {
    initPageMaps();
  }, 100);
}

function initPageMaps() {
  const data = storageService.getData();

  if (appState.activePage === 'early-warning' && document.getElementById('early-warning-map')) {
    const map = initLeafletMap('early-warning-map', { zoom: 10, center: [26.25, 86.65] });
    if (map) populateMapLayers(map, data, { sensors: true, shelters: true, transporters: false, rescue: false });
  } else if (appState.activePage === 'logistics' && document.getElementById('logistics-map')) {
    const map = initLeafletMap('logistics-map', { zoom: 10, center: [26.20, 86.60] });
    if (map) populateMapLayers(map, data, { sensors: false, shelters: false, transporters: true, rescue: false });
  } else if (appState.activePage === 'soil-recovery' && document.getElementById('soil-map')) {
    const map = initLeafletMap('soil-map', { zoom: 10, center: [26.24, 86.58] });
    if (map) populateMapLayers(map, data, { sensors: false, shelters: false, transporters: false, rescue: false });
  } else if (appState.activePage === 'emergency' && document.getElementById('emergency-map')) {
    const map = initLeafletMap('emergency-map', { zoom: 10, center: [26.25, 86.62] });
    if (map) populateMapLayers(map, data, { sensors: true, shelters: true, transporters: false, rescue: true });
  } else if (appState.activePage === 'admin-dashboard' && document.getElementById('admin-master-map')) {
    const map = initLeafletMap('admin-master-map', { zoom: 10, center: [26.20, 86.65] });
    if (map) populateMapLayers(map, data, { sensors: true, shelters: true, transporters: true, rescue: true });
  }
}

// Global Window Event Handlers & API Bridges
window.appNavigate = function(pageId) {
  appState.activePage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
};

window.setLanguage = function(lang) {
  storageService.setCurrentLanguage(lang);
  renderApp();
};

window.switchActiveRole = function(roleKey) {
  authService.switchRole(roleKey);
  // Smart redirect based on role
  if (roleKey === 'FARMER') appState.activePage = 'farmer-dashboard';
  else if (roleKey === 'TRANSPORTER') appState.activePage = 'logistics';
  else if (roleKey === 'OFFICER') appState.activePage = 'claims';
  else if (roleKey === 'ADMIN') appState.activePage = 'admin-dashboard';
  else if (roleKey === 'NGO') appState.activePage = 'emergency';
  renderApp();
};

window.toggleMobileMenu = function() {
  const drawer = document.getElementById('mobile-nav-drawer');
  if (drawer) drawer.classList.toggle('hidden');
};

window.resetDemoData = function() {
  storageService.resetToDefault();
  appState.damagePageState.analysisResult = null;
  appState.soilPageState.generatedPlan = null;
  alert('KosiManthan demo dataset has been reset to default state.');
  renderApp();
};

// SOS Modal Handlers
window.openQuickSOSModal = function() {
  const modal = document.getElementById('quick-sos-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeQuickSOSModal = function() {
  const modal = document.getElementById('quick-sos-modal');
  if (modal) modal.classList.add('hidden');
};

window.handleSOSSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('sos-name')?.value || 'Kisan Ramesh';
  const phone = document.getElementById('sos-phone')?.value || '+91 91224 81920';
  const count = Number(document.getElementById('sos-people-count')?.value) || 4;
  const location = document.getElementById('sos-location')?.value || 'Marauna Island';
  const hasInfants = document.getElementById('sos-has-infants')?.checked || false;
  const hasElderly = document.getElementById('sos-has-elderly')?.checked || false;

  const data = storageService.getData();
  const newSOS = {
    id: `SOS-2026-${Date.now().toString().slice(-4)}`,
    name: `${name} & ${count} family members`,
    phone,
    locationName: location,
    lat: 26.2420,
    lng: 86.5230,
    peopleCount: count,
    hasInfants,
    hasElderly,
    urgency: "CRITICAL",
    waterLevelRising: "Rising rapidly - High Ground Alert",
    status: "BOAT_DISPATCHED",
    assignedUnit: "NDRF Motorboat Unit Bravo-1 (Dispatched)",
    etaMinutes: 12,
    reportedAt: "Just now"
  };

  data.rescueOperations.sosRequests.unshift(newSOS);
  storageService.saveData(data);

  window.closeQuickSOSModal();
  alert(`🚨 SOS Broadcast Transmitted!\n\nUnit: NDRF Motorboat Bravo-1 dispatched to ${location}.\nETA: 12 minutes.`);
  appState.activePage = 'emergency';
  renderApp();
};

// Logistics Handlers
window.handleEvacRequestSubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('evac-farmer-name')?.value || 'Kisan Ramesh';
  const phone = document.getElementById('evac-phone')?.value || '+91 91224 81920';
  const village = document.getElementById('evac-village')?.value || 'Marauna';
  const crop = document.getElementById('evac-crop')?.value || 'Aman Paddy';
  const qty = document.getElementById('evac-qty')?.value || '2.5 Tonnes';
  const equip = document.getElementById('evac-equipment')?.value || '1x 5HP Pump';
  const dest = document.getElementById('evac-destination')?.value || 'Supaul Safe Godown';
  const urgency = document.getElementById('evac-urgency')?.value || 'HIGH';

  const data = storageService.getData();
  const newReq = {
    id: `REQ-LOG-${Math.floor(100 + Math.random() * 900)}`,
    farmerId: 'FARM-001',
    farmerName: name,
    phone,
    village,
    pickupLat: 26.2410,
    pickupLng: 86.5220,
    destination: dest,
    cropType: crop,
    quantity: qty,
    equipment: equip,
    urgency,
    status: 'MATCHED',
    assignedTransporterId: 'TRP-101',
    transporterName: 'Kishore Yadav (Tractor T-101)',
    etaMinutes: 18,
    createdAt: new Date().toISOString()
  };

  data.transportRequests.unshift(newReq);
  storageService.saveData(data);

  alert(`🚚 Evacuation Request Broadcast Successful!\n\nMatched with Kishore Yadav (Tractor Trolley 3.5T).\nPickup ETA: ~18 mins.`);
  renderApp();
};

window.quickMatchRequest = function(reqId) {
  logisticsService.matchRequestWithTransporter(reqId, 'TRP-101');
  renderApp();
};

// Damage Assessment Handlers
window.selectSamplePhoto = function(cropType) {
  const cropSelect = document.getElementById('dmg-crop-type');
  const label = document.getElementById('dmg-upload-label');
  if (cropSelect) cropSelect.value = cropType === 'paddy' ? 'Paddy' : cropType === 'maize' ? 'Maize' : 'Makhana';
  if (label) label.innerText = `Selected sample: ${cropType.toUpperCase()} flood inundation capture (GPS EXIF Loaded)`;
};

window.handleImageSelected = function(event) {
  const file = event.target.files[0];
  if (file) {
    const label = document.getElementById('dmg-upload-label');
    if (label) label.innerText = `Uploaded: ${file.name} (Geo-coordinates extracted)`;
  }
};

window.handleDamageAnalysisSubmit = async function(event) {
  event.preventDefault();
  const crop = document.getElementById('dmg-crop-type')?.value || 'Paddy';
  const acres = document.getElementById('dmg-land-acres')?.value || '4.5';
  const days = document.getElementById('dmg-submersion-days')?.value || '4';
  const depth = document.getElementById('dmg-depth-cm')?.value || '110';

  appState.damagePageState.isAnalyzing = true;
  renderApp();

  const result = await damageAiService.analyzeDamage({
    cropType: crop,
    acres: Number(acres),
    submersionDays: Number(days),
    floodDepthCm: Number(depth)
  });

  appState.damagePageState.isAnalyzing = false;
  appState.damagePageState.analysisResult = result;
  renderApp();
};

window.submitGeneratedClaimNow = function() {
  const res = appState.damagePageState.analysisResult;
  if (!res) return;

  const data = storageService.getData();
  const newClaim = {
    id: `DMG-2026-${Math.floor(100 + Math.random() * 900)}`,
    farmerId: 'FARM-001',
    farmerName: 'Ramesh Kumar Mandal',
    kisanAadhaar: 'XXXX-XXXX-8492',
    crop: res.cropAnalyzed,
    village: 'Marauna',
    district: 'Supaul',
    landAreaAcres: 4.5,
    submergedAcres: 3.8,
    floodDepthCm: 110,
    submersionDays: 4,
    aiAnalysis: {
      lossPercentage: res.lossPercentage,
      confidence: res.confidenceScore,
      impactLevel: res.impactLevel,
      vegetativeLoss: res.vegetativeLossDesc,
      siltDepositionCm: res.siltDepositionCm,
      waterloggingScore: res.waterloggingScore,
      salvageableYield: res.salvageableYield,
      estimatedFinancialLossINR: res.estimatedFinancialLossINR
    },
    claimStatus: 'AI_VERIFIED',
    officerRemarks: 'Submitted via KosiVision AI. Ready for Circle Officer approval.',
    compensationAmountINR: res.recommendedCompensationINR,
    dbtTransactionId: null,
    submittedAt: new Date().toISOString()
  };

  data.damageReports.unshift(newClaim);
  storageService.saveData(data);

  alert(`✅ Verified Crop Damage Claim Registered!\n\nClaim ID: ${newClaim.id}\nEligible DBT: ₹ ${newClaim.compensationAmountINR.toLocaleString('en-IN')}`);
  appState.activePage = 'claims';
  renderApp();
};

// Claims Approval & Certificate Handlers
window.approveClaimNow = function(claimId) {
  const data = storageService.getData();
  const claim = data.damageReports.find((c) => c.id === claimId);
  if (claim) {
    claim.claimStatus = 'APPROVED';
    claim.dbtTransactionId = `DBT-BIHAR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    claim.approvedAt = new Date().toISOString();
    storageService.saveData(data);
    alert(`🏛️ Claim ${claimId} APPROVED by Officer Sunita Jha!\n\nDBT Transaction ID: ${claim.dbtTransactionId}\nDirect bank credit triggered.`);
    renderApp();
  }
};

window.openClaimCertificateModal = function(claimId) {
  const data = storageService.getData();
  const claim = data.damageReports.find((c) => c.id === claimId);
  if (claim) {
    appState.activeClaimForModal = claim;
    renderApp();
  }
};

window.closeClaimCertificateModal = function() {
  appState.activeClaimForModal = null;
  renderApp();
};

window.printClaimCertificate = function() {
  window.print();
};

// Soil Recovery Handlers
window.handleSoilAnalysisSubmit = function(event) {
  event.preventDefault();
  const ph = document.getElementById('soil-ph')?.value || 6.2;
  const n = document.getElementById('soil-nitrogen')?.value || 142;
  const silt = document.getElementById('soil-silt-cm')?.value || 22;

  const plan = soilAiService.generateRecoveryPlan({
    pH: ph,
    nitrogen: n,
    siltCm: silt,
    district: 'Supaul'
  });

  appState.soilPageState.generatedPlan = plan;
  alert('🌱 AI Agronomist Recovery Plan Generated!');
  renderApp();
};

// Rescue Dispatch Handlers
window.dispatchRescueBoat = function(sosId) {
  const data = storageService.getData();
  const sos = data.rescueOperations.sosRequests.find((s) => s.id === sosId);
  if (sos) {
    sos.status = 'BOAT_DISPATCHED';
    sos.assignedUnit = 'NDRF Motorboat Unit B-04 (Dispatched)';
    sos.etaMinutes = 14;
    storageService.saveData(data);
    alert(`🚤 Rescue Boat dispatched to ${sos.locationName}! ETA: 14 mins.`);
    renderApp();
  }
};

window.markSOSRescued = function(sosId) {
  const data = storageService.getData();
  const sos = data.rescueOperations.sosRequests.find((s) => s.id === sosId);
  if (sos) {
    sos.status = 'RESCUED';
    storageService.saveData(data);
    alert(`✓ Citizens from ${sos.locationName} have been safely transported to High School Safe Shelter.`);
    renderApp();
  }
};

// Offline Sync Handler
window.syncOfflineQueueNow = function() {
  storageService.clearOfflineQueue();
  alert('⚡ All offline queued reports synced with Kosi Central Disaster Database.');
  renderApp();
};

// Admin Filter Handler
window.handleAdminFilterChange = function() {
  const dist = document.getElementById('admin-filter-district')?.value || 'ALL';
  const risk = document.getElementById('admin-filter-risk')?.value || 'ALL';
  appState.adminFilterState.selectedDistrict = dist;
  appState.adminFilterState.selectedRisk = risk;
  renderApp();
};

// Boot App on Load
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  
  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('[KosiManthan] Service Worker Active.'))
      .catch((err) => console.log('[KosiManthan] SW Registration notice:', err));
  }
});
