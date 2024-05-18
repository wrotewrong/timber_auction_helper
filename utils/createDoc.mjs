import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createDoc = (docType, inputFileName, inputData) => {
  const content = fs.readFileSync(
    path.resolve(__dirname, `../files/input/${inputFileName}.docx`),
    'binary'
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  let filename = '';
  if (docType === 'contract') {
    doc.render({
      forestDistrict: 'Nadleśnictwo Brzeziny',
      amount: inputData.masa,
      price: inputData['cena m3'],
      company: inputData.company,
    });

    filename = `Umowa - Nadleśnictwo Brzeziny - ${
      inputData.company
    } - ${Date.now()};`;
  } else if (docType === 'catalog') {
    doc.render({
      productNumber: inputData.productNumber,
      forestDistrict: inputData.forestDistrict,
      unit: inputData.unit,
      species: inputData.species,
      length: inputData.length,
      diameter: inputData.diameter,
      volume: inputData.volume,
      class: inputData.class,
      priceSingle: inputData.priceSingle,
      priceTotal: inputData.priceTotal,
    });

    filename = `Katalog ŁADS - ${Date.now()};`;
  } else {
    return;
  }

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  fs.writeFileSync(
    path.resolve(__dirname, `../files/output/${filename}.docx`),
    buf
  );
  console.log(`created file: ${filename}`);
};

export default createDoc;
