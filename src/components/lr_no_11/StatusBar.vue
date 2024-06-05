<!-- src/components/StatusBar.vue -->
<template>
    <div>
      <tool-strip-dropdown-button @select="selectOption" />
      <tool-strip-status-label :status="status" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import ToolStripDropdownButton from './ToolStripDropdownButton.vue';
  import ToolStripStatusLabel from './ToolStripStatusLabel.vue';
  
  export default defineComponent({
    components: { ToolStripDropdownButton, ToolStripStatusLabel },
    data() {
      return {
        status: '',
      };
    },
    methods: {
      selectOption(option: string) {
        this.status = option;
      },
    },
  });
  </script>
  