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

export default credentialRouter;
