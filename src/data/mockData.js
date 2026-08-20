// KosiManthan Initial Real-world Demo Dataset for Kosi Basin, Bihar
export const initialMockData = {
  systemStatus: {
    basin: "Kosi River Basin (North Bihar)",
    activeAlertLevel: "WARNING", // SAFE, WATCH, WARNING, CRITICAL
    dischargeAtBirpur: "385,420 cusecs",
    trend: "RISING",
    evacuationWindowHours: 32,
    lastUpdated: new Date().toISOString(),
    meshRelayActive: true,
    radioChannel: "87.5 FM / LoRa Node KOSI-04",
    offlineSyncPendingCount: 0
  },

  sensors: [
    {
      id: "SNS-KOSI-01",
      name: "Birpur Barrage (Indo-Nepal Headworks)",
      district: "Supaul",
      block: "Birpur",
      lat: 26.5186,
      lng: 86.9912,
      currentLevel: 75.82,
      dangerLevel: 74.50,
      discharge: "385,420 cusecs",
      status: "CRITICAL",
      trend: "Rising +12cm/hr",
      battery: 98,
      lastUpdated: "5 mins ago",
      history: [72.1, 72.8, 73.5, 74.2, 75.1, 75.82]
    },
    {
      id: "SNS-KOSI-02",
      name: "Nirmali Western Embankment (KM-42)",
      district: "Supaul",
      block: "Nirmali",
      lat: 26.3142,
      lng: 86.5891,
      currentLevel: 60.45,
      dangerLevel: 59.80,
      discharge: "310,000 cusecs",
      status: "WARNING",
      trend: "Rising +8cm/hr",
      battery: 94,
      lastUpdated: "8 mins ago",
      history: [57.5, 58.1, 58.9, 59.4, 60.0, 60.45]
    },
    {
      id: "SNS-KOSI-03",
      name: "Supaul Rail Bridge Gauging Station",
      district: "Supaul",
      block: "Supaul Sadar",
      lat: 26.1264,
      lng: 86.6042,
      currentLevel: 52.40,
      dangerLevel: 51.50,
      discharge: "295,000 cusecs",
      status: "WARNING",
      trend: "Rising +6cm/hr",
      battery: 91,
      lastUpdated: "3 mins ago",
      history: [49.8, 50.4, 51.0, 51.6, 52.0, 52.4]
    },
    {
      id: "SNS-KOSI-04",
      name: "Baltara Gauge (Downstream Confluence)",
      district: "Khagaria",
      block: "Chautham",
      lat: 25.5684,
      lng: 86.6854,
      currentLevel: 34.62,
      dangerLevel: 33.85,
      discharge: "412,000 cusecs",
      status: "CRITICAL",
      trend: "Rising +14cm/hr",
      battery: 89,
      lastUpdated: "12 mins ago",
      history: [31.5, 32.2, 33.0, 33.7, 34.2, 34.62]
    },
    {
      id: "SNS-KOSI-05",
      name: "Nauhatta Eastern Guide Bundh",
      district: "Saharsa",
      block: "Nauhatta",
      lat: 26.0021,
      lng: 86.5348,
      currentLevel: 47.10,
      dangerLevel: 47.50,
      discharge: "240,000 cusecs",
      status: "WATCH",
      trend: "Stable +1cm/hr",
      battery: 96,
      lastUpdated: "15 mins ago",
      history: [45.8, 46.2, 46.6, 46.9, 47.0, 47.1]
    },
    {
      id: "SNS-KOSI-06",
      name: "Madhepura Branch Canal Offtake",
      district: "Madhepura",
      block: "Singheshwar",
      lat: 25.9812,
      lng: 86.8041,
      currentLevel: 38.20,
      dangerLevel: 40.50,
      discharge: "85,000 cusecs",
      status: "SAFE",
      trend: "Falling -2cm/hr",
      battery: 100,
      lastUpdated: "20 mins ago",
      history: [39.0, 38.8, 38.6, 38.4, 38.3, 38.2]
    }
  ],

  villages: [
    { id: "VIL-01", name: "Marauna", block: "Marauna", district: "Supaul", population: 6400, risk: "CRITICAL", lat: 26.2405, lng: 86.5211, shelter: "Marauna High School Camp" },
    { id: "VIL-02", name: "Nirmali Ward-4", block: "Nirmali", district: "Supaul", population: 8200, risk: "WARNING", lat: 26.3142, lng: 86.5891, shelter: "Nirmali College Safe Zone" },
    { id: "VIL-03", name: "Saraigarh Bhaptiyahi", block: "Saraigarh", district: "Supaul", population: 5100, risk: "WARNING", lat: 26.2100, lng: 86.6200, shelter: "Block Relief Complex" },
    { id: "VIL-04", name: "Kishanpur", block: "Kishanpur", district: "Supaul", population: 7300, risk: "WATCH", lat: 26.0850, lng: 86.6500, shelter: "Panchayat Bhavan" },
    { id: "VIL-05", name: "Nauhatta Diara", block: "Nauhatta", district: "Saharsa", population: 9100, risk: "WARNING", lat: 26.0021, lng: 86.5348, shelter: "Nauhatta ITI Ground" },
    { id: "VIL-06", name: "Mahishi Embankment", block: "Mahishi", district: "Saharsa", population: 4800, risk: "WATCH", lat: 25.8900, lng: 86.4800, shelter: "Ugra Tara Temple High Ground" },
    { id: "VIL-07", name: "Alamnagar", block: "Alamnagar", district: "Madhepura", population: 6800, risk: "SAFE", lat: 25.5600, lng: 86.8900, shelter: "Community Centre" }
  ],

  shelters: [
    { id: "SHL-01", name: "Nirmali High School & Stadium Safe Zone", capacity: 2500, occupied: 820, lat: 26.3200, lng: 86.5920, facilities: ["Medical Clinic", "Clean Water", "Cattle Fodder", "Solar Power"] },
    { id: "SHL-02", name: "Supaul Sadar ITI Flood Refuge", capacity: 4000, occupied: 1450, lat: 26.1290, lng: 86.6100, facilities: ["Doctor on Duty", "Grain Storage", "Community Kitchen", "Baby Care"] },
    { id: "SHL-03", name: "Saraigarh Railway Elevated Platform Camp", capacity: 1800, occupied: 630, lat: 26.2150, lng: 86.6250, facilities: ["Water Tankers", "First Aid", "Sanitation Blocks"] },
    { id: "SHL-04", name: "Nauhatta Block Relief Complex", capacity: 3200, occupied: 900, lat: 26.0100, lng: 86.5400, facilities: ["Helipad", "NDRF Base", "Storage Warehouse", "Cattle Camp"] }
  ],

  transporters: [
    {
      id: "TRP-101",
      name: "Kishore Yadav",
      phone: "+91 98351 44102",
      vehicleType: "Tractor Trolley (Heavy 4WD)",
      registration: "BR-50-A-4102",
      capacityTonnes: 3.5,
      currentLat: 26.3050,
      currentLng: 86.5750,
      baseVillage: "Nirmali",
      status: "AVAILABLE", // AVAILABLE, BUSY, EN_ROUTE
      rating: 4.9,
      completedTrips: 18
    },
    {
      id: "TRP-102",
      name: "Munna Singh",
      phone: "+91 94312 88219",
      vehicleType: "Tata 407 Mini-Truck",
      registration: "BR-50-G-9821",
      capacityTonnes: 2.8,
      currentLat: 26.1350,
      currentLng: 86.6010,
      baseVillage: "Supaul Sadar",
      status: "AVAILABLE",
      rating: 4.8,
      completedTrips: 24
    },
    {
      id: "TRP-103",
      name: "Rajesh Kumar Sharma",
      phone: "+91 99344 12093",
      vehicleType: "Mahindra Bolero Maxi-Truck",
      registration: "BR-19-E-5512",
      capacityTonnes: 1.6,
      currentLat: 26.0150,
      currentLng: 86.5410,
      baseVillage: "Nauhatta",
      status: "BUSY",
      rating: 4.7,
      completedTrips: 15
    },
    {
      id: "TRP-104",
      name: "Birendra Paswan",
      phone: "+91 97710 33814",
      vehicleType: "Eicher 3-Tonne Truck",
      registration: "BR-43-B-7711",
      capacityTonnes: 3.0,
      currentLat: 25.9750,
      currentLng: 86.8100,
      baseVillage: "Singheshwar",
      status: "AVAILABLE",
      rating: 4.9,
      completedTrips: 31
    }
  ],

  transportRequests: [
    {
      id: "REQ-LOG-801",
      farmerId: "FARM-001",
      farmerName: "Ramesh Kumar Mandal",
      phone: "+91 91224 81920",
      village: "Marauna (Ward 3)",
      pickupLat: 26.2410,
      pickupLng: 86.5220,
      destination: "Supaul FCI Central Safe Godown",
      cropType: "Harvested Paddy (Aman) & Mustard Seeds",
      quantity: "2.4 Tonnes (48 Quintals)",
      equipment: "1x 5HP Diesel Irrigation Pump + 2x Sprayers",
      urgency: "HIGH", // HIGH, CRITICAL, MEDIUM
      status: "MATCHED", // PENDING, MATCHED, IN_TRANSIT, COMPLETED
      assignedTransporterId: "TRP-101",
      transporterName: "Kishore Yadav (Tractor T-101)",
      etaMinutes: 25,
      createdAt: "2026-08-19T08:30:00Z"
    },
    {
      id: "REQ-LOG-802",
      farmerId: "FARM-002",
      farmerName: "Sunita Devi",
      phone: "+91 98350 11982",
      village: "Nirmali Diara",
      pickupLat: 26.3160,
      pickupLng: 86.5880,
      destination: "Nirmali High School Elevated Warehouse",
      cropType: "Maize (Corn) Cobs + Livestock Fodder",
      quantity: "1.8 Tonnes",
      equipment: "Thresher Unit + 4 Cattle (Dairy Cows)",
      urgency: "CRITICAL",
      status: "PENDING",
      assignedTransporterId: null,
      transporterName: null,
      etaMinutes: null,
      createdAt: "2026-08-19T09:15:00Z"
    },
    {
      id: "REQ-LOG-803",
      farmerId: "FARM-003",
      farmerName: "Mohammad Aslam",
      phone: "+91 94308 67210",
      village: "Nauhatta Char",
      pickupLat: 26.0040,
      pickupLng: 86.5360,
      destination: "Saharsa Krishi Vigyan Kendra Warehouse",
      cropType: "Raw Jute Bundles & Pulses (Moong)",
      quantity: "3.1 Tonnes",
      equipment: "Solar Power Submersible Kit",
      urgency: "HIGH",
      status: "IN_TRANSIT",
      assignedTransporterId: "TRP-103",
      transporterName: "Rajesh Sharma (Bolero Truck)",
      etaMinutes: 12,
      createdAt: "2026-08-19T07:45:00Z"
    }
  ],

  damageReports: [
    {
      id: "DMG-2026-091",
      farmerId: "FARM-001",
      farmerName: "Ramesh Kumar Mandal",
      kisanAadhaar: "XXXX-XXXX-8492",
      crop: "Paddy (Swarna Sub-1)",
      village: "Marauna",
      district: "Supaul",
      landAreaAcres: 4.5,
      submergedAcres: 3.8,
      floodDepthCm: 110,
      submersionDays: 4,
      imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
      aiAnalysis: {
        lossPercentage: 78,
        confidence: 94,
        impactLevel: "HIGH",
        vegetativeLoss: "85% Rot / Chlorosis",
        siltDepositionCm: 18,
        waterloggingScore: "Severe (96h)",
        salvageableYield: "22% (Straw only)",
        estimatedFinancialLossINR: 112000
      },
      claimStatus: "AI_VERIFIED", // SUBMITTED, AI_VERIFIED, OFFICER_REVIEW, APPROVED, DISBURSED
      officerRemarks: "Field coordinates cross-referenced with Sentinel-2 SAR inundation mask. Damage verified.",
      compensationAmountINR: 98000,
      dbtTransactionId: "DBT-BIHAR-2026-9812",
      submittedAt: "2026-08-19T09:30:00Z"
    },
    {
      id: "DMG-2026-092",
      farmerId: "FARM-004",
      farmerName: "Rakesh Mandal",
      kisanAadhaar: "XXXX-XXXX-3312",
      crop: "Maize (Hybrid Ganga-11)",
      village: "Mahishi Embankment",
      district: "Saharsa",
      landAreaAcres: 3.2,
      submergedAcres: 2.9,
      floodDepthCm: 85,
      submersionDays: 3,
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
      aiAnalysis: {
        lossPercentage: 68,
        confidence: 91,
        impactLevel: "HIGH",
        vegetativeLoss: "Stalk collapse & fungal ear rot",
        siltDepositionCm: 12,
        waterloggingScore: "Moderate (72h)",
        salvageableYield: "32% (Green fodder)",
        estimatedFinancialLossINR: 74000
      },
      claimStatus: "OFFICER_REVIEW",
      officerRemarks: "Under joint review by Circle Officer and Block Agriculture Officer.",
      compensationAmountINR: 65000,
      dbtTransactionId: null,
      submittedAt: "2026-08-19T08:00:00Z"
    },
    {
      id: "DMG-2026-093",
      farmerId: "FARM-002",
      farmerName: "Sunita Devi",
      kisanAadhaar: "XXXX-XXXX-9921",
      crop: "Makhana (Fox Nut Pond)",
      village: "Nirmali Ward-4",
      district: "Supaul",
      landAreaAcres: 2.0,
      submergedAcres: 2.0,
      floodDepthCm: 160,
      submersionDays: 6,
      imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      aiAnalysis: {
        lossPercentage: 92,
        confidence: 96,
        impactLevel: "CRITICAL",
        vegetativeLoss: "Complete pond bed silt choking",
        siltDepositionCm: 35,
        waterloggingScore: "Extreme Silt Choking",
        salvageableYield: "8% Only",
        estimatedFinancialLossINR: 140000
      },
      claimStatus: "APPROVED",
      officerRemarks: "Heavy sandy siltation observed. Silt removal subsidy included in payout approval.",
      compensationAmountINR: 128000,
      dbtTransactionId: "DBT-BIHAR-2026-4401",
      submittedAt: "2026-08-18T14:20:00Z"
    }
  ],

  soilReports: [
    {
      id: "SOIL-KOSI-301",
      farmerId: "FARM-001",
      farmerName: "Ramesh Kumar Mandal",
      plotLocation: "Marauna Khasra No. 412",
      district: "Supaul",
      soilType: "Sandy Alluvial (Kosi Silt Overlayer)",
      testedAt: "2026-08-19T07:00:00Z",
      metrics: {
        pH: 6.2, // Slightly acidic due to flood leaching
        nitrogenKgHa: 142, // Low (<280 is low)
        phosphorusKgHa: 14, // Low (<23 is low)
        potassiumKgHa: 110, // Medium
        organicCarbonPct: 0.32, // Low (<0.5)
        moisturePct: 38, // High post flood
        siltSandDepositionCm: 22, // Heavy sand casting
        electricalConductivity: 0.45
      },
      aiRecommendation: {
        overallCondition: "Severely Silted & Leached",
        primaryAction: "Deep Plouging & Silt Inversion with Dhaincha (Sesbania) Green Manuring",
        suggestedRecoveryCrop: "Boro Rice (Short duration CR Dhan 201) / Green Gram (Moong Samrat)",
        fertilizerPrescription: "Apply Gypsum @ 200kg/acre + Single Super Phosphate (SSP) + Bio-NPK Consortium",
        timelineWeeks: 8,
        nextSoilTestDays: 45
      }
    },
    {
      id: "SOIL-KOSI-302",
      farmerId: "FARM-004",
      farmerName: "Rakesh Mandal",
      plotLocation: "Mahishi Khasra No. 119",
      district: "Saharsa",
      soilType: "Clay Loam Alluvium",
      testedAt: "2026-08-18T16:00:00Z",
      metrics: {
        pH: 6.8, // Good
        nitrogenKgHa: 195, // Low-Medium
        phosphorusKgHa: 28, // Good
        potassiumKgHa: 180, // Good
        organicCarbonPct: 0.48, // Moderate
        moisturePct: 29,
        siltSandDepositionCm: 8, // Light silt
        electricalConductivity: 0.38
      },
      aiRecommendation: {
        overallCondition: "Moderately Affected (Favorable for Rapid Recovery)",
        primaryAction: "Surface aeration, Trichoderma soil treatment for fungal protection",
        suggestedRecoveryCrop: "Winter Maize (DKC 9108) / Mustard (Pusa Bold)",
        fertilizerPrescription: "Vermicompost 2 Tonnes/acre + Neem coated Urea split dosage",
        timelineWeeks: 4,
        nextSoilTestDays: 30
      }
    }
  ],

  rescueOperations: {
    activeSOSCount: 4,
    boatsDeployed: 18,
    dronesInAir: 6,
    peopleEvacuatedToday: 842,
    sosRequests: [
      {
        id: "SOS-2026-401",
        name: "Devendra Mukhiya & 6 Family Members",
        phone: "+91 94310 99812",
        locationName: "Marauna Island Tola (Cut off by Kosi loop)",
        lat: 26.2480,
        lng: 86.5180,
        peopleCount: 7,
        hasInfants: true,
        hasElderly: true,
        urgency: "CRITICAL",
        waterLevelRising: "Over Rooftop in 3 hours",
        status: "BOAT_DISPATCHED",
        assignedUnit: "NDRF Motorboat Unit B-04 (Birpur Command)",
        etaMinutes: 14,
        reportedAt: "20 mins ago"
      },
      {
        id: "SOS-2026-402",
        name: "Shyam Sundar & 4 Cattle",
        phone: "+91 98351 77123",
        locationName: "Nirmali Western Ring Bundh KM 3.5",
        lat: 26.3190,
        lng: 86.5820,
        peopleCount: 4,
        hasInfants: false,
        hasElderly: false,
        urgency: "HIGH",
        waterLevelRising: "Waist high water",
        status: "ASSIGNED",
        assignedUnit: "SDRF Rescue Raft S-12",
        etaMinutes: 22,
        reportedAt: "35 mins ago"
      },
      {
        id: "SOS-2026-403",
        name: "Asha Devi (Pregnant Woman Relief)",
        phone: "+91 99342 55190",
        locationName: "Saraigarh Bhaptiyahi Ward-2",
        lat: 26.2080,
        lng: 86.6180,
        peopleCount: 3,
        hasInfants: false,
        hasElderly: true,
        urgency: "CRITICAL",
        waterLevelRising: "Medical Evacuation Required",
        status: "RESCUED",
        assignedUnit: "District Medical Quick Boat-01",
        etaMinutes: 0,
        reportedAt: "1 hour ago"
      }
    ],
    boatFleet: [
      { id: "BOT-NDRF-01", name: "NDRF Fast-Rescue Boat Bravo-1", type: "Rigid Inflatable 40HP", capacity: 15, location: "Birpur Base", status: "ON_MISSION", lat: 26.2510, lng: 86.5200 },
      { id: "BOT-NDRF-02", name: "NDRF High-Payload Raft B-04", type: "Heavy Rescue Craft", capacity: 25, location: "Marauna Creek", status: "ON_MISSION", lat: 26.2460, lng: 86.5190 },
      { id: "BOT-SDRF-03", name: "SDRF Motor Launch S-12", type: "Catamaran Rescue Hull", capacity: 18, location: "Nirmali Port", status: "ON_MISSION", lat: 26.3180, lng: 86.5840 },
      { id: "BOT-COMM-04", name: "Panchayat Country Motor Boat K-9", type: "Wooden Country Vessel (Mechanized)", capacity: 20, location: "Nauhatta Ghat", status: "STANDBY", lat: 26.0050, lng: 86.5380 }
    ],
    droneSurveillance: [
      { id: "DRN-01", model: "DJI Matrice 350 RTK (Thermal / Flood Mapping)", batteryPct: 78, flightAltMeters: 120, targetArea: "Nirmali Ring Embankment Breach Check", status: "STREAMING_LIVE" },
      { id: "DRN-02", model: "IdeaForge SWITCH Recon UAV", batteryPct: 62, flightAltMeters: 150, targetArea: "Marauna Cut-off Diara Search & Rescue", status: "STREAMING_LIVE" }
    ]
  },

  currentUserProfiles: {
    FARMER: {
      id: "FARM-001",
      name: "Ramesh Kumar Mandal",
      role: "Farmer",
      phone: "+91 91224 81920",
      village: "Marauna",
      district: "Supaul",
      landArea: "4.5 Acres",
      aadhaarNo: "XXXX-XXXX-8492",
      activeAlert: "WARNING (Evacuate harvest within 32 hrs)",
      crops: ["Paddy (Swarna Sub-1)", "Mustard", "Jute"]
    },
    TRANSPORTER: {
      id: "TRP-101",
      name: "Kishore Yadav",
      role: "Transporter",
      phone: "+91 98351 44102",
      vehicle: "Tractor Trolley 4WD (3.5T)",
      baseVillage: "Nirmali",
      district: "Supaul",
      status: "Available for Dispatch"
    },
    OFFICER: {
      id: "OFF-501",
      name: "Sunita Jha (BDO / Agriculture Officer)",
      role: "Government Officer",
      department: "Disaster Management & Agriculture Dept, Supaul",
      jurisdiction: "Supaul District (Nirmali, Marauna, Saraigarh)",
      approvalAuthority: "Up to ₹2,50,000"
    },
    NGO: {
      id: "NGO-201",
      name: "Aarav Relief Foundation & SEEDS India",
      role: "NGO Coordinator",
      station: "North Bihar Flood Response Command",
      volunteersActive: 48,
      reliefPacksStock: 2500
    },
    ADMIN: {
      id: "ADM-001",
      name: "State Disaster Command Admin",
      role: "Super Admin",
      portal: "Bihar State Disaster Management Authority (BSDMA)"
    }
  }
};
