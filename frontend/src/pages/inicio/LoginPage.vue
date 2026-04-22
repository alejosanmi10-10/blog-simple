<template>
  <div class="c_registro">
    <div class="logo">
      <router-link to="/"><img src="../../../public/logo_cn.svg" alt="Logo" class="imagen" style="width: 25rem; max-width: 90vw;"></router-link>
    </div>
    <div class="contenedor_login">
      <form class="formulario" @submit.prevent="iniciarSesion">
        <div class="icono">
          <img src="/personaje_login.png" alt="Finn" style="width: 10rem; height: 10rem; border-radius: 50%; border: 4px solid black; background: white; padding: 5px; box-shadow: 6px 6px 0px black; margin-bottom: 1rem;">
        </div>
        <h1 class="titulo">Iniciar Sesion</h1>
        <hr style="border: none; height: 2px; background-color: #333; width: 80%; margin: 20px auto;">
        <label>Correo:</label>
        <input type="email" v-model="form.email" required autocomplete="off">
        <label>Contraseña:</label>
        <input type="password" v-model="form.password" required autocomplete="current-password">
        <small style="color: #666; margin-top: -0.5rem; margin-bottom: 1rem; font-weight: bold;">* Debe tener al menos 8 caracteres</small>
        <button class="boton_inicio" type="submit">Iniciar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../../functions/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const form = ref({
  email: '',
  password: '',
});

const iniciarSesion = async () => {
  try {
    const response = await login(form.value);
    
    if (response && response.status === 200) {
      
      // Uso PRO de Pinia: Seteamos el usuario en el store global
      const infoUsuario = {
        id: response.data.usuario[0].id,
        userName: response.data.usuario[0].user,
        ciudad: response.data.usuario[0].ciudad,
        email: response.data.usuario[0].email,
        rol: response.data.usuario[0].rol,
        icono_perfil: response.data.usuario[0].icono_perfil,
        programa_favorito: response.data.usuario[0].programa_favorito
      };
      
      userStore.setUser(infoUsuario);
      
      router.push("/dashboard/banner");
    } else {
      console.error('Error en la respuesta del servidor');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

<style scoped>
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

}

.imagen {
  width: 25rem;

}

.icono {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>