<template>
    <div>
      <calculator />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Calculator from '@/components/lr_no_11/Calculator.vue';
  
  export default defineComponent({
    components: {
      Calculator,
    },
  });
  </script>
  