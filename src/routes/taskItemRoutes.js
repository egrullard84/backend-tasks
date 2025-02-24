import express from 'express'
import { createTaskItem,updateTaskItem,deleteTaskItem,getTaskItemsByTask} from '../controllers/taskItemController'
const router = express.Router();
router.post('/', createTaskItem);
router.get('/:userId', getTaskItemsByTask);
router.delete('/:id', deleteTaskItem);
router.put('/:id', updateTaskItem);
export default router;