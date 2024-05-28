import express from 'express';
import catalogController from '../controllers/catalog.controller.mjs';

const router = express.Router();

router.post('/catalog/import', catalogController.importData);
router.get('/catalog/download', catalogController.downloadCatalog);

export default router;
