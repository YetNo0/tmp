export function useQuickSort(arr: number[]): number[] {
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

    return [...useQuickSort(left), pivot, ...useQuickSort(right)];
}
