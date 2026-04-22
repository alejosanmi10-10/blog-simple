<template>
  <div class="vistas">
    <div class="contenedor">
      <div>
        <h1 class="titulo">Personas</h1>
        <hr class="separator">
        <div class="listaUsuarios">
          <Personas v-for="usuario in usuarios" :key="usuario.id" :icono="usuario.icono_perfil" :nombre="usuario.user" :ubicacion="usuario.ciudad" :programa="usuario.programa_favorito" @click="filtrarPorUsuario(usuario.user)" style="cursor: pointer;" />
        </div>
      </div>

      <div>
        <h1 class="titulo">Ranking</h1>
        <hr class="separator">
        <div class="listaRanking">
          <Ranking v-for="lista in ranking" :key="lista.id" :id="lista.id" :nombre="lista.titulo" :cantidad="lista.cantidad_comentarios" @click-ranking="abrirDetalleDesdeRanking" />
        </div>
      </div>

    </div>

    <div class="contenedor_vistaP">
      <div v-if="usuarioFiltro" style="width: 100%; max-width: 800px; display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; border: 4px solid black; padding: 10px 20px; box-shadow: 6px 6px 0px black; margin-bottom: 0px; margin-top: 20px;">
        <h2 style="margin: 0; font-family: 'League Spartan', sans-serif; text-transform: uppercase; color: black; font-size: 1.5rem;">▶ Viendo posts de: {{ usuarioFiltro }}</h2>
        <button @click="limpiarFiltroUsuario" style="background: #DC143C; color: white; border: 3px solid black; padding: 5px 15px; font-weight: 900; cursor: pointer; box-shadow: 4px 4px 0px black; transition: all 0.2s;">VER TODOS</button>
      </div>



      <div class="busqueda" style="margin: 0 0 40px 0;">
        <svg xmlns="http://www.w3.org/2000/svg" width="2.8em" height="2.8em" viewBox="0 0 32 32">
          <path fill="currentColor"
            d="M19.5 3C14.265 3 10 7.265 10 12.5c0 2.25.81 4.307 2.125 5.938L3.28 27.28l1.44 1.44l8.843-8.845C15.192 21.19 17.25 22 19.5 22c5.235 0 9.5-4.265 9.5-9.5S24.735 3 19.5 3m0 2c4.154 0 7.5 3.346 7.5 7.5S23.654 20 19.5 20S12 16.654 12 12.5S15.346 5 19.5 5" />
        </svg>
        <input id="busqueda" type="text" class="campo_busqueda" v-model="textoBusqueda" placeholder="Buscar título, texto o serie...">
      </div>
      <div class="listaPublicaciones">
        <div v-if="publicacionesFiltradas.length === 0" style="color: white; background: black; padding: 20px; border: 4px solid #FFFFFF; font-size: 1.5rem; font-family: 'League Spartan'; font-weight: 900;">
          {{ publicaciones.length === 0 ? 'Cargando contenido...' : 'No se encontraron publicaciones que coincidan.' }}
        </div>
        <Publicacion v-for="publicacion in publicacionesPaginadas" :key="publicacion.id" :creador="publicacion.usuario"
          :icono="publicacion.icono_perfil" :programa="publicacion.programa_favorito" :fecha="publicacion.fecha" :titulo="publicacion.titulo" :categoria="publicacion.categoria"
          :texto="publicacion.texto" :imagen_url="publicacion.imagen_url" :id="publicacion.id" @ver-detalle="abrirDetalle" 
          @post-eliminado="removerPostLocal" @post-editado="ImprimirPublicaciones" />
          
        <button v-if="limite < publicacionesFiltradas.length" @click="cargarMas" 
          style="background: #FFFFFF; border: 4px solid black; padding: 10px 30px; font-weight: 900; font-size: 1.5rem; font-family: 'League Spartan'; cursor: pointer; box-shadow: 6px 6px 0px black; margin-top: 20px; transition: all 0.2s;"
          onmouseover="this.style.background='#DC143C'; this.style.color='white';"
          onmouseout="this.style.background='#FFFFFF'; this.style.color='black';">
          ➕ CARGAR MÁS
        </button>
      </div>
    </div>

    <!-- MODAL DE VISTA EXPANDIDA (MODO FOCO) -->
    <Transition name="fade">
      <div v-if="mostrarDetalle" class="modal_overlay" @click.self="cerrarDetalle">
        <div class="modal_contenido scale-up-center">
          <button class="boton_cerrar_modal" @click="cerrarDetalle">X</button>
          <Publicacion 
            :creador="postSeleccionado.creador"
            :icono="postSeleccionado.icono"
            :programa="postSeleccionado.programa"
            :fecha="postSeleccionado.fecha" 
            :titulo="postSeleccionado.titulo" 
            :categoria="postSeleccionado.categoria"
            :texto="postSeleccionado.texto" 
            :imagen_url="postSeleccionado.imagen_url"
            :id="postSeleccionado.id" 
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import Header from '../../components/Header.vue';
import Personas from '../../components/Personas.vue';
import Publicacion from '../../components/Publicacion.vue';
import { Imprimir, formatearFecha, TraerRanking } from '../../functions/api';
import { onMounted, ref, computed } from 'vue';
import Ranking from '../../components/Ranking.vue';

