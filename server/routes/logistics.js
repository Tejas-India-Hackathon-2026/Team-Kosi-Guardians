import express from 'express';
const router = express.Router();

let requests = [
  {
    id: "REQ-LOG-801",
    farmerId: "FARM-001",
    farmerName: "Ramesh Kumar Mandal",
    phone: "+91 91224 81920",
    village: "Marauna",
    cropType: "Harvested Paddy & Mustard Seeds",
    quantity: "2.4 Tonnes",
    status: "MATCHED",
    assignedTransporter: "Kishore Yadav (Tractor T-101)"
  }
];

router.post('/request', (req, res) => {
  const newReq = {
    id: `REQ-LOG-${Date.now().toString().slice(-4)}`,
    ...req.body,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };
  requests.unshift(newReq);
  res.status(201).json(newReq);
});

router.get('/requests', (req, res) => {
  res.json(requests);
});

router.patch('/request/:id', (req, res) => {
  const reqItem = requests.find((r) => r.id === req.params.id);
  if (reqItem) {
    Object.assign(reqItem, req.body);
    return res.json(reqItem);
  }
  res.status(404).json({ error: 'Request not found' });
});

router.post('/match', (req, res) => {
  const { requestId, transporterId } = req.body;
  const reqItem = requests.find((r) => r.id === requestId);
  if (reqItem) {
    reqItem.status = 'MATCHED';
    reqItem.assignedTransporterId = transporterId || 'TRP-101';
    reqItem.transporterName = 'Kishore Yadav (Tractor Trolley 3.5T)';
    return res.json(reqItem);
  }
  res.status(404).json({ error: 'Request not found' });
});

export default router;
