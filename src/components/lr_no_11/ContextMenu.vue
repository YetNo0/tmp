<!-- src/components/ContextMenu.vue -->
<template>
    <div @contextmenu.prevent="showMenu($event)">
      <div v-if="menuVisible" :style="{ position: 'absolute', top: menuY + 'px', left: menuX + 'px' }">
        <ul>
          <li @click="selectOption('option1')">Option 1</li>
          <li @click="selectOption('option2')">Option 2</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        menuVisible: false,
        menuX: 0,
        menuY: 0,
      };
    },
    methods: {
      showMenu(event: MouseEvent) {
        this.menuVisible = true;
        this.menuX = event.clientX;
        this.menuY = event.clientY;
      },
      selectOption(option: string) {
        this.menuVisible = false;
        this.$emit('select', option);
      },
    },
  });
  </script>
  