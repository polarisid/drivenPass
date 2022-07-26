import { Router } from "express";
import credentialController from "../controllers/credentialController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { tokenvalidateMiddleware } from "../middlewares/tokenValidateMiddleware.js";
import credentialSchema from "../schemas/credentialSchema.js";
const credentialRouter = Router();

credentialRouter.post(
  "/credentials",
  validateSchemaMiddleware(credentialSchema.CredentialSchema),
  tokenvalidateMiddleware,
  credentialController.CreateCredential
);

credentialRouter.get(
  "/credentials",
  tokenvalidateMiddleware,
  credentialController.SearchAllByUser
);

credentialRouter.get(
  "/credentials/:id",
  tokenvalidateMiddleware,
  credentialController.SearchById
);

credentialRouter.delete(
  "/credentials/:id",
  tokenvalidateMiddleware,
  credentialController.DeleteById
);
export default credentialRouter;
