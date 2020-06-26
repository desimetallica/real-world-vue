<template>
  <div>
    <label v-if="label"> {{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- We added $listeners element so it can inherit the blur event listener. -->
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin";
export default {
  mixins: [formFieldMixin],
  /* Instead use this options here we can move it inside formFieldMixin.js 
  that is a like library for vue.js */
  /* inheritAttrs: false, */
  props: {
    /* label: {
      default: "",
      type: String
    },
    value: [String, Number], */
    options: {
      type: Array,
      required: true
    }
  }
  /* Also this updateValue can be moved into the mixing lib */
  /*
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  } */
};
</script>

<style></style>
