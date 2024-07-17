import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bigNumberFormat from '../utils/bigNumberFormat.mjs';
import speciesToGerman from './speciesToGerman.mjs';

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
      numerUmowy: inputData.number,
      dataUmowy: inputData.dates.contractDate,
      nazwaFirmy: inputData.buyer.name,
      siedzibaFirmy: inputData.buyer.zipCode,
      siedzibaSądu: inputData.buyer.courtZipCode,
      numerKRS: inputData.buyer.krsNumber,
      numerNIP: inputData.buyer.nip,
      numerREGON: inputData.buyer.regonNumber,
      numerBDO: inputData.buyer.bdoNumber,
      osobaReprezentującaNR1: inputData.buyer.firstRepresentative,
      osobaReprezentującaNR2: inputData.buyer.secondRepresentative,
      osobaFizycznaAdres: inputData.buyer.homeZipCode,
      osobaFizyczna: inputData.buyer.isNaturalPerson,
      osobaPrawna: inputData.buyer.isLegalPerson,
      dzieńRozpoczęcia: inputData.dates.submissionStart,
      dzieńZakończenia: inputData.dates.submissionEnd,
      ilośćCałkowita: bigNumberFormat(inputData.timber.totalVolume),
      wartośćCałkowita: bigNumberFormat(inputData.timber.totalPrice),
      terminOdbioru: inputData.dates.receiptOfProducts,
      terminSprzedażyOd: inputData.dates.salesStart,
      terminSprzedażyDo: inputData.dates.salesEnd,
    });

    filename = `${inputData.number} - nip ${inputData.buyer.nip} - umowa`;
  } else if (docType === 'catalog') {
    const plainProducts = inputData.map((product) => {
      return product.toObject();
    });
    doc.render({
      products: plainProducts.map((product) => {
        for (let property in product) {
          if (product.hasOwnProperty(property)) {
            if (property === 'species') {
              product[property] = speciesToGerman(product[property]);
            }
            if (typeof product[property] === 'number') {
              product[property] = bigNumberFormat(product[property]);
            }
          }
        }
        return product;
      }),
    });

    filename = `Katalog`;
  } else if (docType === 'annex') {
    const plainProducts = inputData.timber.list.map((product) => {
      return product.toObject();
    });

    doc.render({
      contractNumber: inputData.number,
      name: inputData.buyer.name,
      boughtProducts: plainProducts.map((product) => {
        product.generatedNumber = `${plainProducts.indexOf(product) + 1}.`;
        for (let property in product) {
          if (product.hasOwnProperty(property)) {
            if (typeof product[property] === 'number') {
              product[property] = bigNumberFormat(product[property]);
            }
          }
        }
        return product;
      }),
      totalVolume: bigNumberFormat(inputData.timber.totalVolume),
      totalPrice: bigNumberFormat(inputData.timber.totalPrice),
    });

    filename = `${inputData.number} - nip ${inputData.buyer.nip} - załącznik nr 1 do umowy`;
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
  return filename;
};

export default createDoc;
