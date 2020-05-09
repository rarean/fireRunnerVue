//functions to be used in components
export function LOGGING_IN(state, status) {
  state.logging_in = status;
}
export function LOGIN_SUCCESFULL(state, { userObj }) {
  state.userObj = userObj;
  state.logging_in = false;
}
//dont think we need this one
export function NAVIGATOR(state, navigate) {
  state.navigation = navigate;
}
//user
export function updateFname(state, value) {
  state.userObj.fname = value;
}
export function updateLname(state, value) {
  state.userObj.lname = value;
}
export function addMutualAid(state, value) {
  state.mutualaid.push(value);
}
export function addVehicle(state, value) {
  state.vehicles.push(value);
}
export function addEquipment(state, value) {
  state.equipment.push(value);
}
export function addNarrative(state, value) {
  state.narrative = value;
}
export function addAttachment(state, value) {
  state.attachment = value;
}
//Incidents
export {
  updtIncdntDate,
  updtIncdntNum,
  updtIncdntRep,
  updtIncdntPerson,
  updtIncdntMedic,
  updtIncdntSituation
} from "./mutations/incidents";
//Alarms
export {
  updateAlarmTime,
  updateEnrouteTime,
  updateOnsceneTime,
  updateFireControlTime,
  updateClearSceneTime
} from "./mutations/alarms";
//Locations
export {
  updateCallLocation,
  updateCallZip,
  updateOwnerName,
  updateOwnerAddress,
  updateOwnerCity,
  updateOwnerState,
  updateOwnerPhone
} from "./mutations/location";
//Response
export {
  updateDept,
  updateMutualAidTo,
  updateMutualAidFrom
} from "./mutations/response";
//Action
export {
  updateActionTaken,
  updateWaterUsed,
  updateFoamUsed
} from "./mutations/actions";
//Injuries
export { updateFatalities, updateInjuries } from "./mutations/injuries";
//Structure
export {
  updateStructType,
  updateStructUse,
  updateStructCause,
  updateStructCost,
  updateStructDamage,
  updateStructSmokeDetector,
  updateStructAcerageBurned,
  updateStructMainFloorSize,
  updateStructArsonSuspect
} from "./mutations/structure";
////BCFMO
export {
  updateBcfmoCaseNum,
  updateBcfmoContactForArson,
  updateBcfmoInvestigator
} from "./mutations/bcfmo";
//Equipment
export {
  updateStandby,
  updateEquipStolen,
  updateEquipLost,
  updateEquipBroken,
  updateReceiptsBagged,
  updateTruckRestocked
} from "./mutations/equip2";
//Signatures
export {
  updateReporter,
  updateOfficer,
  updateReporterSign,
  updateOfficerSign
} from "./mutations/signatures";
