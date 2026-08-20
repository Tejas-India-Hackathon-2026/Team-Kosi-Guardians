// Auth & Role Management Service for KosiManthan
import { storageService } from './storageService.js';

export const authService = {
  getProfiles() {
    const data = storageService.getData();
    return data.currentUserProfiles;
  },

  getCurrentUser() {
    const role = storageService.getCurrentRole();
    const profiles = this.getProfiles();
    return profiles[role] || profiles.FARMER;
  },

  switchRole(roleKey) {
    if (['FARMER', 'TRANSPORTER', 'OFFICER', 'NGO', 'ADMIN'].includes(roleKey)) {
      storageService.setCurrentRole(roleKey);
      return this.getCurrentUser();
    }
    return null;
  },

  getAvailableRoles() {
    return [
      { key: 'FARMER', label: 'Farmer (Ramesh Kumar)', badge: '🌾 Kisan Portal', color: 'emerald' },
      { key: 'TRANSPORTER', label: 'Transporter (Kishore Yadav)', badge: '🚚 Logistics Hub', color: 'blue' },
      { key: 'OFFICER', label: 'Govt Officer (Sunita Jha BDO)', badge: '🏛️ Approvals & Claims', color: 'amber' },
      { key: 'NGO', label: 'NGO Relief (Aarav Relief)', badge: '🤝 Field Operations', color: 'purple' },
      { key: 'ADMIN', label: 'Disaster Admin (State BSDMA)', badge: '🛡️ Macro Command Center', color: 'red' }
    ];
  }
};
