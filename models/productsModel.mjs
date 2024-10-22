import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  productNumber: { type: String, required: true },
  forestDistrict: { type: String, required: true },
  woodNumber: { type: String, required: true },
  species: { type: String, required: true },
  length: { type: Number, required: true },
  diameter: { type: String, required: true },
  volume: { type: Number, required: true },
  class: { type: String, required: true },
  startingPriceSingle: { type: Number, required: true },
  maxOfferCompany: { type: String, default: '', required: false },
  maxOfferBid: { type: Number, default: 0, required: false },
  finalPriceTotal: { type: Number, default: 0, required: false },
});

export default mongoose.model('Products', productsSchema);
