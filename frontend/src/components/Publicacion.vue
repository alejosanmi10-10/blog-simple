<template>
  <div class="contenedor_publicacion scale-up-center" @click="emitirDetalle" style="cursor: pointer;">
    <div style="display: flex; justify-content: space-between;">
      <div style="display: flex; gap: 1rem; align-items: center; justify-content: center;">
        <img :src="'/avatars/' + (icono || 'finn') + '.png'" alt="Avatar" style="width: 3.5rem; height: 3.5rem; border-radius: 50%; border: 3px solid black; object-fit: cover; object-position: top center; box-shadow: 4px 4px 0px black;">
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <h3 style="margin: 0; font-weight: 900; font-size: 1.5rem; font-family: 'League Spartan', sans-serif;">{{ creador }}</h3>
          <p v-if="programa" style="margin: 0; font-size: 0.9rem; font-weight: bold; color: #DC143C; text-transform: uppercase;">▶ {{ programa }}</p>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
        <button v-if="creador === nombreUsuarioLogueado" @click.stop="manejarEditar" title="Editar Publicación" style="background: yellow; border: 3px solid black; cursor: pointer; padding: 5px; box-shadow: 3px 3px 0px black;">✏️</button>
        <button v-if="creador === nombreUsuarioLogueado" @click.stop="manejarEliminar" title="Eliminar Publicación" style="background: red; color: white; border: 3px solid black; cursor: pointer; padding: 5px; box-shadow: 3px 3px 0px black;">🗑️</button>
        <h3 style="background: black; color: white; padding: 5px 10px; font-family: monospace; height: fit-content; margin: 0;">{{ fecha }}</h3>
      </div>
    </div>
    <div class="contenido_publicacion">
      <div class="contenedor_titulo">
        <h1 class="titulo_publicacion">{{ titulo }}</h1>
      </div>
      <p style="text-align: center; font-weight: 900; text-transform: uppercase; background: #FFFFFF; border: 4px solid black; padding: 5px 15px; width: fit-content; margin: 0 auto; box-shadow: 6px 6px 0px black; font-family: 'League Spartan', sans-serif;">{{ categoria }}</p>

      <hr style="border: none; border-bottom: 4px dashed black; width: 100%; margin: 20px 0;">

      <img v-if="imagen_url" :src="imagen_url" alt="Imagen de Publicación" style="width: 100%; max-height: 500px; object-fit: cover; border: 4px solid black; box-shadow: 8px 8px 0px black; margin-bottom: 1rem;">

      <p style="padding-top:1rem; text-align: justify; width: 100%; font-size: 1.1rem; line-height: 1.6; font-family: Arial, sans-serif;">
        {{ texto }}
      </p>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <button class="conteo_reacciones" @click.stop="toggleEstrella" style="background: white; border: 3px solid black; padding: 0.3rem 0.8rem; cursor: pointer; box-shadow: 4px 4px 0px black; font-size: 1.2rem;">
            {{ esFavorito ? '⭐ Favorito' : '✩ Guardar' }}
          </button>
          <div class="conteo_reacciones" @click.stop="toggleLike">
            <svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24" 
              :style="{ color: haReaccionado ? '#ff0000' : 'black' }">
              <path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>
            </svg>
            <span class="total_reacciones">{{ totalReacciones }}</span>
          </div>
          <div v-if="creador === nombreUsuarioLogueado" class="ver_usuarios_btn scale-up-center" @click.stop="toggleUsuariosReacciones">
            👀 Ver Reacciones
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24" class="icono_comentar"
            @click.stop="agregarMensaje">
            <path fill="currentColor"
              d="M6 14h12v-2H6zm0-3h12V9H6zm0-3h12V6H6zM4 18q-.825 0-1.412-.587T2 16V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v18l-4-4z" />
          </svg>
        </div>

        <div v-if="mostrarUsuarios" class="lista_usuarios_reacciones neo-brutal-popover scale-up-center" @click.stop>
          <h4>Usuarios que reaccionaron:</h4>
          <ul v-if="usuariosQueReaccionaron.length > 0">
            <li v-for="(user, idx) in usuariosQueReaccionaron" :key="idx">{{ user }}</li>
          </ul>
          <p v-else style="font-weight: bold; margin:0;">Nadie ha reaccionado aún.</p>
        </div>

      <div class="contenedor_comentarios">
        <Comentario v-for="comentario in comentarios" :key="comentario.id" :usuario="comentario.usuario" :icono="comentario.icono_perfil" :programa="comentario.programa_favorito" :fecha="comentario.fecha"
          :comentario="comentario.comentario" :capturar="() => EliminarComentario(comentario.id)"
          :id="comentario.id" />
      </div>
    </div>
  </div>
