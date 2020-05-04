const updateStructType = function (state, value) {
  state.structure.type = value;
};
const updateStructUse = function (state, value) {
  state.structure.use = value;
};
const updateStructCause = function (state, value) {
  state.structure.suspected_cause = value;
};
const updateStructCost = function (state, value) {
  state.structure.estimated_cost = value;
};
const updateStructDamage = function (state, value) {
  state.structure.property_damaged = value;
};
const updateStructSmokeDetector = function (state, value) {
  state.structure.smoke_detector = value;
};
const updateStructAcerageBurned = function (state, value) {
  state.structure.acerage_burned = value;
};
const updateStructMainFloorSize = function (state, value) {
  state.structure.main_floor_size = value;
};
export {
  updateStructType,
  updateStructUse,
  updateStructCause,
  updateStructCost,
  updateStructDamage,
  updateStructSmokeDetector,
  updateStructAcerageBurned,
  updateStructMainFloorSize
};
