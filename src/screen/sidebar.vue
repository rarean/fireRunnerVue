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
          <nb-text>{{screen.name}}
        </nb-list-item>
        <nb-list-item>
          <nb-text :on-press="logout">Logout</nb-text>
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
  actions: [NavigationActions.navigate({ routeName: "Login" })]
});

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    handleListItemClick(dataObj){
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
        paddingTop: Platform.OS === "android" ? 20 : 30
      }
    },
    screens:[
      {
      name:"Login",
      route:"Login",
      icon:"",
      bg:"#C5F422"
      },
      {
      name:"Incident",
      route:"Incident",
      icon:"home",
      bg:"#C5F422"
      },
      {
      name:"PDF",
      route:"PDF",
      icon:"",
      bg:"#C5F422"
      }
    ]
  }
};
</script>
