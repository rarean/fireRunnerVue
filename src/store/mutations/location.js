const updateCallLocation = function (state, value) {
  state.location.call_location = value;
};
const updateCallZip = function (state, value) {
  state.location.call_zip = value;
};
const updateOwnerName = function (state, value) {
  state.location.owner_name = value;
};
const updateOwnerAddress = function (state, value) {
  state.location.owner_address = value;
};
const updateOwnerCity = function (state, value) {
  state.location.owner_city = value;
};
const updateOwnerState = function (state, value) {
  state.location.owner_state = value;
};
const updateOwnerPhone = function (state, value) {
  state.location.owner_phone = value;
};
export {
  //export mutations
  updateCallLocation,
  updateCallZip,
  updateOwnerName,
  updateOwnerAddress,
  updateOwnerCity,
  updateOwnerState,
  updateOwnerPhone
};

