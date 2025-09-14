import express from 'express';
import { listAlerts, createAlert } from '../controllers/alertController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();
router.get('/', authMiddleware, listAlerts);
router.post('/', authMiddleware, createAlert);


export default router;