import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: [],
    eventsTotal: 0,
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false }
    ],
    event: {}
  },
  getters: {
    // arrow function simplify pass state => return length
    getCatLength: state => {
      return state.categories.length;
    },
    //arrow function with more params I pass state and id
    getEventById: state => id => {
      // find return the event that has event id equal to id
      return state.events.find(event => event.id === id);
    },
    getDoneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    getActiveTodos(state, getters) {
      return getters.getTodosCount - getters.getDoneTodos;
      // or return state.todos.filter(todo => !todo.done).length;
    },
    getTodosCount: state => {
      return state.todos.length;
    }
  },
  /*We can use Mutations to update, or mutate, our State
    Vuex Mutations are synchronous.
    It’s important to understand that the Mutations within an Action may or may not be committed,
    depending on how the surrounding logic and circumstances pan out.
 */
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTSTOTAL(state, total) {
      state.eventsTotal = total;
    },
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  /*We can use Actions to wrap some business logic around a Mutation, or Mutations.
    Actions can be asynchronous.
    Actions are more like expressing an intent or desire for something to happen,
    for some change to be made to the state, depending upon some surrounding circumstances.
  */
  actions: {
    createEvent({ commit }, event) {
      //I push the event in my db and..
      return EventService.postEvent(event).then(() => {
        //...if the request goes into safe state i can update value in my application
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          commit("SET_EVENTS", response.data);
          commit("SET_EVENTSTOTAL", response.headers["x-total-count"]);
        })
        .catch(error => {
          console.log("Error:", error.response);
        });
    },
    fetchEventsPages({ commit }, { perPage, page }) {
      EventService.getEventsPages(perPage, page)
        .then(response => {
          commit("SET_EVENTS", response.data);
          commit("SET_EVENTSTOTAL", response.headers["x-total-count"]);
        })
        .catch(error => {
          console.log("Error:", error.response);
        });
    },
    /*In order to be more performant in the API calls i can inject getters and use
      the getEventById and check if in the eventList I already have the event that i need.
    */
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventById(id);
      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log("Error during fetchEvent call", error.response);
          });
      }
    }
  },
  modules: {}
});
