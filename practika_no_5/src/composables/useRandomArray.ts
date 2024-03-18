export function useRandomArray (size: number): number[] {
    const randomArray: number[] = [];
    for (let i = 0; i < size; i++) {
        const randomNumber: number = Math.floor(Math.random() * 201) - 100; // Генерируем случайные целые числа от -100 до 100
        randomArray.push(randomNumber);
    }
    return randomArray;
}