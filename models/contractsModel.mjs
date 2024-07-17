import mongoose from 'mongoose';

const contractsSchema = new mongoose.Schema({
  number: { type: String, required: true },
  buyer: {
    nip: { type: String, required: true },
    name: { type: String, required: true },
    zipCode: { type: String, required: true },
    homeZipCode: { type: String, required: false },
    homeZipCodeSecond: { type: String, required: false },
    homeZipCodeThird: { type: String, required: false },
    courtZipCode: { type: String, required: false },
    courtDepartment: { type: String, required: false },
    krsNumber: { type: String, required: false },
    regonNumber: { type: String, required: true },
    bdoNumber: { type: String, required: false },
    firstRepresentative: { type: String, required: true },
    secondRepresentative: { type: String, required: false },
    thirdRepresentative: { type: String, required: false },
    isLegalPerson: { type: Boolean, required: false },
    isNaturalPerson: { type: Boolean, required: false },
    isPartnership: { type: Boolean, required: false },
    vat: { type: String, required: true },
  },
  timber: {
    list: [{ type: mongoose.Types.ObjectId, ref: 'Products' }],
    totalVolume: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  dates: {
    contractDate: { type: String, required: true },
    submissionStart: { type: String, required: true },
    submissionEnd: { type: String, required: true },
    receiptOfProducts: { type: String, required: true },
    salesStart: { type: String, required: true },
    salesEnd: { type: String, required: true },
  },
});

export default mongoose.model('Contract', contractsSchema);
