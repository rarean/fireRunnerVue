<template>
  <nb-container class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="content" v-if="loaded">
      <add-vehicle :on-add="addVehicle" />
      <view v-for="(item, index) in vehicles" :key="index">
        <vehicle :car="item" :delete-item="deleteVehicle" />
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
import AddVehicle from "../components/addVehicle";
import Vehicle from "../components/vehicle";
import store from "../store";

export default {
  components: { Header, Footer, AddVehicle, Vehicle },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "MutualAid",
      nextPage: "Equipment1", //add equipment
      vehicles: []
    };
  },
  created() {
    this.loaded = true;
    this.vehicles = store.state.vehicles;
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    }
  },
  methods: {
    addVehicle (obj) {
      store.commit("addVehicle", obj);
    },
    deleteVehicle (index) {
      this.vehicles.splice(index, 1);
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
  margin-top: 1;
}
</style>
