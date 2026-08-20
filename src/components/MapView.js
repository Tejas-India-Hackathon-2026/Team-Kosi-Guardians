// Interactive Leaflet Map Component with Multi-Layer Toggles
export function initLeafletMap(containerId, options = {}) {
  const defaultCenter = [26.25, 86.65];
  const zoom = options.zoom || 10;

  if (typeof L === 'undefined') {
    console.warn('Leaflet (L) is not loaded yet');
    return null;
  }

  const mapContainer = document.getElementById(containerId);
  if (!mapContainer) return null;

  // Clear existing map instance if any
  if (mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null;
    mapContainer.innerHTML = '';
  }

  const map = L.map(containerId, {
    center: options.center || defaultCenter,
    zoom: zoom,
    zoomControl: true
  });

  // Dark OpenStreetMap CartoDB Tiles for aesthetic disaster look
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 18
  }).addTo(map);

  return map;
}

export function populateMapLayers(map, data, activeFilters = { sensors: true, shelters: true, transporters: true, rescue: true, villages: true }) {
  if (!map || typeof L === 'undefined') return;

  // Custom Icon Factory
  const createMarkerIcon = (emoji, bgColor = '#059669', borderColor = '#ffffff', pulse = false) => {
    return L.divIcon({
      className: 'custom-map-icon',
      html: `
        <div style="
          width: 32px; 
          height: 32px; 
          background: ${bgColor}; 
          border: 2px solid ${borderColor}; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 16px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          ${pulse ? 'animation: pulse 1.5s infinite;' : ''}
        ">
          ${emoji}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  };

  // 1. Flood Sensors Layer
  if (activeFilters.sensors && data.sensors) {
    data.sensors.forEach((s) => {
      const isCrit = s.status === 'CRITICAL';
      const isWarn = s.status === 'WARNING';
      const color = isCrit ? '#dc2626' : isWarn ? '#d97706' : '#059669';

      const marker = L.marker([s.lat, s.lng], {
        icon: createMarkerIcon('🌊', color, '#ffffff', isCrit)
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 12px; line-height: 1.4; min-width: 180px;">
          <b style="font-size: 13px; color: ${color};">${s.name}</b><br>
          <span style="color: #64748b;">District:</span> <b>${s.district}</b><br>
          <span style="color: #64748b;">Water Level:</span> <b style="color: #dc2626;">${s.currentLevel}m</b> (Danger: ${s.dangerLevel}m)<br>
          <span style="color: #64748b;">Discharge:</span> <b>${s.discharge}</b><br>
          <span style="color: #64748b;">Trend:</span> <b>${s.trend}</b><br>
          <span style="display:inline-block; margin-top: 4px; padding: 2px 6px; background: ${color}20; color: ${color}; font-weight: bold; border-radius: 4px;">
            Status: ${s.status}
          </span>
        </div>
      `);
    });
  }

  // 2. Safe Shelters Layer
  if (activeFilters.shelters && data.shelters) {
    data.shelters.forEach((sh) => {
      const marker = L.marker([sh.lat, sh.lng], {
        icon: createMarkerIcon('🏥', '#0284c7', '#ffffff')
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 12px; line-height: 1.4; min-width: 190px;">
          <b style="font-size: 13px; color: #0284c7;">${sh.name}</b><br>
          <span style="color: #64748b;">Capacity:</span> <b>${sh.occupied} / ${sh.capacity} Persons</b><br>
          <span style="color: #64748b;">Facilities:</span> <i>${sh.facilities ? sh.facilities.join(', ') : 'Medical, Food, Water'}</i>
        </div>
      `);
    });
  }

  // 3. Transporters Fleet Layer
  if (activeFilters.transporters && data.transporters) {
    data.transporters.forEach((tr) => {
      const marker = L.marker([tr.currentLat, tr.currentLng], {
        icon: createMarkerIcon('🚚', '#4f46e5', '#ffffff')
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 12px; line-height: 1.4; min-width: 180px;">
          <b style="font-size: 13px; color: #4f46e5;">${tr.name}</b><br>
          <span style="color: #64748b;">Vehicle:</span> <b>${tr.vehicleType}</b><br>
          <span style="color: #64748b;">Capacity:</span> <b>${tr.capacityTonnes} Tonnes</b><br>
          <span style="color: #64748b;">Status:</span> <b style="color: #10b981;">${tr.status}</b><br>
          <span style="color: #64748b;">Phone:</span> ${tr.phone}
        </div>
      `);
    });
  }

  // 4. Rescue Boats & SOS Requests
  if (activeFilters.rescue && data.rescueOperations) {
    if (data.rescueOperations.boatFleet) {
      data.rescueOperations.boatFleet.forEach((b) => {
        const marker = L.marker([b.lat, b.lng], {
          icon: createMarkerIcon('🚤', '#0891b2', '#ffffff')
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif; font-size: 12px; line-height: 1.4;">
            <b style="color: #0891b2;">${b.name}</b><br>
            <span>Type: ${b.type} (Cap: ${b.capacity})</span><br>
            <span>Status: <b>${b.status}</b></span>
          </div>
        `);
      });
    }

    if (data.rescueOperations.sosRequests) {
      data.rescueOperations.sosRequests.forEach((sos) => {
        const isCrit = sos.urgency === 'CRITICAL';
        const marker = L.marker([sos.lat, sos.lng], {
          icon: createMarkerIcon('🆘', '#e11d48', '#ffffff', isCrit)
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif; font-size: 12px; line-height: 1.4; min-width: 180px;">
            <b style="color: #e11d48;">🚨 SOS: ${sos.name}</b><br>
            <span>Location: <b>${sos.locationName}</b></span><br>
            <span>Trapped: <b>${sos.peopleCount} Persons</b></span><br>
            <span>Status: <b>${sos.status}</b></span><br>
            <span>Unit: ${sos.assignedUnit || 'Seeking Craft'}</span>
          </div>
        `);
      });
    }
  }

  // 5. Inundation River Path Polyline
  const kosiRiverCourse = [
    [26.5186, 86.9912], // Birpur Barrage
    [26.4000, 86.8000],
    [26.3142, 86.5891], // Nirmali
    [26.2405, 86.5211], // Marauna
    [26.1264, 86.6042], // Supaul
    [26.0021, 86.5348], // Nauhatta
    [25.8900, 86.4800], // Mahishi
    [25.5684, 86.6854]  // Baltara
  ];

  L.polyline(kosiRiverCourse, {
    color: '#0284c7',
    weight: 6,
    opacity: 0.7,
    dashArray: '8, 8',
    smoothFactor: 1
  }).addTo(map).bindPopup('<b>Main Kosi River Embankment Corridor (Active Flood Wave)</b>');
}
