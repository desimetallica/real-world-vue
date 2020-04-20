<template>
  <div>
    <h1>Hello user: {{ username }}</h1>
    <p>Your age is {{ age }}</p>
  </div>
</template>

<script>
export default {
  props: ["username", "age"]
};
</script>

<style></style>
