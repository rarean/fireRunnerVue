import Vue from "vue-native-core";
import Vuex from "vuex";
import * as mutations from "./mutations";
//import * as actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  //actions,
  mutations,

  state: {
    navigation: {},
    logging_in: false,
    userObj: {
      fname: "",
      lname: ""
    },
    incident: {
      date: "",
      num: "",
      rep: "",
      personnel: "",
      medic: "",
      situation: ""
    },
    aid: {},
    structure: {},
    bcfmo: {},
    location: {},
    mutualaid: {},
    vehicles: {},
    equipment: {},
    report: {},
    narrative: {},
    signature: {}
  },
  actions: {
    //invoke mutations asyncronusly
    LOGIN({ commit, state }, { navigation }) {
      //console.log('LOGIN', navigation);
      commit("NAVIGATOR", navigation);
      commit("LOGGING_IN", true);
      //return new Promise((resolve, reject) => {
      //  setTimeout(() => {
      //    navigation.navigate('Incident');
      //    resolve();
      //  }, 1000)
      //})
    }
  }
  //must be syncronus
  //mutations: {
  //  //functions to be used in components
  //  updateFname(state, value) {
  //    state.userObj.fname = value;
  //  },
  //  updateLname(state, value) {
  //    state.userObj.lname = value;
  //  },
  //  NAVIGATOR(state, navigate) {
  //    state.navigation = navigate;
  //  },
  //  LOGGING_IN(state, status) {
  //    state.logging_in = status;
  //  },
  //  LOGIN_SUCCESFULL(state, { userObj }) {
  //    state.userObj = userObj;
  //    state.logging_in = false;
  //  }
  //},
  //dispatch actions
});

export default store;
