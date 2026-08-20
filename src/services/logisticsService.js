// GPS Matching & Logistics Dispatch Service for Pre-flood Evacuation
import { storageService } from './storageService.js';

export const logisticsService = {
  // Haversine distance in km
  calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 5.0;
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  },

  findBestTransporters(pickupLat, pickupLng, requiredTonnes = 2.0) {
    const data = storageService.getData();
    const transporters = data.transporters || [];

    return transporters
      .map((t) => {
        const distanceKm = this.calculateDistance(pickupLat, pickupLng, t.currentLat, t.currentLng);
        const etaMin = Math.round((distanceKm / 22) * 60) + 5; // approx 22 km/h rural road speed
        const capacityMatch = t.capacityTonnes >= requiredTonnes;

        return {
          ...t,
          distanceKm,
          etaMinutes: etaMin,
          capacityMatch
        };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  },

  matchRequestWithTransporter(requestId, transporterId) {
    const data = storageService.getData();
    const reqIndex = data.transportRequests.findIndex((r) => r.id === requestId);
    const trp = data.transporters.find((t) => t.id === transporterId);

    if (reqIndex !== -1 && trp) {
      data.transportRequests[reqIndex].status = 'MATCHED';
      data.transportRequests[reqIndex].assignedTransporterId = trp.id;
      data.transportRequests[reqIndex].transporterName = `${trp.name} (${trp.vehicleType})`;
      data.transportRequests[reqIndex].etaMinutes = 20;

      // Update transporter status
      trp.status = 'BUSY';

      storageService.saveData(data);
      return data.transportRequests[reqIndex];
    }
    return null;
  }
};
