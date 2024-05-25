import BinaryTreeNode from './BinaryTreeNode';

export default class BinaryTree {
  root: BinaryTreeNode | null;

  constructor() {
    this.root = null;
  }

  // Добавление вершины в произвольное место дерева
  addNode(value: number) {
    if (!this.root) {
        console.log(1)
      this.root = new BinaryTreeNode(value);
    } else {
        console.log(2)
      this.addNodeRecursive(this.root, value);
    }
  }

  private addNodeRecursive(node: BinaryTreeNode, value: number) {
    if (value < node.value) {
      if (!node.left) {
        console.log(3)
        node.left = new BinaryTreeNode(value);
      } else {
        this.addNodeRecursive(node.left, value);
      }
    } else {
      if (!node.right) {
        node.right = new BinaryTreeNode(value);
      } else {
        this.addNodeRecursive(node.right, value);
      }
    }
  }

  // Удаление вершины (и всех дочерних элементов) из дерева
  removeNode(value: number) {
    this.root = this.removeNodeRecursive(this.root, value);
  }

  private removeNodeRecursive(node: BinaryTreeNode | null, value: number): BinaryTreeNode | null {
    if (!node) {
        return null;
    }

    if (value === node.value) {
        // Узел со значением value найден, удаляем его и всех его дочерних узлов
        node = null;
    } else if (value < node.value) {
        // Рекурсивно удаляем узел из левого поддерева
        node.left = this.removeNodeRecursive(node.left, value);
    } else {
        // Рекурсивно удаляем узел из правого поддерева
        node.right = this.removeNodeRecursive(node.right, value);
    }

    return node;
}
  

  private findMinNode(node: BinaryTreeNode): BinaryTreeNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Вывод информации о составе дерева (обход в прямом порядке)
  toString(): string {
    return this.traverseInOrder(this.root);
  }

  private traverseInOrder(node: BinaryTreeNode | null): string {
    if (!node) {
      return '';
    }
    const leftStr = this.traverseInOrder(node.left);
    const rightStr = this.traverseInOrder(node.right);
    return `${leftStr}${node.value}, ${rightStr}`;
  }
  
  // Сохранение данных в файл
  saveToFile(fileName: string) {
    const data = JSON.stringify(this.root);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  // Загрузка данных из файла
  loadFromFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const data = JSON.parse(reader.result);
        this.root = this.buildTreeFromJSON(data);
      }
    };
    reader.readAsText(file);
  }

  private buildTreeFromJSON(data: any): BinaryTreeNode | null {
    if (!data) return null;
    const node = new BinaryTreeNode(data.value);
    node.left = this.buildTreeFromJSON(data.left);
    node.right = this.buildTreeFromJSON(data.right);
    return node;
  }
}
