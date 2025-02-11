import express from 'express'
import { createTask, getTasksByUsers, deleteTask,updateTask,getAllTasks } from '../controllers/taskController.js'
const router = express.Router();

router.post('/', createTask);
router.get('/:userId', getTasksByUsers);
router.delete('/:id', deleteTask);
router.put('/:id', updateTask);
router.get('/', getAllTasks);   
export default router;