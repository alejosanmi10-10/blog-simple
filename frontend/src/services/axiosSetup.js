import axios from "axios";
import Cookies from "js-cookie";
import { useUserStore } from "../stores/userStore";

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

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
    try {
        const userStore = useUserStore();
        userStore.clearUser();
    } catch (e) {
        localStorage.removeItem('userData');
    }
    window.location.href = '/inicio';
  }
  return Promise.reject(error);
});

export default axios;

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
