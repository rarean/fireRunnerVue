<template>
  <nb-list>
    <nb-list-item itemDivider class="title-wrapper">
      <nb-text class="title">{{ aid.dept }}</nb-text>
      <nb-text class="grow" />
      <nb-button transparent :on-press="deleteIconPress">
        <nb-icon name="trash" />
      </nb-button>
    </nb-list-item>
    <view class="item">
      <nb-text>Apparatus: {{ aid.apparatus }}</nb-text>
      <nb-text>Personnel: {{ aid.personnel }}</nb-text>
      <nb-text>AlarmTime: {{ aid.alarm }}</nb-text>
      <nb-text>OnScene: {{ aid.on_scene }}</nb-text>
      <nb-text>Clear: {{ aid.clear_scene }}</nb-text>
    </view>
  </nb-list>
</template>
<script>
export default {
  props: {
    aid: Object,
    deleteItem: Function
  },
  methods: {
    deleteIconPress(index) {
      this.deleteItem(this.selectedIndex);
    }
  }
};
</script>
<style>
.title-wrapper {
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: -5;
}
.title {
  font-weight: bold;
  font-size: 20;
}
.grow {
  flex: 1;
  align-self: auto;
  flex-grow: 1;
}
.item {
  margin-left: 10;
}
</style>
