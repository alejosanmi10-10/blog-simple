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

      <div class="input_group" style="position: relative;" ref="dropdownRef">
        <label class="label_Crear">SELECCIONA LA SERIE:</label>
        <input type="text" class="input_crear" v-model="busquedaSerie" placeholder="Empieza a escribir..." @focus="mostrarOpciones = true" @input="mostrarOpciones = true" required />
        <ul v-if="mostrarOpciones && seriesFiltradas.length > 0" class="lista_opciones">
          <li v-for="serie in seriesFiltradas" :key="serie" @click="seleccionarSerie(serie)">{{ serie }}</li>
        </ul>
      </div>

      <div class="input_group scale-up-center" v-if="nuevaPublicacion.categoria === 'Otra'">
        <label class="label_Crear">¿QUÉ SERIE ES?</label>
        <input type="text" class="input_crear" v-model="seriePersonalizada" placeholder="Escribe el nombre de la serie" required />
      </div>

      <div class="input_group">
        <label class="label_Crear">¿QUÉ NOS VAS A CONTAR HOY?:</label>
        <textarea class="textarea" v-model="nuevaPublicacion.texto" placeholder="Escribe aquí tu historia..." required></textarea>
      </div>

      <button type="submit" class="boton">Guardar</button>
    </form>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { crearPost } from '../../functions/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/userStore';

const router = useRouter();
const userStore = useUserStore();
const usuarioId = computed(() => userStore.user?.id);

const busquedaSerie = ref('');
const mostrarOpciones = ref(false);
const dropdownRef = ref(null);
const seriePersonalizada = ref('');

