<template>
    <div>
      <h2>Add Triangle</h2>
      <form @submit.prevent="addTriangle">
        <label>
          Side A:
          <input type="number" v-model.number="a" required />
        </label>
        <label>
          Side B:
          <input type="number" v-model.number="b" required />
        </label>
        <label>
          Side C:
          <input type="number" v-model.number="c" required />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        a: 0,
        b: 0,
        c: 0,
      };
    },
    methods: {
      addTriangle() {
        this.$emit('add-triangle', { a: this.a, b: this.b, c: this.c });
        this.a = 0;
        this.b = 0;
        this.c = 0;
      },
    },
  });
  </script>
  