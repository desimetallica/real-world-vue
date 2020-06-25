<template>
  <div>
    <h1>Event Create</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        v-model="event.category"
        type="text"
        :options="categories"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      >
        <!-- @blur="$v.event.category.touch()" triggers dirty status -->
        <!-- :class="{ error: $v.event.category.$error}" add class when $error is true -->
      </BaseSelect>
      <!-- displays when error is true -->
      <div v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="-text-error">
          Category is required
        </p>
      </div>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        placeholder="Type event name here"
        type="text"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      ></BaseInput>
      <div v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="-text-error">
          Title is required
        </p>
      </div>
      <BaseInput
        label="Description"
        v-model="event.description"
        placeholder="Type event description here"
        type="text"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      ></BaseInput>
      <div v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="-text-error">
          Description is required
        </p>
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
          @blur="$v.event.location.$touch()"
          :class="{ error: $v.event.location.$error }"
        />
      </div>
      <div v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="-text-error">
          Location is required
        </p>
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @closed="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <div v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="-text-error">
          Date is required
        </p>
      </div>
      <BaseSelect
        label="Select a time"
        v-model="event.time"
        class="field"
        :options="times"
        @blur="$v.event.time.$touch()"
        :class="{ error: $v.event.time.$error }"
      >
      </BaseSelect>
      <div v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="-text-error">
          Time is required
        </p>
      </div>
      <BaseButton
        type="submit"
        buttonClass="button -fill-gradient"
        :disabled="$v.$anyError || $v.$invalid"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="-text-error">
        Please check fill out all the fields
      </p>
      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            // we will only reset our event data if the POST request was a success.
            this.$router.push({
              name: "EventShow",
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
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
