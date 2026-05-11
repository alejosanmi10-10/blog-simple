import axios from "./axiosSetup";
import { swallTrue, swallError } from "./alerts";

export async function login(data) {
  try {
    const response = await axios.post("/api/login", data);
    if (response.status === 200) {
      swallTrue(`Bienvenid@: ${response.data.usuario[0].user}`);
      return response;
    } else {
      console.log(response.data);
      swallError(`Acceso denegado: ${response.data.message || response.data}`);
    }
  } catch (error) {
    console.log(error);
    swallError(`Error de inicio de sesión: ${error.response?.data?.message || "Error desconocido"}`);
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
    swallError(`El correo ya fue usado: ${error.response?.data?.message || "Error desconocido"}`);
    throw error;
  }
}

export async function logoutReq() {
  return await axios.get('/api/logout');
}
