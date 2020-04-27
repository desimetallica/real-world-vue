<template>
  <div>
    <h1>Event Create, {{ user.name }}</h1>
    <ul>
      <p>This event was created by {{ user.name }}</p>
      <p>There are {{ getLength }} categories</p>
      <li v-for="category in categories" :key="category.id">
        {{ category }}
      </li>
      <p>{{ getEvent }}</p>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    getEvent() {
      return this.$store.getters.getEventById(2);
    },
    getLength() {
      return this.$store.getters.getCatLength;
    },
    ...mapState(["user", "categories"])
  }
};
</script>

<style></style>
