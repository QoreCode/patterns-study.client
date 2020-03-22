import Vue from 'vue';
import App from './application/application.component.vue';
import './registerServiceWorker';
import router from './buisness/router';
import store from './buisness/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
