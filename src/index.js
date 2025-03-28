import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/uthRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import taskItemRoutes from './routes/taskItemRoutes.js';
import shareRoutes from './routes/shareRoutes.js';
import shareTaskItemRoutes from './routes/shareTaskItemRoutes.js';
// Configuración de variables de entorno
dotenv.config();

const app = express();

// Middlewares

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/itemTask', taskItemRoutes);
app.use('/api/shares', shareRoutes);
app.use('/api/sharesTaskItems', shareTaskItemRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
