import Offers from '../models/offersModel.mjs';
import Companies from '../models/companiesModel.mjs';
import Products from '../models/productsModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import BigNumber from 'bignumber.js';
import prepareContractsMDB from '../utils/prepareContractsMDB.mjs';
import Contracts from '../models/contractsModel.mjs';
import {
  submissionStart,
  submissionEnd,
  receiptOfProducts,
  salesStart,
  salesEnd,
} from '../backendConfig.mjs';
import convertDate from '../utils/convertDate.mjs';

export const importCompanies = async (req, res) => {
  try {
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

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export const importOffers = async (req, res) => {
  try {
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

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

// //estimateWinner first method - eliminate product when company minVplume is below volumeWon
// export const estimateWinner = async (req, res) => {
//   try {
//     const databaseProducts = await Products.find();
//     const databaseOffers = await Offers.find();
//     const databaseCompanies = await Companies.find();

//     for (let product of databaseProducts) {
//       for (let offer of databaseOffers) {
//         if (
//           product.productNumber === offer.productNumber &&
//           offer.bid > product.maxOfferBid
//         ) {
//           product.maxOfferCompany = offer.nip;
//           product.maxOfferBid = offer.bid;
//           product.finalPriceTotal = new BigNumber(product.volume).times(
//             new BigNumber(offer.bid)
//           );
//         }
//       }
//       await product.save();
//     }

//     for (let company of databaseCompanies) {
//       for (let product of databaseProducts) {
//         if (company.nip === product.maxOfferCompany) {
//           company.volumeWon = new BigNumber(company.volumeWon).plus(
//             new BigNumber(product.volume)
//           );
//           company.productsWon.push(product.productNumber);
//         }
//       }
//       await company.save();
//     }

//     for (let product of databaseProducts) {
//       for (let company of databaseCompanies) {
//         if (
//           company.volumeWon < company.minVolume &&
//           company.productsWon.includes(product.productNumber)
//         ) {
//           product.maxOfferCompany = '';
//           product.maxOfferBid = 0;
//           product.finalPriceTotal = 0;
//         }
//       }
//       await product.save();
//     }

//     for (let company of databaseCompanies) {
//       if (company.volumeWon < company.minVolume) {
//         company.volumeWon = 0;
//         company.productsWon = [];
//       }
//       await company.save();
//     }

//     res.status(200).json({ message: 'OK' });
//   } catch (err) {
//     res.status(500).json({ message: err });
//     console.log(err);
//   }
// };

//estimateWinner second method - eliminate companies offers based on the value: minVolume-volumeWon
export const estimateWinner = async (req, res) => {
  try {
    const databaseProducts = await Products.find();
    const databaseOffers = await Offers.find();
    const databaseCompanies = await Companies.find();

    let belowCompanies = [];
    do {
      //assigns highest bid to product
      for (let product of databaseProducts) {
        for (let offer of databaseOffers) {
          if (
            product.productNumber === offer.productNumber &&
            offer.bid > product.maxOfferBid
          ) {
            product.maxOfferCompany = offer.nip;
            product.maxOfferBid = offer.bid;
            product.finalPriceTotal = new BigNumber(product.volume).times(
              new BigNumber(offer.bid)
            );
          }
        }
        await product.save();
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

      //finds and sort companies by minVolume-volumeWon value
      belowCompanies = [];
      for (let company of databaseCompanies) {
        if (
          company.volumeWon > 0 &&
          company.minVolume - company.volumeWon > 0
        ) {
          belowCompanies.push(company);
        }
      }
      belowCompanies.sort(
        (a, b) => b.minVolume - b.volumeWon - (a.minVolume - a.volumeWon)
      );

      //removes the offers of company with the highest minVolume-volumeWon value
      if (belowCompanies.length > 0) {
        for (let offer of databaseOffers) {
          if (offer.nip === belowCompanies[0].nip) {
            console.log(
              `Bid for timber: ${offer.productNumber} with: ${offer.bid} PLN from nip: ${offer.nip} has been excluded`
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
        belowCompanies.shift();
      }
    } while (belowCompanies.length > 0);

    res.status(200).json({ message: 'OK' });
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
    console.log(databaseCompanies);

    for (let company of databaseCompanies) {
      if (company.productsWon.length > 0) {
        const newContract = new Contracts({
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

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export default {
  importOffers,
  importCompanies,
  estimateWinner,
  addContracts,
};
