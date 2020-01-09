import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import router from './router' //追加


Vue.use(VueGoodTablePlugin);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')