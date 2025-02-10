import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Token en formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adjunta los datos del usuario al objeto req
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
