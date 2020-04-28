<template>
  <nb-container :style="{ flex: 1, backgroundColor: '#fff' }">
    <nb-header>
      <nb-left>
        <nb-button transparent
          :on-press="() => this.props.navigation.openDrawer()" >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <title
        :name="titleName"
        v-on:handle-menu="() => console.log('handleMenu')"
      />
      <nb-right>
        <nb-button transparent>
          <nb-icon name="flame" />
          <nb-text>FireRunner</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>
    <!--nb-list>
                <item
                    v-if="!loaded"
                    v-for="(itemType, types) in items"
                    :data="itemType" />
                <nb-spinner v-if="loaded"></nb-spinner>
            </nb-list-->
    <nb-content class="container" v-if="loaded">
      <nb-form>
        <nb-item floatingLabel>
          <nb-label>Date </nb-label>
          <nb-input v-model="date" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Incident #</nb-label>
          <nb-input v-model="incidentNum" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Incident Reported</nb-label>
          <nb-input v-model="incidentRep" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Personnel # </nb-label>
          <nb-input v-model="personnelNum" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Medic Unit(s) </nb-label>
          <nb-input v-model="medicUnits" />
        </nb-item>
        <nb-item floatingLabel>
          <nb-label>Situation Found </nb-label>
          <nb-input v-model="situation" />
        </nb-item>
      </nb-form>
      <view class="btn">
        <nb-button rounded large :on-press="save">
          <nb-text>Save</nb-text>
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
      loaded: false
    };
  },
  created() {
    this.loaded = true;
    console.log("created", store.state);
    //this.fetchList(store.state.activeType);
  },
  computed: {
    titleName() {
      return this.navigation.state.routeName;
    },
    date: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntDate", val);
      }
    },
    incidentNum: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntNum", val);
      }
    },
    incidentRep: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntRep", val);
      }
    },
    personnelNum: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntPerson", val);
      }
    },
    medicUnits: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntMedic", val);
      }
    },
    situation: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit("updtIncdntSituation", val);
      }
    }
  },
  methods: {
    fetchList(type) {
      //return store.dispatch("FETCH_LIST_DATA", { type: type });
    },
    save() {
      console.log("save", store.state);
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
