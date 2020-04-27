import Vue from "vue";
import Vuex from "vuex";

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
    events: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false }
    ],
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false }
    ]
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
  mutations: {},
  actions: {},
  modules: {}
});
