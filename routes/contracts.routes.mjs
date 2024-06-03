import express from 'express';
import contractsController from '../controllers/contracts.controller.mjs';

const router = express.Router();

router.post('/contracts/importOffers', contractsController.importOffers);
router.post('/contracts/importCompanies', contractsController.importCompanies);
router.get('/contracts/estimate', contractsController.estimateWinner);
router.get('/contracts/prepare', contractsController.prepareContracts);

export default router;
