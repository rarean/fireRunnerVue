//alarm mutations for obj
const updateAlarmTime = function (state, value) {
  state.alarms.alarm_time = value;
};
const updateEnrouteTime = function (state, value) {
  state.alarms.enroute_time = value;
};
const updateOnsceneTime = function (state, value) {
  state.alarms.onscene_time = value;
};
const updateFireControlTime = function (state, value) {
  state.alarms.fire_control_time = value;
};
const updateClearSceneTime = function (state, value) {
  state.alarms.clear_scene_time = value;
};
export {
  //export mutations
  updateAlarmTime,
  updateEnrouteTime,
  updateOnsceneTime,
  updateFireControlTime,
  updateClearSceneTime,
};
