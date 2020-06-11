<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      /* This will return ‘-text-success’ or ‘-text-error’ depending upon the type that is on our notification prop object, 
      which will style our notification as black or red, respectively.
      */
      return "-text-".concat(this.notification.type);
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  methods: mapActions("notification", ["remove"])
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
