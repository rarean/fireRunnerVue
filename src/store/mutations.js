//functions to be used in components
export function LOGGING_IN(state, status) {
  state.logging_in = status;
}
export function LOGIN_SUCCESFULL(state, { userObj }) {
  state.userObj = userObj;
  state.logging_in = false;
}
//dont think we need this one
export function NAVIGATOR(state, navigate) {
  state.navigation = navigate;
}
//user
export function updateFname(state, value) {
  state.userObj.fname = value;
}
export function updateLname(state, value) {
  state.userObj.lname = value;
}
//Incidents
export {
  updtIncdntDate,
  updtIncdntNum,
  updtIncdntRep,
  updtIncdntPerson,
  updtIncdntMedic,
  updtIncdntSituation
} from './incidents';
//Alarms
export {
  updateAlarmTime,
  updateEnrouteTime,
  updateOnsceneTime,
  updateFireControlTime,
  updateClearSceneTime
} from './alarms';

