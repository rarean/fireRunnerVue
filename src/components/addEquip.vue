<template>
  <nb-form>
    <nb-picker
      mode="dropdown"
      :iosIcon="getIosIcon()"
      placeholder="Apparatus"
      placeholderIconColor="#007aff"
      :selectedValue="apparatus"
      :onValueChange="onSelected"
    >
      <item label="Apparatus" value="Apparatus" />
      <item label="LBT-8110" value="LBT-8110" />
      <item label="LBT-8210" value="LBT-8210" />
      <item label="C-8110" value="C-8110" />
      <item label="E-8110" value="E-8110" />
      <item label="R-8110" value="R-8110" />
      <item label="T-8110" value="T-8110" />
      <item label="HBT-8110" value="HBT-8110" />
      <item label="Utility 347" value="Utility 347" />
      <item label="POV" value="POV" />
    </nb-picker>
    <nb-item floatingLabel>
      <nb-label>Personnel </nb-label>
      <nb-input v-model="personnel" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Equipment Used </nb-label>
      <nb-input v-model="equip_used" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Truck OnScene Time </nb-label>
      <nb-input v-model="onscene_time" />
    </nb-item>
    <nb-item floatingLabel>
      <nb-label>Truck Clear Scene Time </nb-label>
      <nb-input v-model="clear_scene_time" />
    </nb-item>
    <nb-item class="btn">
    <nb-button rounded large :on-press="add">
      <nb-text>ADD</nb-text>
    </nb-button>
    </nb-item>
  </nb-form>
</template>

<script>
import React from "react";
import {Picker, Icon} from "native-base";

export default {
  components: { Item: Picker.Item },
  props: {
    onAdd: Function
  },
  data: function () {
    return {
      apparatus: "",
      personnel: "",
      equip_used: "",
      onscene_time: "",
      clear_scene_time: ""
    };
  },
  methods: {
    onSelected: function(value){
      this.apparatus = value;
    },
    getIosIcon: function(){
      return <Icon name="ios-arrow-down-outline" />;
    },
    add: function () {
      let obj = {
        apparatus: this.apparatus,
        personnel: this.personnel,
        equip_used: this.equip_used,
        onscene_time: this.onscene_time,
        clear_scene_time: this.clear_scene_time
      };
      this.onAdd(obj);
      this.apparatus = "";
      this.personnel = "";
      this.equip_used = "";
      this.onscene_time = "";
      this.clear_scene_time = "";
    }
  }
};
</script>
<style>
.container {
  margin: 20;
  padding: 20;
}
.btn {
  margin: 20;
  padding: 20;
  justify-content: center;
  align-items: center;
}
</style>