</template>

<script>
import Comentario from './Comentario.vue';
import { swallInput } from '../functions/alerts';
import { TraerComentarios, crearComentario, deleteComentario, formatearFecha, reaccionar, TraerReacciones, TraerUsuariosReacciones, deletePost, editPost, toggleFavorito, obtenerFavoritos } from '../functions/api';
import { onMounted, ref } from 'vue';
import { useUserStore } from '../stores/userStore';


export default {
  components: {
    Comentario
  },
  name: 'Publicacion',
  props: {
  creador: String,
  icono: String,
  programa: String,
  fecha: String,
  titulo: String,
  categoria: String,
  texto: String,
  imagen_url: String,
  id: Number,
},
  setup(props, { emit }) {

    const comentarios = ref([])
    const userStore = useUserStore();
    const id_usuario = userStore.user?.id || 0;
    const nombreUsuarioLogueado = userStore.user?.userName || "";

    const mostrarUsuarios = ref(false);
    const usuariosQueReaccionaron = ref([]);

    const toggleUsuariosReacciones = async () => {
      mostrarUsuarios.value = !mostrarUsuarios.value;
      if (mostrarUsuarios.value) {
        const res = await TraerUsuariosReacciones(props.id);
        usuariosQueReaccionaron.value = res.usuarios || [];
      }
    };

    const agregarMensaje = async () => {
      const confirmacion = await swallInput();
      if (confirmacion) {
        const info = {
          "id_usuario": id_usuario,
          "id_publicacion": props.id,
          "comentario": confirmacion
        }
        console.log(info);

        const response = await crearComentario(info);
        console.log(response)
        ImprimirComentarios(props.id)

      }
    };

    const emitirDetalle = () => {
      emit('ver-detalle', {
        creador: props.creador,
        icono: props.icono,
        programa: props.programa,
        fecha: props.fecha,
        titulo: props.titulo,
        categoria: props.categoria,
        texto: props.texto,
        imagen_url: props.imagen_url,
        id: props.id
      });
    };

    const manejarEliminar = async () => {
      try {
        await deletePost(props.id);
        emit('post-eliminado', props.id); // Avisa al padre para refrescar lista
      } catch (error) {
        console.error(error);
      }
    };

    const manejarEditar = async () => {
      const nuevoTitulo = prompt("Edita el título:", props.titulo);
      if (!nuevoTitulo) return;
      const nuevaCategoria = prompt("Edita la categoría:", props.categoria);
      if (!nuevaCategoria) return;
      const nuevoTexto = prompt("Edita el texto:", props.texto);
      if (!nuevoTexto) return;
      const nuevaImagen = prompt("Enlace de imagen (opcional):", props.imagen_url || "");

      try {
        await editPost(props.id, { titulo: nuevoTitulo, categoria: nuevaCategoria, texto: nuevoTexto, imagen_url: nuevaImagen });
        emit('post-editado', props.id);
      } catch (error) {
        console.error(error);
      }
    };

    async function ImprimirComentarios(valor) {
      try {
        const response = await TraerComentarios(valor);
        console.log(response)
        response.data.forEach(publicacion => {
          publicacion.fecha = formatearFecha(publicacion.fecha);
        });
        comentarios.value = response.data;
      } catch (error) {
        console.error("Error en traer los comentarios:", error);
      }
    }

    async function EliminarComentario(valor) {
      console.log(valor)
      try {
        const response = await deleteComentario(valor);
        console.log(response)
        ImprimirComentarios(props.id)
      } catch (error) {
        console.error("Error en traer los comentarios:", error);
      }
    }

    const totalReacciones = ref(0);
    const haReaccionado = ref(false);
    const esFavorito = ref(false);

    const toggleEstrella = async () => {
      try {
        const res = await toggleFavorito({ id_usuario, id_publicacion: props.id });
        if (res.status === "ok") {
          esFavorito.value = (res.accion === "puesto");
        }
      } catch (error) {
        console.error("Error al guardar favorito:", error);
      }
    };

    const chequearFavoritoInicial = async () => {
      try {
        const res = await obtenerFavoritos(id_usuario);
        if (res && res.favoritos) {
          esFavorito.value = res.favoritos.some(fav => fav.id === props.id);
        }
      } catch (error) {
        console.error("Error al chequear fav:", error);
      }
    };

    const toggleLike = async () => {
      try {
        const res = await reaccionar({ id_usuario, id_publicacion: props.id });
        if (res.status === "ok") {
          haReaccionado.value = (res.accion === "puesto");
          await actualizarReacciones();
        }
      } catch (error) {
        console.error("Error al reaccionar:", error);
      }
    };

    const actualizarReacciones = async () => {
      const res = await TraerReacciones(props.id);
      totalReacciones.value = res.total;
    };

    onMounted(async () => {
      await ImprimirComentarios(props.id);
      await actualizarReacciones();
      await chequearFavoritoInicial();
    });

    return {
      agregarMensaje,
      comentarios,
      EliminarComentario,
      emitirDetalle,
      totalReacciones,
      haReaccionado,
      toggleLike,
      esFavorito,
      toggleEstrella,
      nombreUsuarioLogueado,
      mostrarUsuarios,
      usuariosQueReaccionaron,
      toggleUsuariosReacciones,
      manejarEliminar,
      manejarEditar
    };
  }
}
</script>
<style>
.contenedor_publicacion {
  width: 100%;
  padding: 1.5rem 2.5rem;
  background-color: white;
  border: 4px solid black;
  border-radius: 0;
  box-shadow: 10px 10px 0px black;
  color: black;
  margin-bottom: 2rem;
  transition: transform 0.2s;
}

