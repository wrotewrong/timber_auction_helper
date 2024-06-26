import mongoose from 'mongoose';

const statusModel = new mongoose.Schema({
  catalog: { type: Boolean, default: false, required: true },
  offers: { type: Boolean, default: false, required: true },
  companies: { type: Boolean, default: false, required: true },
  winners: { type: Boolean, default: false, required: true },
  contracts: { type: Boolean, default: false, required: true },
});

export default mongoose.model('Status', statusModel);
