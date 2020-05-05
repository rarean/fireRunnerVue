<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <nb-list-item
          v-for="input in inputs"
          :key="input.mutate"
          class="lister"
        >
          <input-text :mutation="input.mutate" :floater="input.label" />
        </nb-list-item>
      </nb-form>
      <view class="btn">
        <nb-button rounded large :on-press="onNext">
          <nb-text>Save</nb-text>
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
import InputText from "../components/inputText";
import store from "../store";

export default {
  components: { Header,Footer,InputText },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Injuries",
      nextPage: "BCFMO",
      inputs: [
        {
          label: "Residential:",
          mutate: "updateAlarmTime"
        },
        {
          label: "Commercial:",
          mutate: "updateAlarmTime"
        },
        {
          label: "What is building used for::",
          mutate: "updateAlarmTime"
        },
        {
          label: "Suspected Cause of Fire: (ignition source)",
          mutate: "updateAlarmTime"
        },
        {
          label: "Arson Suspected: (Y/N)",
          mutate: "updateAlarmTime"
        },
        {
          label: "Estimated Cost of Damage:",
          mutate: "updateAlarmTime"
        },
        {
          label: "Property Damaged:",
          mutate: "updateAlarmTime"
        },
        {
          label: "Smoke Detector Operation: (Y,N,N/A)",
          mutate: "updateAlarmTime"
        },
        {
          label: "Acerage Burned:",
          mutate: "updateAlarmTime"
        },
        {
          label: "Main Floor Size (LxW):",
          mutate: "updateEnrouteTime"
        }
      ]
    };
  },
  created() {
    this.loaded = true;
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
  },
  methods: {
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
  padding: 20;
  justify-content: center;
  align-items: center;
}
.lister {
  border-color: "rgba(255,255,255,1)";
}
</style>
