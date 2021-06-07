import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import {ClientTable, Event} from 'vue-tables-2';
import axios from 'axios'
import VueAxios from 'vue-axios'
import vSelect from "vue-select";

import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);
Vue.config.productionTip = false
Vue.use(ClientTable, {}, false, 'bootstrap3')
Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
