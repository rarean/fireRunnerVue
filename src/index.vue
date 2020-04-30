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
import Sidebar from "./screen/sidebar.vue";
import HomeScreen from "./screen/home.vue";
import IncidentScreen from "./screen/incident.vue";
import AlarmScreen from "./screen/alarms.vue";
import LocationScreen from "./screen/location.vue";
import ResponseScreen from "./screen/response.vue";
import ActionScreen from "./screen/actions.vue";
import InjurieScreen from "./screen/injuries.vue";
import StructureScreen from "./screen/structure.vue";
import BCFMOScreen from "./screen/bcfmo.vue";
import MutualAidScreen from "./screen/mutualaid.vue";
import PdfScreen from "./screen/createPdf.vue";

console.disableYellowBox = true;
const Drawer = createDrawerNavigator(
  {
    Home: {screen: HomeScreen },
    Incident: { screen: IncidentScreen },
    Alarms: { screen: AlarmScreen },
    Location: { screen: LocationScreen },
    Response: { screen: ResponseScreen },
    Actions: { screen: ActionScreen },
    Injuries: { screen: InjurieScreen },
    Structure: { screen: StructureScreen },
    BCFMO: { screen: BCFMOScreen },
    MutualAid: { screen: MutualAidScreen },
    PDF: {screen: PdfScreen}
  },
  {
    initialRouteName: "Home",
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
