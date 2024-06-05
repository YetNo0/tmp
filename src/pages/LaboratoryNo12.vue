<template>
    <div>
      <SeriesCalculator />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import SeriesCalculator from '@/components/SeriesCalculator.vue';
  
  export default defineComponent({
    components: {
      SeriesCalculator,
    },
  });
  </script>

  