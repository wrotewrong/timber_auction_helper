import mongoose from 'mongoose';

const companiesSchema = new mongoose.Schema({
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
  isLegalPerson: { type: String, required: false },
  isNaturalPerson: { type: String, required: false },
  minVolume: { type: Number, required: true },
  volumeWon: { type: Number, default: 0, required: true },
  productsWon: [{ type: String, required: true }],
  status: { type: String, default: 'active', required: true },
});

export default mongoose.model('Company', companiesSchema);