const categorias = [
    '2 Perros Tontos', 'A Pup Named Scooby-Doo', 'Adventure Time', 'Agallas en la Gran Ciudad', 
    'Animales en Calzones', 'Animaniacs (90s)', 'Animaniacs (2020)', 'Archie y sus misterios', 
    'Baby Looney Tunes', 'Bakugan', 'Batman la Serie Animada', 'Batman: El Valiente', 
    'Beetlejuice', 'Ben 10 (Original)', 'Ben 10: Fuerza Alienígena', 'Ben 10: Supremacía Alienígena', 
    'Ben 10: Omniverse', 'Ben 10 (Reboot)', 'Beware the Batman', 'Beyblade', 'Birdman', 
    'Bleach (CN)', 'Bunnicula', 'Butch Cassidy', 'Campamento de verano', 'Camp Lazlo', 
    'Capitán Planeta', 'Capitol Critters', 'Carne con Malo', 'Carrera Alucinante', 
    'Casper la Escuela del Susto', 'CatDog (CN)', 'Chicas Superpoderosas Z', 'Chowder', 
    'Clarence', 'Class of 3000', 'Coraje el Perro Cobarde', 'Crónicas de Xiaolin', 
    'Cuentos de la Cripta', 'DC Super Hero Girls', 'Death Note (CN)', 'Defensores de la Tierra', 
    'Deltora Quest', 'Dexter (96)', 'Dino Boy', 'Don Gato y su Pandilla', 'Dorothy y el Mago de Oz', 
    'Dragon Ball Z', 'Dragon Ball GT', 'Dragon Ball Super', 'Duck Dodgers', 'Duelo Xiaolin', 
    'Ed, Edd y Eddy', 'El Campamento de Lazlo', 'El Espectacular Hombre Araña', 'El Fantasma del Espacio', 
    'El Increíble Mundo de Gumball', 'El Laboratorio de Dexter', 'El Largo y Tortuoso Camino a Casa', 
    'El Mundo de Craig', 'El Proyecto Zeta', 'El show de los Looney Tunes', 'El show de Tom y Jerry', 
    'El Tren Infinito', 'Eliot Kid', 'Escandalositos', 'Escandalosos', 'Fenomenoide', 
    'Fish Police', 'Foster (2004)', 'G.I. Joe Sigma 6', 'Generador Rex', 'George de la Selva', 
    'Gormiti', 'Grojband', 'Hamtaro', 'Hi Hi Puffy AmiYumi', 'Hombres de Negro: La Serie', 
    'Hong Kong Phoey', 'Hora de Aventura', 'Hot Wheels: Battle Force 5', 'Huckleberry Hound', 
    'Inazuma Eleven', 'Inspector Gadget', 'Inuyasha', 'Isla del Drama', 'Jabberjaw', 
    'Johnny Bravo', 'Johnny Test', 'Jonny Quest', 'Juniper Lee', 'Justice League', 
    'Kaijudo', 'KND: Los Chicos del Barrio', 'Krypto el superperro', 'La CQ', 
    'La Mansión Foster para Amigos Imaginarios', 'La Nueva Escuela del Emperador', 'La Pantera Rosa', 
    'La Vaca y el Pollito', 'La vida moderna de Rocko', 'Las Aventuras de Batman y Robin', 
    'Las Chicas Superpoderosas (Original)', 'Las Chicas Superpoderosas (Reboot)', 
    'Las Sombrías Aventuras de Billy y Mandy', 'Lego Friends', 'Lego Nexo Knights', 'Lego Star Wars', 
    'Liga de la Justicia Ilimitada', 'Looney Tunes Cartoons', 'Loopeados', 'Los 13 Fantasmas de Scooby-Doo', 
    'Los Autos Locos (Serie Original)', 'Los Autos Locos (2017)', 'Los Castores Cascarrabias', 
    'Los Herculoides', 'Los Jóvenes Titanes (Original)', 'Los Jóvenes Titanes en Acción', 
    'Los Picapiedra', 'Los Sábados Secretos', 'Los Supersónicos', 'Magiespadas', 'Magilla Gorilla', 
    'Mao Mao: Héroes de Puro Corazón', 'Manzana y Cebollín', 'Más Allá del Jardín', 'Max Steel', 
    'Megas XLR', 'Mi Compañero de Clase es un Mono', 'Mixels', 'Mucha Lucha', 'Naruto', 
    'Naruto Shippuden', 'Ninjago', 'Niño Ardilla', 'OK K.O.! Seamos Héroes', 'One Piece', 
    'Ositos Cariñositos', 'Otra', 'Pac-Man', 'Películas de Cartoon Network', 'Penelope Pitstop', 
    'Pinky y Cerebro', 'Pokémon', 'Power Rangers (CN)', 'Primal', 'Ranma 1/2', 'Regular Show', 
    'Ren y Stimpy', 'Rick and Morty', 'Robotboy', 'Rugrats', 'Sabrina la brujita', 'Samurai Jack', 
    'Scooby-Doo', 'Sealab 2020', 'Smiling Friends', 'Sonic Boom', 'Soy la Comadreja', 'Space Ghost', 
    'Speed Buggy', 'Star Wars: La Guerra de los Clones', 'Steven Universe', 'Steven Universe Future', 
    'Storm Hawks', 'Supernoobs', 'Superman la Serie Animada', 'SWAT Kats', 'Sym-Bionic Titan', 
    'Teen Titans', 'The Batman', 'ThunderCats', 'Tío Grandpa', 'Tiny Toons', 'Titán Simbiónico', 
    'Tom y Jerry', 'Transformers', 'Un Show Más', 'Unikitty!', 'Vaca y Pollito', 'Victor y Valentino', 
    'Villanos', 'Xiaolin Showdown', 'Yogi Bear', 'Young Justice', 'Zatch Bell'
].sort();

const seriesFiltradas = computed(() => {
  if (!busquedaSerie.value) return categorias;
  return categorias.filter(s => s.toLowerCase().includes(busquedaSerie.value.toLowerCase()));
});

const seleccionarSerie = (serie) => {
  busquedaSerie.value = serie;
  nuevaPublicacion.value.categoria = serie;
  mostrarOpciones.value = false;
};

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    mostrarOpciones.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));

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

.lista_opciones {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 4px solid black;
  box-shadow: 6px 6px 0px black;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 5px 0 0 0;
  z-index: 1000;
}
.lista_opciones li {
  padding: 10px;
  border-bottom: 2px solid black;
  cursor: pointer;
  font-family: 'League Spartan', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
}
.lista_opciones li:hover {
  background: #FFFFFF;
}
</style>