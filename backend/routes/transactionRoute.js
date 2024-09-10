import express from 'express';
import { index } from "../controllers/transactionController.js"

const router = express.Router();

router.post('/', index);

export default router;