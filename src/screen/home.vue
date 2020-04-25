<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
          <nb-left>
            <nb-button transparent
              :on-press="() => this.props.navigation.openDrawer()" >
                <nb-icon name="menu" />
            </nb-button>
          </nb-left>
            <title :name="titleName"/>
          <nb-right />
        </nb-header>
        <nb-content>
            <nb-list>
                <!--item
                    v-if="!loading"
                    v-for="(itemType, types) in items"
                    :data="itemType" />
                <nb-spinner v-if="loading"></nb-spinner-->
            </nb-list>
        </nb-content>
    </nb-container>
</template>

<script>
import React from 'react';
import Item from '../components/item';
import { Dimensions } from 'react-native';
import Title from "../components/title";
import store from '../store';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  components: { Item, Title },
  props: { navigation: Object },
  computed: {
    titleName(){
      return this.navigation.state.routeName;
    },
    //items () {
    //  console.log("items", store.state.posts);
    //  return store.state.posts;
    //},
    //loading () {
    //  console.log("loading", store.state.loadingPosts);
    //    return store.state;
    //}
  },
  created () {
    console.log("created",store.state);
    console.log("created2", this.navigation);
    console.log("created3", this.$props)
    //this.fetchList(store.state.activeType);
  },
  methods: {
    handleMenuBtn: function(){
      console.log("slideDrawer", this.$props.navigation)
      this.navigation.openDrawer();
    },
    fetchList (type) {
      return store.dispatch('FETCH_LIST_DATA', { type: type });
    }
  }
};
</script>
