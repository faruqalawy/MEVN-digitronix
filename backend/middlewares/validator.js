import categorySchema from "../schemas/categorySchema.js";
import cartSchema from "../schemas/cartSchema.js";

export const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({
        message:
          "Error add new category: " +
          error.details.map((err) => err.message).join(", "),
      });
  next();
};

export const validateCart = (req, res, next) => {
  const { error } = cartSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({
        message:
          "Error add new cart: " +
          error.details.map((err) => err.message).join(", "),
      });
  next();
};
