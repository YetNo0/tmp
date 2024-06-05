<template>
    <div class="flex flex-row gap-3">
      <Button @click="addNode">Добавить узел</Button>
      <Button @click="removeNode">Удалить узел</Button>
      <Button @click="showTreeInfo">Показать информацию</Button>
      <Button @click="saveToFile">Скачать файл</Button>
      <Input type="file" ref="fileInput" @change="loadFromFile"/>
    </div>
  </template>
  
  <script setup lang="ts">
    import {Input} from '@/components/ui/input'
    import {Button} from '@/components/ui/button'
  import BinaryTree from '../../types/BinaryTree';
  
      const tree = new BinaryTree();
      const addNode = () => {
        const nodeValue = prompt('Введите значение узла:');
        if (nodeValue !== null) {
          tree.addNode(parseInt(nodeValue));
        }
      };
  
      const removeNode = () => {
        const nodeValue = prompt('Введите узел для удаления:');
        if (nodeValue !== null) {
          tree.removeNode(parseInt(nodeValue));
        }
      };
  
      const showTreeInfo = () => {
        console.log(tree)
        alert(tree.toString());
      };
  
      const saveToFile = () => {
        const fileName = prompt('Введите имя файла для сохранения:');
        if (fileName !== null) {
          tree.saveToFile(fileName);
        }
      };
  
      const loadFromFile = () => {
        try {
          const file = (event?.target as HTMLInputElement).files?.[0];
          if (file) {
            console.log(file)
            const reader = new FileReader();
            reader.onload = (e) => {
              const content = e.target?.result as string;
              tree.loadFromFile(file)
            };
            reader.readAsText(file);
          }
        } catch (error) {
          console.error('Error while loading file:', error);
        }
      }
  </script>
  