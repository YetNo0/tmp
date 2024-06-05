export function useSearchUtils () {

    function useBinarySearch(array: number[], target: number): number {
        let left = 0;
        let right = array.length - 1;
    
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
    
            if (array[mid] === target) {
                return mid; // Найден элемент, возвращаем его индекс
            } else if (array[mid] < target) {
                left = mid + 1; // Если средний элемент меньше цели, обновляем левую границу
            } else {
                right = mid - 1; // Если средний элемент больше цели, обновляем правую границу
            }
        }
    
        return -1; // Элемент не найден
    }

    function useBoyerMooreSearch(text: string, pattern: string): number {
        console.log(text, pattern)
        const patternLength = pattern.length;
        const textLength = text.length;
    
        if (patternLength === 0) {
            return 0; // Если паттерн пустой, он найден в начале текста
        }
    
        const charTable: Record<string, number> = {}; // Таблица символов для смещений
        const last = patternLength - 1;
    
        // Заполняем таблицу символов для смещений
        for (let i = 0; i < patternLength; ++i) {
            charTable[pattern[i]] = last - i;
        }
    
        let i = last; // Индекс в тексте
        let j = last; // Индекс в паттерне
    
        while (i < textLength) {
            if (text[i] === pattern[j]) {
                if (j === 0) {
                    return i; // Найден паттерн в тексте
                }
                --i;
                --j;
            } else {
                i += Math.max(charTable[text[i]] || patternLength, last - j + 1);
                j = last; // Возвращаем индекс в конец паттерна для следующего сравнения
            }
        }
    
        return -1; // Паттерн не найден
    }

    function useInterpolationSearch(array: number[], target: number): number {
        let low = 0;
        let high = array.length - 1;
    
        while (low <= high && target >= array[low] && target <= array[high]) {
            // Интерполируем текущую позицию
            const pos = low + Math.floor(((target - array[low]) * (high - low)) / (array[high] - array[low]));
    
            if (array[pos] === target) {
                return pos; // Найден элемент, возвращаем его индекс
            } else if (array[pos] < target) {
                low = pos + 1; // Если элемент находится во второй половине, обновляем нижнюю границу
            } else {
                high = pos - 1; // Если элемент находится в первой половине, обновляем верхнюю границу
            }
        }
    
        return -1; // Элемент не найден
    }
    return {
        useBoyerMooreSearch,
        useBinarySearch,
        useInterpolationSearch
      };
}