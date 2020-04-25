<template>
  <nb-container v-if="loaded" :style="{backgroundColor: '#fff'}">
      <nb-header>
          <title :name="titleName"/>
      </nb-header>
      <nb-content padder>
        <nb-form>
            <nb-item :error="!$v.fnameValue.required && $v.fnameValue.$dirty">
              <nb-input placeholder="First Name" v-model="fnameValue" auto-capitalize="none" :on-blur="() => $v.fnameValue.$touch()"/>
            </nb-item>
            <nb-item last :error="!$v.password.required && $v.password.$dirty">
              <nb-input placeholder="Last Name" v-model="password" auto-capitalize="none" :on-blur="() => $v.password.$touch()" />
            </nb-item>
          </nb-form>
          <view :style="{marginTop:10}">
            <nb-button block :on-press="login">
              <nb-spinner v-if="logging_in" size="small" />
              <nb-text>New Worksheet</nb-text>
            </nb-button>
          </view>
      </nb-content>
  </nb-container>
  <nb-spinner v-if="!loaded"></nb-spinner>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { Toast } from 'native-base';
import launchScreenBg from "../../assets/launchscreen-bg.png";
import launchscreenLogo from "../../assets/logo-kitchen-sink.png";
import { required } from 'vuelidate/lib/validators'
import store from '../store';
import Title from "../components/title";

export default {
  components: { Title },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    logging_in () {
      return store.state.logging_in;
    },
    titleName(){
      return this.navigation.state.routeName;
    }
  },
  validations: {
    fnameValue: {
      required
    },
    password: {
      required
    }
  },
  data: function() {
    return {
      fnameValue: '',
      password: '',
      loaded: false
    };
  },
  created() {
      console.log("Login",this.navigation);
    AsyncStorage.getItem('fname').then((val) => {
      if (val) {
        this.loaded = true
        this.navigation.navigate('Home')
        store.dispatch('SET_USER', {userObj: {fname: val}})
      } else {
        this.loaded = true
      }
    });
  },
  methods: {
    login() {
      if (this.fnameValue && this.password) {
        store.dispatch('LOGIN', {
          userObj: {fname: this.fnameValue},
          navigate: this.navigation.navigate
        });
      } else {
        Toast.show({
          text: 'First and Last Name Required',
          buttonText: 'Okay'
        })
      }
    }
  }
};
</script>
