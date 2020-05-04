<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <nb-item floatingLabel>
          <nb-label>Alarm Time: </nb-label>
          <nb-input v-model="alarmTime" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Enroute Time: </nb-label>
          <nb-input v-model="enrouteTime" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>On Scene Time: </nb-label>
          <nb-input v-model="onSceneTime" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Fire Controlled Time: </nb-label>
          <nb-input v-model="fireControlTime" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Clear Scene Time: </nb-label>
          <nb-input v-model="clearSceneTime" />
        </nb-item>
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
      backPage: "Incident",
      nextPage: "Location"
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
    alarmTime: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateAlarmTime", val);
      }
    },
    enrouteTime: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateEnrouteTime", val);
      }
    },
    onSceneTime: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateOnsceneTime", val);
      }
    },
    fireControlTime: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateFireControlTime", val);
      }
    },
    clearSceneTime: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateClearSceneTime", val);
      }
    }
    //add getter and setter for each v-model
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
