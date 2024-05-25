<template>
    <div
      class="flex flex-row min-h-screen overflow-hidden p-10"
    >
    <div>
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
    <div>
      <div class="flex items-center">
        <span class="inline-block w-5 h-5 bg-blue-800 rounded-full"></span> - <span class="inline-block text-sm"> Закрашивание произвольной замкнутой области </span>
      </div>
      <div class="flex items-center">
        <span class="inline-block w-5 h-5 bg-red-800 rounded-full"></span> - <span class="inline-block text-sm"> Алгоритм Брезенхэма </span>
      </div>
      <div class="flex items-center">
        <span class="inline-block w-5 h-5 bg-green-800 rounded-full"></span> - <span class="inline-block text-sm"> Прямое вычисление координат </span>
      </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useDrawUtils } from "../composables/drawUtils";
  
  const canvas = ref<HTMLCanvasElement | null>(null);
  const { drawLine, drawLineBresenham, fillArea } = useDrawUtils(canvas);
  
  onMounted(() => {
    if (canvas.value) {
      drawLine({ x1: 50, y1: 50, x2: 200, y2: 200 });
      drawLineBresenham({ x1: 100, y1: 220, x2: 300, y2: 300 });
      fillArea([{ x: 150, y: 150 }, { x: 250, y: 150 }, { x: 250, y: 250 }, { x: 150, y: 250 }]);
    }
  });
  </script>
  