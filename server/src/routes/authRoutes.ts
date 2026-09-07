import { Router } from 'express';
import { login, register, deactivateUser, getUsers } from '../controllers/authController';

import { requireAuth, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.patch('/deactivate', requireAuth, isAdmin, deactivateUser);
router.get('/users', requireAuth, isAdmin, getUsers);

export default router;
