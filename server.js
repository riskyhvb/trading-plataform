import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './models/User.js'; // Asegúrate de tener el modelo de usuario
import rateLimit from 'express-rate-limit';
import csrf from 'csurf'; // Protección CSRF
import cookieParser from 'cookie-parser'; // Necesario para cookies
import https from 'https';
import fs from 'fs';

// Cargar las variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(cookieParser()); // Para trabajar con cookies

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar con MongoDB', err));


// Limitar las solicitudes a 5 intentos por minuto para las rutas de login y registro
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Limitar a 5 intentos
  message: 'Demasiados intentos, por favor intenta de nuevo en 1 minuto.',
});

// Usar el rate limiter para las rutas de login y registro
app.use('/api/auth/login', limiter);
app.use('/api/auth/register', limiter);

// Configuración de CSRF
const csrfProtection = csrf({ cookie: true });

// Generar los tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

// Middleware para autenticar el token en rutas protegidas
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = user; // Guardamos la información del usuario en la solicitud
    next(); // Continuamos con la siguiente función de la ruta
  });
};

// Ruta para obtener un nuevo access token usando un refresh token
app.post('/api/auth/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(403).json({ message: 'Usuario no encontrado' });
    }

    // Generar nuevos tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.status(403).json({ message: 'Refresh token inválido' });
  }
});

// Ruta de registro
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Usuario ya registrado' });
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Ruta de login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  // Generar tokens
  const { accessToken, refreshToken } = generateTokens(user);

  res.status(200).json({
    message: 'Inicio de sesión exitoso',
    accessToken,  // Enviar token de acceso
    refreshToken, // Enviar refresh token
  });
});

// Ruta para obtener el token CSRF
app.use('/api/protected-route', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() }); // Enviar el token CSRF
});

// Ruta protegida (requiere autenticación)
app.get('/api/user/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Perfil de usuario', user: req.user });
});

// Puerto donde se ejecutará el servidor
const server = process.env.NODE_ENV === 'production'
  ? app // No usar HTTPS en desarrollo ni en este caso
  : app;

server.listen(process.env.PORT || 4000, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT || 4000}`);
});
