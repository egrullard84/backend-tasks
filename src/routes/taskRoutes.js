import express from 'express'
import { createTask, getTasks, deleteTask,updateTask } from '../controllers/taskController.js'
const router = express.Router();

router.post('/', createTask);
router.get('/:userId', getTasks);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
export default router;