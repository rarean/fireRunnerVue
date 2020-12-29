<template>
  <nb-container class="container">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <nb-textarea
          :rowSpan="15"
          placeholder="Narrative"
          bordered
          v-model="narrate"
        />
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
import store from "../store";

export default {
  components: { Header, Footer },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Equipment2",
      nextPage: "Signatures1"
    };
  },
  created() {
    this.loaded = true;
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
    narrate: {
      //add getter and setter for each v-model
      get() {
        return this.value;
      },
      set(val) {
        store.commit("addNarrative", val);
      }
    }
  },
  methods: {
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
.btn {
  align-self: center;
  margin-top: 10;
}
.textArea {
  text-align: left;
  border-top-width: 1;
  margin:10;
}
</style>
