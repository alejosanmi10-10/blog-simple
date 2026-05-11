import axios from "./axiosSetup";
import { swallTrue, swallError, swallConfirmation } from "./alerts";

export async function TraerComentarios(endpoint) {
  try {
    const response = await axios.get(`/api/comentarios/${endpoint}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function crearComentario(data) {
  try {
    const response = await axios.post("/api/comentarios", data);
    console.log(response.data);
    swallTrue(`Comentario creado exitosamente`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(`Error en la creacion del comentario: ${error.response?.data?.message || "Error desconocido"}`);
    throw error;
  }
}

export async function deleteComentario(id) {
  const confirmed = await swallConfirmation("¿Seguro que desea eliminar el comentario?");
  if (!confirmed) return;
  try {
    const response = await axios.delete(`/api/comentarios/${id}`);
    console.log(response);
    swallTrue(`${response.data.message}`);
    return response;
  } catch (error) {
    console.error(error);
    swallError(`Error al eliminar el comentario: ${error.response?.data?.message || "Error desconocido"}`);
    throw error;
  }
}

export async function TraerRanking() {
  try {
    const response = await axios.get(`/api/ranking`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function reaccionar(data) {
  try {
    const response = await axios.post("/api/reaccionar", data);
    return response.data;
  } catch (error) {
    console.error("Error al reaccionar:", error);
    throw error;
  }
}

export async function TraerReacciones(id_publicacion) {
  try {
    const response = await axios.get(`/api/reacciones/${id_publicacion}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reacciones:", error);
    return { total: 0 };
  }
}

export async function TraerUsuariosReacciones(id_publicacion) {
  try {
    const response = await axios.get(`/api/reacciones_usuarios/${id_publicacion}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios que reaccionaron:", error);
    return { usuarios: [] };
  }
}

export async function toggleFavorito(data) {
  try {
    const response = await axios.post("/api/favoritos", data);
    return response.data;
  } catch (error) {
    console.error("Error al toggle favorito:", error);
    throw error;
  }
}

export async function obtenerFavoritos(id_usuario) {
  try {
    const response = await axios.get(`/api/favoritos/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return { favoritos: [] };
  }
}
