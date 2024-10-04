import { loadSettings } from "./settings.mjs";
import DICTIONARY from "./language.mjs";

const settings = loadSettings();
const language = settings.language || 'en';

const splashContent = `
${DICTIONARY[language].GAME_TITLE}
${DICTIONARY[language].GAME_DESCRIPTION}
 ______  ____   __      ______   ____    __      ______   ___     ___
|      ||    | /  ]    |      | /    |  /  ]    |      | /   \\   /  _]
|      | |  | /  /     |      ||  o  | /  /     |      ||     | /  [_
|_|  |_| |  |/  /      |_|  |_||     |/  /      |_|  |_||  O  ||    _]
  |  |   |  /   \\_       |  |  |  _  /   \\_       |  |  |     ||   [_
  |  |   |  \\     |      |  |  |  |  \\     |      |  |  |     ||     |
  |__|  |____\\____|      |__|  |__|__|\\____|      |__|   \\___/ |_____|

`;

export function showSplashScreen() {
    console.log(splashContent);
}

function centerText(text) {
  const terminalWidth = process.stdout.columns;
  const lines = text.split("\n");
  return lines
    .map((line) => {
      const padding = Math.floor((terminalWidth - line.length) / 2);
      return " ".repeat(padding) + line;
    })
    .join("\n");
}