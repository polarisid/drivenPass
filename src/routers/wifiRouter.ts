import { Router } from "express";
import wifiController from "../controllers/wifiController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { tokenvalidateMiddleware } from "../middlewares/tokenValidateMiddleware.js";
import wifiSchema from "../schemas/wifiSchema.js";
const wifiRouter = Router();

wifiRouter.post(
  "/wifi",
  validateSchemaMiddleware(wifiSchema.WifiSchema),
  tokenvalidateMiddleware,
  wifiController.CreateWifi
);

wifiRouter.get(
  "/wifi",
  tokenvalidateMiddleware,
  wifiController.SearchAllByUser
);

wifiRouter.get("/wifi/:id", tokenvalidateMiddleware, wifiController.SearchById);

wifiRouter.delete(
  "/wifi/:id",
  tokenvalidateMiddleware,
  wifiController.DeleteById
);
export default wifiRouter;
