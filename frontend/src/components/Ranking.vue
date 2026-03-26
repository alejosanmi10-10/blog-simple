<template>
  <div class="contenedor_ranking">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" style="color: black;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.5 18c0-1.414 0-2.121.44-2.56C4.378 15 5.085 15 6.5 15H7c.943 0 1.414 0 1.707.293S9 16.057 9 17v5H3.5zM15 19c0-.943 0-1.414.293-1.707S16.057 17 17 17h.5c1.414 0 2.121 0 2.56.44c.44.439.44 1.146.44 2.56v2H15zM2 22h20M9 16c0-1.414 0-2.121.44-2.56C9.878 13 10.585 13 12 13s2.121 0 2.56.44c.44.439.44 1.146.44 2.56v6H9zm3.691-13.422l.704 1.42a.87.87 0 0 0 .568.423l1.276.213c.816.137 1.008.734.42 1.323l-.992 1a.88.88 0 0 0-.208.73l.284 1.238c.224.98-.292 1.359-1.152.847l-1.196-.714a.86.86 0 0 0-.792 0l-1.196.714c-.856.512-1.376.129-1.152-.847l.284-1.238a.88.88 0 0 0-.208-.73l-.991-1c-.584-.589-.396-1.186.42-1.323l1.275-.213a.87.87 0 0 0 .564-.424l.704-1.42c.384-.77 1.008-.77 1.388 0" color="currentColor"/></svg>
    <div class="info_personas">
      <p style="font-weight: bold; " class="titulo_ranking">{{ nombre }}</p>

      <div style="display: flex; gap: 0.1rem; ">
        <p>Comentarios:</p>
        <p>{{ cantidad }}</p>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: 'Personas',
  props: {
    nombre: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }
  
 

  

};
</script>
<style scoped>
.contenedor_ranking {
  display: flex;
  padding: 0.8rem 1.2rem;
  background-color: #ff00ff; /* Magenta */
  border: 4px solid black;
  box-shadow: 6px 6px 0px black;
  color: black;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  transition: all 0.2s;
}

.contenedor_ranking:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0px black;
}

.info_personas {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.titulo_ranking {
  font-family: 'League Spartan', sans-serif;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
}

.info_personas p {
  font-weight: 900;
  font-size: 0.9rem;
  margin: 0;
}

.figura {
  margin: 0;
  color: black;
}
</style>