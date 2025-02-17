import express from 'express';
import { registerUser, loginUser,getUserIdFromToken,getAllUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verifyToken', getUserIdFromToken);
router.get('/users', getAllUsers);

export default router;
