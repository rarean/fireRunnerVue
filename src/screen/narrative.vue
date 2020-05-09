<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff', border: 1 }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <nb-textarea
          :rowSpan="9"
          placeholder="Narrative"
          bordered
          v-model="narrate"
        />
      </nb-form>
      <view class="btn">
        <nb-button rounded large :on-press="attach">
          <nb-text>Add Attachment</nb-text>
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
      nextPage: "Signatures"
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
      get() {
        return this.value;
      },
      set(val) {
        store.commit("addNarrative", val);
      }
    }
    //add getter and setter for each v-model
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
    },
    attach: function(){
      alert('TODO')
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
.textArea {
  text-align: left;
  border-top-width: 1;
}
</style>
