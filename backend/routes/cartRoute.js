import express from 'express';
import {index, store, destroy} from "../controllers/cartController.js";
import { validateCart } from '../middlewares/validator.js';

const router = express.Router();

router.get('/', index);
router.post('/', validateCart, store);
router.delete('/:id', destroy);

export default router;