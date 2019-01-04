import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import Axios from 'axios';

export default new Vuex.Store({
  state: {
    currentYear: 2019,
    currentMonth: 1,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDate: moment(),
    events: [
      { description: 'Christmas', date: moment('2018-12-25', 'YYYY-MM-DD') },
      { description: 'New Year', date: moment('2019-01-01', 'YYYY-MM-DD') },
      { description: 'City Aniversary', date: moment('2018-12-20', 'YYYY-MM-DD') }
    ]
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    eventFormPos(state, payload) {
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormActive(state, payload) {
      state.eventFormActive = payload;
    },
    eventFormDate(state, payload) {
      state.eventFormDate = payload;
    },
    addEvent(state, payload) {
      state.events.push(payload);
    }
  },
  actions: {
    addEvent(context, payload) {
      return new Promise((resolve, reject) => {
        let obj = {
          description: payload,
          date: context.state.eventFormDate
        };
        Axios.post('/add_event', obj).then(response => {
          if (response.status === 200) {
            context.commit('addEvent', obj);
            resolve(); // Resolves returned promise
          } else {
            reject(); // Rejects returned promise
          }
        });
      });
    }
  }
});