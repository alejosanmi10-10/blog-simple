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
        req.user = decoded; // Guardar info del usuario en el request
        next();
    } catch (error) {
        return res.status(401).send({ status: "Error", message: "Token inválido o expirado." });
    }
};
