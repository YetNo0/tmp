const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Генерация произвольного массива целых чисел и сохранение в файл
function generateAndSaveArrayToFile(filename, size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 1000)); // Генерация случайных чисел от 0 до 999
    }
    fs.writeFileSync(filename, array.join('\n'));
}

// Сортировка массива методом простого слияния
function mergeSort(filename) {
    const startTime = process.hrtime();
    let array = fs.readFileSync(filename, 'utf-8').split('\n').map(Number);
    array.sort((a, b) => a - b);
    fs.writeFileSync(filename, array.join('\n'));
    const endTime = process.hrtime(startTime);
    console.log(`Простое слияние: Время выполнения: ${endTime[0]} секунд ${endTime[1] / 1000000} миллисекунд.`);
}

// Сортировка массива методом естественного слияния
function naturalMergeSort(filename) {
    const startTime = process.hrtime();
    let array = fs.readFileSync(filename, 'utf-8').split('\n').map(Number);
    let subArrays = [];
    
    for (let i = 0; i < array.length; i++) {
        subArrays.push([array[i]]);
    }
    
    while (subArrays.length > 1) {
        let newSubArrays = [];
        
        for (let i = 0; i < subArrays.length; i += 2) {
            if (i + 1 < subArrays.length) {
                newSubArrays.push(merge(subArrays[i], subArrays[i + 1]));
            } else {
                newSubArrays.push(subArrays[i]);
            }
        }
        
        subArrays = newSubArrays;
    }
    
    fs.writeFileSync(filename, subArrays[0].join('\n'));
    const endTime = process.hrtime(startTime);
    console.log(`Естественное слияние: Время выполнения: ${endTime[0]} секунд ${endTime[1] / 1000000} миллисекунд.`);
}

// Вспомогательная функция для слияния двух отсортированных массивов
function merge(arr1, arr2) {
    const mergedArray = [];
    let i = 0,
        j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            mergedArray.push(arr1[i]);
            i++;
        } else {
            mergedArray.push(arr2[j]);
            j++;
        }
    }

    return mergedArray.concat(arr1.slice(i)).concat(arr2.slice(j));
}

// Функция для выбора метода сортировки
function chooseSortingMethod(filename) {
    rl.question(`Выберите метод сортировки:\n1. Простое слияние\n2. Естественное слияние\n3. Выйти из программы\n`, (answer) => {
        switch (answer) {
            case '1':
                mergeSort(filename);
                repeat();
                break;
            case '2':
                naturalMergeSort(filename);
                repeat();
                break;
            case '3':
                console.log('Программа завершена.');
                rl.close();
                break;
            default:
                console.log('Неверный выбор. Пожалуйста, выберите число от 1 до 3.');
                chooseSortingMethod(filename);
                break;
        }
    });
}

// Функция для повторного выбора метода сортировки или выхода из программы
function repeat() {
    rl.question('Хотите выполнить еще одну сортировку? (yes/no)\n', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            chooseSortingMethod(filename);
        } else if (answer.toLowerCase() === 'no') {
            console.log('Программа завершена.');
            rl.close();
        } else {
            console.log('Неверный выбор. Пожалуйста, введите "yes" или "no".');
            repeat();
        }
    });
}

const filename = 'numbers.txt';
const size = 1000;
generateAndSaveArrayToFile(filename, size);
console.log(`Сгенерирован файл ${filename} с ${size} случайными числами:`);
// console.log(fs.readFileSync(filename, 'utf-8'));

chooseSortingMethod(filename);
