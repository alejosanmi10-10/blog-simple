<template>
  <div class="contain_comentario">
    <img :src="'/avatars/' + (icono || 'finn') + '.png'" alt="Avatar" class="icono_comentario">
    <div class="info_comentario">
      <div class="header_info_comentario">
        <p class="usuario_comentario">{{ usuario }}</p>
        <p class="fecha_comentario">{{ fecha }}</p>
      </div>
      <p v-if="programa" class="programa_comentario">▶ {{ programa }}</p>
      <p class="texto_comentario">{{ comentario }}</p>
    </div>
    <svg v-if="usuario == this.nombre" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"
      class="icono_eliminar" @click="capturar(id)">
      <path fill="currentColor"
        d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
    </svg>
  </div>
</template>
<script>
// LÓGICA DE COMENTARIO
// Única meta: Verificamos si el que hizo este comentario (usuario en props) 
// es el que está logueado en Pinia (nombre). ¡De ser iguales, se le dibuja un bote de basura para borrarlo!
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

export default {
  name: 'Comentario',
  props: {
    usuario: String,
    icono: String,
    programa: String,
    fecha: Date,
    comentario: String,
    capturar: Function,
    id: Number
  },

  setup() {
    const userStore = useUserStore();
    
    // Uso PRO de Pinia: Obtenemos el nombre del usuario logueado reactivamente
    const nombre = computed(() => userStore.user?.userName);
    
    return {
      nombre
    }
  }
};
</script>
<style>
.contain_comentario {
  width: 100%;
  background-color: #E5E5E5;
  border: 3px solid black;
  box-shadow: 4px 4px 0px black;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.contain_comentario:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px black;
}

.icono_comentario {
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  object-position: top center;
  border: 3px solid black;
  background: white;
  flex-shrink: 0;
}

.info_comentario {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: black;
  line-height: 1.4;
}

.header_info_comentario {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.usuario_comentario {
  font-weight: 900;
  margin: 0;
  font-family: 'League Spartan', sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
}

.fecha_comentario {
  margin: 0;
  font-size: 0.85rem;
  font-weight: bold;
  opacity: 0.7;
}

.programa_comentario {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 900;
  color: #DC143C;
  text-transform: uppercase;
}

.texto_comentario {
  margin: 0.5rem 0 0 0;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  word-break: break-word;
}

.icono_eliminar {
  color: black;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.2rem;
}

.icono_eliminar:hover {
  color: white;
  background-color: red;
  border-radius: 50%;
}

@media (max-width: 768px) {
  .contain_comentario {
    padding: 0.8rem;
    gap: 0.5rem;
  }
  .icono_comentario {
    width: 2.5rem;
    height: 2.5rem;
  }
  .usuario_comentario {
    font-size: 1.1rem;
  }
}
</style>