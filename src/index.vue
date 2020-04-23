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

const Drawer = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <Sidebar {...props}/>
  }
);

const AppNavigation = createAppContainer(
  createStackNavigator(
    {
      Login: { screen: LoginScreen },
      Drawer: { screen: Drawer }
    },
    {
      initialRouteName: "Login",
      headerMode: "none"
    }
  )
);
export default {
  components: { Root, AppNavigation }
};
</script>
