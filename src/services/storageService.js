// Centralized Storage Service with LocalStorage persistence & Offline sync queue
import { initialMockData } from '../data/mockData.js';

const STORAGE_KEY = 'kosimanthan_app_data_v1';
const OFFLINE_QUEUE_KEY = 'kosimanthan_offline_queue_v1';
const CURRENT_ROLE_KEY = 'kosimanthan_current_role';
const CURRENT_LANG_KEY = 'kosimanthan_current_lang';

export const storageService = {
  getData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read from localStorage:', e);
    }
    // Initialize default if not present
    this.saveData(initialMockData);
    return initialMockData;
  },

  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('kosimanthan_data_updated', { detail: data }));
    } catch (e) {
      console.error('Failed to write to localStorage:', e);
    }
  },

  resetToDefault() {
    this.saveData(initialMockData);
    return initialMockData;
  },

  getCurrentRole() {
    return localStorage.getItem(CURRENT_ROLE_KEY) || 'FARMER';
  },

  setCurrentRole(role) {
    localStorage.setItem(CURRENT_ROLE_KEY, role);
    window.dispatchEvent(new CustomEvent('kosimanthan_role_changed', { detail: role }));
  },

  getCurrentLanguage() {
    return localStorage.getItem(CURRENT_LANG_KEY) || 'en';
  },

  setCurrentLanguage(lang) {
    localStorage.setItem(CURRENT_LANG_KEY, lang);
    window.dispatchEvent(new CustomEvent('kosimanthan_lang_changed', { detail: lang }));
  },

  // Offline Sync Queue
  getOfflineQueue() {
    try {
      const queue = localStorage.getItem(OFFLINE_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (e) {
      return [];
    }
  },

  addToOfflineQueue(item) {
    const queue = this.getOfflineQueue();
    queue.push({
      ...item,
      queuedAt: new Date().toISOString(),
      id: `OFFLINE-Q-${Date.now()}`
    });
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new CustomEvent('kosimanthan_offline_queue_updated', { detail: queue }));
  },

  clearOfflineQueue() {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('kosimanthan_offline_queue_updated', { detail: [] }));
  }
};
