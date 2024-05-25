<script setup lang="ts">
import { Chart, Grid, Line } from 'vue3-charts'
import { Input } from "../components/ui/input";
import { CheckCheck } from "lucide-vue-next";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";


import { computed, type Ref, ref } from "vue";

import { useSearchUtils } from "@/composables/searchUtils"
import { useRandomArray } from "../composables/useRandomArray";
import { useSortUtils } from "@/composables/sortUtils";
const { quickSort } = useSortUtils()


const array: Ref<number[]> = ref([]);
const size = ref(0);
const readyToSelectMethod = ref(false);

const handleDone = () => {
  readyToSelectMethod.value = true;
  let tempArray = useRandomArray(size.value);
  array.value = quickSort(tempArray)
  console.log(array.value)
};

const { useBinarySearch, useBoyerMooreSearch, useInterpolationSearch} = useSearchUtils()


const data:object[] = []
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


let executionTimeBinarySearch: number | undefined, executionTimeInterpolationSearch: number | undefined
const searchNumber = ref(0)
const searchMessage = ref('')
const handleSearch = () => {
    searchMessage.value = '';
    const numberOfIterations = 100; // Количество повторений для усреднения времени выполнения

    // Для бинарного поиска
    let totalExecutionTimeBinarySearch = 0;
    for (let i = 0; i < numberOfIterations; i++) {
        const startTimeBinarySearch = performance.now();
        const rez = useBinarySearch(array.value, Number(searchNumber.value));
        const endTimeBinarySearch = performance.now();
        totalExecutionTimeBinarySearch += (endTimeBinarySearch - startTimeBinarySearch) * 1000;
    }
    const averageExecutionTimeBinarySearch = totalExecutionTimeBinarySearch / numberOfIterations;
    console.log('Average execution time for binary search:', averageExecutionTimeBinarySearch);

    let rezultSearch:number = 0
    let totalExecutionTimeInterpolationSearch = 0;
    for (let i = 0; i < numberOfIterations; i++) {
        const startTimeInterpolationSearch = performance.now();
        rezultSearch = useInterpolationSearch(array.value, Number(searchNumber.value));
        const endTimeInterpolationSearch = performance.now();
        totalExecutionTimeInterpolationSearch += (endTimeInterpolationSearch - startTimeInterpolationSearch) * 1000;
    }
    const averageExecutionTimeInterpolationSearch = totalExecutionTimeInterpolationSearch / numberOfIterations;
    console.log('Average execution time for interpolation search:', averageExecutionTimeInterpolationSearch);

    const interval1 = (totalExecutionTimeBinarySearch !== undefined) ? totalExecutionTimeBinarySearch / 5 : 0;
    const interval2 = (totalExecutionTimeInterpolationSearch !== undefined) ? totalExecutionTimeInterpolationSearch / 5 : 0;
    if (rezultSearch === -1) {
        searchMessage.value = 'Такого элемента в массиве нет, попробуйте другой'
    } else {
        searchMessage.value = `Элемент находится в массиве под индексом ${rezultSearch} (под номером ${rezultSearch + 1})`
    }
    // Добавить значения в массив данных для графика
    for (let i = 0; i < 5; i++) {
        data.push({
        t: i,
        time1: interval1 * (i + 1),
        time2: interval2 * (i + 1),
        });
    }
}


const str = ref('');
const pattern = ref('');
const strSearchMessage = ref('')
const handleStrSearch = () => {
    const rezultSearch = useBoyerMooreSearch(str.value, pattern.value)
    if (rezultSearch === -1) {
        strSearchMessage.value = 'Такого паттерна нет в строке, попробуйте другой.'
    } else {
        strSearchMessage.value = `Начало паттерна приходится на индекс ${rezultSearch} или на номер ${rezultSearch + 1}`
    }
}
</script>

<template>
    <div
      class="flex flex-col min-h-screen overflow-hidden p-10 gap-5"
    >
        <div
            class="flex flex-row justify-between"
        >
            <div
                class="flex flex-col gap-5"
            >
                <div class="flex flex-row gap-2">
                    <div
                        class="flex flex-row w-[200px] gap-3"
                    >
                        <Input type="number" v-model="size" class="mb-2" placeholder="Введите размерность" />
                        <Button @click="handleDone">
                            <CheckCheck />
                        </Button>
                    </div>
                    <div
                        v-if="readyToSelectMethod === true"
                    >
                        <span
                            class="text-sm font-bold"
                        >
                            Исходный массив:
                        </span>
                        <div
                            class="w-[150px] flex flex-row overflow-x-auto"
                        >
                            <span
                            v-for="(i, index) in array"
                            :key="index"
                            class="text-sm mr-1.5"
                        >
                            {{ i }}
                        </span>
                        </div>
                    </div>
                </div>
                <div
                    class="w-[200px] flex flex-col"
                    v-if="readyToSelectMethod === true"
                >   
                    <div
                        class="flex gap-3"
                    >
                        <Input v-model="searchNumber" placeholder="Введите искомый элемент для массива"/>
                        <Button @click="handleSearch">
                            <CheckCheck />
                        </Button>
                    </div>
                    <div>
                        {{ searchMessage }}
                    </div>
                </div>
                <div class="flex flex-col gap-3 w-[400px]">
                    <Input v-model="str" type="string" placeholder="Введите строку, по которой будет поиск"/>
                    <div class="flex flex-row gap-3">
                        <Input v-model="pattern" type="string" placeholder="Введите паттерн, который нужно искать"/>
                        <Button @click="handleStrSearch">
                            <CheckCheck />
                        </Button>
                    </div>
                    {{ strSearchMessage }}
                </div>
            </div>
            <div
                class="flex flex-col"
            >
            <div
                    v-if="data.length > 0"
                    class="flex flex-row"
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
                        <Line :dataKeys="['t', 'time1']" :lineStyle="{ stroke: 'red' }"/>
                        <Line :dataKeys="['t', 'time2']" :lineStyle="{ stroke: 'green' }"/>
                        </template>

                    </Chart>
                    <div>
                        <div class="flex items-center">
                        </div>
                        <div class="flex items-center">
                            <span class="inline-block w-5 h-5 bg-red-800 rounded-full"></span> - <span class="inline-block text-sm"> Бинарный поиск </span>
                        </div>
                        <div class="flex items-center">
                            <span class="inline-block w-5 h-5 bg-green-800 rounded-full"></span> - <span class="inline-block text-sm"> Интерполяционный поиск </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>