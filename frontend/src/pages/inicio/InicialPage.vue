<script setup>

</script>

<template>
  <header>
    <img src="../../../public/logo_cn.svg" style="width: 100px; margin-right: 1rem;">
      <a href="https://www.youtube.com/results?search_query=Cartoon+Network+Latinoamerica" target="_blank" class="link">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" class="iconos" height="2em" viewBox="0 0 20 20">
          <path fill="currentColor"
            d="M11.603 9.833L9.357 8.785C9.161 8.694 9 8.796 9 9.013v1.974c0 .217.161.319.357.228l2.245-1.048c.197-.092.197-.242.001-.334M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m0 13.5c-4.914 0-5-.443-5-3.9s.086-3.9 5-3.9s5 .443 5 3.9s-.086 3.9-5 3.9" />
        </svg>
      </a>
      <a href="https://www.instagram.com/alejosanmi10" target="_blank" class="link">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" class="iconos" height="2em" viewBox="0 0 20 20">
          <path fill="currentColor"
            d="M13 10a3 3 0 1 1-6 0q.001-.257.049-.5H6v3.997c0 .278.225.503.503.503h6.995a.503.503 0 0 0 .502-.503V9.5h-1.049q.048.243.049.5m-3 2a2 2 0 1 0-.001-4.001A2 2 0 0 0 10 12m2.4-4.1h1.199a.3.3 0 0 0 .301-.3V6.401a.3.3 0 0 0-.301-.301H12.4a.3.3 0 0 0-.301.301V7.6c.001.165.136.3.301.3M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 0 0 9.6 9.6a9.6 9.6 0 0 0 9.6-9.6A9.6 9.6 0 0 0 10 .4m5 13.489C15 14.5 14.5 15 13.889 15H6.111C5.5 15 5 14.5 5 13.889V6.111C5 5.5 5.5 5 6.111 5h7.778C14.5 5 15 5.5 15 6.111z" />
        </svg>
      </a>

  </header>
  <div class="contenedor">
    <div class="informacion">
      <div class="headline-container">
        <p class="welcome-text">¡BIENVENIDOS AL C.N.!</p>
        <h1 class="main-title">Tus shows favoritos <br> <span class="highlight">te esperan.</span></h1>
        <p class="cta-banner">Únete a nuestra aventura web. ¡Comienza ahora!</p>
      </div>

      <div class="button-group">
        <router-link class="boton registro" to="/registro">Registrate</router-link>
        <router-link class="boton login" to="/inicio">Iniciar Sesion</router-link>
      </div>
    </div>

  </div>

</template>

<style scoped>
@keyframes slide-fwd-center {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

header {

  padding: 1rem 3rem;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center
}

.contenedor {
  margin: 0 auto;
  padding: 0;
  display: flex;
  min-height: 100vh;
  overflow-y: auto;
  background-color: transparent !important;
  background-image: none !important;
}

.contenedor_iconos {
  width: 90vw;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.iconos {
  color: white;
}

.link {
  color: white;
  text-decoration: none;
}

.iconos:hover {
  color: rgb(210, 202, 202);
}

.informacion {
  margin-top: 8rem;
  padding: 1rem 3rem;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5rem;
}

.headline-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transform: rotate(-2deg); /* Divertido tilt */
}

.welcome-text {
  font-size: 1.2rem;
  font-weight: 900;
  color: white;
  background-color: black;
  width: fit-content;
  padding: 4px 15px;
  text-transform: uppercase;
  font-family: 'League Spartan', sans-serif;
  box-shadow: 4px 4px 0px #00ffff;
  margin-bottom: 0.5rem;
}

.main-title {
  font-size: 4rem;
  color: #ff00ff;
  font-weight: 900;
  font-family: 'League Spartan', sans-serif;
  line-height: 0.85;
  text-transform: uppercase;
  -webkit-text-stroke: 3px black;
  filter: drop-shadow(6px 6px 0px black);
  margin: 0.5rem 0;
}

.highlight {
  color: #ffff00;
  font-size: 5rem;
  display: inline-block;
  transform: scale(1.05);
}

.cta-banner {
  font-size: 1.1rem;
  color: black;
  font-weight: 900;
  background: white;
  padding: 10px 20px;
  border: 4px solid black;
  width: fit-content;
  box-shadow: 6px 6px 0px black;
  text-transform: uppercase;
  font-family: 'League Spartan', sans-serif;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 1.5rem;
  transform: rotate(1deg);
}

.boton {
  padding: 0.8rem 2rem;
  font-size: 1.4rem;
  font-weight: 900;
  text-transform: uppercase;
  text-decoration: none;
  border: 4px solid black;
  font-family: 'League Spartan', sans-serif;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
}

.registro {
  background-color: #ffff00;
  color: black;
  box-shadow: 6px 6px 0px black;
}

.registro:hover {
  background-color: #ff00ff;
  color: white;
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px black;
}

.login {
  background-color: #00ffff;
  color: black;
  box-shadow: 6px 6px 0px black;
}

.login:hover {
  background-color: black;
  color: #00ffff;
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px black;
}

@media (max-width: 992px) {
  .main-title { font-size: 3rem; }
  .highlight { font-size: 3.5rem; }
  .informacion { margin-top: 6rem; padding: 1rem; }
}

@media (max-width: 768px) {
  .informacion { 
    align-items: center; 
    text-align: center;
    margin-top: 5rem;
  }
  .headline-container { transform: rotate(0deg); align-items: center; }
  .main-title { font-size: 2.5rem; }
  .highlight { font-size: 3rem; }
  .button-group { 
    flex-direction: column; 
    width: 100%; 
    gap: 1rem;
    transform: rotate(0deg);
  }
  .boton { width: 100%; min-width: unset; }
  .cta-banner { font-size: 0.9rem; padding: 8px 15px; }
  .welcome-text { font-size: 1rem; }
}
</style>
