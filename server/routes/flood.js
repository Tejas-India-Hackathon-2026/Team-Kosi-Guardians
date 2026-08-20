import express from 'express';
const router = express.Router();

const sensors = [
  { id: "SNS-KOSI-01", name: "Birpur Barrage", district: "Supaul", currentLevel: 75.82, dangerLevel: 74.50, discharge: "385,420 cusecs", status: "CRITICAL" },
  { id: "SNS-KOSI-02", name: "Nirmali Embankment", district: "Supaul", currentLevel: 60.45, dangerLevel: 59.80, discharge: "310,000 cusecs", status: "WARNING" },
  { id: "SNS-KOSI-03", name: "Supaul Rail Bridge", district: "Supaul", currentLevel: 52.40, dangerLevel: 51.50, discharge: "295,000 cusecs", status: "WARNING" },
  { id: "SNS-KOSI-04", name: "Baltara Gauge", district: "Khagaria", currentLevel: 34.62, dangerLevel: 33.85, discharge: "412,000 cusecs", status: "CRITICAL" }
];

router.get('/status', (req, res) => {
  res.json({
    basin: "Kosi River Basin (North Bihar)",
    alertLevel: "WARNING",
    dischargeAtBirpur: "385,420 cusecs",
    evacuationWindowHours: 32,
    meshRelayActive: true
  });
});

router.get('/sensors', (req, res) => {
  res.json(sensors);
});

router.get('/alerts', (req, res) => {
  res.json([
    {
      id: "ALT-01",
      severity: "CRITICAL",
      location: "Birpur to Baltara corridor",
      message: "Water level rising rapidly. 24-48h evacuation window active.",
      issuedAt: new Date().toISOString()
    }
  ]);
});

export default router;
