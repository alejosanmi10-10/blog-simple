import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/inicio/InicialPage.vue';
import Registro from '../views/inicio/RegistroPage.vue';
import Inicio from '../views/inicio/LoginPage.vue';

import MainLayout from '../layouts/DashboardLayout.vue';
import Principal from '../views/dashboard/PrincipalPage.vue';
import Perfil from '../views/dashboard/PerfilPage.vue'
import Crear from '../views/dashboard/CrearPage.vue'
import Banner from '../views/dashboard/BannerPage.vue'
import Prueba from '../views/dashboard/PruebaPage.vue'
import NotFound from '../views/NotFoundPage.vue'


const routes = [
  { path: '/', component: Login },
  { path: '/registro', component: Registro} ,
  { path: '/inicio', component: Inicio} ,

  { path: '/dashboard', component: MainLayout ,
    children:[
      { path: 'principal', component:Principal},
      { path: 'perfil', component:Perfil },
      { path: 'crear', component:Crear },  
      { path: 'banner', component:Banner },  
      { path: 'prueba', component:Prueba },  
    ]},
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/registro', '/inicio'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('userData');

  if (authRequired && !loggedIn) {
    return next('/inicio');
  }

  next();
});

export default router;