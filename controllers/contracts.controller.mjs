import Offers from '../models/offersModel.mjs';
import Companies from '../models/companiesModel.mjs';
import Products from '../models/productsModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import BigNumber from 'bignumber.js';
import Contracts from '../models/contractsModel.mjs';
import {
  contractDate,
  submissionStart,
  submissionEnd,
  receiptOfProducts,
  salesStart,
  salesEnd,
} from '../backendConfig.mjs';
import convertDate from '../utils/convertDate.mjs';
import pickRandomOffer from '../utils/pickRandomOffer.mjs';
import createDoc from '../utils/createDocMDB.mjs';
import excludeRandomOffer from '../utils/excludeRandomOffer.mjs';
import generateContractNumber from '../utils/generateContractNumber.mjs';
import logToFile from '../utils/logToFile.mjs';
import Status from '../models/statusModel.mjs';
import zipFiles from '../utils/zipFiles.mjs';
import fs from 'fs';
import mongoose from 'mongoose';
import verifyData from '../utils/verifyData.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const importCompanies = async (req, res) => {
  const session = await mongoose.startSession();
  let transactionFinished = false;
  try {
    session.startTransaction();
    let companies = await Companies.find().session(session);
    if (companies.length === 0) {
      const importedCompanies = await importExcelDataMDB(
        'companies',
        'companiesDataMDB'
      );

      if (!importedCompanies || importedCompanies.length === 0) {
        res.status(400).json({ message: 'No comapnies to import' });
        console.log('No comapnies to import');
        return;
      }

      verifyData('companies', importedCompanies);

      const bulkCompanies = importedCompanies.map((company) => {
        return {
          insertOne: {
            document: {
              nip: company.nip,
              name: company.name,
              zipCode: company.zipCode,
              homeZipCode: company.homeZipCode,
              homeZipCodeSecond: company.homeZipCodeSecond,
              homeZipCodeThird: company.homeZipCodeThird,
              courtZipCode: company.courtZipCode,
              courtDepartment: company.courtDepartment,
              krsNumber: company.krsNumber,
              regonNumber: company.regonNumber,
              bdoNumber: company.bdoNumber,
              firstRepresentative: company.firstRepresentative,
              secondRepresentative: company.secondRepresentative,
              thirdRepresentative: company.thirdRepresentative,
              isLegalPerson: company.isLegalPerson,
              isNaturalPerson: company.isNaturalPerson,
              isPartnership: company.isPartnership,
              minVolume: company.minVolume,
              volumeWon: company.volumeWon,
              productsWon: company.productsWon,
              status: company.status,
              vat: company.vat,
              paperForm: company.paperForm,
              electronicForm: company.electronicForm,
            },
          },
        };
      });

      await Companies.bulkWrite(bulkCompanies, { session });
      await session.commitTransaction();
      session.endSession();
      transactionFinished = true;

      companies = await Companies.find();
      res.status(200).json({ message: 'OK', companies });
      console.log(`Added ${companies.length} companies`);
    } else {
      res.status(200).json({ message: 'OK', companies });
      console.log(`Companies has already been added`);
    }
  } catch (err) {
    if (!transactionFinished) {
      await session.abortTransaction();
      session.endSession();
      console.log(`Transaction failed`);
    }

    res.status(500).json({ message: err });
    console.log(err);
  }
};

// // non-bulk non-transaction:
// export const importCompanies = async (req, res) => {
//   try {
//     let companies = await Companies.find();
//     if (companies.length === 0) {
//       const importedCompanies = await importExcelDataMDB(
//         'companies',
//         'companiesDataMDB'
//       )
//         .then((companies) => {
//           return companies;
//         })
//         .catch((error) => {
//           console.error('Error importing companies:', error);
//         });

//       for (let company of importedCompanies) {
//         const newCompany = new Companies(company);
//         await newCompany.save();
//         console.log(`Company nip: ${newCompany.nip} has been added`);
//       }
//       companies = await Companies.find();
//     }
//     res.status(200).json({ message: 'OK', companies });
//   } catch (err) {
//     res.status(500).json({ message: err });
//     console.log(err);
//   }
// };

