<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <nb-form>
      </nb-form>
      <view class="btn">
        <nb-button rounded large :on-press="reporterSig">
          <nb-text>Reporter Signature</nb-text>
        </nb-button>
      </view>
      <view class="btn">
        <nb-button rounded large :on-press="officerSig">
          <nb-text>Officer Signature</nb-text>
        </nb-button>
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
import store from "../store";

export default {
  components: { Header, Footer },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Narrative",
      nextPage: "Share",
    };
  },
  created() {
    this.loaded = true;
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    }
  },
  methods: {
    reporterSig: function(){
      alert('TODO: capture signature from device');
    },
    officerSig: function(){
      alert('TODO: capture signature from device');
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
.btn {
  margin: 20;
  justify-content: center;
  align-items: center;
}
.lister {
  border-color: "rgba(255,255,255,1)";
}
</style>
