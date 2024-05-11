import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createDoc = (docType, inputData) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, '../files/input/input.docx'),
    'binary'
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  if ((docType = 'contract')) {
    doc.render({
      first_name: inputData.first_name,
      last_name: inputData.last_name,
    });
  } else {
    return;
  }

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  const filename =
    inputData.first_name + ' ' + inputData.last_name + ' ' + Date.now();
  fs.writeFileSync(
    path.resolve(__dirname, `../files/output/${filename}.docx`),
    buf
  );
  console.log(`created file: ${filename}`);
};

export default createDoc;
