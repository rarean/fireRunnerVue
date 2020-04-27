<template>
  <nb-item floatingLabel>
    <nb-label>{{ label }} </nb-label>
    <!--
    <input v-bind:value.sync="value" v-on:"inputListeners" />
    <TextInput onChangeText={text => onChangeText(text)} value={value} />
    -->
    <nb-input v-model.sync="inputVal" />
  </nb-item>
  <!--
  <label>{{label}} </label>
    <input v-bind:value="value" v-on:change="$emit('change', $event.target.value)"/>
    -->
</template>

<script>
export default {
  //inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputVal:{
      get(val){
        return this.value;
      },
      set(val){
        console.log("inputTxt", val);
        ///this.$emit('input', val)
      }
    }
  }
};
</script>

<style></style>
