import express from 'express';
import { 
  imprimirRanking, reaccionar, obtenerReacciones, obtenerUsuariosReacciones, 
  toggleFavorito, obtenerFavoritos 
} from '../controllers/reactionController.js';
import { verificarAuth } from '../middleware/auth.js';

const router = express.Router();

// Nota: en index.js enrutaremos esto a /api de forma directa para mantener la compatibilidad
router.get('/ranking', imprimirRanking);

router.post("/reaccionar", verificarAuth, reaccionar);
router.get("/reacciones/:id_publicacion", obtenerReacciones);
router.get("/reacciones_usuarios/:id_publicacion", obtenerUsuariosReacciones);

router.post("/favoritos", verificarAuth, toggleFavorito);
router.get("/favoritos/:id_usuario", verificarAuth, obtenerFavoritos);

export default router;
