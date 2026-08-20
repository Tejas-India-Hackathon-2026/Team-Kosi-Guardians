// AI Soil Agronomist & Restoration Engine for Flood Silted Land
export const soilAiService = {
  /**
   * Generates tailored soil reclamation advice based on IoT soil readings
   */
  generateRecoveryPlan({ pH, nitrogen, phosphorus, potassium, moisture, siltCm, district = 'Supaul' }) {
    const phVal = Number(pH) || 6.4;
    const nVal = Number(nitrogen) || 160;
    const pVal = Number(phosphorus) || 18;
    const kVal = Number(potassium) || 130;
    const silt = Number(siltCm) || 15;

    // Determine soil health score (0 - 100)
    let score = 85;
    if (silt > 20) score -= 30;
    else if (silt > 10) score -= 18;
    else if (silt > 5) score -= 8;

    if (phVal < 6.0 || phVal > 8.0) score -= 12;
    if (nVal < 200) score -= 15;
    if (pVal < 20) score -= 10;

    score = Math.max(20, Math.min(95, score));

    // Recovery crop recommendation
    let recommendedCrop = 'Dhaincha (Sesbania) Green Manuring -> Followed by Boro Rice (CR Dhan 201)';
    let fertilizerPrescription = 'Apply Gypsum @ 150kg/acre to break sand crust + Single Super Phosphate (SSP) @ 50kg/acre + Bio-NPK Consortium';
    let siltAction = 'Surface harrowing and mixing upper 10cm sand layer with bottom clay alluvium.';
    let timelineWeeks = 6;

    if (silt > 25) {
      recommendedCrop = 'Direct Silt Reclamation with Dhaincha (Sesbania) -> Sweet Corn / Watermelon (Diara Farming)';
      fertilizerPrescription = 'Heavy Organic Manuring (FYM @ 5 Tonnes/acre) + Azotobacter & PSB bio-fertilizers + Zinc Sulphate (25kg/ha)';
      siltAction = 'Deep mouldboard ploughing (minimum 25-30cm depth) to invert coarse white sand below root zone.';
      timelineWeeks = 10;
    } else if (silt < 8 && phVal >= 6.5) {
      recommendedCrop = 'Short-duration Mustard (Pusa Bold / NRCHB-101) or Rabi Maize (DKC 9108)';
      fertilizerPrescription = 'Split application of Neem-coated Urea (40% basal, 60% top dressing) + Vermicompost 1.5 T/acre';
      siltAction = 'Light disc tillage and microbial aeration with Trichoderma viride.';
      timelineWeeks = 4;
    }

    const weeklyRoadmap = [
      { week: 1, action: "De-watering & Drainage", detail: "Open drainage trenches to clear stagnant surface water and allow topsoil aeration." },
      { week: 2, action: "Deep Tillage & Silt Inversion", detail: siltAction },
      { week: 3, action: "Bio-Fertilizer & Soil Amendment", detail: fertilizerPrescription },
      { week: 4, action: "Green Manuring / Cover Sowing", detail: `Broadcast seeds for ${recommendedCrop.split('->')[0].trim()}` },
      { week: 6, action: "Mid-Term Soil Telemetry Check", detail: "Re-test pH and electrical conductivity before sowing main Rabi season crop." },
      { week: 8, action: "Main Crop Sowing", detail: "Transplant resilient flood-tolerant crop variety with micro-irrigation." }
    ];

    return {
      soilHealthScore: score,
      statusLabel: score > 70 ? 'Moderate Recovery Needed' : score > 45 ? 'Substantial Silt Damage' : 'Severe Siltation & Leached',
      primaryAction: siltAction,
      recommendedCrop,
      fertilizerPrescription,
      timelineWeeks,
      weeklyRoadmap,
      nextTestDate: new Date(Date.now() + timelineWeeks * 7 * 24 * 3600 * 1000).toISOString().split('T')[0]
    };
  }
};
