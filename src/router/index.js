import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import User from "../views/User.vue";
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: "/",
    name: "EventList",
    component: EventList
  },
  {
    path: "/event/:id",
    name: "EventShow",
    component: EventShow,
    props: true
  },
  {
    path: "/event/create",
    name: "EventCreate",
    component: EventCreate
  },
  {
    path: "/user/:username",
    name: "User",
    component: User,
    props: true // send parameters inside our component <router-link>
  },
  {
    path: "/about-us",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    // we want to make rediraction from /about to /about-us with:
    path: "/about",
    redirect: { name: "about-us" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
