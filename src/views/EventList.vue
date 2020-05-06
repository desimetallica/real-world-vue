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
    </template>
    <template v-if="event.eventsTotal > page * 3">
      |
      <router-link
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
//import EventService from "@/services/EventService.js";

export default {
  components: {
    EventCard
  },
  created() {
    //This dispatch use event/fetchEventsPages because it use namespaced modules
    this.$store.dispatch("event/fetchEventsPages", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
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
    ...mapState(["event", "user"])
  }
};
</script>

<style></style>
