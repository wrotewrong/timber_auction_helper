import mongoose from 'mongoose';
import {
  submissionStart,
  submissionEnd,
  receiptOfProducts,
  salesStart,
  salesEnd,
} from '../backendConfig.mjs';
import convertDate from './convertDate.mjs';

const contractsSchema = new mongoose.Schema({
  buyer: {
    nip: { type: String, required: true },
    name: { type: String, required: true },
    zipCode: { type: String, required: true },
    homeZipCode: { type: String, required: true },
    courtZipCode: { type: String, required: true },
    krsNumber: { type: String, required: false },
    regonNumber: { type: String, required: true },
    bdoNumber: { type: String, default: 'nie dotyczy', required: false },
    firstRepresentative: { type: String, required: true },
    secondRepresentative: {
      type: String,
      default: 'nie dotyczy',
      required: false,
    },
    isLegalPerson: { type: Boolean, required: false },
    isNaturalPerson: { type: Boolean, required: false },
  },
  timber: {
    list: { type: Array, default: [], required: true },
    totalVolume: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  dates: {
    submissionStart: {
      type: String,
      default: convertDate(submissionStart),
      required: true,
    },
    submissionEnd: {
      type: String,
      default: convertDate(submissionEnd),
      required: true,
    },
    receiptOfProducts: {
      type: String,
      default: convertDate(receiptOfProducts),
      required: true,
    },
    salesStart: {
      type: String,
      default: convertDate(salesStart),
      required: true,
    },
    salesEnd: {
      type: String,
      default: convertDate(salesEnd),
      required: true,
    },
  },
});

export default mongoose.model('Contract', contractsSchema);
