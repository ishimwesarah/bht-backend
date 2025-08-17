import { Router } from 'express';
// --- 1. IMPORT UPLOAD MIDDLEWARE ---
import { upload } from '../config/cloudinary'; 
// --- 2. IMPORT NEW CONTROLLER ---
import { createCommand, getAllCommands, getMyCommands, updateMyCommand, updateCommandStatus, createCommandWithFile, deleteMyCommand } from '../controllers/command.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

// Client can create a command (must be logged in)
router.route('/').post(protect, createCommand);

// Admin can get all commands (must be logged in as admin)
router.route('/all').get(protect, admin, getAllCommands);
router.route('/mycommands').get(protect, getMyCommands);
router.route('/:id').put(protect, updateMyCommand).delete(protect, deleteMyCommand); ; // <-- Client edits their command
router.route('/:id/status').put(protect, admin, updateCommandStatus);
router.route('/with-file').post(protect, upload.single('attachment'), createCommandWithFile);

export default router;