const updateFatalities = function (state, value) {
  state.injured.fatalities = value;
};
const updateInjuries = function (state, value) {
  state.injured.injuries = value;
};
export { updateFatalities, updateInjuries };
