import express from 'express';
import { crearPublicacion, imprimirPublicaciones, eliminarPublicacion, editarPublicacion } from '../controllers/postController.js';
import { verificarAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', imprimirPublicaciones);
router.post('/', verificarAuth, crearPublicacion);
router.delete('/:id', verificarAuth, eliminarPublicacion);
router.put('/:id', verificarAuth, editarPublicacion);

export default router;
