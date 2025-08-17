import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// It's good practice to have dotenv.config() at the very top
dotenv.config();

import { connectDB } from './config/db';

// Import all your routes
import authRoutes from './routes/auth.routes';
import commandRoutes from './routes/command.routes';
import portfolioRoutes from './routes/portfolio.routes';
import emailRoutes from './routes/email.routes';
import aiRoutes from './routes/ai.routes';

// Connect to Database
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// --- THIS IS THE CRITICAL FIX FOR CORS ---

// 1. Define your "guest list" of allowed websites (origins)
const allowedOrigins = [
  'http://localhost:5173',       // Your local frontend for development
  'https://bht-corp.vercel.app'  // Your deployed Vercel frontend
];

// 2. Create the CORS options object with a function to check the origin
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like Postman or server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }
    
    // If the incoming origin is on our "guest list", allow it
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Otherwise, block it by throwing a CORS error
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization'], // Keep these headers
};

// 3. Use the new, more powerful CORS options
app.use(cors(corsOptions));

// --- END OF FIX ---

// Standard middleware
app.use(express.json());

// API Routes
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/commands', commandRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('BHT Corporation API is running...');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});