import Joi from "joi";
import { WifiType } from "../types/wifiTypes.js";

const WifiSchema = Joi.object<WifiType>({
  ssid: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

export default { WifiSchema };
