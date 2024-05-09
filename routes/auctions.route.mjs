import express from 'express';
import auctionsController from '../controllers/auctions.controller.mjs';

const router = express.Router();

const auctionRoutes = {
  getAll: router.get('/auctions', auctionsController.getAll),
  getById: router.get('/auctions/:id', auctionsController.getById),
  addAuctions: router.post('/auctions', auctionsController.addAuctions),
  deleteAuctions: router.delete('/auctions', auctionsController.deleteAuctions),
};

export default auctionRoutes;
