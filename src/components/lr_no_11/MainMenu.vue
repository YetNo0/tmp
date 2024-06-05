<!-- src/components/MainMenu.vue -->
<template>
    <div>
      <select v-model="selectedA">
        <option v-for="value in aValues" :key="value" :value="value">{{ value }}</option>
      </select>
      <select v-model="selectedB">
        <option v-for="value in bValues" :key="value" :value="value">{{ value }}</option>
      </select>
      <button @click="calculateExpression">Calculate</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        selectedA: 1,
        selectedB: 1,
        aValues: [1, 2, 3, 4, 5],
        bValues: [1, 2, 3, 4, 5],
      };
    },
    methods: {
      calculateExpression() {
        this.$emit('calculate', { a: this.selectedA, b: this.selectedB });
      },
    },
  });
  </script>
  