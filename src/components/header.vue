<template>
  <nb-header>
    <nb-left>
      <nb-button transparent :on-press="openMenu">
        <nb-icon name="menu" />
      </nb-button>
    </nb-left>
    <nb-body class="centered">
      <nb-title>{{ name }}</nb-title>
    </nb-body>
    <nb-right>
      <nb-button transparent :on-press="closeApp">
        <nb-icon name="flame" />
        <nb-text>FireRunner</nb-text>
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
import { Alert, BackHandler } from "react-native";
export default {
  props: {
    name: { Type: String },
    menuPressed: Function
  },
  methods: {
    openMenu() {
      this.menuPressed();
    },
    closeApp() {
      Alert.alert("Exit App", "Do you want to exit the app?", [
        { text: "No", onPress: () => null, style: "cancel" },
        { text: "Yes", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }
  }
};
</script>

<style>
.centered {
  align-items: center;
}
</style>
