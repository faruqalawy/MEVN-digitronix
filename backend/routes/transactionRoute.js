import express from 'express';
import { createTransaction, handleNotification } from "../controllers/transactionController.js"

const router = express.Router();

router.post('/', createTransaction);
router.post('/notification', handleNotification);

export default router;