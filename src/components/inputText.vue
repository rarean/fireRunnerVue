<template>
  <nb-item floatingLabel>
    <nb-label>{{ floater }} </nb-label>
    <nb-input v-model="model" />
  </nb-item>
</template>

<script>
import store from "../store";

export default {
  props: ["floater", "mutation"],
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        store.commit(this.mutation, val);
      }
    }
  }
};
</script>
