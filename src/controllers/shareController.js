import { PrismaClient }  from '@prisma/client'
const prisma = new PrismaClient();

export const createShare = async (req, res) => {
    const { taskId, userId } = req.body;
    try {
      const sharedTask = await prisma.sharedTask.create({
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
            where: { userId: parseInt(userId) }, // Convertir a número
            include: { task: true, user: true }
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


  export const getAllShares = async (req, res) => {
    try {
      const share = await prisma.sharedTask.findMany();
      res.json(share);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  
  export const getAllSharesByTasks = async (req, res) => {
    const { taskId } = req.params;
    try {
      const shareList = await prisma.sharedTask.findMany({
        where:{taskId: parseInt(taskId)},
        include: { user: true }    
      });
      res.json(shareList);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const deleteSharesByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedShares = await prisma.sharedTask.deleteMany({
            where: { userId: parseInt(userId) },
        });

        if (deletedShares.count === 0) {
            return res.status(404).json({ message: "No shared tasks found for this user" });
        }

        res.json({ message: "Shared tasks deleted successfully", deletedShares });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
