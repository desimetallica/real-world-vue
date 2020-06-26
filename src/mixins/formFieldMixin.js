/*Mixins are a useful way to encapsulate a small piece of functionality 
that can be reused across multiple components. Mixin are libs that you import
in your components. They can be global:
Vue.mixin({
      mounted() {
        console.log('I am mixed into every component.')
      }
    })
Or they can be locally imported into components. 
In our BaseSelect and BaseInput components we have some repeated code that 
we can includ with this mixin library mixin code is run prior to the 
component’s own code and how that helps automatically resolve conflicts that 
may emerge with things such as duplicated method names*/

export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      default: "",
      type: String
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
