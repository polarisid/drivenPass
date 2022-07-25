import Joi from "joi";
import { CredentialType } from "../types/credentialTypes.js";

const CredentialSchema = Joi.object<CredentialType>({
  url: Joi.string().required(),
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export default { CredentialSchema };
