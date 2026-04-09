import express from 'express';
import { methods as autenthication } from "../controllers/controladores.js"; 
import { verificarAuth, soloAdmin } from "../middleware/auth.js";

const rutador = express.Router();

rutador.post("/register", autenthication.register);
rutador.post("/login", autenthication.login);
rutador.get("/logout", autenthication.logout);

rutador.post("/publicacion", verificarAuth, autenthication.crearPublicacion);

rutador.get('/publicacion', (req, res) => {
  autenthication.imprimirPublicaciones((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

rutador.delete("/publicacion/:id", verificarAuth, autenthication.eliminarPublicacion);
rutador.put("/publicacion/:id", verificarAuth, autenthication.editarPublicacion);

rutador.get('/usuarios', (req, res) => {
  autenthication.imprimirUsuarios((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

rutador.get("/comentarios/:id", autenthication.imprimirComentarios);
rutador.post("/comentarios", verificarAuth, autenthication.crearComentario);
rutador.delete("/comentarios/:id", verificarAuth, autenthication.eliminarComentario);

rutador.get('/ranking', (req, res) => {
  autenthication.imprimirRanking((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

rutador.post("/reaccionar", verificarAuth, autenthication.reaccionar);
rutador.get("/reacciones/:id_publicacion", autenthication.obtenerReacciones);
rutador.get("/reacciones_usuarios/:id_publicacion", autenthication.obtenerUsuariosReacciones);
rutador.put("/usuarios/avatar", verificarAuth, autenthication.actualizarAvatar);

rutador.post("/favoritos", verificarAuth, autenthication.toggleFavorito);
rutador.get("/favoritos/:id_usuario", verificarAuth, autenthication.obtenerFavoritos);

// RUTA ADMIN DE PRUEBA (Evidencia para rúbrica)
rutador.get("/admin-panel", verificarAuth, soloAdmin, (req, res) => {
  res.status(200).json({ status: "ok", message: "Bienvenido al panel de administración supremo, " + req.user.user });
});

export default rutador;
