import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyBaseComponent from "../packages";

Vue.config.productionTip = false;

Vue.use(MyBaseComponent);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
