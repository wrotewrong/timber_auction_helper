import mongoose from 'mongoose';

const contractsSchema = new mongoose.Schema({
  buyer: {
    nip: { type: String, required: true },
    name: { type: String, required: true },
    zipCode: { type: String, required: true },
    homeZipCode: { type: String, required: true },
    courtZipCode: { type: String, required: true },
    krsNumber: { type: String, required: false },
    regonNumber: { type: String, required: true },
    bdoNumber: { type: String, required: false },
    firstRepresentative: { type: String, required: true },
    secondRepresentative: { type: String, required: false },
    isLegalPerson: { type: Boolean, required: false },
    isNaturalPerson: { type: Boolean, required: false },
  },
  timber: {
    list: { type: Array, required: true },
    totalVolume: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  dates: {
    submissionStart: { type: String, required: true },
    submissionEnd: { type: String, required: true },
    receiptOfProducts: { type: String, required: true },
    salesStart: { type: String, required: true },
    salesEnd: { type: String, required: true },
  },
});

export default mongoose.model('Contract', contractsSchema);
