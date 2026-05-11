<template>
  <div>
    <div class="input_group" style="position: relative;" ref="dropdownRef">
      <label class="label_Crear">SELECCIONA LA SERIE:</label>
      <input type="text" class="input_crear" v-model="busquedaSerie" placeholder="Empieza a escribir..." @focus="mostrarOpciones = true" @input="mostrarOpciones = true" required />
      <ul v-if="mostrarOpciones && seriesFiltradas.length > 0" class="lista_opciones">
        <li v-for="serie in seriesFiltradas" :key="serie" @click="seleccionarSerie(serie)">{{ serie }}</li>
      </ul>
    </div>

    <div class="input_group scale-up-center" v-if="categoriaSeleccionada === 'Otra'" style="margin-top: 1rem;">
      <label class="label_Crear">¿QUÉ SERIE ES?</label>
      <input type="text" class="input_crear" v-model="seriePersonalizadaLocal" @input="actualizarOtra" placeholder="Escribe el nombre de la serie" required />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const emit = defineEmits(['update:modelValue', 'update:categoriaPersonalizada']);
const props = defineProps({
  modelValue: String,
  categoriaPersonalizada: String
});

const busquedaSerie = ref(props.modelValue || '');
const mostrarOpciones = ref(false);
const dropdownRef = ref(null);
const categoriaSeleccionada = ref(props.modelValue || '');
const seriePersonalizadaLocal = ref(props.categoriaPersonalizada || '');

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

watch(busquedaSerie, (newVal) => {
  if (newVal !== categoriaSeleccionada.value) {
    categoriaSeleccionada.value = newVal;
    emit('update:modelValue', newVal);
  }
});

const seleccionarSerie = (serie) => {
  busquedaSerie.value = serie;
  categoriaSeleccionada.value = serie;
  mostrarOpciones.value = false;
  emit('update:modelValue', serie);
};

const actualizarOtra = () => {
  emit('update:categoriaPersonalizada', seriePersonalizadaLocal.value);
};

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    mostrarOpciones.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));
</script>

<style scoped>
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

.input_crear {
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

.input_crear:focus {
  outline: none;
  background-color: #fffac1;
  box-shadow: 6px 6px 0px black;
  transform: translate(-2px, -2px);
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

@keyframes scale-up-center {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.scale-up-center {
  animation: scale-up-center 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
</style>
