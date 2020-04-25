<template>
  <nb-item floatingLabel>
    <nb-label>{{ label }}</nb-label>
    <nb-input v-bind="$attrs" v-bind:value="value" v-on:"inputListeners" />
  </nb-item>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["label", "value"],
  computed: {
    inputListeners: function () {
      var that = this;
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          that.$emit("input", event.target.value);
        }
      });
    }
  }
};
</script>

<style></style>
