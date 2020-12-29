<template>
  <nb-container v-if="loaded" class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="content">
      <view class="btn">
        <nb-button rounded large :on-press="newSheet">
          <nb-text>New Worksheet</nb-text>
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
      /*
      incident: store.state.incident || {},
      alarm: store.state.alarms || {},
      location: store.state.location || {},
      response: store.state.response || {},
      actions: store.state.actions || {},
      injured: store.state.injured || {},
      structure: store.state.structure || {},
      bcfmo: store.state.bcfmo || {},
      mutualaid: store.state.mutualaid || [],
      vehicles: store.state.vehicles || [],
      equipment: store.state.equipment || [],
      equip: store.state.equip || {},
      narrative: store.state.narrative || '',
      signatures: store.state.signatures || {},
      attachment: store.state.attachment || ''
      
      store.commit(this.mutation, null);
      */
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
</style>
