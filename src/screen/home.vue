<template>
  <nb-container v-if="loaded" class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="content">
      <view>
        <nb-text class="btn txt">Hello!</nb-text>
        <nb-text class="txt">
          This app was designed for Castroville Volunteer Fire Department.
        </nb-text>
        <nb-text class="txt">
          All inputs (text,image,etc.) to this app are not saved to device and
          exist in-memory of the app only.
        </nb-text>
        <nb-text class="txt">
          The input data will be printed to PDF using the "Share" screen and
          lost once the app is closed. However, input data will be maintained
          in the app if it is running in the background (until closed).
        </nb-text>
        <nb-text class="txt">
          Use the side menu (<nb-icon name="menu" />), left (<nb-icon name="arrow-back" />) 
          and right (<nb-icon name="arrow-forward" />) arrows to navigate
          the app.
        </nb-text>
      </view>
      <view class="btn">
        <nb-button rounded large :on-press="newSheet">
          <nb-text>Continue</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
  <nb-spinner v-if="!loaded"></nb-spinner>
</template>

<script>
import React from "react";
import store from "../store";
import Header from "../components/header";
import InputText from "../components/inputText";

export default {
  components: { Header, InputText },
  props: { navigation: { type: Object } },
  data: function () {
    return {
      loaded: false,
      nextPage: "Incident"
    };
  },
  created() {
    this.loaded = true;
  },
  methods: {
    onMenu() {
      this.navigation.openDrawer();
    },
    newSheet() {
      this.navigation.navigate(this.nextPage);
    }
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
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
  margin-top: 20;
  padding: 20;
}
.btn {
  align-self: center;
  margin-top: 20;
  padding: 20;
}
.txt {
  font-size: 20;
  margin: 5;
}
</style>
