import { Request, Response } from 'express';
import PortfolioItem from '../models/portfolio.model';

// --- THIS IS THE DEFINITIVE FIX ---
// 1. We define a new interface that extends the base Express Request type.

// --- END OF FIX ---

// @desc    Get all portfolio items
// @route   GET /api/portfolio
export const getPortfolioItems = async (req: Request, res: Response) => {
  try {
    const items = await PortfolioItem.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export const createPortfolioItem = async (req: Request, res: Response) => {
  try {
    const { title, category, description } = req.body;
    // Now, TypeScript knows that req.file can exist, so this line is valid.
    const imageUrl = req.file?.path;

    if (!imageUrl) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    const newItem = new PortfolioItem({ title, category, description, imageUrl });
    const createdItem = await newItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Portfolio creation error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};