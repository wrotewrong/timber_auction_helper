import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logToFile = (file, text) => {
  const filePath = path.join(__dirname, `../files/output/${file}.txt`);
  const date = new Date(Date.now());
  const content = `\n${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${text}`;

  try {
    fs.appendFileSync(filePath, content);
    console.log(`added text to ${file}`);
  } catch (err) {
    console.error(err);
  }
};

export default logToFile;
