import { PrismaClient }  from '@prisma/client'
const prisma = new PrismaClient();

export const createShare = async (req, res) => {
    const { taskId, userId } = req.body;
    try {
      const sharedTask = await prisma.sharedTask({
        data: { taskId: parseInt(taskId), userId: parseInt(userId) }
      });
      res.status(201).json(sharedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getShareByUsers = async (req, res) => {
    const { userId } = req.params;
    try {
      const sharelists = await prisma.sharedTask.findMany({
        where: { userId: parseInt(userId) },
        include: { list: { include: { tasks: true } } }
      });
      res.json(sharelists);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Obtener  las lista compartida por el Id
  export const getShareById = async (req, res) => {
    const { id } = req.params;
    try {
      const share = await prisma.sharedTask.findUnique({
        where: { id: parseInt(id) },
      });
      res.json(share);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  