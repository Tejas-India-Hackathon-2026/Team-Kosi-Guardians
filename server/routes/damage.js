import express from 'express';
const router = express.Router();

let damageReports = [
  {
    id: "DMG-2026-091",
    farmerId: "FARM-001",
    farmerName: "Ramesh Kumar Mandal",
    crop: "Paddy (Swarna Sub-1)",
    village: "Marauna",
    damagePercentage: 78,
    aiConfidence: 94,
    claimStatus: "AI_VERIFIED",
    estimatedLossINR: 112000
  }
];

router.post('/upload', (req, res) => {
  res.json({
    imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff",
    gps: { lat: 26.2410, lng: 86.5220 },
    message: "Photo uploaded & geo-coordinates verified."
  });
});

router.post('/analyze', (req, res) => {
  const { cropType, acres, submersionDays, floodDepthCm } = req.body;
  const days = Number(submersionDays) || 3;
  const rawLoss = Math.min(98, Math.max(30, days * 18 + 15));

  const result = {
    cropAnalyzed: cropType || 'Paddy (Swarna Sub-1)',
    lossPercentage: rawLoss,
    confidenceScore: 93,
    impactLevel: rawLoss > 70 ? 'CRITICAL' : 'HIGH',
    siltDepositionCm: 18,
    vegetativeLoss: "Stem rot, severe chlorosis & silt choking",
    estimatedFinancialLossINR: Math.round((Number(acres) || 4.5) * 28000 * (rawLoss / 100)),
    recommendedCompensationINR: Math.round((Number(acres) || 4.5) * 28000 * (rawLoss / 100) * 0.85)
  };

  res.json(result);
});

router.get('/:id', (req, res) => {
  const report = damageReports.find((r) => r.id === req.params.id);
  if (report) return res.json(report);
  res.status(404).json({ error: 'Report not found' });
});

export default router;
