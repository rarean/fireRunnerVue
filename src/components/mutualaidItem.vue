<template>
  <nb-list class="wrapper">
    <nb-list-item itemDivider class="button-wrapper">
      <nb-text>{{ aid.dept }}</nb-text>
      <nb-text class="grow" />
      <nb-button transparent :on-press="deleteIconPress">
        <nb-icon name="trash" />
      </nb-button>
    </nb-list-item>
    <nb-text>Apparatus: {{ aid.apparatus }}</nb-text>
    <nb-text>Personnel: {{ aid.personnel }}</nb-text>
    <nb-text>AlarmTime: {{ aid.alarm }}</nb-text>
    <nb-text>OnScene: {{ aid.on_scene }}</nb-text>
    <nb-text>Clear: {{ aid.clear_scene }}</nb-text>
  </nb-list>
</template>
<script>
export default {
  props: {
    aid: Object,
    deleteItem: Function
  },
  methods: {
    deleteIconPress: function(index){
      this.deleteItem(this.selectedIndex)
    }
  }
};
</script>
<style>
.button-wrapper {
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
}
.grow {
  flex: 1;
  align-self: auto;
  flex-grow: 1;
}
.wrapper {
  margin-bottom: 20;
}
</style>