export const getCompanies = async (req, res) => {
  try {
    const companies = await Companies.find();
    if (companies.length > 0) {
      res.status(200).json({ message: 'OK', companies });
    } else res.status(400).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const importOffers = async (req, res) => {
  const session = await mongoose.startSession();
  let transactionFinished = false;
  try {
    session.startTransaction();
    let offers = await Offers.find().session(session);
    if (offers.length === 0) {
      const importedOffers = await importExcelDataMDB(
        'offers',
        'offersDataMDB'
      );

      if (!importedOffers || importedOffers.length === 0) {
        res.status(400).json({ message: 'No offers to import' });
        console.log('No offers to import');
        return;
      }

      verifyData('offers', importedOffers);

      const bulkOffers = importedOffers.map((offer) => {
        return {
          insertOne: {
            document: {
              productNumber: offer.productNumber,
              nip: offer.nip,
              bid: offer.bid,
            },
          },
        };
      });

      await Offers.bulkWrite(bulkOffers, { session });
      await session.commitTransaction();
      session.endSession();
      transactionFinished = true;

      offers = await Offers.find();
      res.status(200).json({ message: 'OK', offers });
      console.log(`Added ${offers.length} offers`);
    } else {
      res.status(200).json({ message: 'OK', offers });
      console.log(`Offers has already been added`);
    }
  } catch (err) {
    if (!transactionFinished) {
      await session.abortTransaction();
      session.endSession();
      console.log('Transaction failed');
    }

    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// //non-bulk non-transaction version
// export const importOffers = async (req, res) => {
//   try {
//     let offers = await Offers.find();
//     if (offers.length === 0) {
//       const importedOffers = await importExcelDataMDB('offers', 'offersDataMDB')
//         .then((offers) => {
//           return offers;
//         })
//         .catch((error) => {
//           console.error('Error importing offers:', error);
//         });

//       for (let offer of importedOffers) {
//         const newOffer = new Offers(offer);
//         await newOffer.save();
//         console.log(
//           `Offer by company nip: ${newOffer.nip} for product ${newOffer.productNumber} has been added`
//         );
//       }
//       offers = await Offers.find();
//     }
//     res.status(200).json({ message: 'OK', offers });
//   } catch (err) {
//     res.status(500).json({ message: err });
//     console.log(err);
//     await Offers.deleteMany();
//   }
// };

export const getOffers = async (req, res) => {
  try {
    const offers = await Offers.find();
    if (offers.length > 0) {
      res.status(200).json({ message: 'OK', offers });
    } else res.status(400).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

// estimateWinner method - eliminate companies offers based on the value: minVolume-volumeWon
export const estimateWinner = async (req, res) => {
  const session = await mongoose.startSession();
  let transactionFinished = false;
  session.startTransaction();

  try {
    let databaseProducts = await Products.find().session(session);
    let databaseOffers = await Offers.find().session(session);
    let databaseCompanies = await Companies.find().session(session);
    const status = await Status.findOne().session(session);

    if (
      databaseProducts.length > 0 &&
      databaseOffers.length > 0 &&
      databaseCompanies.length > 0 &&
      !status.winners
    ) {
      console.log('estimating started');
      let belowCompanies = [];
      let stepsCounter = 0;

      do {
        stepsCounter++;
        logToFile(
          'logger',
          `PRZYPISYWANIE OFERT - ROZPOCZĘCIE - ETAP ${stepsCounter}...`
        );
        databaseProducts = await Products.find().session(session);
        databaseOffers = await Offers.find().session(session);
        databaseCompanies = await Companies.find().session(session);

        //assigns highest bid to product
        const bulkProductsUpdate = [];
        for (let product of databaseProducts) {
          const productOffers = databaseOffers.filter(
            (offer) =>
              product.productNumber === offer.productNumber &&
              offer.bid > 0 &&
              offer.bid > product.startingPriceSingle
          );

          if (productOffers.length) {
            const bids = productOffers.map((offer) => offer.bid);

            const maxBid = Math.max(...bids);

            const maxOffers = productOffers.filter(
              (offer) => offer.bid === maxBid
            );

            const winningOffer = pickRandomOffer(product, maxOffers);

            bulkProductsUpdate.push({
              updateOne: {
                filter: { productNumber: product.productNumber },
                update: {
                  $set: {
                    maxOfferCompany: winningOffer.nip,
                    maxOfferBid: winningOffer.bid,
                    finalPriceTotal: new BigNumber(product.volume).times(
                      new BigNumber(winningOffer.bid)
                    ),
                  },
                },
              },
            });
          } else {
            logToFile('logger', `LOS nr ${product.productNumber} - brak ofert`);
          }
        }
        await Products.bulkWrite(bulkProductsUpdate, { session });

        //accumulates volumeWon of company and creates a list of products it has won
        databaseProducts = await Products.find().session(session);
        databaseCompanies = await Companies.find().session(session);
        const bulkCompaniesUpdate = [];
        for (let company of databaseCompanies) {
          let volumeWon = company.volumeWon;
          const productsWon = company.productsWon;
          for (let product of databaseProducts) {
            if (company.nip === product.maxOfferCompany) {
              volumeWon = new BigNumber(volumeWon).plus(
                new BigNumber(product.volume)
              );
              productsWon.push(product.productNumber);
            }
          }
          bulkCompaniesUpdate.push({
            updateOne: {
              filter: {
                nip: company.nip,
              },
              update: {
                $set: {
                  volumeWon,
                  productsWon,
                },
              },
            },
          });
        }
        await Companies.bulkWrite(bulkCompaniesUpdate, { session });

        //finds companies that didnt bought enough volume and picks one with the highest missing volume at random
        databaseCompanies = await Companies.find().session(session);
        belowCompanies = databaseCompanies.filter(
          (company) =>
            new BigNumber(company.minVolume).minus(
              new BigNumber(company.volumeWon)
            ) > 0 && company.status === 'active'
        );

        belowCompanies.map((company) => {
          logToFile(
            'logger',
            `Firmy, którym brakuje miąższości: nip: ${
              company.nip
            } brakuje m3: ${new BigNumber(company.minVolume).minus(
              new BigNumber(company.volumeWon)
            )}`
          );
        });

        let belowCompaniesAllDiffrences = belowCompanies.map((company) =>
          new BigNumber(company.minVolume).minus(
            new BigNumber(company.volumeWon)
          )
        );

        let belowCompaniesMaxDiffrence = Math.max(
          ...belowCompaniesAllDiffrences
        );

        let maxBelowCompanies = belowCompanies.filter(
          (company) =>
            new BigNumber(company.minVolume).minus(
              new BigNumber(company.volumeWon)
            ) == belowCompaniesMaxDiffrence
        );

        const excludedOffer = excludeRandomOffer(maxBelowCompanies);

        for (let company of databaseCompanies) {
          if (excludedOffer && company.nip === excludedOffer.nip) {
            company.status = 'excluded';
            await company.save({ session });
          }
        }

        // removes the offers of company with the highest minVolume-volumeWon value
        databaseOffers = await Offers.find().session(session);
        if (excludedOffer) {
          databaseOffers.forEach((offer) => {
            if (offer.nip === excludedOffer.nip && offer.bid > 0) {
              logToFile(
                'logger',
                `Oferta firmy nip: ${offer.nip} na LOS nr ${offer.productNumber} o wartości: ${offer.bid} PLN została wykluczona`
              );
            }
          });

          await Offers.updateMany(
            {
              nip: excludedOffer.nip,
              bid: { $gt: 0 },
            },
            {
              $set: {
                bid: 0,
              },
            },
            { session }
          );

          //clears the bid assigned to all product
          await Products.updateMany(
            {},
            {
              $set: {
                maxOfferCompany: '',
                maxOfferBid: 0,
                finalPriceTotal: 0,
              },
            },
            { session }
          );

          //clears the volume and products list assigned to all companies
          await Companies.updateMany(
            {},
            {
              $set: {
                volumeWon: 0,
                productsWon: [],
              },
            },
            { session }
          );
        }
        logToFile(
          'logger',
          `PRZYPISYWANIE OFERT - ZAKOŃCZENIE - ETAP ${stepsCounter}`
        );
        console.log(`step ${stepsCounter} finished`);
      } while (belowCompanies.length > 0);
      logToFile('logger', `PRZYPISYWANIE SKOŃCZONE`);
      console.log('estimating finished');

      status.winners = true;
      await status.save({ session });
      await session.commitTransaction();
      session.endSession();
      transactionFinished = true;

      res.status(200).json({ message: 'OK' });
    } else {
      res.status(400).json({ message: 'Winners already estimated' });
    }
  } catch (err) {
    if (!transactionFinished) {
      await session.abortTransaction();
      session.endSession();
      console.log('Transaction failed');

      const outputFiles = fs.readdirSync(
        path.join(__dirname, '../files/output/')
      );
      if (outputFiles.includes('logger.txt')) {
        fs.unlinkSync(path.join(__dirname, '../files/output/logger.txt'));
      }
    }

    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

// export const estimateWinner = async (req, res) => {
//   try {
//     const databaseProducts = await Products.find();
//     const databaseOffers = await Offers.find();
//     const databaseCompanies = await Companies.find();
//     const status = await Status.findOne();

//     if (
//       databaseProducts.length > 0 &&
//       databaseOffers.length > 0 &&
//       databaseCompanies.length > 0 &&
//       !status.winners
//     ) {
//       console.log('estimating started');
//       let belowCompanies = [];
//       let stepsCounter = 0;

//       do {
//         stepsCounter++;
//         logToFile(
//           'logger',
//           `PRZYPISYWANIE OFERT - ROZPOCZĘCIE - ETAP ${stepsCounter}...`
//         );

//         //assigns highest bid to product
//         for (let product of databaseProducts) {
//           const productOffers = databaseOffers.filter(
//             (offer) =>
//               product.productNumber === offer.productNumber &&
//               offer.bid > 0 &&
//               offer.bid > product.startingPriceSingle
//           );

//           if (productOffers.length) {
//             const bids = productOffers.map((offer) => offer.bid);

//             const maxBid = Math.max(...bids);

//             const maxOffers = productOffers.filter(
//               (offer) => offer.bid === maxBid
//             );

//             const winningOffer = pickRandomOffer(product, maxOffers);

//             product.maxOfferCompany = winningOffer.nip;
//             product.maxOfferBid = winningOffer.bid;
//             product.finalPriceTotal = new BigNumber(product.volume).times(
//               new BigNumber(winningOffer.bid)
//             );
//             await product.save();
//           } else {
//             logToFile('logger', `LOS nr ${product.productNumber} - brak ofert`);
//           }
//         }

//         //accumulates volumeWon of company and creates a list of products it has won
//         for (let company of databaseCompanies) {
//           for (let product of databaseProducts) {
//             if (company.nip === product.maxOfferCompany) {
//               company.volumeWon = new BigNumber(company.volumeWon).plus(
//                 new BigNumber(product.volume)
//               );
//               company.productsWon.push(product.productNumber);
//             }
//           }
//           await company.save();
//         }

//         //finds companies that didnt bought enough volume and picks one with the highest missing volume at random
//         belowCompanies = databaseCompanies.filter(
//           (company) =>
//             new BigNumber(company.minVolume).minus(
//               new BigNumber(company.volumeWon)
//             ) > 0 && company.status === 'active'
//         );

//         belowCompanies.map((company) => {
//           logToFile(
//             'logger',
//             `Firmy, którym brakuje miąższości: nip: ${
//               company.nip
//             } brakuje m3: ${new BigNumber(company.minVolume).minus(
//               new BigNumber(company.volumeWon)
//             )}`
//           );
//         });

//         let belowCompaniesAllDiffrences = belowCompanies.map((company) =>
//           new BigNumber(company.minVolume).minus(
//             new BigNumber(company.volumeWon)
//           )
//         );

//         let belowCompaniesMaxDiffrence = Math.max(
//           ...belowCompaniesAllDiffrences
//         );

//         let maxBelowCompanies = belowCompanies.filter(
//           (company) =>
//             new BigNumber(company.minVolume).minus(
//               new BigNumber(company.volumeWon)
//             ) == belowCompaniesMaxDiffrence
//         );

//         const excludedOffer = excludeRandomOffer(maxBelowCompanies);

//         for (let company of databaseCompanies) {
//           if (excludedOffer && company.nip === excludedOffer.nip) {
//             company.status = 'excluded';
//             await company.save();
//           }
//         }

//         //removes the offers of company with the highest minVolume-volumeWon value
//         if (excludedOffer) {
//           for (let offer of databaseOffers) {
//             if (offer.nip === excludedOffer.nip && offer.bid > 0) {
//               logToFile(
//                 'logger',
//                 `Oferta firmy nip: ${offer.nip} na LOS nr ${offer.productNumber} o wartości: ${offer.bid} PLN została wykluczona`
//               );
//               offer.bid = 0;
//               await offer.save();
//             }
//           }

//           //clears the bid assigned to all product
//           for (let product of databaseProducts) {
//             product.maxOfferCompany = '';
//             product.maxOfferBid = 0;
//             product.finalPriceTotal = 0;
//             await product.save();
//           }

//           //clears the volume and products list assigned to all companies
//           for (let company of databaseCompanies) {
//             company.volumeWon = 0;
//             company.productsWon = [];
//             await company.save();
//           }
//         }
//         logToFile(
//           'logger',
//           `PRZYPISYWANIE OFERT - ZAKOŃCZENIE - ETAP ${stepsCounter}`
//         );
//         console.log(`step ${stepsCounter} finished`);
//       } while (belowCompanies.length > 0);
//       logToFile('logger', `PRZYPISYWANIE SKOŃCZONE`);
//       console.log('estimating finished');

//       status.winners = true;
//       await status.save();

//       res.status(200).json({ message: 'OK' });
//     } else {
//       res.status(400).json({ message: 'Winners already estimated' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err });
//     console.log(err);
//   }
// };

export const addContracts = async (req, res) => {
  try {
    let contracts = await Contracts.find();
    let companies = await Companies.find();
    let products = await Products.find();
    let offers = await Offers.find();
    let status = await Status.findOne();

    if (
      companies.length > 0 &&
      products.length > 0 &&
      offers.length > 0 &&
      status.winners &&
      contracts.length === 0
    ) {
      const databaseCompanies = await Companies.find().populate({
        path: 'productsWon',
        model: 'Products',
        localField: 'productsWon',
        foreignField: 'productNumber',
      });

      let contractCounter = 0;
      for (let company of databaseCompanies) {
        if (company.productsWon.length > 0) {
          contractCounter++;
          const newContract = new Contracts({
            number: generateContractNumber(contractCounter),
            buyer: {
              nip: company.nip,
              name: company.name,
              zipCode: company.zipCode,
              homeZipCode: company.homeZipCode,
              homeZipCodeSecond: company.homeZipCodeSecond,
              homeZipCodeThird: company.homeZipCodeThird,
              courtZipCode: company.courtZipCode,
              courtDepartment: company.courtDepartment,
              krsNumber: company.krsNumber,
              regonNumber: company.regonNumber,
              bdoNumber: company.bdoNumber,
              firstRepresentative: company.firstRepresentative,
              secondRepresentative: company.secondRepresentative,
              thirdRepresentative: company.thirdRepresentative,
              isLegalPerson: company.isLegalPerson ? true : false,
              isNaturalPerson: company.isNaturalPerson ? true : false,
              isPartnership: company.isPartnership ? true : false,
              vat: company.vat,
              paperForm: company.paperForm ? true : false,
              electronicForm: company.electronicForm ? true : false,
            },
            timber: {
              list: [...company.productsWon],
              totalVolume: company.volumeWon,
              totalPrice: company.productsWon.reduce(
                (a, b) =>
                  new BigNumber(a).plus(new BigNumber(b.finalPriceTotal)),
                new BigNumber(0)
              ),
            },
            dates: {
              contractDate: convertDate(contractDate),
              submissionStart: convertDate(submissionStart),
              submissionEnd: convertDate(submissionEnd),
              receiptOfProducts: convertDate(receiptOfProducts),
              salesStart: convertDate(salesStart),
              salesEnd: convertDate(salesEnd),
            },
          });
          await newContract.save();
          console.log(
            `Contract of the company nip: ${newContract.buyer.nip} has been added`
          );
        }
      }

      contracts = await Contracts.find().populate({
        path: 'timber.list',
        model: 'Products',
      });

      for (let contract of contracts) {
        createDoc('contract', 'inputUmowa', contract);
        createDoc('annex', 'inputAnnex', contract);
      }
      zipFiles();
      res.status(200).json({ message: 'OK', contracts });
    } else {
      res.status(400).json({ message: 'Bad request', contracts });
      console.log('Contracts already exist or insufficient data provided');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const getContracts = async (req, res) => {
  try {
    const contracts = await Contracts.find();
    if (contracts.length > 0) {
      res.status(200).json({ message: 'OK', contracts });
    } else res.status(400).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const downloadContracts = async (req, res) => {
  try {
    const filename = 'umowy';
    const filePath = path.join(__dirname, `../files/output/umowy.zip`);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(filename)}"`
    );
    res.status(200).sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const downloadLogger = async (req, res) => {
  try {
    const filename = 'logger';
    const filePath = path.join(__dirname, `../files/output/logger.txt`);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(filename)}"`
    );
    res.status(200).sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const removeAllContractsData = async (req, res) => {
  try {
    let offers = await Offers.find();
    let companies = await Companies.find();
    let contracts = await Contracts.find();
    const inputFiles = fs.readdirSync(path.join(__dirname, '../files/input/'));
    const contractsInputFiles = inputFiles.filter((file) =>
      file.includes('offers') || file.includes('companies') ? file : ''
    );
    const outputFiles = fs.readdirSync(
      path.join(__dirname, '../files/output/')
    );
    const contractsOutputFiles = outputFiles.filter((file) =>
      file.includes('nip') || file.includes('logger') || file.includes('umowy')
        ? file
        : ''
    );

    if (
      offers.length > 0 ||
      companies.length > 0 ||
      contracts.length > 0 ||
      contractsInputFiles.length > 0 ||
      contractsOutputFiles.length > 0
    ) {
      await Offers.deleteMany();
      await Companies.deleteMany();
      await Contracts.deleteMany();

      offers = await Offers.find();
      companies = await Companies.find();
      contracts = await Contracts.find();

      if (contractsInputFiles.length > 0) {
        contractsInputFiles.forEach((file) => {
          fs.unlinkSync(path.join(__dirname, '../files/input/', file));
        });
      }

      if (contractsOutputFiles.length > 0) {
        contractsOutputFiles.forEach((file) => {
          fs.unlinkSync(path.join(__dirname, '../files/output/', file));
        });
      }

      let status = await Status.findOne();
      status.winners = false;
      await status.save();
      status = await Status.findOne();

      res
        .status(200)
        .json({ message: 'OK', offers, companies, contracts, status });
      console.log('Offers, companies and contracts data have been removed');
    } else {
      res.status(400).json({ message: 'Not found...' });
      console.log('Offers, companies and contracts data do not exist');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export default {
  importOffers,
  getOffers,
  importCompanies,
  getCompanies,
  estimateWinner,
  addContracts,
  getContracts,
  downloadContracts,
  downloadLogger,
  removeAllContractsData,
};
