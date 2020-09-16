//signatures:{
//  reporter:"",
//  reporter_image:"",
//  officer:"",
//  officer_image:""
//},
const updateReporter = function (state, value) {
  state.signatures.reporter = value;
};
const updateReporterSign = function (state, value) {
  state.signatures.reporter_image = value;
};
const updateOfficer = function (state, value) {
  state.signatures.officer = value;
};
const updateOfficerSign = function (state, value) {
  state.signatures.officer_image = value;
};

export { updateReporter, updateOfficer, updateReporterSign, updateOfficerSign };
