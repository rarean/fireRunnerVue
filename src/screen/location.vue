<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu"/>
    <nb-content class="container" v-if="loaded">
      <nb-form>
      <nb-text>page content goes here</nb-text>
        <nb-item floatingLabel>
          <nb-label>Date </nb-label>
          <nb-input v-model="date" />
        </nb-item>
      </nb-form>
      <view class="btn">
        <nb-button rounded large :on-press="save">
          <nb-text>Save</nb-text>
        </nb-button>
      </view>
    </nb-content>
    <nb-spinner v-if="!loaded"></nb-spinner>
    <nb-footer>
      <nb-left>
        <nb-button :on-press="() => this.props.navigation.goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body class="center">
        <nb-button :on-press="() => this.props.navigation.navigate('Incident')">
          <nb-icon name="home" />
        </nb-button>
      </nb-body>
      <nb-right>
        <!-- update next page -->
        <nb-button :on-press="() => this.props.navigation.navigate('PDF')">
          <nb-icon name="arrow-forward" />
        </nb-button>
      </nb-right>
    </nb-footer>
  </nb-container>
</template>

<script>
import React from "react";
import Header from "../components/header";
import store from "../store";

export default {
  components: { Header },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false
    };
  },
  created() {
    this.loaded = true;
    console.log("created", store.state);
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
    date: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntDate", val);
      }
    },
    //add getter and setter for each v-model
  },
  methods: {
    onMenu: function(){
      this.navigation.openDrawer();
    },
    save() {
      console.log("save", store.state);
      //navigate to next page
      this.props.navigation.navigate('PDF');
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
.center {
  justify-content: center;
  align-items: center;
}
.score {
  width: 40;
  height: 40;
  background-color: #fff;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  margin-right: 16;
}
.score-text {
  color: #ff6600;
  font-weight: bold;
}
.detail {
  flex: 1;
}
.name {
  color: #666;
  font-size: 12;
  margin-bottom: 6;
}
.title {
  color: #333;
  font-size: 14;
}
</style>
