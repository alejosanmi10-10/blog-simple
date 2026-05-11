<template>
  <div class="contenedor_crear">
    <div class="decoracion scale-up-center">
      <h1>¡COMPARTE TU<br>MUNDO CARTOON!</h1>
      <h3>Sube historias, teorías o datos curiosos de tus series favoritas</h3>
    </div>

    <form class="info_crear scale-up-center" @submit.prevent="crearPublicacion">
      <div class="header_form">
        <h1>CREAR PUBLICACIÓN</h1>
      </div>
      
      <div class="input_group">
        <label class="label_Crear">TITULO DE LA PUBLICACIÓN:</label>
        <input type="text" class="input_crear" v-model="nuevaPublicacion.titulo" placeholder="Ej. El secreto de la Dulce Princesa" required />
      </div>

      <SelectorSeries 
        v-model="nuevaPublicacion.categoria" 
        @update:categoriaPersonalizada="seriePersonalizada = $event" 
      />

      <div class="input_group">
        <label class="label_Crear">¿QUÉ NOS VAS A CONTAR HOY?:</label>
        <textarea class="textarea" v-model="nuevaPublicacion.texto" placeholder="Escribe aquí tu historia..." required></textarea>
      </div>

      <button type="submit" class="boton">Guardar</button>
    </form>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { crearPost } from '../../services/postService';;
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';
import SelectorSeries from '../../components/ui/SelectorSeries.vue';

const router = useRouter();
const userStore = useUserStore();
const usuarioId = computed(() => userStore.user?.id);

const seriePersonalizada = ref('');

const nuevaPublicacion = ref({
  id_usuario: usuarioId.value,
  titulo: '',
  categoria: '',
  texto: '',
  imagen_url: ''
});

const crearPublicacion = async () => {
  try {
    const categoriaFinal = nuevaPublicacion.value.categoria === 'Otra' 
      ? seriePersonalizada.value 
      : nuevaPublicacion.value.categoria;

    const publicationData = {
      id_usuario: nuevaPublicacion.value.id_usuario,
      titulo: nuevaPublicacion.value.titulo,
      categoria: categoriaFinal,
      texto: nuevaPublicacion.value.texto,
      imagen_url: ''
    };

    const response = await crearPost(publicationData);
    if (response && response.status === 201) {
      router.push('/dashboard/perfil');
    }
  } catch (error) {
    console.error("Error al crear la publicacion:", error);
  }
};
</script>
<style scoped>
.contenedor_crear {
  display: flex;
  width: 90%;
  height: 85vh;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 3rem;
  gap: 2rem;
}

.decoracion {
  text-align: center;
  color: white;
  text-shadow: 4px 4px 0px black;
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border: 4px solid black;
  box-shadow: 8px 8px 0px black;
  backdrop-filter: blur(4px);
}

.decoracion h1 {
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  color: #FFFFFF;
  -webkit-text-stroke: 2px black;
  line-height: 1.1;
}

.decoracion h3 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-top: 0;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  color: #FFFFFF;
  -webkit-text-stroke: 1.5px black;
}

.info_crear {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem;
  background-color: #FFFFFF;
  border: 4px solid black;
  box-shadow: 12px 12px 0px black;
  color: black;
}

.header_form {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.header_form h1 {
  font-size: 2rem;
  color: black;
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  font-family: 'League Spartan', sans-serif;
  font-weight: 900;
  background: #FFFFFF;
  padding: 10px 20px;
  border: 4px solid black;
  box-shadow: 6px 6px 0px black;
}

.input_group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label_Crear {
  font-weight: 900;
  font-size: 1.2rem;
  color: black;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
}

.input_crear,
.textarea {
  padding: 1rem;
  border-radius: 0;
  border: 4px solid black;
  background-color: white;
  color: black;
  font-size: 1.1rem;
  font-family: Arial, sans-serif;
  box-shadow: 4px 4px 0px black;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.input_crear:focus,
.textarea:focus {
  outline: none;
  background-color: #fffac1;
  box-shadow: 6px 6px 0px black;
  transform: translate(-2px, -2px);
}

.textarea {
  min-height: 150px;
  resize: vertical;
}

.boton {
  padding: 1rem 2rem;
  color: white;
  font-weight: 900;
  font-family: 'League Spartan', sans-serif;
  border: 4px solid black;
  font-size: 1.5rem;
  background-color: #DC143C;
  width: fit-content;
  margin: 1rem auto 0;
  border-radius: 0;
  box-shadow: 6px 6px 0px black;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.boton:hover {
  background-color: #E5E5E5;
  transform: translate(-4px, -4px);
  box-shadow: 10px 10px 0px black;
  color: white;
}

@keyframes scale-up-center {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.scale-up-center {
  animation: scale-up-center 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@media (max-width: 768px) {
  .contenedor_crear {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  .info_crear {
    width: 100%;
    padding: 1.5rem;
  }
  .decoracion h1 {
    font-size: 3rem;
  }
  .boton {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }
}
</style>
