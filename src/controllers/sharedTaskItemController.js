import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSharedTaskItem = async (req, res) => {
    try {
      const { taskItemId, sharedWith } = req.body;

      // Validaciones básicas
      if (!taskItemId || !sharedWith) {
        return res.status(400).json({
          message: "Faltan parámetros requeridos",
          success: false,
        });
      }
   
  
      const taskId = Number(taskItemId);
      const userId = Number(sharedWith);
  
      if (isNaN(taskId) || isNaN(userId)) {
        return res.status(400).json({
          message: "taskItemId y sharedWith deben ser números válidos",
          success: false,
        });
      }
  
      // Creación del registro en la base de datos
      const sharedTask = await prisma.sharedTaskItem.create({
        data: { taskItemId: taskId, sharedWith : userId },
      });
  
      res.status(201).json({
        message: "Insertado exitosamente",
        success: true,
        data: sharedTask,
      });
    } catch (error) {
      console.error("Error al enviar la informacion:", error);
  
      res.status(500).json({
        message: "No se pudo compartir la tarea",
        success: false,
        error: error.message,
      });
    }
  };
  

  export const getPendingTaskItems = async (req, res) => {
    try {
      const pendingItems = await prisma.sharedTaskItem.findMany({
        where: {
          accepted: false, // Filtra solo los que no han sido aceptados
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          taskItem: {
            select: {
              task: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
  
      res.json(pendingItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  export const acceptSharedTaskItem = async (req, res) => {
    try {
      
      const { id } = req.params;
      const {accepted } = req.body; // ID del item compartido y estado de aceptación
  
      // Verificar si el item compartido existe

      const sharedTaskItem = await prisma.sharedTaskItem.findUnique({
        where: { id:parseInt(id) },
      });
  
      if (!sharedTaskItem) {
        return res.status(404).json({ error: "El item compartido no existe" });
      }
  
      // Actualizar el estado de aceptación
      const updatedItem = await prisma.sharedTaskItem.update({
      where: { id:parseInt(id) },
        data: { accepted },
      });
  
      res.json({ message: "Estado actualizado correctamente", updatedItem });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  