import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import generateContractNumber from './generateContractNumber.mjs';

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
      osobaPrawna: inputData.buyer.isLegalperson,
      dzieńRozpoczęcia: inputData.dates.submissionStart,
      dzieńZakończenia: inputData.dates.submissionEnd,
      ilośćCałkowita: inputData.timber.totalVolume,
      wartośćCałkowita: inputData.timber.totalPrice,
      terminOdbioru: inputData.dates.receiptOfProducts,
      terminSprzedażyOd: inputData.dates.salesStart,
      terminSprzedażyDo: inputData.dates.salesEnd,
    });

    filename = `${inputData.buyer.nip} - umowa ŁADS - ${Date.now()};`;
  } else if (docType === 'catalog') {
    doc.render({ products: inputData });

    filename = `Katalog ŁADS`;
  } else if (docType === 'annex') {
    for (let timber of inputData.timber.list) {
      timber.generatedNumber = `${inputData.timber.list.indexOf(timber) + 1}.`;
    }
    doc.render({
      contractNumber: inputData.number,
      name: inputData.buyer.name,
      boughtProducts: inputData.timber.list,
      totalVolume: inputData.timber.totalVolume,
      totalPrice: inputData.timber.totalPrice,
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
