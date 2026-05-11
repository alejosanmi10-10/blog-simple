import axios from "./axiosSetup";
import { swallError } from "./alerts";

export async function actualizarAvatarReq(id_usuario, icono_perfil) {
  try {
    const response = await axios.put("/api/usuarios/avatar", { id_usuario, icono_perfil });
    return response;
  } catch (error) {
    console.error("Error al actualizar avatar:", error);
    swallError(error.response?.data?.message || "Error al actualizar avatar");
    throw error;
  }
}
