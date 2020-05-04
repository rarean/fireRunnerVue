<template>
    <nb-footer>
      <nb-left>
        <nb-button :on-press="goBack" >
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body class="center">
        <nb-button :on-press="goHome" >
          <nb-icon name="home" />
        </nb-button>
      </nb-body>
      <nb-right>
        <nb-button :on-press="goNext" >
          <nb-icon name="arrow-forward" />
        </nb-button>
      </nb-right>
    </nb-footer>
</template>

<script>
export default {
  props: {
    homePressed: Function,
    backPressed: Function,
    nextPressed: Function
  },
  methods:{
    goBack:function(){
      this.backPressed();
    },
    goHome:function(){
      this.homePressed();
    },
    goNext:function(){
      this.nextPressed();
    }
  },
  created() {
    //console.log("title.vue", this.props)
  }
};
</script>

<style>
.center {
  align-items: center;
  justify-content: center;
}
</style>
