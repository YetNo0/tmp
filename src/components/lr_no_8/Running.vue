<template>
    <div>
      <h2>Running Algorithm</h2>
      <textarea v-model="inputText" placeholder="Enter text to compress/decompress"></textarea>
      <button @click="compress">Compress</button>
      <button @click="decompress">Decompress</button>
      <p>Output: {{ outputText }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      const inputText = ref('');
      const outputText = ref('');
  
      const compress = () => {
        let compressed = '';
        for (let i = 0; i < inputText.value.length; i++) {
          let count = 1;
          while (i + 1 < inputText.value.length && inputText.value[i] === inputText.value[i + 1]) {
            i++;
            count++;
          }
          compressed += inputText.value[i] + count.toString();
        }
        outputText.value = compressed;
      };
  
      const decompress = () => {
        let decompressed = '';
        for (let i = 0; i < inputText.value.length; i++) {
          let char = inputText.value[i];
          let count = '';
          while (i + 1 < inputText.value.length && !isNaN(Number(inputText.value[i + 1]))) {
            count += inputText.value[i + 1];
            i++;
          }
          decompressed += char.repeat(Number(count));
        }
        outputText.value = decompressed;
      };
  
      return {
        inputText,
        outputText,
        compress,
        decompress,
      };
    },
  });
  </script>
  