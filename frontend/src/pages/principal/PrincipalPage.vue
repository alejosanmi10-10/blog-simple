<template>
  <div class="vistas">
    <div class="contenedor">
      <div>
        <h1 class="titulo">Personas</h1>
        <hr class="separator">
        <div class="listaUsuarios">
          <Personas v-for="usuario in usuarios" :key="usuario.id" :nombre="usuario.user" :ubicacion="usuario.ciudad" />
        </div>
      </div>

      <div>
        <h1 class="titulo">Ranking</h1>
        <hr class="separator">
        <div class="listaRanking">
          <Ranking v-for="lista in ranking" :nombre="lista.titulo" :cantidad="lista.cantidad_comentarios" />

        </div>
      </div>

    </div>

    <div class="contenedor_vistaP">
      <div class="busqueda">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
          <path fill="currentColor"
            d="M19.5 3C14.265 3 10 7.265 10 12.5c0 2.25.81 4.307 2.125 5.938L3.28 27.28l1.44 1.44l8.843-8.845C15.192 21.19 17.25 22 19.5 22c5.235 0 9.5-4.265 9.5-9.5S24.735 3 19.5 3m0 2c4.154 0 7.5 3.346 7.5 7.5S23.654 20 19.5 20S12 16.654 12 12.5S15.346 5 19.5 5" />
        </svg>
        <input id="busqueda" type="text" class="campo_busqueda" v-model="textoBusqueda">
      </div>
      <div class="listaPublicaciones">
        <Publicacion v-for="publicacion in publicacionesFiltradas" :key="publicacion.id" :creador="publicacion.usuario"
          :fecha="publicacion.fecha" :titulo="publicacion.titulo" :categoria="publicacion.categoria"
          :texto="publicacion.texto" :id="publicacion.id" />
      </div>
    </div>
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

    //FILTRA POR TITULO O POR CONTENIDO DE TEXTO
    const publicacionesFiltradas = computed(() => {
      if (!textoBusqueda.value) return publicaciones.value;
      return publicaciones.value.filter(publicacion =>
        publicacion.titulo.toLowerCase().includes(textoBusqueda.value.toLowerCase())

      );
    });

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

    return {
      publicaciones,
      usuarios,
      textoBusqueda,
      publicacionesFiltradas,
      ranking
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
    grid-template-columns: 1fr;
    padding: 1rem;
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
  color: #ffff00;
  padding: 10px;
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
  background-color: #ffff00;
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px black;
}

.listaPublicaciones {
  width: 100%;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 50vh;
  overflow-y: visible;
  align-items: center;
  padding: 0 1rem;
}

@media (min-width: 992px) {
  .listaPublicaciones {
    height: 75vh;
    overflow-y: auto;
    padding: 0 2rem;
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
</style>
