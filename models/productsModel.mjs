import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  productNumber: { type: Number, required: true },
  forestDistrict: { type: String, required: true },
  districtUnit: { type: String, required: true },
  woodNumber: { type: Number, required: true },
  species: { type: String, required: true },
  length: { type: Number, required: true },
  diameter: { type: Number, required: true },
  volume: { type: Number, required: true },
  class: { type: String, required: true },
  startingPriceSingle: { type: Number, required: true },
  startingPriceTotal: { type: Number, required: true },
  finalPriceSingle: { type: Number, required: true },
  finalPriceTotal: { type: Number, required: true },
  maxOffer: { type: String, required: false, ref: 'Offer' },
});

export default mongoose.model('Products', productsSchema);
