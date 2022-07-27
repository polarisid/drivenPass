import { Router } from "express";
import notesController from "../controllers/notesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { tokenvalidateMiddleware } from "../middlewares/tokenValidateMiddleware.js";
import notesSchema from "../schemas/notesSchema.js";
const notesRouter = Router();

notesRouter.post(
  "/notes",
  validateSchemaMiddleware(notesSchema.NotesSchema),
  tokenvalidateMiddleware,
  notesController.CreateNote
);

notesRouter.get(
  "/notes",
  tokenvalidateMiddleware,
  notesController.SearchAllByUser
);

notesRouter.get(
  "/notes/:id",
  tokenvalidateMiddleware,
  notesController.SearchById
);

notesRouter.delete(
  "/notes/:id",
  tokenvalidateMiddleware,
  notesController.DeleteById
);
export default notesRouter;
