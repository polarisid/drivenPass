import { Router } from "express";
import userController from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";
const userRouter = Router();

userRouter.post(
  "/users/signin",
  validateSchemaMiddleware(userSchema.UserSigninSchema),
  userController.Signin
);
userRouter.post(
  "/users/signup",
  validateSchemaMiddleware(userSchema.UserSignupSchema),
  userController.Signup
);

export default userRouter;
