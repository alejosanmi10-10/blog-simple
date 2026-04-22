<template>
  <div class="contain-banner">
    <div class="caja-cn">
      <h1>¡BIENVENIDOS AL C.N.!</h1>
      <p>Entra a hablar de tus episodios y personajes de caricaturas favoritos.</p>
      <router-link to="/dashboard/principal" class="boton-empezar">¡ENTRAR AL BLOG!</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contain-banner {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.caja-cn {
    background: #DC143C; /* Magenta */
    padding: 3rem;
    color: black;
    text-align: center;
    border: 6px solid black;
    box-shadow: 15px 15px 0px black;
    transform: rotate(-2deg);
    transition: transform 0.2s ease;
}

.caja-cn:hover {
    transform: rotate(0deg);
}

.caja-cn h1 {
    font-size: 4rem;
    color: #FFFFFF;
    -webkit-text-stroke: 2px black;
    text-shadow: 4px 4px 0px black;
    margin-bottom: 1rem;
    font-family: "League Spartan", sans-serif;
    text-transform: uppercase;
}

.caja-cn p {
    font-size: 1.8rem;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 2rem;
}

.boton-empezar {
    display: inline-block;
    padding: 1rem 3rem;
    background-color: #FFFFFF;
    color: black;
    font-size: 1.8rem;
    font-weight: 900;
    text-decoration: none;
    border: 4px solid black;
    box-shadow: 8px 8px 0px black;
    text-transform: uppercase;
    font-family: 'League Spartan', sans-serif;
    transition: transform 0.2s, box-shadow 0.2s;
}

.boton-empezar:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px black;
    background-color: #FFFFFF;
}

@media (max-width: 768px) {
    .caja-cn {
        padding: 1.5rem;
        width: 90%;
        box-shadow: 8px 8px 0px black;
        transform: rotate(0deg);
    }
    .caja-cn h1 {
        font-size: 2.2rem;
    }
    .caja-cn p {
        font-size: 1.2rem;
    }
    .boton-empezar {
        font-size: 1.2rem;
        padding: 0.8rem 1.5rem;
        width: 100%;
    }
}
</style>