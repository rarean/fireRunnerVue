<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
          <nb-left>
            <nb-button transparent
              :on-press="() => this.props.navigation.openDrawer()" >
                <nb-icon name="menu" />
            </nb-button>
          </nb-left>
            <title :name="titleName" v-on:handle-menu="()=> console.log('handleMenu')" />
          <nb-right>
            <nb-button transparent>
              <nb-icon name="flame"/>
              <nb-text>FireRunner</nb-text>
             </nb-button>
          </nb-right>
        </nb-header>
            <!--nb-list>
                <item
                    v-if="!loading"
                    v-for="(itemType, types) in items"
                    :data="itemType" />
                <nb-spinner v-if="loading"></nb-spinner>
            </nb-list-->
    <nb-content class="container">
      <nb-form>
        <input-text label="Date" v-model="dateValue" />
        <input-text label="Incident#" v-model="incident" />
        <input-text label="Incident Reported:" v-model="inciReported" />
        <input-text label="Personnel#" v-model="personnelNum" />
        <input-text label="Medic Unit(s)" v-model="medicUnit" />
        <input-text label="Situation Found#" v-model="situation" />
      </nb-form>
      <view class="btn">
        <nb-button rounded large on-press="save">
          <nb-text>Save</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import Item from "../components/item";
import { Dimensions } from "react-native";
import Title from "../components/title";
import InputText from "../components/inputText";
import store from "../store";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default {
  components: { Item, Title, InputText },
  props: { navigation: Object },
  data: function () {
    return {
      dateValue: "",
      incident: "",
      inciReported: "",
      personnelNum: "",
      medicUnit: "",
      situation: ""
    };
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    }
  },
  created() {
    console.log("created", store.state);
    console.log("created2", this.navigation);
    //this.fetchList(store.state.activeType);
  },
  methods: {
    fetchList(type) {
      return store.dispatch("FETCH_LIST_DATA", { type: type });
    },
    onHandleMenu() {
      console.log("handleMenu");
    }
  }
};
</script>

<style>
.container {
  margin: 20;
  padding: 20;
}
.btn {
  margin: 20;
  padding: 20;
  justify-content: center;
  align-items: center;
}
.score {
  width: 40;
  height: 40;
  background-color: #fff;
  border-radius: 20;
  justify-content: center;
  align-items: center;
  margin-right: 16;
}
.score-text {
  color: #ff6600;
  font-weight: bold;
}
.detail {
  flex: 1;
}
.name {
  color: #666;
  font-size: 12;
  margin-bottom: 6;
}
.title {
  color: #333;
  font-size: 14;
}
</style>
