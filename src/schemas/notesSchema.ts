import Joi from "joi";
import { NotesType } from "../types/noteTypes.js";

const NotesSchema = Joi.object<NotesType>({
  name: Joi.string().max(50).required(),
  annotation: Joi.string().max(1000).required(),
});

export default { NotesSchema };
