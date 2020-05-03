<template>
  <nb-container v-if="loaded" :style="{ backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu"/>
    <nb-content :style="{ margin: 20, padding: 20 }">
      <nb-form>
        <nb-item floatingLabel>
          <nb-label>First Name </nb-label>
          <nb-input v-model="fname" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Last Name </nb-label>
          <nb-input v-model="lname" />
        </nb-item>
      </nb-form>
      <view class="btn">
        <nb-button large rounded :on-press="login">
          <nb-text class="center">New Worksheet</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
  <nb-spinner v-if="!loaded"></nb-spinner>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { Toast } from "native-base";
//import launchScreenBg from "../../assets/launchscreen-bg.png";
//import launchscreenLogo from "../../assets/logo-kitchen-sink.png";
//import { required } from "vuelidate/lib/validators";
import store from "../store";
import Header from "../components/header";

//Vue.set(obj, 'new prop', 123)
//state.obj = { ...state.obj, newProp: 123 } //spread operator

export default {
  components: { Header },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    logging_in() {
      return store.state.logging_in;
    },
    titleName() {
      return this.navigation.state.routeName;
    },
    fname: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateFname", val);
      }
    },
    lname: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updateLname", val);
      }
    }
  },
  data: function () {
    return {
      loaded: false
    };
  },
  created() {
    this.loaded = true;
  },
  methods: {
    onMenu: function(){
      this.navigation.openDrawer();
    },
    login() {
      const usr = store.state.userObj;
      if (usr.fname && usr.lname) {
        store.commit("LOGGING_IN", true);
        this.navigation.navigate("Incident");
      } else {
        Toast.show({
          text: "First and Last Name Required",
          buttonText: "Okay"
        });
      }
    }
  }
    // AsyncStorage.getItem('fname').then((val) => {
    //   if (val) {
    //     this.loaded = true
    //     this.navigation.navigate('Incident')
    //     store.dispatch('SET_USER', {userObj: {fname: val}})
    //   } else {
    //   }
    // });
};
</script>

<style>
.btn {
  margin: 20;
  padding: 20;
  justify-content: center;
  align-items: center;
}
</style>
