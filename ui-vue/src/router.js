import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Drawing from './views/Drawing.vue';
import SignUp from './views/SignUp.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/drawing',
      name: 'drawing',
      component: Drawing
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
});
