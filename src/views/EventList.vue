<template>
  <div>
    <h1>Event List</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event">
    </EventCard>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page</router-link
      >
    </template>
    <template v-if="this.eventsTotal > page * 3">
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
    this.$store.dispatch("fetchEventsPages", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    page() {
      // What page we're currently on (query in which router page I'm in or assuming 1)
      return parseInt(this.$route.query.page) || 1;
    },
    ...mapState(["events"]),
    ...mapState(["eventsTotal"])
  }
};
</script>

<style></style>
