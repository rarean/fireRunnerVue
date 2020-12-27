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
import VehicleScreen from "./screen/vehicles.vue";
import Equip1Screen from "./screen/equipment.vue";
import Equip2Screen from "./screen/equip2.vue";
import NarrativeScreen from "./screen/narrative.vue";
import Signature1Screen from "./screen/signatures1.vue";
import Signature2Screen from "./screen/signatures2.vue";
import ShareScreen from "./screen/share.vue";

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
    Vehicles: { screen: VehicleScreen },
    Equipment1: { screen: Equip1Screen },
    Equipment2: { screen: Equip2Screen },
    Narrative: { screen: NarrativeScreen },
    Signatures1: { screen: Signature1Screen },
    Signatures2: { screen: Signature2Screen },
    Share: {screen: ShareScreen}
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
