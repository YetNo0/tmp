<!-- src/components/ToolStripDropdownButton.vue -->
<template>
    <select v-model="selectedOption" @change="emitSelect">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        selectedOption: 'option1',
      };
    },
    methods: {
      emitSelect() {
        this.$emit('select', this.selectedOption);
      },
    },
  });
  </script>
  