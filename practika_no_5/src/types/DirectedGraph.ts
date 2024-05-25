// DirectedGraph.ts
import  Edge  from  '../types/Edge'
export default class DirectedGraph {
    private adjacencyList: Map<string, string[]>;
  
    constructor() {
      this.adjacencyList = new Map();
    }
    // Обход графа в глубину (DFS)
    depthFirstSearch(startVertex: string) {
      const visited: Set<string> = new Set();
      return this.dfsHelper(startVertex, visited);
    }

  private dfsHelper(vertex: string, visited: Set<string>) {
      let array:string[] = []
      visited.add(vertex);
      console.log(vertex);
      array.push(vertex)
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
              this.dfsHelper(neighbor, visited);
          }
      }
      return array
  }
  
  minimumSpanningTreePrim(startVertex: string): Map<string, string[]> {
    const visited: Set<string> = new Set();
    const minimumSpanningTree: Map<string, string[]> = new Map();

    visited.add(startVertex);

    while (visited.size < this.adjacencyList.size) {
        let minWeightEdge: Edge | null = null;

        for (const vertex of visited) {
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    const weight = 1; // Assuming uniform weight for simplicity
                    if (!minWeightEdge || weight < minWeightEdge.weight) {
                        minWeightEdge = new Edge(vertex, neighbor, weight);
                    }
                }
            }
        }

        if (minWeightEdge) {
            const { startVertex, endVertex } = minWeightEdge;
            if (!minimumSpanningTree.has(startVertex)) {
                minimumSpanningTree.set(startVertex, []);
            }
            minimumSpanningTree.get(startVertex)!.push(endVertex);
            visited.add(endVertex);
        }
    }

    return minimumSpanningTree;
}

  // Обход графа по уровням (BFS)
  breadthFirstSearch(startVertex: string) {
    const visited: Set<string> = new Set();
    const queue: string[] = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
        const currentVertex = queue.shift()!;
        console.log(currentVertex);

        const neighbors = this.adjacencyList.get(currentVertex) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}



// Алгоритм Дейкстры для поиска кратчайшего пути в графе
dijkstra(startVertex: string, endVertex: string) {
  const distances: Map<string, number> = new Map();
  const pq: string[] = [];

  distances.set(startVertex, 0);
  pq.push(startVertex);

  while (pq.length > 0) {
      // Извлекаем вершину с минимальным расстоянием из очереди
      let minVertexIndex = 0;
      for (let i = 1; i < pq.length; i++) {
          if (distances.get(pq[i])! < distances.get(pq[minVertexIndex])!) {
              minVertexIndex = i;
          }
      }
      const currentVertex = pq.splice(minVertexIndex, 1)[0];

      if (currentVertex === endVertex) {
          // Если достигли конечной вершины, возвращаем расстояние
          return distances.get(endVertex)!;
      }

      const currentDistance = distances.get(currentVertex)!;

      const neighbors = this.adjacencyList.get(currentVertex) || [];
      for (const neighbor of neighbors) {
          const edgeWeight = 1; // Вес ребра (для простоты)
          const distanceToNeighbor = currentDistance + edgeWeight;

          if (!distances.has(neighbor) || distanceToNeighbor < distances.get(neighbor)!) {
              distances.set(neighbor, distanceToNeighbor);
              pq.push(neighbor);
          }
      }
  }

  // Если конечная вершина недостижима, возвращаем undefined или другое значение по умолчанию
  return undefined;
}


    // Добавление вершины в граф
    addVertex(vertex: string) {
      if (!this.adjacencyList.has(vertex)) {
        this.adjacencyList.set(vertex, []);
      } else {
        console.log("Vertex already exists!");
      }
    }
  
    // Удаление вершины из графа
    removeVertex(vertex: string) {
      if (this.adjacencyList.has(vertex)) {
        this.adjacencyList.delete(vertex);
        // Удаляем все связи, связанные с этой вершиной
        this.adjacencyList.forEach((adjacentVertices, key) => {
          const index = adjacentVertices.indexOf(vertex);
          if (index !== -1) {
            adjacentVertices.splice(index, 1);
          }
        });
      } else {
        console.log("Vertex not found!");
      }
    }
    // Добавление ребра в граф
    addEdge(startVertex: string, endVertex: string) {
      if (!this.adjacencyList.has(startVertex)) {
        console.log("Start vertex not found!");
      } else if (!this.adjacencyList.has(endVertex)) {
        console.log("End vertex not found!");
      } else {
        this.adjacencyList.get(startVertex)!.push(endVertex);
      }
    }
    
    // Вывод информации о составе графа
    toString(): string {
      let result = "";
      this.adjacencyList.forEach((adjacentVertices, vertex) => {
        result += `${vertex} -> ${adjacentVertices.join(", ")}\n`;
      });
      return result.trim();
    }
  
    // Сохранение данных в файл
    saveToFile(fileName: string) {
      const data = JSON.stringify(Array.from(this.adjacencyList.entries()));
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
          this.adjacencyList = new Map(data);
        }
      };
      reader.readAsText(file);
    }
  }
  