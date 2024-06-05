<template>
    <div>
      <Running />
      <LZW />
      <Huffman />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Running from '@/components/lr_no_8/Running.vue';
  import LZW from '@/components/lr_no_8/LZW.vue';
  import Huffman from '@/components/lr_no_8/Huffman.vue';
  
  export default defineComponent({
    components: {
      Running,
      LZW,
      Huffman,
    },
  });
  </script>
  