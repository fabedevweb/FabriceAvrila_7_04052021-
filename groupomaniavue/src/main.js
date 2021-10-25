import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "/Users/fabriceavrila/Desktop/projets_OCR/projet7-groupomania/groupomaniavue/src/components/axios.js";
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
