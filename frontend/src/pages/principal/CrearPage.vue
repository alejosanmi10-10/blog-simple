<template>
  <div class="contenedor_crear">
    <div class="decoracion scale-up-center">
      <h1>¡Crea tu propia<br>historia mágica!</h1>
      <h3>Comparte sobre tu personaje favorito</h3>
    </div>

    <form class="info_crear scale-up-center" @submit.prevent="crearPublicacion">
      <div class="header_form">
        <h1>CREAR PUBLICACIÓN</h1>
      </div>
      
      <div class="input_group">
        <label class="label_Crear">Titulo:</label>
        <input type="text" class="input_crear" v-model="nuevaPublicacion.titulo" placeholder="Ej. El secreto de la Dulce Princesa" required />
      </div>

      <div class="input_group">
        <label class="label_Crear">Serie:</label>
        <select class="input_crear" v-model="nuevaPublicacion.categoria" required style="cursor: pointer; appearance: auto;">
          <option value="" disabled selected>Selecciona una serie</option>
          <option value="Hora de Aventura">Hora de Aventura</option>
          <option value="Un Show Más">Un Show Más</option>
          <option value="El Increíble Mundo de Gumball">El Increíble Mundo de Gumball</option>
          <option value="Ben 10">Ben 10</option>
          <option value="Ben 10: Fuerza Alienígena / Supremacía">Ben 10: Fuerza Alienígena / Supremacía</option>
          <option value="Las Chicas Superpoderosas">Las Chicas Superpoderosas</option>
          <option value="Coraje, el Perro Cobarde">Coraje, el Perro Cobarde</option>
          <option value="Steven Universe">Steven Universe</option>
          <option value="Escandalosos">Escandalosos</option>
          <option value="Los Jóvenes Titanes">Los Jóvenes Titanes</option>
          <option value="Los Jóvenes Titanes en Acción">Los Jóvenes Titanes en Acción</option>
          <option value="KND: Los Chicos del Barrio">KND: Los Chicos del Barrio</option>
          <option value="Ed, Edd y Eddy">Ed, Edd y Eddy</option>
          <option value="El Laboratorio de Dexter">El Laboratorio de Dexter</option>
          <option value="Johnny Bravo">Johnny Bravo</option>
          <option value="Samurai Jack">Samurai Jack</option>
          <option value="Mansión Foster para Amigos Imaginarios">Mansión Foster para Amigos Imaginarios</option>
          <option value="Las Sombrías Aventuras de Billy y Mandy">Las Sombrías Aventuras de Billy y Mandy</option>
          <option value="Chowder">Chowder</option>
          <option value="Las Maravillosas Desventuras de Flapjack">Las Maravillosas Desventuras de Flapjack</option>
          <option value="El Campamento de Lazlo">El Campamento de Lazlo</option>
          <option value="Clarence">Clarence</option>
          <option value="Más Allá del Jardín">Más Allá del Jardín (Over the Garden Wall)</option>
          <option value="El Tren Infinito">El Tren Infinito (Infinity Train)</option>
          <option value="OK K.O.! Seamos Héroes">OK K.O.! Seamos Héroes</option>
          <option value="Tío Grandpa">Tío Grandpa</option>
          <option value="Generador Rex">Generador Rex</option>
          <option value="Titán Simbiónico">Titán Simbiónico</option>
          <option value="La Vaca y el Pollito">La Vaca y el Pollito</option>
          <option value="Soy la Comadreja">Soy la Comadreja</option>
          <option value="Mucha Lucha">Mucha Lucha</option>
          <option value="Isla del Drama (Drama Total)">Isla del Drama (Drama Total)</option>
          <option value="Otra">Otra / No está en la lista</option>
        </select>
      </div>

      <div class="input_group scale-up-center" v-if="nuevaPublicacion.categoria === 'Otra'">
        <label class="label_Crear">¿Cuál serie es?</label>
        <input type="text" class="input_crear" v-model="seriePersonalizada" placeholder="Escribe el nombre de la serie (Ej. Kipo, Más Allá del Jardín...)" required />
      </div>

      <div class="input_group">
        <label class="label_Crear">Texto:</label>
        <textarea class="textarea" v-model="nuevaPublicacion.texto" placeholder="Escribe aquí tu historia..." required></textarea>
      </div>

      <div class="input_group">
        <label class="label_Crear">Enlace de Imagen (Opcional):</label>
        <input type="url" class="input_crear" v-model="nuevaPublicacion.imagen_url" placeholder="Ej. https://.../imagen.png" />
      </div>

      <button type="submit" class="boton">Guardar</button>
    </form>
  </div>
</template>
<script setup>

import { ref, computed } from 'vue';
import { crearPost } from '../../functions/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';

const router = useRouter();
const userStore = useUserStore();

// Uso PRO de Pinia: Obtenemos el usuario del store global
const usuarioId = computed(() => userStore.user?.id);

const nuevaPublicacion = ref({
  id_usuario: usuarioId.value,
  titulo: '',
  categoria: '',
  texto: '',
  imagen_url: ''
});
const seriePersonalizada = ref('');
console.log(nuevaPublicacion);

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
      imagen_url: nuevaPublicacion.value.imagen_url
    };

    console.log('Datos del usuario en formato JSON:', publicationData);

    const response = await crearPost(publicationData);

    if (response && response.status === 201) {
      console.log(response.data.message);

    } else {
      //   console.log("error en creacion");
    }

  } catch (error) {
    console.error("Error al crear la publicacion:", error);
  } finally {
    router.push('/dashboard/perfil')
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
}

.decoracion h1 {
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 0.5rem;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  color: #ffff00;
  -webkit-text-stroke: 2px black;
  line-height: 1.1;
}

.decoracion h3 {
  font-size: 2.2rem;
  font-weight: bold;
  margin-top: 0;
  font-family: 'League Spartan', sans-serif;
  text-transform: uppercase;
  color: #00ffff;
  -webkit-text-stroke: 1.5px black;
}

.info_crear {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.5rem;
  background-color: #00ffff;
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
  background: #ffff00;
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
  background-color: #ff00ff;
  width: fit-content;
  margin: 1rem auto 0;
  border-radius: 0;
  box-shadow: 6px 6px 0px black;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.boton:hover {
  background-color: #ff4dff;
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
</style>