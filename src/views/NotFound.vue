<template>
  <div>
    <h1>Ops!</h1>
    <h3>
      The <template v-if="resource"> {{ resource }} </template> you're looking
      for does not exist
    </h3>
    <router-link :to="{ name: 'EventList' }"> Back to home page </router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>

<style></style>
