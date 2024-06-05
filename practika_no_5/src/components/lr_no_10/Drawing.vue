<!-- src/components/Drawing.vue -->
<template>
    <div>
      <svg width="400" height="400" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <rect
          v-for="(region, index) in regions"
          :key="index"
          :x="region.x"
          :y="region.y"
          :width="region.width"
          :height="region.height"
          :fill="region.color"
          @click="pickColor(index)"
        />
        <text
          v-for="(label, index) in labels"
          :key="index"
          :x="label.x"
          :y="label.y"
          :fill="label.color"
          :font-size="label.fontSize"
          :style="{ cursor: 'move' }"
          @mousedown="startDrag(index, $event)"
        >
          {{ label.text }}
        </text>
      </svg>
      <input type="color" ref="colorPicker" @input="changeColor" style="display: none" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  
  interface Region {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }
  
  interface Label {
    x: number;
    y: number;
    text: string;
    color: string;
    fontSize: number;
  }
  
  export default defineComponent({
    setup() {
      const regions = reactive<Region[]>([
        { x: 50, y: 50, width: 100, height: 100, color: 'red' },
        { x: 200, y: 50, width: 100, height: 100, color: 'blue' },
      ]);
  
      const labels = reactive<Label[]>([
        { x: 50, y: 200, text: 'Label 1', color: 'black', fontSize: 16 },
        { x: 200, y: 200, text: 'Label 2', color: 'black', fontSize: 16 },
      ]);
  
      const selectedRegion = ref<number | null>(null);
      const isDragging = ref(false);
      const dragIndex = ref<number | null>(null);
      const offsetX = ref(0);
      const offsetY = ref(0);
  
      const handleMouseMove = (event: MouseEvent) => {
        if (selectedRegion.value !== null) {
          const region = regions[selectedRegion.value];
          region.color = 'green';
        }
  
        if (isDragging.value && dragIndex.value !== null) {
          labels[dragIndex.value].x = event.clientX - offsetX.value;
          labels[dragIndex.value].y = event.clientY - offsetY.value;
        }
      };
  
      const handleMouseLeave = () => {
        if (selectedRegion.value !== null) {
          const region = regions[selectedRegion.value];
          region.color = 'red';
        }
        selectedRegion.value = null;
      };
  
      const pickColor = (index: number) => {
        selectedRegion.value = index;
        (refs.colorPicker as HTMLInputElement).click();
      };
  
      const changeColor = (event: Event) => {
        if (selectedRegion.value !== null) {
          const color = (event.target as HTMLInputElement).value;
          regions[selectedRegion.value].color = color;
        }
      };
  
      const startDrag = (index: number, event: MouseEvent) => {
        isDragging.value = true;
        dragIndex.value = index;
        offsetX.value = event.offsetX;
        offsetY.value = event.offsetY;
      };
  
      onMounted(() => {
        document.addEventListener('mouseup', () => {
          isDragging.value = false;
          dragIndex.value = null;
        });
      });
  
      return {
        regions,
        labels,
        handleMouseMove,
        handleMouseLeave,
        pickColor,
        changeColor,
        startDrag,
      };
    },
  });
  </script>
  