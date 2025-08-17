import { Router } from 'express';
// --- 1. MAKE SURE getAllUsers IS IMPORTED ---
import { loginUser, createUser, deleteUser, getAllUsers } from '../controllers/auth.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', loginUser);

// --- 2. UPDATE THIS ROUTE DEFINITION ---
// This combines the POST and GET methods for the same '/users' endpoint
router.route('/users')
  .post(protect, admin, createUser)
  .get(protect, admin, getAllUsers); // <-- THIS LINE IS ESSENTIAL

router.route('/users/:id').delete(protect, admin, deleteUser);

export default router;