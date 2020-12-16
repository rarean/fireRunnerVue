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
  components: { Header, Footer,InputText },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Incident",
      nextPage: "Location",
      inputs: [
        {
          label: "Alarm Time",
          mutate: "updateAlarmTime"
        },
        {
          label: "Enroute Time",
          mutate: "updateEnrouteTime"
        },
        {
          label: "On Scene Time",
          mutate: "updateOnsceneTime"
        },
        {
          label: "Fire Controlled Time",
          mutate: "updateFireControlTime"
        },
        {
          label: "Clear Scene Time",
          mutate: "updateClearSceneTime"
        }
      ]
    };
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
  },
  created() {
    this.loaded = true;
    //console.log("created", store.state);
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
  }
};
</script>

<style>
.container {
  align-self: center;
  margin-top: 20;
}
.btn {
  align-self: center;
  margin-top: 20;
  padding: 20;
}
.lister {
  border-color: "rgba(255,255,255,1)";
}
</style>
