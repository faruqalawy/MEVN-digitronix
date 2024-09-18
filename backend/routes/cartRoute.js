import express from 'express';
import {index, store, update, destroy, destroyAll} from "../controllers/cartController.js";
import { validateCart } from '../middlewares/validator.js';
// import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/', index);
router.post('/', validateCart, store);
router.put('/:item_id', update);
router.delete('/:item_id', destroy);
router.delete('/', destroyAll);

export default router;