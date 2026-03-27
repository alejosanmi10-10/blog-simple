import express from "express";
import cookieParser from "cookie-parser"; 
import { methods as autenthication } from "./controllers/controladores.js"; 
import { verificarAuth } from "./middleware/auth.js";
import cors from 'cors'; 

const app = express();
const port = 3000;

// CONFIGURACIÓN DE CORS MULTI-PUERTO (Requisito CORE para flexibilidad)
const dominiosPermitidos = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true 
})); 

app.use(express.json());
app.use(cookieParser()); 


app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});


app.post("/api/register", autenthication.register);
app.post("/api/login", autenthication.login);
app.get("/api/logout", autenthication.logout);


app.post("/api/publicacion", verificarAuth, autenthication.crearPublicacion );


app.get('/api/publicacion', (req, res) => {
  autenthication.imprimirPublicaciones((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});
app.delete("/api/publicacion/:id", verificarAuth, autenthication.eliminarPublicacion);
app.put("/api/publicacion/:id", verificarAuth, autenthication.editarPublicacion);

app.get('/api/usuarios', (req, res) => {
  autenthication.imprimirUsuarios((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

app.get("/api/comentarios/:id", autenthication.imprimirComentarios);

app.post("/api/comentarios", verificarAuth, autenthication.crearComentario );

app.delete("/api/comentarios/:id", verificarAuth, autenthication.eliminarComentario);
app.get('/api/ranking', (req, res) => {
  autenthication.imprimirRanking((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

app.post("/api/reaccionar", verificarAuth, autenthication.reaccionar);
app.get("/api/reacciones/:id_publicacion", autenthication.obtenerReacciones);


// MIDDLEWARE GLOBAL DE ERRORES (Requisito CORE)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: "Ha ocurrido un error inesperado en el servidor",
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});
