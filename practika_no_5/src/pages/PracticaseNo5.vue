<script setup lang="ts">
import { Chart, Grid, Line } from 'vue3-charts'
import { Input } from "@/components/ui/input";
import { CheckCheck } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


import { computed, type Ref, ref } from "vue";
import { useRandomArray } from "@/composables/useRandomArray";
import { useSortUtils } from "@/composables/sortUtils";
const { quickSort, shellSort, heapSort } = useSortUtils()


const size = ref(0);
const readyToSelectMethod = ref(false);
const randomArray: Ref<number[]> = ref([]);
let arrayShellSort: Ref<number[]> = ref([]);
let arrayQuickSort: Ref<number[]> = ref([]);
let arrayHeapSort: Ref<number[]> = ref([]);
let executionTimeQuickSort: number | undefined, executionTimeShellSort: number | undefined, executionTimeHeapSort: number | undefined;

const handleDone = () => {
  readyToSelectMethod.value = true;
  randomArray.value = useRandomArray(size.value);
};

const data:object[] = []
const handleSort = () => {
  if (document.getElementById('quick')?.ariaChecked === 'true') {
    const startTimeQuickSort = performance.now();
    arrayQuickSort.value = quickSort(randomArray.value);
    const endTimeQuickSort = performance.now();
    executionTimeQuickSort = (endTimeQuickSort - startTimeQuickSort) * 1000;
  }
  if (document.getElementById('shell')?.ariaChecked === 'true') {
    const startTimeShellSort = performance.now();
    arrayShellSort.value = shellSort(randomArray.value);
    const endTimeShellSort = performance.now();
    executionTimeShellSort = (endTimeShellSort - startTimeShellSort) * 1000;
  }
  if (document.getElementById('heap')?.ariaChecked === 'true') {
    const startTimeHeapSort = performance.now();
    arrayHeapSort.value = heapSort(randomArray.value);
    const endTimeHeapSort = performance.now();
    executionTimeHeapSort = (endTimeHeapSort - startTimeHeapSort) * 1000;
  }
  const interval1 = (executionTimeQuickSort !== undefined) ? executionTimeQuickSort / 5 : 0;
  const interval2 = (executionTimeShellSort !== undefined) ? executionTimeShellSort / 5 : 0;
  const interval3 = (executionTimeHeapSort !== undefined) ? executionTimeHeapSort / 5 : 0;

  // Добавить значения в массив данных для графика
  for (let i = 0; i < 5; i++) {
    data.push({
      t: i,
      time1: interval1 * (i + 1),
      time2: interval2 * (i + 1),
      time3: interval3 * (i + 1)
    });
  }
  console.log(data)
};

const axis = ref({
  primary: {
    type: 'band',
    format: (val: string) => {
      if (val === 'Feb') {
        return '😜'
      }
      return val
    }
  },
  secondary: {
    type: 'linear',
    ticks: 8
  }
})


const direction = ref('horizontal')
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
})

</script>

<template>
  <div
      class="flex flex-col min-h-screen overflow-hidden p-10"
  >
    <div class="flex flex-row items-start justify-between">
      <div>
        <div class="flex flex-row">
          <Input type="number" v-model="size" class="mb-2" placeholder="Введите размерность" />
          <Button @click="handleDone">
            <CheckCheck />
          </Button>
        </div>
        <div v-if="readyToSelectMethod">
          <span>Каким способом сортировать?</span>
          <div class="flex flex-col gap-2">
            <div>
              <Checkbox id="quick" />
              <label for="quick" class="text-sm font-medium leading-none">Быстрая сортировка</label>
            </div>
            <div>
              <Checkbox id="heap" />
              <label for="heap" class="text-sm font-medium leading-none">Пирамидальная сортировка</label>
            </div>
            <div>
              <Checkbox id="shell" />
              <label for="shell" class="text-sm font-medium leading-none">Сортировка Шелла</label>
            </div>
          </div>
          <Button @click="handleSort">Сортировать</Button>
        </div>
      </div>
      <div
          class="flex flex-col w-[500px] overflow-x-auto"
      >
        <div
            class="flex flex-row"
            v-if="randomArray.length"
        >
          Изначальный массив:
          <span
              v-for="(i, index) in randomArray"
              :key="index"
          >
          {{ i }},
        </span>
        </div>
        <div
            class="flex flex-row"
            v-if="arrayQuickSort.length"
        >
          Быстрая сортировка:
          <span
              v-for="(i, index) in arrayQuickSort"
              :key="index"
          >
          {{ i }},
        </span>
        </div>
        <div
            class="flex flex-row"
            v-if="arrayShellSort.length"
        >
          Сортировка Шелла:
          <span
              v-for="(i, index) in arrayShellSort"
              :key="index"
          >
          {{ i }},
        </span>
        </div>
        <div
            class="flex flex-row"
            v-if="arrayHeapSort.length"
        >
          Пирамидальная сортировка:
          <span
              v-for="(i, index) in arrayHeapSort"
              :key="index"
          >
          {{ i }},
        </span>
        </div>
      </div>
    </div>
    <div
        v-if="data.length > 0"
    >
      <Chart
          :size="{ width: 500, height: 400 }"
          :data="data"
          :margin="margin"
          :direction="direction"
          :axis="axis">
      >

        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Line :dataKeys="['t', 'time1']" :lineStyle="{ stroke: 'blue' }"/>
          <Line :dataKeys="['t', 'time2']" :lineStyle="{ stroke: 'green' }"/>
          <Line :dataKeys="['t', 'time3']" :lineStyle="{ stroke: 'red' }"/>
        </template>

      </Chart>
    </div>
  </div>
</template>
