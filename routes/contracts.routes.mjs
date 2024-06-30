import express from 'express';
import contractsController from '../controllers/contracts.controller.mjs';

const router = express.Router();

router.post('/contracts/importOffers', contractsController.importOffers);
router.get('/contracts/offers', contractsController.getOffers);
// router.get('/contracts/offersStatus', contractsController.getOffersStatus);
router.post('/contracts/importCompanies', contractsController.importCompanies);
router.get('/contracts/companies', contractsController.getCompanies);
// router.get(
//   '/contracts/companiesStatus',
//   contractsController.getCompaniesStatus
// );
router.get('/contracts/estimate', contractsController.estimateWinner);
router.post('/contracts/add', contractsController.addContracts);

export default router;
