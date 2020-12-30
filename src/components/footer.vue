<template>
  <nb-footer>
    <nb-left>
      <nb-button transparent :on-press="goBack">
        <nb-icon name="arrow-back" />
      </nb-button>
    </nb-left>
    <nb-body class="center">
      <nb-button transparent :on-press="goHome">
        <nb-icon type="FontAwesome" name="home" />
      </nb-button>
    </nb-body>
    <nb-right>
      <nb-button transparent :on-press="goNext">
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
  methods: {
    goBack() {
      this.backPressed();
    },
    goHome() {
      this.homePressed();
    },
    goNext() {
      this.nextPressed();
    }
  }
};
</script>

<style>
.center {
  align-items: center;
  justify-content: center;
}
</style>
