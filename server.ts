import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORSCHE_VEHICLES, PORSCHE_CENTRES_INDIA } from './src/data/porscheData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory bookings registry
interface BookingRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  modelId: string;
  modelName: string;
  preferredCity: string;
  dealerAddress: string;
  dealerPhone: string;
  preferredDate: string;
  notes: string;
  status: string;
  createdAt: string;
}

const bookings: BookingRecord[] = [];

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Porsche Automotive Showcase Backend',
    region: 'India (Ex-Showroom)',
    timestamp: new Date().toISOString(),
  });
});

// All Vehicles
app.get('/api/vehicles', (_req, res) => {
  res.json({
    count: PORSCHE_VEHICLES.length,
    currency: 'INR',
    vehicles: PORSCHE_VEHICLES,
  });
});

// Single Vehicle Details
app.get('/api/vehicles/:id', (req, res) => {
  const vehicle = PORSCHE_VEHICLES.find((v) => v.id === req.params.id);
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }
  return res.json(vehicle);
});

// Authorized Porsche Dealerships in India
app.get('/api/dealers', (_req, res) => {
  res.json({
    count: PORSCHE_CENTRES_INDIA.length,
    dealers: PORSCHE_CENTRES_INDIA,
  });
});

// Test Drive Booking Endpoint
app.post('/api/bookings', (req, res) => {
  const { fullName, email, phone, modelId, preferredCity, preferredDate, notes } = req.body;

  if (!fullName || !email || !phone || !modelId || !preferredCity || !preferredDate) {
    return res.status(400).json({ error: 'All booking fields are required.' });
  }

  const cleanPhone = String(phone).replace(/[\s-]/g, '');
  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit Indian mobile number.' });
  }

  const selectedVehicle = PORSCHE_VEHICLES.find((v) => v.id === modelId) || PORSCHE_VEHICLES[0];
  const selectedDealer =
    PORSCHE_CENTRES_INDIA.find((c) => c.city.toLowerCase() === String(preferredCity).toLowerCase()) ||
    PORSCHE_CENTRES_INDIA[0];

  const bookingId = `POR-IND-${Math.floor(100000 + Math.random() * 900000)}`;

  const newBooking: BookingRecord = {
    id: bookingId,
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: cleanPhone,
    modelId,
    modelName: selectedVehicle.name,
    preferredCity: selectedDealer.city,
    dealerAddress: selectedDealer.address,
    dealerPhone: selectedDealer.phone,
    preferredDate,
    notes: notes ? String(notes).trim() : '',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);

  return res.status(201).json({
    success: true,
    message: 'Test drive appointment scheduled successfully.',
    booking: newBooking,
  });
});

// Start Express Server with Vite middlewares in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Porsche Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
