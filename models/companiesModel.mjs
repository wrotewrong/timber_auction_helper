import mongoose from 'mongoose';

const companiesSchema = new mongoose.Schema({
  nip: { type: Number, required: true },
  name: { type: String, required: true },
  zipCode: { type: String, required: true },
  homeCode: { type: String, required: true },
  courtZipCode: { type: String, required: true },
  krsNumber: { type: Number, required: true },
  regonNumber: { type: Number, required: true },
  bdoNumber: { type: Number, required: true },
  firstRepresentative: { type: String, required: true },
  secondRepresentative: { type: String, required: true },
  isLegalPerson: { type: Boolean, required: false },
  isNaturalPerson: { type: Boolean, required: false },
  minVolume: { type: Number, required: false },
});

export default mongoose.model('Company', companiesSchema);
