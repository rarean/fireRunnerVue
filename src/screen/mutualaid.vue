<template>
  <nb-container class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="content" v-if="loaded">
      <add-mutualaid :on-add="addAid" />
      <view v-for="(aid, index) in mutualaid" :key="index">
        <mutualaid-Item :aid="aid" :delete-item="deleteAid" />
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
import AddMutualaid from "../components/addMutualaid";
import MutualaidItem from "../components/mutualaidItem";
import store from "../store";

export default {
  components: { Header, Footer, AddMutualaid, MutualaidItem },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "BCFMO",
      nextPage: "Vehicles",
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
    }
  },
  methods: {
    addAid(aid) {
      store.commit("addMutualAid", aid);
    },
    deleteAid(index) {
      this.mutualaid.splice(index, 1);
    },
    onMenu() {
      this.navigation.openDrawer();
    },
    onBack() {
      this.navigation.navigate(this.backPage);
    },
    onHome() {
      this.navigation.navigate("Home");
    },
    onNext() {
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
