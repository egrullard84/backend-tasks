import express from 'express'
import {createSharedTaskItem,getPendingTaskItems,acceptSharedTaskItem} from '../controllers/sharedTaskItemController.js'
const router = express.Router();

router.post('/', createSharedTaskItem);  
router.get('/', getPendingTaskItems); 
router.put('/:id', acceptSharedTaskItem);

export default router;