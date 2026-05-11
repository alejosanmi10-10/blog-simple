import express from 'express';
import { imprimirComentarios, crearComentario, eliminarComentario } from '../controllers/commentController.js';
import { verificarAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', imprimirComentarios);
router.post('/', verificarAuth, crearComentario);
router.delete('/:id', verificarAuth, eliminarComentario);

export default router;
