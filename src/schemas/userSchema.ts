import Joi from "joi";
import { UserSignupType, UserSigninType } from "../types/userTypes";

const UserSignupSchema = Joi.object<UserSignupType>({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(10).required(),
});

const UserSigninSchema = Joi.object<UserSigninType>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default { UserSigninSchema, UserSignupSchema };
