import { z } from "zod";
import { loginUser, registerUser } from "../services/authService.js";

export const login = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email("Debe ser un email válido"),
    password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres")
  });

  const validacion = loginSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).send({ status: "Error", message: validacion.error.errors[0].message });
  }

  const { email, password } = validacion.data;

  try {
    const { token, usuario } = await loginUser(email, password);

    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: 'Lax'
    };

    res.cookie("jwt", token, cookieOption);
    res.send({ status: "ok", message: "Usuario loggeado", token, usuario });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    console.error("Error durante el inicio de sesión:", error);
    return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  const registerSchema = z.object({
    user: z.string().min(3, "El nombre de usuario debe ser mayor a 3 letras"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    ciudad: z.string().min(2, "Debes incluir tu ciudad"),
    programa_favorito: z.string().min(2, "Debes seleccionar un programa favorito"),
    icono_perfil: z.string().optional()
  });

  const validacion = registerSchema.safeParse(req.body);

  if (!validacion.success) {
    return res.status(400).send({ status: "Error", message: validacion.error.errors[0].message });
  }

  try {
    const response = await registerUser(validacion.data);
    res.status(201).send({ status: "ok", message: response.message });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    console.error("Error al registrar al usuario:", error);
    return res.status(500).send({ status: "Error", message: "Error interno del servidor o usuario duplicado" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send({ status: "ok", message: "Usuario deslogueado exitosamente" });
  } catch (error) {
    res.status(500).send({ status: "Error", message: error });
  }
};
