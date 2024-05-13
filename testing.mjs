import importProducts from './utils/importProducts.mjs';
import createDoc from './utils/createDoc.mjs';
import estimateWinner from './utils/estimateWinner.mjs';

const products = [
  {
    productNumber: 1,
    forestDistrict: 'Brzeziny',
    volume: 14.76,
    startingPrice: 5000.62,
    maxBid: { company: undefined, offer: 0 },
  },
  {
    productNumber: 2,
    forestDistrict: 'Bełchatów',
    volume: 11.76,
    startingPrice: 2783.62,
    maxBid: { company: undefined, offer: 0 },
  },
  {
    productNumber: 3,
    forestDistrict: 'Kutno',
    volume: 12.0,
    startingPrice: 3333.62,
    maxBid: { company: undefined, offer: 0 },
  },
];

const companies = [
  {
    companyNip: '123123123',
    companyName: 'COMPANY A',
    minVolume: 20,
    volumeWon: 0,
    productsWon: [],
  },
  {
    companyNip: '456456456',
    companyName: 'COMPANY B',
    minVolume: 10,
    volumeWon: 0,
    productsWon: [],
  },
  {
    companyNip: '678678678',
    companyName: 'COMPANY C',
    minVolume: 20,
    volumeWon: 0,
    productsWon: [],
  },
];

const offers = [
  { productNumber: 1, bidder: 'COMPANY A', bid: 5600 },
  { productNumber: 1, bidder: 'COMPANY B', bid: 5300 },
  { productNumber: 1, bidder: 'COMPANY C', bid: 5400 },
  { productNumber: 1, bidder: 'COMPANY D', bid: 5500 },
  { productNumber: 2, bidder: 'COMPANY A', bid: 4500 },
  { productNumber: 2, bidder: 'COMPANY B', bid: 4300 },
  { productNumber: 2, bidder: 'COMPANY C', bid: 4200 },
  { productNumber: 3, bidder: 'COMPANY A', bid: 4300 },
  { productNumber: 3, bidder: 'COMPANY B', bid: 4500 },
];

const contracts = [];

// for (let product of products) {
//   createDoc('contract', product);
// }

estimateWinner(products, offers, companies);
