<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <add-equip :on-add="addEquipment" />
      <view v-for="(equip, index) in equipment" :key="index">
        <equip-item :itemObj="equip" :delete-item="deleteItem" />
      </view>
    </nb-content>
    <nb-spinner v-if="!loaded"></nb-spinner>
    <footer
      :back-pressed="onBack"
      :home-pressed="onHome"
      :next-pressed="onNext"
    />
  </nb-container>
</template>

<script>
import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import AddEquip from "../components/addEquip";
import EquipItem from "../components/equipItem";
import store from "../store";

export default {
  components: { Header, Footer, AddEquip, EquipItem },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Vehicles",
      nextPage: "PDF", //add equipment
      equipment: []
    };
  },
  created() {
    this.loaded = true;
    this.equipment = store.state.equipment;
    console.log(this.equipment);
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    }
  },
  methods: {
    addEquipment: function (obj) {
      store.commit("addEquipment", obj);
      console.log("equip", store.state.equipment);
    },
    deleteItem: function (index) {
      this.equipment.splice(index, 1);
      console.log("chk", store.state.equipment);
    },
    onMenu: function () {
      this.navigation.openDrawer();
    },
    onBack: function () {
      this.navigation.navigate(this.backPage);
    },
    onHome: function () {
      this.navigation.navigate("Home");
    },
    onNext: function () {
      this.navigation.navigate(this.nextPage);
    }
  }
};
</script>

<style>
.container {
  margin: 20;
  padding: 20;
}
</style>
