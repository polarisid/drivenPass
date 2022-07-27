import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { tokenvalidateMiddleware } from "../middlewares/tokenValidateMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
const cardRouter = Router();

cardRouter.post(
  "/card",
  validateSchemaMiddleware(cardSchema.CardSchema),
  tokenvalidateMiddleware,
  cardController.CreateCard
);

cardRouter.get(
  "/card",
  tokenvalidateMiddleware,
  cardController.SearchAllByUser
);

cardRouter.get("/card/:id", tokenvalidateMiddleware, cardController.SearchById);

cardRouter.delete(
  "/card/:id",
  tokenvalidateMiddleware,
  cardController.DeleteById
);
export default cardRouter;
