<!-- src/components/ToolStripStatusLabel.vue -->
<template>
    <span>{{ status }}</span>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      status: {
        type: String,
        required: true,
      },
    },
  });
  </script>
  