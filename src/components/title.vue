<template>
  <nb-body class="centered">
    <nb-title>{{ name }}</nb-title>
  </nb-body>
</template>

<script>
export default {
  props: {
    name: { Type: String }
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
