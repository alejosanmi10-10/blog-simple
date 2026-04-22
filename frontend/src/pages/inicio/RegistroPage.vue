<template>
  <div class="c_registro">
    <div class="logo">
      <router-link to="/"><img src="../../../public/logo_cn.svg" alt="Logo" class="imagen" style="width: 25rem; max-width: 90vw;"></router-link>
    </div>
    <div class="contenedor_login">
      <form class="formulario" @submit.prevent="registroUser">
        <h1 class="titulo">Registro</h1>
        <hr style="border: none; height: 2px; background-color: #333; width: 80%; margin: 20px auto;">
        <label>Nombre:</label>
        <input type="text" v-model="form.user" required>
        <label>Correo:</label>
        <input type="email" v-model="form.email" required autocomplete="off">
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" maxlength="12" minlength="8" required autocomplete="new-password">
        <small style="color: #666; margin-top: -0.5rem; margin-bottom: 1rem; font-weight: bold;">* Debe tener al menos 8 caracteres</small>
        <label>Ciudad:</label>
        <input type="text" v-model="form.ciudad" required>
        <label>Programa Favorito:</label>
        <input type="text" v-model="form.programa_favorito" required placeholder="Ej: Hora de Aventura">
        <label>Elige tu Avatar:</label>
        <div class="custom_dropdown" @click="dropdownAbierto = !dropdownAbierto" ref="dropdownRef">
          <div class="dropdown_header">
            <img :src="'/avatars/' + form.icono_perfil + '.png'" alt="Seleccionado" class="avatar_circle">
            <span>{{ listaPersonajes.find(p => p.id === form.icono_perfil)?.nombre }}</span>
            <span class="flecha">{{ dropdownAbierto ? '▲' : '▼' }}</span>
          </div>
          <div class="dropdown_body" v-if="dropdownAbierto" @click.stop>
            <div class="avatares_grid">
              <div v-for="personaje in listaPersonajes" :key="personaje.id" 
                   :class="['avatar_opcion', form.icono_perfil === personaje.id ? 'seleccionado' : '']"
                   @click.stop="form.icono_perfil = personaje.id; dropdownAbierto = false">
                <img :src="'/avatars/' + personaje.id + '.png'" alt="" class="avatar_circle">
                <span>{{ personaje.nombre }}</span>
              </div>
            </div>
          </div>
        </div>

        <button class="boton_inicio" type="submit">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { registro } from '../../functions/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const dropdownAbierto = ref(false);
const dropdownRef = ref(null);

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownAbierto.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));

const form = ref({
  user: '',
  email: '',
  password: '',
  ciudad: '',
  programa_favorito: '',
  icono_perfil: 'finn'
});

const listaPersonajes = [
  { id: 'finn', nombre: 'Finn' },
  { id: 'dexter', nombre: 'Dexter' },
  { id: 'coraje', nombre: 'Coraje' },
  { id: 'rigby', nombre: 'Rigby' },
  { id: 'ben', nombre: 'Ben 10' },
  { id: 'bombon', nombre: 'Bombón' },
  { id: 'gumball', nombre: 'Gumball' },
  { id: 'darwin', nombre: 'Darwin' },
  { id: 'dann', nombre: 'Danny' },
  { id: 'gwen', nombre: 'Gwen' }
];

import { swallError, swallTrue } from '../../functions/alerts.js';

const registroUser = async () => {
  if (form.value.password.length < 6) {
    swallError("La contraseña debe tener al menos 6 caracteres");
    return;
  }

  try {
    const userData = {
      user: form.value.user,
      email: form.value.email,
      password: form.value.password,
      ciudad: form.value.ciudad,
      programa_favorito: form.value.programa_favorito,
      icono_perfil: form.value.icono_perfil
    };

    const response = await registro(userData);

    if (response && response.status === 201) {
      swallTrue("¡Registro exitoso! Ya puedes iniciar sesión.");
      router.push("/inicio");
    } else {
      swallError(response.data.message || "Error al registrar usuario");
    }

  } catch (error) {
    console.error("Error en el registro:", error);
    const mensaje = error.response?.data?.message || "Error al conectar con el servidor";
    swallError(mensaje);
  }
};

</script>

<style scoped>
@keyframes jello-horizontal {
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}





.c_registro {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow-y: auto;
  background-color: transparent !important; 
}


.logo {
  flex: 1;
  display: flex;
  justify-content: center;

  width: 100%;
}

.imagen {
  width: 25rem;
}

.contenedor_login {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 0;
  border: 5px solid black;
  box-shadow: 10px 10px 0px black;
  width: 100%;
  max-width: 400px;
  margin: 2rem;
  height: auto;
  justify-content: center;
}

@media (max-width: 768px) {
  .c_registro {
    flex-direction: column;
    height: auto;
    padding: 2rem 0;
  }
  .logo {
    margin-bottom: 2rem;
  }
  .contenedor_login {
    margin: 0 auto;
    width: 90%;
    padding: 1.5rem;
  }
  .imagen {
    width: 15rem;
  }
}


.titulo {
  text-align: center;
  color: black;
  font-family: 'League Spartan', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 3rem;
  letter-spacing: 2px;
  -webkit-text-stroke: 1.5px black;
  text-shadow: 4px 4px 0px white;
  margin-bottom: 0.5rem;
}


.formulario {
  display: flex;
  flex-direction: column;
  width: 100%;
}


label {
  padding: 0.5rem 0;
  font-weight: bold;
}


input {
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  border-radius: 10rem;
}

.boton_inicio {
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgb(255, 182, 25);
  border: none;
  border-radius: 10rem;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.boton_inicio:hover {
  background-color: rgb(120, 83, 1);
}

.avatares_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.avatar_opcion {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 0.5rem;
  transition: all 0.2s;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
}

.avatar_opcion:hover {
  background-color: #ddd;
  transform: scale(1.05);
}

.avatar_opcion.seleccionado {
  border: 3px solid black;
  background-color: #FFFFFF;
  box-shadow: 4px 4px 0px black;
  transform: translateY(-2px);
}

.avatar_circle {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center; 
  border: 2px solid black;
  background-color: white;
}

.avatar_opcion span {
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  margin-top: 0.4rem;
  color: black;
}

.custom_dropdown {
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  border: 2px solid black;
  border-radius: 6rem;
  background-color: white;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.custom_dropdown:hover {
  box-shadow: 4px 4px 0px black;
}

.dropdown_header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: space-between;
}

.dropdown_header span {
  font-weight: bold;
  font-size: 1.1rem;
  flex: 1;
  margin-left: 1rem;
  color: black;
  text-transform: uppercase;
}

.flecha {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.dropdown_body {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 3px solid black;
  border-radius: 1rem;
  z-index: 100;
  box-shadow: 6px 6px 0px black;
  margin-top: 0.5rem;
  padding: 1rem;
  max-height: 250px;
  overflow-y: auto;
}
</style>