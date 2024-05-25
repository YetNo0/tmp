// const fs = require('fs');
// const readline = require('readline');

// function runningEncode(input) {
//     let encoded = '';
//     let count = 1;
//     let prevChar = input[0];

//     for (let i = 1; i < input.length; i++) {
//         const currentChar = input[i];
//         if (currentChar === prevChar) {
//             count++;
//         } else {
//             if (count > 3) {
//                 encoded += `${prevChar}${String.fromCharCode(count + 256)}`;
//             } else {
//                 for (let j = 0; j < count; j++) {
//                     encoded += prevChar;
//                 }
//             }
//             count = 1;
//             prevChar = currentChar;
//         }
//     }

//     if (count > 3) {
//         encoded += `${prevChar}${String.fromCharCode(count + 256)}`;
//     } else {
//         for (let j = 0; j < count; j++) {
//             encoded += prevChar;
//         }
//     }

//     return encoded;
// }

// function runningDecode(encoded) {
//     let decoded = '';
//     for (let i = 0; i < encoded.length; i++) {
//         const char = encoded[i];
//         if (i < encoded.length - 1 && encoded.charCodeAt(i + 1) >= 256) {
//             const count = encoded.charCodeAt(i + 1) - 256;
//             for (let j = 0; j < count; j++) {
//                 decoded += char;
//             }
//             i++;
//         } else {
//             decoded += char;
//         }
//     }
//     return decoded;
// }

// // LZW Encoding and Decoding
// function lzwEncode(input, bitSize) {
//     const dictionary = {};
//     const result = [];
//     let currentCode = 256;

//     for (let i = 0; i < 256; i++) {
//         dictionary[String.fromCharCode(i)] = i;
//     }

//     let current = '';
//     for (let i = 0; i < input.length; i++) {
//         const nextChar = input[i];
//         const combined = current + nextChar;
//         if (dictionary[combined] !== undefined) {
//             current = combined;
//         } else {
//             result.push(dictionary[current]);
//             dictionary[combined] = currentCode++;
//             current = nextChar;
//         }
//     }
//     if (current !== '') {
//         result.push(dictionary[current]);
//     }

//     return result.map(code => (code !== undefined ? code.toString(2).padStart(bitSize, '0') : '')).join('');
// }

// function lzwDecode(input, bitSize) {
//     const dictionary = {};
//     let currentCode = 256;

//     for (let i = 0; i < 256; i++) {
//         dictionary[i.toString(2).padStart(bitSize, '0')] = String.fromCharCode(i);
//     }

//     let result = '';
//     let current = '';
//     for (let i = 0; i < input.length; i += bitSize) {
//         const code = parseInt(input.slice(i, i + bitSize), 2);
//         const next = dictionary[code] || (current + current[0]);
//         result += next;

//         if (current !== '') {
//             dictionary[currentCode++ + ''] = current + next[0];
//         }
//         current = next;
//     }

//     return result;
// }

// // Huffman Encoding and Decoding
// class Node {
//     constructor(value, char = null) {
//         this.value = value;
//         this.char = char;
//         this.left = null;
//         this.right = null;
//     }
// }

// function buildHuffmanTree(text) {
//     const charCount = {};
//     for (const char of text) {
//         charCount[char] = (charCount[char] || 0) + 1;
//     }

//     const queue = [];
//     for (const char in charCount) {
//         queue.push(new Node(charCount[char], char));
//     }

//     while (queue.length > 1) {
//         queue.sort((a, b) => a.value - b.value);
//         const left = queue.shift();
//         const right = queue.shift();
//         const parent = new Node(left.value + right.value);
//         parent.left = left;
//         parent.right = right;
//         queue.push(parent);
//     }

//     return queue[0];
// }

// function buildHuffmanTable(tree) {
//     const table = {};

//     function traverse(node, prefix = '') {
//         if (node.char !== null) {
//             table[node.char] = prefix;
//         } else {
//             traverse(node.left, prefix + '0');
//             traverse(node.right, prefix + '1');
//         }
//     }

//     traverse(tree);
//     return table;
// }

