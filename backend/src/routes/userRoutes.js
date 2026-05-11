import express from 'express';
import { getUsers, actualizarAvatar } from '../controllers/userController.js';
import { verificarAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/avatar', verificarAuth, actualizarAvatar);

export default router;
