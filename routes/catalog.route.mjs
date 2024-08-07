import express from 'express';
import catalogController from '../controllers/catalog.controller.mjs';
import fileUpload from '../utils/fileUpload.mjs';

const router = express.Router();

router.post(
  '/catalog/import',
  fileUpload.single('uploadedFile'),
  catalogController.importData
);
router.get('/catalog', catalogController.getCatalog);
router.get('/catalog/download', catalogController.downloadCatalog);
router.delete('/catalog', catalogController.removeAllCatalogData);

export default router;
