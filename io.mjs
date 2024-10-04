import * as readlinePromise from 'node:readline/promises';

const rl = readlinePromise.createInterface({ input: process.stdin, output: process. stdout});

async function askQuestion(question) {
    return await rl.question(question)
}

function print(text) {
    console.log(text);
}

export { print, askQuestion };
