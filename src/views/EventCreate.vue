<template>
  <div>
    <h1>Event Create</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import datepicker from "vuejs-datepicker";

export default {
  components: {
    datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      event: this.createFreshEventObject(),
      categories: this.$store.state.categories
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          // we will only reset our event data if the POST request was a success.
          this.event = this.createFreshEventObject();
          this.$router.push({
            name: "EventShow",
            params: { id: this.event.id }
          });
        })
        .catch(() => {
          console.log("Problem with creation of event");
        });
    },
    createFreshEventObject() {
      const user = this.$store.state.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        user: user,
        id: id,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  },
  /*With namespaced modules we don’t access any of our
  getters from our current code to event module.
  In order to use again this getters we have to import
  mapGetters and use different notation. More info on:
  https://forum.vuejs.org/t/pass-parameters-to-getters-with-namespace-set-to-true/27616/7
  From this:
  getEvent() {
    return this.$store.getters.getEventById(2);
  },
  getLength() {
    return this.$store.getters.getCatLength;
  }
  To this:
  const anEvent = this.getEventById(this.id);
  */
  computed: mapGetters("event", ["getEventById", "getCatLength"])
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
