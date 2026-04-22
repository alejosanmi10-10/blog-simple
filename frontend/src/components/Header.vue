<template>
  <div class="header">
    <router-link to="/dashboard/banner" class="logo-link">
      <img src="../../public/logo_cn.svg" class="header-logo" />
    </router-link>
    <div class="contenido">
      <!-- ICONO DASHBOARD (Vista Mosaico) -->
      <router-link to="/dashboard/prueba" style="text-decoration: none; color: black; position: relative;" data-tooltip="Tablero">
        <svg xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2.8em" height="2.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
          <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </router-link>

      <!-- ICONO INICIO -->
      <router-link to="/dashboard/principal" style="text-decoration: none; color: black; position: relative;" data-tooltip="Inicio">
        <svg xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2.8em" height="2.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </router-link>

      <!-- ICONO CREAR PUBLICACIÓN -->
      <router-link to="/dashboard/crear" style="text-decoration: none; color: black; position: relative;" data-tooltip="Crear Publicación">
        <svg xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2.8em" height="2.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </router-link>

      <!-- ICONO SALIR -->
      <div style="position: relative;" data-tooltip="Cerrar Sesión">
        <svg @click.prevent="logout" xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2.8em" height="2.8em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </div>
      <p>
        <router-link to="/dashboard/perfil" style="text-decoration: none; color: black; " class="usuario">
          <img :src="'/avatars/' + (nombre.icono_perfil || 'finn') + '.png'" alt="avatar" style="width: 1.8rem; height: 1.8rem; border-radius: 50%; margin-right: 0.5rem; border: 2px solid black; object-fit: cover; object-position: top center;">
          {{ nombre.userName }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { swallConfirmation, swallTrue, swallError } from "../functions/alerts.js";
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { computed } from 'vue';

export default {
  name: 'Header',
  props: {
    nombre: {
      type: String,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    
    // Uso PRO de Pinia: Obtenemos el usuario de forma reactiva
    const nombre = computed(() => userStore.user || {});

    const logout = async () => {
      const confirmacion = await swallConfirmation("¿Seguro que desea cerrar sesión?");
      if (confirmacion) {
        try {
          const response = await axios.get('/api/logout', { withCredentials: true });

          if (response && response.data && response.data.message) {
            swallTrue(response.data.message);
            
            // Uso PRO de Pinia: Limpiamos el store global
            userStore.clearUser();
            
            router.push("/");
          } else {
            console.error('Mensaje de respuesta no disponible');
            swallError('Error al cerrar sesión');
          }
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
          swallError('Error al cerrar sesión');
        }
      }
    };

    return { logout, nombre };
  }
};
</script>

<style>
.header {
  background-color: #DC143C;
  border-bottom: 6px solid #000;
  width: 100%;
  padding: 0.5rem 3rem; /* Increased right padding slightly */
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-logo {
  width: 100px; /* Increased from 60px */
  display: block;
}

.contenido {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  color: black;
  transition: all 0.3s ease;
}

.cerrar {
  cursor: pointer;
  color: black;
  background-color: white;
  border: 3px solid black;
  box-shadow: 4px 4px 0px black;
  padding: 0.3rem;
  border-radius: 0;
  transition: all 0.2s ease;
  display: block;
}

.cerrar:hover {
  background-color: #DC143C;
  color: white;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
}

.usuario {
  background-color: #FFFFFF;
  color: black;
  padding: 0.6rem 2rem;
  border: 4px solid black;
  box-shadow: 5px 5px 0px black;
  font-weight: 900;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-family: 'League Spartan', sans-serif;
  margin: 0 1.5rem 0 0; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  white-space: nowrap; 
  padding: 0.6rem 1.5rem; /* Slightly reduced padding to save space */
}

.usuario:hover {
  background-color: #E5E5E5;
  color: black;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0px black;
}

/* ESTADOS ACTIVOS DE RUTA (PÁGINA ACTUAL) */
.router-link-exact-active .cerrar {
  background-color: #ffff00;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
}

.usuario.router-link-exact-active {
  background-color: #ffff00;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0px black;
}

/* TOOLTIP ESTILO BRUTALISTA */
[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 130%; /* Mostrar debajo del icono */
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 0.4rem 0.8rem;
  font-family: 'League Spartan', sans-serif;
  font-weight: 900;
  font-size: 0.9rem;
  border: 3px solid white;
  box-shadow: 4px 4px 0px black;
  white-space: nowrap;
  z-index: 10001;
  pointer-events: none;
}

@media (max-width: 768px) {
  .header {
    padding: 0.5rem 1rem;
  }
  .header-logo {
    width: 45px;
  }
  .contenido {
    gap: 0.8rem;
  }
  .usuario {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    box-shadow: 2px 2px 0px black;
  }
}
</style>
