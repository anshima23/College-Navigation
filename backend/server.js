import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/user.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import eventsRoutes from './routes/event.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/events', eventsRoutes);

// ✅ Add this block to catch unknown API routes BEFORE frontend fallback
app.get('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Serve frontend for production
const frontendPath = path.resolve(__dirname, 'dist');
app.use(express.static(frontendPath));

// ✅ Frontend fallback for non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
