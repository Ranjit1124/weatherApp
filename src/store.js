import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    latandlon: "",
    report: "",
  },

  mutations: {
    weathers(state, values) {
      state.latandlon = values;
    },
    report(state, reports) {
      state.report = reports;
    },
  },

  getters: {

    latandlon(state) {
      return state.latandlon;
    },
    report(state) {
      return state.report;
    },
  },

  actions: {

    moreInfo({ commit }, reports) {
      setTimeout(() => {
        if (confirm("Do you want More reports")) {
          commit("report", reports);
        } else {
          commit
        }

      }, 1000);
    },
  },
});
export default store;
