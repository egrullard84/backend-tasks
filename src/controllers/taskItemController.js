import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un ítem de tarea
export const createTaskItem = async (req, res) => {
  const { taskId, content } = req.body;
  try {
    const taskItem = await prisma.taskItem.create({
      data: {
        taskId,
        content
      },
    });
    res.status(201).json(taskItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editar un ítem de tarea
export const updateTaskItem = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedTaskItem = await prisma.taskItem.update({
      where: { id: parseInt(id) },
      data: { content, done },
    });
    res.json(updatedTaskItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un ítem de tarea
export const deleteTaskItem = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.taskItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Ítem de tarea eliminado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener ítems de una tarea específica
export const getTaskItemsByTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const taskItems = await prisma.taskItem.findMany({
      where: { taskId: parseInt(taskId) },
    });
    res.json(taskItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
