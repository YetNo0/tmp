<!-- src/App.vue -->
<template>
    <div>
      <Drawing />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Drawing from '@/components/lr_no_10/Drawing.vue';
  
  export default defineComponent({
    components: {
      Drawing,
    },
  });
  </script>
  