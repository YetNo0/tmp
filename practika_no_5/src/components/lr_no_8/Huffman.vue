<template>
    <div>
      <h2>Huffman Algorithm</h2>
      <textarea v-model="inputText" placeholder="Enter text to encode/decode"></textarea>
      <button @click="encode">Encode</button>
      <button @click="decode">Decode</button>
      <p>Output: {{ outputText }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  class Node {
    constructor(public char: string, public freq: number, public left: Node | null = null, public right: Node | null = null) {}
  }
  
  const buildHuffmanTree = (text: string) => {
    const freqMap: { [key: string]: number } = {};
    for (const char of text) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    const nodes = Object.entries(freqMap).map(([char, freq]) => new Node(char, freq));
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);
      const left = nodes.shift()!;
      const right = nodes.shift()!;
      const newNode = new Node('', left.freq + right.freq, left, right);
      nodes.push(newNode);
    }
    return nodes[0];
  };
  
  const buildCodes = (node: Node, prefix: string, codes: { [key: string]: string }) => {
    if (node.char !== '') {
      codes[node.char] = prefix;
    }
    if (node.left) buildCodes(node.left, prefix + '0', codes);
    if (node.right) buildCodes(node.right, prefix + '1', codes);
  };
  
  export default defineComponent({
    setup() {
      const inputText = ref('');
      const outputText = ref('');
      const codes = ref<{ [key: string]: string }>({});
  
      const encode = () => {
        const root = buildHuffmanTree(inputText.value);
        codes.value = {};
        buildCodes(root, '', codes.value);
        outputText.value = inputText.value.split('').map(char => codes.value[char]).join('');
      };
  
      const decode = () => {
        let result = '';
        let node = root;
        for (const bit of inputText.value) {
          node = bit === '0' ? node.left! : node.right!;
          if (node.char) {
            result += node.char;
            node = root;
          }
        }
        outputText.value = result;
      };
  
      return {
        inputText,
        outputText,
        encode,
        decode,
      };
    },
  });
  </script>
  