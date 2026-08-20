import express from 'express';
const router = express.Router();

let claims = [
  {
    id: "DMG-2026-091",
    farmerName: "Ramesh Kumar Mandal",
    crop: "Paddy (Swarna Sub-1)",
    damagePercentage: 78,
    estimatedLoss: 112000,
    compensationAmountINR: 98000,
    claimStatus: "AI_VERIFIED",
    dbtTransactionId: "DBT-BIHAR-2026-9812",
    submittedAt: "2026-08-19T09:30:00Z"
  }
];

router.post('/', (req, res) => {
  const newClaim = {
    id: `DMG-2026-${Date.now().toString().slice(-3)}`,
    ...req.body,
    claimStatus: 'SUBMITTED',
    submittedAt: new Date().toISOString()
  };
  claims.unshift(newClaim);
  res.status(201).json(newClaim);
});

router.get('/', (req, res) => {
  res.json(claims);
});

router.patch('/:id/status', (req, res) => {
  const { status, remarks, approvedCompensation } = req.body;
  const claim = claims.find((c) => c.id === req.params.id);
  if (claim) {
    claim.claimStatus = status;
    if (remarks) claim.officerRemarks = remarks;
    if (approvedCompensation) claim.compensationAmountINR = approvedCompensation;
    if (status === 'APPROVED') {
      claim.dbtTransactionId = `DBT-BIHAR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      claim.approvedAt = new Date().toISOString();
    }
    return res.json(claim);
  }
  res.status(404).json({ error: 'Claim not found' });
});

export default router;
