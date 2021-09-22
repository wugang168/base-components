import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/about2",
    name: "About2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/video/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