.contenedor_publicacion:hover {
  transform: translate(-4px, -4px);
  box-shadow: 14px 14px 0px black;
}

.contenido_publicacion {
  width: 100%;
  padding: 1rem 0;
}

.contenedor_titulo {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
}

.titulo_publicacion {
  background-color: #FFFFFF;
  padding: 1rem 2rem;
  color: black;
  border: 4px solid black;
  box-shadow: 6px 6px 0px black;
  font-size: 2rem;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.icono_comentar {
  color: black;
  background-color: #DC143C;
  border: 3px solid black;
  box-shadow: 4px 4px 0px black;
  padding: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.icono_comentar:hover {
  background-color: #FFFFFF;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
}

.conteo_reacciones {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 3px solid black;
  box-shadow: 4px 4px 0px black;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.conteo_reacciones:hover {
  background-color: #DC143C;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
}

.total_reacciones {
  font-weight: 900;
  font-family: 'League Spartan', sans-serif;
  font-size: 1.2rem;
}

.ver_usuarios_btn {
  background-color: #FFFFFF;
  border: 3px solid black;
  box-shadow: 4px 4px 0px black;
  padding: 0.3rem 0.8rem;
  font-weight: 900;
  font-family: 'League Spartan', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.ver_usuarios_btn:hover {
  background-color: #DC143C;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
  color: white;
}

.neo-brutal-popover {
  margin-top: 1rem;
  background-color: #ffeb3b;
  border: 4px solid black;
  box-shadow: 6px 6px 0px black;
  padding: 1rem;
  font-family: 'League Spartan', sans-serif;
  width: fit-content;
}

.neo-brutal-popover h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  text-transform: uppercase;
  border-bottom: 3px solid black;
  padding-bottom: 0.2rem;
}

.neo-brutal-popover ul {
  list-style-type: square;
  padding-left: 1.5rem;
  margin: 0;
}

.neo-brutal-popover li {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.contenedor_comentarios {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 20px;
  align-items: center;
}

@media (max-width: 768px) {
  .contenedor_publicacion {
    padding: 1rem;
  }
  .titulo_publicacion {
    font-size: 1.3rem;
    padding: 0.8rem 1rem;
    word-break: break-word;
    text-align: center;
  }
  .contenedor_publicacion > div:first-child {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 15px !important;
  }
  .conteo_reacciones, .ver_usuarios_btn {
    font-size: 0.9rem;
    padding: 0.3rem 0.5rem;
  }
}
</style>