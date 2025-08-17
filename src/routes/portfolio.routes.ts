import { Router } from 'express';
import { getPortfolioItems, createPortfolioItem } from '../controllers/portfolio.controller';
import { upload } from '../config/cloudinary';

// --- THIS IS THE FIX ---
// Change the import path to be relative
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

// Pass the upload middleware to the POST route. 'image' is the field name.
router.route('/').get(getPortfolioItems).post(protect, admin, upload.single('image'), createPortfolioItem);

export default router;