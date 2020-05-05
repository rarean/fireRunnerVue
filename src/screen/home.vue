<template>
  <nb-container v-if="loaded" :style="{ backgroundColor: '#fff' }">
    <header :name="titleName" :menu-pressed="onMenu" />
    <nb-content :style="{ margin: 20, padding: 20 }">
      <nb-form>
        <nb-list-item
          v-for="input in inputs"
          :key="input.mutate"
          class="lister"
        >
          <input-text :mutation="input.mutate" :floater="input.label" />
        </nb-list-item>
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
import React from "react";
import { Toast } from "native-base";
//import { required } from "vuelidate/lib/validators";
import store from "../store";
import Header from "../components/header";
import InputText from "../components/inputText";
//Vue.set(obj, 'new prop', 123)
//state.obj = { ...state.obj, newProp: 123 } //spread operator

export default {
  components: { Header, InputText },
  props: { navigation: { type: Object } },
  data: function () {
    return {
      loaded: false,
      inputs: [
        {
          label: "First Name",
          mutate: "updateFname"
        },
        {
          label: "Last Name",
          mutate: "updateLname"
        }
      ]
    };
  },
  created() {
    this.loaded = true;
  },
  methods: {
    onMenu: function () {
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
  },
  computed: {
    logging_in() {
      return store.state.logging_in;
    },
    titleName() {
      return this.navigation.state.routeName;
    }
  }
};
</script>

<style>
.btn {
  margin: 20;
  padding: 20;
  justify-content: center;
  align-items: center;
}
.lister {
  border-color: "rgba(255,255,255,1)";
}
</style>
