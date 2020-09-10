<template>
  <nb-container>
    <nb-content :style="stylesObj.drawerContent" :bounces="false">
      <nb-list>
        <nb-list-item>
          <nb-text>Hello {{ userData.fname }}</nb-text>
        </nb-list-item>
        <nb-list-item
          v-for="screen in screens"
          :key="screen.route"
          button
          noBorder
          :onPress="() => handleListItemClick(screen)"
        >
          <nb-text>{{ screen.name }}</nb-text>
        </nb-list-item>
        <nb-list-item>
          <!--nb-text :on-press="logout">Logout</nb-text-->
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import drawerCover from "../../assets/drawer-cover.png";
import drawerImage from "../../assets/logo-kitchen-sink.png";
import { NavigationActions, StackActions } from "vue-native-router";
import store from "../store";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Home" })]
});

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    handleListItemClick(dataObj) {
      this.navigation.navigate(dataObj.route);
    },
    logout() {
      //store.dispatch('LOGOUT', () => this.navigation.dispatch(resetAction))
    }
    //openPage(){ this.navigation.dispatch(page)}
  },
  computed: {
    userData() {
      return store.state.userObj;
    }
  },
  data: {
    stylesObj: {
      drawerContent: {
        paddingTop: Platform.OS === "android" ? 20 : 30,
        paddingBottom: Platform.OS === "android" ? 20 : 30
      }
    },
    screens: [
      {
        name: "Home",
        route: "Home",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Incident",
        route: "Incident",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Alarms",
        route: "Alarms",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Location",
        route: "Location",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Response",
        route: "Response",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Actions",
        route: "Actions",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Injuries",
        route: "Injuries",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Structure",
        route: "Structure",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "BCFMO",
        route: "BCFMO",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "MutualAid",
        route: "MutualAid",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Vehicles",
        route: "Vehicles",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Equipment 1",
        route: "Equipment1",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Equipment 2",
        route: "Equipment2",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Narrative",
        route: "Narrative",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Signatures",
        route: "Signatures",
        icon: "",
        bg: "#C5F422"
      },
      {
        name: "Share",
        route: "Share",
        icon: "",
        bg: "#C5F422"
      }
    ]
  }
};
</script>

<style>
.container {
  margin: 20;
  padding: 20;
}
</style>
