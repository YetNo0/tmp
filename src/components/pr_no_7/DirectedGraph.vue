<template>
  <div
    class="flex flex-col gap-5"
  >
    <div class="flex flex-row gap-3">
      <Button @click="addVertex">Добавить вершину</Button>
      <Button @click="addEdge">Создать связь</Button>
      <Button @click="removeVertex">Удалить вершину</Button>
      <Button @click="showGraphInfo">Показать информацию</Button>
      <Button @click="saveToFile">Сохранить в файл</Button>
      <Input type="file" ref="fileInput" @change="loadFromFile"/>
    </div>
    <div class="flex flex-row gap-3" v-if="$route.fullPath === '/lr_no_7'">
      <Button @click="depthFirstSearch">Обход в глубину</Button>
      <Button @click="breadthFirstSearch">Обход по уровням</Button>
      <Button @click="dijkstra">Поиск кратчайшего расстояния</Button>
      <Button @click="minimumSpanningTree">МОД</Button>
    </div>
    <div
      class="flex flex-col gap-3"
    >
      <div>

      </div>
    </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {Input} from '@/components/ui/input'
  import {Button} from '@/components/ui/button'
  import { ref, type Ref } from 'vue';
  import DirectedGraph from '../../types/DirectedGraph';
  
      const graph = new DirectedGraph();
      const addVertex = () => {
        const vertexId = prompt('Введите вершину:');
        if (vertexId !== null) {
          graph.addVertex(vertexId);
        }
      };
  
      const addEdge = () => {
        const startVertex = prompt('Введите начальную вершину:');
        const endVertex = prompt('Введите конечную вершину:');
        if (startVertex !== null && endVertex !== null) {
          graph.addEdge(startVertex, endVertex);
        }
      };
  
      const removeVertex = () => {
        const vertexId = prompt('Введите вершину для удаления:');
        if (vertexId !== null) {
          graph.removeVertex(vertexId);
        }
      };

      const depthFirstSearch = () => {
        const vertexId = prompt('Введите вершину обхода в глубину:');
        if (vertexId !== null) {
          graph.depthFirstSearch(vertexId);
        }
      };
      const breadthFirstSearch = () => {
        const vertexId = prompt('Введите вершину для обхода по уровням:');
        if (vertexId !== null) {
          graph.breadthFirstSearch(vertexId);
        }
      };
      const minimumSpanningTree = () => {
        const vertexId = prompt('Введите вершину для обхода по уровням:');
        if (vertexId !== null) {
          const MST = graph.minimumSpanningTreePrim(vertexId);
          console.log(MST);
        }
      }

      const dijkstra = () => {
        const startVertex = prompt('Введите начальную вершину:');
        const endVertex = prompt('Введите конечную вершину:');
        if (startVertex !== null && endVertex !== null) {
          const a = graph.dijkstra(startVertex, endVertex);
          console.log(a)
        }
      };

      const showGraphInfo = () => {
        alert(graph.toString());
      };
  
      const saveToFile = () => {
        const fileName = prompt('Название файла для сохранения:');
        if (fileName !== null) {
          graph.saveToFile(fileName);
        }
      };
  
      const loadFromFile = (event: Event) => {
        try {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            console.log(file)
            const reader = new FileReader();
            reader.onload = (e) => {
              const content = e.target?.result as string;
              graph.loadFromFile(file)
            };
            reader.readAsText(file);
          }
        } catch (error) {
          console.error('Error while loading file:', error);
        }
      };
  </script>
  