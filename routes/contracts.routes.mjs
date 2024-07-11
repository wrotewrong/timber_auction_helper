import express from 'express';
import contractsController from '../controllers/contracts.controller.mjs';
import fileUpload from '../utils/fileUpload.mjs';

const router = express.Router();

router.post(
  '/contracts/importOffers',
  fileUpload.single('uploadedFile'),
  contractsController.importOffers
);
router.get('/contracts/offers', contractsController.getOffers);
router.post(
  '/contracts/importCompanies',
  fileUpload.single('uploadedFile'),
  contractsController.importCompanies
);
router.get('/contracts/companies', contractsController.getCompanies);
router.get('/contracts', contractsController.getContracts);
router.get('/contracts/estimate', contractsController.estimateWinner);
router.post('/contracts/add', contractsController.addContracts);
router.get('/contracts/zip', contractsController.downloadContracts);
router.get('/contracts/logger', contractsController.downloadLogger);
router.delete('/contracts', contractsController.removeAllContractsData);

export default router;
