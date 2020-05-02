<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <nb-header>
      <nb-left>
        <nb-button transparent
          :on-press="() => this.props.navigation.openDrawer()" >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <title :name="titleName" />
      <nb-right>
        <nb-button transparent>
          <nb-icon name="flame" />
          <nb-text>FireRunner</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <!--nb-text>page content goes here</nb-text-->
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
        <nb-button rounded large
          :on-press="() => this.props.navigation.navigate('Location')">
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
        <nb-button
          :on-press="() => this.props.navigation.navigate('Incident')" >
          <nb-icon name="home" />
        </nb-button>
      </nb-body>
      <nb-right>
        <!-- update next page -->
        <nb-button :on-press="() => this.props.navigation.navigate('Location')">
          <nb-icon name="arrow-forward" />
        </nb-button>
      </nb-right>
    </nb-footer>
  </nb-container>
</template>

<script>
import React from "react";
import Title from "../components/title";
import store from "../store";

export default {
  components: { Title },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false
    };
  },
  created() {
    this.loaded = true;
    //console.log("created", store.state);
  },
  computed: {
    titleName() { return this.navigation.state.routeName; },
    alarmTime: {
      get() { return this.value; },
      set(val) { store.commit("updateAlarmTime", val); }
    },
    enrouteTime: {
      get() { return this.value; },
      set(val) { store.commit("updateEnrouteTime", val); }
    },
    onSceneTime: {
      get() { return this.value; },
      set(val) { store.commit("updateOnsceneTime", val); }
    },
    fireControlTime: {
      get() { return this.value; },
      set(val) { store.commit("updateFireControlTime", val); }
    },
    clearSceneTime: {
      get() { return this.value; },
      set(val) { store.commit("updateClearSceneTime", val); }
    },
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
