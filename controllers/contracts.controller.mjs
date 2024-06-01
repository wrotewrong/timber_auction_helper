import Offers from '../models/offersModel.mjs';
import Companies from '../models/companiesModel.mjs';
import importExcelDataMDB from '../utils/importExcelDataMDB.mjs';

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

export const estimateWinner = (req, res) => {
  try {
    res.status(200).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
};

export default { importOffers, importCompanies, estimateWinner };
