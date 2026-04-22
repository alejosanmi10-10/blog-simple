<template>
  <div class="not-found">
    <div class="card-404 scale-up-center">
      <h1 class="error-code">404</h1>
      <h2 class="error-message">¡RAYOS! ESTA PÁGINA SE HA ESFUMADO</h2>
      <p class="description">Parece que te has perdido en el vacío de la Zona Negativa o alguien se robó esta página.</p>
      <router-link to="/" class="boton-home">VOLVER AL INICIO</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #DC143C; /* Magenta vibrante */
  font-family: 'League Spartan', sans-serif;
  padding: 2rem;
}

.card-404 {
  background: white;
  border: 10px solid black;
  box-shadow: 25px 25px 0px black;
  padding: 4rem;
  max-width: 600px;
  text-align: center;
  transform: rotate(-2deg);
}

.error-code {
  font-size: 8rem;
  margin: 0;
  line-height: 1;
  -webkit-text-stroke: 4px black;
  color: #FFFFFF; /* Amarillo */
}

.error-message {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 1.5rem 0;
  text-transform: uppercase;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
}

.boton-home {
  display: inline-block;
  background-color: #FFFFFF;
  color: black;
  border: 4px solid black;
  padding: 1rem 2rem;
  font-weight: 900;
  text-decoration: none;
  box-shadow: 8px 8px 0px black;
  transition: all 0.2s;
}

.boton-home:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px black;
  background-color: #FFFFFF;
}

@media (max-width: 768px) {
  .card-404 { padding: 2rem; transform: rotate(0); }
  .error-code { font-size: 5rem; }
  .error-message { font-size: 1.5rem; }
}

.scale-up-center {
	animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@keyframes scale-up-center {
  0% { transform: scale(0.5); }
  100% { transform: scale(1) rotate(-2deg); }
}
</style>
