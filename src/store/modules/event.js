import EventService from "@/services/EventService.js";

/* Getters, Mutations, and Actions now will be namespaced under 'event'
  So in our EventList.vue:
    this.$store.dispatch('fetchEvents', { ... })
  becomes:
    this.$store.dispatch('event/fetchEvents', { ... }).
*/
export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
};

export const getters = {
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
};

/*We can use Mutations to update, or mutate, our State
  Vuex Mutations are synchronous.
  It’s important to understand that the Mutations within an Action may or may not be committed,
  depending on how the surrounding logic and circumstances pan out.
*/
export const mutations = {
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
};

/*We can use Actions to wrap some business logic around a Mutation, or Mutations.
  Actions can be asynchronous.
  Actions are more like expressing an intent or desire for something to happen,
  for some change to be made to the state, depending upon some surrounding circumstances.
*/
export const actions = {
  createEvent({ commit, dispatch }, event) {
    //I push the event in my db and..
    return EventService.postEvent(event)
      .then(() => {
        //...if the request goes into safe state i can update value in my application
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!"
        };
        /* root: true tells dispatch to look for a notification/add action at the root of our store, 
         instead of just looking for it inside the module we’re currently in. */
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        /* Instead to use console log we can use notification module just created.
         console.log("Error:", error.response); 
         We can dispatch an add notification ACTION. */
        const notification = {
          type: "error",
          message:
            "There was an error during creating your event " + error.message
        };
        /* root: true tells dispatch to look for a notification/add action at the root of our store, 
         instead of just looking for it inside the module we’re currently in. */
        dispatch("notification/add", notification, { root: true });
        //need to throw the error so that we can propagate it up to our component
        throw error;
      });
  },
  fetchEvents({ commit, dispatch }) {
    EventService.getEvents()
      .then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTSTOTAL", response.headers["x-total-count"]);
      })
      .catch(error => {
        /* Instead to use console log we can use notification module just created.
        console.log("Error:", error.response); 
        We can dispatch an add notification ACTION.
        */
        const notification = {
          type: "error",
          message:
            "There was an error during fetching events list " + error.message
        };
        /* root: true tells dispatch to look for a notification/add action at the root of our store, 
           instead of just looking for it inside the module we’re currently in. */
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEventsPages({ commit, dispatch, state }, { page }) {
    // Added return in order to return promise so we can only render our EventList component when the API call is finished.
    return EventService.getEventsPages(state.perPage, page)
      .then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENTSTOTAL", response.headers["x-total-count"]);
      })
      .catch(error => {
        /* Instead to use console log we can use notification module just created.
        console.log("Error:", error.response); 
        We can dispatch an add notification ACTION.
        */
        const notification = {
          type: "error",
          message:
            "There was an error during fetching events list " + error.message
        };
        /* root: true tells dispatch to look for a notification/add action at the root of our store, 
         instead of just looking for it inside the module we’re currently in. */
        dispatch("notification/add", notification, { root: true });
      });
  },
  /*In order to be more performant in the API calls i can inject getters and use
    the getEventById and check if in the eventList I already have the event that i need.
  */
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
      return event; //return for router beforeEnter function
    } else {
      // the return is for router and beforeEnter() function
      return EventService.getEvent(id).then(response => {
        commit("SET_EVENT", response.data);
        return response.data; //return for router beforeEnter function
      });
      /*.catch(error => {
          /* Instead to use console log we can use notification module just created.
             console.log("Error:", error.response); 
             We can dispatch an add notification ACTION. 
          const notification = {
            type: "error",
            message: "There was an error during fetching event " + error.message
          };
          /* root: true tells dispatch to look for a notification/add action at the root of our store, 
             instead of just looking for it inside the module we’re currently in. 
          dispatch("notification/add", notification, { root: true });
        }); */
    }
  }
};
