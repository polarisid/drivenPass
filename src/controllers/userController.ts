import { Request, Response } from "express";
import userServices from "../services/userServices.js";
import { UserSignupType, UserSigninType } from "../types/userTypes.js";

async function Signup(req: Request, res: Response) {
  const user = {
    email: req.body.email.toLowerCase(),
    name: req.body.name.toLowerCase(),
    password: req.body.password,
  } as UserSignupType;
  await userServices.createAndVerifyNewUser(user);

  res.status(201).send("Created");
}

async function Signin(req: Request, res: Response) {
  const user = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  } as UserSigninType;

  const token = await userServices.authenticateUser(user);
  res.status(200).send(token);
}
export default {
  Signup,
  Signin,
};
