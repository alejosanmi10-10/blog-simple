import { fetchUsers, changeAvatar } from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const result = await fetchUsers();
    return res.status(200).json(result);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ status: "Error", message: error.message });
    }
    console.error("Error al imprimir los usuarios:", error);
    return res.status(500).json({ status: "Error", message: "Error usuarios" });
  }
};

export const actualizarAvatar = async (req, res) => {
  const { id_usuario, icono_perfil } = req.body;
  try {
    const response = await changeAvatar(id_usuario, icono_perfil);
    res.status(200).send(response);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).send({ status: "Error", message: error.message });
    }
    console.error("Error al actualizar avatar:", error);
    return res.status(500).send({ status: "Error", message: "Error interno del servidor al actualizar avatar" });
  }
};
