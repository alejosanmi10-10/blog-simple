import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { findUserByEmail, findUserByUsername, createUser } from "../models/authModel.js";

dotenv.config();

export const loginUser = async (email, password) => {
  const results = await findUserByEmail(email);
  if (results.length === 0) {
    throw { status: 400, message: "No existe el usuario" };
  }

  const usuarioRevisar = results[0];
  const logincorrecto = await bcryptjs.compare(password, usuarioRevisar.password);

  if (!logincorrecto) {
    throw { status: 400, message: "verificar los datos ingresados" };
  }

  const token = jsonwebtoken.sign(
    { id: usuarioRevisar.id, user: usuarioRevisar.user, rol: usuarioRevisar.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  return { token, usuario: results };
};

export const registerUser = async (data) => {
  const { user, email, password, ciudad, programa_favorito, icono_perfil } = data;

  const results = await findUserByUsername(user);
  if (results.length > 0) {
    throw { status: 400, message: "Este usuario ya existe" };
  }

  const salt = await bcryptjs.genSalt(5);
  const hashContraseña = await bcryptjs.hash(password, salt);
  const fechaCreacion = new Date().toISOString().split('T')[0];
  const rol = 'usuario';
  const iconoFinal = icono_perfil ? icono_perfil : "finn";

  await createUser(user, email, hashContraseña, fechaCreacion, ciudad, programa_favorito, rol, iconoFinal);
  return { message: `Usuario ${user} agregado con éxito` };
};
