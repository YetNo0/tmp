<!-- src/components/Calculator.vue -->
<template>
    <div>
      <main-menu @calculate="handleCalculate" />
      <context-menu @select="handleContextMenu" />
      <status-bar :status="status" />
      <div>
        <label>
          x: <input v-model.number="x" type="number" />
        </label>
        <label>
          y: <input v-model.number="y" type="number" />
        </label>
        <label>
          z: <input v-model.number="z" type="number" />
        </label>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import MainMenu from './MainMenu.vue';
  import ContextMenu from './ContextMenu.vue';
  import StatusBar from './StatusBar.vue';
  
  export default defineComponent({
    components: { MainMenu, ContextMenu, StatusBar },
    data() {
      return {
        x: 0,
        y: 0,
        z: 0,
        status: '',
      };
    },
    methods: {
      handleCalculate({ a, b }: { a: number; b: number }) {
        const result = (a * this.z + b * this.y + Math.sin(this.z)) / (a + b);
        this.status = `Result: ${result}`;
        document.title = `Result: ${result}`;
      },
      handleContextMenu(option: string) {
        if (option === 'option1') {
          this.status = `z = sqrt(x^3 - y^2)`;
          this.z = Math.sqrt(this.x ** 3 - this.y ** 2);
        } else if (option === 'option2') {
          this.status = `z = sin(x)`;
          this.z = Math.sin(this.x);
        }
      },
    },
  });
  </script>
  