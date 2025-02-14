import express from 'express'
import {createShare, getShareByUsers } from '../controllers/shareController.js'
const router = express.Router();

router.post('/', createShare);  
router.get('/user/:userId', getShareByUsers);
export default router;