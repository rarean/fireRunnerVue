//functions to be used in components
export function LOGGING_IN (state, status) {
  state.logging_in = status;
}
export function LOGIN_SUCCESFULL (state, {userObj}) {
  state.userObj = userObj;
  state.logging_in = false;
}
//dont think we need this one
export function NAVIGATOR(state, navigate) {
  state.navigation = navigate;
}
export function updateFname(state, value) {
  state.userObj.fname = value;
}
export function updateLname(state, value) {
  state.userObj.lname = value;
}
export function updtIncdntDate(state, value){
  state.incident.date = value;
}
export function updtIncdntNum(state, value){
  state.incident.num = value;
}
export function updtIncdntRep(state, value){
  state.incident.rep = value;
}
export function updtIncdntPerson(state, value){
  state.incident.personnel = value;
}
export function updtIncdntMedic(state, value){
  state.incident.medic = value;
}
export function updtIncdntSituation(state, value){
  state.incident.situation = value;
}
