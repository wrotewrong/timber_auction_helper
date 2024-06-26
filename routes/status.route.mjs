import express from 'express';
import statusController from '../controllers/status.controller.mjs';

const router = express.Router();

router.get('/status', statusController.getStatus);

export default router;
