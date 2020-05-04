const updateActionTaken = function (state, value) {
  state.actions.taken = value;
};
const updateWaterUsed = function (state, value) {
  state.actions.water_used = value;
};
const updateFoamUsed = function (state, value) {
  state.actions.foam_used = value;
};

export { updateActionTaken, updateWaterUsed, updateFoamUsed };
