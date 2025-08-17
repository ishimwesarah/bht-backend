import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import commandRoutes from './routes/command.routes';

// Import Routes
import portfolioRoutes from './routes/portfolio.routes';
import emailRoutes from './routes/email.routes';
import aiRoutes from './routes/ai.routes';

// Load environment variables


// Connect to Database
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ 
  origin: 'http://localhost:5173', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json());

// API Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes); // <-- ADD
app.use('/api/commands', commandRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('BHT Corporation API is running...');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});