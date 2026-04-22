<template>
  <div class="prueba-container">
    <h1 class="prueba-title">
      Curiosidades C.N.
    </h1>
    <div class="cards-wrapper">
      <CardPrueba v-for="info in data" :key="info.id" :titulo="info.titulo" :descripcion="info.texto" />
    </div>
  </div>
</template>

<script>
import CardPrueba from '../../components/CardPrueba.vue';

export default {
  components: {
    CardPrueba
  },
  setup() {
    const data = [
      {
        "id": 1,
        "titulo": "El laboratorio de Dexter",
        "texto": "Se cree que el laboratorio de Dexter es infinitamente profundo. ¡Ha construido hasta enormes robots gigantes ahí abajo y sus padres nunca se enteran!"
      },
      {
        "id": 2,
        "titulo": "Las Chicas Superpoderosas",
        "texto": "Azúcar, flores y muchos colores. ¡Pero fue el 'ingrediente X' agregado por accidente lo que creó a las heroínas perfectas!"
      },
      {
        "id": 3,
        "titulo": "Coraje el Perro Cobarde",
        "texto": "Coraje vive en 'Ningún Lugar'. Curiosamente, este diseño solitario y silencioso está basado en historias de desolación del medio oeste de EE.UU."
      },
      {
        "id": 4,
        "titulo": "Un Show Más",
        "texto": "Mordecai y Rigby empiezan solucionando problemas de trabajo muy normales y aburridos, ¡y curiosamente siempre terminan luchando contra entes destructores espaciales!"
      },
      {
        "id": 5,
        "titulo": "Hora de Aventura",
        "texto": "A lo largo de toda la serie, se presagiaba constantemente de manera muy sutil en diferentes vidas pasadas que Finn perdería su brazo derecho."
      },
      {
        "id": 6,
        "titulo": "Ed, Edd y Eddy",
        "texto": "La serie está inspirada en los amigos de la infancia del creador Danny Antonucci. Todos los personajes tienen lenguas de colores extraños porque comen muchos dulces."
      },
      {
        "id": 7,
        "titulo": "Los Jóvenes Titanes",
        "texto": "La serie original nunca especifica en qué ciudad viven exactamente los Titanes (sólo se le conoce como Jump City) ni en qué época ocurre."
      },
      {
        "id": 8,
        "titulo": "Ben 10",
        "texto": "Originalmente, el creador pensaba darle a Ben un poder de cambiar entre 10 chicos normales con diferentes habilidades, pero luego lo cambió por alienígenas emocionantes."
      },
      {
        "id": 9,
        "titulo": "Samurai Jack",
        "texto": "En la era original de Cartoon Network, Samurai Jack fue aclamado como una de las series más visualmente asombrosas por prescindir de los contornos negros en los personajes."
      },
      {
        "id": 10,
        "titulo": "Johnny Bravo",
        "texto": "Johnny Bravo comenzó como un proyecto universitario creado por Van Partible. Sus extravagantes e hilarantes poses fueron inspiradas en Michael Jackson y Elvis Presley."
      }
    ]
    return { data };
  }
}
</script>

<style scoped>
.prueba-container {
  padding-top: 5rem;
  padding-bottom: 2rem;
  text-align: center;
  min-height: 100vh;
}

.prueba-title {
  font-size: 4rem;
  color: #FFFFFF;
  -webkit-text-stroke: 2px black;
  text-shadow: 4px 4px 0px black;
  text-transform: uppercase;
  font-family: 'League Spartan', sans-serif;
  margin-bottom: 2rem;
}

.cards-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  .prueba-title {
    font-size: 2.2rem;
    margin-top: 3rem;
  }
  .prueba-container {
    padding-top: 2rem;
  }
}
</style>