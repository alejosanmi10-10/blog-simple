import { swallTrue, swallError, swallConfirmation } from "./alerts";
import axios from "axios";
import Cookies from "js-cookie";

// CONFIGURACIÓN AXIOS CORE
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

// INTERCEPTORES AXIOS (Requisito CORE)
axios.interceptors.request.use(config => {
  const token = Cookies.get('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401) {
    // Redirigir al login si el token expira
    localStorage.removeItem('userData');
    window.location.href = '/inicio';
  }
  return Promise.reject(error);
});

export async function login(data) {
  try {
    const response = await axios.post("/api/login", data);
    if (response.status === 200) {
      console.log(response);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          id: response.data.usuario[0].id,
          userName: response.data.usuario[0].user,
          ciudad: response.data.usuario[0].ciudad,
          email: response.data.usuario[0].email,
          rol: response.data.usuario[0].rol,
          icono_perfil: response.data.usuario[0].icono_perfil,
          programa_favorito: response.data.usuario[0].programa_favorito
        })
      );

      swallTrue(`Bienvenid@: ${response.data.usuario[0].user}`);

      return response;
    } else {
      console.log(response.data);
      swallError(`Acceso denegado: ${response.data.message || response.data}`);
    }
  } catch (error) {
    console.log(error);
    swallError(
      `Error de inicio de sesión: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
  }
}
export async function registro(data) {
  try {
    const response = await axios.post("/api/register", data);
    console.log(response.data);
    swallTrue(`usuario creado: ${response.data.message || response.data}`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(
      `El correo ya fue usado: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function Imprimir(endpoint) {
  try {
    const response = await axios.get(`/api/${endpoint}`);
    const result = response.data;
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function formatearFecha(fecha) {
  try {
    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) return "Fecha desconocida";
    
    const dia = fechaObj.getDate().toString().padStart(2, "0");
    const mes = fechaObj.toLocaleString("es-ES", { month: "short" });
    const año = fechaObj.getFullYear();

    return `${dia} ${mes} ${año}`;
  } catch (e) {
    return "Fecha desconocida";
  }
}

export async function crearPost(data) {
  try {
    const response = await axios.post("/api/publicacion", data);
    console.log(response.data);
    swallTrue(`Publicacion creada exitosamente`);
    return response;
  } catch (error) {
    console.log(error);
    swallError(
      `Error en la creacion de la publicacion: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function deletePost(id) {
  const confirmed = await swallConfirmation(
    "¿Seguro que desea eliminar la publicación?"
  );

  if (!confirmed) return;
  try {
    const response = await axios.delete(`/api/publicacion/${id}`);
    console.log(response);
    swallTrue(`${response.data.message}`);
    return response;
  } catch (error) {
    console.error(error);
    swallError(
      `Error al eliminar la publicación: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function editPost(id, data) {
  const confirmed = await swallConfirmation(
    "¿Seguro que desea cambiar la informacion?"
  );

  if (!confirmed) return;

  try {
    const response = await axios.put(`/api/publicacion/${id}`, data);
    console.log(response);
    swallTrue(`${response.data.message}`);

    return response;
  } catch (error) {
    console.error(error);
    swallError(
      `Error al editar la publicación: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

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
    swallError(
      `Error en la creacion del comentario: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
    throw error;
  }
}

export async function deleteComentario(id) {
  const confirmed = await swallConfirmation(
    "¿Seguro que desea eliminar el comentario?"
  );
  if (!confirmed) return;
  try {
    const response = await axios.delete(`/api/comentarios/${id}`);
    console.log(response);

    swallTrue(`${response.data.message}`);
    return response;
  } catch (error) {
    // Manejar error
    console.error(error);
    swallError(
      `Error al eliminar el comentario: ${
        error.response?.data?.message || "Error desconocido"
      }`
    );
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
    return response.data; // Debería tener { status: "ok", usuarios: [...] }
  } catch (error) {
    console.error("Error al obtener usuarios que reaccionaron:", error);
    return { usuarios: [] };
  }
}

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