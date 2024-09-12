import express from 'express';
import {index, store, update, destroy, destroyAll} from "../controllers/cartController.js";
import { validateCart } from '../middlewares/validator.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/', isAuthenticated, index);
router.post('/', isAuthenticated, validateCart, store);
router.put('/:item_id', isAuthenticated, update);
router.delete('/:item_id', isAuthenticated, destroy);
router.delete('/', isAuthenticated, destroyAll);

export default router;