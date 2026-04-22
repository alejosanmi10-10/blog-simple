import re

with open('frontend/src/pages/principal/CrearPage.vue', 'r') as f:
    content = f.read()

# Replace Serie Select
content = re.sub(
    r'<div class="input_group">\s*<label class="label_Crear">Serie:.*?(?=<div class="input_group)',
    '''<div class="input_group" style="position: relative;">
        <label class="label_Crear">🔥 ELIGE TU SERIE FAVORITA:</label>
        <input type="text" class="input_crear" v-model="busquedaSerie" placeholder="Empieza a escribir..." @focus="mostrarOpciones = true" @input="mostrarOpciones = true" required />
        <ul v-if="mostrarOpciones && seriesFiltradas.length > 0" class="lista_opciones">
          <li v-for="serie in seriesFiltradas" :key="serie" @click="seleccionarSerie(serie)">{{ serie }}</li>
        </ul>
      </div>

      ''',
    content,
    flags=re.DOTALL
)

# Replace Title and Text labels
content = content.replace('<label class="label_Crear">Titulo:</label>', '<label class="label_Crear">⚡ DALE UN TÍTULO ÉPICO:</label>')
content = content.replace('<label class="label_Crear">Texto:</label>', '<label class="label_Crear">💬 CUENTA TU HISTORIA:</label>')

# Remove Imagen URL optional
content = re.sub(r'<div class="input_group">\s*<label class="label_Crear">Enlace de Imagen.*?</div>', '', content, flags=re.DOTALL)

# Add logic
logic = """
const busquedaSerie = ref('');
const mostrarOpciones = ref(false);
const categorias = ['Hora de Aventura', 'Un Show Más', 'El Increíble Mundo de Gumball', 'Ben 10', 'Ben 10: Fuerza Alienígena', 'Ben 10: Supremacía', 'Las Chicas Superpoderosas', 'Coraje, el Perro Cobarde', 'Steven Universe', 'Escandalosos', 'Los Jóvenes Titanes', 'Los Jóvenes Titanes en Acción', 'KND: Los Chicos del Barrio', 'Ed, Edd y Eddy', 'El Laboratorio de Dexter', 'Johnny Bravo', 'Samurai Jack', 'Mansión Foster para Amigos Imaginarios', 'Las Sombrías Aventuras de Billy y Mandy', 'Chowder', 'Las Maravillosas Desventuras de Flapjack', 'El Campamento de Lazlo', 'Clarence', 'Más Allá del Jardín', 'El Tren Infinito', 'OK K.O.! Seamos Héroes', 'Tío Grandpa', 'Generador Rex', 'Titán Simbiónico', 'La Vaca y el Pollito', 'Soy la Comadreja', 'Mucha Lucha', 'Isla del Drama'].sort();

const seriesFiltradas = computed(() => {
  if (!busquedaSerie.value) return categorias;
  return categorias.filter(s => s.toLowerCase().includes(busquedaSerie.value.toLowerCase()));
});
const seleccionarSerie = (serie) => {
  busquedaSerie.value = serie;
  nuevaPublicacion.value.categoria = serie;
  mostrarOpciones.value = false;
};

// Cierra al dar click afuera
import { onMounted, onUnmounted } from 'vue';
const closeDropdown = (e) => {
  if (!e.target.closest('.input_group')) {
    mostrarOpciones.value = false;
  }
};
onMounted(() => document.addEventListener('click', closeDropdown));
onUnmounted(() => document.removeEventListener('click', closeDropdown));
"""

content = content.replace("const nuevaPublicacion = ref({", logic + "\nconst nuevaPublicacion = ref({")

# Delete seriePersonalizada
content = re.sub(r"const seriePersonalizada.*?\n", "", content)
content = re.sub(r"const categoriaFinal.*?nuevaPublicacion.value.categoria;", "const categoriaFinal = nuevaPublicacion.value.categoria;", content, flags=re.DOTALL)

# Add CSS for autocomplete
css = """
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
  background: #ffff00;
}
"""

content = content.replace("</style>", css + "\n</style>")

with open('frontend/src/pages/principal/CrearPage.vue', 'w') as f:
    f.write(content)

