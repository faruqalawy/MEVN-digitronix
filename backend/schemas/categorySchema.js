import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
        image: Joi.string().required(),
        feature: Joi.array().items(Joi.string()),
      })
    )
    .required(),
});

export default categorySchema;
