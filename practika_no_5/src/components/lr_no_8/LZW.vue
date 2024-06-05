<template>
    <div>
      <h2>LZW Algorithm</h2>
      <textarea v-model="inputText" placeholder="Enter text to encode/decode"></textarea>
      <label for="bitSize">Bit Size:</label>
      <input type="number" v-model.number="bitSize" min="10" max="16" />
      <button @click="encode">Encode</button>
      <button @click="decode">Decode</button>
      <p>Output: {{ outputText }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      const inputText = ref('');
      const outputText = ref('');
      const bitSize = ref(12);
  
      const encode = () => {
        const dict: { [key: string]: number } = {};
        let data = inputText.value.split('');
        let out = [];
        let dictSize = 256;
        for (let i = 0; i < 256; i++) {
          dict[String.fromCharCode(i)] = i;
        }
        let w = '';
        for (let i = 0; i < data.length; i++) {
          let c = data[i];
          let wc = w + c;
          if (dict[wc] !== undefined) {
            w = wc;
          } else {
            out.push(dict[w]);
            dict[wc] = dictSize++;
            w = c;
          }
        }
        if (w !== '') {
          out.push(dict[w]);
        }
        outputText.value = out.map(code => String.fromCharCode(code)).join('');
      };
  
      const decode = () => {
        const dict: { [key: number]: string } = {};
        let data = inputText.value.split('').map(char => char.charCodeAt(0));
        let dictSize = 256;
        for (let i = 0; i < 256; i++) {
          dict[i] = String.fromCharCode(i);
        }
        let w = String.fromCharCode(data[0]);
        let result = w;
        for (let i = 1; i < data.length; i++) {
          let entry;
          let k = data[i];
          if (dict[k]) {
            entry = dict[k];
          } else if (k === dictSize) {
            entry = w + w[0];
          } else {
            throw new Error('Invalid LZW data.');
          }
          result += entry;
          dict[dictSize++] = w + entry[0];
          w = entry;
        }
        outputText.value = result;
      };
  
      return {
        inputText,
        outputText,
        bitSize,
        encode,
        decode,
      };
    },
  });
  </script>
  