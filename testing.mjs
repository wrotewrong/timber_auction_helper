import importExcelData from './utils/importExcelData.mjs';
import createDoc from './utils/createDoc.mjs';
import estimateWinner from './utils/estimateWinner.mjs';
import prepareContracts from './utils/prepareContracts.mjs';

// const products = [
//   {
//     productNumber: 1,
//     forestDistrict: 'Kutno',
//     unit: 'random lctwo',
//     woodNumber: '123123123',
//     species: 'DB',
//     length: 8.5,
//     diameter: 45,
//     volume: 14.76,
//     class: 'WA1',
//     priceSingle: 5000.62,
//     priceTotal: 45000.62,
//     maxBid: { company: undefined, offer: 0 },
//   },
//   {
//     productNumber: 2,
//     forestDistrict: 'Brzeziny',
//     unit: 'random lctwo',
//     woodNumber: '345345345',
//     species: 'DB',
//     length: 5.5,
//     diameter: 35,
//     volume: 9.76,
//     class: 'WA1',
//     priceSingle: 2000.62,
//     priceTotal: 25000.62,
//     maxBid: { company: undefined, offer: 0 },
//   },
//   {
//     productNumber: 3,
//     forestDistrict: 'Gostynin',
//     unit: 'random lctwo',
//     woodNumber: '234234234',
//     species: 'BK',
//     length: 2.5,
//     diameter: 35,
//     volume: 4.76,
//     class: 'WA0',
//     priceSingle: 3000.62,
//     priceTotal: 35000.62,
//     maxBid: { company: undefined, offer: 0 },
//   },
// ];

// const companies = [
//   {
//     companyNip: '123123123',
//     companyName: 'COMPANY A',
//     minVolume: 5,
//     volumeWon: 0,
//     productsWon: [],
//   },
//   {
//     companyNip: '456456456',
//     companyName: 'COMPANY B',
//     minVolume: 5,
//     volumeWon: 0,
//     productsWon: [],
//   },
//   {
//     companyNip: '678678678',
//     companyName: 'COMPANY C',
//     minVolume: 5,
//     volumeWon: 0,
//     productsWon: [],
//   },
// ];

// const offers = [
//   { productNumber: 1, bidder: 'COMPANY A', bid: 5600 },
//   { productNumber: 1, bidder: 'COMPANY B', bid: 5300 },
//   { productNumber: 1, bidder: 'COMPANY C', bid: 5400 },
//   { productNumber: 1, bidder: 'COMPANY D', bid: 5500 },
//   { productNumber: 2, bidder: 'COMPANY A', bid: 4500 },
//   { productNumber: 2, bidder: 'COMPANY B', bid: 4300 },
//   { productNumber: 2, bidder: 'COMPANY C', bid: 4200 },
//   { productNumber: 3, bidder: 'COMPANY A', bid: 4300 },
//   { productNumber: 3, bidder: 'COMPANY B', bid: 4500 },
// ];

const importedProducts = await importExcelData('products', 'productsData')
  .then((products) => {
    return products;
  })
  .catch((error) => {
    console.error('Error importing products:', error);
  });

const importedCompanies = await importExcelData('companies', 'companiesData')
  .then((companies) => {
    return companies;
  })
  .catch((error) => {
    console.error('Error importing companies:', error);
  });

const importedOffers = await importExcelData('offers', 'offersData')
  .then((offers) => {
    return offers;
  })
  .catch((error) => {
    console.error('Error importing offers:', error);
  });

const [resolvedProducts, resolvedCompanies] = estimateWinner(
  importedProducts,
  importedOffers,
  importedCompanies
);

const contracts = prepareContracts(resolvedProducts, resolvedCompanies);

for (let contract of contracts) {
  createDoc('contract', 'inputUmowa', contract);
}

// console.log(resolvedProducts);
// console.log(resolvedCompanies);
console.log(contracts);
