import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';


const rl = createInterface({ input, output });

const words = ['duck', 'word', 'coin'];
let chosenWord = words[Math.floor(Math.random() * words.length)];
let hiddenWord = Array(chosenWord.length).fill('_');
let remainingLives = 9;
let guessedLetters = [];
let incorrectGuesses = [];
let totalGuesses = 0;

const hangmanStages = [
    `

    
    
    
    
    
                 `,
    (`\x1b[32m

    
    
    
    
    
    =========\x1b[0m`),
    (`\x1b[32m
     
         |
         |
         |
         |
         |
    =========\x1b[0m`),
    (`\x1b[32m
     +---+
         |
         |
         |
         |
         |
    =========\x1b[0m`),
    (`\x1b[32m 
      +---+
      |   |
          |
          |
          |
          |
    =========\x1b[0m`),
    (`\x1b[32m 
      +---+
      |   |
      O   |
          |
          |
          |
    =========\x1b[0m`), 
    (`\x1b[32m
      +---+
      |   |
      O   |
      |   |
          |
          |
    =========\x1b[0m`),
    (`\x1b[31m
      +---+
      |   |
      O   |
     /|   |
          |
          |
    =========\x1b[0m`), 
    (`\x1b[31m
      +---+
      |   |
      O   |
     /|\\  |
          |
          |
    =========\x1b[0m`), 
    (`\x1b[31m
      +---+
      |   |
      O   |
     /|\\  |
     /    |
          |
    =========\x1b[0m`), 
    (`\x1b[31m
      +---+
      |   |
      O   |
     /|\\  |
     / \\  |
          |
    =========`)]



console.log('Welcome to Hangman!');
console.log('Your hidden word is: ' + hiddenWord.join(' ') + '\n');

const promptUser = async () => {
    const choice = await rl.question('Please guess a letter or a word: ');

    if (choice.toLowerCase() === 'letter') {
        await guessLetter();
    } else if (choice.toLowerCase() === 'word') {
        await guessWord();
    } else {
        console.log('Please enter a valid option: letter or word');
        await promptUser();
    }
};

const guessLetter = async () => {
    const letter = await rl.question('Guess a letter: ');

    if (letter.length !== 1 || !letter.match(/[a-z]/i)) {
        console.log('Please enter a valid single letter.');
        return await guessLetter();
    }

    totalGuesses++;

    if (guessedLetters.includes(letter)) {
        console.log('You already guessed that letter. Try a new one.');
        return await guessLetter();
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)) {
        console.log('Correct guess!');
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                hiddenWord[i] = letter;
            }
        }
    } else {
        remainingLives--;
        incorrectGuesses.push(letter);
        console.log('Wrong guess! You have ' + remainingLives + ' lives left.');
        console.log(hangmanStages[10 - remainingLives]);
    }

    console.log(hiddenWord.join(' ') + '\n');

    if (!hiddenWord.includes('_')) {
        console.log('Congratulations! You win! The word was ' + chosenWord);
        displayStats();
        return rl.close();
    }

    if (remainingLives === 0) {
        console.log('No remaining lives left! Game over! The word was: ' + chosenWord);
        displayStats();
        return rl.close();
    }

    await promptUser();
};

const guessWord = async () => {
    const guessWord = await rl.question('Guess the word: ');

    totalGuesses++;

    if (guessWord.toLowerCase() === chosenWord) {
        console.log('Congratulations! You won! The word was: ' + chosenWord);
        displayStats();
        rl.close();
    } else {
        remainingLives--;
        incorrectGuesses.push(guessWord);
        console.log('Wrong guess! You have ' + remainingLives + ' lives left.');

        if (remainingLives === 0) {
            console.log('Game over! The word was: ' + chosenWord);
            console.log(hangmanStages[10 - remainingLives]);
            displayStats();
            rl.close();
        } else {
            await promptUser();
        }
    }
};

const displayStats = () => {
    console.log('\nGame stats');
    console.log('Total guesses: ' + totalGuesses);
    console.log('Incorrect guesses: ' + incorrectGuesses.length);
    console.log('Incorrect letters/words guessed: ' + incorrectGuesses.join(', '));
};

promptUser(); // Start the game
