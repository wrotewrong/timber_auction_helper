import Offers from '../models/offersModel.mjs';
import Companies from '../models/companiesModel.mjs';
import Products from '../models/productsModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import BigNumber from 'bignumber.js';
import prepareContractsMDB from '../utils/prepareContractsMDB.mjs';
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

export const importCompanies = async (req, res) => {
  try {
    let companies = await Companies.find();
    if (companies.length === 0) {
      const importedCompanies = await importExcelDataMDB(
        'companies',
        'companiesDataMDB'
      )
        .then((companies) => {
          return companies;
        })
        .catch((error) => {
          console.error('Error importing companies:', error);
        });

      for (let company of importedCompanies) {
        const newCompany = new Companies(company);
        await newCompany.save();
        console.log(`Company nip: ${newCompany.nip} has been added`);
      }
      companies = await Companies.find();
    }
    res.status(200).json({ message: 'OK', companies });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Companies.find();
    if (companies.length > 0) {
      res.status(200).json({ message: 'OK', companies });
    } else res.status(400).json({ message: 'Companies not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

export const importOffers = async (req, res) => {
  try {
    let offers = await Offers.find();
    if (offers.length === 0) {
      const importedOffers = await importExcelDataMDB('offers', 'offersDataMDB')
        .then((offers) => {
          return offers;
        })
        .catch((error) => {
          console.error('Error importing offers:', error);
        });

      for (let offer of importedOffers) {
        const newOffer = new Offers(offer);
        await newOffer.save();
        console.log(
          `Offer by company nip: ${newOffer.nip} for product ${newOffer.productNumber} has been added`
        );
      }
      offers = await Offers.find();
    }
    res.status(200).json({ message: 'OK', offers });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = await Offers.find();
    if (offers.length > 0) {
      res.status(200).json({ message: 'OK', offers });
    } else res.status(400).json({ message: 'Offers not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

//estimateWinner method - eliminate companies offers based on the value: minVolume-volumeWon
export const estimateWinner = async (req, res) => {
  try {
    const databaseProducts = await Products.find();
    const databaseOffers = await Offers.find();
    const databaseCompanies = await Companies.find();
    const status = await Status.findOne();

    if (!status.winners) {
      let belowCompanies = [];
      let stepsCounter = 0;

      do {
        stepsCounter++;
        logToFile(
          'logger',
          `PRZYPISYWANIE OFERT - ROZPOCZĘCIE - ETAP ${stepsCounter}...`
        );

        //assigns highest bid to product
        for (let product of databaseProducts) {
          const productOffers = databaseOffers.filter(
            (offer) =>
              product.productNumber === offer.productNumber && offer.bid > 0
          );
          // console.log('productOffers', productOffers);

          if (productOffers.length) {
            const bids = productOffers.map((offer) => offer.bid);
            // console.log('bids', bids);

            const maxBid = Math.max(...bids);
            // console.log('maxBid', maxBid);

            const maxOffers = productOffers.filter(
              (offer) => offer.bid === maxBid
            );
            // console.log('maxOffers', maxOffers);

            const winningOffer = pickRandomOffer(product, maxOffers);

            product.maxOfferCompany = winningOffer.nip;
            product.maxOfferBid = winningOffer.bid;
            product.finalPriceTotal = new BigNumber(product.volume).times(
              new BigNumber(winningOffer.bid)
            );
            await product.save();
          } else {
            logToFile('logger', `LOS nr ${product.productNumber} - brak ofert`);
          }
        }

        //accumulates volumeWon of company and creates a list of products it has won
        for (let company of databaseCompanies) {
          for (let product of databaseProducts) {
            if (company.nip === product.maxOfferCompany) {
              company.volumeWon = new BigNumber(company.volumeWon).plus(
                new BigNumber(product.volume)
              );
              company.productsWon.push(product.productNumber);
            }
          }
          await company.save();
        }

        //finds companies that didnt bought enough volume and picks one with the highest missing volume at random
        belowCompanies = databaseCompanies.filter(
          (company) =>
            company.minVolume - company.volumeWon > 0 &&
            company.status === 'active'
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
        console.log('belowCompaniesAllDiffrences', belowCompaniesAllDiffrences);

        let belowCompaniesMaxDiffrence = Math.max(
          ...belowCompaniesAllDiffrences
        );
        console.log('belowCompaniesMaxDiffrence', belowCompaniesMaxDiffrence);

        let maxBelowCompanies = belowCompanies.filter(
          (company) =>
            new BigNumber(company.minVolume).minus(
              new BigNumber(company.volumeWon)
            ) == belowCompaniesMaxDiffrence
        );
        console.log('maxBelowCompanies', maxBelowCompanies);

        const excludedOffer = excludeRandomOffer(maxBelowCompanies);

        console.log('excludedOffer', excludedOffer);

        for (let company of databaseCompanies) {
          if (excludedOffer && company.nip === excludedOffer.nip) {
            company.status = 'excluded';
            await company.save();
          }
        }

        //removes the offers of company with the highest minVolume-volumeWon value
        if (excludedOffer) {
          for (let offer of databaseOffers) {
            if (offer.nip === excludedOffer.nip && offer.bid > 0) {
              logToFile(
                'logger',
                `Oferta firmy nip: ${offer.nip} na LOS nr ${offer.productNumber} o wartości: ${offer.bid} PLN została wykluczona`
              );
              offer.bid = 0;
              await offer.save();
            }
          }

          //clears the bid assigned to all product
          for (let product of databaseProducts) {
            product.maxOfferCompany = '';
            product.maxOfferBid = 0;
            product.finalPriceTotal = 0;
            await product.save();
          }

          //clears the volume and products list assigned to all companies
          for (let company of databaseCompanies) {
            company.volumeWon = 0;
            company.productsWon = [];
            await company.save();
          }
        }
        logToFile(
          'logger',
          `PRZYPISYWANIE OFERT - ZAKOŃCZENIE - ETAP ${stepsCounter}`
        );
      } while (belowCompanies.length > 0);
      logToFile('logger', `PRZYPISYWANIE SKOŃCZONE`);

      status.winners = true;
      await status.save();

      res.status(200).json({ message: 'OK' });
    } else {
      res.status(200).json({ message: 'Winners already estimated' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export const addContracts = async (req, res) => {
  try {
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
            courtZipCode: company.courtZipCode,
            krsNumber: company.krsNumber,
            regonNumber: company.regonNumber,
            bdoNumber: company.bdoNumber || 'nie dotyczy',
            firstRepresentative: company.firstRepresentative,
            secondRepresentative: company.secondRepresentative || 'nie dotyczy',
            isLegalPerson: company.isLegalPerson ? true : false,
            isNaturalPerson: company.isNaturalPerson ? true : false,
          },
          timber: {
            list: [...company.productsWon],
            totalVolume: company.volumeWon,
            totalPrice: company.productsWon.reduce(
              (a, b) => new BigNumber(a).plus(new BigNumber(b.finalPriceTotal)),
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

    const contracts = await Contracts.find().populate({
      path: 'timber.list',
      model: 'Products',
    });

    for (let contract of contracts) {
      createDoc('contract', 'inputUmowa', contract);
      createDoc('annex', 'inputAnnex', contract);
    }

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export default {
  importOffers,
  getOffers,
  importCompanies,
  getCompanies,
  estimateWinner,
  addContracts,
};
