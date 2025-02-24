import { PrismaClient }  from '@prisma/client'
const prisma = new PrismaClient();

// Crear tarea

export const createTask = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const task = await prisma.task.create({ data: { name, userId } });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Actualizar una tarea por ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getTasksByUsers = async (req, res) => {
  const { userId } = req.params;
  try {
    const userTasks = await prisma.task.findMany({
      where: { userId: parseInt(userId) },
    });

    const sharedTasks = await prisma.sharedTask.findMany({
      where: { userId: parseInt(userId) },
      include: { task: true },
    });

    const formattedSharedTasks = sharedTasks.map((shared) => shared.task);
    console.log(formattedSharedTasks);
    res.json({ tasks: userTasks, sharedTasks: formattedSharedTasks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
/*
// Obtener todas las tareas de un usuario
export const getTasksByUsers = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({ where: { userId: parseInt(userId) } });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};*/

// Obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener  las tareas por el Id
export const getTasksById = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar tarea por ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
