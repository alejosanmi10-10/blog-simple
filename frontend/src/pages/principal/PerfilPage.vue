<template>
  <div class="contenedorP_perfil">
    <div class="contenedor_perfil">
      <div class="informacion_perfil">
        <div style="position: relative; display: inline-block;" ref="dropdownAvatarRef">
          <img :src="'/avatars/' + (informacion.icono_perfil || 'finn') + '.png'" alt="Avatar" style="width: 15rem; height: 15rem; border-radius: 50%; border: 6px solid black; box-shadow: 10px 10px 0px black; object-fit: cover; object-position: top center; margin-bottom: 1rem; background-color: white;">
          <button class="btn_editar_avatar" @click="mostrarDropdownAvatar = !mostrarDropdownAvatar">✎</button>
          
          <div class="dropdown_avatar_perfil" v-if="mostrarDropdownAvatar">
            <h4 style="margin: 0 0 0.5rem 0; color: black; font-family: 'League Spartan', sans-serif;">Elige un Avatar</h4>
            <div class="grid_avatar_perfil">
              <div v-for="personaje in listaPersonajes" :key="personaje.id" 
                   :class="['opcion_avatar', personaje.id === informacion.icono_perfil ? 'activo' : '']"
                   @click="cambiarAvatar(personaje.id)">
                <img :src="'/avatars/' + personaje.id + '.png'" alt="">
              </div>
            </div>
          </div>
        </div>
        <h1 class="nombre">{{ informacion.userName }}</h1>
        <div class="perfil_datos_box">
          <section class="perfil_dato_item">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z" />
            </svg>
            <h2>{{ informacion.email }}</h2>
          </section>
          <section class="perfil_dato_item">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                <path
                  d="M9.74 15.876a.75.75 0 0 1-.616.864a17.15 17.15 0 0 0-6.707 2.666a.75.75 0 0 1-.834-1.247a18.65 18.65 0 0 1 7.293-2.899a.75.75 0 0 1 .864.616m4.52 0a.75.75 0 0 1 .864-.616a18.65 18.65 0 0 1 7.293 2.899a.75.75 0 0 1-.834 1.247a17.15 17.15 0 0 0-6.707-2.666a.75.75 0 0 1-.616-.864" />
                <path
                  d="M6.25 10a5.75 5.75 0 1 1 11.5 0c0 2.742-1.364 5.153-2.655 6.832a18.6 18.6 0 0 1-2.387 2.552a10 10 0 0 1-.22.185l-.013.012l-.004.003h-.002c0 .001 0 .002-.469-.584l-.43.614l-.003-.002l-.004-.003l-.015-.01l-.049-.036l-.175-.132a13 13 0 0 1-.602-.502a15.4 15.4 0 0 1-1.808-1.898C7.604 15.394 6.25 12.983 6.25 10M12 19l-.43.614a.75.75 0 0 0 .899-.028zm-.026-.973q.13-.118.286-.27a17 17 0 0 0 1.646-1.84c1.208-1.57 2.344-3.659 2.344-5.917a4.25 4.25 0 0 0-8.5 0c0 2.517 1.145 4.606 2.336 6.094a14 14 0 0 0 1.888 1.933M12 8.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M9.25 10a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0" />
              </g>
            </svg>
            <h3>{{ informacion.ciudad }}</h3>
          </section>
          <section v-if="informacion.programa_favorito" class="perfil_dato_item" style="color: #DC143C;">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M21 6h-7.59l2.3-2.29c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0L12 4.59L9.71 2.3a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m0 14H3V8h18zM9 10v8l7-4z" />
            </svg>
            <h3>{{ informacion.programa_favorito }}</h3>
          </section>
        </div>
      </div>
    </div>
    <div class="contenedorPrincipal">
      <div class="header_publicaciones">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
          <h1 @click="tabActiva = 'misPosts'" :style="{ background: tabActiva === 'misPosts' ? '#FFFFFF' : 'white', cursor: 'pointer' }" style="color: black; border: 4px solid black; box-shadow: 6px 6px 0px black; padding: 1rem 2rem; font-family: 'League Spartan', sans-serif; text-transform: uppercase; font-weight: 900; font-size: 2rem; margin: 0; transition: all 0.2s;">MIS PUBLICACIONES</h1>
          <h1 @click="tabActiva = 'favoritos'" :style="{ background: tabActiva === 'favoritos' ? '#DC143C' : 'white', color: tabActiva === 'favoritos' ? 'white' : 'black', cursor: 'pointer' }" style="border: 4px solid black; box-shadow: 6px 6px 0px black; padding: 1rem 2rem; font-family: 'League Spartan', sans-serif; text-transform: uppercase; font-weight: 900; font-size: 2rem; margin: 0; transition: all 0.2s;">FAVORITOS ⭐</h1>
        </div>
      </div>
      <div v-if="tabActiva === 'misPosts'" class="contenedor_publicaciones">
        <h3 v-if="publicacionesFiltradas.length === 0" style="color: black; font-family: 'League Spartan'; font-size: 1.5rem;">No tienes publicaciones aún.</h3>
        <Card v-for="publicacion in publicacionesFiltradas" :titulo="publicacion.titulo"
          :descripcion="publicacion.categoria" :id="publicacion.id" :capturar="() => capturar(publicacion.id)"
          :editar="() => editar(publicacion.id)" />
      </div>

      <div v-if="tabActiva === 'favoritos'" class="contenedor_publicaciones">
        <h3 v-if="publicacionesFavoritas.length === 0" style="color: black; font-family: 'League Spartan'; font-size: 1.5rem;">Aún no has guardado ninguna publicación.</h3>
        <Card v-for="publicacion in publicacionesFavoritas" :key="'fav'+publicacion.id" :titulo="publicacion.titulo"
          :descripcion="publicacion.categoria" :id="publicacion.id" :mostrarBotones="false" />
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { Imprimir, deletePost, editPost, actualizarAvatarReq, obtenerFavoritos, logoutReq } from '../../functions/api';
import { swallEditForm, swallTrue, swallError } from '../../functions/alerts';
import Card from '../../components/Card.vue';
import { useUserStore } from '../../stores/userStore';
import { useRouter } from 'vue-router';

