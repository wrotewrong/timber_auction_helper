import mongoose from 'mongoose';

const offersSchema = new mongoose.Schema({
  productNumber: { type: Number, required: true, ref: 'Product' },
  nip: { type: Number, required: true, ref: 'Company' },
  bid: { type: Number, required: true },
});

export default mongoose.model('Offers', offersSchema);
