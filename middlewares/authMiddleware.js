import jwt from 'jsonwebtoken'; // Para verificar el JWT

// Middleware para proteger rutas
const authenticateToken = (req, res, next) => {
  // Obtener el token desde los headers
  const token = req.headers['authorization'];

  // Si no hay token
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user; // Guardamos la información del usuario en la solicitud
    next(); // Continuamos con la siguiente función de la ruta
  });
};

export { authenticateToken };
