import { createApp } from 'vue'
import App from './App.vue'
import router from '../router'
import { createPinia } from 'pinia'
import axios from 'axios'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$axios = axios
app.use(pinia)
app.use(router)
app.mount('#app')

console.log("Cartoon Network Blog - CORE Mode Active ✅");
