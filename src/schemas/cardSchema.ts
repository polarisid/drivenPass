import Joi from "joi";
import { CardsType } from "../types/cardTypes.js";

const CardSchema = Joi.object<CardsType>({
  number: Joi.string().required(),
  name: Joi.string().required(),
  cvv: Joi.string().required(),
  expirationDate: Joi.date().greater("now").required(),
  title: Joi.string().required(),
  type: Joi.string().valid("debit", "credit", "both").required(),
  password: Joi.string().required(),
  virtual: Joi.boolean().required(),
});

export default { CardSchema };
