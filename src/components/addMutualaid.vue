<template>
  <nb-form>
    <nb-item floatingLabel>
      <nb-label>Mutual Aid Department </nb-label>
      <nb-input v-model="dept" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Mutual Aid Apparatus </nb-label>
      <nb-input v-model="apparatus" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Mutual Aid Personnel </nb-label>
      <nb-input v-model="personnel" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Alarm Time </nb-label>
      <nb-input v-model="alarmTime" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>On Scene Time </nb-label>
      <nb-input v-model="onScene" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Clear Scene Time </nb-label>
      <nb-input v-model="clearScene" />
    </nb-item>
    <nb-item class="btn">
      <nb-button rounded large :on-press="addAid">
        <nb-text>ADD</nb-text>
      </nb-button>
    </nb-item>
  </nb-form>
</template>

<script>
export default {
  props: {
    onAdd: Function
  },
  data: function () {
    return {
      dept: "",
      apparatus: "",
      personnel: "",
      alarmTime: "",
      onScene: "",
      clearScene: ""
    };
  },
  methods: {
    addAid: function () {
      let aid = {
        dept: this.dept,
        apparatus: this.apparatus,
        personnel: this.personnel,
        alarm: this.alarmTime,
        on_scene: this.onScene,
        clear_scene: this.clearScene
      };
      this.onAdd(aid);
      this.dept = "";
      this.apparatus = "";
      this.personnel = "";
      this.alarmTime = "";
      this.onScene = "";
      this.clearScene = "";
    }
  }
};
</script>
<style>
.btn {
  margin: 10;
  padding: 10;
  align-self: center;
}
</style>
