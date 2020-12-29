<template>
  <nb-container class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="content" v-if="loaded">
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
      nextPage: "Equipment2",
      equipment: []
    };
  },
  created() {
    this.loaded = true;
    this.equipment = store.state.equipment;
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    }
  },
  methods: {
    addEquipment (obj) {
      store.commit("addEquipment", obj);
    },
    deleteItem (index) {
      this.equipment.splice(index, 1);
    },
    onMenu () {
      this.navigation.openDrawer();
    },
    onBack () {
      this.navigation.navigate(this.backPage);
    },
    onHome () {
      this.navigation.navigate("Home");
    },
    onNext () {
      this.navigation.navigate(this.nextPage);
    }
  }
};
</script>

<style>
.container {
  flex: 1;
  background-color: #fff;
}
.content {
  margin-top: 10;
}
</style>
