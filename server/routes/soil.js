import express from 'express';
const router = express.Router();

let soilTests = [
  {
    id: "SOIL-KOSI-301",
    farmerId: "FARM-001",
    farmerName: "Ramesh Kumar Mandal",
    pH: 6.2,
    nitrogen: 142,
    phosphorus: 14,
    potassium: 110,
    moisture: 38,
    sedimentLevelCm: 22
  }
];

router.post('/test', (req, res) => {
  const newTest = {
    id: `SOIL-KOSI-${Date.now().toString().slice(-3)}`,
    ...req.body,
    testedAt: new Date().toISOString()
  };
  soilTests.unshift(newTest);
  res.status(201).json(newTest);
});

router.get('/:farmerId', (req, res) => {
  const tests = soilTests.filter((s) => s.farmerId === req.params.farmerId);
  res.json(tests);
});

router.post('/recovery-plan', (req, res) => {
  const { pH, nitrogen, sedimentLevelCm } = req.body;
  const silt = Number(sedimentLevelCm) || 20;

  const plan = {
    soilHealthScore: silt > 15 ? 48 : 75,
    recommendedCrop: "Dhaincha (Sesbania) -> Boro Rice (CR Dhan 201)",
    fertilizerRecommendation: "Gypsum @ 150kg/acre + SSP @ 50kg/acre + Bio-NPK",
    primaryAction: "Deep mouldboard ploughing (25cm) to invert sand layer",
    estimatedRecoveryWeeks: 8,
    nextTestDate: "In 45 Days"
  };

  res.json(plan);
});

export default router;
