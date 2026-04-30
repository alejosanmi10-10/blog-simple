<template>
  <div class="layout-container">
    <Header nombre="Juanito" />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'MainLayout',
  components: {
    Header
  }
};
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  /* El Header debe tener position sticky o fixed para que esto funcione idealmente. 
     Por ahora, permitimos que main ocupe el resto del espacio. */
}
</style>
