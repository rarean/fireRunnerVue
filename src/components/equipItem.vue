<template>
  <nb-list class="wrapper">
    <nb-list-item itemDivider class="button-wrapper">
      <nb-text>{{ itemObj.apparatus }}</nb-text>
      <nb-text class="grow" />
      <nb-button transparent :on-press="deleteIconPress">
        <nb-icon name="trash" />
      </nb-button>
    </nb-list-item>
    <nb-text>Personnel: {{ itemObj.personnel }}</nb-text>
    <nb-text>Equipment Used: {{ itemObj.equip_used }}</nb-text>
    <nb-text>OnScene Time: {{ itemObj.onscene_time }}</nb-text>
    <nb-text>ClearScene Time: {{ itemObj.clear_scene_time }}</nb-text>
  </nb-list>
</template>
<script>
export default {
  props: {
    itemObj: Object,
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
