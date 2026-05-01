import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
// Note: We'll wrap this in a check so the server can still run for health checks 
// even if DB connection fails (optional, but good for initial setup)
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