export default {
  components: {
    Card
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const informacion = computed(() => userStore.user || {});
    const publicaciones = ref([]);
    const publicacionesFavoritas = ref([]);
    const mostrarDropdownAvatar = ref(false);
    const dropdownAvatarRef = ref(null);
    const tabActiva = ref('misPosts');
    
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

    const cambiarAvatar = async (nuevo_id) => {
      try {
        const id_usuario = informacion.value.id;
        await actualizarAvatarReq(id_usuario, nuevo_id);
        
        // Uso PRO de Pinia: Actualizamos el estado global
        const nuevoUserData = { ...userStore.user, icono_perfil: nuevo_id };
        userStore.setUser(nuevoUserData);
        
        swallTrue("Avatar actualizado");
        mostrarDropdownAvatar.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    const logout = async () => {
      try {
        const response = await logoutReq();
        if (response && response.data && response.data.message) {
          swallTrue(response.data.message);
          userStore.clearUser();
          router.push("/");
        } else {
          swallError('Error al cerrar sesión');
        }
      } catch (error) {
        console.error(error);
        swallError('Error al cerrar sesión');
      }
    };

    const publicacionesFiltradas = computed(() => {
      if (!informacion.value.userName) return publicaciones.value;
      return publicaciones.value.filter(publicacion =>
        publicacion.usuario.toLowerCase().includes(informacion.value.userName.toLowerCase())
      );
    });

    async function ImprimirPublicaciones() {
      try {
        const response = await Imprimir("publicacion");
        publicaciones.value = response.publicaciones;
      } catch (error) {
        console.error("Error fetching publicaciones:", error);
      }
    }

    async function capturar(id) {
      try {
        await deletePost(id);
        await ImprimirPublicaciones();
      } catch (error) {
        console.error(error);
      }
    }

    async function editar(id) {
      const publicacion = publicaciones.value.find(pub => pub.id === id);

      if (publicacion) {
        const formValues = await swallEditForm(publicacion);

        if (formValues) {
          try {
            const id_usuario = informacion.value.id;
            await editPost(id, { ...formValues, id_usuario });
            await ImprimirPublicaciones();
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        console.error("Publicación no encontrada con ID:", id);
      }
    }

    async function cargarFavoritos() {
      try {
        const id_usuario = informacion.value.id;
        const res = await obtenerFavoritos(id_usuario);
        publicacionesFavoritas.value = res.favoritos || [];
      } catch (error) {
        console.error("Error fetching favoritos:", error);
      }
    }

    const closeDropdown = (e) => {
      if (dropdownAvatarRef.value && !dropdownAvatarRef.value.contains(e.target)) {
        mostrarDropdownAvatar.value = false;
      }
    };

    onMounted(() => {
      ImprimirPublicaciones();
      cargarFavoritos();
      document.addEventListener('click', closeDropdown);
    });

    onUnmounted(() => {
      document.removeEventListener('click', closeDropdown);
    });

    return {
      informacion,
      publicacionesFiltradas,
      publicacionesFavoritas,
      tabActiva,
      capturar,
      editar,
      mostrarDropdownAvatar,
      dropdownAvatarRef,
      listaPersonajes,
      cambiarAvatar
    };
  }
};
</script>

<style>
.contenedorP_perfil {
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 1rem;
  width: 98%;

}

.contenedor_perfil {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;

}

.informacion_perfil {
  text-align: center;
  width: 25rem;
}

.nombre {
  background-color: rgb(1, 1, 1);
  padding: 1rem;
  color: white;
  border: 4px solid #FFFFFF;
  box-shadow: 6px 6px 0px black;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.perfil_datos_box {
  background-color: white;
  border: 4px solid black;
  box-shadow: 8px 8px 0px black;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1rem;
}

.perfil_dato_item {
  display: flex; 
  gap: 1rem; 
  align-items: center; 
  justify-content: flex-start; 
  color: black;
}

.perfil_dato_item h2, .perfil_dato_item h3 {
  margin: 0;
  font-weight: bold;
  font-family: 'League Spartan', sans-serif;
  /* text-transform: uppercase; */
  font-size: 1.3rem;
}

.contenedorPrincipal {
  border-radius: 2rem;
  padding: 1rem;
  width: 95%;
}


.contenedor_publicaciones {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-radius: 1rem;
  width: 95%;
  padding: 2rem;
  gap: 1rem;
  height: 70vh;
  overflow-y: auto;

}

.contenedor_publicaciones::-webkit-scrollbar {
  display: none;
}

.header_publicaciones {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  z-index: 10;
  position: relative;
}

.header_publicaciones h1 {
  background-color: #FFFFFF;
  color: black;
  border: 4px solid black;
  box-shadow: 6px 6px 0px black;
  padding: 1rem 2rem;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 2.5rem;
  margin: 0;
}

.btn_editar_avatar {
  position: absolute;
  bottom: 2rem;
  right: -1rem;
  background-color: rgb(255, 182, 25);
  border: 4px solid black;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 4px 4px 0px black;
  transition: transform 0.2s, background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.btn_editar_avatar:hover {
  transform: scale(1.1);
  background-color: #FFFFFF;
}

.dropdown_avatar_perfil {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -10px);
  background-color: white;
  border: 4px solid black;
  box-shadow: 8px 8px 0px black;
  border-radius: 1rem;
  padding: 1rem;
  z-index: 100;
  width: 15rem;
}

.grid_avatar_perfil {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.opcion_avatar {
  cursor: pointer;
  border: 2px solid transparent;
  padding: 0.2rem;
  border-radius: 0.5rem;
  background-color: #eee;
  transition: all 0.2s;
}

.opcion_avatar:hover {
  background-color: #ccc;
  transform: scale(1.1);
}

.opcion_avatar.activo {
  border: 3px solid black;
  background-color: #FFFFFF;
  box-shadow: 3px 3px 0px black;
}

.opcion_avatar img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  border: 2px solid black;
}

@media (max-width: 992px) {
  .contenedorP_perfil {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 2rem;
    width: 100%;
  }
  .informacion_perfil {
    width: 100%;
  }
  .contenedor_publicaciones {
    grid-template-columns: 1fr;
    padding: 1rem 0;
    height: auto;
    width: 100%;
  }
  .nombre {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .header_publicaciones h1 {
    font-size: 1.3rem !important;
    padding: 0.8rem 1rem !important;
    text-align: center;
    width: 100%;
    margin: 0 !important;
  }
  .header_publicaciones > div {
    flex-direction: column !important;
    width: 100%;
    gap: 0.5rem !important;
  }
  .contenedorPrincipal {
    width: 100%;
    padding: 0;
  }
  .perfil_datos_box {
    padding: 1rem;
  }
}
</style>