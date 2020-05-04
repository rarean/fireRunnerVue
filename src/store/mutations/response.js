//dept:"",
//mutual_aid_to:"",
//mutual_aid_from:""
const updateDept = function (state, value) {
  state.response.dept = value;
};
const updateMutualAidTo = function (state, value) {
  state.response.mutual_aid_to = value;
};
const updateMutualAidFrom = function (state, value) {
  state.response.mutual_aid_from = value;
};

export { updateDept, updateMutualAidTo, updateMutualAidFrom };
