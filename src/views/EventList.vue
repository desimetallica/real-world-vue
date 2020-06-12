<template>
  <div>
    <!--  {{ user.user.name }} the first 'user' is the module name and the second 'user' is the state inside the module    -->
    <h1>Event List for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event">
    </EventCard>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page</router-link
      >
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link
      v-if="hasNextPage"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      rel="next"
    >
      Next Page</router-link
    >
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store";
//import EventService from "@/services/EventService.js";
/* Route Object Properties used:
$route.params type: An object that contains key/value pairs of dynamic segments and star segments. 
f there are no params the value will be an empty object.

$route.query type: An object that contains key/value pairs of the query string. 
For example, for a path /foo?user=1, we get $route.query.user == 1. 
If there is no query the value will be an empty object.*/
function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("event/fetchEventsPages", {
      page: currentPage
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    /*We cutted out this part in order to manage it inside routing events 
      page() { 
      // What page we're currently on (query in which router page I'm in or assuming 1)
      return parseInt(this.$route.query.page) || 1;
    },
    /*since we are using modules we have to change this to...
      ...mapState(["events", "eventsTotal", "user"])
      ..This:
      ...mapState(["event", "user"])
      because event is now our module. In the calls inside our eventList we must use
      event.eventsTotal to access the total event value inside event module
    */
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    ...mapState(["event", "user"])
  }
};
</script>

<style></style>
