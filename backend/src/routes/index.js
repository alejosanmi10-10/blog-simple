import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import commentRoutes from './commentRoutes.js';
import reactionRoutes from './reactionRoutes.js';
import { verificarAuth, soloAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rutas de autenticación (login, register, logout)
router.use('/', authRoutes);

// Rutas de usuarios (/usuarios, /usuarios/avatar)
router.use('/usuarios', userRoutes);

// Rutas de publicaciones (/publicacion)
router.use('/publicacion', postRoutes);

// Rutas de comentarios (/comentarios)
router.use('/comentarios', commentRoutes);

// Rutas de reacciones, favoritos y ranking
// Como en rutas.js original estaban montadas directamente en /, hacemos lo mismo
router.use('/', reactionRoutes);

// RUTA ADMIN DE PRUEBA
router.get("/admin-panel", verificarAuth, soloAdmin, (req, res) => {
  res.status(200).json({ status: "ok", message: "Bienvenido al panel de administración supremo, " + req.user.user });
});

export default router;
