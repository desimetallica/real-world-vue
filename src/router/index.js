import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import NProgress from "nprogress";

//import Home from "../views/Home.vue";
import EventShow from "../views/EventShow.vue";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import User from "../views/User.vue";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";

Vue.use(VueRouter);
/*Info related to Router Guards:
https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
 */

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home
  // },
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "EventShow",
    component: EventShow,
    props: true,
    //Per-Route Guard
    beforeEnter(routeTo, routeFrom, next) {
      /*before this route is loaded, in order for then() to get called when 
      the API is returned we need to make sure this action returns a promise
      */
      store
        .dispatch("event/fetchEvent", routeTo.params.id)
        .then(event => {
          /* we now take the event which is returned 
           and set it to the value of routeTo.params.event 
           Then after next() is called. Since props: true is 
           set for the component, params.event gets sent in as the event prop.
           To make sure the value gets sent in the callback, 
           we’ll need to add two returns to our event Module */
          routeTo.params.event = event;
          next();
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({
              name: "404",
              params: { resource: "event" }
            });
          } else {
            next({ name: "NetworkIssue" });
          }
        });
    }
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
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true
  },
  {
    path: "/networkIssue",
    name: "NetworkIssue",
    component: NetworkIssue
  },
  {
    // None of above will be routed here
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
/*Global Resolve Guards
routeTo This refers to the route that is about to be navigated to.
routeFrom This refers to the route that is about to be navigated away from.
next This is a function that must be called in each of them to resolve the hook, and continue navigation.*/
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
