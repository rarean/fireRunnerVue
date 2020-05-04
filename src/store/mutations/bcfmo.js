const updateBcfmoCaseNum = function (state, value) {
  state.bcfmo.case_num = value;
};
const updateBcfmoContactForArson = function (state, value) {
  state.bcfmo.contact_for_arson = value;
};
const updateBcfmoInvestigator = function (state, value) {
  state.bcfmo.investigator = value;
};
export {
  updateBcfmoCaseNum,
  updateBcfmoContactForArson,
  updateBcfmoInvestigator
};
