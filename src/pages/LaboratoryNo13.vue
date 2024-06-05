<!-- src/App.vue -->
<template>
  <div>
    <h1>Triangle Area Calculator</h1>
    <TriangleForm @add-triangle="addTriangle" />
    <div v-if="triangles.length > 0">
      <h2>Triangles</h2>
      <ul>
        <li v-for="(triangle, index) in triangles" :key="index">
          A: {{ triangle.a }}, B: {{ triangle.b }}, C: {{ triangle.c }}, Area: {{ calculateArea(triangle).toFixed(2) }}
        </li>
      </ul>
      <h2>Results</h2>
      <p>Triangle with smallest area: A: {{ smallestTriangle?.a }}, B: {{ smallestTriangle?.b }}, C: {{ smallestTriangle?.c }}, Area: {{ smallestArea.toFixed(2) }}</p>
      <p>Triangle with largest area: A: {{ largestTriangle?.a }}, B: {{ largestTriangle?.b }}, C: {{ largestArea.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TriangleForm from '@/components/TriangleForm.vue';

interface Triangle {
  a: number;
  b: number;
  c: number;
}

export default defineComponent({
  components: {
    TriangleForm,
  },
  data() {
    return {
      triangles: [] as Triangle[],
    };
  },
  computed: {
    smallestTriangle(): Triangle | null {
      return this.triangles.reduce((minTriangle, currentTriangle) => {
        return this.calculateArea(currentTriangle) < this.calculateArea(minTriangle) ? currentTriangle : minTriangle;
      }, this.triangles[0]);
    },
    largestTriangle(): Triangle | null {
      return this.triangles.reduce((maxTriangle, currentTriangle) => {
        return this.calculateArea(currentTriangle) > this.calculateArea(maxTriangle) ? currentTriangle : maxTriangle;
      }, this.triangles[0]);
    },
    smallestArea(): number {
      return this.smallestTriangle ? this.calculateArea(this.smallestTriangle) : 0;
    },
    largestArea(): number {
      return this.largestTriangle ? this.calculateArea(this.largestTriangle) : 0;
    },
  },
  methods: {
    addTriangle(triangle: Triangle) {
      this.triangles.push(triangle);
    },
    calculateArea(triangle: Triangle): number {
      const { a, b, c } = triangle;
      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    },
  },
});
</script>
