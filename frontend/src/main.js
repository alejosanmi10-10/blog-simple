import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from '../router.js'; 
import './style.css'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;


const app = createApp(App);


app.config.globalProperties.$axios = axios;


app.use(router);

// Actualización de fondo HD - v8
console.log('%c V8 FINAL VERSION ACTIVE ', 'background: #222; color: #bada55; font-size: 20px;');
app.mount('#app');
