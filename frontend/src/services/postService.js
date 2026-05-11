import axios from "./axiosSetup";
import { swallTrue, swallError, swallConfirmation } from "./alerts";

export async function crearPost(data) {
  try {
    const response = await axios.post("/api/publicacion", data);
    console.log(response.data);
    swallTrue(`Publicacion creada exitosamente`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(`Error en la creacion de la publicacion: ${error.response?.data?.message || "Error desconocido"}`);
    throw error;
  }
}

export async function deletePost(id) {
  const confirmed = await swallConfirmation("¿Seguro que desea eliminar la publicación?");
  if (!confirmed) return;
  try {
    const response = await axios.delete(`/api/publicacion/${id}`);
    console.log(response);
    swallTrue(`${response.data.message}`);
    return response;
  } catch (error) {
    console.error(error);
    swallError(`Error al eliminar la publicación: ${error.response?.data?.message || "Error desconocido"}`);
    throw error;
  }
}

export async function editPost(id, data) {
  const confirmed = await swallConfirmation("¿Seguro que desea cambiar la informacion?");
  if (!confirmed) return;
  try {
    const response = await axios.put(`/api/publicacion/${id}`, data);
    console.log(response);
    swallTrue(`${response.data.message}`);
    return response;
  } catch (error) {
    console.error(error);
    swallError(`Error al editar la publicación: ${error.response?.data?.message || "Error desconocido"}`);
    throw error;
  }
}
