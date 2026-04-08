<template>
  <div class="header">
    <router-link to="/dashboard/banner" class="logo-link">
      <img src="../../public/logo_cn.svg" class="header-logo" />
    </router-link>
    <div class="contenido">
      <router-link to="/dashboard/prueba" style="text-decoration: none; color: black;">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" class="cerrar">
          <path fill="currentColor"
            d="M6 5h11a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3M4 17a2 2 0 0 0 2 2h5v-3H4zm7-5H4v3h7zm6 7a2 2 0 0 0 2-2v-1h-7v3zm2-7h-7v3h7zM4 11h7V8H4zm8 0h7V8h-7z" />
        </svg>
      </router-link>

      <router-link to="/dashboard/principal" style="text-decoration: none; color: black;">
        <svg xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2em" height="2em" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77" />
        </svg>
      </router-link>
      <router-link to="/dashboard/crear" style="text-decoration: none; color: black;">
        <svg xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2em" height="2em" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M18 20v-3h-3v-2h3v-3h2v3h3v2h-3v3zM3 21q-.825 0-1.412-.587T1 19V5q0-.825.588-1.412T3 3h14q.825 0 1.413.588T19 5v5h-2V8H3v11h13v2z" />
        </svg>
      </router-link>
      <svg @click.prevent="logout" xmlns="http://www.w3.org/2000/svg" class="cerrar" width="2em" height="2em"
        viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M5.616 20q-.691 0-1.153-.462T4 18.384V15.27h1v3.115q0 .231.192.424t.423.192h12.77q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616V8.73H4V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm5.23-4.077l-.707-.72l2.703-2.703H4v-1h8.842L10.14 8.796l.707-.719L14.77 12z" />
      </svg>
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
    const nombre = JSON.parse(localStorage.getItem('userData'));

    const logout = async () => {
      const confirmacion = await swallConfirmation("¿Seguro que desea cerrar sesión?");
      if (confirmacion) {
        try {
          const response = await axios.get('/api/logout', { withCredentials: true });

          if (response && response.data && response.data.message) {
            console.log(response.data.message);
            swallTrue(response.data.message);
            localStorage.removeItem('userData');
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
  background-color: #ffff00;
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
  background-color: #ff00ff;
  color: white;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
}

.usuario {
  background-color: #00ffff;
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
  background-color: #ff00ff;
  color: black;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0px black;
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
