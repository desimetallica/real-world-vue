<template>
  <div>
    <h1>Event List</h1>
    <router-link :to="{ name: 'EventShow', params: { id: '1' } }">
      Show Event
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
