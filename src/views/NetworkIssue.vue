<template>
  <div>
    <h1>Ops!</h1>
    <h3>
      It looks you're experiencing some network issues, please click the back
      button and try again.
    </h3>

    <router-link :to="{ name: 'EventList' }"
      >Or go back to the event list</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style></style>