export default {
  components: {
    Header,
    Publicacion,
    Personas,
    Ranking
  },
  setup() {
    const publicaciones = ref([]);
    const usuarios = ref([]);
    const ranking = ref([]);
    const textoBusqueda = ref("");
    const usuarioFiltro = ref(null);
    const mostrarDetalle = ref(false);
    const postSeleccionado = ref(null);

    //FILTRA POR TITULO, CONTENIDO O USUARIO SELECCIONADO
    const publicacionesFiltradas = computed(() => {
      let resultado = publicaciones.value;

      if (usuarioFiltro.value) {
        resultado = resultado.filter(p => p.usuario === usuarioFiltro.value);
      }

      if (textoBusqueda.value) {
        const busqueda = textoBusqueda.value.toLowerCase();
        resultado = resultado.filter(publicacion =>
          (publicacion.titulo || "").toLowerCase().includes(busqueda) ||
          (publicacion.categoria || "").toLowerCase().includes(busqueda) ||
          (publicacion.texto || "").toLowerCase().includes(busqueda)
        );
      }
      return resultado;
    });

    const limite = ref(5);
    const publicacionesPaginadas = computed(() => {
      return publicacionesFiltradas.value.slice(0, limite.value);
    });

    const cargarMas = () => {
      limite.value += 5;
    };

    const seriesPopulares = ['Hora de Aventura', 'Un Show Más', 'El Increíble Mundo de Gumball', 'Ben 10'];

    const removerPostLocal = (id) => {
      publicaciones.value = publicaciones.value.filter(p => p.id !== id);
      cerrarDetalle();
    };

    const filtrarPorUsuario = (user) => {
      usuarioFiltro.value = user;
      textoBusqueda.value = "";
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const limpiarFiltroUsuario = () => {
      usuarioFiltro.value = null;
    };

    async function ImprimirPublicaciones() {
      try {
        const response = await Imprimir("publicacion");
        response.publicaciones.forEach(publicacion => {
          publicacion.fecha = formatearFecha(publicacion.fecha);
        });
        publicaciones.value = response.publicaciones;
      } catch (error) {
        console.error("Error fetching publicaciones:", error);
      }
    }

    async function ImprimirRanking() {
      try {
        const response = await TraerRanking();
        console.log(response)
        ranking.value = response.ranking;
      } catch (error) {
        console.error("Error al obtener el ranking:", error);
      }
    }
    onMounted(async () => {
      await ImprimirPublicaciones();
      await ImprimirRanking();
      try {
        const Listusuarios = await Imprimir("usuarios");
        usuarios.value = Listusuarios.usuarios;
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }

      setInterval(async () => {
        await ImprimirRanking();
      }, 3000);



    });

    const abrirDetalle = (post) => {
      postSeleccionado.value = post;
      mostrarDetalle.value = true;
      document.body.style.overflow = 'hidden'; 
    };

    const cerrarDetalle = () => {
      mostrarDetalle.value = false;
      postSeleccionado.value = null;
      document.body.style.overflow = 'auto';
    };

    const abrirDetalleDesdeRanking = (id) => {
      const post = publicaciones.value.find(p => p.id === id);
      if (post) {
        abrirDetalle({
          creador: post.usuario,
          icono: post.icono_perfil,
          programa: post.programa_favorito,
          fecha: post.fecha,
          titulo: post.titulo,
          categoria: post.categoria,
          texto: post.texto,
          imagen_url: post.imagen_url,
          id: post.id
        });
      }
    };

    return {
      publicaciones,
      usuarios,
      textoBusqueda,
      usuarioFiltro,
      publicacionesFiltradas,
      publicacionesPaginadas,
      limite,
      cargarMas,
      seriesPopulares,
      ranking,
      mostrarDetalle,
      postSeleccionado,
      abrirDetalle,
      cerrarDetalle,
      abrirDetalleDesdeRanking,
      filtrarPorUsuario,
      limpiarFiltroUsuario,
      removerPostLocal,
      ImprimirPublicaciones
    };
  }
}
</script>

<style>
.vistas {
  display: grid;
  grid-template-columns: 320px 1fr; /* Fixed width sidebar for stability */
  gap: 3rem;
  padding: 2rem 4rem;
  max-width: 1600px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .vistas {
    padding: 2rem;
    gap: 2rem;
  }
}

@media (max-width: 992px) {
  .vistas {
    display: flex !important;
    flex-direction: column !important;
    padding: 0.5rem !important;
    width: 100%;
    box-sizing: border-box;
  }
  .contenedor {
    width: 100%;
  }
  .contenedor_vistaP {
    width: 100%;
    padding: 0;
  }
}

.contenedor {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.titulo {
  text-align: left; /* Align left for better flow with boxes */
  padding-left: 10px;
  color: white;
  font-family: 'League Spartan', sans-serif;
  font-size: 3rem;
  -webkit-text-stroke: 2px black;
  text-shadow: 6px 6px 0px black;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .titulo { font-size: 2rem; }
}

.separator {
  border: none;
  border-bottom: 4px solid black;
  width: 100%;
  margin: 10px auto 20px;
}

.listaUsuarios {
  display: flex;
  flex-direction: column;
  background: white;
  border: 4px solid black;
  box-shadow: 8px 8px 0px black;
  padding: 1rem;
  height: auto;
  max-height: 30vh;
  overflow-y: auto;
  gap: 1rem;
  margin-bottom: 2rem;
}

.listaUsuarios::-webkit-scrollbar {
  display: none;
}

.busqueda {
  display: flex;
  gap: 0;
  color: black;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 20px 0 40px 0;
}

.busqueda svg {
  background: black;
  color: #FFFFFF;
  padding: 5px;
  border: 4px solid black;
}

.campo_busqueda {
  flex-grow: 1;
  height: 3.5rem;
  border: 4px solid black;
  border-left: none;
  box-shadow: 8px 8px 0px black;
  padding: 0.5rem 1.5rem;
  font-size: 1.4rem;
  font-weight: 900;
  border-radius: 0;
  outline: none;
  transition: all 0.2s;
  font-family: 'League Spartan', sans-serif;
}

@media (max-width: 768px) {
  .campo_busqueda { width: 85%; height: 2.5rem; }
}

.campo_busqueda:focus {
  background-color: #FFFFFF;
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px black;
}

.listaPublicaciones {
  width: 100%;
  gap: 1.5rem;
  display: flex !important;
  flex-direction: column !important;
  height: auto;
  min-height: 50vh;
  overflow-y: visible;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}

@media (min-width: 992px) {
  .listaPublicaciones {
    height: 80vh;
    overflow-y: auto;
    padding: 0 1rem;
    scrollbar-width: thin;
    scrollbar-color: #DC143C black;
  }
}

.listaPublicaciones::-webkit-scrollbar {
  display: none;
}

.contenedor_vistaP {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* ESTILOS DEL MODAL (MODO FOCO) */
.modal_overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(5px);
}

.modal_contenido {
  background-color: #FFFFFF; /* Cyan base for high impact */
  padding: 2.5rem;
  border: 6px solid black;
  box-shadow: 20px 20px 0px black;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.boton_cerrar_modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #DC143C;
  color: black;
  border: 4px solid black;
  font-size: 1.5rem;
  font-weight: 900;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 4px 4px 0px black;
  z-index: 100;
  transition: all 0.2s;
}

.boton_cerrar_modal:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0px black;
  background-color: #FFFFFF;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal_overlay {
    padding: 1rem;
  }
  .modal_contenido {
    padding: 1.5rem 1rem;
    border-width: 4px;
    box-shadow: 10px 10px 0px black;
  }
}
</style>
