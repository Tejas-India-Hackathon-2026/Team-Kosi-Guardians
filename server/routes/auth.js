import express from 'express';
const router = express.Router();

// Mock in-memory user registry
const users = [
  { id: 'usr-1', name: 'Ramesh Kumar', phone: '9122481920', role: 'FARMER', village: 'Marauna' },
  { id: 'usr-2', name: 'Kishore Yadav', phone: '9835144102', role: 'TRANSPORTER', village: 'Nirmali' },
  { id: 'usr-3', name: 'Sunita Jha', phone: '9431200981', role: 'OFFICER', district: 'Supaul' }
];

router.post('/register', (req, res) => {
  const { name, phone, password, role, village } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    phone,
    role: role || 'FARMER',
    village: village || 'Marauna',
    token: `jwt-mock-token-${Date.now()}`
  };
  users.push(newUser);

  res.status(201).json({ user: newUser, token: newUser.token });
});

router.post('/login', (req, res) => {
  const { phone, password } = req.body;
  const user = users.find((u) => u.phone === phone) || users[0];
  res.json({
    user,
    token: `jwt-mock-token-${user.id}`
  });
});

router.get('/me', (req, res) => {
  res.json({ user: users[0] });
});

export default router;
