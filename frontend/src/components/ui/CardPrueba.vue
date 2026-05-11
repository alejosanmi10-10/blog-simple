<template>
  <div class="contenedor_prueba">
    <h2>{{ titulo }}</h2>
    <p>{{ descripcion }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardPrueba',
  props: {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true }
  }
}
</script>

<style scoped>
.contenedor_prueba {
  background-color: white;
  border: 4px solid black;
  box-shadow: 8px 8px 0px black;
  padding: 1.5rem 2rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.contenedor_prueba:hover {
  transform: scale(1.02) rotate(-1deg);
}

.contenedor_prueba:nth-child(even) {
  background-color: #DC143C; /* Magenta */
  color: black;
}
.contenedor_prueba:nth-child(odd) {
  background-color: #FFFFFF; /* Cyan */
  color: black;
}
.contenedor_prueba:nth-child(3n) {
  background-color: #FFFFFF; /* Yellow */
  color: black;
}

.contenedor_prueba h2 {
  font-family: 'League Spartan', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.contenedor_prueba p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>