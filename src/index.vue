<template>
  <root>
    <app-navigation></app-navigation>
  </root>
</template>

<script>
import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "vue-native-router";
import { Root } from "native-base";
import LoginScreen from "./screen/login.vue";
import HomeScreen from "./screen/home.vue";
import Sidebar from "./screen/sidebar.vue";
import PdfScreen from "./screen/createPdf.vue";

console.disableYellowBox = true;
const Drawer = createDrawerNavigator(
  {
    Login: {screen: LoginScreen },
    Home: { screen: HomeScreen },
    PDF: {screen: PdfScreen}
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <Sidebar {...props} />
  }
);

const AppNavigation = createAppContainer(
  createStackNavigator(
    {
      Drawer: { screen: Drawer }
    },
    {
      initialRouteName: "Drawer",
      headerMode: "none"
    }
  )
);
export default {
  components: { Root, AppNavigation }
};
</script>
