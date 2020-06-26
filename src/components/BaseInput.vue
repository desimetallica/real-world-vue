<template>
  <div>
    <label v-if="label"> {{ label }}</label>
    <!-- listens for input event and triggers method -->
    <input
      type="text"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin";
export default {
  mixins: [formFieldMixin],
  /* Instead use this options here we can move it inside formFieldMixin.js 
  that is a like library for vue.js */
  /* inheritAttrs: false, 
  props: {
    /*label: {
      default: "",
      type: String
    },
    value: [String, Number] 
  },*/
  /* Also this updateValue can be moved into the mixing lib */
  /*
  methods: {
    updateValue(event) {
      // this function looking for input event 
      //happens and send up the payload in the parent scope 
      this.$emit("input", event.target.value);
    } */
  /*You may be wondering why we’re using this roundabout way 
    of emitting the value up to the parent, which passes the 
    value back in as a prop. imagine if we used this BaseInput 
    component on the edit view for a user’s profile. 
    We’d want to be able to pass BaseInput the user value it needs, 
    such as the user’s email, and use that as the starting 
    value of the input field. Having a value prop like 
    this allows us to do that.
  } */
  computed: {
    /* This solve the conflict between @input="updateValue" and our
    @blur for the validation. The conflict cause the getting of blur 
    into input value. With this computed property, which we’ll call 
    listeners and put the correct value */
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  }
};
</script>

<style></style>
