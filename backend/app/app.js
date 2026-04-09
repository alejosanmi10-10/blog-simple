import express from "express";
import cookieParser from "cookie-parser"; 
import cors from 'cors'; 
import rutas from './routes/rutas.js';

const app = express();
const port = 3000;

// CONFIGURACIÓN DE CORS MULTI-PUERTO 
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

app.use("/api", rutas);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: "Ha ocurrido un error inesperado en el servidor",
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});
