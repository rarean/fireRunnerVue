<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <nb-list-item>
          <input-text :mutation="input.mutate" :floater="input.label" />
        </nb-list-item>
        <nb-item stackedLabel last>
          <nb-label >Signature</nb-label>
          <signature
            ref="sigpanel"
            :on-finger-up="handleSig"
            image-format="png"
            output-type="base64"
            :height=150
           />
        </nb-item>
      </nb-form>
      <view >
      </view>
      <view class="button-wrapper">
        <nb-button rounded large :on-press="clearSig" >
          <nb-text>Clear</nb-text>
        </nb-button>
        <nb-button rounded large :on-press="saveSig" >
          <nb-text>Save</nb-text>
        </nb-button>
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
import Signature from 'react-native-signature-panel';
import InputText from "../components/inputText";
import * as FileSystem from "expo-file-system";

export default {
  components: { Header, Footer, Signature,InputText },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      backPage: "Signatures1",
      nextPage: "Share",
      input:{
        mutate:"updateOfficer",
        label:"Officer in Charge (Print)",
        sign:"updateOfficerSign"
      },
      digiSign:[],
      image:""
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
    handleSig(sig){
      this.digiSign.push(sig);
      this.image = this.digiSign.pop();
      //console.log('lastImage', this.image);
    },
    clearSig(){
      this.$refs.sigpanel.setState({
        paths: [],
        points: [],
        posX: 0,
        posY: 0,
      });
      this.digiSign = [];
      this.image = ""
      store.commit(this.input.sign, "");
    },
    saveSig(){
      store.commit(this.input.sign, this.image);
      this.navigation.navigate(this.nextPage);
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
  align-self:center;
  margin-top: 0;
}
.button-wrapper {
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5;
  margin-left: 20;
  margin-right: 20;
}
</style>
