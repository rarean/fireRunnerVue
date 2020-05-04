//incident mutations
const updtIncdntDate = function (state, value) {
  state.incident.date = value;
};
const updtIncdntNum = function (state, value) {
  state.incident.num = value;
};
const updtIncdntRep = function (state, value) {
  state.incident.rep = value;
};
const updtIncdntPerson = function (state, value) {
  state.incident.personnel = value;
};
const updtIncdntMedic = function (state, value) {
  state.incident.medic = value;
};
const updtIncdntSituation = function (state, value) {
  state.incident.situation = value;
};
export {
  //export mutations
  updtIncdntDate,
  updtIncdntNum,
  updtIncdntRep,
  updtIncdntPerson,
  updtIncdntMedic,
  updtIncdntSituation,
};
