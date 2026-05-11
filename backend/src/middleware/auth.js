import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verificarAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).send({ status: "Error", message: "No autorizado. Inicie sesión." });
        }

        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).send({ status: "Error", message: "Token inválido o expirado." });
    }
};

export const soloAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next();
    } else {
        res.status(403).send({ status: "Error", message: "Acceso denegado. Se requiere rol de administrador." });
    }
};
