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
    alarms:{
      alarm_time:"",
      enroute_time:"",
      onscene_time:"",
      fire_control_time:"",
      clear_scene_time:""
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
  //dispatch actions
});

export default store;
