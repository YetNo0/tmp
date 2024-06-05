<!-- src/components/SeriesCalculator.vue -->
<template>
    <div>
      <h2>Calculate Series</h2>
      <button @click="showDialog">Enter number of terms</button>
      <dialog ref="dialog">
        <form @submit.prevent="calculateSeries">
          <label>
            Number of terms:
            <input type="number" v-model.number="numTerms" required />
          </label>
          <label>
            X:
            <input type="number" v-model.number="x" required />
          </label>
          <label>
            Y:
            <input type="number" v-model.number="y" required />
          </label>
          <button type="submit">Calculate</button>
        </form>
        <button @click="closeDialog">Cancel</button>
      </dialog>
      <div v-if="result !== null">
        <h3>Result: {{ result }}</h3>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        numTerms: 0,
        x: 0,
        y: 0,
        result: null as number | null,
      };
    },
    methods: {
      showDialog() {
        (this.$refs.dialog as HTMLDialogElement).showModal();
      },
      closeDialog() {
        (this.$refs.dialog as HTMLDialogElement).close();
      },
      calculateSeries() {
        this.result = this.calculateExpression(this.numTerms, this.x, this.y);
        this.closeDialog();
      },
      calculateExpression(n: number, x: number, y: number): number {
        let sum = 1;
        for (let k = 2; k <= n + 1; k++) {
          const term = (Math.sin(x) ** k * y ** (2 * k - 3)) / k;
          sum += k % 2 === 0 ? -term : term;
        }
        return sum;
      },
    },
  });
  </script>
  
  <style scoped>
  button {
    margin: 10px;
  }
  dialog {
    border: 1px solid black;
    padding: 10px;
  }
  </style>
  