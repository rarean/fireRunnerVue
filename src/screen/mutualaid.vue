<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
        <add-mutualaid :on-add='addAid'/>
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
import AddMutualaid from "../components/addMutualaid";
import store from "../store";

export default {
  components: { Header, Footer,AddMutualaid },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "BCFMO",
      nextPage: "PDF", //add vehicles
      mutualaid: []
    };
  },
  created() {
    this.loaded = true;
    this.mutualaid = store.state.mutualaid;
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
  },
  methods: {
    addAid: function(aid){
      store.commit("addMutualAid", aid);
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
