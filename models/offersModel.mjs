import mongoose from 'mongoose';

const offersSchema = new mongoose.Schema({
  productNumber: { type: String, required: true, ref: 'Product' },
  nip: { type: String, required: true, ref: 'Company' },
  bid: { type: Number, required: true },
});

export default mongoose.model('Offers', offersSchema);
