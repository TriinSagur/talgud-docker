import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueAxios,axios)
Vue.config.productionTip = false



Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    libraries: "places"
  }
});

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
