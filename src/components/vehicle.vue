<template>
  <nb-list class="wrapper">
    <nb-list-item itemDivider class="button-wrapper">
      <nb-text>{{ car.owner_name }}</nb-text>
      <nb-text class="grow" />
      <nb-button transparent :on-press="deleteIconPress">
        <nb-icon name="trash" />
      </nb-button>
    </nb-list-item>
    <nb-text>Address: {{ car.address }}</nb-text>
    <nb-text>Phone: {{ car.phone }}</nb-text>
    <nb-text>DL#: {{ car.dl_num }}</nb-text>
    <nb-text>Insurance: {{ car.insurance }}</nb-text>
    <nb-text>Make: {{ car.make }}</nb-text>
    <nb-text>Model: {{ car.model }}</nb-text>
    <nb-text>Year: {{ car.year }}</nb-text>
    <nb-text>VIN: {{ car.vin }}</nb-text>
    <nb-text>Plate#: {{ car.plate_num }}</nb-text>
  </nb-list>
</template>
<script>
export default {
  props: {
    car: Object,
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
