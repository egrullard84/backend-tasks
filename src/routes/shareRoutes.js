import express from 'express'
import {createShare, getShareByUsers,getAllShares,deleteSharesByUser,getAllSharesByTasks } from '../controllers/shareController.js'
const router = express.Router();

router.post('/', createShare);  
router.get('/user/:userId', getShareByUsers);
router.get('/', getAllShares);
router.delete('/user/:userId', deleteSharesByUser);
router.get('/:taskId', getAllSharesByTasks);
export default router;