// function huffmanEncode(text) {
//     const tree = buildHuffmanTree(text);
//     const table = buildHuffmanTable(tree);
//     let result = '';
//     for (const char of text) {
//         result += table[char];
//     }
//     return result;
// }

// function huffmanDecode(encodedText, table) {
//     let decodedText = '';
//     let currentCode = '';
//     for (const bit of encodedText) {
//         currentCode += bit;
//         if (table[currentCode] !== undefined) {
//             decodedText += table[currentCode];
//             currentCode = '';
//         }
//     }
//     return decodedText;
// }
// function saveToFile(data, filename) {
//     fs.writeFileSync(filename, data);
//     console.log(`Результат сохранен в файл ${filename}`);
// }

// // Функция для чтения данных из файла
// function readFromFile(filename) {
//     return fs.readFileSync(filename, 'utf8');
// }

// // Цикл для работы с пользовательским вводом
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function chooseAlgorithm() {
//     rl.question('Выберите алгоритм (1 - LZW, 2 - Huffman, 3 - Running): ', (answer) => {
//         if (answer === '1') {
//             const inputText = 'Пример текста для кодирования LZW';
//             const encoded = lzwEncode(inputText, 12);
//             const decoded = lzwDecode(encoded, 12);
//             saveToFile(encoded, 'lzw_encoded.txt');
//             saveToFile(decoded, 'lzw_decoded.txt');
//         } else if (answer === '2') {
//             const inputText = 'Пример текста для кодирования Huffman';
//             const encoded = huffmanEncode(inputText);
//             const decoded = huffmanDecode(encoded, buildHuffmanTable(buildHuffmanTree(inputText)));
//             saveToFile(encoded, 'huffman_encoded.txt');
//             saveToFile(decoded, 'huffman_decoded.txt');
//         } else if (answer === '3') {
//             const inputText = 'Пример текста для кодирования Running';
//             const encoded = runningEncode(inputText);
//             const decoded = runningDecode(encoded);
//             saveToFile(encoded, 'running_encoded.txt');
//             saveToFile(decoded, 'running_decoded.txt');
//         } else {
//             console.log('Неверный выбор алгоритма. Пожалуйста, выберите снова.');
//             chooseAlgorithm();
//             return;
//         }

//         rl.close();
//     });
// }

// chooseAlgorithm();

function lzwEncode(input, bitSize) {
    const dictionary = {};
    const result = [];
    let currentCode = 256;

    for (let i = 0; i < 256; i++) {
        dictionary[String.fromCharCode(i)] = i;
    }

    let current = '';
    for (let i = 0; i < input.length; i++) {
        const nextChar = input[i];
        const combined = current + nextChar;
        if (dictionary[combined] !== undefined) {
            current = combined;
        } else {
            result.push(dictionary[current]);
            dictionary[combined] = currentCode++;
            current = nextChar;
        }
        console.log(`Current: ${current}, Dictionary: ${JSON.stringify(dictionary)}`);
    }
    if (current !== '') {
        result.push(dictionary[current]);
    }

    return result.map(code => (code !== undefined ? code.toString(2).padStart(bitSize, '0') : '')).join('');
}

function lzwDecode(input, bitSize) {
    const dictionary = {};
    let currentCode = 256;

    for (let i = 0; i < 256; i++) {
        dictionary[i.toString(2).padStart(bitSize, '0')] = String.fromCharCode(i);
    }

    let result = '';
    let current = '';
    for (let i = 0; i < input.length; i += bitSize) {
        const code = parseInt(input.slice(i, i + bitSize), 2);
        const next = dictionary[code] || (current + current[0]);
        result += next;

        if (current !== '') {
            dictionary[currentCode++ + ''] = current + next[0];
        }
        current = next;

        console.log(`Current: ${current}, Dictionary: ${JSON.stringify(dictionary)}`);
    }

    return result;
}

const inputText = 'Пример текста для кодирования LZW';
const encoded = lzwEncode(inputText, 12);
console.log(`Encoded: ${encoded}`);
const decoded = lzwDecode(encoded, 12);
console.log(`Decoded: ${decoded}`);
