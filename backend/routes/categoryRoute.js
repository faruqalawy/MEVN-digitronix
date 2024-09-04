import express from "express";
import {
  index,
  showCategory,
  showProduct,
  store,
  destroy,
} from "../controllers/categoryController.js";
import { validateCategory } from "../middlewares/validator.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", showCategory);
router.get("/:categoryId/products/:productId", showProduct);
router.post("/", validateCategory, store);
router.delete("/:id", destroy);

export default router;
