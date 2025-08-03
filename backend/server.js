import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/user.routes.js';
import facultyRoutes from './routes/faculty.routes.js';  // ✅ Add this line

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'your_default_mongodb_uri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Add your routes
app.use('/api/users', userRoutes);
app.use('/api/faculty', facultyRoutes); // ✅ Add this line

// Serve frontend from dist
const frontendPath = path.join(__dirname, 'dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
