import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import floodRoutes from './routes/flood.js';
import logisticsRoutes from './routes/logistics.js';
import damageRoutes from './routes/damage.js';
import claimsRoutes from './routes/claims.js';
import soilRoutes from './routes/soil.js';
import rescueRoutes from './routes/rescue.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/flood', floodRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/damage', damageRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/soil', soilRoutes);
app.use('/api/rescue', rescueRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'KosiManthan Flood & Agri Platform', time: new Date().toISOString() });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`🌊 KosiManthan Server listening at http://localhost:${PORT}`);
});
