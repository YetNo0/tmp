const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function fillFileA() {
    let data = '';
    for (let i = 0; i < 10; i++) {
        const randomNum = (Math.random() * 200) - 100;
        data += `${randomNum.toFixed(2)}\n`;
    }
    fs.writeFileSync('A.txt', data);
}

function displayFileA() {
    const data = fs.readFileSync('A.txt', 'utf8');
    console.log(data);
}

function decomposeFileA() {
    const data = fs.readFileSync('A.txt', 'utf8').split('\n');
    let integers = '';
    let fractions = '';
    data.forEach(num => {
        const [integer, fraction] = num.split('.');
        integers += `${parseInt(integer)}\n`;
        fractions += `${parseInt(fraction) / 100}\n`;
    });
    fs.writeFileSync('B.txt', integers);
    fs.writeFileSync('C.txt', fractions);
}

function mergeFilesBC() {
    const integers = fs.readFileSync('B.txt', 'utf8').split('\n');
    const fractions = fs.readFileSync('C.txt', 'utf8').split('\n');
    let mergedData = '';
    for (let i = 0; i < integers.length; i++) {
        mergedData += `${integers[i]}.${parseInt(fractions[i] * 100)}\n`;
    }
    fs.writeFileSync('D.txt', mergedData);
}

function reverseFileA() {
    const data = fs.readFileSync('A.txt', 'utf8').split('\n').reverse().join('\n');
    fs.writeFileSync('E.txt', data);
}

function convertFileAtoF() {
    const data = fs.readFileSync('A.txt', 'utf8').split('\n');
    let convertedData = '';
    data.forEach((num, index) => {
        const value = parseFloat(num);
        const sign = Math.sign(value) === -1 ? '-' : '+';
        convertedData += `${index + 1},${sign},${Math.abs(value)}\n`;
    });
    fs.writeFileSync('F.txt', convertedData);
}

function processCommand(command) {
    switch (command) {
        case '1':
            fillFileA();
            console.log("File A filled with random numbers.");
            break;
        case '2':
            displayFileA();
            console.log("Data from file A displayed.");
            break;
        case '3':
            decomposeFileA();
            console.log("File A decomposed into files B and C.");
            break;
        case '4':
            mergeFilesBC();
            console.log("Files B and C merged into file D.");
            break;
        case '5':
            reverseFileA();
            console.log("Data from file A reversed and saved to file E.");
            break;
        case '6':
            convertFileAtoF();
            console.log("File A converted to file F.");
            break;
        case 'exit':
            rl.close();
            break;
        default:
            console.log("Invalid command. Please enter a number from 1 to 6 or 'exit' to quit.");
    }
}

function start() {
    rl.question("Enter command (1-6) or 'exit' to quit: ", command => {
        processCommand(command.trim());
        if (command.trim() !== 'exit') {
            start(); // Рекурсивный вызов для ввода следующей команды
        }
    });
}

start();
