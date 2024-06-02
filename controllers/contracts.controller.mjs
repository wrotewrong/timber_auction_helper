import Offers from '../models/offersModel.mjs';
import Companies from '../models/companiesModel.mjs';
import Products from '../models/productsModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';
import BigNumber from 'bignumber.js';

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

export const estimateWinner = async (req, res) => {
  try {
    const databaseProducts = await Products.find();
    const databaseOffers = await Offers.find();
    const databaseCompanies = await Companies.find();

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

    for (let product of databaseProducts) {
      for (let company of databaseCompanies) {
        if (
          company.volumeWon < company.minVolume &&
          company.productsWon.includes(product.productNumber)
        ) {
          product.maxOfferCompany = '';
          product.maxOfferBid = 0;
          product.finalPriceTotal = 0;
        }
      }
      await product.save();
    }

    for (let company of databaseCompanies) {
      if (company.volumeWon < company.minVolume) {
        company.volumeWon = 0;
        company.productsWon = [];
      }
      await company.save();
    }

    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export default { importOffers, importCompanies, estimateWinner };
