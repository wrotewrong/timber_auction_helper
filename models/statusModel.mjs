import mongoose from 'mongoose';

const statusModel = new mongoose.Schema({
  winners: { type: Boolean, default: false, required: true },
});

export default mongoose.model('Status', statusModel);
