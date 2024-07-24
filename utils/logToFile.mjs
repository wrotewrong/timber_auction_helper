import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logToFile = (file, text) => {
  const filePath = path.join(__dirname, `../files/output/${file}.txt`);
  const date = new Date(Date.now());
  const content = `\n${date.getDate().toString().padStart(2, '0')}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${date.getFullYear()} ${date
    .getHours()
    .toString()
    .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')} - ${text}`;

  try {
    fs.appendFileSync(filePath, content);
  } catch (err) {
    console.error(err);
  }
};

export default logToFile;
