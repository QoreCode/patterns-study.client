import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePageComponent from '@/application/views/home-page/home-page.component.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePageComponent
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
