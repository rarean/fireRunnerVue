<template>
  <!--view class="container">
    <text class="text-color-primary">My Vue Native App</text>
  </view-->
  <setup></setup>
</template>
<script>
import Setup from "./src/setup.vue";

export default {
  components: {Setup}
};
</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>
