function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

export function useSortUtils () {

    function shellSort(arr: number[]): number[] {
        const len = arr.length;
        let gap = Math.floor(len / 2);
    
        while (gap > 0) {
            for (let i = gap; i < len; i++) {
                const temp = arr[i];
                let j = i;
    
                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }
    
                arr[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }
        return arr;
    }

    function quickSort(arr: number[]): number[] {
        if (arr.length <= 1) {
            return arr;
        }
    
        const pivotIndex = Math.floor(arr.length / 2);
        const pivot = arr[pivotIndex];
        const left: number[] = [];
        const right: number[] = [];
    
        for (let i = 0; i < arr.length; i++) {
            if (i === pivotIndex) continue; // Пропускаем опорный элемент
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
    
        return [...quickSort(left), pivot, ...quickSort(right)];
    }
    
    function heapSort(arr: number[]): number[] {
        const n = arr.length;
    
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    
        // Heap sort
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];
    
            // Heapify root element
            heapify(arr, i, 0);
        }
    
        return arr;
    }
    return {
        heapSort,
        quickSort,
        shellSort
    }
}