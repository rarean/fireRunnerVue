<template v-if="!isAppReady" >
    <view v-if="!isAppReady" class="container">
      <app-loading></app-loading>
    </view>
    <view v-else class="container">
      <app></app>
    </view>
</template>


<script>
import Vue from "vue-native-core";
import { VueNativeBase } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Vuelidate from 'vuelidate';
import App from "./index.vue";

// registering all native-base components to the global scope of the Vue
Vue.use(VueNativeBase);
Vue.use(Vuelidate);

export default {
  components: { App, AppLoading },
  data() {
    return { isAppReady: false };
  },
  created(){
    this.loadFonts();
  },
  methods: {
    async loadFonts(){
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
        });
        this.isAppReady = true;
      } catch (error){
        console.log("something went wrong", error);
        this.isAppReady = true;
      }
    }
  }
};
</script>

<style>
.container {
  flex: 1;
}
</style>
