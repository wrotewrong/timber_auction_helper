import {
  submissionStart,
  submissionEnd,
  receiptOfProducts,
  salesStart,
  salesEnd,
} from '../backendConfig.mjs';
import convertDate from './convertDate.mjs';

const prepareContracts = (products, companies) => {
  const contracts = [];

  for (let company of companies) {
    if (company.productsWon.length > 0) {
      let contract = {
        buyer: {
          nip: company.companyNip,
          name: company.companyName,
          zipCode: company.companyZipCode,
          courtZipCode: company.courtZipCode,
          krsNumber: company.companyKrsNumber,
          regonNumber: company.companyRegonNumber,
          bdoNumber: company.companyBdoNumber || 'nie dotyczy',
          firstRepresentative: company.firstRepresentative,
          secondRepresentative: company.secondRepresentative || 'nie dotyczy',
        },
        timber: {
          list: [],
          totalVolume: company.volumeWon,
          totalPrice: 0,
        },
        dates: {
          submissionStart: convertDate(submissionStart),
          submissionEnd: convertDate(submissionEnd),
          receiptOfProducts: convertDate(receiptOfProducts),
          salesStart: convertDate(salesStart),
          salesEnd: convertDate(salesEnd),
        },
      };
      for (let productWon of company.productsWon) {
        for (let product of products) {
          if (productWon === product.productNumber) {
            contract.timber.list.push(product);
            contract.timber.totalPrice += product.volume * product.maxBid.offer;
          }
        }
      }
      contracts.push(contract);
    }
  }

  return contracts;
};

export default prepareContracts;
