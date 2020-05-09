const updateStandby = function (state, value) {
  state.equip.standby = value;
};
const updateEquipStolen = function (state, value) {
  state.equip.stolen = value;
};
const updateEquipLost = function (state, value) {
  state.equip.lost = value;
};
const updateEquipBroken = function (state, value) {
  state.equip.broken = value;
};
const updateReceiptsBagged = function (state, value) {
  state.equip.receipts = value;
};
const updateTruckRestocked = function (state, value) {
  state.equip.restocked = value;
};

export {
  updateStandby,
  updateEquipStolen,
  updateEquipLost,
  updateEquipBroken,
  updateReceiptsBagged,
  updateTruckRestocked
};
