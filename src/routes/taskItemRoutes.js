import express from 'express'
import { createTaskItem,updateTaskItem,deleteTaskItem,getTaskItemsByTask} from '../controllers/taskItemController.js'
const router = express.Router();
router.post('/', createTaskItem);
router.get('/task/:taskId', getTaskItemsByTask);
router.delete('/:id', deleteTaskItem);
router.put('/:id', updateTaskItem);
export default router;