<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <nb-header>
      <nb-left>
        <nb-button transparent
          :on-press="() => this.props.navigation.openDrawer()" >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <title :name="titleName" />
      <nb-right>
        <nb-button transparent>
          <nb-icon name="flame" />
          <nb-text>FireRunner</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>
    <nb-content class="container" v-if="loaded">
      <view class="btn">
        <nb-button rounded large :on-press="createPDF">
          <nb-text>Create PDF</nb-text>
        </nb-button>
      </view>
    </nb-content>
    <nb-spinner v-if="!loaded"></nb-spinner>
    <nb-footer>
      <nb-left>
        <nb-button :on-press="() => this.props.navigation.goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body class="center">
        <nb-button :on-press="() => this.props.navigation.navigate('Home')">
          <nb-icon name="home" />
        </nb-button>
      </nb-body>
      <nb-right>
        <nb-button :on-press="() => this.props.navigation.navigate('PDF')">
          <nb-icon name="arrow-forward" />
        </nb-button>
      </nb-right>
    </nb-footer>
  </nb-container>
</template>

<script>
import React from "react";
import Title from "../components/title";
import store from "../store";

export default {
  components: { Title },
  props: { navigation: Object },
  data: function () {
    return {
      loaded: false,
      title:'File Run Worksheet',
    };
  },
  created() {
    this.loaded = true;
    //console.log("created", store.state);
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
  },
  methods:{
    async createPDF(){
      const title = this.title;
      const html=`<h1>${title}</h1><p>Hello</p>`;
      const options = {
        html: html,
        fileName: 'FRworksheet',
        directory: 'docs',
        height: 800,
        width: 1056,
        padding:24
      };
      console.log("html", options);

      try{
        //await convert(options).then((filePath) =>{
        //  console.log('PDF file', filePath);
        //}).catch((error)=>{
        //  console.log("error", error.message)

        //});
      }catch(error){
        console.log("something wrong", error.message)
        alert("Something went wrong");
      }
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
.center {
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
