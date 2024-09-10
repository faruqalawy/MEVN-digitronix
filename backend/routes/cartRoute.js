import express from 'express';
import {index, store, update, destroy} from "../controllers/cartController.js";
import { validateCart } from '../middlewares/validator.js';

const router = express.Router();

router.get('/', index);
router.post('/', validateCart, store);
router.put('/:item_id', update);
router.delete('/:item_id', destroy);

export default router;