<template>
  <div class="contain_comentario">
    <img :src="'/avatars/' + (icono || 'finn') + '.png'" alt="Avatar" class="icono_comentario" style="border-radius: 50%; width: 3em; height: 3em; object-fit: cover; object-position: top center; border: 2px solid black; background: white;">
      <div class="info_comentario" style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
        <div style="display: flex; align-items: baseline;">
          <p style="font-weight: bold; margin: 0; font-family: 'League Spartan', sans-serif; font-size: 1.2rem;">{{ usuario }}</p>
          <p style="margin-left: 10px; margin-bottom: 0; font-size: 0.8rem; opacity: 0.7;">{{ fecha }}</p>
        </div>
        <p v-if="programa" style="margin: 0; font-size: 0.75rem; font-weight: bold; color: #ff00ff; text-transform: uppercase;">▶ {{ programa }}</p>
        <p style="margin: 0.5rem 0 0 0; font-family: Arial, sans-serif;">{{ comentario }}</p>
      </div>
    <svg v-if="usuario == this.nombre" xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24"
      class="icono_eliminar" @click="capturar(id)">
      <path fill="currentColor"
        d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
    </svg>
  </div>
</template>
<script>
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
    const data = JSON.parse(localStorage.getItem("userData"))



    const nombre = data.userName
    return {
      nombre
    }
  }
};

</script>
<style>
@keyframes slide-fwd-center {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.01);
  }
}

.contain_comentario {
  width: 80%;
  background-color: white;
  border-radius: 4rem;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1px 2rem;

}

.contain_comentario:hover {
  animation: slide-fwd-center 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  background-color: rgb(224, 220, 220);
}

.icono_comentario {
  color: orange;
  margin-top: 10px;
}

.info_comentario {
  display: flex;
  flex-direction: column;
  color: black;
  line-height: 0;
  padding: 0;
  margin: 0;
}

.icono_eliminar {
  color: #000;
  text-align: end;
  padding-left: 3rem;
  padding-top: 0.5rem;
  width: 30px;
  transition: color 1s ease;
}

.icono_eliminar:hover {
  color: red;
}
</style>