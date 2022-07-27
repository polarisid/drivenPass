import { Router } from "express";
import cardController from "../controllers/cardController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { tokenvalidateMiddleware } from "../middlewares/tokenValidateMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";
const cardRouter = Router();

cardRouter.post(
  "/cards",
  validateSchemaMiddleware(cardSchema.CardSchema),
  tokenvalidateMiddleware,
  cardController.CreateCard
);

cardRouter.get(
  "/cards",
  tokenvalidateMiddleware,
  cardController.SearchAllByUser
);

cardRouter.get(
  "/cards/:id",
  tokenvalidateMiddleware,
  cardController.SearchById
);

cardRouter.delete(
  "/cards/:id",
  tokenvalidateMiddleware,
  cardController.DeleteById
);
export default cardRouter;
