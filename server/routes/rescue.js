import express from 'express';
const router = express.Router();

let rescueRequests = [
  {
    id: "SOS-2026-401",
    name: "Devendra Mukhiya & 6 Family Members",
    phone: "+91 94310 99812",
    location: "Marauna Island Tola",
    lat: 26.2480,
    lng: 86.5180,
    peopleCount: 7,
    status: "BOAT_DISPATCHED",
    assignedTeam: "NDRF Motorboat Unit Bravo-1"
  }
];

router.post('/request', (req, res) => {
  const newSOS = {
    id: `SOS-2026-${Date.now().toString().slice(-4)}`,
    ...req.body,
    status: 'BOAT_DISPATCHED',
    assignedTeam: 'NDRF Motorboat Unit B-04',
    createdAt: new Date().toISOString()
  };
  rescueRequests.unshift(newSOS);
  res.status(201).json(newSOS);
});

router.get('/active', (req, res) => {
  res.json(rescueRequests);
});

router.patch('/:id', (req, res) => {
  const sos = rescueRequests.find((s) => s.id === req.params.id);
  if (sos) {
    Object.assign(sos, req.body);
    return res.json(sos);
  }
  res.status(404).json({ error: 'SOS request not found' });
});

export default router;
