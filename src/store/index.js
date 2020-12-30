import Vue from "vue-native-core";
import Vuex from "vuex";
import * as mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations,

  state: {
    navigation: {},
    logging_in: false,
    userObj: {
      fname: "",
      lname: "",
    },
    incident: {
      date: "",
      num: "",
      rep: "",
      personnel: "",
      medic: "",
      situation: "",
    },
    alarms: {
      alarm_time: "",
      enroute_time: "",
      onscene_time: "",
      fire_control_time: "",
      clear_scene_time: "",
    },
    location: {
      call_location: "",
      call_zip: "",
      owner_name: "",
      owner_address: "",
      owner_city: "",
      owner_state: "",
      owner_phone: "",
    },
    response: {
      dept: "",
      mutual_aid_to: "",
      mutual_aid_from: "",
    },
    actions: {
      taken: "",
      water_used: "",
      foam_used: "",
    },
    injured: {
      fatalities: "",
      injuries: "",
    },
    structure: {
      type: "",
      use: "",
      suspected_cause: "",
      arson_suspected: "",
      estimated_cost: "",
      property_damaged: "",
      smoke_detector: "",
      acerage_burned: "",
      main_floor_size: "",
    },
    bcfmo: {
      case_num: "",
      contact_for_arson: "",
      investigator: "",
    },
    mutualaid: [],
    vehicles: [],
    equipment: [],
    equip: {
      standby: "",
      stolen: "",
      lost: "",
      broken: "",
      receipts: "",
      restocked: "",
    },
    narrative: "",
    signatures: {
      reporter: "",
      reporter_image: "",
      officer: "",
      officer_image: "",
    },
    attachment: "",
  }
});

export default store;
