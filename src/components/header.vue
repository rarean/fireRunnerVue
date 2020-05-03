<template>
    <nb-header>
      <nb-left>
        <nb-button transparent :on-press="openMenu" >
          <nb-icon name="menu" />
        </nb-button>
      </nb-left>
      <nb-body class="centered">
        <nb-title>{{ name }}</nb-title>
      </nb-body>
      <nb-right>
        <nb-button transparent>
          <nb-icon name="flame" />
          <nb-text>FireRunner</nb-text>
        </nb-button>
      </nb-right>
    </nb-header>
</template>

<script>
export default {
  props: {
    name: { Type: String },
    menuPressed: Function
  },
  methods:{
    openMenu:function(){
      this.menuPressed();
    }
  },
  created() {
    //console.log("title.vue", this.props)
  }
};
</script>

<style>
.centered {
  align-items: center;
}
</style>
