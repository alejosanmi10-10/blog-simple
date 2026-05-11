import { getAllUsers, updateAvatar } from "../models/userModel.js";

export const fetchUsers = async () => {
  const users = await getAllUsers();
  if (!users || users.length === 0) {
    throw { status: 404, message: "No usuarios" };
  }
  return { usuarios: users };
};

export const changeAvatar = async (id_usuario, icono_perfil) => {
  if (!id_usuario || !icono_perfil) {
    throw { status: 400, message: "Faltan datos para actualizar el avatar" };
  }
  await updateAvatar(id_usuario, icono_perfil);
  return { status: "ok", message: "Avatar actualizado", icono_perfil };
};
