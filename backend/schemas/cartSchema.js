import Joi from "joi";

const cartSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  image: Joi.string().required(),
});

export default cartSchema;
